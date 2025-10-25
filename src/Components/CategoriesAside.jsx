import React, { useState, useEffect } from 'react';

const CategoriesAside = ({ selectedCategory, onCategorySelect, onSubcategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // Sólo una categoría expandida a la vez
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [productsCache, setProductsCache] = useState({}); // cache products per category

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const formattedCategories = data.map((category) => ({
          // Asegurarnos que el id es primitivo (string) para usar como key
          id: String(category),
          name: formatCategoryName(category),
          count: Math.floor(Math.random() * 50) + 10,
          icon: getCategoryIcon(category)
        }));
        setCategories(formattedCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  const formatCategoryName = (category) => {
    if (typeof category === 'string') {
      return category.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return category.name || 'Categoría';
  };

  const getCategoryIcon = (category) => {
    const categoryStr = typeof category === 'string' ? category : category.slug;
    
    const iconMap = {
      'smartphones': '📱',
      'laptops': '💻',
      'fragrances': '🌸',
      'skincare': '🧴',
      'beauty': '💄',
      'groceries': '🛒',
      'home-decoration': '🏠',
      'furniture': '🛋️',
      'tops': '👕',
      'womens-dresses': '👗',
      'womens-shoes': '👠',
      'mens-shirts': '👔',
      'mens-shoes': '👞',
      'mens-watches': '⌚',
      'womens-watches': '⌚',
      'womens-bags': '👜',
      'womens-jewellery': '💍',
      'sunglasses': '🕶️',
      'automotive': '🚗',
      'motorcycle': '🏍️',
      'lighting': '💡'
    };

    return iconMap[categoryStr] || '📦';
  };

  const toggleExpand = async (categoryId) => {
    setExpandedCategory(prev => (prev === categoryId ? null : categoryId));

    // If opening and not cached, fetch products for this category to build subcategories (brands)
    if (!productsCache[categoryId]) {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${categoryId}`);
        const data = await res.json();
        const products = data.products || [];
        setProductsCache(prev => ({ ...prev, [categoryId]: products }));
      } catch (err) {
        console.error('Error fetching products for category:', categoryId, err);
      }
    }
  };

  const getBrandsForCategory = (categoryId) => {
    const products = productsCache[categoryId] || [];
    // Normalizar marcas a string para evitar keys que sean objetos
    const brands = Array.from(new Set(products.map(p => String(p?.brand)))).filter(b => b && b !== 'undefined');
    return brands;
  };

  if (loading) {
    return (
      <aside className="w-80 bg-white border-r border-gray-200 min-h-screen p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        </div>
        <div className="text-center py-4">
          <div className="text-gray-600">Cargando categorías...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Categorías</h2>
        <p className="text-gray-600">Explora nuestros productos</p>
      </div>

      {/* Categoría "Todos" */}
      <button
        onClick={() => { onCategorySelect('todos'); onSubcategorySelect(null); }}
        className={`w-full flex items-center justify-between p-4 rounded-xl transition duration-200 mb-3 ${
          selectedCategory === 'todos'
            ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
            : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">🛍️</span>
          <span className="font-semibold">Todos los productos</span>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          150
        </span>
      </button>

      {/* Lista de categorías */}
      <div className="space-y-2">
        {categories.map((category, idx) => (
          <div key={`category-${category.id ?? idx}`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => { onCategorySelect(category.id); onSubcategorySelect(null); }}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>

              <div className="ml-2 flex items-center space-x-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                <button
                  onClick={() => toggleExpand(category.id)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label={expandedCategory === category.id ? 'Cerrar subcategorías' : 'Abrir subcategorías'}
                >
                    {expandedCategory === category.id ? '▾' : '▸'}
                </button>
              </div>
            </div>

            {/* Subcategorías (marcas) */}
              {expandedCategory === category.id && (
              <div className="pl-8 pr-2 mt-2 mb-4 space-y-2">
                <button
                  onClick={() => { onCategorySelect(category.id); onSubcategorySelect(null); }}
                  className="w-full text-left text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded"
                >
                  Todas las marcas
                </button>
                {getBrandsForCategory(category.id).length === 0 ? (
                  <div className="text-sm text-gray-500 p-2">Cargando subcategorías...</div>
                ) : (
                  getBrandsForCategory(category.id).map(brand => (
                    <button
                      key={`${category.id}-${String(brand)}`}
                      onClick={() => { onCategorySelect(category.id); onSubcategorySelect(brand); }}
                      className="w-full text-left text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded"
                    >
                      {String(brand)}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CategoriesAside;
import React, { useState, useEffect } from 'react';

const CategoriesAside = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const formattedCategories = data.map((category, index) => ({
          id: category.slug || category,
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
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Categorías</h2>
        <p className="text-gray-600">Explora nuestros productos</p>
      </div>

      {/* Categoría "Todos" */}
      <button
        onClick={() => setSelectedCategory('todos')}
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
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium text-left">{category.name}</span>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CategoriesAside;
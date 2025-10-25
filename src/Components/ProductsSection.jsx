import React, { useState, useEffect } from 'react';
import Card from './Card';

const ProductsSection = ({ category, searchQuery, subcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('Productos');

  useEffect(() => {
    setLoading(true);
    
    let apiUrl = 'https://dummyjson.com/products';
    
    // Prioridad 1: Si hay búsqueda, usar endpoint de búsqueda
    if (searchQuery) {
      apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
    } 
    // Prioridad 2: Si no hay búsqueda pero hay categoría seleccionada
    else if (category !== 'todos') {
      apiUrl = `https://dummyjson.com/products/category/${category}`;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        let items = data.products || data;

        // Si hay subcategoría (marca) seleccionada y estamos viendo una categoría concreta,
        // filtramos los productos por brand
        if (subcategory && category && category !== 'todos') {
          items = (items || []).filter(p => p.brand === subcategory);
        }

        setProducts(items);
        updateCategoryName(category, searchQuery, items?.length, subcategory);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [category, searchQuery, subcategory]);

  const updateCategoryName = (currentCategory, currentSearch, productCount, currentSubcategory) => {
    if (currentSearch) {
      setCategoryName(`Resultados para "${currentSearch}"`);
      return;
    }

    if (currentCategory === 'todos') {
      setCategoryName(currentSubcategory ? `Marca: ${currentSubcategory}` : 'Todos los productos');
      return;
    }
    
    const categoryNames = {
      'smartphones': 'Smartphones',
      'laptops': 'Laptops',
      'fragrances': 'Fragancias',
      'skincare': 'Cuidado de la Piel',
      'beauty': 'Belleza',
      'groceries': 'Comestibles',
      'home-decoration': 'Decoración del Hogar',
      'furniture': 'Muebles',
      'tops': 'Tops',
      'womens-dresses': 'Vestidos de Mujer',
      'womens-shoes': 'Zapatos de Mujer',
      'mens-shirts': 'Camisas de Hombre',
      'mens-shoes': 'Zapatos de Hombre',
      'mens-watches': 'Relojes de Hombre',
      'womens-watches': 'Relojes de Mujer',
      'womens-bags': 'Bolsos de Mujer',
      'womens-jewellery': 'Joyas de Mujer',
      'sunglasses': 'Gafas de Sol',
      'automotive': 'Automotriz',
      'motorcycle': 'Motocicletas',
      'lighting': 'Iluminación'
    };

    const base = categoryNames[currentCategory] || currentCategory;
    setCategoryName(currentSubcategory ? `${base} · ${currentSubcategory}` : base);
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-lg text-gray-600">
        {searchQuery ? 'Buscando productos...' : 'Cargando productos...'}
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {categoryName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {products.length} {searchQuery ? 'resultados' : 'productos'} encontrados
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No hay resultados para "${searchQuery}". Intenta con otros términos.`
                : 'No hay productos en esta categoría.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card
                key={product.id}
                title={product.title}
                description={`${product.description.substring(0, 100)}...`}
                icon="📦"
                buttonText={`$${product.price}`}
                imageSize={250}
                onButtonClick={() => console.log('Producto:', product.title)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
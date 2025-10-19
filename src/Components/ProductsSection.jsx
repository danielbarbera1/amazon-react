import React, { useState, useEffect } from 'react';
import Card from './card';

const ProductsSection = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('Productos');

  useEffect(() => {
    setLoading(true);
    
    let apiUrl = 'https://dummyjson.com/products';
    
    // Si no es "todos", filtrar por categoría
    if (category !== 'todos') {
      apiUrl = `https://dummyjson.com/products/category/${category}`;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || data);
        setCategoryName(getCategoryDisplayName(category));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [category]);

  const getCategoryDisplayName = (categoryId) => {
    if (categoryId === 'todos') return 'Todos los productos';
    
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

    return categoryNames[categoryId] || categoryId;
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-lg text-gray-600">Cargando productos...</div>
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
            {products.length} productos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card
              key={product.id}
              title={product.title}
              description={`${product.description.substring(0, 100)}...`}
              icon="📦"
              buttonText={`$${product.price}`}
              onButtonClick={() => console.log('Producto:', product.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
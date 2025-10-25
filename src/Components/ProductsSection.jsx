import React, { useState, useEffect } from 'react';
import Card from './Card';

const ProductsSection = ({ category, searchQuery, subcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('Productos');

  const getApiUrl = (category, searchQuery) => {
    if (searchQuery) return `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
    if (category && category !== 'todos') return `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
    return 'https://dummyjson.com/products';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const apiUrl = getApiUrl(category, searchQuery);
        // Debug: mostrar la URL que estamos consultando
        console.debug('Fetching products from', apiUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
          console.error('Products fetch failed:', res.status, res.statusText);
          setProducts([]);
          updateCategoryName(category, searchQuery, 0, subcategory);
          setLoading(false);
          return;
        }

        const data = await res.json();
        // data puede venir como { products: [...] } o como un array
        let items = Array.isArray(data) ? data : (data.products || []);

        // Filtrar por subcategoría (brand) si corresponde
        if (subcategory && category && category !== 'todos') {
          items = (items || []).filter(p => p && p.brand === subcategory);
        }

  setProducts(items || []);
  updateCategoryName(category, searchQuery, (items || []).length, subcategory);
  console.debug('Products fetched:', (items || []).length);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
        updateCategoryName(category, searchQuery, 0, subcategory);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
          <div className="text-sm text-gray-500 mb-2">
            <span>Categoria: {String(category)}</span>
            {subcategory && <span> · Marca: {String(subcategory)}</span>}
            <span> · Productos: {products.length}</span>
          </div>
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
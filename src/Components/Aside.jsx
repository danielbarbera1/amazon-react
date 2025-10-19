// Components/CategoriesAside.jsx
import React, { useState } from 'react';

const Aside = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos los productos', count: 120, icon: '🛍️' },
    { id: 'smartphones', name: 'Smartphones', count: 45, icon: '📱' },
    { id: 'laptops', name: 'Laptops', count: 32, icon: '💻' },
    { id: 'tablets', name: 'Tablets', count: 18, icon: '📟' },
    { id: 'audio', name: 'Audio', count: 25, icon: '🎧' },
    { id: 'wearables', name: 'Wearables', count: 15, icon: '⌚' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      {/* Título */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Categorías</h2>
      </div>

      {/* Lista de Categorías */}
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
              <span className="font-medium">{category.name}</span>
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

export default Aside;
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import CategoriesAside from './Components/CategoriesAside';
import HeroBanner from './Components/HeroBanner';
import FeaturesSection from './Components/FeaturesSection';

import ProductsSection from './Components/ProductsSection';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <CategoriesAside 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <main className="flex-1">
          <HeroBanner />
          <FeaturesSection />
          <ProductsSection category={selectedCategory} />
        </main>
      </div>
    </div>
  );
}

export default App;
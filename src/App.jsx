import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import CategoriesAside from './Components/CategoriesAside';
import HeroBanner from './Components/HeroBanner';
import FeaturesSection from './Components/FeaturesSection';
import ProductsSection from './Components/ProductsSection';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex">
        <CategoriesAside 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <main className="flex-1">
          <HeroBanner />
          <FeaturesSection />
          <ProductsSection 
            category={selectedCategory}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
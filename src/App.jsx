import React from 'react';
import Navbar from './Components/Navbar';
import CategoriesAside from './Components/CategoriesAside';
import HeroBanner from './Components/HeroBanner';
import FeaturesSection from './Components/FeaturesSection';  // ← Agregar esta línea
import Section from './Components/Section';
import ProductsSection from './Components/ProductsSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <CategoriesAside />
        
        <main className="flex-1">
          <HeroBanner />
          <FeaturesSection />  {/* ← Agregar aquí */}
          <Section />
          <ProductsSection />
        </main>
      </div>
    </div>
  );
}

export default App;
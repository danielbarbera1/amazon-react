import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import InicioRegistro from './Pages/InicioRegistro';
import CategoriesAside from './Components/CategoriesAside';
import HeroBanner from './Components/HeroBanner';
import FeaturesSection from './Components/FeaturesSection';
import ProductsSection from './Components/ProductsSection';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [authMode, setAuthMode] = useState(null); // 'login' | 'register' | null
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch (e) { return null; }
  });

  const openAuth = (mode = 'login') => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAuth={openAuth}
        user={user}
        onLogout={() => {
          setUser(null);
          try { localStorage.removeItem('user'); localStorage.removeItem('token'); } catch (e) {}
        }}
      />
      <div className="flex">
        <CategoriesAside 
          selectedCategory={selectedCategory}
          onCategorySelect={(cat) => { setSelectedCategory(cat); setSelectedSubcategory(null); }}
          onSubcategorySelect={setSelectedSubcategory}
        />
        
        <main className="flex-1">
          <HeroBanner />
          <FeaturesSection />
          <ProductsSection 
            category={selectedCategory}
            searchQuery={searchQuery}
            subcategory={selectedSubcategory}
          />
        </main>
      </div>
      {/* Modal / panel de inicio/registro */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl">
            <button onClick={closeAuth} className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow">✕</button>
            <InicioRegistro mode={authMode} onClose={closeAuth} onModeChange={setAuthMode} onLogin={(u) => setUser(u)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
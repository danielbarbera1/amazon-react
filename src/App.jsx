
import Navbar from './Components/Navbar';
import CategoriesAside from './Components/CategoriesAside';
import Section from './Components/Section';
import ProductsSection from './Components/ProductsSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <CategoriesAside />
        
        <main className="flex-1">
          <Section />
          <ProductsSection />
        </main>
      </div>
    </div>
  );
}

export default App;
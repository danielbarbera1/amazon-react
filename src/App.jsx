// src/App.jsx

import Navbar from './Components/Navbar';
import Sidebar from './Components/Aside';
import Section from './Components/Section';


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <Section />
        </main>
      </div>
    </div>
  );
}

export default App;
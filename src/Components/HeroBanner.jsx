import React from 'react';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Descubre las 
              <span className="block text-yellow-300"> mejores ofertas</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Hasta 50% de descuento en productos seleccionados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition duration-300 shadow-lg">
                Comprar Ahora
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition duration-300">
                Ver Ofertas
              </button>
            </div>
          </div>

          {/* Imagen/Ilustración */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="text-8xl">🛒</div>
              </div>
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                🔥
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-xl">
                ⚡
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-300">10K+</div>
            <div className="text-blue-100">Productos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300">95%</div>
            <div className="text-blue-100">Clientes Satisfechos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300">24/7</div>
            <div className="text-blue-100">Soporte</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300">5★</div>
            <div className="text-blue-100">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
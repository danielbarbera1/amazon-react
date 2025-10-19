import React from 'react';

const Section = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones innovadoras para impulsar tu negocio al siguiente nivel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Desarrollo Web
            </h3>
            <p className="text-gray-600">
              Creamos aplicaciones web modernas y responsivas utilizando las últimas tecnologías.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Apps Móviles
            </h3>
            <p className="text-gray-600">
              Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Diseño UI/UX
            </h3>
            <p className="text-gray-600">
              Diseñamos interfaces intuitivas y experiencias de usuario excepcionales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
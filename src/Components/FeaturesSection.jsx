import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Envío Gratis',
      description: 'En compras mayores a $50.000'
    },
    {
      icon: '🔄',
      title: 'Devoluciones',
      description: '30 días para devoluciones'
    },
    {
      icon: '🔒',
      title: 'Pago Seguro',
      description: 'Transacciones 100% protegidas'
    },
    {
      icon: '📞',
      title: 'Soporte 24/7',
      description: 'Atención al cliente siempre'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
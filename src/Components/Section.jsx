import Card from "./Card";

const Section = () => {
  const services = [
    {
      title: "Desarrollo Web",
      description: "Creamos aplicaciones web modernas y responsivas utilizando las últimas tecnologías.",
      icon: "🚀",
      buttonText: "Saber más",
      variant: "gradient"
    },
    {
      title: "Apps Móviles",
      description: "Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android.",
      icon: "📱",
      buttonText: "Explorar",
      variant: "gradient"
    },
    {
      title: "Diseño UI/UX",
      description: "Diseñamos interfaces intuitivas y experiencias de usuario excepcionales.",
      icon: "🎨",
      buttonText: "Ver portfolio",
      variant: "gradient"
    },
    {
      title: "Consultoría TI",
      description: "Asesoramiento especializado para optimizar tu infraestructura tecnológica.",
      icon: "💼",
      buttonText: "Consultar",
      variant: "default"
    },
    {
      title: "Marketing Digital",
      description: "Estrategias digitales para aumentar tu presencia online y generar leads.",
      icon: "📈",
      buttonText: "Comenzar",
      variant: "default"
    },
    {
      title: "Soporte 24/7",
      description: "Asistencia técnica continua para garantizar el funcionamiento de tus sistemas.",
      icon: "🛠️",
      buttonText: "Contactar",
      variant: "default"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header del Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones innovadoras para impulsar tu negocio al siguiente nivel.
          </p>
        </div>

        {/* Grid de contenido con Componentes Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              buttonText={service.buttonText}
              variant={service.variant}
              onButtonClick={() => console.log(`${service.title} click`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
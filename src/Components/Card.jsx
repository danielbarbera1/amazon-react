

const Card = ({ 
  title, 
  description, 
  icon, 
  buttonText = "Ver más", 
  onButtonClick,
  variant = "default",
  className = "" 
}) => {
  const variants = {
    default: "bg-white border border-gray-200",
    gradient: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200",
    dark: "bg-gray-800 text-white border border-gray-700"
  };

  const iconVariants = {
    default: "bg-blue-500",
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    dark: "bg-gray-700"
  };

  const buttonVariants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    gradient: "bg-blue-600 hover:bg-blue-700 text-white",
    dark: "bg-gray-700 hover:bg-gray-600 text-white"
  };

  return (
    <div className={`group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 ${variants[variant]} ${className}`}>
      {/* Icono */}
      {icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${iconVariants[variant]}`}>
          <span className="text-xl text-white">{icon}</span>
        </div>
      )}
      
      {/* Contenido */}
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      
      {/* Botón */}
      {buttonText && (
        <button 
          onClick={onButtonClick}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${buttonVariants[variant]}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
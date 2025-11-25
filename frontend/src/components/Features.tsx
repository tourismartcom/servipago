// components/Features.tsx

import React from "react";

// Iconos sencillos (puedes usar iconos de bibliotecas como Lucide o Heroicons)
// Aquí usamos símbolos de texto por simplicidad.
interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: "🔒", // Icono de Seguridad
      title: "Seguridad de Nivel Empresarial",
      description:
        "Protección de datos con cifrado avanzado, cumpliendo los estándares más altos de la industria.",
    },
    {
      icon: "⚡", // Icono de Velocidad
      title: "Transacciones Instantáneas",
      description:
        "Procesa pagos en tiempo real, mejorando el flujo de caja y la experiencia de tus clientes.",
    },
    {
      icon: "🌐", // Icono de Integración
      title: "Integración Sencilla",
      description:
        "API flexible y documentación clara para conectar ServiPagos a tu plataforma en minutos.",
    },
    {
      icon: "📈", // Icono de Escalabilidad
      title: "Escalabilidad Garantizada",
      description:
        "Maneja cualquier volumen de transacciones, ideal para empresas en crecimiento.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          ¿Por qué elegir ServiPagos?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

// components/Hero.tsx

import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          El <span className="text-blue-600">Puente de Pagos</span> para tu
          Empresa.
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Simplifica las transacciones de tu negocio. ServiPagos conecta tus
          servicios con los métodos de pago más populares de manera segura y
          eficiente.
        </p>
        {/* Botón de Llamada a la Acción Principal */}
        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
          >
            Empieza a Integrar Hoy
          </a>
        </div>
        [Image of a secure payment transaction process connecting a business and
        a bank]
      </div>
    </section>
  );
};

export default Hero;

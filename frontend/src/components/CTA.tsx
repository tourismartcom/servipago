// components/CTA.tsx

import React from "react";

const CTA: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-white">
          ¿Listo para simplificar tus pagos?
        </h2>
        <p className="mt-4 text-xl text-blue-200 max-w-4xl mx-auto">
          Descubre cómo ServiPagos puede transformar la gestión de transacciones
          de tu empresa. Contacta a nuestro equipo de integración hoy mismo.
        </p>

        {/* Botón Principal de Contacto */}
        <div className="mt-8">
          <a
            href="mailto:contacto@servipagos.com" // Reemplaza con tu email o formulario de contacto
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-xl text-blue-600 bg-white hover:bg-gray-100 transition duration-150 transform hover:scale-105"
          >
            Solicitar una Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;

// components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Contenido Principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Columna 1: Logo y Slogan */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">ServiPagos</h3>
            <p className="text-gray-400 text-sm">
              Conectando tu negocio con el futuro de los pagos.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-150"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition duration-150"
                >
                  Características
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition duration-150"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-150"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-150"
                >
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@servipagos.com"
                  className="hover:text-blue-400"
                >
                  info@servipagos.com
                </a>
              </li>
              <li>Teléfono: (+00) 123 456 7890</li>
              <li>Dirección: Ciudad de Integración, País</li>
            </ul>
          </div>
        </div>

        {/* Derechos de Autor */}
        <div className="pt-6 text-center text-gray-500 text-sm">
          &copy; {currentYear} ServiPagos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

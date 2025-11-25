// components/Header.tsx

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Nombre */}
        <div className="text-2xl font-bold text-blue-600">ServiPagos</div>

        {/* Navegación - Solo informativo */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition duration-150"
          >
            Características
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition duration-150"
          >
            Cómo Funciona
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-blue-600 transition duration-150"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

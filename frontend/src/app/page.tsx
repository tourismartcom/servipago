// pages/index.tsx (VERSION FINALIZADA)

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features"; // <-- Nuevo
import CTA from "../components/CTA"; // <-- Nuevo
import Footer from "../components/Footer"; // <-- Por crear, pero lo agregamos

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* 1. SECCIÓN DE BIENVENIDA */}
        <Hero />

        {/* 2. CARACTERÍSTICAS DEL SERVICIO */}
        <Features />

        {/* 3. LLAMADA A LA ACCIÓN / CONTACTO */}
        <CTA />
      </main>
      <Footer /> {/* Agrega el Footer al final */}
    </div>
  );
};

export default Home;

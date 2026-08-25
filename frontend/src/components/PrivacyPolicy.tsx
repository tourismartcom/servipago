// components/PrivacyPolicy.tsx (Puedes crear un archivo .tsx para esto o usar texto plano)

import React from "react";

const PrivacyPolicy: React.FC = () => (
  <section className="py-12 px-4 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">
      Política de Privacidad de ServiPagos
    </h1>
    <p className="text-sm text-gray-500 mb-8">
      Última Actualización: Noviembre 2025
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      1. Introducción
    </h2>
    <p className="text-gray-700 mb-4">
      ServiPagos se compromete a proteger la privacidad de las empresas y
      desarrolladores que utilizan nuestra plataforma como un puente de pagos.
      Esta Política describe cómo recopilamos, utilizamos y protegemos la
      información relacionada con la integración y el uso de nuestros servicios.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      2. Información que Recopilamos
    </h2>
    <p className="text-gray-700 mb-2 font-bold">
      a. Información de Integración (B2B):
    </p>
    <ul className="list-disc list-inside ml-4 text-gray-700 mb-4">
      <li>
        **Datos de la Empresa:** Nombre de la empresa, RUC/NIT, dirección de
        contacto corporativo.
      </li>
      <li>
        **Datos del Contacto Técnico:** Nombre, email y teléfono del
        desarrollador o contacto clave.
      </li>
      <li>
        **Credenciales de Acceso a la API:** Claves, tokens e identificadores
        necesarios para la integración de pagos.
      </li>
    </ul>

    <p className="text-gray-700 mb-2 font-bold">b. Datos de Transacción:</p>
    <p className="text-gray-700 mb-4">
      ServiPagos procesa y almacena temporalmente datos de transacción (montos,
      fechas, estados) necesarios para la liquidación de pagos. **No almacenamos
      de forma permanente datos sensibles del consumidor final, como números
      completos de tarjetas de crédito o información bancaria personal.**
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      3. Uso de la Información
    </h2>
    <p className="text-gray-700 mb-4">
      Utilizamos la información recopilada exclusivamente para:
    </p>
    <ul className="list-disc list-inside ml-4 text-gray-700 mb-4">
      <li>Proporcionar, mantener y mejorar el servicio de puente de pagos.</li>
      <li>
        Verificar la identidad y las credenciales de la empresa para la
        integración.
      </li>
      <li>
        Monitorear la actividad de la API para garantizar la seguridad y
        prevenir fraudes.
      </li>
      <li>
        Comunicarnos con los contactos de la empresa sobre actualizaciones,
        problemas técnicos o facturación.
      </li>
    </ul>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      4. Seguridad
    </h2>
    <p className="text-gray-700 mb-4">
      Implementamos medidas de seguridad técnicas y organizativas rigurosas,
      incluido el cifrado, para proteger la información contra el acceso no
      autorizado, la divulgación, la alteración o la destrucción.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      5. Contacto
    </h2>
    <p className="text-gray-700 mb-4">
      Si tiene preguntas o inquietudes sobre esta Política de Privacidad,
      contáctenos en:{" "}
      <a
        href="mailto:legal@servipagos.com"
        className="text-blue-600 hover:underline"
      >
        legal@servipagos.com
      </a>
    </p>
  </section>
);

export default PrivacyPolicy;

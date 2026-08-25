// components/TermsOfService.tsx

import React from "react";

const TermsOfService: React.FC = () => (
  <section className="py-12 px-4 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">
      Términos de Servicio de ServiPagos
    </h1>
    <p className="text-sm text-gray-500 mb-8">Vigente desde: Noviembre 2025</p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      1. Aceptación de los Términos
    </h2>
    <p className="text-gray-700 mb-4">
      Al acceder o utilizar los servicios de ServiPagos, usted acepta estar
      sujeto a estos Términos de Servicio. Estos Términos rigen el uso del
      Servicio como puente tecnológico para la gestión de pagos.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      2. Descripción del Servicio
    </h2>
    <p className="text-gray-700 mb-4">
      ServiPagos es una plataforma tecnológica que actúa como intermediario para
      facilitar la comunicación entre el sistema de la Empresa y diversas
      pasarelas de pago. **ServiPagos no es una entidad bancaria ni una
      institución financiera y no se responsabiliza por la liquidación final de
      fondos, la cual es responsabilidad de las pasarelas o bancos asociados.**
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      3. Obligaciones del Cliente
    </h2>
    <ul className="list-disc list-inside ml-4 text-gray-700 mb-4">
      <li>
        El Cliente debe asegurarse de que todas las transacciones realizadas a
        través de ServiPagos cumplan con las leyes y regulaciones aplicables.
      </li>
      <li>
        El Cliente es responsable de la seguridad y el uso adecuado de sus
        claves de API.
      </li>
      <li>
        El Cliente debe obtener todos los consentimientos necesarios de sus
        clientes finales para la transferencia de datos de transacción a través
        de la API.
      </li>
    </ul>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      4. Propiedad Intelectual
    </h2>
    <p className="text-gray-700 mb-4">
      Todo el contenido, la tecnología, las API y el diseño de ServiPagos son
      propiedad exclusiva de ServiPagos y están protegidos por derechos de autor
      y otras leyes de propiedad intelectual. La Empresa solo recibe una
      licencia limitada y no transferible para utilizar la API para el
      procesamiento de pagos.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      5. Limitación de Responsabilidad
    </h2>
    <p className="text-gray-700 mb-4">
      ServiPagos se proporciona En la medida máxima permitida por la ley,
      ServiPagos no será responsable por daños indirectos, incidentales,
      especiales, consecuenciales o punitivos, o por la pérdida de ganancias o
      datos, que resulten del uso o la imposibilidad de usar el servicio.
    </p>

    <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">
      6. Terminación
    </h2>
    <p className="text-gray-700 mb-4">
      ServiPagos se reserva el derecho de suspender o terminar el acceso del
      Cliente al servicio en cualquier momento y sin previo aviso si se
      determina un incumplimiento de estos Términos, actividad fraudulenta o
      riesgo de seguridad.
    </p>
  </section>
);

export default TermsOfService;

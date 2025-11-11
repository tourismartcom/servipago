// SERVIPAGOS/frontend/src/app/api/v1/payments/bold-callback/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Extraer la URL de redirección final que mandamos desde PrepagosLujuria
  // Esta es la parte que dice: final_url=https%3A%2F%2Fwww.prepagoslujuria.com...
  const finalUrlParam = req.nextUrl.searchParams.get("final_url");

  // 2. Obtener todos los parámetros de Bold (incluyendo el estado de la transacción)
  const boldParams = req.nextUrl.searchParams;

  if (finalUrlParam) {
    // Decodificar la URL final
    const decodedFinalUrl = decodeURIComponent(finalUrlParam);

    // 3. Crear los parámetros que vamos a pasar a PrepagosLujuria
    const newSearchParams = new URLSearchParams();

    // Copiamos todos los parámetros, excepto 'final_url', a la URL de destino
    boldParams.forEach((value, key) => {
      if (key !== "final_url") {
        newSearchParams.append(key, value);
      }
    });

    // 4. Determinar si la URL de destino ya tiene parámetros para usar '?' o '&'
    const separator = decodedFinalUrl.includes("?") ? "&" : "?";

    // 5. Construir la URL final de redirección
    const redirectUrl = `${decodedFinalUrl}${separator}${newSearchParams.toString()}`;

    console.log(`✅ Redireccionando a PrepagosLujuria: ${redirectUrl}`);

    // Devolver una respuesta de redirección HTTP 307 (Temporal)
    return NextResponse.redirect(redirectUrl, 307);
  }

  // Si no hay final_url, es un error de configuración
  return NextResponse.json(
    {
      message:
        "Error de configuración de retorno. Falta el parámetro 'final_url'.",
    },
    { status: 400 }
  );
}

// Bold también podría usar POST para el callback, así que incluimos el handler:
export async function POST(req: NextRequest) {
  return GET(req); // Usamos GET handler para la redirección
}

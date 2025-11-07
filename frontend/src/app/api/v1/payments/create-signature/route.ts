// SERVIPAGO/frontend/src/app/api/v1/payments/create-signature/route.ts

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Función POST para la API Route (App Router)
 * Genera la firma de integridad de Bold.
 */
export async function POST(req: NextRequest) {
  // 1. Autenticación (API Key)
  const expectedApiKey = process.env.SERVIPAGOS_API_KEY;
  const receivedApiKey = req.headers.get("x-api-key"); // El App Router usa .get() para headers

  if (!expectedApiKey || receivedApiKey !== expectedApiKey) {
    console.warn("❌ Acceso denegado. Clave recibida:", receivedApiKey);
    // Usamos NextResponse para devolver la respuesta JSON
    return NextResponse.json(
      { message: "Acceso no autorizado. API Key inválida." },
      { status: 401 }
    );
  }

  try {
    // 2. Extracción de Datos del Cuerpo (JSON)
    // El App Router requiere que el cuerpo se lea de forma asíncrona
    const body = await req.json();
    const { orderId, amount, currency } = body;

    // Validación básica
    if (!orderId || typeof amount !== "number" || !currency) {
      return NextResponse.json(
        { message: "Faltan datos requeridos o el monto es inválido." },
        { status: 400 }
      );
    }

    // 3. Carga de Claves de Bold
    const boldSecretKey = process.env.BOLD_SECRET_KEY as string;
    const boldPublicKey = process.env.BOLD_PUBLIC_KEY as string;

    if (!boldSecretKey || !boldPublicKey) {
      console.error("❌ ERROR: Claves BOLD no configuradas en Vercel.");
      return NextResponse.json(
        { message: "Error de configuración de la pasarela de pagos." },
        { status: 500 }
      );
    }

    // 4. Lógica de Firma
    const cleanAmount = Math.round(amount).toString();
    const dataToSign = `${orderId}${cleanAmount}${currency}${boldSecretKey}`;

    const integritySignature = crypto
      .createHash("sha256")
      .update(dataToSign)
      .digest("hex");

    // 5. Respuesta Exitosa
    return NextResponse.json(
      {
        integritySignature,
        publicKey: boldPublicKey,
        orderId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error interno generando firma Bold:", error);
    return NextResponse.json(
      { message: "Error interno del servicio de firma de pagos." },
      { status: 500 }
    );
  }
}

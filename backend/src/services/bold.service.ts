// backend/src/services/bold.service.ts

import crypto from "crypto";

// Basado en tu código, estos son los datos que realmente se usan para la firma.
// El redirect_url y otros no son parte de la cadena a firmar, sino parámetros que se envían al widget de Bold.
// Haremos que la función de firma reciba solo lo necesario para firmar.
interface BoldSignatureData {
  orderId: string;
  amount: number;
  currency: "COP";
}

export class BoldService {
  // Ahora usamos BOLD_SECRET_KEY, como en tu código.
  private readonly boldSecretKey: string;

  constructor() {
    this.boldSecretKey = process.env.BOLD_SECRET_KEY as string;

    if (!this.boldSecretKey) {
      console.error(
        "FATAL ERROR: BOLD_SECRET_KEY is not configured in environment variables."
      );
      throw new Error(
        "BOLD_SECRET_KEY is not configured in environment variables."
      );
    }
  }

  /**
   * Genera la firma de integridad para una transacción de BOLD.
   * Esta función ahora replica EXACTAMENTE tu lógica probada.
   * @param data - Los datos para la firma.
   * @returns La firma de integridad.
   */
  public generateIntegritySignature(data: BoldSignatureData): string {
    const { orderId, amount, currency } = data;

    // Asegura que es un entero sin decimales (ej: '10000', no '10000.00')
    const cleanAmount = Math.round(amount).toString();
    const dataToSign = `${orderId}${cleanAmount}${currency}${this.boldSecretKey}`;

    // === AÑADE ESTAS LÍNEAS PARA DEBUGGING ===
    const dataWithoutSecret = `${orderId}${cleanAmount}${currency}`;
    console.log(`[BOLD SERVICE] Cadena (sin clave): ${dataWithoutSecret}`);
    console.log(
      `[BOLD SERVICE] Longitud de la cadena: ${dataWithoutSecret.length}`
    );
    // =============================================

    const integritySignature = crypto
      .createHash("sha256")
      .update(dataToSign)
      .digest("hex");

    console.log(`✅ BOLD signature generated for orderId: ${orderId}`);

    return integritySignature;
  }
}

// backend/src/services/bold.service.ts

import crypto from "crypto";

// Basado en tu código, estos son los datos que realmente se usan para la firma.
// El redirect_url y otros no son parte de la cadena a firmar, sino parámetros que se envían al widget de Bold.
// Haremos que la función de firma reciba solo lo necesario para firmar.
interface BoldSignatureData {
  orderId: string;
  amountInCents: number;
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
    const { orderId, amountInCents, currency } = data;

    // Concatenamos los datos en el formato exacto que BOLD requiere.
    // Tu código usaba Math.round(parseFloat(amount)), lo cual es correcto para montos decimales.
    // Como ahora recibimos el monto en centavos (un entero), ya no es necesario el parseo/redondeo.
    const dataToSign = `${orderId}${amountInCents}${currency}${this.boldSecretKey}`;

    const integritySignature = crypto
      .createHash("sha256")
      .update(dataToSign)
      .digest("hex");

    console.log(`✅ BOLD signature generated for orderId: ${orderId}`);

    return integritySignature;
  }
}

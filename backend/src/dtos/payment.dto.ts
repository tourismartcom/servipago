// backend/src/dtos/payment.dto.ts

export interface CreatePaymentSignatureRequest {
  orderId: string;
  amountInCents: number;
  currency: "COP";
  customerEmail: string;
  description: string;
}

// Actualizamos la respuesta para que coincida con lo que el frontend de BOLD necesita
export interface CreatePaymentSignatureResponse {
  integritySignature: string; // Renombrado para ser exactos
  publicKey: string;
  orderId: string;
}

// En: servipagos.com/src/controllers/payment.controller.ts

import { Request, Response } from "express";
// Actualizamos los DTOs para incluir la publicKey
import {
  CreatePaymentSignatureRequest,
  CreatePaymentSignatureResponse,
} from "../dtos/payment.dto.js";
import { BoldService } from "../services/bold.service.js";

export class PaymentController {
  private readonly boldService: BoldService;
  private readonly boldPublicKey: string;

  constructor(boldService: BoldService) {
    this.boldService = boldService;
    this.boldPublicKey = process.env.BOLD_PUBLIC_KEY as string;

    if (!this.boldPublicKey) {
      console.error(
        "FATAL ERROR: BOLD_PUBLIC_KEY is not configured in environment variables."
      );
      throw new Error(
        "BOLD_PUBLIC_KEY is not configured in environment variables."
      );
    }
  }

  public createSignature = async (
    req: Request<{}, {}, CreatePaymentSignatureRequest>,
    res: Response<CreatePaymentSignatureResponse | { message: string }>
  ): Promise<void> => {
    try {
      const paymentData = req.body;

      // Llamamos al método actualizado en nuestro servicio
      const signature = this.boldService.generateIntegritySignature({
        orderId: paymentData.orderId,
        amountInCents: paymentData.amountInCents,
        currency: paymentData.currency,
      });

      // Construimos la respuesta, incluyendo la publicKey como en tu código original.
      const response: CreatePaymentSignatureResponse = {
        integritySignature: signature,
        publicKey: this.boldPublicKey,
        orderId: paymentData.orderId,
      };

      res.status(200).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(
        "[PaymentController] Error creating BOLD signature:",
        errorMessage
      );
      res
        .status(500)
        .json({ message: "Internal Server Error while creating signature." });
    }
  };

  // ... (el método handleBoldCallback se mantiene igual por ahora)
  public handleBoldCallback = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    // Extraemos la URL final a la que debemos redirigir. Viene como un query param.
    const finalUrl = req.query.final_url as string;
    const transactionStatus = req.query.status as string;

    console.log(
      `[SP Callback] Received from Bold. Status: ${transactionStatus}.`
    );
    console.log(`[SP Callback] Attempting to redirect to: ${finalUrl}`);
    console.log(`[SP Callback] Full query params:`, req.query);

    // Verificamos si la URL final existe.
    if (!finalUrl) {
      console.error(
        "[SP Callback] CRITICAL: final_url parameter was not provided."
      );
      res.status(400).send("Error: Missing redirection information.");
      return;
    }

    // ¡La magia! Le decimos al navegador del usuario que vaya a la URL de PL.
    // Express se encarga de enviar la respuesta HTTP 302 correcta.
    res.redirect(finalUrl);
  };
}

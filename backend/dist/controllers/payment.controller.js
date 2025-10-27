"use strict";
// En: servipagos.com/src/controllers/payment.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
class PaymentController {
    boldService;
    boldPublicKey;
    constructor(boldService) {
        this.boldService = boldService;
        this.boldPublicKey = process.env.BOLD_PUBLIC_KEY;
        if (!this.boldPublicKey) {
            console.error("FATAL ERROR: BOLD_PUBLIC_KEY is not configured in environment variables.");
            throw new Error("BOLD_PUBLIC_KEY is not configured in environment variables.");
        }
    }
    createSignature = async (req, res) => {
        try {
            const paymentData = req.body;
            // Llamamos al método actualizado en nuestro servicio
            const signature = this.boldService.generateIntegritySignature({
                orderId: paymentData.orderId,
                amountInCents: paymentData.amountInCents,
                currency: paymentData.currency,
            });
            // Construimos la respuesta, incluyendo la publicKey como en tu código original.
            const response = {
                integritySignature: signature,
                publicKey: this.boldPublicKey,
                orderId: paymentData.orderId,
            };
            res.status(200).json(response);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("[PaymentController] Error creating BOLD signature:", errorMessage);
            res
                .status(500)
                .json({ message: "Internal Server Error while creating signature." });
        }
    };
    // ... (el método handleBoldCallback se mantiene igual por ahora)
    handleBoldCallback = async (req, res) => {
        // Extraemos la URL final a la que debemos redirigir. Viene como un query param.
        const finalUrl = req.query.final_url;
        const transactionStatus = req.query.status;
        console.log(`[SP Callback] Received from Bold. Status: ${transactionStatus}.`);
        console.log(`[SP Callback] Attempting to redirect to: ${finalUrl}`);
        console.log(`[SP Callback] Full query params:`, req.query);
        console.log(`[SP Callback] Full body:`, req.body);
        // Verificamos si la URL final existe.
        if (!finalUrl) {
            console.error("[SP Callback] CRITICAL: final_url parameter was not provided.");
            res.status(400).send("Error: Missing redirection information.");
            return;
        }
        // ¡La magia! Le decimos al navegador del usuario que vaya a la URL de PL.
        // Express se encarga de enviar la respuesta HTTP 302 correcta.
        res.redirect(finalUrl);
    };
}
exports.PaymentController = PaymentController;

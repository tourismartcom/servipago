//EN SERVIPAGO: backend/src/routes/payment.routes.ts

import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.ts";
import { BoldService } from "../services/bold.service.ts";
import { authenticateClient } from "../middleware/auth.middleware.ts";

const router = Router();

// =============================================================================
// INICIALIZACIÓN DE DEPENDENCIAS
// =============================================================================
// Al igual que antes, instanciamos aquí por simplicidad.

// 1. Creamos una instancia del servicio que habla con BOLD.
const boldService = new BoldService();

// 2. Creamos una instancia del controlador y le inyectamos el servicio.
const paymentController = new PaymentController(boldService);

// =============================================================================
// DEFINICIÓN DE RUTAS
// =============================================================================

/**
 * @route   POST /api/v1/payments/create-signature
 * @desc    Ruta segura para que clientes (como PrepagosLujuria) soliciten
 *          una firma de pago de BOLD.
 * @access  Privado (requiere x-api-key)
 */
router.post(
  "/create-signature",
  authenticateClient, // <-- Middleware de seguridad. ¡Paso CRÍTICO!
  paymentController.createSignature
);

/**
 * @route   GET /api/v1/payments/bold-callback
 * @desc    Ruta para recibir webhooks/callbacks de BOLD después de una transacción.
 *          BOLD no envía una API Key, por lo que esta ruta no usa nuestro middleware.
 * @access  Público (pero solo BOLD conoce esta URL)
 */
router.get("/bold-callback", paymentController.handleBoldCallback);

export default router;

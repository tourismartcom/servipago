"use strict";
//EN SERVIPAGO: backend/src/routes/payment.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const bold_service_1 = require("../services/bold.service");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// =============================================================================
// INICIALIZACIÓN DE DEPENDENCIAS
// =============================================================================
// Al igual que antes, instanciamos aquí por simplicidad.
// 1. Creamos una instancia del servicio que habla con BOLD.
const boldService = new bold_service_1.BoldService();
// 2. Creamos una instancia del controlador y le inyectamos el servicio.
const paymentController = new payment_controller_1.PaymentController(boldService);
// =============================================================================
// DEFINICIÓN DE RUTAS
// =============================================================================
/**
 * @route   POST /api/v1/payments/create-signature
 * @desc    Ruta segura para que clientes (como PrepagosLujuria) soliciten
 *          una firma de pago de BOLD.
 * @access  Privado (requiere x-api-key)
 */
router.post("/create-signature", auth_middleware_1.authenticateClient, // <-- Middleware de seguridad. ¡Paso CRÍTICO!
paymentController.createSignature);
/**
 * @route   GET /api/v1/payments/bold-callback
 * @desc    Ruta para recibir webhooks/callbacks de BOLD después de una transacción.
 *          BOLD no envía una API Key, por lo que esta ruta no usa nuestro middleware.
 * @access  Público (pero solo BOLD conoce esta URL)
 */
router.get("/bold-callback", paymentController.handleBoldCallback);
exports.default = router;

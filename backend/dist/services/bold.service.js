"use strict";
// backend/src/services/bold.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoldService = void 0;
const crypto_1 = __importDefault(require("crypto"));
class BoldService {
    // Ahora usamos BOLD_SECRET_KEY, como en tu código.
    boldSecretKey;
    constructor() {
        this.boldSecretKey = process.env.BOLD_SECRET_KEY;
        if (!this.boldSecretKey) {
            console.error("FATAL ERROR: BOLD_SECRET_KEY is not configured in environment variables.");
            throw new Error("BOLD_SECRET_KEY is not configured in environment variables.");
        }
    }
    /**
     * Genera la firma de integridad para una transacción de BOLD.
     * Esta función ahora replica EXACTAMENTE tu lógica probada.
     * @param data - Los datos para la firma.
     * @returns La firma de integridad.
     */
    generateIntegritySignature(data) {
        const { orderId, amountInCents, currency } = data;
        // Concatenamos los datos en el formato exacto que BOLD requiere.
        // Tu código usaba Math.round(parseFloat(amount)), lo cual es correcto para montos decimales.
        // Como ahora recibimos el monto en centavos (un entero), ya no es necesario el parseo/redondeo.
        const dataToSign = `${orderId}${amountInCents}${currency}${this.boldSecretKey}`;
        const integritySignature = crypto_1.default
            .createHash("sha256")
            .update(dataToSign)
            .digest("hex");
        console.log(`✅ BOLD signature generated for orderId: ${orderId}`);
        return integritySignature;
    }
}
exports.BoldService = BoldService;

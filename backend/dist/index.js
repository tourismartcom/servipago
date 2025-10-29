"use strict";
//EN SERVIPAGO: backend/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =========================================================================
// == PASO 2: PRUEBA DE DIAGNÓSTICO INMEDIATO ==
// =========================================================================
// Esta línea nos dirá si el archivo .env fue leído correctamente.
console.log("[DIAGNÓSTICO] SERVIPAGOS_API_KEY:", process.env.SERVIPAGOS_API_KEY);
// =========================================================================
// == PASO 3: AHORA SÍ, IMPORTAR EL RESTO DE LA APLICACIÓN ==
// =========================================================================
// Como las variables ya están cargadas en `process.env`, estos imports
// podrán acceder a ellas sin problema.
const express_1 = __importDefault(require("express"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Servipagos API is running!" });
});
app.use("/api/v1/payments", payment_routes_1.default);
app.use((req, res) => {
    res
        .status(404)
        .json({ message: "Not Found: The requested endpoint does not exist." });
});
app.listen(PORT, () => {
    console.log(`✅ Servipagos.com server is running on http://localhost:${PORT}`);
});

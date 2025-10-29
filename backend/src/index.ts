//EN SERVIPAGO: backend/src/index.ts

// =========================================================================
// == PASO 2: PRUEBA DE DIAGNÓSTICO INMEDIATO ==
// =========================================================================
// Esta línea nos dirá si el archivo .env fue leído correctamente.
console.log(
  "[DIAGNÓSTICO] SERVIPAGOS_API_KEY:",
  process.env.SERVIPAGOS_API_KEY
);

// =========================================================================
// == PASO 3: AHORA SÍ, IMPORTAR EL RESTO DE LA APLICACIÓN ==
// =========================================================================
// Como las variables ya están cargadas en `process.env`, estos imports
// podrán acceder a ellas sin problema.
import express, { Express, Request, Response } from "express";
import paymentRoutes from "./routes/payment.routes";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Servipagos API is running!" });
});

app.use("/api/v1/payments", paymentRoutes);

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: "Not Found: The requested endpoint does not exist." });
});

app.listen(PORT, () => {
  console.log(
    `✅ Servipagos.com server is running on http://localhost:${PORT}`
  );
});

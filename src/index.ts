import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
  res.json({ ok: true, message: "ServiPagos backend alive" });
});

const PORT = process.env.PORT || 4000;
app.listen(Number(PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`✅ ServiPagos backend running on http://localhost:${PORT}`);
});

interface SignRequestBody {
  orderId: string;
  amount: string; // usar string para evitar problemas con decimales (ej. "15000")
  currency?: string; // opcional, por defecto "COP"
  description?: string;
}

interface SignResponse {
  ok: true;
  orderId: string;
  signature: string;
  stringToSign: string;
  timestamp: number;
}

app.post("/api/payments/sign", (req: Request, res: Response) => {
  try {
    const body = req.body as SignRequestBody;

    // Validaciones básicas
    if (!body || !body.orderId || !body.amount) {
      return res
        .status(400)
        .json({ ok: false, error: "orderId y amount son requeridos" });
    }

    const orderId = String(body.orderId).trim();
    const amount = String(body.amount).trim();
    const currency = (body.currency ?? "COP").trim();
    const description = (body.description ?? "").trim();

    // Timestamp (segundos unix)
    const timestamp = Math.floor(Date.now() / 1000);

    // Cadena a firmar (formato elegido): orderId|amount|currency|timestamp|description
    // Incluir timestamp ayuda a evitar firmas reutilizables
    const stringToSign = `${orderId}|${amount}|${currency}|${timestamp}|${description}`;

    const privateKey = process.env.BOLD_PRIVATE_KEY;
    if (!privateKey) {
      console.error("BOLD_PRIVATE_KEY no definida en .env");
      return res
        .status(500)
        .json({ ok: false, error: "Configuración interna faltante" });
    }

    // Generar HMAC-SHA256 y devolver hex
    const signature = crypto
      .createHmac("sha256", privateKey)
      .update(stringToSign)
      .digest("hex");

    const payload: SignResponse = {
      ok: true,
      orderId,
      signature,
      stringToSign,
      timestamp,
    };

    return res.json(payload);
  } catch (err) {
    console.error("Error en /api/payments/sign:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Error interno generando firma" });
  }
});

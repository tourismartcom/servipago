// En: servipagos.com/src/controllers/checkout.controller.ts

import { Request, Response } from "express";
import { BoldService } from "../services/bold.service";
import crypto from "crypto";

export class CheckoutController {
  private readonly boldService: BoldService;
  private readonly boldPublicKey: string;

  constructor(boldService: BoldService) {
    this.boldService = boldService;
    this.boldPublicKey = process.env.BOLD_PUBLIC_KEY as string;
  }

  /**
   * Sirve la página de checkout con marca Servipagos
   */
  public serveCheckoutPage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const {
        orderId,
        amount,
        signature,
        publicKey,
        return: returnUrl,
      } = req.query;

      // Validación de parámetros
      if (!orderId || !amount || !signature || !publicKey || !returnUrl) {
        res.status(400).send("Faltan parámetros requeridos");
        return;
      }

      // Verificar firma (anti-manipulación)
      const expectedSignature = this.boldService.generateIntegritySignature({
        orderId: orderId as string,
        amount: Number(amount),
        currency: "COP",
      });

      if (expectedSignature !== signature) {
        console.error("[Checkout] Firma inválida detectada");
        res.status(403).send("Firma de pago inválida");
        return;
      }

      // Generar HTML con marca Servipagos + widget BOLD
      const html = this.generateCheckoutHTML({
        orderId: orderId as string,
        amount: Number(amount),
        publicKey: publicKey as string,
        signature: signature as string,
        returnUrl: returnUrl as string,
      });

      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("[Checkout] Error:", error);
      res.status(500).send("Error al procesar el checkout");
    }
  };

  private generateCheckoutHTML(params: {
    orderId: string;
    amount: number;
    publicKey: string;
    signature: string;
    returnUrl: string;
  }): string {
    const { orderId, amount, publicKey, signature, returnUrl } = params;
    const amountFormatted = amount.toLocaleString("es-CO");

    // El pago termina en Servipagos (callback) y de ahí a lujuria
    const callbackUrl =
      `https://servipagos-backend.onrender.com/api/v1/payments/bold-callback` +
      `?final_url=${encodeURIComponent(returnUrl)}`;

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pago Seguro - Servipagos</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 500px;
      width: 100%;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 { font-size: 26px; margin-bottom: 8px; }
    .header p { opacity: 0.9; font-size: 14px; }
    .content { padding: 35px 30px; }
    .amount-box {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .amount-label { font-size: 14px; color: #6c757d; margin-bottom: 8px; }
    .amount-value { font-size: 38px; font-weight: bold; color: #28a745; }
    .methods {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .method-badge {
      background: #eef2ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 20px;
    }
    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #6c757d;
      font-size: 13px;
      margin-bottom: 24px;
    }
    .pay-btn {
      width: 100%;
      background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      padding: 16px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .pay-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(40,167,69,0.4);
    }
    .pay-btn:disabled {
      background: #adb5bd;
      cursor: wait;
    }
    .note {
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      margin-top: 16px;
      line-height: 1.5;
    }
    .spinner-small {
      display: inline-block;
      border: 3px solid rgba(255,255,255,0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      animation: spin 1s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ Servipagos</h1>
      <p>Checkout seguro de tu pedido</p>
    </div>
    <div class="content">
      <div class="amount-box">
        <div class="amount-label">Total a pagar</div>
        <div class="amount-value">$${amountFormatted} COP</div>
      </div>

      <div class="methods">
        <span class="method-badge">💳 Tarjeta</span>
        <span class="method-badge">🏦 PSE</span>
        <span class="method-badge">💜 Nequi</span>
        <span class="method-badge">🏧 Bancolombia</span>
      </div>

      <div class="security-badge">
        🔒 Transacción cifrada y protegida por Servipagos
      </div>

      <button id="pay-btn" class="pay-btn" disabled>
        <span class="spinner-small"></span> Preparando pago seguro...
      </button>

      <p class="note">
        Al hacer clic serás llevado a nuestra pasarela aliada para
        completar el pago. Orden: <strong>${orderId.slice(-8)}</strong>
      </p>
    </div>
  </div>

  <script>
    var config = {
      orderId: "${orderId}",
      currency: "COP",
      amount: "${amount}",
      apiKey: "${publicKey}",
      integritySignature: "${signature}",
      description: "Pago seguro vía Servipagos",
      redirectionUrl: "${callbackUrl}"
    };

    var btn = document.getElementById('pay-btn');

    var script = document.createElement('script');
    script.src = "https://checkout.bold.co/library/boldPaymentButton.js";

    script.onload = function () {
      try {
        window.__boldCheckout = new window.BoldCheckout(config);
        btn.disabled = false;
        btn.innerHTML = "💳 Pagar $${amountFormatted} COP";
        btn.onclick = function () {
          btn.disabled = true;
          btn.innerHTML = "Abriendo pasarela segura...";
          window.__boldCheckout.open();
        };
      } catch (e) {
        btn.innerHTML = "Error al preparar el pago. Recarga la página.";
      }
    };

    script.onerror = function () {
      btn.innerHTML = "Error de conexión. Recarga la página.";
    };

    document.head.appendChild(script);
  </script>
</body>
</html>
    `;
  }

  public serveResultPage = (req: Request, res: Response): void => {
    const status = ((req.query.status as string) || "UNKNOWN").toUpperCase();
    const finalUrl = req.query.final_url as string;

    if (!finalUrl) {
      res.status(400).send("Falta información de redirección.");
      return;
    }

    const approved =
      status === "APPROVED" || status === "SUCCESS" || status === "APROBADA";

    // Le anexamos el status al URL final para que lujuria sepa el resultado
    const sep = finalUrl.includes("?") ? "&" : "?";
    const target = `${finalUrl}${sep}status=${encodeURIComponent(status)}`;

    res.setHeader("Content-Type", "text/html");
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resultado del pago - Servipagos</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
      background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
      min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px;
    }
    .card { background:white; border-radius:16px; max-width:460px; width:100%;
      box-shadow:0 20px 60px rgba(0,0,0,.3); overflow:hidden; text-align:center; }
    .top { padding:26px; color:white; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
    .top h1 { font-size:22px; }
    .body { padding:36px 28px; }
    .icon { font-size:64px; margin-bottom:16px; }
    .msg { font-size:20px; font-weight:bold; margin-bottom:8px;
      color:${approved ? "#28a745" : "#dc3545"}; }
    .sub { color:#6c757d; font-size:14px; margin-bottom:24px; }
    .spin { border:3px solid #f3f3f3; border-top:3px solid #667eea; border-radius:50%;
      width:34px; height:34px; animation:spin 1s linear infinite; margin:0 auto 12px; }
    @keyframes spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
    a { color:#667eea; font-size:13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="top"><h1>🛡️ Servipagos</h1></div>
    <div class="body">
      <div class="icon">${approved ? "✅" : "❌"}</div>
      <div class="msg">${approved ? "¡Pago aprobado!" : "Pago no aprobado"}</div>
      <div class="sub">Transacción procesada por Servipagos<br>Estado: ${status}</div>
      <div class="spin"></div>
      <div class="sub">Regresando a la tienda...</div>
      <a href="${target}">Si no eres redirigido, haz clic aquí</a>
    </div>
  </div>
  <script>
    setTimeout(function(){ window.location.href = "${target}"; }, 2500);
  </script>
</body>
</html>
    `);
  };
}

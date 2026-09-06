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
    .header h1 {
      font-size: 24px;
      margin-bottom: 8px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 40px 30px;
    }
    .amount-box {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 30px;
    }
    .amount-label {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 8px;
    }
    .amount-value {
      font-size: 36px;
      font-weight: bold;
      color: #28a745;
    }
    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #6c757d;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .security-badge svg {
      width: 16px;
      height: 16px;
    }
    #bold-checkout-container {
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loading {
      text-align: center;
      color: #6c757d;
    }
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💳 Pago Seguro</h1>
      <p>Procesado por Servipagos</p>
    </div>
    <div class="content">
      <div class="amount-box">
        <div class="amount-label">Monto a pagar</div>
        <div class="amount-value">$${amountFormatted} COP</div>
      </div>
      
      <div class="security-badge">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
        </svg>
        <span>Pago cifrado y seguro</span>
      </div>

      <div id="bold-checkout-container">
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando formulario de pago...</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Configuración de Bold Checkout
    const config = {
      orderId: "${orderId}",
      currency: "COP",
      amount: "${amount}",
      apiKey: "${publicKey}",
      integritySignature: "${signature}",
      description: "Pago seguro vía Servipagos",
      redirectionUrl: "${returnUrl}",
    };

    // Cargar script de Bold
    const script = document.createElement('script');
    script.src = "https://checkout.bold.co/library/boldPaymentButton.js";
    script.onload = () => {
      console.log('✅ Bold script cargado');
      
      // Crear instancia y abrir automáticamente
      const checkout = new window.BoldCheckout(config);
      
      // Abrir el checkout después de 500ms (para que el usuario vea la página de Servipagos)
      setTimeout(() => {
        console.log('🎯 Abriendo checkout de Bold...');
        checkout.open();
      }, 500);
    };
    
    script.onerror = () => {
      document.getElementById('bold-checkout-container').innerHTML = 
        '<p style="color: #dc3545; text-align: center;">Error al cargar el formulario de pago. Por favor, recarga la página.</p>';
    };
    
    document.head.appendChild(script);
  </script>
</body>
</html>
    `;
  }
}

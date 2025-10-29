"use strict";
//EN SERVIPAGO:  backend/src/middleware/auth.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateClient = void 0;
// =============================================================================
// CARGA DE LA API KEY DESDE VARIABLES DE ENTORNO
// =============================================================================
// Es FUNDAMENTAL que las claves secretas NUNCA estén escritas directamente
// en el código. Siempre deben cargarse desde el entorno (.env en desarrollo).
const SERVIPAGOS_API_KEY = process.env.SERVIPAGOS_API_KEY;
console.log("[DIAGNÓSTICO] SERVIPAGOS_API_KEY:", process.env.SERVIPAGOS_API_KEY);
// Verificación de seguridad al iniciar la aplicación.
// Si la API key no está definida, es mejor que la aplicación falle al arrancar
// a que se ejecute de forma insegura.
if (!SERVIPAGOS_API_KEY) {
    console.error("FATAL ERROR: SERVIPAGOS_API_KEY is not defined in environment variables.");
    process.exit(1); // Detiene la ejecución del programa.
}
/**
 * Middleware de Express para autenticar clientes por API Key.
 * Verifica que la cabecera 'x-api-key' esté presente y coincida
 * con la clave secreta configurada.
 *
 * @param req - Objeto de la petición (Request)
 * @param res - Objeto de la respuesta (Response)
 * @param next - Función para pasar el control al siguiente middleware o controlador
 */
const authenticateClient = (req, res, next) => {
    // 1. Obtener la API key de las cabeceras de la petición.
    //    El nombre 'x-api-key' es una convención común.
    const apiKey = req.headers["x-api-key"];
    // 2. Verificar si la key fue proporcionada.
    if (!apiKey) {
        // Si no hay key, respondemos con un error 401 Unauthorized.
        res.status(401).json({
            message: 'Unauthorized: Missing API Key. Please include the "x-api-key" header.',
        });
        return; // Detenemos la ejecución.
    }
    // 3. Comparar la key proporcionada con la que tenemos guardada.
    if (apiKey !== SERVIPAGOS_API_KEY) {
        // Si la key no coincide, respondemos con un error 403 Forbidden.
        // Usamos 403 (Prohibido) en lugar de 401 porque el cliente se "autenticó"
        // (envió una key), pero no tiene permiso para acceder.
        res.status(403).json({ message: "Forbidden: Invalid API Key." });
        return; // Detenemos la ejecución.
    }
    // 4. Si todas las verificaciones pasan, llamamos a next().
    //    Esto le dice a Express: "Todo está bien, puedes continuar con
    //    la siguiente función en la cadena (que será nuestro controlador)".
    next();
};
exports.authenticateClient = authenticateClient;

// src/handlerErrors.js - El escudo protector para Vite/React
export const initErrorShield = () => {
  if (typeof window === "undefined") return;

  // 1. Errores de código globales
  window.onerror = (mensaje, fuente, linea, columna) => {
    console.group(
      "%c🚨 ALERTA GOCODER: Error de Código",
      "color: white; background: #ff3333; padding: 4px; border-radius: 3px;",
    );
    console.error(`¿Qué pasó?: ${mensaje}`);
    console.error(`¿Dónde?: Línea ${linea}, columna ${columna}`);
    console.log(
      "%c💡 Consejo: Revisa el último código que modificaste.",
      "color: #00ff00; font-weight: bold;",
    );
    console.groupEnd();
    return false;
  };

  // 2. Errores de carga (Imágenes de assets que no existen, rutas mal escritas)
  window.addEventListener(
    "error",
    (event) => {
      if (
        event.target &&
        (event.target.tagName === "IMG" || event.target.tagName === "AUDIO")
      ) {
        console.group(
          "%c⚠️ ALERTA GOCODER: Archivo no encontrado",
          "color: black; background: #ffcc00; padding: 4px; border-radius: 3px;",
        );
        console.warn(
          `No se pudo cargar: ${event.target.src || event.target.currentSrc}`,
        );
        console.log(
          "%c💡 Consejo: Verifica la ruta en tu carpeta 'public' o 'assets'.",
          "color: #0088ff; font-weight: bold;",
        );
        console.groupEnd();
      }
    },
    true,
  );

  // 3. Promesas rotas
  window.addEventListener("unhandledrejection", (event) => {
    console.error("💥 Promesa no controlada:", event.reason);
  });

  console.log(
    "%c🛡️ Escudo goCoder (React/Vite Mode): ¡ACTIVADO! 🛡️",
    "color: #00ff00; font-weight: bold;",
  );
};

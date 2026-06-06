import React, { useRef, useEffect } from "react";

export default function JuegoDos() {
  // 1. El "control remoto" para conectar con la etiqueta <canvas>
  const canvasRef = useRef(null);

  useEffect(() => {
    // A. Obtener la referencia del lienzo
    const canvas = canvasRef.current;
    if (!canvas) return;

    // B. Activar el pincel de dos dimensiones (Contexto 2D)
    const ctx = canvas.getContext("2d");

    // C. Cargar los recursos (Imagen de fondo)
    const imagenFondo = new Image();
    // Reemplaza esta URL de prueba por 'fondo.jpg' una vez que el niño guarde su imagen en la carpeta /public
    imagenFondo.src =
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop";
    // "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800";

    // Variable de prueba para el bloque del Día 3
    let bloqueX = 50;

    // D. El Corazón del Juego: El Game Loop (Bucle de juego)
    let idAnimacion;

    const bucleJuego = () => {
      // PASO 1: Limpiar la pizarra por completo antes de volver a dibujar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // PASO 2: Dibujar el fondo del escenario (Día 5)
      // Si la imagen ya cargó, la dibuja. Si no, usa un color sólido temporal.
      if (imagenFondo.complete) {
        ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "#1e293b"; // Fondo oscuro por defecto
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // PASO 3: Bloque de prueba geométrico (Día 3)
      // Dibujamos un cuadrado azul que se moverá levemente solo para verificar que el Game Loop funciona
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(bloqueX, 150, 40, 40);

      // Animación de prueba simple: mover el bloque a la derecha y resetearlo
      bloqueX += 1;
      if (bloqueX > canvas.width) bloqueX = -40;

      // PASO 4: Pedirle al navegador que ejecute este bucle en el próximo fotograma
      idAnimacion = requestAnimationFrame(bucleJuego);
    };

    // E. Arrancar el bucle cuando el componente esté listo
    imagenFondo.onload = () => {
      // Opcional: arranca inmeGUIAtamente si la imagen ya cargó
    };
    bucleJuego();

    // F. Limpieza automática de React si el usuario cierra el componente
    return () => {
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 min-h-125 rounded-xl shadow-2xl border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4 tracking-wide font-sans">
        🎮 Mi Primer Videojuego (Capa 1: El Escenario)
      </h2>

      {/* El Lienzo del Juego: Ajustado a 800x450 (Relación clásica de aspecto 16:9) */}
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="border-4 border-indigo-500 rounded-lg shadow-lg bg-slate-800 max-w-full"
      />

      <p className="text-slate-400 text-xs mt-3 text-center italic">
        Usa una imagen de 800x450 píxeles para tu fondo personalizado.
      </p>
    </div>
  );
}

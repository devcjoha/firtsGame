import { useEffect, useRef } from 'react';

export default function Juego() {
  // 1. El "control remoto" para conectar con la etiqueta <canvas>
  const canvasRef = useRef(null);

  useEffect(() => {
    // 2. Obtenemos el canvas físico y su pincel (contexto)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 3. Configuración del fondo del juego (Capa 1 - Jueves)
    const imagenFondo = new Image();
    imagenFondo.src = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop'; // Fondo espacial temporal
    
    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true;
    };

    // 4. El Motor del Juego: El Bucle Infinito (Capa 1 - Miércoles)
    let idAnimacion;

    const bucleJuego = () => {
      // --- PASO A: ACTUALIZAR DATOS ---
      // (Aquí irá la lógica de movimiento del jugador y obstáculos en las semanas 2 y 3)

      // --- PASO B: LIMPIAR EL LIENZO ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- PASO C: DIBUJAR EL MUNDO ---
      if (fondoCargado) {
        // Si la imagen ya cargó, la dibujamos cubriendo todo el canvas
        ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
      } else {
        // Mientras carga, pintamos un fondo azul oscuro de respaldo
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Dibujo de prueba de la pantalla (Texto guía temporal)
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px sans-serif';
      ctx.fillText('Motor del Juego Listo - Capa 1 Superada', 50, 50);

      // Pedirle al navegador que ejecute este bucle en el siguiente fotograma
      idAnimacion = requestAnimationFrame(bucleJuego);
    };

    // Encender el motor del juego
    bucleJuego();

    // Limpieza de seguridad: Detiene el juego si el alumno sale de la página
    return () => {
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 select-none">
      <h1 className="text-white text-2xl font-bold tracking-wider font-sans">
        Mi Primer Videojuego Canvas
      </h1>
      
      {/* El lienzo del juego con bordes redondeados y sombra estilizada con Tailwind */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black"
      />
      
      <p className="text-slate-400 text-sm font-sans">
        Resolución Objetivo: 800x500 píxeles
      </p>
    </div>
  );
}
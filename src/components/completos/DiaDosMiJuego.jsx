import { useEffect, useRef } from "react";

function MiJuego() {
  // 1. El "control remoto" para conectar con el lienzo (canvas)
  const canvasRef = useRef(null);

  // 2. Propiedades de nuestra nave (El protagonista)
  const jugador = {
    x: 375, // Posición horizontal inicial
    y: 400, // Posición vertical inicial
    ancho: 50, // Tamaño
    alto: 50,
    color: "#6366f1", // Color violeta moderno
  };

  useEffect(() => {
    // 3. Preparamos el lienzo y el pincel (ctx)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    /**************************************
      💻 Creamos el objeto imagen
    ************************************* */
    const imagenFondo = new Image();
    imagenFondo.src = "./src/assets/bg-dos.png"; // Asegúrate de tener esta imagen en tu proyecto

    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true; // Solo dibujaremos la imagen cuando esté lista
    };

    let idAnimacion;

    /**************************************
      🔄️ BUCLE DEL JUEGO
    ************************************* */
    const bucleJuego = () => {
      // PASO A: Limpiar el lienzo
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      if (fondoCargado) {
        ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
      } else {
        // Fondo de respaldo por si falla la imagen
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      /* ----------------------------------------------------
       👇 Jugador / nave (Se dibuja encima de todo)
        ----------------------------------------------------*/
      ctx.fillStyle = jugador.color;
      ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

      // Detalle estético: borde brillante para la nave
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);
      /* ----------------------------------------------------
        👇 Siguiente frame
      ----------------------------------------------------*/
      // PASO D: Repetir el dibujo unas 60 veces por segundo
      idAnimacion = requestAnimationFrame(bucleJuego);
    };

    /**************************************
    👇 💥💥¡Arrancamos el motor! 💥💥
    ************************************* */
    bucleJuego();
    /**************************************
      🧹🧼 LIMPIEZA: Limpiamos todo cuando el componente se desmonte para evitar fugas de memoria y errores raros 👇
      ************************************* */
    return () => cancelAnimationFrame(idAnimacion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**************************************
       RENDERIZADO HTML 👇
  ************************************* */
  return (
    <div className="flex flex-col items-center gap-4">
      {/* El lienzo donde se dibuja todo */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black"
      />

      <p className="text-slate-400 font-mono text-sm">
        Motor, Fondo y Jugador listos 🚀
      </p>
    </div>
  );
}

export default MiJuego;

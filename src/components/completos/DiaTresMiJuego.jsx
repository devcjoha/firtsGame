import { useEffect, useRef } from "react";

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    /**************************************
      🔄️ BUCLE DEL JUEGO
    ************************************* */
    const bucleJuego = () => {
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      ctx.fillStyle = "#192EE3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
       👇 Texto
        ----------------------------------------------------*/
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("¡Motor funcionando!", 200, 250);

      /* ----------------------------------------------------
        👇 Siguiente frame
      ----------------------------------------------------*/
      animacionRef.current = requestAnimationFrame(bucleJuego);
    };
    /* ----------------------------------------------------
      Hasta acá el bucleJuego 👆
      ----------------------------------------------------*/

    animacionRef.current = requestAnimationFrame(bucleJuego);

       /**************************************
      🧹🧼 LIMPIEZA: Limpiamos todo cuando el componente se desmonte para evitar fugas de memoria y errores raros 👇
      ************************************* */
    return () => {
      cancelAnimationFrame(animacionRef.current);
    };
  }, []);

  /**************************************
       RENDERIZADO HTML 👇
  ************************************* */
  return (
    <div>
      <h1 className="p-2 text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-indigo-400 to-orange-200 tracking-tight sm:text-3xl">
        Hola Mundo!
      </h1>
      <canvas
        ref={canvasRef}
        width={670}
        height={500}
        className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black"
      />
    </div>
  );
}
export default MiJuego;

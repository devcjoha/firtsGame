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
      💻 Creamos el objeto imagen
    ************************************* */
    const imagenFondo = new Image();
    // Le damos la dirección de internet de la foto
    //  imagenFondo.src = "./src/assets/bg-uno.png";
    imagenFondo.src =
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop";

    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true; // Avisamos que la imagen ya se cargó
    };
    /**************************************
      🔄️ BUCLE DEL JUEGO
    ************************************* */
    const bucleJuego = () => {
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      if (fondoCargado) {
        // Si la imagen cargó, la dibujamos en todo el canvas
        ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
      } else {
        // Si aún no carga, dejamos el fondo azul oscuro de respaldo
        ctx.fillStyle = "#001f3f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      /* ----------------------------------------------------
       👇 Texto
        ----------------------------------------------------*/
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("¡Fondo Cargado con Éxito!", 50, 50);

      /* ----------------------------------------------------
        👇 Siguiente frame
      ----------------------------------------------------*/
      animacionRef.current = requestAnimationFrame(bucleJuego);
    };
    /* ----------------------------------------------------
      Hasta acá el bucleJuego 👆
      ----------------------------------------------------*/

    /**************************************
    👇 💥💥¡Arrancamos el motor! 💥💥
    ************************************* */
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

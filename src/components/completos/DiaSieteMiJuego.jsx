import { useEffect, useRef } from "react";
import { resizeCanvas } from "../utils/resizeCanvas";

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
  const ANCHO_LOGICO = 1000;
  const ALTO_LOGICO = 500;

  const jugador = {
    x: 100, // Posición horizontal
    y: 250, // Posición vertical (el suelo temporal)
    ancho: 50, // Qué tan gordo es
    alto: 50, // Qué tan alto es
    velocidad: 20, // Cuántos píxeles se mueve de lado a lado
    color: "#38bdf8",
    // 👇 ¡NUEVOS SUPERPODERES FÍSICOS! 👇
    velocidadY: 0, // Velocidad vertical (hacia arriba o abajo)
    saltando: false, // Nos dice si está en el aire (true) o en el suelo (false)
    gravedad: 0.5, // La fuerza que lo empuja hacia abajo constantemente
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 📱 ACTIVAMOS LA MAGIA RESPONSIVA
    const manejarResize = () => resizeCanvas(canvas, ANCHO_LOGICO, ALTO_LOGICO);
    manejarResize(); // Lo ejecutamos de inmeGUIAto al cargar

    // Le decimos al navegador que si giran el celular, vuelva a acomodar el tamaño
    window.addEventListener("resize", manejarResize);
    window.addEventListener("orientationchange", manejarResize);

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
      🔄️ BUCLE DEL JUEGO 👇
    ************************************* */
    const bucleJuego = () => {
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
      👇 EL SALTO : APLICAR FÍSICA (Gravedad y Suelo) 👇
        ----------------------------------------------------*/
      // La gravedad siempre empuja al jugador hacia abajo aumentándole la velocidad vertical
      jugador.velocidadY += jugador.gravedad;
      // Cambiamos la posición real en 'y' del jugador
      jugador.y += jugador.velocidadY;

      // 🛑 El límite del suelo (El lienzo mide 500 de alto, menos 50 de la nave = 450)
      if (jugador.y >= 450) {
        jugador.y = 450; // Lo plantamos firmemente en el suelo
        jugador.velocidadY = 0; // Detenemos la caída
        jugador.saltando = false; // ¡Ya no está saltando!
      }

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      if (fondoCargado) {
        // Si la imagen cargó, la dibujamos en todo el canvas
        ctx.drawImage(imagenFondo, 0, 0, ANCHO_LOGICO, ALTO_LOGICO);
      } else {
        // Si aún no carga, dejamos el fondo azul oscuro de respaldo
        ctx.fillStyle = "#001f3f";
        ctx.fillRect(0, 0, ANCHO_LOGICO, ALTO_LOGICO);
      }

      /* ----------------------------------------------------
       👇 Texto
        ----------------------------------------------------*/
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("¡Fondo Cargado con Éxito!", 50, 50);

      /* ----------------------------------------------------
       👇 Jugador (Se dibuja encima de todo)
        ----------------------------------------------------*/
      ctx.fillStyle = jugador.color; // Un hermoso color azul celeste
      ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto); // la figura que representa al jugador y su posición

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
     ⌨️ MANEJAR EL TECLADO : Control del jugador con el teclado
    ************************************* */
    const manejarTeclado = (evento) => {
      if (evento.key === "ArrowRight") {
        jugador.x += jugador.velocidad; // Se mueve a la derecha ➡️
      }
      if (evento.key === "ArrowLeft") {
        jugador.x -= jugador.velocidad; // Se mueve a la izquierda ⬅️
      }
      // 👇 ¡NUEVO: El botón de salto! 👇
      if (
        (evento.key === " " || evento.key === "ArrowUp") &&
        !jugador.saltando
      ) {
        jugador.velocidadY = -15; // Un impulso negativo porque en Canvas "arriba" es restar en Y
        jugador.saltando = true; // Le avisamos al juego que está flotando
      }
    };

    // Conectamos el RADAR DEL TECLADO a la ventana del navegador
    window.addEventListener("keydown", manejarTeclado);

    /**************************************
     ⌨️ 👇 NUEVO Radar Táctil para Celulares y Tablets! 👇
    ************************************* */
    const manejarToqueMovil = (evento) => {
      // Evitamos que la pantalla se mueva bruscamente al tocarla
      evento.preventDefault();

      // Si el jugador NO está saltando, ¡le damos el impulso hacia arriba!
      if (!jugador.saltando) {
        jugador.velocidadY = -15; // El mismo impulso que usamos con el teclado
        jugador.saltando = true; // Le avisamos al juego que está flotando
      }
    };

    // 👇 Conectamos el RADAR TÁCTIL al lienzo de nuestro juego
    canvas.addEventListener("touchstart", manejarToqueMovil);

    /**************************************
      🧹🧼 LIMPIEZA: Limpiamos todo cuando el componente se desmonte para evitar fugas de memoria y errores raros 👇
      ************************************* */
    return () => {
      cancelAnimationFrame(animacionRef.current);
      window.removeEventListener("keydown", manejarTeclado);

      // 👇 Apagamos los radares del celular 👇
      window.removeEventListener("resize", manejarResize);
      window.removeEventListener("orientationchange", manejarResize);
      canvas.removeEventListener("touchstart", manejarToqueMovil);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**************************************
       RENDERIZADO HTML 👇
  ************************************* */
  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center ">
      <header className="header-juego  text-center mb-4 lg:block">
        <h1 className="titulo-juego text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-indigo-400 to-orange-200 tracking-tight">
          Hola Mundo!
        </h1>
      </header>
      <canvas
        id="miJuegoCanvas"
        ref={canvasRef}
        className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black object-contain"
      ></canvas>
    </div>
  );
}
export default MiJuego;

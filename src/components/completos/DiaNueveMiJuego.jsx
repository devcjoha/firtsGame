import { useEffect, useRef, useState } from "react";
import { resizeCanvas } from "../utils/resizeCanvas";
import { activarPantallaCompleta } from "../utils/pantallaCompleta";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Maximize2,
  Minimize2,
} from "lucide-react";

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
  const contenedorRef = useRef(null);
  const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
  const ANCHO_LOGICO = 1000;
  const ALTO_LOGICO = 500;

  const jugador = useRef({
    color: "#38bdf8",
    x: 100,
    y: 250,
    ancho: 50,
    alto: 50,
    moviendoIzquierda: false,
    moviendoDerecha: false,

    velocidad: 8,
    vx: 0, // Velocidad actual en el eje X (empieza quieto)
    velocidadY: 0,
    velocidadMaxima: 6, // El límite de velocidad para que no corra infinitamente
    friccion: 0.85, // El "roce" del suelo (menor a 1 para ir frenando solo)
    gravedad: 0.5,
    aceleracion: 0.8, // Qué tan rápido gana velocidad por fotograma

    saltando: false,

  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**************************************
      📱 ACTIVAMOS LA MAGIA RESPONSIVA
    ************************************* */
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
    imagenFondo.src = "./src/assets/bg-tres.png";
    // imagenFondo.src =
    //   "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop";

    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true; // Avisamos que la imagen ya se cargó
    };

    /**************************************
      🔄️ BUCLE DEL JUEGO
    ************************************* */
    const bucleJuego = () => {
      // Usamos directamente jugadorRef.current para garantizar lectura en tiempo real
      const gamer = jugador.current;
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ----------------------------------------------------
      👇 MOVIMIENTO CONTINUO (Revisamos los interruptores) 👇
        ----------------------------------------------------*/
      if (gamer.moviendoIzquierda) {
        // Restamos aceleración para ir a la izquierda, sin superar la velocidad máxima permitida
        gamer.vx = Math.max(
          gamer.vx - gamer.aceleracion,
          -gamer.velocidadMaxima,
        );
      } else if (gamer.moviendoDerecha) {
        // Sumamos aceleración para ir a la derecha, sin superar la velocidad máxima permitida
        gamer.vx = Math.min(
          gamer.vx + gamer.aceleracion,
          gamer.velocidadMaxima,
        );
      } else {
        // ✨ ¡La magia de la Fricción! Si no presionas nada, se va frenando gradualmente
        gamer.vx *= gamer.friccion;
        // Para evitar que quede temblando con velocidades muy bajas, lo detenemos completamente
        if (Math.abs(gamer.vx) < 0.1) gamer.vx = 0;
      }
      // 💥 Aplicamos la velocidad calculada a la posición real en X del jugador
      gamer.x += gamer.vx;

      /* ----------------------------------------------------
      👇 EL SALTO : APLICAR FÍSICA (Gravedad y Suelo) 👇
        ----------------------------------------------------*/
      // La gravedad siempre empuja al jugador hacia abajo aumentándole la velocidad vertical
      gamer.velocidadY += gamer.gravedad;
      // Cambiamos la posición real en 'y' del jugador
      gamer.y += gamer.velocidadY;

      // 🛑 El límite del suelo (El lienzo mide 500 de alto, menos 50 de la nave = 450)
      if (gamer.y >= 450) {
        gamer.y = 450; // Lo plantamos firmemente en el suelo
        gamer.velocidadY = 0; // Detenemos la caída
        gamer.saltando = false; // ¡Ya no está saltando!
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
      ctx.fillStyle = gamer.color; // Un hermoso color azul celeste
      ctx.fillRect(gamer.x, gamer.y, gamer.ancho, gamer.alto); // la figura que representa al jugador y su posición

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
     ⌨️ TECLAS PARA MOVERSE: Activamos los interruptores al presionar las teclas
    ************************************* */
    const manejarKeyDown = (evento) => {
      if (evento.key === "ArrowRight") jugador.current.moviendoDerecha = true;
      if (evento.key === "ArrowLeft") jugador.current.moviendoIzquierda = true;
      if (evento.key === "Shift") jugador.current.velocidadMaxima = 12; // Aumentamos el límite de velocidad

      if (
        (evento.key === " " || evento.key === "ArrowUp") &&
        !jugador.current.saltando
      ) {
        jugador.current.velocidadY = -15;
        jugador.current.saltando = true;
      }
    };

    // Apagamos los interruptores al soltar las teclas
    const manejarKeyUp = (evento) => {
      if (evento.key === "ArrowRight") jugador.current.moviendoDerecha = false;
      if (evento.key === "ArrowLeft") jugador.current.moviendoIzquierda = false;
      if (evento.key === "Shift") {
        jugador.current.velocidadMaxima = 6; // Regresa a la velocidad normal
      }
    };

    /**************************************
     ⌨️ Conectamos el RADAR DEL TECLADO a la ventana del navegador 👇 
    ************************************* */
    // window.addEventListener("keydown", manejarTeclado);
    window.addEventListener("keydown", manejarKeyDown);
    window.addEventListener("keyup", manejarKeyUp);
    window.addEventListener("shift", manejarKeyUp);

    /**************************************
     ⌨️ 👇 Radar Táctil para Celulares y Tablets! 👇
    ************************************* */
    // const manejarToqueMovil = (evento) => {
    //   // Evitamos que la pantalla se mueva bruscamente al tocarla
    //   evento.preventDefault();

    //   // Si el jugador NO está saltando, ¡le damos el impulso hacia arriba!
    //   if (!jugador.current.saltando) {
    //     jugador.current.velocidadY = -15; // El mismo impulso que usamos con el teclado
    //     jugador.current.saltando = true; // Le avisamos al juego que está flotando
    //   }
    // };

    // 👇 Conectamos el RADAR TÁCTIL al lienzo de nuestro juego
    // canvas.addEventListener("touchstart", manejarToqueMovil, {
    //   passive: false,
    // });

    /**************************************
    💻  FULLSCREEN Escuchador para sincronizar de manera segura el icono del botón pantalla completa 👇
      ************************************* */
    const manejarCambioFullscreen = () => {
      setEsPantallaCompleta(!!document.fullscreenElement);
      manejarResize();
    };
    // También queremos que el juego sepa si el jugador giró el celular o cambió al modo de pantalla completa para ajustar el tamaño
    document.addEventListener("fullscreenchange", manejarCambioFullscreen);

    /**************************************
      🧹🧼 LIMPIEZA: Limpiamos todo cuando el componente se desmonte para evitar fugas de memoria y errores raros 👇
      ************************************* */

    return () => {
      cancelAnimationFrame(animacionRef.current);
      // window.removeEventListener("keydown", manejarTeclado);
      window.removeEventListener("keydown", manejarKeyDown);
      window.removeEventListener("keyup", manejarKeyUp);
      window.removeEventListener("shift", manejarKeyUp);

      // 👇 Apagamos los radares del celular 👇
      window.removeEventListener("resize", manejarResize);
      window.removeEventListener("orientationchange", manejarResize);
      // canvas.removeEventListener("touchstart", manejarToqueMovil);
      // 👇 Y el radar de pantalla completa
      document.removeEventListener("fullscreenchange", manejarCambioFullscreen);
    };
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
      {/* 📦 CONTENEDOR MAESTRO: Entra completo a pantalla completa, salvando los botones */}
      <div
        ref={contenedorRef}
        className="relative flex flex-col items-center justify-center bg-slate-950 p-2 rounded-lg overflow-hidden select-none"
      >
        {/* El Canvas de tu juego */}
        <canvas
          id="miJuegoCanvas"
          ref={canvasRef}
          className="lg:border-4 border-slate-700 rounded-lg shadow-2xl object-contain touch-none z-0"
        ></canvas>

        {/* 🎮 BOTONES VIRTUALES: Flotando con precisión quirúrgica sobre el Canvas */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-between items-end px-6 w-full pointer-events-none">
          {/* Bloque Izquierdo: Controles de Dirección */}
          <div className="flex gap-4 pointer-events-auto">
            <button
              onTouchStart={() => (jugador.current.moviendoIzquierda = true)}
              onTouchEnd={() => (jugador.current.moviendoIzquierda = false)}
              onMouseDown={() => (jugador.current.moviendoIzquierda = true)}
              onMouseUp={() => (jugador.current.moviendoIzquierda = false)}
              onMouseLeave={() => (jugador.current.moviendoIzquierda = false)}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowLeft />
            </button>
            <button
              onTouchStart={() => (jugador.current.moviendoDerecha = true)}
              onTouchEnd={() => (jugador.current.moviendoDerecha = false)}
              onMouseDown={() => (jugador.current.moviendoDerecha = true)}
              onMouseUp={() => (jugador.current.moviendoDerecha = false)}
              onMouseLeave={() => (jugador.current.moviendoDerecha = false)}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Bloque Derecho: Botón de Salto Autónomo */}
          <div className="pointer-events-auto">
            <button
              onTouchStart={() => {
                if (!jugador.current.saltando) {
                  jugador.current.velocidadY = -15;
                  jugador.current.saltando = true;
                }
              }}
              onMouseDown={() => {
                if (!jugador.current.saltando) {
                  jugador.current.velocidadY = -15;
                  jugador.current.saltando = true;
                }
              }}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowUp />
            </button>
          </div>
        </div>

        {/* ⛶ BOTÓN MAXIMIZAR DINÄMICO */}
        <button
          onClick={() => activarPantallaCompleta(contenedorRef.current)}
          className="text-xl absolute top-4 right-4 bg-black/20 text-white w-10 h-10 rounded-full hover:bg-black/80 transition flex items-center justify-center z-20 pointer-events-auto"
          aria-label="Alternar pantalla completa"
        >
          {esPantallaCompleta ? (
            <Minimize2 size={20} />
          ) : (
            <Maximize2 size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
export default MiJuego;

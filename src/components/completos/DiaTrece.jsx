import { useEffect, useRef, useState } from "react";
import { resizeCanvas } from "../../utils/resizeCanvas";
import { activarPantallaCompleta } from "../../utils/pantallaCompleta";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {amarillo, magenta, rojo, verde, violeta} from "../../colors/colors"

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
  const contenedorRef = useRef(null);
  const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
  const ANCHO_LOGICO = 1000;
  const ALTO_LOGICO = 500;
  const ANCHO_MAPA_TOTAL = 3000; // ✨ NUEVO: ¡Tu mundo ahora mide 3 veces más!
  const camaraX = useRef(0);

  const jugador = useRef({
    x: 100,
    y: 250,
    ancho: 50,
    alto: 50,
    velocidad: 8, // 👇 Bajamos un poco la velocidad base para que el movimiento continuo sea fluido
    color: "cyan", //"#38bdf8",
    velocidadY: 0,
    saltando: false,
    gravedad: 0.5,
    // 👇 ¡NUEVOS INTERRUPTORES DE MOVIMIENTO! 👇
    moviendoIzquierda: false,
    moviendoDerecha: false,
    vx: 0, // Velocidad actual en el eje X (empieza quieto)
    aceleracion: 0.8, // Qué tan rápido gana velocidad por fotograma
    velocidadMaxima: 8, // El límite de velocidad para que no corra infinitamente
    friccion: 0.85, // El "roce" del suelo (menor a 1 para ir frenando solo)
  });

  const obstaculos = useRef([
    { x: 600, y: 300, ancho: 150, alto: 30, color: rojo }, // Plataforma 1 (Roja)
    { x: 1000, y: 320, ancho: 200, alto: 30, color: verde }, // Plataforma 2 (Verde)
    { x: 1500, y: 250, ancho: 120, alto: 30, color: amarillo }, // Plataforma 3 (Amarilla)
    { x: 2000, y: 350, ancho: 180, alto: 30, color: violeta }, // Plataforma 4 (Morada)
    { x: 2500, y: 200, ancho: 250, alto: 30, color: magenta }, // ¡La plataforma final!
  ]);

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
      ✨ CÁMARA: Actualizamos la posición de la cámara
      ----------------------------------------------------*/
      // La cámara seguirá al jugador, pero mantendrá al personaje a 200 píxeles del borde izquierdo
      camaraX.current = gamer.x - 200;

      // 🛑 Bloqueo de seguridad: Evita que la cámara muestre espacio vacío antes de empezar el nivel
      if (camaraX.current < 0) {
        camaraX.current = 0;
      }

      // 🛑 ACTUALIZADO: Bloqueo de seguridad derecho
      // El límite es: Ancho del Mapa (3000) - Ancho de Pantalla (1000) = 2000
      if (camaraX.current > ANCHO_MAPA_TOTAL - ANCHO_LOGICO) {
        camaraX.current = ANCHO_MAPA_TOTAL - ANCHO_LOGICO;
      }
      // Evitar que el jugador salga por el inicio izquierdo
      if (gamer.x < 0) gamer.x = 0;
      // Evitar que el jugador pase del final del mapa entero
      if (gamer.x > ANCHO_MAPA_TOTAL - gamer.ancho)
        gamer.x = ANCHO_MAPA_TOTAL - gamer.ancho;

      /* ----------------------------------------------------
      🧱 ¡PAREDES INVISIBLES! Evitamos que el jugador se salga de la pantalla 👇
        ----------------------------------------------------*/
      // //
      // // Límite Izquierdo (No pasar de 0)
      // if (gamer.x < 0) {
      //   gamer.x = 0; // Lo regresamos al borde izquierdo
      //   gamer.vx = -gamer.vx; // Frenamos en seco su velocidad acumulada
      // }

      // // Límite Derecho (No pasar de 1000 - el ancho del jugador que es 50 = 950)
      // if (gamer.x > 950) {
      //   gamer.x = 950; // Lo regresamos al borde derecho
      //   gamer.vx = -gamer.vx; // Frenamos en seco su velocidad acumulada
      // };

      /* ----------------------------------------------------
      🌀 EFECTO PAC-MAN: Si cruzas el borde izquierdo, apareces en el derecho y viceversa 👇
        ----------------------------------------------------*/
      // if (gamer.x < -gamer.ancho) {
      //   gamer.x = ANCHO_LOGICO;
      // }
      // if (gamer.x > ANCHO_LOGICO) {
      //   gamer.x = -gamer.ancho;
      // }
      /* ----------------------------------------------------
      📉 FÍSICA EVOLUCIONADA: Gravedad y Aterrizaje en Plataformas
      ----------------------------------------------------*/
      // 1. La gravedad empuja al jugador hacia abajo
      gamer.velocidadY += gamer.gravedad;
      gamer.y += gamer.velocidadY;

      // 2. Revisamos si el jugador está aterrizando en alguna plataforma flotante
      obstaculos.current.forEach((bloque) => {
        // Comprobamos si el jugador está alineado horizontalmente con este bloque
        const alineadoEnX =
          gamer.x + gamer.ancho > bloque.x && gamer.x < bloque.x + bloque.ancho;

        // Comprobamos si los pies del jugador están tocando el techo del bloque
        const tocandoTecho =
          gamer.y + gamer.alto >= bloque.y && gamer.y + gamer.alto <= bloque.y + 10;

        // Si está alineado, tocando el techo y va cayendo (velocidadY positiva o cero)
        if (alineadoEnX && tocandoTecho && gamer.velocidadY >= 0) {
          gamer.y = bloque.y - gamer.alto; // Colocamos los pies exactamente en el techo del bloque
          gamer.velocidadY = 0; // Detenemos la caída en seco
          gamer.saltando = false; // ¡Habilitamos la capacidad de volver a saltar!
        }
      });

      // 3. 🛑 Límite del suelo base (Por si se cae de todas las plataformas al vacío)
      if (gamer.y >= ALTO_LOGICO - gamer.alto) {
        gamer.y = ALTO_LOGICO - gamer.alto;
        gamer.velocidadY = 0;
        gamer.saltando = false;
      }

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      if (fondoCargado) {
        // Si la imagen cargó, la dibujamos en todo el canvas
        // ctx.drawImage(
        //   imagenFondo,
        //   camaraX.current,
        //   0,
        //   ANCHO_LOGICO,
        //   ALTO_LOGICO,
        // );
        ctx.drawImage(
          imagenFondo,
          -camaraX.current,
          0,
          canvas.width,
          canvas.height,
        );
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
      🧱 NUEVO: Dibujar la Lista de Obstáculos / Plataformas
      ----------------------------------------------------*/
      obstaculos.current.forEach((bloque) => {
        // Aplicamos la fórmula matemática de la cámara
        const bloqueEnPantallaX = bloque.x - camaraX.current;

        // Pintamos el bloque con su color único asignado
        ctx.fillStyle = bloque.color;
        ctx.fillRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);

        // Opcional: Un borde elegante para que resalte
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
      });

      /* ----------------------------------------------------
       👇 Jugador (Se dibuja encima de todo)
        ----------------------------------------------------*/
      ctx.fillStyle = gamer.color; // Un hermoso color azul celeste
      // ✨ CALCULAMOS LA POSICIÓN EN PANTALLA (Posición Real - Cámara)
      const jugadorEnPantallaX = gamer.x - camaraX.current; //representa al jugador y su posición
      // Dibujamos usando la coordenada de la pantalla
      ctx.fillRect(jugadorEnPantallaX, gamer.y, gamer.ancho, gamer.alto);

      /* ----------------------------------------------------
        👇 Siguiente frame
      ----------------------------------------------------*/
      animacionRef.current = requestAnimationFrame(bucleJuego);
    };;
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
      💻 FULLSCREEN Escuchador para sincronizar de manera segura el icono del botón pantalla completa 👇
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
      <header className="header-juego  text-center lg:mb-4 lg:block">
        <h1 className="titulo-juego text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-indigo-400 to-orange-200 tracking-tight">
          Hola Mundo!
        </h1>
      </header>
      {/* 📦 CONTENEDOR MAESTRO: Entra completo a pantalla completa, salvando los botones */}
      <div
        ref={contenedorRef}
        className="relative flex flex-col items-center justify-center bg-slate-950 rounded-lg overflow-hidden select-none"
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
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowLeft />
            </button>
            <button
              onTouchStart={() => (jugador.current.moviendoDerecha = true)}
              onTouchEnd={() => (jugador.current.moviendoDerecha = false)}
              onMouseDown={() => (jugador.current.moviendoDerecha = true)}
              onMouseUp={() => (jugador.current.moviendoDerecha = false)}
              onMouseLeave={() => (jugador.current.moviendoDerecha = false)}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
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
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
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

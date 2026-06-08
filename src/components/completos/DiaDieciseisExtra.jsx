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
import {
  amarillo,
  magenta,
  rojo,
  verde,
  violeta,
  azul,
  cyan,
} from "../colors/colors";

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
  const contenedorRef = useRef(null);
  const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
  const ANCHO_LOGICO = 1000;
  const ALTO_LOGICO = 500;
  const ANCHO_MAPA_TOTAL = 3000; // ✨ NUEVO: ¡Tu mundo ahora mide 3 veces más!
  /**************************************
    🌌 CONFIGURACIÓN PARALLAX (EXTRA)
  ************************************* */
  const ANCHO_FONDO_IMG = 1000; // El ancho real de tu archivo de imagen
  const FACTOR_PARALLAX = 0.4; // Multiplicador de velocidad (Menor a 1 = Más lento/lejano)
  const LINEA_BASE_FONDO_Y = 0; // 💡 Modifica este número si quieres subir o bajar el fondo (ej: 20, -50)
  const CALIBRACION_SUELO = 90; // Ajusta este número hasta que el jugador coincida con el suelo dibujado en tu fondo. Si el suelo de tu fondo está muy abajo, pon un número más alto (ej: 60, 80). Si el suelo está muy alto, pon un número más bajo (ej: 20, 0).

  const camaraX = useRef(0);
  const [juegoGanado, setJuegoGanado] = useState(false); // Estado para activar la pantalla de victoria
  const juegoGanadoRef = useRef(false);

  const meta = useRef({
    x: 2850, // Posicionada estratégicamente al final de la última plataforma
    y: 120, // Flotando en el aire sobre la plataforma magenta
    ancho: 60,
    alto: 80,
    color: azul, // Un brillante color dorado cósmico (amarillo metálico)
  });

  const jugador = useRef({
    x: 100,
    y: 250,
    ancho: 90,
    alto: 90,
    velocidad: 8, // 👇 Bajamos un poco la velocidad base para que el movimiento continuo sea fluido
    color: cyan, //"#53eafd",
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
    { x: 600, y: 300, ancho: 150, alto: 40, color: rojo }, // Plataforma 1 (Roja)
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
    imagenFondo.src = "./src/assets/bg-seis.png";
    // imagenFondo.src =
    //   "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop";

    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true; // Avisamos que la imagen ya se cargó
    };
    /**************************************
      🚀 NUEVO DÍA 16: CARGA DE SPRITES
    ************************************* */
    // 1. Sprite de la Nave del Jugador
    const imagenJugador = new Image();
    imagenJugador.src = "./src/assets/astro-4.png";
    let jugadorSpriteCargado = false;
    imagenJugador.onload = () => {
      jugadorSpriteCargado = true;
    };

    // 2. Sprite de Textura para las Plataformas
    const imagenPlataforma = new Image();
    imagenPlataforma.src = "./src/assets/metal-4.jpg";
    let plataformaSpriteCargado = false;
    imagenPlataforma.onload = () => {
      plataformaSpriteCargado = true;
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
      📉 FÍSICA EVOLUCIONADA: Gravedad y Sistema de Hitboxes
      ----------------------------------------------------*/
      // 1. La gravedad empuja al jugador hacia abajo en cada fotograma
      gamer.velocidadY += gamer.gravedad;
      gamer.y += gamer.velocidadY;

      // 2. 🧱 DETECTOR DE COLISIONES AVANZADO (Sistema de Posiciones Previas)
      obstaculos.current.forEach((bloque) => {
        // Comprobamos la colisión general (¿Se están cruzando sus cajas de límite?)
        const chocando =
          gamer.x + gamer.ancho > bloque.x &&
          gamer.x < bloque.x + bloque.ancho &&
          gamer.y + gamer.alto > bloque.y &&
          gamer.y < bloque.y + bloque.alto;

        if (chocando) {
          // Calculamos cuánto se metió el jugador dentro del bloque en cada eje (Traslapes)
          const traslapeX = Math.min(
            gamer.x + gamer.ancho - bloque.x,
            bloque.x + bloque.ancho - gamer.x,
          );
          const traslapeY = Math.min(
            gamer.y + gamer.alto - bloque.y,
            bloque.y + bloque.alto - gamer.y,
          );

          // 🕒 POSICIONES PREVIAS: Calculamos dónde estaba el jugador en el fotograma anterior
          const prevX = gamer.x - gamer.vx;
          const prevY = gamer.y - gamer.velocidadY;
          const EPS = 4; // Margen de tolerancia física en píxeles (Evita fallos en esquinas)

          // CASO A) Si en el pasado sus pies estaban arriba del techo: ¡Aterrizaje!
          if (prevY + gamer.alto <= bloque.y + EPS && gamer.velocidadY >= 0) {
            gamer.y = bloque.y - gamer.alto;
            gamer.velocidadY = 0;
            gamer.saltando = false;
            return;
          }

          // CASO B) Si en el pasado su cabeza estaba debajo de la base: ¡Cabezazo!
          if (prevY >= bloque.y + bloque.alto - EPS && gamer.velocidadY < 0) {
            gamer.y = bloque.y + bloque.alto;
            gamer.velocidadY = 0;
            return;
          }

          // CASO C) Si venía corriendo por la izquierda y choca la pared
          if (prevX + gamer.ancho <= bloque.x + EPS && gamer.vx > 0) {
            gamer.x = bloque.x - gamer.ancho;
            gamer.vx = 0;
            return;
          }

          // CASO D) Si venía corriendo por la derecha y choca la pared
          if (prevX >= bloque.x + bloque.ancho - EPS && gamer.vx < 0) {
            gamer.x = bloque.x + bloque.ancho;
            gamer.vx = 0;
            return;
          }

          // SIFÓN DE SEGURIDAD (Fallback): Si algo falla, resuelve por el menor traslape
          if (traslapeX + EPS < traslapeY) {
            if (gamer.vx > 0) gamer.x = bloque.x - gamer.ancho;
            else if (gamer.vx < 0) gamer.x = bloque.x + bloque.ancho;
            gamer.vx = 0;
          } else {
            if (gamer.velocidadY > 0) {
              gamer.y = bloque.y - gamer.alto;
              gamer.velocidadY = 0;
              gamer.saltando = false;
            } else if (gamer.velocidadY < 0) {
              gamer.y = bloque.y + bloque.alto;
              gamer.velocidadY = 0;
            }
          }
        }
      });

      // 3. 🛑 Límite del suelo base CALIBRADO (Por si se cae de todas las plataformas al vacío)

      const sueloFisicoActual = ALTO_LOGICO - gamer.alto - CALIBRACION_SUELO;

      if (gamer.y >= sueloFisicoActual) {
        gamer.y = sueloFisicoActual;
        gamer.velocidadY = 0;
        gamer.saltando = false;
      }
      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: DETECTOR DE INTERSECCIÓN CON LA META
      ----------------------------------------------------*/
      const tocandoMeta =
        gamer.x + gamer.ancho > meta.current.x &&
        gamer.x < meta.current.x + meta.current.ancho &&
        gamer.y + gamer.alto > meta.current.y &&
        gamer.y < meta.current.y + meta.current.alto;

      // Si tocamos la meta y la referencia dice que aún no hemos ganado...
      if (tocandoMeta && !juegoGanadoRef.current) {
        juegoGanadoRef.current = true; // 1. Bloqueamos el motor físico de inmediato
        setJuegoGanado(true); // 2. Le avisamos a React que dibuje la interfaz
        gamer.vx = 0; // Frenamos la velocidad del personaje
        gamer.velocidadY = 0;
      }

      /* ----------------------------------------------------
      👇 Fondo 👇
        ----------------------------------------------------*/
      /* ----------------------------------------------------
      🌌 EXTRA: Fondo Infinito con Efecto Parallax
      ----------------------------------------------------*/
      if (fondoCargado) {
        // 1. Calculamos la posición del fondo multiplicada por el factor de lentitud
        // Usamos el operador % (Residuo) para que la posición se reinicie al llegar al ancho de la imagen
        const fondoX = Math.floor(
          (camaraX.current * FACTOR_PARALLAX) % ANCHO_FONDO_IMG,
        );
        const fondoOffsetX = -fondoX;
        // 2. Dibujamos la primera copia (Normal)
        ctx.drawImage(
          imagenFondo,
          fondoOffsetX,
          LINEA_BASE_FONDO_Y,
          ANCHO_LOGICO,
          ALTO_LOGICO,
        );
        // 3. Guardamos el estado del canvas para aplicar la transformación espejo
        ctx.save();
        // 4. Movemos el origen al lugar donde debe empezar la segunda copia + su ancho total
        ctx.translate(fondoOffsetX + ANCHO_FONDO_IMG * 2, 0);
        // 5. Invertimos el eje X (Multiplicamos la escala horizontal por -1)
        ctx.scale(-1, 1);

        // 6. Dibujamos la segunda copia justo al lado para tapar el vacío cuando la primera se mueva
        ctx.drawImage(
          imagenFondo,
          fondoOffsetX + ANCHO_FONDO_IMG,
          LINEA_BASE_FONDO_Y,
          ANCHO_LOGICO,
          ALTO_LOGICO,
        );
        // 7. Restauramos el canvas para que el jugador y las plataformas no se volteen
        ctx.restore();
      } else {
        // Respaldo de seguridad por si el internet va lento
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
      🧱 ACTUALIZADO DÍA 16: Dibujar Plataformas con Sprites
      ----------------------------------------------------*/
      obstaculos.current.forEach((bloque) => {
        // Aplicamos la fórmula matemática de la cámara
        const bloqueEnPantallaX = bloque.x - camaraX.current;

        if (plataformaSpriteCargado) {
          // Reemplazamos el fillRect por la textura real
          ctx.drawImage(
            imagenPlataforma,
            bloqueEnPantallaX,
            bloque.y,
            bloque.ancho,
            bloque.alto,
          );
        } else {
          // Respaldo de seguridad por si el internet o el disco van lentos
          ctx.fillStyle = bloque.color;
          ctx.fillRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        }

        // Dejamos el borde sutil decorativo que ya tenías
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
      });
      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: RENDERIZAR LA META EN EL CANVAS
      ----------------------------------------------------*/
      const metaEnPantallaX = meta.current.x - camaraX.current;

      // Dibujamos la estructura base dorada del portal
      ctx.fillStyle = meta.current.color;
      ctx.fillRect(
        metaEnPantallaX,
        meta.current.y,
        meta.current.ancho,
        meta.current.alto,
      );

      // Le agregamos un núcleo brillante de energía blanca en el centro
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        metaEnPantallaX + 15,
        meta.current.y + 10,
        meta.current.ancho - 30,
        meta.current.alto - 20,
      );
      /* ----------------------------------------------------
       👇 Jugador (Se dibuja encima de todo)
        ----------------------------------------------------*/
      /* ----------------------------------------------------
       🚀 ACTUALIZADO DÍA 16: Dibujar Jugador con Sprite Real
        ----------------------------------------------------*/
      const jugadorEnPantallaX = gamer.x - camaraX.current; // representa al jugador y su posición

      if (jugadorSpriteCargado) {
        // ¡Pintamos el sprite oficial de la nave!
        ctx.drawImage(
          imagenJugador,
          jugadorEnPantallaX,
          gamer.y,
          gamer.ancho,
          gamer.alto,
        );
      } else {
        // Cuadrado de respaldo original si la imagen no está lista
        ctx.fillStyle = gamer.color;
        ctx.fillRect(jugadorEnPantallaX, gamer.y, gamer.ancho, gamer.alto);
      }

      /* ----------------------------------------------------
        👇 Siguiente frame
      ----------------------------------------------------*/
      animacionRef.current = requestAnimationFrame(bucleJuego);
    };;;
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
  }, []); // 🌟 Dejamos el array vacío para que el motor sea ultra estable y eficiente
  /* ----------------------------------------------------
  🔄 NUEVO DÍA 15: FUNCIÓN REINICIAR DIRECTO EN MEMORIA
  ----------------------------------------------------*/
  const reiniciarJuego = () => {
    // 1. Regresamos al jugador a su posición inicial de forma instantánea
    jugador.current.x = 100;
    jugador.current.y = 250;
    jugador.current.vx = 0;
    jugador.current.velocidadY = 0;
    jugador.current.saltando = false;

    // 2. Apagamos los interruptores de victoria
    juegoGanadoRef.current = false;
    setJuegoGanado(false);
    jugador.current.y = ALTO_LOGICO - jugador.current.alto - CALIBRACION_SUELO;
    // Si quieres, también puedes reestablecer meta y obstaculos si cambia algo
  };
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
          <div className="flex gap-8 pointer-events-auto">
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = true;
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowLeft />
            </button>
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = true;
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Bloque Derecho: Botón de Salto Autónomo */}
          <div className="pointer-events-auto">
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                if (!jugador.current.saltando) {
                  jugador.current.velocidadY = -15;
                  jugador.current.saltando = true;
                }
              }}
              onPointerUp={(e) => {
                e.preventDefault();
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
              }}
              onContextMenu={(e) => e.preventDefault()}
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
        {/* 🏆 NUEVO DÍA 15: PANTALLA FLOTANTE DE VICTORIA 🏆 */}
        {juegoGanado && (
          <div className="absolute inset-0 bg-slate-600/10 backdrop-blur-md flex flex-col items-center justify-center z-30 animate-fade-in select-none">
            <h2 className="text-4xl sm:text-6xl font-black text-yellow-400 tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-bounce">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-lg sm:text-xl mt-4 font-medium tracking-wide text-center px-4">
              Has conquistado los confines del espacio, goCoder.
            </p>
            <button
              onClick={reiniciarJuego} // 🔄 Reinicio líquido sin perder la pantalla completa
              className="mt-8 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            >
              Volver a Jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default MiJuego;
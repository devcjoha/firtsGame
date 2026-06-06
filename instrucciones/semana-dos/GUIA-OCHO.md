# GUIA 8 # 🎮 ¡BOTONES VIRTUALES: CONTROL TOTAL EN TU CELULAR! 🚀🚀

### ¡Creando un control táctil en pantalla para movernos a la izquierda y derecha!

## El Desafío de los Controles en el Celular 📱

¡Hola de nuevo, Desarrollador/a! Ayer lograste algo increíble: ¡hacer que tu personaje saltara al tocar la pantalla de tu teléfono! Pero notarás que nos falta algo muy importante... ¡No podemos movernos de lado a lado en el celular todavía!

En la computadora usamos las flechas del teclado (`ArrowLeft` y `ArrowRight`), pero los teléfonos no tienen teclado físico. Hoy vamos a solucionar esto creando **botones virtuales** directamente sobre la pantalla.

Usaremos `HTML y CSS (con Tailwind)` para diseñar los botones, y `JavaScript` para conectarlos a los "músculos" de nuestro jugador. ¡Cada cambio que hagas lo verás reflejado al instante en tu navegador!

---

## 🛠️ Paso a Paso: ¡Manos al Código!

## 💥 **Paso 1**: Crear un contenedor para los botones. Colócalo arriba de las variables, ANCHO_LOGICO y ALTO_LOGICO.

```js
// 💡 Contenedor principal que agrupará Canvas + Botones para la pantalla completa
const contenedorRef = useRef(null);
```

## 💥 **Paso 2**: Preparar al jugador para un movimiento continuo

En la computadora, presionas una tecla y el personaje se mueve un bloque. En un celular, queremos dejar el dedo presionado sobre el botón para que el personaje camine de forma fluida y ágil.

Para lograr esto, vamos a añadir dos "interruptores" en nuestro objeto `jugador`.

- Abre tu archivo `MiJuego.jsx`.
- Busca el objeto `jugador` (cerca del inicio) y cambialo por este jugador:
  a. Convertimos el jugador en un `useRef` para que sea mutable en todo el componente
  b. Añadimos estas dos propiedades al final con valor false: moviendoIzquierda: false,
  moviendoDerecha: false

```js
const jugador = useRef({
  x: 100,
  y: 250,
  ancho: 50,
  alto: 50,
  velocidad: 8, // 👇 Bajamos un poco la velocidad base para que el movimiento continuo sea fluido
  color: "#38bdf8",
  velocidadY: 0,
  saltando: false,
  gravedad: 0.5,
  // 👇 ¡NUEVOS INTERRUPTORES DE MOVIMIENTO! 👇
  moviendoIzquierda: false,
  moviendoDerecha: false,
});
```

## 💥 Paso 3: Actualizar la posición en el Bucle del Juego 🔄

Ahora que tenemos estos interruptores, necesitamos que el juego revise constantemente si están encendidos (true) para mover al jugador en cada fotograma.

Busca tu función bucleJuego dentro del useEffect.

Justo arriba de la sección de la física del salto:

- Crearemos una nueva variable `gamer` para el bucle que llame a la referencia del jugador, sustituiremos todos los llamados al objeto jugador dentro del bucle para que use la nueva variable `gamer`
- Ahora que tenemos estos interruptores, necesitamos que el bucle del juego revise constantemente si están encendidos (true) para mover al jugador en cada fotograma.

**RECUERDA**: como agregamos una nueva variable para usarla dentro del bucle, debemos ajustar que dentro del bucle se use la variable gamer en vez de jugador.

👀 Ahora el bucle del juego queda así:

```js
const bucleJuego = () => {
  // Usamos directamente jugadorRef.current para garantizar lectura en tiempo real
  const gamer = jugador.current;
  // 1. Limpiar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 👇 MOVIMIENTO CONTINUO (Revisamos los interruptores) 👇
  if (gamer.moviendoIzquierda) {
    gamer.x -= gamer.velocidad; // Se mueve a la izquierda ⬅️
  }
  if (gamer.moviendoDerecha) {
    gamer.x += gamer.velocidad; // Se mueve a la derecha ➡️
  }

  // 👇 El salto 1.5 APLICAR FÍSICA (Gravedad y Suelo) 👇
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

  // 👇 Fondo
  if (fondoCargado) {
    // Si la imagen cargó, la dibujamos en todo el canvas
    ctx.drawImage(imagenFondo, 0, 0, ANCHO_LOGICO, ALTO_LOGICO);
  } else {
    // Si aún no carga, dejamos el fondo azul oscuro de respaldo
    ctx.fillStyle = "#001f3f";
    ctx.fillRect(0, 0, ANCHO_LOGICO, ALTO_LOGICO);
  }

  // 👇 Texto
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px sans-serif";
  ctx.fillText("¡Fondo Cargado con Éxito!", 50, 50);

  // 👇 Jugador (Se dibuja encima de todo)
  ctx.fillStyle = gamer.color; // Un hermoso color azul celeste
  ctx.fillRect(gamer.x, gamer.y, gamer.ancho, gamer.alto); // la figura que representa al jugador y su posición

  // 👇 Siguiente frame
  animacionRef.current = requestAnimationFrame(bucleJuego);
};
```

## 💥 Paso 4: Conectar el teclado a los nuevos interruptores ⌨️

Para que el teclado también use este movimiento fluido, cambiaremos la forma en que lee las teclas. En lugar de moverlo un solo golpe al presionar, encenderemos el interruptor al presionar (keydown) y lo apagaremos al soltar la tecla (keyup).

Reemplaza tu antigua función manejarTeclado por esta versión actualizada:

```js
// Conectamos los interruptores al presionar las teclas
const manejarKeyDown = (evento) => {
  if (evento.key === "ArrowRight") jugador.current.moviendoDerecha = true;
  if (evento.key === "ArrowLeft") jugador.current.moviendoIzquierda = true;

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
};

window.addEventListener("keydown", manejarKeyDown);
window.addEventListener("keyup", manejarKeyUp);
```

⚠️ ¡No olvides la limpieza! Ve al final de tu useEffect (en el return () => { ... }) y asegúrate de cambiar window.removeEventListener("keydown", manejarTeclado) por los dos nuevos eventos: manejarKeyDown y manejarKeyUp.

## 💥 Paso 5: Crear los Botones en la Pantalla 🎨

¡Vamos a dibujar los controles para la pantalla!.

📌 Ve al final de tu archivo `MiJuego.jsx`, donde está el return con el código HTML. ahora debe verse asi o parecido:

```js
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
```

### 🧩 **Primer bloque**:

- Primero creamos un contenedor general para los botones de izquierda y derecha, que irán del lado izquierdo de la pantalla. agrega este bloque debajo del `header`:

```js
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
    <div className="flex gap-4 pointer-events-auto">
    {/* Bloque Izquierdo de la pantalla: Controles de Dirección izquierda/derecha */}


    </div>

    <div className="pointer-events-auto">
    {/* Bloque Derecho de la pantalla: Botón de Salto Autónomo */}


    </div>
  </div>

  {/* ⛶ BOTÓN PANTALLA COMPLETA DINÄMICO */}

</div>
```

*📌 Bloque Izquierdo de la pantalla: Botón de moverse hacia la izquierda. Agrégalo dentro de las etiquetas `<div></div>`*

```js
<button
  onTouchStart={() => (jugador.current.moviendoIzquierda = true)}
  onTouchEnd={() => (jugador.current.moviendoIzquierda = false)}
  onMouseDown={() => (jugador.current.moviendoIzquierda = true)}
  onMouseUp={() => (jugador.current.moviendoIzquierda = false)}
  onMouseLeave={() => (jugador.current.moviendoIzquierda = false)}
  className="bg-blue-900/40 text-white w-14 h-14 rounded-full flex items-center justify-center select-none touch-none"
>
  ⬅️
</button>
```

📌 *Bloque Izquierdo de la pantalla: Botón de moverse hacia la derecha. Agrégalo debajo del bloque anterior dentro de las mismas etiquetas `<div></div>` .*

```js
<button
  onTouchStart={() => (jugador.current.moviendoDerecha = true)}
  onTouchEnd={() => (jugador.current.moviendoDerecha = false)}
  onMouseDown={() => (jugador.current.moviendoDerecha = true)}
  onMouseUp={() => (jugador.current.moviendoDerecha = false)}
  onMouseLeave={() => (jugador.current.moviendoDerecha = false)}
  className="bg-blue-900/40 text-white w-14 h-14 rounded-full flex items-center justify-center select-none touch-none"
>
  ➡️
</button>
```

### 🧩 **Segundo bloque**:

*📌 Botón de moverse hacia la arriba: Agrégalo dentro de las etiquetas `<div></div>` que le corresponden*

```js
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
  className="bg-blue-900/40 text-white w-14 h-14 rounded-full flex items-center justify-center select-none touch-none"
>
  ⬆️
</button>
```

¿Qué hace este código tan especial?
onTouchStart: Se activa en cuanto tu dedo toca el botón. ¡Enciende el movimiento! 🔛

onTouchEnd: Se activa cuando levantas el dedo del botón. ¡Apaga el movimiento! 📴

touch-none: Una propiedad de CSS que le dice al celular: "Oye, cuando el niño toque aquí, no muevas la pantalla del teléfono, concéntrate en el juego".

🏆 ¡Felicidades! Has transformado tu juego de navegador en una auténtica consola portátil. Ahora tu personaje se mueve de forma ágil y veloz con controles que responden al instante.

🎯 Es hora de los Retos 🔗 [Enlace Reto ocho](RETO-GUIA-OCHO.md)

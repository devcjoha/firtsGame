## 📝 Guía del Alumno - Día 9

## ¿Iniciamos con un extra?: 🔗 [[Enlace extra Pantalla Completa]](/instrucciones/extras/pantalla-completa.md)

## 🎮 ¡Tu juego tiene que sentirse increíble! Ajustando el "Game Feel" y la Fricción

¡Hola, Coder! 🚀

Ayer logramos algo increíble: nuestro héroe ya se mueve de forma continua usando interruptores y tiene botones táctiles en la pantalla. Pero si lo juegas con atención, notarás algo: el personaje se mueve de forma un poco "robótica". Presionas el botón y corre a velocidad máxima al instante; lo sueltas, y se frena en seco como si chocara contra una pared invisible.

En el mundo real, los objetos tienen **inercia** (tardan un poquito en acelerar) y sufren **fricción** (se van frenando suavemente al soltar el control). Hoy vamos a añadirle esa "seda" a los movimientos de nuestro héroe para que controlarlo sea una delicia. ¡Vamos a programar las físicas del movimiento fluido!

---

### 🧹 Paso 1: Limpieza de código antiguo (¡Adiós interferencias!)

Antes de meternos de lleno con la fricción, tenemos que hacer un pequeño ajuste de orden. En los primeros días de la semana, creamos un radar táctil llamado `manejarToqueMovil` para que el personaje saltara al tocar el Canvas.

Como ayer en el **Día 8** programamos una botonera táctil súper pro abajo con su propio botón de saltar (`ArrowUp`), si dejamos el radar viejo activo, el juego se va a confundir y el personaje saltará cada vez que intentes presionar las flechas de dirección en tu teléfono.

👀 Haz una prueba, mueve el jugador con los botones, pero prueba también tocar la pantalla del celular, verás que también se mueve y eso no debe suceder, porque sería un lío jugar.

Vamos a limpiar nuestro código dentro del `useEffect`. Sigue estos pasos:

1. Busca y **elimina** (o comenta) la función `manejarToqueMovil`.
2. Busca abajo la línea donde se conectaba al canvas y **elimínala**.
3. No olvides limpiar también la parte del `return` al final del `useEffect`.

El código dentro de tu `useEffect` debe quedar limpio de esto:

```javascript
// ❌ ELIMINA o COMENTA estas líneas dentro de tu useEffect:

// const manejarToqueMovil = (evento) => { ... }; // 👈 ¡Borra esta función!

// canvas.addEventListener("touchstart", manejarToqueMovil, { passive: false }); // 👈 ¡Borra este escuchador!

// En el 'return () => { ... }' final, borra también esta línea:
// canvas.removeEventListener("touchstart", manejarToqueMovil); // 👈 ¡Borra esta limpieza!
```

👀 Vuelve a probar, verás que el jugador solo se mueve si tocas los botones.

---

### 💻 Paso 2: Actualizando las propiedades de física en nuestro Jugador

Ahora que el terreno está limpio, busca el `useRef` de tu jugador (`const jugador = useRef({ ... })`). Vamos a actualizar sus propiedades.

En lugar de usar una `velocidad` fija, ahora le daremos velocidad en el eje X (`vx`), una fuerza de `aceleracion`, un límite de `velocidadMaxima` y la `friccion` (el rozamiento del suelo).

Modifica tu objeto para que quede exactamente así:

```javascript
const jugador = useRef({
  x: 100,
  y: 250,
  ancho: 50,
  alto: 50,
  color: "#38bdf8",
  velocidadY: 0,
  saltando: false,
  gravedad: 0.5,
  moviendoIzquierda: false,
  moviendoDerecha: false,

  // 👇 ¡NUEVAS PROPIEDADES DE FÍSICA Y GAME FEEL! 👇
  vx: 0,              // Velocidad actual en el eje X (empieza quieto)
  aceleracion: 0.8,   // Qué tan rápido gana velocidad por fotograma
  velocidadMaxima: 8, // El límite de velocidad para que no corra infinitamente
  friccion: 0.85,     // El "roce" del suelo (menor a 1 para ir frenando solo)
});
```

---

### ⚙️ Paso 3: Evolucionando el Movimiento Continuo en el Bucle de Juego

Vamos a buscar nuestra función `bucleJuego`. Adentro verás la sección donde revisamos los interruptores (`if (gamer.moviendoIzquierda)...`).

Vamos a cambiar esas líneas para que en lugar de sumarle una posición fija, alteremos la velocidad `vx` usando la aceleración y apliquemos la fricción si el jugador suelta los controles:

```javascript
const bucleJuego = () => {
  const gamer = jugador.current;

  // 1. Limpiar el lienzo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 👇 NUEVA LÓGICA DE MOVIMIENTO CON GAME FEEL 👇
  if (gamer.moviendoIzquierda) {
    // Restamos aceleración para ir a la izquierda, sin superar la velocidad máxima permitida
    gamer.vx = Math.max(gamer.vx - gamer.aceleracion, -gamer.velocidadMaxima);
  } else if (gamer.moviendoDerecha) {
    // Sumamos aceleración para ir a la derecha, sin superar la velocidad máxima permitida
    gamer.vx = Math.min(gamer.vx + gamer.aceleracion, gamer.velocidadMaxima);
  } else {
    // ✨ ¡La magia de la Fricción! Si no presionas nada, se va frenando gradualmente
    gamer.vx *= gamer.friccion;

    // Si el freno lo deja en un movimiento casi invisible, lo paramos por completo
    if (Math.abs(gamer.vx) < 0.1) {
      gamer.vx = 0;
    }
  }

  // 💥 Aplicamos la velocidad calculada a la posición real en X del jugador
  gamer.x += gamer.vx;


  // 👇 El salto 1.5 APLICAR FÍSICA (Esto se queda igual) 👇
  gamer.velocidadY += gamer.gravedad;
  gamer.y += gamer.velocidadY;

  // ... (El resto del código del fondo, textos y dibujo del jugador se quedan EXACTAMENTE igual)
```

🎯 Es hora de los Retos 🔗 [[Enlace Reto nueve]](RETO-GUIA-NUEVE.md)

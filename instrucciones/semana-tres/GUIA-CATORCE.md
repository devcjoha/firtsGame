# 🚀 Día 14: Sistema de Colisiones Interactivas (Hitboxes)

¡Bienvenidos al Día 14, Coders! Ayer logramos un hito increíble: romper la regla del suelo plano para que nuestro personaje pueda aterrizar y saltar sobre plataformas flotantes.

Pero si has jugado con atención, habrás notado un pequeño "superpoder" fantasma: si chocas contra una plataforma por los lados (lateralmente) o intentas saltar desde abajo de ella, tu personaje la atraviesa como si fuera de aire. ¡Hoy vamos a solucionar eso programando un **Sistema de Colisiones Bidimensionales** (también conocido en el mundo de los videojuegos como *Hitboxes*)!

---

## 🧭 El Concepto Clave: ¿Cómo chocan dos rectángulos?

En el desarrollo de videojuegos 2D, la forma más rápida y eficiente de saber si dos objetos se están tocando es usando un algoritmo matemático llamado **AABB** (*Axis-Aligned Bounding Box* o Caja de Límites Alineada al Eje).

Básicamente, el juego se hace 4 preguntas clave. Si **todas** son afirmativas, significa que el jugador y el bloque se están cruzando:

1. ¿El lado derecho del jugador pasó el lado izquierdo del bloque?
2. ¿El lado izquierdo del jugador está antes del lado derecho del bloque?
3. ¿La parte inferior del jugador pasó la parte superior del bloque?
4. ¿La parte superior del jugador está antes de la parte inferior del bloque?

```
    [ Jugador ] → 
                 🧱 [ Bloque ]

```

Ayer programamos la colisión superior (el aterrizaje). Hoy vamos a expandir esa lógica para reaccionar ante los impactos laterales e inferiores, deteniendo el avance del jugador para que las plataformas se sientan completamente sólidas.

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir nuestro archivo `MiJuego.jsx` para actualizar el motor físico dentro del bucle de juego.

### Paso 1: Actualizar el detector de plataformas

Busca dentro de tu `bucleJuego` la sección que modificamos ayer, titulada `📉 FÍSICA EVOLUCIONADA: Gravedad y Aterrizaje en Plataformas`. Actualmente se ve así:

```javascript
// 2. Revisamos si el jugador está aterrizando en alguna plataforma flotante
obstaculos.current.forEach((bloque) => {
  const alineadoEnX =
    gamer.x + gamer.ancho > bloque.x && gamer.x < bloque.x + bloque.ancho;

  const tocandoTecho =
    gamer.y + gamer.alto >= bloque.y &&
    gamer.y + gamer.alto <= bloque.y + 10;

  if (alineadoEnX && tocandoTecho && gamer.velocidadY >= 0) {
    gamer.y = bloque.y - gamer.alto;
    gamer.velocidadY = 0;
    gamer.saltando = false;
  }
});

```

Vamos a evolucionar este bloque de código. Reemplaza **únicamente** la función `obstaculos.current.forEach((bloque) => { ... })` por esta versión mejorada de alta precisión física:

```javascript
// 2. 🧱 DETECTOR DE COLISIONES AVANZADO (Hitboxes en 4 direcciones)
obstaculos.current.forEach((bloque) => {
  // Comprobamos la colisión general (¿Se están cruzando sus cajas de límite?)
  const chocando =
    gamer.x + gamer.ancho > bloque.x &&
    gamer.x < bloque.x + bloque.ancho &&
    gamer.y + gamer.alto > bloque.y &&
    gamer.y < bloque.y + bloque.alto;

  if (chocando) {
    // Calculamos qué tanto se metió el jugador dentro del bloque por cada lado
    const traslapeX = Math.min(gamer.x + gamer.ancho - bloque.x, bloque.x + bloque.ancho - gamer.x);
    const traslapeY = Math.min(gamer.y + gamer.alto - bloque.y, bloque.y + bloque.alto - gamer.y);

    // Si el cruce es más profundo en el eje Y, la colisión es vertical (arriba o abajo)
    if (traslapeX > traslapeY) {
      if (gamer.velocidadY > 0 && gamer.y + gamer.alto - gamer.velocidadY <= bloque.y + 2) {
        // ATERRIZAJE: Viene cayendo y toca el techo
        gamer.y = bloque.y - gamer.alto;
        gamer.velocidadY = 0;
        gamer.saltando = false;
      } else if (gamer.velocidadY < 0) {
        // CABEZAZO: Va saltando hacia arriba y choca con la base del bloque
        gamer.y = bloque.y + bloque.alto;
        gamer.velocidadY = 0; // Detiene el impulso vertical y empieza a caer
      }
    } 
    // Si el cruce es más profundo en el eje X, la colisión es lateral (izquierda o derecha)
    else {
      if (gamer.vx > 0 && gamer.x + gamer.ancho - gamer.vx <= bloque.x + 2) {
        // CHOQUE LATERAL DERECHO: El jugador se movía a la derecha
        gamer.x = bloque.x - gamer.ancho;
        gamer.vx = 0; // Frenamos su velocidad acumulada
      } else if (gamer.vx < 0) {
        // CHOQUE LATERAL IZQUIERDO: El jugador se movía a la izquierda
        gamer.x = bloque.x + bloque.ancho;
        gamer.vx = 0; // Frenamos su velocidad acumulada
      }
    }
  }
});

```

---

## 🧪 ¡A probar la solidez del mundo!

1. Guarda los cambios en Visual Studio Code y ve a tu navegador.
2. Camina directamente hacia la pared lateral de la primera plataforma (sin saltar).
3. **¡Resultado esperado!** Tu personaje se detendrá en seco. Ya no puede atravesar el bloque corriendo.
4. Ahora, colócate justo debajo de una plataforma elevada y da un salto hacia arriba.
5. **¡Resultado esperado!** Tu personaje se dará un "cabezazo" realista contra la base del bloque, interrumpiendo su salto y cayendo de inmediato de regreso al suelo.

---

## 🎯 RETO DEL DÍA: El Laberinto de Bloques

¡Tu motor de física ya es completamente sólido! Ahora abre el archivo de desafíos de hoy para diseñar una prueba que explote esta nueva mecánica:

🔗 [Enlace Reto Catorce](https://www.google.com/search?q=RETO-GUIA-CATORCE.md)
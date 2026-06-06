# 🚀 Día 13: Plataformas Aéreas (Evolución de la Gravedad)

¡Bienvenidos al Día 13, Coders! Ayer logramos diseñar un mapa gigante con bloques de colores esparcidos por todo el universo del juego. Pero claro, descubriste que tu personaje los atraviesa como si fuera un fantasma.

¡Hoy vamos a cambiar eso! Vamos a actualizar el motor de física de nuestro juego. Aprenderás a romper la regla del suelo plano para que tu personaje pueda **aterrizar, caminar y saltar desde cualquier plataforma elevada** que encuentre en su camino.

---

## 🧭 El Concepto Clave: ¿Cómo sabe el juego si estamos "pisando" una plataforma?

Hasta ayer, el juego solo conocía un suelo: la parte baja de la pantalla (`ALTO_LOGICO - gamer.alto`). Para que el personaje se pare sobre una plataforma flotante, el motor del juego tiene que hacerle una pregunta matemática a cada fotograma:

> **¿El personaje está cayendo justo encima del techo de algún bloque?**

Para comprobar esto, necesitamos verificar que ocurran tres cosas al mismo tiempo cuando el personaje cae:

1. **En Horizontal:** Que el cuerpo del jugador esté alineado con el bloque (ni muy a la izquierda, ni muy a la derecha).
2. **En Vertical:** Que la base del jugador toque o pase ligeramente el techo de la plataforma.
3. **Dirección:** Que el jugador venga cayendo hacia abajo (`velocidadY >= 0`). Si va saltando hacia arriba, debe poder atravesarla por abajo para subir.

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir `MiJuego.jsx` para evolucionar nuestra gravedad.

### Paso 1: Modificar la Física de Caída del Jugador

Busca dentro de tu `bucleJuego` la sección donde aplicas la gravedad y revisas el límite del suelo. Actualmente se ve así:

```javascript
/* ----------------------------------------------------
      👇 El salto APLICAR FÍSICA (Gravedad y Suelo) 👇
----------------------------------------------------*/
// La gravedad siempre empuja al jugador hacia abajo aumentándole la velocidad vertical
gamer.velocidadY += gamer.gravedad;
// Cambiamos la posición real en 'y' del jugador
gamer.y += gamer.velocidadY;

// 🛑 El límite del suelo (El lienzo mide 500 de alto, menos 50 de la nave = 450)
if (gamer.y >= ALTO_LOGICO - gamer.alto) {
  gamer.y = ALTO_LOGICO - gamer.alto; // Lo plantamos firmemente en el suelo
  gamer.velocidadY = 0; // Detenemos la caída
  gamer.saltando = false; // ¡Ya no está saltando!
}
```

Vamos a cambiar ese bloque por completo. Ahora, antes de asumir que el único suelo es el fondo de la pantalla, el juego revisará con una función de javascript `.forEach()` en un bucle, si el jugador está cayendo sobre alguna de las plataformas de nuestro array de obstaculos:

Sustituye `El salto APLICAR FISICA (Gravedad y Suelo)` por este bloque de código:

```javascript
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
    gamer.y + gamer.alto >= bloque.y && gamer.y + gamer.alto <= bloque.y + 15;

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
```

## 🧪 ¡A Probar las Plataformas Flotantes!

Guarda los cambios de tu código y recarga tu navegador.

Corre hacia la derecha y acércate al primer bloque (el rojo).

Da un salto e intenta caer sobre él.

¡Magia! Tu personaje se quedará parado firmemente sobre el bloque en lugar de traspasarlo.

Intenta saltar mientras estás arriba del bloque. Verás que puedes saltar desde la plataforma hacia la siguiente de manera fluida.

🎯 ¡Llegó el momento de poner a prueba tus habilidades de diseño! Abre el reto del día aquí: 🔗 [Enlace Reto Trece](RETO-GUIA-TRECE.md)

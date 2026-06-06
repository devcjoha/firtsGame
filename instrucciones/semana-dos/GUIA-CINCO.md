# 🚀 NUESTRO HÉROE: LA NAVE 🚀

### ¡Es hora de presentar al protagonista de nuestra historia!

# GUIA 5 🚀

Hoy vamos a dibujar nuestra nave espacial. Por ahora se quedará quieta, esta semana la haremos moverse, saltar y correr. Pero hoy solo nace.

1. 🎯 Abre `src/components/MiJuego.jsx`. En la terminal `npm run dev` y presiona `enter`, abre el navegador y en la barra de direcciones coloca `http://localhost:5173/` **Listos para codear**.
2. 🎯 Necesitamos definir dónde empezará nuestro jugador(nave). Justo arriba de `useEffect`, vamos a crear un "objeto" para nuestro jugador(nave):

```js
// ⚡Las propiedades de nuestra nave
const jugador = {
  x: 100, // Posición horizontal (empieza a la izquierda)
  y: 250, // Posición vertical (cerca del suelo)
  ancho: 50, // Qué tan gordo es
  alto: 50, // Qué tan alto es
  velocidad: 5, // Cuántos píxeles se mueve por frame
  color: "#38bdf8", // Un color azul genial
};
```

3. 🎯 Ahora vamos a dibujar al jugador, la nave. Busca dentro de tu bucleJuego la sección // 3. Texto. Justo debajo de donde dice ctx.fillText(...), agrega este código para pintar un cuadrado temporal que representará a nuestro héroe:

```js
/* ----------------------------------------------------
 👇 Jugador (Se dibuja encima de todo)
----------------------------------------------------*/
// 3.5 ⚡ Dibujar al Jugador(nave) (Por ahora, un cubo espacial)
ctx.fillStyle = "#0000ff"; // Un hermoso color azul celeste
ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);
```

🌟 ¡Refresca y mira tu navegador! Deberías ver un cuadrado azul brillante flotando sobre tu fondo espacial.

### ¿Qué son X e Y? 📐

En el Canvas, el mundo se divide en coordenadas:

- **X**: Es la posición de izquierda a derecha. (0 es el borde izquierdo).
- **Y**: Es la posición de arriba hacia abajo. (0 es el borde superior).

**Mira tu navegador:** ¡Felicidades! Tienes un fondo espacial y un cuadrado tecnológico que será tu nave. ¡Has terminado tu primera semana de entrenamiento Coder! 🎖️

4. 🎯 ¡Hagamos que se mueva! Necesitamos un "radar" que detecte si estamos presionando las flechas del teclado. Para eso, agregaremos un detector de eventos (un EventListener).
   Busca el final del useEffect, justo arriba de la línea que dice return () => { (donde se limpia la animación) y pega este código:

```js
 /**************************************
  ⌨️ ⚡TECLAS PARA MOVERSE: Activamos los interruptores al presionar las teclas
 ************************************* */
const manejarTeclado = (evento) => {
  if (evento.key === "ArrowRight") {
    jugador.x += jugador.velocidad; // Se mueve a la derecha ➡️
  }
  if (evento.key === "ArrowLeft") {
    jugador.x -= jugador.velocidad; // Se mueve a la izquierda ⬅️
  }
};

// Conectamos el radar a la ventana del navegador
window.addEventListener("keydown", manejarTeclado);
```

5. 🎯 ¡Súper importante! Para que el juego no se vuelva loco cuando cerremos la pantalla, debemos apagar el radar al final. Modifica tu bloque de return (la limpieza del useEffect) para que quede así:

```js
return () => {
  cancelAnimationFrame(animacionRef.current);
  window.removeEventListener("keydown", manejarTeclado); // ⚡ Apagamos el radar
};
```

🌟 Guarda tus cambios y haz clic en la pantalla del juego 🔄️: ¡Presiona las flechas izquierda y derecha de tu teclado! Tu héroe ya responde a tus comandos. ¡Felicidades, le has dado vida!

🎯 Es hora de los Retos 🔗 [Enlace Reto cinco](RETO-GUIA-CINCO.md)

**¡Todo está listo para el día 6! 🌌👾**

# GUIA 6 # 🦘 ¡EL PODER DE SALTAR: DESAFIANDO LA GRAVEDAD! 🚀🚀

### ¡Más movimiento para el protagonista de nuestra historia!

1. 🎯 Abre `src/components/MiJuego.jsx`. En la terminal `npm run dev` y presiona `enter`, abre el navegador y en la barra de direcciones coloca `http://localhost:5173/` **Listos para codear**.

# 🦘 ¡EL PODER DE SALTAR: DESAFIANDO LA GRAVEDAD! 🚀

### ¡Nuestra nave ya se mueve de lado a lado, pero los héroes espaciales también necesitan volar y saltar obstáculos!

Hoy vamos a enseñarle a nuestro personaje a desafiar las leyes de la física. Aprenderá a **saltar** usando el teclado y regresará al suelo de forma automática gracias a una fuerza invisible pero poderosa: **La Gravedad**.

1. 🎯 Asegúrate de tener tu juego corriendo. Abre la terminal, ejecuta `npm run dev` y entra a `http://localhost:5173/` en tu navegador.

2. 🎯 Para que nuestro héroe pueda saltar, necesitamos agregar nuevas propiedades físicas en su "objeto". en el componente `MiJuego.jsx`, busca el objeto `jugador` y **reemplázalo** agregando estas tres nuevas propiedades al final (`velocidadY`, `saltando` y `gravedad`):

```js
// ⚡Las propiedades de nuestra nave actualizadas
const jugador = {
  x: 100, // Posición horizontal
  y: 250, // Posición vertical (el suelo temporal)
  ancho: 50, // Qué tan gordo es
  alto: 50, // Qué tan alto es
  velocidad: 8, // Cuántos píxeles se mueve de lado a lado
  color: "#38bdf8",
  // 👇 ¡NUEVOS SUPERPODERES FÍSICOS! 👇
  velocidadY: 0, // Velocidad vertical (hacia arriba o abajo)
  saltando: false, // Nos dice si está en el aire (true) o en el suelo (false)
  gravedad: 0.6, // La fuerza que lo empuja hacia abajo constantemente
};
```

3. 🎯 Ahora vamos a programar la física dentro del motor del juego. Busca dentro de tu función bucleJuego la sección donde limpias la pantalla (ctx.clearRect). Justo debajo de la limpieza, vamos a aplicar la gravedad y a controlar el suelo para que el personaje no caiga al infinito vacío:

```js
const bucleJuego = () => {
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 👇 1.5 APLICAR FÍSICA (Gravedad y Suelo) 👇
      // La gravedad siempre empuja al jugador hacia abajo aumentándole la velocidad vertical
      jugador.velocidadY += jugador.gravedad;
      // Cambiamos la posición real en 'y' del jugador
      jugador.y += jugador.velocidadY;

      // 🛑 El límite del suelo (El lienzo mide 500 de alto, menos 50 de la nave = 450)
      if (jugador.y >= 450) {
        jugador.y = 450;      // Lo plantamos firmemente en el suelo
        jugador.velocidadY = 0; // Detenemos la caída
        jugador.saltando = false; // ¡Ya no está saltando!
      }
```

4. 🎯 ¡Es hora de activar el botón de propulsión! Vamos a modificar nuestro "radar del teclado" para que detecte cuando presiones la Barra Espaciadora o la Flecha Arriba y le dé un impulso hacia arriba al jugador. Busca la función manejarTeclado dentro de tu useEffect y añade esta condición:

```js
// Conectamos los botones para saltar
const manejarTeclado = (evento) => {
  if (evento.key === "ArrowRight") {
    jugador.x += jugador.velocidad;
  }
  if (evento.key === "ArrowLeft") {
    jugador.x -= jugador.velocidad;
  }
  // 👇 ¡NUEVO: El botón de salto! 👇
  if ((evento.key === " " || evento.key === "ArrowUp") && !jugador.saltando) {
    jugador.velocidadY = -15; // Un impulso negativo porque en Canvas "arriba" es restar en Y
    jugador.saltando = true; // Le avisamos al juego que está flotando
  }
};
```

🌟 ¡Guarda tus cambios, haz clic en el lienzo del navegador y presiona la barra espaciadora o la flecha hacia arriba! Tu cubo tecnológico ahora da saltos increíbles y aterriza perfectamente en el suelo.

🎯 Es hora de los Retos 🔗 [Enlace Reto seis](RETO-GUIA-SEIS.md)

**¡Todo está listo para el día 7! 🌌👾**

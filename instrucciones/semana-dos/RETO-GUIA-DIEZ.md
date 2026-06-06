## 🏆 El Reto del Día 10: El Guardián de las Fronteras

¡Impresionante! Ya tienes un motor de movimiento completamente acotado y seguro. Ningún error o velocidad extrema podrá sacar a tu héroe de la pantalla. Para cerrar la semana como un desarrollador experto, resolverás esta bitácora y superarás un misterio de código.

### 🧩 Fase 1: Análisis del Sistema de Fronteras

Abre tu juego con las paredes ya programadas, experimenta chocando contra los bordes y responde a las siguientes preguntas en tu cuaderno o archivo de notas:

1. **El Misterio del 950:** Si nuestro lienzo mide `1000` de ancho, ¿por qué pusimos en el código que el límite derecho es `950`? ¿Qué pasaría si cambiáramos ese número a `1000` exactos? *(Pista: Recuerda desde qué esquina empieza HTML a dibujar al jugador).*
2. **El Efecto Rebote (Análisis Visual):** Al poner `gamer.vx = 0` dentro del `if`, el personaje se detiene en seco. ¿Cómo crees que cambiaría la experiencia si en lugar de igualarlo a cero, hiciéramos que la velocidad se invirtiera? (Por ejemplo: `gamer.vx = -gamer.vx;`).



### 🚀 Fase 2: ¡El Suelo Dinámico!

Si miras el código actual de tu `bucleJuego`, notarás que el límite del suelo está escrito con un número fijo (un valor "duro" o *hardcodeado*):

```javascript
if (gamer.y >= 450) {
  gamer.y = 450;
  // ...
}
```

Ese `450` sale de restar el `ALTO_LOGICO` (500) menos el alto del jugador (50). Pero, ¿qué pasa si la próxima semana decidimos hacer al jugador más pequeño o más grande? ¡Tendríamos que reescribir ese número en muchos lados!

**Tu misión técnica:** Cambia esa condición para que use variables lógicas en lugar de números fijos.

Busca la sección del límite del suelo y reemplázala para que calcule el límite de forma inteligente usando las variables que ya existen en tu juego:

```javascript
// 🔍 Pista de cómo reemplazar el número 450:
if (gamer.y >= ALTO_LOGICO - gamer.alto) {
  gamer.y = ALTO_LOGICO - gamer.alto;
  gamer.velocidadY = 0;
  gamer.saltando = false;
}
```

¡Modifica esa sección y comprueba que tu personaje siga saltando y cayendo a la perfección! Si lo logras, habrás hecho tu código 100% escalable y profesional.

 ## 👑 Super Desafío Extra: El "Efecto Pac-Man" (Teletransportación)
¿Te gustan los juegos arcade como Pac-Man o Asteroids donde si sales por el lado izquierdo de la pantalla apareces mágicamente en el lado derecho?

Si te sobra tiempo, vamos a experimentar creando una versión alternativa de tu juego. Comenta por un momento los if de tus paredes invisibles y prueba esta lógica de frontera:

```JavaScript
// 🌀 EFECTO PAC-MAN: Si cruzas el borde izquierdo, apareces en el derecho y viceversa
if (gamer.x < -gamer.ancho) {
  gamer.x = ANCHO_LOGICO;
}
if (gamer.x > ANCHO_LOGICO) {
  gamer.x = -gamer.ancho;
}
´´´
Prueba este efecto. ¿Cuál estilo de juego te gusta más para tu proyecto final: el bloqueo sólido con paredes invisibles o el efecto Pac-Man de teletransportación? ¡Tú eres el diseñador, tú decides!

🔥 **¡SEMANA 2 CON ÉXITO!** 🔥
Has dominado el bucle de juego, las imágenes de fondo, los controles móviles por botones, el escalado responsivo, las físicas de fricción y los límites de pantalla. ¡Disfruta tu fin de semana, porque la próxima semana empezaremos a poblar este mundo con obstáculos y metas! 🎮✨

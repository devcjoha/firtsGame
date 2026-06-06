## 📝 Guía del Alumno - Día 10

## 🧱 ¡Paredes Invisibles! Asegurando los límites de nuestro mundo

¡Felicidades por llegar al viernes, Coder! 🚀

Ayer lograste que tu personaje se moviera con una suavidad espectacular, acelerando y frenando como si tuviera física real. Pero seguro notaste un problema bastante divertido: si dejas presionada la flecha derecha o izquierda por mucho tiempo, ¡tu héroe se sale de la pantalla y desaparece en el limbo del código! 🛸

Hoy vamos a solucionar eso creando **paredes lógicas invisibles**. Aprenderás a ponerle límites al escenario para que el jugador nunca pueda salirse de los márgenes del lienzo. ¡Hoy blindamos por completo la jugabilidad de nuestro héroe!

---

### 🔍 ¿Cómo funcionan las Paredes Invisibles?

Piénsalo así: nuestro lienzo (Canvas) mide exactamente **1000 píxeles de ancho** (ese es nuestro `ANCHO_LOGICO`). 

* **El límite izquierdo:** Es la posición `x = 0`. Si el jugador intenta ir más allá, su `x` se volvería negativa (menor a cero).
* **El límite derecho:** Es el borde de la pantalla (`1000`). Pero recuerda que el jugador se dibuja desde su esquina superior izquierda. Así que el límite real es el ancho del mapa menos el ancho del propio personaje (`1000 - 50 = 950`).

Para detenerlo, usaremos condicionales `if`. Si el personaje intenta cruzar la pared, ¡lo teletransportamos de inmediato exactamente al borde para congelar su avance!

---

### ⚙️ Paso 1: Programando los límites en el Bucle de Juego

Vamos a buscar nuestra función `bucleJuego` dentro de `MiJuego.jsx`. Justo abajo de donde aplicas la velocidad a la posición del jugador (`gamer.x += gamer.vx;`), vamos a colocar nuestro sistema de seguridad.

Busca esta sección en tu código:

```javascript
// 💥 Aplicamos la velocidad calculada a la posición real en X del jugador
gamer.x += gamer.vx;
```

Y justo **debajo**, añade las siguientes líneas para activar las paredes magnéticas izquierdas:

```javascript
// 🧱 ¡PAREDES INVISIBLES! Evitamos que el jugador se salga de la pantalla
// Límite Izquierdo (No pasar de 0)
if (gamer.x < 0) {
  gamer.x = 0;   // Lo regresamos al borde izquierdo
  gamer.vx = 0;  // Frenamos en seco su velocidad acumulada
}

```
Luego, justo **debajo**, de lo que acabas de añadir, añade las siguientes líneas para activar las paredes magnéticas derechas:

```javascript

// Límite Derecho (No pasar de 1000 - el ancho del jugador que es 50 = 950)
if (gamer.x > 950) {
  gamer.x = 950; // Lo regresamos al borde derecho
  gamer.vx = 0;   // Frenamos en seco su velocidad acumulada
}
```
> 💡 **Nota de Pro-Programador:** Además de cambiar la posición `gamer.x`, ponemos su velocidad de inercia `gamer.vx = 0`. Si no hiciéramos esto, la física acumulada seguiría empujando al personaje de forma invisible y tardaría en responder cuando intentes caminar en la dirección contraria. ¡Así el choque contra la pared se siente sólido!

---
### 🧪 Paso 2: ¡A probar en el navegador!

Guarda tus cambios y ejecuta tu juego.

1. Intenta correr a toda velocidad hacia la izquierda. ¿Se detiene el cubo justo en el borde?
2. Ahora activa el **Turbo (Tecla Shift)** o usa los botones táctiles y corre hacia la derecha. ¿Se frena exactamente al tocar el final de la pantalla?

¡Excelente! Has terminado de blindar la **Capa 2** del juego. Tu personaje ahora salta, acelera, frena y se mantiene seguro dentro de su zona de juego. ¡Estamos listos para el desafío final de la semana!

---

🎯 ¡Es hora de ir al laboratorio de pruebas! Abre el reto del día: 🔗 [[Enlace Reto Diez]](RETO-GUIA-DIEZ.md)

```
---


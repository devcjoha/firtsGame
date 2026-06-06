# 🛸 DESAFÍOS DE CÓDIGO: DÍA 6 🚀

# 🦘 ¡Domina las Leyes de la Física Lunar! 🦘

Has logrado que la gravedad exista en tu propio universo digital. Ahora, como el programador jefe de este proyecto, vas a experimentar modificando la física del espacio para ver qué ocurre.

📢📢📢 **Recuerda**: Guarda los cambios en tu archivo ```MiJuego.jsx```, haz clic sobre el lienzo del juego y ¡prueba los controles!

---

🎯 RETO 1: Gravedad Lunar vs Gravedad Pesada

¿Cómo se comportaría tu nave si estuviera en la Luna? ¿Y si estuviera en un planeta gigante hiperpesado?

**Tu Misión**: Cambia la fuerza de atracción del suelo.

Cómo hacerlo:
* Busca la propiedad `gravedad` dentro del objeto `jugador`.
* **Prueba Lunar**: Cambia el valor de `gravedad` a `0.2` y salta. ¿Qué pasa? ¿Se siente más liviano?
* **Prueba Júpiter**: Cambia el valor de `gravedad` a `2.0` y salta. ¿Qué ocurre ahora?
* *Nota*: Al terminar, déjalo en un número que te parezca divertido y cómodo (por ejemplo, `0.6`).

---

🎯 RETO 2: Súper Botas de Impulso (Fuerza de Salto)

Actualmente, cuando saltas, le damos una velocidad inicial de `-15` (recuerda que restar en el eje `Y` significa subir en la pantalla). 

**Tu Misión**: ¡Haz que tu héroe alcance las estrellas con un salto masivo!

Cómo hacerlo:
* Busca en la función `manejarTeclado` la línea donde dice `jugador.velocidadY = -15;`.
* Modifica ese número: pruébalo en `-25`. ¿Qué tan alto llega?
* Ahora pruébalo en `-8`. ¿Llega muy bajito?
* Encuentra el balance perfecto entre tu `gravedad` del Reto 1 y la potencia de salto para que sea súper ágil.

---

🎯 RETO 3: Rompiendo las Reglas (El Doble Salto Tramposo)

Fíjate en el código que hiciste hoy. Para poder saltar pusimos una condición: `&& !jugador.saltando`. Esto significa: *"Solo puedes saltar si NO estás saltando actualmente"*.

**Tu Misión**: Descubre qué pasa si quitamos esa regla de seguridad del juego.

Cómo hacerlo:
* En la función `manejarTeclado`, modifica la condición del salto para quitarle la última parte. Déjala solo así:
```js
if (evento.key === " " || evento.key === "ArrowUp") { // Borramos el && !jugador.saltando
```
Guarda, ve al navegador y presiona la barra espaciadora muchas veces seguidas rápidamente mientras estás en el aire.

¿Qué puede hacer la nave ahora? ¿Es un superpoder divertido o rompe la dificultad del juego?
  
Vuelve a colocar el código como estaba (&& !jugador.saltando) para que el juego siga teniendo el comportamiento clásico de plata formas, ¡o déjalo si quieres conservarlo como un secreto!

🧩 ¡Físicas dominadas, Coder! Cada vez estás más cerca de crear un juego completo. 🧩
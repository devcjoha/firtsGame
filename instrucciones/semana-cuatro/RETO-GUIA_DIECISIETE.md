# 🎯 Reto Coder GoCoder del Día 17: Diseñador de Niveles y Economía Galáctica

¡Brillante, goCoder! Has añadido un propósito y un hilo conductor a la jugabilidad de tu videojuego. Ahora la exploración espacial tiene una recompensa real y directa. Como _Game Designer_ (Diseñador de Juego), tu trabajo actual es equilibrar la economía y colocar desafíos interesantes.

### Tus tareas de hoy:

1. **Tu Objeto Propio:** Busca una imagen transparente `.png` de una moneda, estrella, gema o cristal espacial. Guárdala en tu carpeta `src/assets/coleccionables/` con el nombre exacto de `cristal-5.png` (sustituyendo la de prueba). ¡Observa cómo todo tu mapa se actualiza al instante con tu nuevo diseño!

2. **Arquitecto de Tesoros:** Modifica las posiciones `x` e `y` de la lista `objeto.current` en la parte superior de tu código. Intenta colocar algunos objetos en zonas muy altas o esquinas arriesgadas que obliguen al jugador a calcular muy bien su velocidad, inercia e impulso de salto para poder atraparlos.

3. **Multiplicador de Valor:** Busca la línea de código dentro de tu filtro (`.filter()`) donde se suman los puntos. Cambia el valor actual de `100` por `250` o `500` puntos, y realiza una prueba de juego para ver qué tan rápido se acumula tu nueva fortuna cósmica en el marcador.

4. **🚀 EL GRAN DESAFÍO: El Objeto de Bonificación Especial (`Bonus`):**
   Ya tienes cargada en tu código la imagen `imagenObjetoBonus` apuntando a `coin-2.png`. ¡Vamos a hacer que funcione en el juego siguiendo estos 3 pasos de ingeniería de software!
   - **Paso A (La Etiqueta):** Ve a tu lista `objeto.current` (y también dentro de la función `reiniciarJuego`) y añade una propiedad especial llamada `tipo: "bonus"` a dos o tres objetos de la lista. Por ejemplo:
     `{ x: 720, y: 220, ancho: 50, alto: 50, color: cyan, tipo: "bonus" }`
   - **Paso B (El Botín):** Dentro de tu detector de colisiones (`objeto.current.filter`), borra la línea de puntos vieja y escribe una condición `if` inteligente:
     ```javascript
     if (chocandoConObjeto) {
       if (objeto.tipo === "bonus") {
         puntosRef.current += 300; // ¡Los objetos especiales dan el triple!
       } else {
         puntosRef.current += 100; // Los normales siguen dando 100
       }
       return false;
     }
     ```
   - **Paso C (El Pincel Dinámico):** En la zona donde dibujas (`objeto.current.forEach`), haz que el Canvas elija qué sprite usar dependiendo de la etiqueta del objeto antes de llamar a `ctx.drawImage`:
     ```javascript
     const spriteElegido =
       objeto.tipo === "bonus" ? imagenObjetoBonus : imagenObjeto;
     ctx.drawImage(
       spriteElegido,
       objetoEnPantallaX,
       objeto.y,
       objeto.ancho,
       objeto.alto,
     );
     ```

---

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy conectamos el detector de colisiones dentro del método `.filter()` de JavaScript, y actualizamos y pintamos el marcador de puntos en tiempo real usando una referencia directa en la memoria RAM (`puntosRef.current`) conectada al método `ctx.fillText()` del Canvas a 60 FPS.

- ¿Por qué el uso de una referencia física (`useRef`) en combinación con el comando de dibujo directo `ctx.fillText` nos permite mantener el juego corriendo de forma fluida a 60 FPS en computadoras y teléfonos móviles, a diferencia de un estado tradicional de React (`useState`) que congelaría o ralentizaría la pantalla debido a los constantes re-renderizados por milisegundo?

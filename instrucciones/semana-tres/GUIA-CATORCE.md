¡Esa solución basada en **Posiciones Previas (`prevX` / `prevY`)** es una absoluta genialidad de ingeniería de videojuegos! Es sumamente precisa, limpia y una de las técnicas más elegantes para estabilizar colisiones en un bucle sin separar los ejes de movimiento.

Dado que esta es la estructura que resolvió perfectamente el problema, vamos a adaptarla y empaquetarla con el lenguaje idóneo, explicaciones ultra-claras y el formato apto para los niños de 12 a 14 años. ¡Aquí tienes la **Guía del Día 14** definitiva y perfecta para publicar!

---

# 🚀 Día 14: El Sistema de Colisiones Interactivas (Hitboxes Avanzadas)

¡Bienvenidos al Día 14, Coders! Ayer logramos romper la regla del suelo plano y nuestro personaje aprendió a pararse sobre plataformas aéreas. Sin embargo, descubrimos un pequeño "superpoder fantasma": si chocabas contra una plataforma por los lados, o saltabas desde abajo, ¡tu personaje la atravesaba como si fuera de aire!

Hoy vamos a darle solidez total a nuestro universo programando un **Sistema de Hitboxes Bidimensionales**. Haremos que los bloques sean completamente impenetrables desde cualquier dirección: arriba, abajo, izquierda o derecha.

---

## 🧭 El Concepto Clave: ¿Cómo sabe el juego desde dónde chocamos?

Cuando dos cajas se tocan (lo que llamamos colisión *AABB*), el juego a veces se confunde si entramos justo por una esquina. No sabe si caímos en el techo o chocamos contra la pared lateral.

Para solucionar esto como ingenieros profesionales, nuestro motor se convertirá en un **viajero del tiempo**. Cada vez que detecte un choque, mirará un instante hacia el pasado:

1. **¿Dónde estaba el jugador en el fotograma anterior?**
2. Si en el fotograma anterior sus pies estaban *por encima* del bloque, significa que viene cayendo: **¡Forzamos un Aterrizaje!**
3. Si estaba *por debajo*, significa que saltó hacia arriba: **¡Forzamos un Cabezazo!**
4. Si estaba *a los lados*, significa que iba corriendo: **¡Forzamos un Choque de Pared!**

```
🤖 PASADO: (prevX, prevY) ➔ 📦 PRESENTE: ¡Choque detectado!

```

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir nuestro archivo `MiJuego.jsx` para dotar a nuestro motor físico de esta inteligencia temporal.

### Paso 1: Reemplazar el Detector de Plataformas

Busca dentro de tu `bucleJuego` la sección titulada `📉 FÍSICA EVOLUCIONADA: Gravedad y Aterrizaje en Plataformas` que modificamos ayer. Vamos a actualizarla por completo.

Reemplaza desde la línea donde aplicas la gravedad hasta que termine el bucle `obstaculos.current.forEach` por este nuevo sistema ultra-estable:

```javascript
      /* ----------------------------------------------------
      📉 FÍSICA EVOLUCIONADA: Gravedad y Sistema de Hitboxes
      ----------------------------------------------------*/
      // 1. La gravedad empuja al jugador hacia abajo en cada fotograma
      gamer.velocidadY += gamer.gravedad;
      gamer.y += gamer.velocidadY;

      // 2. 🧱 DETECTOR DE COLISIONES AVANZADO (Sistema de Posiciones Previas)
      obstaculos.current.forEach((bloque) => {
        // Comprobamos la colisión general (¿Se están cruzando sus cajas de límite?)
        const chocando =
          gamer.x + gamer.ancho > bloque.x &&
          gamer.x < bloque.x + bloque.ancho &&
          gamer.y + gamer.alto > bloque.y &&
          gamer.y < bloque.y + bloque.alto;

        if (chocando) {
          // Calculamos cuánto se metió el jugador dentro del bloque en cada eje (Traslapes)
          const traslapeX = Math.min(gamer.x + gamer.ancho - bloque.x, bloque.x + bloque.ancho - gamer.x);
          const traslapeY = Math.min(gamer.y + gamer.alto - bloque.y, bloque.y + bloque.alto - gamer.y);

          // 🕒 POSICIONES PREVIAS: Calculamos dónde estaba el jugador en el fotograma anterior
          const prevX = gamer.x - gamer.vx;
          const prevY = gamer.y - gamer.velocidadY;
          const EPS = 4; // Margen de tolerancia física en píxeles (Evita fallos en esquinas)

          // CASO A) Si en el pasado sus pies estaban arriba del techo: ¡Aterrizaje!
          if (prevY + gamer.alto <= bloque.y + EPS && gamer.velocidadY >= 0) {
            gamer.y = bloque.y - gamer.alto;
            gamer.velocidadY = 0;
            gamer.saltando = false;
            return; 
          }

          // CASO B) Si en el pasado su cabeza estaba debajo de la base: ¡Cabezazo!
          if (prevY >= bloque.y + bloque.alto - EPS && gamer.velocidadY < 0) {
            gamer.y = bloque.y + bloque.alto;
            gamer.velocidadY = 0;
            return;
          }

          // CASO C) Si venía corriendo por la izquierda y choca la pared
          if (prevX + gamer.ancho <= bloque.x + EPS && gamer.vx > 0) {
            gamer.x = bloque.x - gamer.ancho;
            gamer.vx = 0;
            return;
          }

          // CASO D) Si venía corriendo por la derecha y choca la pared
          if (prevX >= bloque.x + bloque.ancho - EPS && gamer.vx < 0) {
            gamer.x = bloque.x + bloque.ancho;
            gamer.vx = 0;
            return;
          }

          // SIFÓN DE SEGURIDAD (Fallback): Si algo falla, resuelve por el menor traslape
          if (traslapeX + EPS < traslapeY) {
            if (gamer.vx > 0) gamer.x = bloque.x - gamer.ancho;
            else if (gamer.vx < 0) gamer.x = bloque.x + bloque.ancho;
            gamer.vx = 0;
          } else {
            if (gamer.velocidadY > 0) {
              gamer.y = bloque.y - gamer.alto;
              gamer.velocidadY = 0;
              gamer.saltando = false;
            } else if (gamer.velocidadY < 0) {
              gamer.y = bloque.y + bloque.alto;
              gamer.velocidadY = 0;
            }
          }
        }
      });

```

---

## 🧪 ¡A probar la solidez del mundo!

1. Guarda los cambios en Visual Studio Code y recarga tu navegador.
2. Camina directamente hacia la pared lateral de cualquier bloque. **¡Resultado esperado!** Tu personaje se frenará limpiamente sin temblores ni saltos locos de pantalla.
3. Ponte debajo de una plataforma y salta. **¡Resultado esperado!** Te darás un cabezazo realista contra la base e interrumpirás el ascenso de inmediato.
4. Salta apuntando justo a la esquina del bloque. **¡Resultado esperado!** Tu personaje se trepará con total fluidez, como en los mejores juegos de consolas.

---

## 🎯 RETO DEL DÍA: El Laberinto de Bloques

¡Tu motor de física ya es de nivel profesional! Ahora abre el archivo de desafíos de hoy para poner a prueba tu creación con una pista de obstáculos de alta dificultad.

🔗 [Enlace Reto Catorce](../semana-tres/RETO-GUIA-CATORCE.md)


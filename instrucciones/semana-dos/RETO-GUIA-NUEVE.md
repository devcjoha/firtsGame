## 🏆 El Reto del Día 9: El Laboratorio del Diseñador de Juegos (Ampliado)

¡Tu código ya está listo para la acción! Pero aquí viene tu verdadero trabajo como **Game Designer (Diseñador de Videojuegos)**. Los números que pusimos de ejemplo (`aceleracion: 0.8` y `friccion: 0.85`) son solo un punto de partida. Tu misión hoy es tunearlos, probarlos y encontrar la combinación perfecta.

Para superarlo, vas a convertirte en un tester profesional. Abre tu juego, experimenta cambiando los valores directamente en tu objeto `jugador` y completa la siguiente bitácora de diseño.

### 🧪 Fase 1: Los 3 Experimentos Obligatorios

Prueba estas tres configuraciones extremas en tu código, juega con el personaje al menos unos minutos en cada una (tanto en teclado como en los botones móviles) y analiza qué pasa:
🔄️*Recuerda refrescar el navegador cada que haces un cambio.*

| **Configuración**          | **Valores a colocar**                                   | **¿Cómo se siente el control? ¿Qué problema notas?**                                                   |
| -------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **1. El Planeta de Hielo** | `aceleracion: 0.1``friccion: 0.99``velocidadMaxima: 6 ` | *Ejemplo: Tarda una eternidad en arrancar y cuando suelto el botón se resbala casi hasta el infinito.* |
| **2. El Pantano Pegajoso** | `aceleracion: 4``friccion: 0.4``velocidadMaxima: 8`     | *Ejemplo: Da un parón seco inmediato, se siente súper rígido y pesado.*                                |
| **3. El Rompe-Barreras**   | `aceleracion: 1.5``friccion: 0.90``velocidadMaxima: 20` | *Ejemplo: Va tan ridículamente rápido que es imposible calcular dónde va a frenar.*                    |

### 📊 Fase 2: Crea tu propio "Perfil de Movimiento"

Ahora que ya viste cómo los números cambian la experiencia, llegó el momento de calibrar **tu propia firma de movimiento**. Ajusta las variables de tu `jugador` hasta encontrar el punto exacto donde el juego se sienta suave, ágil y divertido (ese punto de "seda" que buscamos).

Cuando lo tengas, haz una ficha con tus números finales y será tu estilo personalizado de juego:

* **Nombre de mi Perfil de Control:** _______________________

* `aceleracion`: ________

* `friccion`: ________

* `velocidadMaxima`: ________

**Pregunta de Diseñador:** ¿Por qué elegiste estos números? ¿Qué ventaja le dan al jugador a la hora de esquivar obstáculos móviles o saltar rápido? ¡Defiende tu diseño!

### 🚀 Mini-Desafío Extra (Opcional para mentes inquietas): "El Turbo Espacial" 🔗 [[Enlace codigo-turbo]](/instrucciones/extras/codigo-turbo.md)

Si quieres ver el poder real de las variables independientes, ve a tu código del teclado (la función `manejarKeyDown`) y haz que si el jugador presiona la tecla **"Shift" (Mayús)** mientras se mueve, la `velocidadMaxima` suba temporalmente a `12`. Al soltarla en `manejarKeyUp`, vuelve a bajarla a su velocidad normal. ¡Habrás creado un sistema de sprint o turbo sin romper nada del movimiento base!


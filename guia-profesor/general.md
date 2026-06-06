¡Aquí tienes, Carla! He unificado, ordenado y limpiado toda la estructura que consolidamos. Eliminé las repeticiones de ideas, organicé los textos duplicados (como el array de obstáculos que había quedado suelto al final de la semana 3) e integré orgánicamente los apartados "Extra" dentro de sus días correspondientes [cite: 2026-05-16, 2026-05-25].

Este es tu **Diseño Macro definitivo, limpio y unificado**, listo para usar de mapa de ruta oficial:

---

# 🗺️ DISEÑO MACRO DEL PROYECTO: GOCODER (1 MES)

**Población:** Niños de 12 a 14 años [cite: 2026-05-16]

**Tiempo diario:** 1.5 a 2 horas (Lunes a Viernes) [cite: 2026-05-16]

**Enfoque de Arquitectura:** Desarrollo aditivo por capas (No retroactivo) [cite: 2026-05-16, 2026-05-25]

---

### 🗓️ SEMANA 1: El Lienzo y el Entorno (Capa 1)

**Meta de la semana:** Configurar la base del proyecto y lograr un lienzo responsivo capaz de renderizar imágenes en un bucle de animación constante.

* **Día 1 (Lunes) y Día 2 (Martes): Estructura e Introducción a React.**
* *Contenido:* Exploración de la estructura del proyecto en Vite. Limpieza de `App.jsx` y creación del componente base `src/components/MiJuego.jsx`. Aprendizaje sobre propiedades HTML y estilos con Tailwind CSS.


* **Día 3 (Miércoles - Guía/Reto 3): El Canvas y El Motor (Game Loop).**
* *Contenido:* Implementación de `canvasRef` y obtención del pincel digital con el contexto 2D (`ctx`). Configuración del ciclo continuo con `requestAnimationFrame` y su respectiva limpieza de memoria en `useEffect`.
* *Desafío:* Personalizar el espacio con colores hexadecimales y dibujar texto interactivo modificando coordenadas X/Y.


* **Día 4 (Jueves - Guía/Reto 4): Carga de Assets Espaciales.**
* *Contenido:* Introducción a la carga asíncrona de imágenes en React (`new Image()`) y uso del interruptor lógico `fondoCargado`. Dibujo del fondo usando `ctx.drawImage`.
* *Desafío:* Experimentar alterando las dimensiones del Canvas y probar diferentes fondos estelares de la carpeta de assets.


* **Día 5 (Viernes - Guía/Reto 5): El Nacimiento del Héroe.**
* *Contenido:* Creación del objeto literal del jugador con sus dimensiones y coordenadas iniciales en pantalla. Renderizado del cuadrado que representará temporalmente al héroe dentro del Game Loop.
* *Desafío:* Importar el archivo global de colores personalizados y alterar el tamaño y velocidad base de la nave.



---

### 🗓️ SEMANA 2: El Héroe Cobra Vida (Capa 2)

**Meta de la semana:** Programar físicas reales de gravedad y salto, migrar el estado del jugador para soportar controles continuos y habilitar una botonera móvil profesional.

* **Día 6 (Lunes - Guía/Reto 6): Físicas de Salto y Gravedad.**
* *Contenido:* Implementación de aceleración vertical (`velocidadY`) y la fuerza invisible de la `gravedad`. Establecimiento del límite de caída en el suelo firme (`y: 450`).
* *Desafío:* Manipular los valores físicos para simular gravedad lunar o de planetas pesados, y experimentar eliminando el candado de seguridad para descubrir el "superpoder del salto infinito".


* **Día 7 (Martes - Guía/Reto 7): Ajuste del Tamaño Lógico vs Visual.**
* *Contenido:* Creación de la función matemática `resizeCanvas` para estirar el lienzo visualmente en teléfonos sin alterar las dimensiones de juego (1000x500). Integración del primer detector táctil (`touchstart` global en el Canvas).
* *Desafío:* Levantar el servidor local con la bandera `--host`, escanear la dirección Network desde sus teléfonos y ver el juego saltar de forma responsiva en sus manos.


* **Día 8 (Miércoles - Guía/Reto 8): La Revolución de los Controles Continuos.**
* *Contenido:* Migración del objeto jugador a un `useRef` para solucionar la congelación del Game Loop. Creación de interruptores booleanos (`moviendoIzquierda`, `moviendoDerecha`) y maquetación de la botonera táctil flotante con Tailwind CSS.
* *Desafío:* Instalar la biblioteca profesional `lucide-react`, sustituir los emojis por flechas vectoriales estilizadas y lograr la maniobra de salto diagonal combinado en el móvil.


* **Día 9 (Jueves): Calibración y Game Feel.**
* *Contenido:* Jornada práctica de nivelación y optimización. Los estudiantes calibran minuciosamente los valores del juego: balancean la fricción de frenado, ajustan la altura ideal del salto y refinan la sensibilidad táctil para garantizar que los controles se sientan ágiles, cómodos y fluidos en PC y pantallas móviles.


* **Día 10 (Viernes): Paredes Invisibles (Límites de Pantalla).**
* *Contenido:* Programación de las restricciones lógicas de fronteras. Los niños aprenden a escribir las condiciones que impiden que el personaje sea empujado fuera de los límites visibles del lienzo (`if (gamer.x < 0) gamer.x = 0;`), finalizando la Capa 2 con una jugabilidad perfectamente acotada y segura.



---

### 🗓️ SEMANA 3: El Mundo Desafiante (Capa 3)

**Meta de la semana:** Expandir el lienzo estático a un escenario extenso y dinámico mediante un sistema aditivo de cámara, arreglos de obstáculos y control de colisiones bidimensionales [cite: 2026-05-16, 2026-05-25].

* **Día 11 (Lunes): El Concepto de Cámara (Scroll Lateral).**
* *Contenido:* Introducción al truco cinematográfico del desarrollo de videojuegos: el jugador avanza acumulando su `x` real, pero se define una variable de desplazamiento (`let camaraX = jugador.current.x - 150`). Se modifica la renderización del fondo de la Semana 1 para que se desplace reactivamente en dirección al jugador.


* **Día 12 (Martes): El Array de Obstáculos (Generación de Mapa).**
* *Contenido:* Diseño de la estructura del nivel. Creación de un arreglo (array) de objetos que almacena coordenadas lejanas en el eje X (ej: `[{x: 600, y: 400}, {x: 1100, y: 350}]`). En el bucle de renderizado se enseña a dibujar cada bloque aplicando el modificador de cámara: `obstaculo.x - camaraX`. (Parallax)


* **Día 13 (Miércoles): Plataformas Aéreas (Evolución de la Gravedad).**
* *Contenido:* Rompiendo el suelo plano. La restricción fija del suelo estático (`y: 450`) desarrollada en el Día 6 evoluciona lógicamente mediante una función de soporte. La nave ahora puede aterrizar de forma segura, detener su caída y caminar sobre las plataformas elevadas si cae encima de ellas desde el aire.


* **Día 14 (Jueves): Sistema de Colisiones (Hitboxes).**
* *Contenido:* Programación de la lógica de intersección de rectángulos (AABB). Desarrollo de una función matemática que compare las posiciones reales del jugador y los obstáculos. Si se detecta un impacto lateral o inferior, se frena instantáneamente el vector de avance del jugador.


* **Día 15 (Viernes): La Meta Final.**
* *Contenido:* Colocación de un objeto especial (bandera, portal o base espacial) al extremo final del mapa (ej. en `X = 4000`). Configuración de la validación matemática: cuando la coordenada del jugador cruza este límite (`jugador.current.x >= 4000`), se activa un disparador lógico en consola o una bandera que marca el nivel como superado.



---

### 🗓️ SEMANA 4: Pulido Visual, Estados de Juego y Lanzamiento (Capa 4)

**Meta de la semana:** Sustituir geometrías de desarrollo por sprites finales, integrar una máquina de estados para controlar las pantallas y estructurar las mecánicas de supervivencia y fin del juego [cite: 2026-05-16, 2026-05-25].

* **Día 16 (Lunes): De Cuadrados a Sprites Reales.**
* *Contenido:* Estética visual del proyecto. Se reutiliza la técnica de carga de imágenes del Día 4 para asignar texturas detalladas a las plataformas y se reemplaza el rectángulo azul del jugador por el sprite oficial de la nave espacial seleccionada o diseñada por los alumnos.


* **Día 17 (Martes): Variables de Estado (Vidas y Coleccionables).**
* *Contenido:* Integración de mecánicas de recompensa. Distribución de objetos flotantes (estrellas, combustible o monedas) a lo largo del mapa. Se recicla la función de colisiones del Día 14 para que, al tocarlos, sumen puntos a un marcador global y se eliminen automáticamente del array.


* **Día 18 (Miércoles): La Máquina de Estados (Menús del Juego).**
* *Contenido:* Estructura de navegación de la interfaz de usuario. Creación de una variable de estado con `useState` para gobernar las pantallas del software (`"MENU"`, `"JUGANDO"`, `"GAMEOVER"`, `"VICTORIA"`). Este estado determina dinámicamente cuándo el Game Loop debe correr o pausarse en segundo plano.


* **Día 19 (Jueves): Sistema de Daño, Vidas y Efectos Especiales.**
* *Contenido:* Implementación del sistema de juego. Se programa un contador de 3 vidas. Al impactar con obstáculos dañinos (como espinas), el jugador pierde una vida, se activa un parpadeo visual decorativo (inmunidad temporal por daño) y se reinicia su posición al punto de partida del nivel.


* **Día 20 (Viernes): Gran Lanzamiento y Despliegue.**
* *Contenido:* Optimización del software, limpieza de registros e hilos de prueba (`console.log`). Compilación final y transmisión de la dirección de red estable. Los estudiantes prueban el videojuego definitivo en los celulares de sus representantes, compartiendo y celebrando su primera experiencia como desarrolladores profesionales.



---

### 🛡️ ¿Por qué este mapa de ruta cumple con nuestra regla de oro?

* **Código Incremental Aditivo:** La brillante botonera táctil construida con `useRef` e interruptores en el Día 8 queda intacta.
* **Evolución en el Presente:** El paso de pantalla estática a scroll (Semana 3) se realiza modificando *cómo* el lienzo dibuja el fondo y los obstáculos en la guía de ese día, sin reescribir ni tocar las instrucciones que los niños ya completaron en el pasado.

# 🚀 Día 11: El Truco de la Cámara (Scroll Lateral)

¡Bienvenidos a la Semana 3, Coders! Hasta ahora, nuestro personaje ha estado atrapado en una pantalla fija. Si caminaba más allá del borde, ¡desaparecía en el infinito! Luego logramos ponerle limites a la pantalla y, si llegamos hasta allí, probamos la teletransportación tipo pac-man.

Hoy vamos a aprender un **secreto de Hollywood y de los videojuegos profesionales**: el efecto de cámara o _Scroll Lateral_. Tu personaje no se moverá por la pantalla; la pantalla se moverá en dirección contraria a él para dar la ilusión de un mundo gigante.

---

## 🧭 El Gran Secreto: ¿Cómo funciona una Cámara en 2D?

En los videojuegos, el mapa puede medir miles de píxeles de largo, pero nuestra pantalla (el Canvas) sigue siendo pequeña.

- **Tu personaje tiene una posición REAL (x):** Es su lugar en el mundo entero.
- **La cámara tiene una posición (offsetX):** Es cuánto se ha movido el "lente" hacia la derecha.
- **La posición de DIBUJO en pantalla:** Para saber dónde pintar al jugador y los fondos, restamos la cámara:  
   `Posición en Pantalla = Posición Real - Cámara`

> 💡 **Pensamos como directores de cine:** Si el jugador avanza a la derecha, empuja la cámara hacia la derecha. Para simular que avanzamos, ¡dibujamos todo lo demás moviéndose hacia la izquierda!

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a implementar la cámara en nuestro código actual. No te preocupes, no cambiaremos cómo se mueve tu personaje, solo **cómo vemos el mundo**.

### Paso 1: Crear la variable de la Cámara

Necesitamos que nuestro juego recuerde constantemente dónde está la cámara. Para eso, usaremos una referencia (`useRef`) justo debajo de las que ya creaste para el jugador.

Busca en tu archivo `MiJuego.jsx` donde están tus referencias y agrega `camaraX`:

```javascript
// Tus referencias anteriores 👀(No las toques)
const canvasRef = useRef(null);
const animacionRef = useRef(null);
const contenedorRef = useRef(null);
const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
const ANCHO_LOGICO = 1000;
const ALTO_LOGICO = 500;

const jugador = useRef({
  // ... todas las propiedades de tu jugador se quedan igual
});

// ✨ NUEVA REFERENCIA: Registra el desplazamiento de la cámara (empieza en 0)
const camaraX = useRef(0);
```

### Paso 2: Desactivar el "Efecto Pac-Man" y Calcular la Cámara

Entremos a nuestro bucleJuego. Lo primero que haremos es comentar o borrar el efecto Pac-Man de la guía 10, porque ahora queremos que el personaje siga corriendo hacia adelante en lugar de teletransportarse.

En nuestro bucle principal del juego (dentro de la función de actualización o en tu `requestAnimationFrame`), necesitamos que la cámara **siga al jugador**, pero con un margen para que no esté pegado al borde izquierdo.

Justo después de calcular la posición en X del jugador, añadiremos la fórmula para que la cámara lo siga cuando se acerque al borde derecho (a 950 píxeles):

```js
/* ----------------------------------------------------
🧱 ¡ELIMINAMOS EL EFECTO PAC-MAN! Ahora el mundo es continuo
----------------------------------------------------*/
// if (gamer.x < -gamer.ancho) { gamer.x = ANCHO_LOGICO; }
// if (gamer.x > ANCHO_LOGICO) { gamer.x = -gamer.ancho; }

/* ----------------------------------------------------
✨ NUEVO: Actualizamos la posición de la cámara
----------------------------------------------------*/
// La cámara seguirá al jugador, pero mantendrá al personaje a 200 píxeles del borde izquierdo
camaraX.current = gamer.x - 950;

// 🛑 Bloqueo de seguridad: Evita que la cámara muestre espacio vacío antes de empezar el nivel
if (camaraX.current < 0) {
  camaraX.current = 0;
}
```

### Paso 3: Aplicar la Cámara al Dibujar el Fondo y el Personaje

¡Aquí viene la magia! Ahora modificaremos la forma en que dibujamos los elementos usando nuestra nueva `camaraX.current`.

Busca tu sección de renderizado (donde usas `ctx.drawImage` o `ctx.fillRect`) y aplica la resta mágica:

#### a. Dibujar el Fondo con Movimiento (Efecto Scroll)
Busca la condición if (fondoCargado) y cambia el dibujo del fondo para que use el desplazamiento en negativo (-):
Si tu fondo antes se dibujaba fijo en `0`, ahora le restaremos una parte de la cámara para que se mueva más lento, o la cámara completa si quieres que sea un fondo infinito:

```javascript
// Antes: ctx.drawImage( imagenFondo, 0, 0, canvas.width, canvas.height);
// Ahora: El fondo se desplaza en base a la cámara
ctx.drawImage(imagenFondo, -camaraX.current, 0, canvas.width, canvas.height);
```

#### b. Dibujar al Jugador en su Posición Relativa

El jugador ya no se dibuja en su `x` real, sino en su posición respecto a la cámara:

```javascript
/* ----------------------------------------------------
👇 Jugador (Se dibuja encima de todo)
----------------------------------------------------*/
// Guardamos la posición en pantalla restando la cámara
ctx.fillStyle = gamer.color; // O tu imagen de personaje / cambia el color en el objeto jugador
const jugadorEnPantallaX = gamer.x - camaraX.current;

// Dibujamos al jugador usando su posición de pantalla (ScreenX)
ctx.fillRect(
  jugadorEnPantallaX,
  gamer.y,
  gamer.ancho, gamer.alto
);
```

---

## 🧪 ¡A Probar el Juego!

Guarda los cambios y abre tu navegador.

1. Camina hacia la derecha con tu teclado o controles móviles.
2. Verás que al pasar los 150 píxeles, el personaje parece quedarse "quieto" en esa zona, ¡pero **el fondo comienza a moverse hacia atrás**!
3. ¡Felicidades! Has creado un mundo que se extiende más allá de los límites de tu monitor.

---
🎯 ¡Es hora de ir al laboratorio de pruebas! Abre el reto del día: 🔗 [[Enlace Reto Once]](RETO-GUIA-ONCE.md)
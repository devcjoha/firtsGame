# 🚀 Día 12: Creando el Mapa del Mundo (El Array de Obstáculos)

¡Bienvenidos al Día 12, Coders! Ayer logramos un truco genial: ¡construir una cámara que se mueve! Pero como te diste cuenta en el reto de ayer, el mundo se sentía un poco vacío y el fondo se terminaba rápido.

Hoy vamos a aprender a **diseñar un nivel de verdad**. En lugar de tener un suelo plano e infinito, aprenderás el secreto que usan juegos como *Super Mario Bros* o *Geometry Dash*: **¡Un Array de Obstáculos!** Aprenderemos a esparcir plataformas por todo el universo del juego y hacer que aparezcan mágicamente en pantalla justo a tiempo.

---

## 🧭 El Concepto Clave: ¿Cómo se guarda un mapa en código?

Imagina que tu juego es una tira larga de papel milimetrado. Tu personaje empieza en la posición `x = 100`. Si queremos poner una plataforma flotando a lo lejos, no podemos simplemente dibujarla en un lugar fijo de la pantalla, ¡porque la pantalla se mueve!

La solución es crear una **lista inteligente** (un Array de Objetos en JavaScript). Cada obstáculo sabrá su propia posición **REAL** en el mundo:

```javascript
// Una lista de plataformas con sus coordenadas en el universo
const plataformas = [
  { x: 600,  y: 400, ancho: 120, alto: 30 },  // Primera plataforma
  { x: 1100, y: 350, ancho: 150, alto: 30 },  // ¡Esta está más allá del borde inicial!
  { x: 1600, y: 280, ancho: 100, alto: 30 }   // ¡Súper lejana y alta!
];
```

### El Efecto Parallax de Dibujo 🎭

Al igual que con el personaje, para dibujar cada una de estas plataformas en el canvas usaremos la **resta mágica**:

${Posición en Pantalla} = Posición Real de la Plataforma - Cámara$

Si la plataforma está en la posición real `1100` y nuestra cámara avanzó a `800`, la pantalla la dibujará exactamente en el píxel $1100 - 800 = 300$. ¡Aparecerá caminando hacia nosotros!

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a expandir el universo de nuestro archivo `MiJuego.jsx` para darle vida a este mapa masivo.

### Paso 1: Configurar el Tamaño del Universo y el Mapa

Vamos a abrir `MiJuego.jsx`. Buscaremos donde declaramos las constantes de tamaño lógico y añadiremos una nueva que defina qué tan largo es nuestro mapa total, y abajo crearemos nuestra lista de plataformas utilizando un `useRef` para que persistan en cada renderizado.

Busca estas líneas en tu código:

```javascript
const ANCHO_LOGICO = 1000;
const ALTO_LOGICO = 500;
const camaraX = useRef(0);
```

Y cámbialas / agrégales esto justo debajo:

```javascript
const ANCHO_LOGICO = 1000;
const ALTO_LOGICO = 500;
const ANCHO_MAPA_TOTAL = 3000; // ✨ NUEVO: ¡Tu mundo ahora mide 3 veces más!
const camaraX = useRef(0);

// ✨ NUEVO ARRAY DE OBSTÁCULOS: El plano arquitectónico de tu nivel
const obstaculos = useRef([
  { x: 600,  y: 380, ancho: 150, alto: 30, color: "#e11d48" }, // Plataforma 1 (Roja)
  { x: 1000, y: 320, ancho: 200, alto: 30, color: "#10b981" }, // Plataforma 2 (Verde)
  { x: 1500, y: 250, ancho: 120, alto: 30, color: "#f59e0b" }, // Plataforma 3 (Amarilla)
  { x: 2000, y: 350, ancho: 180, alto: 30, color: "#8b5cf6" }, // Plataforma 4 (Morada)
  { x: 2500, y: 200, ancho: 250, alto: 30, color: "#ec4899" }  // ¡La plataforma final!
]);
```

### Paso 2: Actualizar los Límites de la Cámara (El Reto de Ayer)

Ayer limitamos la cámara para que no pasara de `0`. Ahora que nuestro mundo mide `3000` píxeles, si la cámara se detiene en 0, ¡nunca podremos ver lo que hay más allá!

Busca dentro de tu `bucleJuego` la zona donde controlas los bloqueos de seguridad de la cámara y actualiza el **bloqueo derecho**:

```javascript
/* ----------------------------------------------------
✨ CÁMARA: Actualizamos la posición de la cámara
----------------------------------------------------*/
// La cámara seguirá al jugador, pero mantendrá al personaje a 200 píxeles del borde izquierdo
camaraX.current = gamer.x - 200; // 💡 Ajustamos a 200 para ver mejor el camino frontal

// 🛑 Bloqueo de seguridad izquierdo: Evita ver el vacío antes del inicio
if (camaraX.current < 0) {
  camaraX.current = 0;
}

// 🛑 ACTUALIZADO: Bloqueo de seguridad derecho
// El límite es: Ancho del Mapa (3000) - Ancho de Pantalla (1000) = 2000
if (camaraX.current > ANCHO_MAPA_TOTAL - ANCHO_LOGICO) {
  camaraX.current = ANCHO_MAPA_TOTAL - ANCHO_LOGICO; 
}
```

> **¡Y una regla extra para el jugador!** Evitemos que el jugador camine hacia atrás fuera del mapa o se caiga al final del universo:

```javascript
// Evitar que el jugador salga por el inicio izquierdo
if (gamer.x < 0) gamer.x = 0;
// Evitar que el jugador pase del final del mapa entero
if (gamer.x > ANCHO_MAPA_TOTAL - gamer.ancho) gamer.x = ANCHO_MAPA_TOTAL - gamer.ancho;
```

### Paso 3: Dibujar los Obstáculos Usando la Cámara

¡Es hora de pintar! En lugar de escribir código para dibujar cada bloque uno por uno, le diremos a la computadora que recorra nuestra lista completa usando un bucle dinámico `.forEach()`.

Busca en tu sección de dibujo de `bucleJuego`, justo **después de dibujar el Fondo** y **antes de dibujar al Jugador**, e inyecta este bloque de renderizado:

```javascript
/* ----------------------------------------------------
🧱 NUEVO: Dibujar la Lista de Obstáculos / Plataformas
----------------------------------------------------*/
obstaculos.current.forEach((bloque) => {
  // Aplicamos la fórmula matemática de la cámara
  const bloqueEnPantallaX = bloque.x - camaraX.current;

  // Pintamos el bloque con su color único asignado
  ctx.fillStyle = bloque.color;
  ctx.fillRect(
    bloqueEnPantallaX, 
    bloque.y, 
    bloque.ancho, 
    bloque.alto
  );

  // Opcional: Un borde elegante para que resalte
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
});
```

---

## 🧪 ¡A Probar el Nivel!

Guarda los cambios y recarga tu navegador.

1. Camina de frente hacia la derecha.
2. Verás cómo los bloques de colores van apareciendo por el lado derecho de la pantalla de forma fluida a medida que avanzas.
3. ¡Felicidades! Has expandido el espacio geométrico de tu juego y construido un motor gráfico capaz de procesar mapas de cualquier tamaño.

*(Nota: De momento atravesarás las plataformas como un fantasma si saltas sobre ellas; ¡mañana activaremos la física de colisiones sólidas para aterrizar encima de ellas!).*

---

🎯 ¡Es hora de ir al laboratorio de pruebas! Abre el reto del día: 🔗 [[Enlace Reto Doce]](RETO-GUIA-DOCE.md)
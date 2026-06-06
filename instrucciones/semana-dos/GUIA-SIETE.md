# GUIA 7 # 📱 ¡PANTALLAS TÁCTILES: EL PODER DEL TOQUE MÓVIL! 🚀🚀

### ¡Haciendo que nuestro juego funcione en cualquier teléfono o tablet!

## Adaptando nuestro Lienzo (Canvas) para Pantallas de Celulares:

¡Hola, Desarrollador/a! Hasta ahora, nuestro juego se ve increíble en la pantalla de la computadora. Pero ¿qué pasa si quieres compartírselo a tus amigos para que lo jueguen en sus teléfonos móviles?

Si abrimos el juego en un celular ahora mismo, notarás dos problemas: o se ve muy pequeño y al voltear la pantalla se ve cortado.

Hoy vamos a aprender un truco profesional de la industria de los videojuegos: Separar los ojos del juego de los ojos del jugador.

🕵️‍♂️ **El Secreto**: El Tamaño Lógico vs. El Tamaño Visual
Para que un juego funcione bien en cualquier pantalla sin que se rompan tus saltos ni tus colisiones, el Canvas maneja dos tipos de tamaños:

**Tamaño Interno (Lógico)**: Son las matemáticas de tu juego. El lienzo de tu juego siempre sabrá que mide 1000 de ancho y 500 de alto, y que tu suelo está firmemente colocado en la posición 450. **¡Esto no cambia nunca!**

**Tamaño Externo (Visual)**: Es la "lupa" con la que el teléfono mira tu juego. Usaremos una pequeña función mágica en JavaScript para que actúe como una liga elástica: va a encoger el dibujo para que quepa en el celular, pero sin deformar los personajes ni mover el suelo.

## 🛠️ Paso a Paso: ¡Manos al Código!

📌 **Paso 1**: Configurar la "Lupa Inteligente"

Para no ensuciar nuestro archivo principal, guardaremos la matemática del tamaño en un archivo asistente.

- Ve a tu carpeta de proyecto, dentro de `src` busca o crea una carpeta llamada utils (útiles).

- Adentro, hay o crea un archivo llamado `resizeCanvas.js`.

- Pega este código que se encargará de medir la pantalla del celular por ti:

```js
export function resizeCanvas(canvas, anchoLogico, altoLogico) {
  if (!canvas) return;

  const anchoVentana = window.innerWidth;
  const altoVentana = window.innerHeight;

  let anchoMaximo = anchoVentana;
  let altoMaximo;

  // 📱 Horizontal PC (ideal para jugar)
  if (anchoVentana > altoVentana && anchoVentana > anchoLogico) {
    altoMaximo = altoVentana - 120; // margen mínimo
    anchoMaximo = anchoVentana; // usar todo el ancho
  } else if (anchoVentana > altoVentana && altoVentana < altoLogico) {
    // 📱 Horizontal celular (menos ideal para jugar, pero al menos se ve bien)
    altoMaximo = altoVentana - 40; // margen mínimo
    anchoMaximo = anchoVentana; // usar todo el ancho
  }
  // 📱 Vertical
  else {
    altoMaximo = altoVentana - 120; // deja espacio para título
  }

  // 🎯 Mantener proporción exacta del mundo lógico
  const escala = Math.min(anchoMaximo / anchoLogico, altoMaximo / altoLogico);

  // 🎨 Tamaño visual (CSS)
  canvas.style.width = `${anchoLogico * escala}px`;
  canvas.style.height = `${altoLogico * escala}px`;

  // 🧱 Tamaño interno fijo (física estable)
  canvas.width = anchoLogico;
  canvas.height = altoLogico;
}
```

- 🎯 Cierra el archivo `resizeCanvas.js`

📌 **Paso 2**: Conectar los radares en `MiJuego.jsx`
Ahora vamos a abrir tu archivo principal `MiJuego.jsx` para activar este superpoder responsivo dentro de tu `useEffect`.

- Vamos a importar la función que acabamos de crear.

```js
import { resizeCanvas } from "../utils/resizeCanvas";
```

- Vamos a crear dos variables, en ellas colocaremos las dimensiones o el tamaño lógico que necesitamos permanezca fijo. Colocalas debejo de las otras variables declaradas en MiJuego()

```js
function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
// ⚡Nuevas variables
 const ANCHO_LOGICO = 1000;
 const ALTO_LOGICO = 500;

 // Resto del código
```

- Busca el inicio de tu `useEffect` (donde creas el contexto 2d) y añade el radar de cambio de pantalla justo antes de la carga de tus imágenes:

```js
   useEffect(() => {
 const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

// 📱 ACTIVAMOS LA MAGIA RESPONSIVA
    const manejarResize = () => resizeCanvas(canvas, ANCHO_LOGICO, ALTO_LOGICO);
    manejarResize(); // Lo ejecutamos de inmeGUIAto al cargar

    // Le decimos al navegador que si giran el celular, vuelva a acomodar el tamaño
    window.addEventListener("resize", manejarResize);
    window.addEventListener("orientationchange", manejarResize);

  // ... (Aquí continúa tu código de imágenes y el bucleJuego) ...

```

📌 **Paso 3**: GUIAgmosle a `drawImage` y `fillRect` que usaremos estas medidas para cargar el fondo

```js
// 2. Fondo
if (fondoCargado) {
  // ⚡cambia para que drawImage y fillRect usen las variables que creamos, no las de canvas
  ctx.drawImage(imagenFondo, 0, 0, ANCHO_LOGICO, ALTO_LOGICO);
} else {
  // Si aún no carga, dejamos el fondo azul oscuro de respaldo
  ctx.fillStyle = "#001f3f";
  ctx.fillRect(0, 0, ANCHO_LOGICO, ALTO_LOGICO);
}
```

📌 **Paso 4**: 🎯 Vamos a programar el "radar táctil". En Canvas, los eventos del teclado no funcionan en celulares, así que usaremos un evento llamado `touchstart` (cuando un dedo toca la pantalla). Busca tu función `useEffect` y, justo debajo de donde agregaste el radar del teclado (`window.addEventListener("keydown", manejarTeclado);`), añade este nuevo detector para el celular:

```js
// 👇 ¡NUEVO: Radar Táctil para Celulares y Tablets! 👇
const manejarToqueMovil = (evento) => {
  // Evitamos que la pantalla se mueva bruscamente al tocarla
  evento.preventDefault();

  // Si el jugador NO está saltando, ¡le damos el impulso hacia arriba!
  if (!jugador.saltando) {
    jugador.velocidadY = -15; // El mismo impulso que usamos con el teclado
    jugador.saltando = true; // Le avisamos al juego que está flotando
  }
};

// Conectamos el radar táctil al lienzo de nuestro juego
canvas.addEventListener("touchstart", manejarToqueMovil, { passive: false });
```

📌 **Paso 5**: ¡Muy importante! Al final de tu `useEffect`, donde apagas los radares (en el `return () => { ... }`), debes apagar también tus nuevos radares de pantalla para que el celular no trabaje doble ni gaste batería de más:

```js
// 🧹 Limpieza de radares al salir del juego
  return () => {
    cancelAnimationFrame(animacionRef.current);
    window.removeEventListener("keydown", manejarTeclado);

    // 👇 Apagamos los radares del celular 👇
    window.removeEventListener("resize", manejarResize);
    window.removeEventListener("orientationchange", manejarResize);
    canvas.removeEventListener("touchstart", manejarToqueMovil);
  };
}, []);
```

🏆 ¡Felicidades, Desarrollador/a! Has implementado un sistema de escalado (Matriz de Proporción Fija). Tu juego ahora está listo para conquistar las pantallas de cualquier computadora y celular del mundo.

### 🎯 Es hora de los Retos 🔗 [Enlace Reto siete](RETO-GUIA-SIETE.md)

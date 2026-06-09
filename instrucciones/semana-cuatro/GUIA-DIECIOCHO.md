### 📑 Día 18: La Máquina de Estados (Menús del Juego)

**¡Bienvenidos al Día 18, goCoders!** Hasta ahora, tu juego inicia de golpe apenas abres el navegador: el jugador cae, la física corre y todo está activo de inmediato. En la industria profesional, los videojuegos usan un cerebro organizador llamado **Máquina de Estados**.

Hoy aprenderemos a estructurar la navegación de la interfaz de usuario. Crearemos una variable que controlará en qué "pantalla" o momento se encuentra nuestro software: el menú de inicio (`"MENU"`), la acción espacial (`"JUGANDO"`), la derrota (`"GAMEOVER"`) o la gloria eterna (`"VICTORIA"`). Este estado determinará dinámicamente cuándo el bucle gráfico (`Game Loop`) debe activarse o pausarse en segundo plano.

---

## 🧭 El Concepto Clave: Estados de un Software

Una máquina de estados es como un semáforo inteligente. Dependiendo de la luz encendida, el tráfico hace una cosa u otra. En nuestro código, definiremos una variable de texto que cambiará el comportamiento completo del lienzo (`Canvas`):

- **`"MENU"`**: El juego está pausado. Se muestra una hermosa pantalla de bienvenida con un botón para iniciar la misión.
- **`"JUGANDO"`**: El motor de física, la gravedad, los controles del teclado y el dibujo se activan a 60 FPS.
- **`"GAMEOVER"`**: (¡Preparado para mañana!) Detiene la acción y te da la opción de reintentar.
- **`"VICTORIA"`**: Reemplaza nuestra lógica flotante anterior por un estado integrado oficial de triunfo.

---

## 🛠️ Tu Turno: Manos a la Obra

Abramos nuestro archivo `src/components/MiJuego.jsx`. Vamos a implementar esta potente arquitectura sin tocar nada del pasado.

### Paso 1: Declarar el Estado Gobernador

Busca la sección superior de tu componente donde declaras tus estados con `useState` (cerca de `esPantallaCompleta`). Vamos a añadir nuestro selector de pantallas y, al mismo tiempo, modificaremos el estado de victoria que teníamos antes para que se integre perfectamente al nuevo sistema.

Reemplaza tu `const [juegoGanado, setJuegoGanado] = useState(false);` por estas dos líneas de control:

```javascript
// 🕹️ NUEVO DÍA 18: MÁQUINA DE ESTADOS GENERAL DEL JUEGO
// Los estados válidos serán: "MENU", "JUGANDO", "GAMEOVER", "VICTORIA"
const [estadoJuego, setEstadoJuego] = useState("MENU");
const estadoJuegoRef = useRef("MENU");

const cambiarEstadoJuego = (nuevoEstado) => {
  estadoJuegoRef.current = nuevoEstado;
  setEstadoJuego(nuevoEstado);
};
```

---

### Paso 2: Controlar el Bucle de Juego con el Estado Actual

Para evitar que el juego consuma recursos y se mueva solo mientras estamos en el menú, debemos enseñarle al `bucleJuego` cuándo operar.

Ve a tu `useEffect` donde reside el motor gráfico, ubica la primera línea dentro de la función interna `bucleJuego` e inyecta esta condición de seguridad:

```javascript
    const bucleJuego = () => {
      // 🕹️ NUEVO DÍA 18: PAUSAR FÍSICA SI NO ESTAMOS JUGANDO
      if (estadoJuegoRef.current !== "JUGANDO") {
        // Si no estamos jugando, solo seguimos solicitando el fotograma para que el canvas responda,
        // pero NO procesamos movimientos, ni colisiones, ni físicas de teclado.
        animacionRef.current = requestAnimationFrame(bucleJuego);
        return;
      }

      // ... (Aquí abajo continúa toda tu física intacta: gamer.vx, gravedad, colisiones, etc.)

```

---

### Paso 3: Conectar la Victoria a la Máquina de Estados

Busca la parte de tu código (dentro del sensor de la plataforma meta o banderas de llegada) donde declarabas la victoria. En lugar de cambiar un interruptor de verdadero o falso, ahora cambiaremos el estado del juego completo.

Ubica donde tenías `juegoGanadoRef.current = true; setJuegoGanado(true);` y actualízalo para que use nuestro nuevo gobernador:

```javascript
// 🏁 ¡Llegaste a la meta! (Modificado Día 18)
juegoGanadoRef.current = true;
cambiarEstadoJuego("VICTORIA");
```

_(Haz lo mismo dentro de tu función `reiniciarJuego`: cambia el antiguo `setJuegoGanado(false)` por `cambiarEstadoJuego("JUGANDO");` para que al reiniciar empiece la acción de inmediato)._

---

### Paso 4: Diseñar las Pantallas de la Interfaz (HTML/CSS)

Ahora iremos a la parte visual de nuestro componente: el bloque `return ( ... )`. Usaremos condicionales inteligentes de React para superponer menús profesionales sobre nuestro Canvas.
Justo después del Botón Maximizar dinámico, reemplaza con esta parte de la interfaz para envolver y condicionar las pantallas flotantes usando el valor de `estadoJuego`:

```jsx
return(
  <div>
    <div>
{/* ⛶ BOTÓN MAXIMIZAR DINÄMICO */}
{/*............................*/}

      {/* 🏠 INTERFAZ 1: MENÚ DE INICIO DE MISIÓN */}
        {estadoJuego === "MENU" && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center z-30 select-none p-4">
            <div className="text-center max-w-md animate-fade-in">
              <p className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-2">
                🚀 Sistema Listo para Despegue
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-md">
                PILOTA TU DESTINO
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal px-4">
                Usa las flechas del teclado o los botones táctiles para esquivar
                obstáculos cósmicos y recolectar cristales de energía.
              </p>
              <button
                onClick={() => cambiarEstadoJuego("JUGANDO")}
                className="mt-8 px-8 py-4 bg-linear-to-r from-orange-500 to-indigo-600 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto text-lg border border-orange-400/30"
              >
                INICIAR MISIÓN
              </button>
            </div>
          </div>
        )}

        {/* 🏆 INTERFAZ 2: PANTALLA FLOTANTE DE VICTORIA */}
        {estadoJuego === "VICTORIA" && (
          <div className="absolute inset-0 bg-slate-600/10 backdrop-blur-md flex flex-col items-center justify-center z-30 animate-fade-in select-none">
            <h2 className="text-4xl sm:text-6xl font-black text-yellow-400 tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-bounce">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-lg sm:text-xl mt-4 font-medium tracking-wide text-center px-4">
              Has conquistado los confines del espacio, goCoder.
            </p>
            <button
              onClick={reiniciarJuego}
              className="mt-8 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            >
              Volver a Jugar
            </button>
          </div>
        )}

        {/* 💀 INTERFAZ 3: PANTALLA DE GAME OVER (LÍNEA BASE PARA MAÑANA) */}
        {estadoJuego === "GAMEOVER" && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30 animate-fade-in select-none">
            <h2 className="text-4xl sm:text-6xl font-black text-red-500 tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              MISIÓN FALLIDA
            </h2>
            <p className="text-slate-300 text-lg mt-4 font-medium text-center px-4">
              Tu nave ha sufrido daños críticos en el espacio profundo.
            </p>
            <button
              onClick={reiniciarJuego}
              className="mt-8 px-6 py-3 bg-linear-to-r from-red-600 to-rose-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            >
              Reintentar Misión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default MiJuego;

```

---

## 🧪 ¡Prueba tu Sistema Arquitectónico!

1. Guarda tu código y refresca el navegador.
2. **¿Resultado esperado?** El juego ya no arrancará corriendo de fondo. Te recibirá un menú que puedes modificar sobre la pantalla oscura, esperando tus órdenes.
3. Haz clic en **INICIAR MISIÓN**. Verás cómo las compuertas se abren, el bucle despierta de su letargo y tu nave responde al teclado al instante.
4. Llega hasta el final del nivel. Al tocar la plataforma magenta, se activará limpiamente el estado `"VICTORIA"`, deteniendo la simulación cósmica y congelando los controles de manera profesional.

---

# 🎯 Reto Coder GoCoder del Día 18: Diseñador de Interfaces Cinematográficas

¡Impresionante! Has transformado tu prototipo en una aplicación interactiva estructurada como los grandes juegos comerciales.

### Tus tareas de hoy:

1. **Estilo Galáctico:** Personaliza el título de la pantalla de inicio (`"COSMO CODER"`). Elige un nombre espacial único para tu proyecto y cambia la descripción del texto descriptivo.
2. **Botón con Brillo Láser:** Modifica las clases de Tailwind de tu botón de inicio para que use los colores de tu preferencia (por ejemplo, de verde a amarillo, o magenta sólido) y haz que tenga una animación o tamaño diferente.

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy implementamos una compuerta de seguridad en la primera línea del `bucleJuego` diciendo `if (estadoJuego !== "JUGANDO") return;`.

- ¿Por qué hacer esto previene fallas de rendimiento en comparación con dejar que la física siga sumando velocidades e inercias de fondo de manera invisible mientras el jugador está leyendo el menú de inicio?

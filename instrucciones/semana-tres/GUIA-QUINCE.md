### 🚀 Día 15: La Meta Final y Pantalla de Victoria

**¡Felicidades por llegar al final de la Semana 3, Coders!** Hemos construido un universo con leyes físicas increíbles: nuestro héroe corre con inercia, la cámara lo sigue a través de un mundo gigante y los bloques son 100% sólidos.

Pero todo gran juego necesita una forma de ganar. Hasta ahora, nuestro mapa de `3000 píxeles` continúa eternamente. ¡Hoy vamos a colocar una Meta Galáctica al final de la pista y programaremos la lógica para que, en el instante en que tu jugador la toque, celebremos tu **VICTORIA** por todo lo alto!

Además, aplicaremos un secreto de optimización profesional: usaremos Pointer Events para que los botones táctiles de celular funcionen con total fluidez, sin trabas y sin que aparezcan menús molestos del sistema operativo.

### 🧭 El Concepto Clave: El Detector de Victoria Eficiente - Eventos Unificados (Pointer Events)
Para lograr que el nivel termine de manera exitosa sin ralentizar nuestro motor de juego (Game Loop), utilizaremos una técnica de ingenieros profesionales:
1. **La Referencia Física (`juegoGanadoRef`):** Evaluará a 60 fotogramas por segundo si estás tocando la meta y congelará el movimiento al instante. Como no altera el HTML directamente, mantiene el juego corriendo a máxima velocidad.
2. **El Estado Visual (`juegoGanado`):** En el milisegundo en que la referencia detecte el impacto, este interruptor se encenderá **una sola vez** para dar la orden a React de mostrar el cartel flotante de victoria.
3. Reinicio de Memoria Líquido: En lugar de recargar la página web entera (lo que hace que el celular se salga de la pantalla completa y se desacomode), crearemos una función limpiadora que regrese al jugador al inicio del mapa reseteando sus variables.
4. **Eventos de Puntero (Pointer Events):**
  * Hasta ahora, usábamos eventos separados para la computadora (onMouseDown) y el celular (onTouchStart). Esto a veces confunde al teléfono, haciendo que crea que dejamos el dedo pegado para copiar un texto o abrir menús ocultos de otras aplicaciones.
  * Reemplazaremos los eventos tradicionales de mouse y touch por los modernos *Pointer Events*. Un *Pointer* es cualquier cosa que apunte a la pantalla: un dedo, un mouse o un lápiz digital. Al usarlos, el navegador entiende perfectamente que interactuamos con un videojuego y bloquea las funciones automáticas del teléfono (como esos molestos menús de Google Drive o selección de texto).

---

```
👉 [Dedo]   ──┐
🖱️ [Mouse]  ──┼─► 🔘 [onPointerDown] ¡Un solo evento para controlarlos a todos!
🖋️ [Lápiz]  ──┘

```

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir nuestro archivo `src/components/MiJuego.jsx`.

### Paso 1: Crear el Sincronizador de Victoria y el Objeto Meta

Al inicio de tu componente `MiJuego`, justo debajo de donde declaraste `camaraX`, vamos a agregar el estado visual de victoria, su referencia de control físico y las coordenadas lógicas de nuestra meta espacial:

```javascript
  const ANCHO_MAPA_TOTAL = 3000; // ¡Tu mundo mide 3 veces más!
  const camaraX = useRef(0);
  
  // 👇 ¡NUEVOS AJUSTES DEL DÍA 15! 👇
  const [juegoGanado, setJuegoGanado] = useState(false); // Estado para activar la pantalla de victoria
  const juegoGanadoRef = useRef(false);                  // Referencia para congelar el motor físico
  
  const meta = useRef({
    x: 2850,       // Posicionada estratégicamente al final de la última plataforma
    y: 120,        // Flotando en el aire sobre la plataforma magenta
    ancho: 60,
    alto: 80,
    color: "#eab308" // Un brillante color dorado cósmico (amarillo metálico)
  });

```

---

### Paso 2: Programar la Detección de Victoria dentro del Motor Físico

Ahora bajemos al corazón de nuestro código: el `bucleJuego` dentro del `useEffect`. Necesitamos evaluar continuamente si las hitboxes del jugador e intersectan con la meta.

Busca la sección del `bucleJuego` justo **después** de cerrar el detector de colisiones avanzado de las plataformas (el `.forEach` de los obstáculos) y **antes** de limpiar el lienzo. Pega este detector allí:

```javascript
      // ... (Aquí termina el obstaculos.current.forEach del Día 14)
      });

      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: DETECTOR DE INTERSECCIÓN CON LA META
      ----------------------------------------------------*/
      const gamer = jugador.current; // Acceso directo a nuestro personaje

      const tocandoMeta =
        gamer.x + gamer.ancho > meta.current.x &&
        gamer.x < meta.current.x + meta.current.ancho &&
        gamer.y + gamer.alto > meta.current.y &&
        gamer.y < meta.current.y + meta.current.alto;

      // Si tocamos la meta y la referencia dice que aún no hemos ganado...
      if (tocandoMeta && !juegoGanadoRef.current) {
        juegoGanadoRef.current = true; // 1. Bloqueamos el motor físico de inmediato
        setJuegoGanado(true);          // 2. Le avisamos a React que dibuje la interfaz HTML
        gamer.vx = 0;                  // Frenamos en seco la velocidad horizontal
        gamer.velocidadY = 0;          // Frenamos la velocidad vertical
      }

      // 4. 🖌️ LIMPIAR EL LIENZO Y RENDERIZAR NUEVA ESCENA
      ctx.clearRect(0, 0, ALTO_LOGICO * (canvasRef.current.width / canvasRef.current.height), ALTO_LOGICO);

```

---

### Paso 3: Blindar las Dependencias y Crear la Función de Reinicio Líquido

Para asegurarnos de que nuestro juego sea ultraestable, iremos al final de tu `useEffect` (donde está el array de dependencias) y colocaremos una regla de excepción para ESLint. Justo debajo del efecto, programaremos la función `reiniciarJuego` que restablecerá el mundo directamente en memoria sin recargar la página (así **nunca perderás la pantalla completa al reiniciar el juego**):

```javascript
    // Iniciar el bucle de animación
    animacionRef.current = requestAnimationFrame(bucleJuego);

    return () => {
      cancelAnimationFrame(animacionRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🌟 Array vacío: el motor nace una sola vez y no se reinicia

  /* ----------------------------------------------------
  🔄 NUEVO DÍA 15: FUNCIÓN REINICIAR DIRECTO EN MEMORIA
  ----------------------------------------------------*/
   const reiniciarJuego = () => {
    // 1. Regresamos al jugador a su posición inicial de forma instantánea
    jugador.current.x = 100;
    jugador.current.y = 250;
    jugador.current.vx = 0;
    jugador.current.velocidadY = 0;
    jugador.current.saltando = false;

    // 2. Apagamos los interruptores de victoria
    juegoGanadoRef.current = false;
    setJuegoGanado(false);
    // Si quieres, también puedes reestablecer meta y obstaculos si cambia algo
  };

```

---

### Paso 4: Dibujar la Meta Espacial en el Lienzo

¡Matemáticamente el juego ya sabe cuándo ganas! Ahora hagamos que el portal dorado sea visible. Usaremos el mismo truco cinematográfico de la cámara restando `camaraX.current` para que se mueva con el entorno.

Busca la sección donde se dibujan las plataformas en pantalla (`obstaculos.current.forEach`) y, justo debajo de ese bloque, añade el renderizado de la meta:

```javascript
      /* ----------------------------------------------------
      🧱 Dibujar la Lista de Obstáculos / Plataformas
      ----------------------------------------------------*/
      obstaculos.current.forEach((bloque) => {
        // ... (Tu código actual de dibujo de bloques)
      });

      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: RENDERIZAR LA META EN EL CANVAS
      ----------------------------------------------------*/
      const metaEnPantallaX = meta.current.x - camaraX.current;
      
      // Dibujamos la estructura base dorada de la meta
      ctx.fillStyle = meta.current.color;
      ctx.fillRect(metaEnPantallaX, meta.current.y, meta.current.ancho, meta.current.alto);
      
      // Le agregamos un núcleo brillante de energía blanca en el centro
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(metaEnPantallaX + 15, meta.current.y + 10, meta.current.ancho - 30, meta.current.alto - 20);

```

---

### Paso 5: Blindar la Botonera Táctil con Pointer Events 🛡️

Llegó el momento de reescribir nuestros controles móviles en el HTML. Cambiaremos los viejos eventos táctiles y de mouse por los unificados **Pointer Events**, y agregaremos `onContextMenu` para neutralizar por completo las ventanas emergentes del sistema operativo.

Busca tu sección de botones táctiles en el HTML y actualízala para que quede protegida así:

```javascript
         {/* 🎮 CONTROLADORES TÁCTILES UNIFICADOS (POINTER EVENTS): Flotando con precisión quirúrgica sobre el Canvas */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-between items-end px-6 w-full pointer-events-none">
          {/* Bloque Izquierdo: Controles de Dirección */}
          <div className="flex gap-8 pointer-events-auto">
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = true;
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
                jugador.current.moviendoIzquierda = false;
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowLeft />
            </button>
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = true;
              }}
              onPointerUp={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
                jugador.current.moviendoDerecha = false;
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Bloque Derecho: Botón de Salto Autónomo */}
          <div className="pointer-events-auto">
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                if (!jugador.current.saltando) {
                  jugador.current.velocidadY = -15;
                  jugador.current.saltando = true;
                }
              }}
              onPointerUp={(e) => {
                e.preventDefault();
              }}
              onPointerLeave={(e) => {
                e.preventDefault();
              }}
              onPointerCancel={(e) => {
                e.preventDefault();
              }}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-blue-800/30 text-white active:bg-orange-500 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center select-none shadow-lg shadow-black/40 touch-none backdrop-blur-xs"
            >
              <ArrowUp />
            </button>
          </div>
        </div>

```

---

### Paso 6: Vincular la Pantalla Flotante de Victoria

Por último, ve al final de tu bloque de HTML. Justo debajo del botón de maximizar pantalla completa, añade este contenedor condicional que se activará cuando `juegoGanado` sea `true`, enlazando el botón a nuestra función `reiniciarJuego`:

```javascript
        {/* ⛶ BOTÓN MAXIMIZAR DINÁMICO */}
        <button onClick={() => activarPantallaCompleta(contenedorRef.current)} ... >
          { /* ... */ }
        </button>

        {/* 🏆 NUEVO DÍA 15: PANTALLA FLOTANTE DE VICTORIA 🏆 */}
        {juegoGanado && (
          <div className="absolute inset-0 bg-slate-600/10 backdrop-blur-md flex flex-col items-center justify-center z-30 animate-fade-in select-none">
            <h2 className="text-4xl sm:text-6xl font-black text-yellow-400 tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-bounce">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-lg sm:text-xl mt-4 font-medium tracking-wide text-center px-4">
              Has conquistado los confines del espacio, goCoder.
            </p>
            <button
              onClick={reiniciarJuego} // 🔄 Reinicio líquido sin perder la pantalla completa
              className="mt-8 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            >
              Volver a Jugar
            </button>
          </div>
        )}

```

---

## 🧪 ¡Prueba de Vuelo Definitiva!

1. Guarda tu código en Visual Studio Code y ábrelo en tu teléfono móvil o navegador.
2. Presiona repetidamente y mantén presionados los botones táctiles en la pantalla. **¡Resultado esperado!** Las ventanas molestas de Google Drive y las selecciones azules de texto han desaparecido por completo. Los botones se sienten firmes y fluidos.
3. Avanza saltando los obstáculos hacia la derecha hasta llegar al final del mapa.
4. Al tocar el portal dorado flotante, la pantalla se atenuará y aparecerá el gran cartel: **¡MISIÓN CUMPLIDA!** interrumpiendo las físicas.
5. Presiona el botón **"Volver a Jugar"**. **¡Resultado esperado!** Tu personaje volverá al inicio del mapa instantáneamente y el juego comenzará de nuevo **sin salirse de la pantalla completa** y sin desacomodarse. ¡Un trabajo impecable!

---

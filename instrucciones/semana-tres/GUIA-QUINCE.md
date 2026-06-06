
---

# 🚀 Día 15: La Meta Final y Pantalla de Victoria

¡Felicidades por llegar al final de esta, Coders! Hemos construido un motor físico espectacular: nuestro héroe corre con inercia, la cámara lo sigue a través de un mundo gigante y los bloques son 100% sólidos.

Pero todo gran juego necesita una forma de ganar. Hasta ahora, nuestro mapa de 3000 píxeles continúa eternamente. Hoy vamos a colocar un **objeto especial al final del mapa** (un portal espacial o bandera) y programaremos la lógica matemática para que, en el instante en que tu jugador lo toque, el juego reconozca tu **VICTORIA**.

---

## 🧭 El Concepto Clave: El detector de victoria

Para lograr que el nivel termine, necesitamos hacer dos cosas:

1. **Dibujar la Meta en el mundo:** Crearemos un objeto lógico en una coordenada muy lejana en el eje X (cerca del final del mapa, a los `X = 2850` píxeles).
2. **Medir la distancia (Colisión de Meta):** Usaremos una versión simplificada de nuestro algoritmo AABB. En cada fotograma, el juego revisará: *¿La caja del jugador se está cruzando con la caja de la meta?* Si la respuesta es **SÍ**, activaremos un interruptor mágico de victoria.

```
 [ Jugador ] 🏃💨                      🏁 [ ¡Meta! X: 2850 ]

```

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir nuestro archivo `src/components/MiJuego.jsx` para consolidar el final de nuestro nivel.

### Paso 1: Crear el Estado de Victoria y el objeto Meta

Al inicio de tu componente `MiJuego`, justo donde definimos las dimensiones lógicas y las referencias (`useRef`), vamos a agregar el interruptor de estado para saber si ganamos, y las coordenadas de nuestra meta.

Busca la línea donde declaraste `camaraX` y agrega lo siguiente justo abajo:

```javascript
  const ANCHO_MAPA_TOTAL = 3000; // ✨ ¡Tu mundo mide 3 veces más!
  const camaraX = useRef(0);
  
  // 👇 ¡NUEVOS AJUSTES DEL DÍA 15! 👇
  const [juegoGanado, setJuegoGanado] = useState(false); // Guarda si ganamos el juego
  const meta = useRef({
    x: 2800,       // Colocada estratégicamente al final del mapa
    y: 120,        // Flotando sobre la última plataforma morada/magenta
    ancho: 60,
    alto: 80,
    color: "#eab308" // Un brillante color dorado metálico
  });

```

---

### Paso 2: Programar la colisión de la victoria

Ahora bajemos al corazón de nuestro motor físico: el `bucleJuego` dentro del `useEffect`. Vamos a pedirle al juego que verifique constantemente si tocamos la meta.

Busca la sección del `bucleJuego` justo **después** de cerrar el detector de colisiones avanzado de los bloques (el `.forEach` de los obstáculos) y **antes** del dibujo del fondo. Pega este detector ahí:

```javascript
      // 3. 🛑 Límite del suelo base (Por si se cae de todas las plataformas al vacío)
      if (gamer.y >= ALTO_LOGICO - gamer.alto) {
        gamer.y = ALTO_LOGICO - gamer.alto;
        gamer.velocidadY = 0;
        gamer.saltando = false;
      }

      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: VERIFICAR SI TOCAMOS LA META
      ----------------------------------------------------*/
      const tocandoMeta =
        gamer.x + gamer.ancho > meta.current.x &&
        gamer.x < meta.current.x + meta.current.ancho &&
        gamer.y + gamer.alto > meta.current.y &&
        gamer.y < meta.current.y + meta.current.alto;

      if (tocandoMeta && !juegoGanado) {
        setJuegoGanado(true); // 🌟 ¡Activamos la victoria en React!
        gamer.vx = 0;         // Frenamos al jugador para celebrar
        gamer.velocidadY = 0;
      }

```

---

### Paso 3: Dibujar la Meta en el Canvas

¡Excelente! El juego ya sabe matemáticamente cuándo ganamos, pero la meta aún es invisible para el jugador. Vamos a dibujarla aplicando el mismo truco cinematográfico de la cámara que usamos con las plataformas.

Busca la sección donde se dibujan las plataformas en pantalla (`obstaculos.current.forEach`) y, justo debajo de ese bloque, añade el renderizado de la meta:

```javascript
      /* ----------------------------------------------------
      🧱 Dibujar la Lista de Obstáculos / Plataformas
      ----------------------------------------------------*/
      obstaculos.current.forEach((bloque) => {
        // ... (Tu código actual de dibujo de bloques se mantiene intacto)
      });

      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: Dibujar la Meta Espacial
      ----------------------------------------------------*/
      const metaEnPantallaX = meta.current.x - camaraX.current;
      
      // Dibujamos la estructura dorada de la meta
      ctx.fillStyle = meta.current.color;
      ctx.fillRect(metaEnPantallaX, meta.current.y, meta.current.ancho, meta.current.alto);
      
      // Le hacemos un decorado brillante (Luz interior blanca)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(metaEnPantamberX + 15, meta.current.y + 10, meta.current.ancho - 30, meta.current.alto - 20);

```

---

### Paso 4: Mostrar el cartel de "¡VICTORIA!" en pantalla

Para cerrar con broche de oro, si el estado `juegoGanado` se vuelve verdadero (`true`), congelaremos el control visual y mostraremos un espectacular mensaje flotante usando Tailwind CSS para anunciar el triunfo.

Ve al final del archivo, en la sección del **RENDERIZADO HTML** (`return ( ... )`). Justo debajo del botón de maximizar pantalla completa, añade este contenedor condicional:

```javascript
        {/* ⛶ BOTÓN MAXIMIZAR DINÄMICO */}
        <button onClick={() => activarPantallaCompleta(contenedorRef.current)} ... >
          { /* ... */ }
        </button>

        {/* 🏆 NUEVO DÍA 15: PANTALLA FLOTANTE DE VICTORIA 🏆 */}
        {juegoGanado && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-30 animate-fade-in">
            <h2 className="text-4xl sm:text-6xl font-black text-yellow-400 tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-bounce">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-lg sm:text-xl mt-4 font-medium tracking-wide">
              Has conquistado los confines del espacio goCoder.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-8 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            >
              Jugar de Nuevo
            </button>
          </div>
        )}

```

---

## 🧪 ¡Prueba de Vuelo Definitiva!

1. Guarda tu código y ve a tu navegador.
2. Avanza saltando con cuidado a través de las plataformas flotantes hacia la derecha.
3. Al llegar a la zona de la última plataforma morada/magenta, verás un gran portal brillante de color dorado.
4. **¡Resultado esperado!** Al saltar y tocar el portal, la pantalla se oscurecerá suavemente y aparecerá el gran cartel interactivo: **¡MISIÓN CUMPLIDA!** indicando que el nivel se ha superado con éxito total.

---

## 🎯 RETO DEL DÍA: La Meta de Alta Dificultad

¡Has completado la Capa 3 del mundo! Ahora abre el archivo de desafíos de hoy para ajustar tu diseño de niveles a un nivel legendario:

🔗 [Enlace Reto Quince](https://www.google.com/search?q=RETO-GUIA-QUINCE.md)

---
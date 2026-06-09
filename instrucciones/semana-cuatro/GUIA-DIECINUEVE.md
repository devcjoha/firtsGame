### 📑 Día 19: Sistema de Daño, Vidas y Efectos Especiales

¡Bienvenidos al **Día 19, goCoders**! Ayer construimos el cerebro del juego: nuestra **Máquina de Estados**. Logramos que el software supiera exactamente cuándo mostrar el menú de inicio, cuándo activar la acción espacial y cuándo congelarse en la gloria de la victoria.

Hoy añadiremos el ingrediente definitivo que convierte un paseo espacial en un verdadero desafío de supervivencia: **¡El sistema de daño y vidas!** Programaremos un contador de 3 vidas, crearemos un obstáculo peligroso en nuestro mapa y diseñaremos un efecto visual de parpadeo (inmunidad temporal) para que nuestro piloto sepa que ha sufrido un impacto crítico. Si el contador llega a cero, activaremos limpiamente el estado `"GAMEOVER"` que dejamos preparado ayer.

---

## 🧭 El Concepto Clave: Inmunidad Temporal y Ciclos de Daño

En el desarrollo de videojuegos profesionales, cuando un personaje recibe daño, no puede perder todas las vidas en un solo milisegundo por culpa del motor físico que corre a 60 FPS. Necesitamos crear un **estado de inmunidad temporal** (un breve respiro).

Para lograrlo de manera limpia y eficiente dentro de nuestro lienzo dinámico, usaremos:

* **Un contador de vidas:** Controlado por una referencia en memoria para que la física responda al instante.
* **Un temporizador de invulnerabilidad:** Un reloj de cuenta regresiva. Mientras este reloj esté activo, las colisiones dañinas se ignoran.
* **Un efecto de parpadeo cosmético:** Usaremos el operador matemático del residuo o módulo (`%`) aplicado al tiempo para hacer que el sprite de la nave aparezca y desaparezca rápidamente, avisándole al jugador que está a salvo por unos segundos.

---

## 🛠️ Tu Turno: Manos a la Obra

Abramos nuestro archivo `src/components/MiJuego.jsx`. Vamos a evolucionar nuestra arquitectura física y visual.

### Paso 1: Declarar el Sistema de Supervivencia

Busca la sección superior de tu componente donde declaras las referencias físicas (cerca de `puntosRef`). Añadiremos las variables encargadas de medir la salud de nuestra nave y su tiempo de recuperación.

Agrega estas tres líneas justo debajo de tu `puntosRef`:

```javascript
  // 💀 NUEVO DÍA 19: CONTROL DE VIDAS E INMUNIDAD
  const vidasRef = useRef(3);
  const invulnerableRef = useRef(false);
  const tiempoInvulnerableRef = useRef(0); // Contador en fotogramas o milisegundos

```

---

### Paso 2: Cargar el Sprite de los Obstáculos Dañinos

Para que los niños identifiquen el peligro visualmente, cargaremos una textura espacial especial (como espinas de metal o plasma radiactivo).

Busca el lugar dentro de tu `useEffect` donde se cargan los sprites (debajo de `imagenObjetoBonus.src`) y añade la carga de este nuevo recurso:

```javascript
    // 💀 4. Sprite para los Obstáculos de Daño (Espinas/Peligro)
    const imagenPeligro = new Image();
    imagenPeligro.src = "./src/assets/plataformas/metal-espinas.png"; // Asegúrate de tener este asset o uno similar
    let peligroSpriteCargado = false;
    imagenPeligro.onload = () => {
      peligroSpriteCargado = true;
    };

```

---

### Paso 3: Identificar un Obstáculo como "Dañino"

Vamos a transformar uno o más obstáculos de nuestro mapa para que dejen de ser plataformas seguras y se conviertan en trampas letales.

Busca tu array `obstaculos.current` en la parte superior y añade la propiedad `tipo: "danino"` al obstáculo que prefieras. Por ejemplo, transformemos la plataforma 3:

```javascript
  const obstaculos = useRef([
    { x: 600, y: 300, ancho: 150, alto: 40, color: rojo },
    { x: 1000, y: 320, ancho: 200, alto: 30, color: verde },
    { x: 1500, y: 250, ancho: 120, alto: 30, color: rojo, tipo: "danino" }, // ✨ MODIFICADO DÍA 19: ¡Trampa de espinas!
    { x: 2000, y: 350, ancho: 180, alto: 30, color: violeta },
    { x: 2500, y: 200, ancho: 250, alto: 30, color: magenta },
  ]);

```

---

### Paso 4: Actualizar el Reloj de Inmunidad y Detectar el Impacto

Ahora iremos al corazón del motor gráfico dentro de tu `bucleJuego`. Debemos hacer dos cosas: restar tiempo a la inmunidad si está activa y, si no lo está, restarle una vida al jugador al tocar una superficie peligrosa.

Coloca este bloque de lógica justo al inicio de la sección donde procesas las colisiones con los obstáculos (`obstaculos.current.forEach((bloque) => { ... })`):

```javascript
      // 💀 NUEVO DÍA 19: REFRESCAR CRONÓMETRO DE INMUNIDAD
      if (invulnerableRef.current) {
        tiempoInvulnerableRef.current -= 1; // Restamos 1 fotograma por ciclo
        if (tiempoInvulnerableRef.current <= 0) {
          invulnerableRef.current = false; // Se acabó el tiempo de seguridad
        }
      }

      // ... (Dentro del bucle de obstáculos, localiza la condición de choque)
      if (chocando) {
        // 🔥 NUEVA COMPROBACIÓN DÍA 19: ¿ES UN OBSTÁCULO DAÑINO?
        if (bloque.tipo === "danino") {
          if (!invulnerableRef.current) {
            // 1. Quitar una vida de forma inmediata
            vidasRef.current -= 1;
            
            // 2. Activar protocolo de invulnerabilidad (60 fotogramas = 1 segundo de inmunidad)
            invulnerableRef.current = true;
            tiempoInvulnerableRef.current = 60;

            // 3. Teletransportar al jugador al inicio o hacerlo rebotar
            gamer.x = 100;
            gamer.y = 250;
            gamer.vx = 0;
            gamer.velocidadY = 0;

            // 4. ¿Se acabaron las vidas? ¡Game Over!
            if (vidasRef.current <= 0) {
              cambiarEstadoJuego("GAMEOVER");
            }
          }
          return; // Saltamos el resto del cálculo físico para este bloque
        }

        // ... (Aquí continúa intacto el cálculo de traslapes y colisiones normales CASO A, B, C, D)

```

---

### Paso 5: Dibujar el Obstáculo Peligroso y el Efecto Parpadeo

Para que el jugador experimente el efecto especial de parpadeo, modificaremos el renderizado de la nave. Si el jugador es invulnerable, solo lo dibujaremos en fotogramas alternos.

**A) Renderizar la trampa con su propia textura:**
Busca donde dibujas los obstáculos y haz que use la nueva textura si es de tipo dañino:

```javascript
      /* 🧱 ACTUALIZADO DÍA 19: Dibujar Plataformas y Trampas */
      obstaculos.current.forEach((bloque) => {
        const bloqueEnPantallaX = bloque.x - camaraX.current;

        if (bloque.tipo === "danino" && peligroSpriteCargado) {
          ctx.drawImage(imagenPeligro, bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        } else if (plataformaSpriteCargado) {
          ctx.drawImage(imagenPlataforma, bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        } else {
          ctx.fillStyle = bloque.color;
          ctx.fillRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        }
        // ... (Tu borde decorativo sutil strokeRect se mantiene)

```

**B) Renderizar el parpadeo de la nave:**
Ubica la sección al final del bucle donde dibujas al jugador (`ctx.drawImage(imagenJugador, ... )`) y envuélvelo en esta condición de parpadeo matemático:

```javascript
      /* 🚀 ACTUALIZADO DÍA 19: Dibujar Jugador con Efecto de Parpadeo cosmético */
      const jugadorEnPantallaX = gamer.x - camaraX.current;

      // Usamos el residuo del tiempo transcurrido para dibujar al jugador intercaladamente
      // Si es invulnerable, solo se dibuja la mitad de los fotogramas (Efecto fantasma de daño)
      let debeDibujarJugador = true;
      if (invulnerableRef.current && Math.floor(tiempoInvulnerableRef.current / 4) % 2 === 0) {
        debeDibujarJugador = false;
      }

      if (debeDibujarJugador) {
        if (jugadorSpriteCargado) {
          ctx.drawImage(imagenJugador, jugadorEnPantallaX, gamer.y, gamer.ancho, gamer.alto);
        } else {
          ctx.fillStyle = gamer.color;
          ctx.fillRect(jugadorEnPantallaX, gamer.y, gamer.ancho, gamer.alto);
        }
      }

```

---

### Paso 6: Dibujar el Marcador de Vidas en Pantalla

No podemos dejar a nuestro astronauta a ciegas. Imprimiremos corazones o un contador de vidas al lado de la puntuación acumulada.

Busca donde dibujas el texto de los puntos (`ctx.fillText("💎 " + puntosRef.current, 50, 50);`) y añade la visualización de la salud:

```javascript
      /* 📊 MODIFICADO DÍA 19: Interfaz de Estadísticas en Tiempo Real */
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("💎 " + puntosRef.current, 50, 50);
      
      // Dibujamos las vidas restantes usando íconos de corazones texturizados
      const corazones = "❤️".repeat(vidasRef.current);
      ctx.fillText(corazones || "💀", 50, 80);

```

---

### Paso 7: Sincronizar el Reinicio del Juego

Por último, debemos asegurar que cuando el jugador presione "Reintentar Misión" en la pantalla de Game Over o "Volver a Jugar" en la de Victoria, sus 3 vidas se restauren por completo y la inmunidad se limpie de la memoria.

Busca tu función externa `reiniciarJuego` y añade la restauración de las vidas:

```javascript
  const reiniciarJuego = () => {
    // ... (Posiciones iniciales del jugador y reseteo de cristales coleccionables intactos)
    
    // 💀 NUEVO DÍA 19: RESTAURAR PARÁMETROS DE SALUD
    vidasRef.current = 3;
    invulnerableRef.current = false;
    tiempoInvulnerableRef.current = 0;

    // 2. Apagamos los interruptores de victoria y encendemos el motor
    juegoGanadoRef.current = false;
    cambiarEstadoJuego("JUGANDO");
  };

```

---

## 🧪 ¡Prueba tu Sistema de Daño!

1. Guarda los cambios de tu componente y abre tu navegador.
2. Inicia la misión. Avanza con destreza por el espacio hasta encontrar la plataforma de peligro designada.
3. **¿Resultado esperado?** Al tocarla, tu nave debe regresar inmediatamente al puerto de salida, el marcador de corazones bajará a `❤️❤️` y verás a tu personaje parpadear de forma espectacular durante un segundo completo.
4. Intenta tocar el obstáculo dañino repetidamente. Al perder el tercer corazón, el juego debe detenerse en seco por completo y desplegar limpiamente la pantalla roja de **MISIÓN FALLIDA**.
5. Presiona **Reintentar Misión** y comprueba cómo el universo entero se regenera con tus 3 vidas intactas.

---

# 🎯 Reto Coder GoCoder del Día 19: Diseñador de Trampas Impredecibles

¡Absolutamente espectacular! Tu software ha dejado de ser un simple Canvas interactivo para convertirse en una mecánica jugable robusta y competitiva.

### Tus tareas de hoy:

1. **Campos de Minas Espaciales:** Modifica las dimensiones o posiciones de tu plataforma dañina para colocarla en un punto estratégico que obligue al jugador a calcular milimétricamente el ángulo de su salto.
2. **Personalización del Indicador:** Si no quieres usar corazones tradicionales, cambia el string de texto `"❤️"` por un indicador de escudo tecnológico como `"🛡️"` o barras de energía dinámicas (`"⚡⚡⚡"`).

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy programamos un interruptor lógico de seguridad diciendo `if (!invulnerableRef.current) { ... }`.

* ¿Qué desastre de rendimiento y de juego ocurriría si elimináramos esa línea y dejáramos que el motor físico restara vidas de forma directa en cada fotograma continuo mientras el jugador roza el obstáculo dañino?
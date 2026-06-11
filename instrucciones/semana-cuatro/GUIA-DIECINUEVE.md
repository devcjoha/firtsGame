### 📑 Día 19: Sistema de Daño, Vidas y Efectos Especiales

¡Bienvenidos al **Día 19, goCoders**! Ayer construimos el cerebro organizador del software: nuestra **Máquina de Estados**. Logramos que tu juego supiera exactamente cuándo mostrar el menú de inicio, cuándo activar la acción espacial y cuándo congelarse en la gloria de la victoria.

Hoy añadiremos el ingrediente definitivo que convierte un paseo espacial en un verdadero desafío de supervivencia: **¡El sistema de daño y vidas!** Programaremos un contador de 3 vidas, identificaremos una trampa peligrosa en nuestro mapa y diseñaremos un efecto visual de parpadeo (inmunidad temporal) para que nuestro piloto sepa que ha sufrido un impacto crítico. Si el contador llega a cero, activaremos limpiamente la pantalla de **MISIÓN FALLIDA** (`"GAMEOVER"`) que dejamos preparada ayer.

---

## 🧭 El Concepto Clave: Inmunidad Temporal y Ciclos de Daño

En el desarrollo de videojuegos profesionales, cuando un personaje recibe daño, no puede perder todas las vidas en un solo milisegundo por culpa del motor físico que corre a 60 FPS. Necesitamos crear un **estado de inmunidad temporal** (un breve respiro).

Para lograrlo de manera limpia y sin alterar la estructura que ya construiste, usaremos:

* **Un contador de vidas:** Controlado por una referencia en memoria (`useRef`) para que responda instantáneamente al chocar.
* **Un temporizador de invulnerabilidad:** Un reloj de cuenta regresiva. Mientras este reloj esté activo, las colisiones dañinas se ignoran.
* **Un efecto de parpadeo cosmético:** Usaremos una operación matemática sobre el tiempo restante para hacer que la nave aparezca y desaparezca rápidamente, avisando al jugador que está a salvo por unos segundos.

---

## 🛠️ Tu Turno: Manos a la Obra

Abramos nuestro archivo `src/components/MiJuego.jsx`. Vamos a evolucionar nuestra arquitectura física y visual paso a paso, buscando las líneas exactas de los días anteriores.

### Paso 1: Declarar el Sistema de Supervivencia

Busca en la parte superior de tu componente (justo debajo de donde declaras `puntosRef`) las variables de estado anteriores. Añadiremos las referencias encargadas de medir la salud de la nave y su tiempo de recuperación.

**Ubica este bloque en tu archivo:**

```javascript
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);
  const contenedorRef = useRef(null);
  const puntosRef = useRef(0);

```

**E inyecta estas tres líneas inmediatamente abajo:**

```javascript
  // 💀 NUEVO DÍA 19: CONTROL DE VIDAS E INMUNIDAD
  const vidasRef = useRef(3);
  const invulnerableRef = useRef(false);
  const tiempoInvulnerableRef = useRef(0); // Contador en fotogramas o milisegundos

```

---

### Paso 2: Crear el Asset para los Obstáculos Dañinos

Para que los jugadores identifiquen el peligro visualmente, cargaremos una textura espacial especial (como espinas de metal o plasma radiactivo).

Ve dentro de tu `useEffect` principal y busca el lugar exacto donde se cargan los sprites de los coleccionables (`imagenObjeto.src`).

**Ubica estas líneas en tu código:**

```javascript
    let objetoSpriteCargado = false;
    imagenObjeto.onload = () => {
      objetoSpriteCargado = true;
    };

```

**E inserta la carga de la textura de peligro justo debajo:**

```javascript
    // 💀 4. Sprite para los Obstáculos de Daño (Espinas/Peligro)
    const imagenPeligro = new Image();
    imagenPeligro.src = "./src/assets/obstaculos/pinchos-3.png"; 
    let peligroSpriteCargado = false;
    imagenPeligro.onload = () => {
      peligroSpriteCargado = true;
    };

```

---

### Paso 3: Configurar una Plataforma como "Dañina"

Vamos a transformar uno de los obstáculos de nuestro mapa para que deje de ser una plataforma segura y se convierta en una trampa letal.

**Busca el array de objetos `obstaculos` en la parte superior de tu archivo:**

```javascript
  const obstaculos = useRef([
    { x: 600, y: 300, ancho: 150, alto: 40, color: rojo }, // Plataforma 1 (Roja)
    { x: 1000, y: 320, ancho: 200, alto: 30, color: verde }, // Plataforma 2 (Verde)
    { x: 1500, y: 390, ancho: 120, alto: 30, color: rojo }, // Plataforma 3
    { x: 2000, y: 350, ancho: 180, alto: 30, color: violeta }, // Plataforma 4 (Morada)
    { x: 2500, y: 200, ancho: 250, alto: 30, color: magenta }, // ¡La plataforma final!
  ]);

```

**Modifica la Plataforma 3 (la que está en `x: 1500`) agregándole la propiedad `tipo: "danino"`:**

```javascript
    { x: 1500, y: 390, ancho: 120, alto: 30, color: rojo, tipo: "danino" }, // ✨ MODIFICADO DÍA 19: ¡Trampa de espinas!

```

---

### Paso 4: Actualizar el Reloj de Inmunidad y Detectar el Impacto

Ahora iremos al corazón matemático de tu juego: el `bucleJuego`. Debemos hacer que el cronómetro reste tiempo a la inmunidad si está activa y, en el detector de choques, restarle una vida si tocamos el tipo "danino".

**Busca la sección dentro del `bucleJuego` que procesa los obstáculos:**

```javascript
      // **** 🧱 DETECTOR DE COLISIONES AVANZADO (Sistema de Posiciones Previas)*****/

      obstaculos.current.forEach((bloque) => {
        // Comprobamos la colisión general (¿Se están cruzando sus cajas de límite?)
        const chocando =
          gamer.x + gamer.ancho > bloque.x &&
          gamer.x < bloque.x + bloque.ancho &&
          gamer.y + gamer.alto > bloque.y &&
          gamer.y < bloque.y + bloque.alto;

```

**E inyecta la reducción del cronómetro y la nueva condición de daño justo así:**

```javascript
        // 💀 NUEVO DÍA 19: REFRESCAR CRONÓMETRO DE INMUNIDAD
        if (invulnerableRef.current) {
          tiempoInvulnerableRef.current -= 1; // Restamos 1 fotograma por ciclo
          if (tiempoInvulnerableRef.current <= 0) {
            invulnerableRef.current = false; // Se acabó el tiempo de seguridad
          }
        }

        if (chocando) {
          // Calculamos cuánto se metió el jugador dentro del bloque en cada eje (Traslapes)
          const traslapeX = Math.min(
            gamer.x + gamer.ancho - bloque.x,
            bloque.x + bloque.ancho - gamer.x,
          );
          const traslapeY = Math.min(
            gamer.y + gamer.alto - bloque.y,
            bloque.y + bloque.alto - gamer.y,
          );

          // 🕒 POSICIONES PREVIAS: Calculamos dónde estaba el jugador en el fotograma anterior
          const prevX = gamer.x - gamer.vx;
          const prevY = gamer.y - gamer.velocidadY;
          const EPS = 4; // Margen de tolerancia física en píxeles (Evita fallos en esquinas)

          // 🔥 NUEVA COMPROBACIÓN DÍA 19: ¿ES UN OBSTÁCULO DAÑINO?
          if (bloque.tipo === "danino") {
            if (!invulnerableRef.current) {
              // 1. Quitar una vida de forma inmediata
              vidasRef.current -= 1;

              // 2. Activar protocolo de invulnerabilidad (60 fotogramas = 1 segundo de inmunidad)
              invulnerableRef.current = true;
              tiempoInvulnerableRef.current = 60;

              // 3. Teletransportar al jugador de vuelta a una zona segura de salida
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

          // CASO A) Si en el pasado sus pies estaban arriba del techo: ¡Aterrizaje!
          // ... (Todo el resto de tus casos A, B, C y D continúan exactamente iguales abajo)

```

---

### Paso 5: Dibujar el Obstáculo Peligroso y el Efecto Parpadeo

Para que tus alumnos experimenten la emoción visual del daño, modificaremos el renderizado en dos áreas clave del motor gráfico.

**A) Renderizar la trampa en el lienzo:**
Busca la sección inferior del `bucleJuego` donde dibujas los rectángulos de tus obstáculos (`obstaculos.current.forEach((bloque) => { ... })`).

**Modifica el bloque para que discrimine si es dañino e inyecte la textura cargada:**

```javascript
      /* ----------------------------------------------------
      🧱 ACTUALIZADO DÍA 19: Dibujar Plataformas con Sprites
      ----------------------------------------------------*/
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

        if (bloque.tipo !== "danino") {
          // El borde decorativo sutil solo se aplica a plataformas normales
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 2;
          ctx.strokeRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        }
      });

```

**B) Renderizar el efecto parpadeo de la nave:**
Ubica la sección final del `bucleJuego` donde se dibuja al jugador (`ctx.drawImage(imagenJugador, ... )`).

**Reemplaza el dibujo simple por esta condición matemática intermitente:**

```javascript
      /* ----------------------------------------------------
       🚀🚀 ACTUALIZADO DÍA 19: Dibujar Jugador con Efecto de Parpadeo cosmético
      ----------------------------------------------------*/
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

### Paso 6: Dibujar el Marcador de Vidas en la Pantalla

Para que el piloto sepa en todo momento cuánta salud le queda, imprimiremos corazones espaciales al lado del puntaje de cristales.

**Busca las líneas donde imprimes el texto de los puntos (`💎`):**

```javascript
      /* ----------------------------------------------------
       👇 Texto
      ----------------------------------------------------*/
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("💎 " + puntosRef.current, 50, 50);

```

**E inyecta la visualización de la salud inmediatamente abajo:**

```javascript
      // Dibujamos las vidas restantes usando íconos de corazones texturizados
      const corazones = "❤️".repeat(vidasRef.current);
      ctx.fillText(corazones || "💀", 50, 80);

```

---

### Paso 7: Sincronizar el Reinicio Completo

Por último, debemos asegurar que cuando el jugador haga clic en "Reintentar Misión" o "Volver a Jugar", sus 3 vidas se restauren por completo y la inmunidad se limpie de la memoria física.

**Busca la función externa `reiniciarJuego` al final de tu lógica de JavaScript:**

```javascript
  const reiniciarJuego = () => {
    jugador.current.x = 100;
    jugador.current.y = 250;
    jugador.current.vx = 0;
    jugador.current.velocidadY = 0;
    jugador.current.saltando = false;
    jugador.current.y = ALTO_LOGICO - jugador.current.alto - CALIBRACION_SUELO;
    
    puntosRef.current = 0;
    objeto.current = [ ... ]; // Tu array de cristales reestablecidos

```

**E inyecta la restauración de la salud justo antes de cambiar el estado a `"JUGANDO"`:**

```javascript
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

1. Guarda los cambios de tu archivo y abre tu navegador.
2. Inicia la misión desde el menú principal. Avanza con destreza recolectando cristales hasta encontrar la plataforma de peligro designada.
3. **¿Resultado esperado?** Al rozar los pinchos metálicos, tu nave regresará instantáneamente al punto de salida seguro, el marcador de salud bajará a `❤️❤️` y verás a tu personaje parpadear de forma espectacular durante un segundo completo.
4. Intenta tocar el peligro repetidamente. Al perder el tercer corazón, el juego se detendrá por completo y desplegará limpiamente la pantalla roja de **MISIÓN FALLIDA**.
5. Haz clic en **Reintentar Misión** y comprueba cómo el universo entero se regenera con tus 3 vidas intactas.

---

# 🎯 Reto Coder GoCoder del Día 19: Diseñador de Trampas Impredecibles

¡Absolutamente espectacular! Tu software ha dejado de ser un simple Canvas interactivo para convertirse en una mecánica de supervivencia jugable, robusta y competitiva.

### Tus tareas de hoy:

1. **Campos de Minas Espaciales:** Modifica las dimensiones o las coordenadas `x` e `y` de tu plataforma dañina para colocarla en un punto estratégico que obligue al jugador a calcular milimétricamente el ángulo de su salto.
2. **Personalización del Indicador:** Si no quieres usar corazones tradicionales, cambia el string de texto `"❤️"` en tu comando `ctx.fillText` por un indicador de escudo tecnológico como `"🛡️"` o barras de energía dinámicas (`"⚡⚡⚡"`).

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy programamos un interruptor lógico de seguridad diciendo `if (!invulnerableRef.current) { ... }`.

* ¿Qué desastre de rendimiento y de juego ocurriría si elimináramos esa línea y dejáramos que el motor físico restara vidas de forma directa en cada fotograma continuo mientras el jugador roza el obstáculo dañino?
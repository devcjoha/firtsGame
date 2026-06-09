### 🛸 EXTRA Día 18: Inteligencia Artificial Básica (Enemigos Patrulleros)

**¡Bienvenidos al Día 18, goCoders!** Ya tenemos un universo hermoso, plataformas metálicas y valiosos cristales flotantes que recolectar. Pero el espacio exterior no es del todo pacífico... ¡Hoy descubriremos cómo programar nuestros primeros peligros móviles!

Aprenderemos a crear **Enemigos Patrulleros**. Estos objetos no se quedarán quietos esperando; tendrán su propia "miniprogramación" para caminar de izquierda a derecha de forma autónoma. Si te descuidas y chocas con uno, tu nave perderá el equilibrio y el nivel se reiniciará.

---

## 🧭 El Concepto Clave: El Cambio de Sentido (Vectores de Dirección)

Para que un enemigo patrulle un área sin caerse al vacío o perderse en el infinito, necesita dos cosas:

1. **Velocidad autónoma:** Una fuerza que lo empuje constantemente en una dirección.
2. **Límites de patrulla:** Un sensor virtual que le diga: _"Si llegas demasiado lejos a la derecha, date la vuelta; si regresas demasiado a la izquierda, ¡cambia de dirección otra vez!"_.

Esto lo logramos multiplicando su velocidad por `-1` cada vez que el enemigo toque un borde invisible de su zona de patrulla.

```
   [ Límite Izquierdo ] <====== 🛸 (Enemigo) ======> [ Límite Derecho ]
      Al tocar aquí,                                   Al tocar aquí,
   Multiplica vel * -1                              Multiplica vel * -1
   (Empieza a ir a la Derecha)                      (Empieza a ir a la Izquierda)

```

---

## 🛠️ Tu Turno: Manos a la Obra

Abramos nuestro archivo `src/components/MiJuego.jsx`. Vamos a sembrar el peligro en el mapa de forma limpia y segura.

### Paso 1: Crear la Lista de Enemigos Patrulleros

Busca la sección superior de tu componente donde declaraste las referencias de los `objeto` y `obstaculos`. Vamos a añadir un nuevo grupo de datos usando `useRef` para dar vida a dos patrulleros alienígenas.

Agrega este bloque justo **debajo** de tu referencia de `objeto`:

```javascript
/**************************************
    🛸 NUEVO DÍA 18: ENEMIGOS PATRULLEROS
  ************************************* */
const enemigos = useRef([
  {
    x: 950,
    y: 270, // Flotando un poco sobre la plataforma verde
    ancho: 50,
    alto: 50,
    color: rojo,
    inicioX: 950, // Guardamos dónde empezó para saber su límite izquierdo
    rangoPatrulla: 200, // Cuántos píxeles se moverá antes de dar la vuelta
    velocidadX: 2, // Su velocidad inicial de patrulla
  },
  {
    x: 1950,
    y: 300, // Sobre la plataforma morada
    ancho: 50,
    alto: 50,
    color: rojo,
    inicioX: 1950,
    rangoPatrulla: 180,
    velocidadX: -2.5, // Este empieza moviéndose hacia la izquierda
  },
]);
```

---

### Paso 2: Reubicar y Actualizar la Función de Reiniciar Juego

Para evitar errores de orden en JavaScript, vamos a mover nuestra función reiniciarJuego hacia arriba, colocándola justo debajo de la nueva referencia de enemigos y antes del useEffect. Además, aprovecharemos para enseñarle a restaurar la posición de los enemigos cuando el jugador pierda.

Corta tu función reiniciarJuego de donde estaba abajo y colócala en esta nueva posición estratégica modificada de la siguiente manera:

```JavaScript
  // ... (Justo debajo de la referencia de enemigos)

  /**************************************
    🔄 ACTUALIZADO DÍA 18: REINICIO SEGURO EN MEMORIA
  ************************************* */
  const reiniciarJuego = () => {
    // 1. Regresamos al jugador a su posición inicial
    jugador.current.x = 100;
    jugador.current.y = 250;
    jugador.current.vx = 0;
    jugador.current.velocidadY = 0;
    jugador.current.saltando = false;
    jugador.current.y = ALTO_LOGICO - jugador.current.alto - CALIBRACION_SUELO;

    // 2. Resetear objetos coleccionables y marcador
    puntosRef.current = 0;
    objeto.current = [
      { x: 650, y: 220, ancho: 50, alto: 50, color: amarillo },
      { x: 800, y: 30, ancho: 70, alto: 70, color: cyan, tipo: "bonus" },
      { x: 1050, y: 240, ancho: 50, alto: 50, color: amarillo },
      { x: 1120, y: 240, ancho: 50, alto: 50, color: amarillo },
      { x: 1550, y: 170, ancho: 50, alto: 50, color: amarillo },
      { x: 2050, y: 90, ancho: 70, alto: 70, color: cyan, tipo: "bonus" },
      { x: 2550, y: 120, ancho: 50, alto: 50, color: amarillo },
      { x: 2650, y: 120, ancho: 50, alto: 50, color: amarillo },
    ];

    // 🛸 3. NUEVO DÍA 18: RESETEAR POSICIÓN DE ENEMIGOS
    enemigos.current.forEach((enemigo) => {
      enemigo.x = enemigo.inicioX;
      // Restablecemos velocidades originales (positiva para el primero, negativa para el segundo)
      enemigo.velocidadX = enemigo.inicioX === 950 ? 2 : -2.5;
    });

    // 4. Apagamos los interruptores de victoria
    juegoGanadoRef.current = false;
    setJuegoGanado(false);
  };

  // ... (Aquí abajo continúa tu useEffect original de forma intacta)
  useEffect(() => {
```

### Paso 3: Cargar el Sprite de los Enemigos

Para que no sean simples cajas rojas, vamos a cargar una genial imagen espacial de peligro. Ve a la sección dentro de tu `useEffect` donde se cargan los sprites (`imagenObjeto`, `imagenJugador`, etc.).

Añade este bloque de código justo **debajo** de la carga de `imagenObjetoBonus`:

```javascript
// 🛸 4. Sprite para los Enemigos Cósmicos
const imagenEnemigo = new Image();
imagenEnemigo.src = "./src/assets/enemigos/alien-1.png";
let enemigoSpriteCargado = false;
imagenEnemigo.onload = () => {
  enemigoSpriteCargado = true;
};
```

> 💡 **Nota de Emergencia:** Si no tienes una imagen lista en tu computadora, puedes usar temporalmente este enlace en el `.src`:
> `"https://imgbb.com/T0bX66Y/alien-red.png"`

---

### Paso 4: El Motor de Movimiento y Colisión de Enemigos

Ahora entremos al corazón del juego: el `bucleJuego` dentro de tu `useEffect`. Justo **debajo** de donde termina la lógica y el dibujo de los cristales (`objeto.current.forEach`), vamos a inyectar el ciclo inteligente de los enemigos.

Añade este bloque compacto:

```javascript
/* ----------------------------------------------------
      🛸 NUEVO DÍA 18: INTELIGENCIA Y DAÑO DE ENEMIGOS
      ----------------------------------------------------*/
enemigos.current.forEach((enemigo) => {
  // A. Movimiento Automático: El enemigo camina solo
  enemigo.x += enemigo.velocidadX;

  // B. Sensor de Giro: Si se aleja mucho de su punto de inicio, ¡se da la vuelta!
  if (enemigo.x > enemigo.inicioX + enemigo.rangoPatrulla) {
    enemigo.velocidadX = -Math.abs(enemigo.velocidadX); // Va a la izquierda
  } else if (enemigo.x < enemigo.inicioX) {
    enemigo.velocidadX = Math.abs(enemigo.velocidadX); // Va a la derecha
  }

  // C. Detector de Colisión de Daño con la Nave
  const chocandoConNave =
    gamer.x + gamer.ancho > enemigo.x &&
    gamer.x < enemigo.x + enemigo.ancho &&
    gamer.y + gamer.alto > enemigo.y &&
    gamer.y < enemigo.y + enemigo.alto;

  if (chocandoConNave) {
    // ¡Boom! Al chocar con un peligro, penalizamos al jugador reiniciando su posición
    reiniciarJuego();
  }

  // D. Dibujar al Enemigo en Pantalla usando la Cámara Móvil
  const enemigoEnPantallaX = enemigo.x - camaraX.current;

  if (enemigoSpriteCargado) {
    ctx.drawImage(
      imagenEnemigo,
      enemigoEnPantallaX,
      enemigo.y,
      enemigo.ancho,
      enemigo.alto,
    );
  } else {
    ctx.fillStyle = enemigo.color;
    ctx.fillRect(enemigoEnPantallaX, enemigo.y, enemigo.ancho, enemigo.alto);
  }
});
```

---

### Paso 5: Resetear las Patrullas al Reiniciar el Juego

Si un enemigo se quedó a mitad de su caminata cuando perdiste, ¡queremos que regrese a su posición original al iniciar una nueva partida! Ve a la función `reiniciarJuego` (que está afuera del `useEffect`).

Agrega esta restauración al final de la función, justo antes de cerrar la llave de `reiniciarJuego`:

```javascript
// 🛸 NUEVO DÍA 18: RESETEAR POSICIÓN DE ENEMIGOS
enemigos.current.forEach((enemigo) => {
  enemigo.x = enemigo.inicioX;
  // Restablecemos velocidades originales (positiva para el primero, negativa para el segundo)
  enemigo.velocidadX = enemigo.inicioX === 950 ? 2 : -2.5;
});
```

---

## 🧪 ¡Cuidado con el Espacio Exterior!

1. Guarda tu archivo.
2. Dirígete a la plataforma verde. **¿Resultado esperado?** Verás un enemigo patrullando de un lado a otro sobre la superficie metálica de forma continua.
3. Intenta esquivarlo saltando sobre él.
4. Déjate tocar a propósito. Verás cómo instantáneamente el juego se reinicia de manera fluida gracias al poder de las referencias síncronas de memoria RAM. ¡Ahora tu juego es un verdadero desafío de supervivencia!

---

# 🎯 Reto Coder GoCoder del Día 18: Comandante de Escuadrones y Trampas Móviles

¡Increíble trabajo! Has transformado un mapa pacífico en una emocionante pista de obstáculos interactiva. Ahora eres el director del desafío.

### Tus tareas de hoy:

1. **Tu Alien Personalizado:** Descarga una imagen divertida o amenazante de un monstruo espacial o dron transparente `.png`. Ponla en tu carpeta de assets con el nombre `alien-1.png` para que se actualice tu diseño.
2. **Ajustar la Dificultad:** Modifica la propiedad `velocidadX` de tus enemigos. Ponle a uno de ellos una velocidad de `5` o `-5`. ¿Notas cómo cambia el ritmo del juego?
3. **🚀 EL GRAN DESAFÍO: El Centinela Veloz:**
   Crea un tercer enemigo en tu array `enemigos.current` (tanto en la parte superior como dentro de la función `reiniciarJuego`). Posiciónalo en una parte baja del suelo o en la plataforma final magenta. Dale un `rangoPatrulla` largo de `350` píxeles y haz que se mueva sumamente rápido para obligar al jugador a usar el botón de correr (`Shift`) o calcular muy bien la caída de su salto.

---

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy programamos la inteligencia artificial del enemigo cambiando la dirección de su velocidad directamente dentro del ciclo continuo del Canvas.

- ¿Por qué es una mejor decisión técnica utilizar propiedades locales como `inicioX` y `rangoPatrulla` para cada enemigo individual en lugar de poner números fijos globales en las condiciones `if`? ¿Cómo ayuda esto si en el futuro decidimos crear 50 enemigos en un mapa gigante?

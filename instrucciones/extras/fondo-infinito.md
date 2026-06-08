### 🌌 Guía Extra A: Fondo Infinito con Parallax y Calibración de Suelo

**¡Felicidades, goCoders!** Ahora que nuestro juego usa imágenes reales, vamos a aplicar una de las técnicas más famosas de la industria de los videojuegos: el **Efecto Parallax** (para que el fondo se mueva más lento y dé sensación de profundidad 3D) y el **Fondo Infinito** (para que la imagen se repita y nunca se acabe).

Pero además, hay un reto de ingeniería: cada uno de ustedes ha elegido un fondo diferente, y la línea del suelo o la tierra firme dibujada en su imagen puede estar más arriba o más abajo de nuestro límite actual. Hoy aprenderemos a **calibrar la posición de nuestro jugador** para que pise exactamente el suelo de su propio paisaje.

---

## 🛠️ Manos a la Obra

Abre tu archivo `src/components/MiJuego.jsx`. Todo nuestro trabajo se concentrará en agregar unas variables de control y ajustar el límite del suelo de forma inteligente.

### Paso 1: Crear las Variables de Calibración

Busca dentro de tu `MiJuego.jsx` el lugar donde declaraste las dimensiones lógicas (cerca de `ANCHO_LOGICO`). Justo **debajo**, agregaremos la configuración del fondo y el "ajuste de suelo":

```javascript
const ANCHO_LOGICO = 1000;
const ALTO_LOGICO = 500;
const ANCHO_MAPA_TOTAL = 3000;

/**************************************
    🌌 CONFIGURACIÓN PARALLAX (EXTRA)
  ************************************* */
const ANCHO_FONDO_IMG = 1000; // El ancho real de tu archivo de imagen
const FACTOR_PARALLAX = 0.4; // Multiplicador de velocidad (Menor a 1 = Más lento/lejano)
const LINEA_BASE_FONDO_Y = 0; // 💡 Modifica este número si quieres subir o bajar el fondo (ej: 20, -50)
const CALIBRACION_SUELO = 90; // Ajusta este número hasta que el jugador coincida con el suelo dibujado en tu fondo. Si el suelo de tu fondo está muy abajo, pon un número más alto (ej: 60, 80). Si el suelo está muy alto, pon un número más bajo (ej: 20, 0).
```

---

### Paso 2: Ajustar el limite del suelo base

```javascript
// 3. 🛑 Límite del suelo base CALIBRADO (Por si se cae de todas las plataformas al vacío)

const sueloFisicoActual = ALTO_LOGICO - gamer.alto - CALIBRACION_SUELO;

if (gamer.y >= sueloFisicoActual) {
  gamer.y = sueloFisicoActual;
  gamer.velocidadY = 0;
  gamer.saltando = false;
}
```

Qué hace esto:
ALTO_LOGICO - gamer.alto coloca los pies en el borde inferior real de la pantalla.
Restar CALIBRACION_SUELO sube el suelo invisible.
Si aumentas el número, el jugador termina más alto en la pantalla.
Si disminuyes el número, el jugador baja más.
RECOMENDACIÓN:
Deja el fondo donde está (LINEA_BASE_FONDO_Y solo controla el fondo visual).
Usa CALIBRACION_SUELO para adaptar la “tierra física” al dibujo.
Pide al alumno que pruebe valores como 20, 40, 60, 80 hasta que el personaje parezca pisar el suelo del fondo.

### Paso 3: El Nuevo Algoritmo de Fondo Infinito con "mirror repeat"

Busca dentro de tu `bucleJuego` la sección donde dibujas el fondo (`if (fondoCargado)`). Vamos a reemplazar ese bloque por nuestra matemática de bucle infinito:

```javascript
/* ----------------------------------------------------
      🌌 EXTRA: Fondo Infinito con Efecto Parallax
      ----------------------------------------------------*/
if (fondoCargado) {
  // 1. Calculamos la posición del fondo multiplicada por el factor de lentitud
  // Usamos el operador % (Residuo) para que la posición se reinicie al llegar al ancho de la imagen
  const fondoX = Math.floor(
    (camaraX.current * FACTOR_PARALLAX) % ANCHO_FONDO_IMG,
  );
  const fondoOffsetX = -fondoX;
  // 2. Dibujamos la primera copia (Normal)
  ctx.drawImage(
    imagenFondo,
    fondoOffsetX,
    LINEA_BASE_FONDO_Y,
    ANCHO_LOGICO,
    ALTO_LOGICO,
  );
  // 3. Guardamos el estado del canvas para aplicar la transformación espejo
  ctx.save();
  // 4. Movemos el origen al lugar donde debe empezar la segunda copia + su ancho total
  ctx.translate(fondoOffsetX + ANCHO_FONDO_IMG * 2, 0);
  // 5. Invertimos el eje X (Multiplicamos la escala horizontal por -1)
  ctx.scale(-1, 1);

  // 6. Dibujamos la segunda copia justo al lado para tapar el vacío cuando la primera se mueva
  ctx.drawImage(
    imagenFondo,
    fondoOffsetX + ANCHO_FONDO_IMG,
    LINEA_BASE_FONDO_Y,
    ANCHO_LOGICO,
    ALTO_LOGICO,
  );
  // 7. Restauramos el canvas para que el jugador y las plataformas no se volteen
  ctx.restore();
} else {
  // Respaldo de seguridad por si el internet va lento
  ctx.fillStyle = "#001f3f";
  ctx.fillRect(0, 0, ANCHO_LOGICO, ALTO_LOGICO);
}
```
¿Qué hace este truco de ingeniería?
Como las imágenes que descargamos de internet no siempre están diseñadas para conectarse perfectamente de izquierda a derecha, usamos ctx.scale(-1, 1). Esto voltea la segunda imagen de cabeza de forma horizontal. Al reflejarla, el borde derecho de la primera imagen se toca con el "borde derecho reflejado" de la segunda, creando una costura invisible perfecta sin importar qué fondo hayas elegido. ¡Problema resuelto!

### Paso 4: Ajustar el reinicio del jugador

Si quieren que el personaje también empiece siempre en el suelo calibrado, usa este valor al reiniciar el juego:

```javascript
const reiniciarJuego = () => {
  // resto del código y agrega esto:

  jugador.current.y = ALTO_LOGICO - jugador.current.alto - CALIBRACION_SUELO;
};
```

## 🧪 ¡Prueba de Calibración!

1. Guarda los cambios y ejecuta tu juego.
2. Camina con tu personaje. Si notas que flota por encima del suelo pintado en tu fondo, **disminuye** el número de `CALIBRACION_SUELO`.
3. Si notas que se hunde o camina por debajo del suelo de la imagen, **aumenta** el número de `CALIBRACION_SUELO` (por ejemplo a `80` o `100`).
4. ¡Modifica el número hasta que tu personaje parezca estar pisando perfectamente el suelo de tu imagen!

```

```

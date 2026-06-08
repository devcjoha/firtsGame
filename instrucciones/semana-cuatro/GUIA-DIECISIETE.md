### 💎 Día 17: Variables de Estado (Coleccionables Espaciales)

**¡Felicidades por llegar al Día 17, goCoders!** Tu juego ya se ve espectacular con sus nuevos trajes espaciales y texturas metálicas. Pero a todo gran explorador del cosmos le hace falta una misión: ¡recolectar tesoros valiosos esparcidos por las galaxias!

Hoy vamos a inyectar un sistema de recompensas en nuestro código. Aprenderemos a distribuir objetos flotantes (Objetos cósmicos) a lo largo de nuestro inmenso mapa de 3000 píxeles. Cuando tu nave toque un Objeto, este se desvanecerá instantáneamente con magia matemática y sumará puntos a tu marcador.

---

## 🧭 El Concepto Clave: El "Filtro" de Memoria (`filter`)

Hasta ahora, para dibujar las plataformas usábamos un organizador llamado `forEach` (que significa "hacer algo por cada elemento"). Hoy necesitamos algo diferente: cuando la nave recolecte un objeto, ese objeto debe desaparecer del juego para siempre.

Para lograrlo, los ingenieros de software usamos una herramienta llamada `.filter()`. Imagina que tienes una caja con Objetoes y quieres sacar los que ya fueron tocados por el jugador. El filtro revisa la lista entera en cada fotograma y dice: _"Si este Objeto NO ha sido tocado, se queda en el juego; si ya lo tocaron, ¡lo borramos de la memoria!"_.

```

```

        [ Lista de Objetoes en Memoria ]

[ Objeto 1 ] [ Objeto 2 (¡Tocado!) ] [ Objeto 3 ]
│
▼ (Filtrado en Tiempo Real)
[ Lista Nueva y Actualizada ]
[ Objeto 1 ] [ Objeto 3 ]

```

```

---

## 🛠️ Tu Turno: Manos a la Obra

Abramos nuestro archivo `src/components/MiJuego.jsx`. Vamos a potenciar el juego sin tocar nada de nuestras físicas anteriores.

### Paso 1: Agregar la referencia para los puntos

```javascript
const puntosRef = useRef(0);
```
Asi usaremos ```puntosRef.current += 100```, y la mutación del valor de la puntuación ocurrirá de forma instantánea y síncrona en la memoria ram. Como el bucleJuego se ejecuta 60 veces por segundo y redibuja todo desde cero, leer puntosRef.current en cada fotograma garantiza que el Canvas pinte el número exacto en el milisegundo correcto.

### Paso 2: Crear la Puntuación y el Array de Objetos coleccionables

Busca la parte superior de tu componente, justo donde declaraste las propiedades de los `obstaculos.current`. Vamos a añadir dos cosas nuevas: una variable de estado de React para mostrar los puntos en pantalla, y una lista de referencias (`useRef`) con las posiciones de nuestros nuevos coleccionables flotantes.

Agrega este código justo **debajo** de la declaración de tus `obstaculos`:

```javascript
// ... (Tus obstáculos del día anterior)
const obstaculos = useRef([
  { x: 600, y: 300, ancho: 150, alto: 40, color: rojo },
  { x: 1000, y: 320, ancho: 200, alto: 30, color: verde },
  { x: 1500, y: 250, ancho: 120, alto: 30, color: amarillo },
  { x: 2000, y: 350, ancho: 180, alto: 30, color: violeta },
  { x: 2500, y: 200, ancho: 250, alto: 30, color: magenta },
]);

/**************************************
    💎 NUEVO DÍA 17: COLECCIONABLES Y PUNTAJE
  ************************************* */

const objeto = useRef([
  { x: 650, y: 220, ancho: 50, alto: 50, color: amarillo },
  { x: 720, y: 220, ancho: 50, alto: 50, color: amarillo },
  { x: 1050, y: 240, ancho: 50, alto: 50, color: amarillo },
  { x: 1120, y: 240, ancho: 50, alto: 50, color: amarillo },
  { x: 1550, y: 170, ancho: 50, alto: 50, color: amarillo },
  { x: 2050, y: 270, ancho: 50, alto: 50, color: amarillo },
  { x: 2550, y: 120, ancho: 50, alto: 50, color: amarillo },
  { x: 2650, y: 120, ancho: 50, alto: 50, color: amarillo },
]);
```

---

### Paso 3: Programar la Carga del Sprite del objetos

Para que los objetos combinen con tu nuevo apartado artístico, vamos a cargar una imagen para ellos. Ve a la sección de carga de imágenes dentro del `useEffect` (donde pusiste `imagenPlataforma`).

Añade este bloque de código justo **debajo**:

```javascript
// 2. Sprite de Textura para las Plataformas (Código del Día 16)
const imagenPlataforma = new Image();
imagenPlataforma.src = "./src/assets/plataformas/metal-1.jpg";
let plataformaSpriteCargado = false;
imagenPlataforma.onload = () => {
  plataformaSpriteCargado = true;
};

// 💎 3. Sprite para los objetos Coleccionables
const imagenObjeto = new Image();
imagenObjeto.src = "./src/assets/coleccionables/crystal-5.png";
let objetoSpriteCargado = false;
imagenObjeto.onload = () => {
  objetoSpriteCargado = true;
};
```

> 💡 **Nota de Emergencia:** Si no tienes un archivo de imagen en tu carpeta, puedes usar temporalmente este enlace de internet en el `.src`:
> `"https://imgbb.com/T0bX66Y/crystal.png"`

---

### Paso : Actualiza el fillText de canvas para que lea la Ref de los puntos

```javascript
/* ----------------------------------------------------
 👇 Texto NUEVO para actualizar PUNTOS
 ----------------------------------------------------*/
ctx.fillStyle = "#ffffff";
ctx.font = "20px sans-serif";
ctx.fillText("Puntos: " + puntosRef.current, 50, 50);
```

### Paso 4: El Detector de Colisiones y Dibujo de Objetoes

Ahora entra al gran `bucleJuego` dentro de tu `useEffect`. Vamos a escribir la lógica que se encarga de revisar si la nave pasa por encima de un Objeto y, al mismo tiempo, los dibujaremos en pantalla aplicando la matemática de la cámara móvil.

Ubica la sección donde termina el detector de colisiones de los obstáculos y añade este bloque compacto:

```javascript
      // ... (Tus colisiones de obstáculos anteriores terminan aquí)
      });

      /* ----------------------------------------------------
      💎 NUEVO DÍA 17: DETECTOR Y DIBUJO DE ObjetoES
      ----------------------------------------------------*/
      // A. Filtramos y detectamos colisiones en un solo paso matemático
      objeto.current = objeto.current.filter((objeto) => {
        const chocandoConObjeto =
          gamer.x + gamer.ancho > objeto.x &&
          gamer.x < objeto.x + objeto.ancho &&
          gamer.y + gamer.alto > objeto.y &&
          gamer.y < objeto.y + objeto.alto;

        if (chocandoConObjeto) {
      puntosRef.current += 100;
     ctx.fillStyle = objeto.color;
          // ¡Sumamos 100 puntos!
          return false; // Se elimina del mapa inmediatamente
        }
        return true; // Si no hay choque, el Objeto se mantiene vivo
      });

      // B. Dibujamos en el Lienzo los Objetoes que sobrevivieron al filtro
      objetoes.current.forEach((objeto) => {
        const objetoEnPantallaX = objeto.x - camaraX.current;

        if (ObjetoSpriteCargado) {
          ctx.drawImage(imagenObjeto, objetoEnPantallaX, objeto.y, objeto.ancho, objeto.alto);
        } else {
          ctx.fillStyle = objeto.color;
          ctx.fillRect(objetoEnPantallaX, objeto.y, objeto.ancho, objeto.alto);
        }
      });

```

---

### Paso 5: Actualizar la Función de Reiniciar Juego

Si un jugador recolecta Objeto, gana, y luego presiona "Volver a Jugar", ¡los Objeto deben reaparecer! Vamos a actualizar nuestra función `reiniciarJuego` (que está afuera del `useEffect`) para restablecer la lista original y poner el marcador a cero.

Modifica tu función para que quede de la siguiente forma:

```javascript
const reiniciarJuego = () => {
  // 1. Regresamos al jugador a su posición inicial
  jugador.current.x = 100;
  jugador.current.y = 250;
  jugador.current.vx = 0;
  jugador.current.velocidadY = 0;
  jugador.current.saltando = false;
  jugador.current.y = ALTO_LOGICO - jugador.current.alto - CALIBRACION_SUELO;
  // 💎 NUEVO DÍA 17: RESETEAR OBJETO Y MARCADOR
  puntosRef.current = 0;
  objeto.current = [
    { x: 650, y: 220, ancho: 30, alto: 30, color: amarillo },
    { x: 720, y: 220, ancho: 30, alto: 30, color: amarillo },
    { x: 1050, y: 240, ancho: 30, alto: 30, color: amarillo },
    { x: 1120, y: 240, ancho: 30, alto: 30, color: amarillo },
    { x: 1550, y: 170, ancho: 30, alto: 30, color: amarillo },
    { x: 2050, y: 270, ancho: 30, alto: 30, color: amarillo },
    { x: 2550, y: 120, ancho: 30, alto: 30, color: amarillo },
    { x: 2650, y: 120, ancho: 30, alto: 30, color: amarillo },
  ];

  // 2. Apagamos los interruptores de victoria
  juegoGanadoRef.current = false;
  setJuegoGanado(false);
};
```

---

## 🧪 ¡A Recolectar Tesoros!

1. Guarda todos tus cambios en el archivo.
2. Corre hacia la primera plataforma. **¿Resultado esperado?** Verás relucientes Objetos espaciales flotando.
3. Salta e intercepta un Objeto. Verás cómo desaparece de inmediato de forma suave en pantalla y tu marcador salta automáticamente sumando puntos. ¡Has implementado tu primera mecánica de puntuación profesional!


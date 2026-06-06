### 🚀 Día 16: De Cuadrados de Prueba a Sprites Reales

**¡Bienvenidos a la Semana 4, goCoders!** Tu videojuego ya cuenta con un motor de físicas completo, inercia, cámara móvil y un portal de victoria funcional. Sin embargo, hasta ahora todo se compone de bloques y cuadrados de colores de desarrollo.

Hoy vamos a dar el salto estético más grande del curso. Vamos a sustituir el cuadrado cyan de tu jugador y los rectángulos sólidos de los bloques por **Sprites reales** (imágenes transparentes para videojuegos). Reutilizaremos exactamente la misma lógica de carga de imágenes que usamos para el fondo en el Día 4, aplicándola ahora sobre los elementos activos del escenario.

---

## 🧭 El Concepto Clave: Dibujar Imágenes en Canvas (`drawImage`)

Para pintar rectángulos sólidos en el lienzo usábamos `ctx.fillRect()`. Para dibujar imágenes reales en formato PNG o JPG, el lienzo de HTML5 nos ofrece el método `ctx.drawImage()`.

Este método toma una imagen cargada en la memoria de la computadora y la estira o encoge para que encaje exactamente en las hitboxes lógicas que programaste en los días anteriores:

```javascript

ctx.drawImage( ObjetoImagen, posicionX, posicionY, ancho, alto );

```

Esto significa que **las reglas del juego, las colisiones y los movimientos siguen siendo exactamente los mismos**, ¡lo único que cambia es el pincel con el que los pintamos en pantalla!

---


```

[ Caja Lógica de Colisión ]             [ Lo que ve el Jugador ]
(Mismas coordenadas)                    (Sprite Final)
┌───────────┐                         ┌───────────┐
│           │                         │           │
│  (Cyan)   │            ►            │     🚀    │
│           │                         │  |======| │
└───────────┘                         └───────────┘

```

---

## 🛠️ Tu Turno: Manos a la Obra

Vamos a abrir nuestro archivo `src/components/MiJuego.jsx`. Todo nuestro trabajo de hoy se concentrará dentro del efecto principal (`useEffect`).

### Paso 1: Cargar los Nuevos Sprites en Memoria

Busca la sección dentro del `useEffect` donde se configura la `imagenFondo`. Justo **debajo** de donde dice `imagenFondo.onload = ...`, vamos a inicializar las imágenes para el Personaje y las Plataformas:

```javascript
    // ... (Tu código actual de imagenFondo)
    let fondoCargado = false;
    imagenFondo.onload = () => {
      fondoCargado = true;
    };

    /**************************************
      🚀 NUEVO DÍA 16: CARGA DE SPRITES
    ************************************* */
    // 1. Sprite de la Nave del Jugador
    const imagenJugador = new Image();
    imagenJugador.src = "./src/assets/player-ship.png";
    let jugadorSpriteCargado = false;
    imagenJugador.onload = () => {
      jugadorSpriteCargado = true;
    };

    // 2. Sprite de Textura para las Plataformas
    const imagenPlataforma = new Image();
    imagenPlataforma.src = "./src/assets/platform-texture.png";
    let plataformaSpriteCargado = false;
    imagenPlataforma.onload = () => {
      plataformaSpriteCargado = true;
    };

```

> 💡 **Nota de Ayuda:** Si aún no has descargado tus imágenes en la carpeta `assets`, puedes usar temporalmente estos enlaces directos de internet en el `.src`:
> * Nave: `"https://imgbb.com/6wXvB8G/player-ship.png"`
> * Plataforma: `"https://imgbb.com/vYm6X8X/platform-texture.png"`
> 
> 

---

### Paso 2: Interceptar el Dibujo de las Plataformas

Busca dentro del `bucleJuego` la sección dedicada a pintar las plataformas (`obstaculos.current.forEach`). Vamos a condicionar el renderizado: si la imagen de la textura ya terminó de cargar en memoria, la usamos; si no, dejamos el color sólido original como respaldo de seguridad.

Modifica el bloque para que incorpore el sprite:

```javascript
      /* ----------------------------------------------------
      🧱 ACTUALIZADO DÍA 16: Dibujar Plataformas con Sprites
      ----------------------------------------------------*/
      obstaculos.current.forEach((bloque) => {
        // Aplicamos la fórmula matemática de la cámara
        const bloqueEnPantallaX = block.x - camaraX.current;

        if (plataformaSpriteCargado) {
          // Reemplazamos el fillRect por la textura real
          ctx.drawImage(
            imagenPlataforma, 
            bloqueEnPantallaX, 
            bloque.y, 
            bloque.ancho, 
            bloque.alto
          );
        } else {
          // Respaldo de seguridad por si el internet o el disco van lentos
          ctx.fillStyle = bloque.color;
          ctx.fillRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
        }

        // Dejamos el borde sutil decorativo que ya tenías
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(bloqueEnPantallaX, bloque.y, bloque.ancho, bloque.alto);
      });

```

---

### Paso 3: Transformar el Cuadrado del Jugador en una Nave

Ahora ve a la parte final del `bucleJuego`, justo donde se dibuja el personaje principal en el lienzo. Reemplazaremos el pintado del cuadrado sólido por nuestra nave espacial usando la misma lógica de protección.

Actualiza la sección de dibujo del jugador para que quede así:

```javascript
  /* ----------------------------------------------------
       👇 Jugador (Se dibuja encima de todo)
        ----------------------------------------------------*/
      /* ----------------------------------------------------
       🚀 ACTUALIZADO DÍA 16: Dibujar Jugador con Sprite Real
        ----------------------------------------------------*/
      const jugadorEnPantallaX = gamer.x - camaraX.current; // representa al jugador y su posición

      if (jugadorSpriteCargado) {
        // ¡Pintamos el sprite oficial de la nave!
        ctx.drawImage(
          imagenJugador,
          jugadorEnPantallaX,
          gamer.y,
          gamer.ancho,
          gamer.alto
        );
      } else {
        // Cuadrado de respaldo original si la imagen no está lista
        ctx.fillStyle = gamer.color; 
        ctx.fillRect(jugadorEnPantallaX, gamer.y, gamer.ancho, gamer.alto);
      }

```

---

## 🧪 ¡Prueba de Vuelo de Arte Final!

1. Guarda tu código en Visual Studio Code.
2. Abre el juego en tu navegador. **¡Resultado esperado!** El bloque celeste ahora es una espectacular nave espacial y las plataformas lucen una textura metálica o de roca intergaláctica.


3. Camina, corre y salta por las plataformas. Notarás que el juego se comporta exactamente igual que el viernes pasado, demostrando que separar cómo se calcula el juego de cómo se dibuja es la mejor práctica de la industria.



```


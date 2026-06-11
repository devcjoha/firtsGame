##  🛠️ EXTRA: Utilizar una imagen como meta

### Paso 1: Cargar el Sprite de la Meta

Busca dentro de tu `useEffect`, justo donde cargamos el resto de los sprites (debajo de `imagenPeligro.src`).

**Ubica estas líneas en tu código:**

```javascript
    imagenPeligro.onload = () => {
      peligroSpriteCargado = true;
    };

```

**E inyecta la carga de la imagen de la meta justo debajo:**

```javascript
    // 🏁 5. Sprite para la Meta Final
    const imagenMetaSprite = new Image();
    imagenMetaSprite.src = "./src/assets/objetivos/portal.png"; // <-- Asegúrate de que esta ruta sea correcta
    let metaImagenCargada = false;
    imagenMetaSprite.onload = () => {
      metaImagenCargada = true;
    };

```

---

### Paso 2: Reemplazar el Dibujo en el Bucle

Ahora baja hasta la sección del `bucleJuego` donde se dibuja la meta. Vamos a quitar los rectángulos de colores y poner nuestra imagen.

**Busca este bloque de código (Día 15):**

```javascript
      /* ----------------------------------------------------
      🏁 NUEVO DÍA 15: RENDERIZAR LA META EN EL CANVAS
      ----------------------------------------------------*/
      const metaEnPantallaX = meta.current.x - camaraX.current;

      // Dibujamos la estructura base dorada del portal
      ctx.fillStyle = meta.current.color;
      ctx.fillRect(
        metaEnPantallaX,
        meta.current.y,
        meta.current.ancho,
        meta.current.alto,
      );

      // Le agregamos un núcleo brillante de energía blanca en el centro
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        metaEnPantallaX + 15,
        meta.current.y + 10,
        meta.current.ancho - 30,
        meta.current.alto - 20,
      );

```

**Reemplázalo completamente por este nuevo bloque inteligente:**

```javascript
      /* ----------------------------------------------------
      🏁 ACTUALIZADO: La Meta ahora es un Sprite Real
      ----------------------------------------------------*/
      const metaEnPantallaX = meta.current.x - camaraX.current;

      if (metaImagenCargada) {
        // Dibujamos el sprite oficial de la meta
        ctx.drawImage(
          imagenMetaSprite,
          metaEnPantallaX,
          meta.current.y,
          meta.current.ancho,
          meta.current.alto
        );
      } else {
        // Respaldo por si la imagen no carga (rectángulo azul original)
        ctx.fillStyle = meta.current.color;
        ctx.fillRect(metaEnPantallaX, meta.current.y, meta.current.ancho, meta.current.alto);
      }

```

---

### Paso 3: Ajustar el tamaño (Opcional)

Si tu nueva imagen es más grande o más pequeña que el rectángulo original, puedes ajustar los valores en la declaración inicial de `meta` en la parte superior de tu componente.

**Busca el objeto `meta` al inicio de `MiJuego`:**

```javascript
  const meta = useRef({
    x: 3000, 
    y: 120, 
    ancho: 60, // <-- Cambia esto si quieres que la imagen sea más ancha
    alto: 80,  // <-- Cambia esto si quieres que la imagen sea más alta
    color: azul, 
  });

```

---

### 💡 Consejo Pro de Diseñador:

Para que la meta se vea genial, asegúrate de que la imagen que elijas (`portal.png`) sea un **archivo PNG con fondo transparente**. Si usas un JPG, se verá un cuadro blanco o negro alrededor de tu portal, lo cual romperá la inmersión espacial.

¡Pruébalo y verás cómo cambia la sensación de llegar al final del nivel! 🚀🏁
# 🌌 UN ESPACIO INFINITO 🌌

### ¡Hoy nuestro juego dejará de verse vacío!

# GUIA 4 🚀

Un juego espacial necesita... ¡el espacio! Vamos a aprender a cargar una imagen y ponerla de fondo en nuestro lienzo.

1. 🎯 Abre `src/components/MiJuego.jsx`. En la terminal `npm run dev` y presiona `enter`, abre el navegador y en la barra de direcciones coloca `http://localhost:5173/` **Listos para codear**.
2. 🎯 Dentro de la función `useEffect`, antes de que empiece el `bucleJuego`, vamos a crear nuestra imagen. Agrega este código justo arriba de donde dice `const bucleJuego = () => {`:

```js
// ⚡ Creamos el objeto imagen
const imagenFondo = new Image();
```

Ahora `imagenFondo` es la variable que contendrá la imagen que elijamos.

3. 🎯 Especificamos el lugar donde se encuentra la imagen para que la busque y la pueda mostrar. En este caso la imagen está en una carpeta dentro del proyecto. `./src/assets/nombre-imagen.extensión"`, pero también podrías tomarla de internet y darle la dirección.

```js
const imagenFondo = new Image();
// ⚡Le damos la dirección  para que encuentre la imagen
imagenFondo.src = "./src/assets/bg-cuatro";
```

4. 🎯 Creamos el interruptor que indique que si se cargó la imagen .

```js
const imagenFondo = new Image();
imagenFondo.src = "./src/assets/bg-cuatro";

// ⚡Creamos el interruptor que indique si se cargó la imagen
let fondoCargado = false;
imagenFondo.onload = () => {
  fondoCargado = true; // Avisamos que la imagen ya se cargó
};
```

5. Ahora, vamos a modificar el `bucleJuego` para que dibuje esta imagen. Busca la parte donde pintamos el fondo oscuro (`ctx.fillRect`) y cámbialo por esto:

```js
const bucleJuego = () => {
  // Resto del código...

  // 2. ⚡Fondo
  if (fondoCargado) {
    // Si la imagen cargó, la dibujamos en todo el canvas, ctx.drawImage pega la imagen en el lienzo, estirada para ocupar todo el espacio”.
    ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
  } else {
    // Si aún no carga, dejamos el fondo azul oscuro de respaldo
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Resto del código...
};
```

6. 🎯 Vamos a probar con una imagen de internet.

- cambia el valor de imagenFondo.src por esto: `"https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop";`

### ¿Cómo funciona esto? 🎨

Las imágenes en internet tardan un poquito en cargar. Por eso usamos `imagenFondo.onload`. Es como decirle al programa: _"Avísame cuando termines de descargar la foto para poder empezar a pintarla"_.

**Mira tu navegador y refresca 🔄️:** ¡Ahora deberías ver un hermoso fondo de estrellas! 🤩✨

🎯 Es hora de los Retos 🔗 [Enlace Reto cuatro](RETO-GUIA-CUATRO.md)

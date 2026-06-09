# 💥💥💥HOLA CODER 💥💥💥

### ¿Listo para empezar a crear tu primer video juego?

# GUIA 1 🚀

- NOTA: Del lado izquierdo en VSC está el panel del proyecto, en él podrás ver todas las carpetas que existen y trabajan para tu proyecto. Muchas de ellas no necesitas tocarlas, mucho menos modificarlas. Tu profe te explicará la estructura de carpetas con un poco más de detalle.

1. Busca el archivo `App.jsx` dentro de la carpeta `src` y ábrelo haciendo click en él.
2. Presiona `ctrl + Ñ` en el teclado para abrir la terminal. Coloca el cursor del mouse en la terminal y escribe `npm run dev` en el promp de la terminal,

📌 Ejemplo:
` PS C:\Users\tudireccion\tuproyecto>npm run dev`

3. Presiona `ENTER`
   Verás algo como esto:

![terminal](C:\Users\cjadl\myfirst-game\public\instrucciones\terminal.jpg)

### Si todo salió bien ya tu proyecto está VIVO y ahora podremos ver los cambios que hagamos en tiempo real.

4. Abre el navegador y escribe en la barra de direcciones `http://localhost:5173/` y presiona `ENTER`

#### Podrás ver la página que está renderizando el archivo `App.jsx`.

Verás algo como esto:

![app-1](C:\Users\cjadl\myfirst-game\public\instrucciones\app-init.png)

5. Ahora pon mucha atención a toda la explicación de lo que ves en el archivo `App.jsx`.

📢 El archivo `App.jsx` es el contenedor principal que le da un marco estético y moderno a la aplicación. Este archivo o componente `App.jsx` interactúa con `main.jsx` y a su vez `index.html` interactúa también con `main.jsx`.

📢 Fijate en el nombre de la función:

```js
function App() {
  // Contenido de la función
}
```

📢 Luego, hay un bloque de código que empieza con la palabra `return()` que significa retornar. Dentro de este bloque está el código `HTML` que se renderizará y mostrará en el navegador.

```js
function App() {
  // Contenido de la función
  return(
    // HTML
  )
}
```

📢 El lenguaje `HTML` se maneja con etiquetas, cuando se abre una etiqueta siempre debe cerrarse.

```HTML
<body> agrego contenido y luego cierro </body>
<header> agrego contenido y luego cierro </header>
<dir> agrego contenido y luego cierro </dir>
<ul> agrego contenido y luego cierro </ul>
```

📢 Existen muchas etiquetas `HTML` cada una tiene una función y o utilidad. Algunas de ellas son:

```HTML
<head>, <title>, <body>, <header>, <footer>, <article>, <section>, <p>, <div>, <span>, <img>, <aside>, <audio>, <canvas>, <datalist>, <details>, <embed>, <nav>, <output>, <progress>, <video>, <ul>, <ol>, <li>
```

y más... 🔗 https://developer.mozilla.org/es/docs/Web/HTML

En el archivo `App.jsx` dentro del `return()` tenemos este contenido `HTML`

```js
function App() {
  // Contenido de la función
  return (
    <div>
      <img src=""></img>
      <header>
        <h1>{/* TITULO */}</h1>
        <p>Entorno de desarrollo React + Tailwind CSS + HTML5 Canvas</p>
      </header>

      <main className="w-full flex items-center justify-center">
        {/* COMPONENTE DEL JUEGO*/}
        <ComponenteJuego />
      </main>

      <footer>
        © {new Date().getFullYear()} Curso inicial para Jóvenes Desarrolladores.
        Creado por
        <a
          href="https://github.com/devcJoha"
          className="text-indigo-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          @devcJoha
        </a>
        . Todos los derechos reservados.
      </footer>
    </div>
  );
}
```

📢 **Vamos a probar algunas etiquetas HTML y verlas funcionar en la app**:

5. Dentro del elemento `<header>` hay otra etiqueta `<h1>`. La etiqueta h1 sirve para establecer un título como principal en la página, por lo tanto los navegadores la muestran por defecto con un tamaño de fuente grande y en negrita, lo que llama la atención del lector., existe desde la h1 a h6.

Vamos a escribir el título de la página.

- Abre una etiqueta `<h1>` Escribe el título y cierra la etiqueta `</h1>`. Mira el navegador.

- Ahora vamos a hacer que ese texto se vea más llamativo: \* Dentro de la etiqueta `h1` que abre coloca este bloque de código:

      ```js

      className="p-2 text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight sm:text-4xl"

      ```

    **Acabas de aplicar estilo al título del juego**

  📢 Los elementos o etiquetas HTML, tienen propiedades que permiten que podamos modificarlos o configurarlos, una de ellas es la propiedad `className=""` que permite darle estilo a el elemento.

6. Ahora agreguemos una imagen para que nuestra página se vea mucho mejor:
   - Busca la etiqueta de imagen `<img/>` o `<img><img/>` dentro del return de la función `App()`.
   - Una de las propiedades de la etiqueta `img` es `src=""` que significa source(fuente), sirve para decirle a la etiqueta imágen dónde debe buscar la imagen para poder mostrarla en el navegador. En este caso le diremos que la imagen está en la carpeta `src` dentro de la otra carpeta `assets`, de esta manera `./src/assets/nombredelaimagen.extension`.
     - Dentro de la etiqueta img que abre coloca este bloque de código: `src="./src/assets/young-dev.png" alt="imagen GoCoder"`.
     - `alt=""` es otra propiedad que pide `<img/>` con esta propiedad le damos un nombre a la imagen y si el navegador no la puede mostrar por algún error, mostrará este nombre que coloquemos en alt, asi:

     ![alt text](C:\Users\cjadl\myfirst-game\public\instrucciones\alt.png)

Ya podemos reconocer algunos elementos del archivo `App.jsx` y logramos ver y cambiar el renderizado en el navegador,

**_¡Tu primera experiencia como Desarrollador!_**

🎯 Ejercicio:

- Sin borrar lo que ya está. En el footer de App.jsx agrega una etiqueta de enlace `<a></a>` que dirija hacia tu perfil de GitHub. `Si no tienes un perfil de github, crearemos uno.`

## Mañana seguiremos construyendo

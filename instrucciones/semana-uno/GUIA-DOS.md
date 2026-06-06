# 💥💥💥HOLA OTRA VEZ CODER 💥💥💥

### Continuamos con nuestra travesía

# GUIA 2 🚀

- Ayer conocimos el archivo `App.jsx`, sus elementos y sus interacciones.
- Hoy nos movemos al corazón del juego que implementaremos.
1. Dentro de la carpeta `/components` busca el archivo `MiJuego.jsx` y ábrelo haciendo click en él.
2. Presiona `ctrl + Ñ` en el teclado para abrir la terminal. Coloca el cursor del mouse en la terminal y escribe `npm run dev`

Ejemplo:
` PS C:\Users\tudireccion\tuproyecto>npm run dev`

3. Presiona `ENTER`
   Verás en la terminal nuevamente:

![terminal](C:\Users\cjadl\myfirst-game\public\instrucciones\terminal.jpg)

### Si todo salió bien el proyecto nuevamente está VIVO y podemos ver en el navegador, los cambios que hagamos, en tiempo real.

4. Abre el navegador y escribe en la barra de direcciones `http://localhost:5173/` y presiona `ENTER`

#### Podrás ver nuevamente la página que está renderizando el archivo `App.jsx`.

![app-1](C:\Users\cjadl\myfirst-game\public\instrucciones\app-init.png)

5. Vamos a empezar con la creación del juego, en el archivo `MiJuego.jsx`, que está vacío escribe el siguiente código.

```js
function MiJuego() {
 return()
}
```

Con estas lineas de código estamos inicializando una función que se llama `MiJuego`
con la inicialización de su bloque de código que empieza con la palabra `return()` que significa retornar. Dentro de este bloque colocaremos el código `HTML` que se renderizará y mostrará en el navegador.

6. Agrega el siguiente bloque de código `HTML` dentro de los paréntesis del `return( acá )`

```js
return (
  <div>
    <h1 className="p-2 text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-indigo-400 to-orange-200 tracking-tight sm:text-3xl"></h1>
  </div>
);
```

7. Ahora, abre el archivo `App.jsx`; en la primera linea del archivo, antes(fuera) de la función `App()`, vamos a importar(traer hacia App.jsx) el componente `Mijuego()` indicándole a `App.jsx` dónde se encuentra el archivo dentro de la estructura de carpetas.

```js
import MiJuego from "./components/Mijuego";

function App() {
  // Contenido de la función
}
```

8. Luego, en el mismo archivo `App.jsx` agrega dentro del `return` de la función `App()`, dentro de las etiquetas `<main> </main>`, El componente que acabamos de crear:

```js
import MiJuego from "./components/Mijuego";

function App() {
  // Contenido de la función
  return (
    <div>
      {/* ... Resto del código */}

      <main>
        {/* Acá*/}
        <MiJuego />
      </main>

      {/* Resto del código... */}
    </div>
  );
}
export default App;
```

9. Vuele al archivo `MiJuego.jsx` y vamos a `exportar` la función `Mijuego()` que acabamos de crear, para que `App.jsx` pueda encontrarla agregando la siguiente línea de código al final del componente, luego del return y del corchete `};`:

```js
export default MiJuego;
```

Ahora, el componente `App.jsx` con su función `App()` ya puede encontrar al componente `MiJuego.jsx` con su función `Mijuego()`.

10. No pierdas de vista el navegador, y escribe entre las etiquetas `<h1> (acá) </h1>`
    **_Hola Mundo!_**

```js
function MiJuego() {
  
   /**************************************
       RENDERIZADO HTML 👇
  ************************************* */
  return (
    <div>
      <h1 className="p-2 text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-indigo-400 to-orange-200 tracking-tight sm:text-3xl">
        Hola Mundo!
      </h1>
    </div>
  );
}
export default MiJuego;
```

**_¡Acabas de ver cómo tu video juego está vivo y puedes hacer de él tu creación!_**

🎯 Ejercicio:

1. Cambia los colores y el tamaño al titulo de la página.
2. Cambia la imagen principal.
3. Escribe algo diferente a Hola Mundo!

## Mañana seguiremos construyendo

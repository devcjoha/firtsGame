# ⚙️ EL MOTOR DEL JUEGO ⚙️

### ¡Hoy le daremos vida a nuestro código!

# GUIA 3 🚀

Ayer logramos mostrar un texto, pero los videojuegos no son solo texto estático, ¡necesitan movimiento! Para eso usaremos una herramienta llamada **Canvas** (un lienzo mágico) y un **Motor de Animación**.

El **Canvas en React** es simplemente la implementación del elemento nativo `<canvas>` de HTML5 dentro de un componente de React. Sirve como un lienzo digital que permite dibujar, renderizar gráficos 2D/3D y animar elementos dinámicamente meGUIAnte código.

1. 🎯 Abre `src/components/MiJuego.jsx`. En la terminal `npm run dev` y presiona `enter`, abre el navegador y en la barra de direcciones coloca `http://localhost:5173/` **Listos para codear**.
2. 🎯 Vamos a importar unas herramientas especiales de React llamadas `useEffect` y `useRef`. Cambia la primera línea por esto:

```js
import { useEffect, useRef } from "react";

function MiJuego() {
  //... resto del código
}
```

3. 🎯 Dentro de la función `MiJuego()` vamos a crear una variable `constante` que nombraremos `canvasRef`. Dentro de esta variable usaremos la herramienta `useRef()` de `react` y la iniciamos con un valor `null` que significa que esta variable no posee todavía ningún valor de referencia, no apunta a ningún dato.

```js
import { useEffect, useRef } from "react";

function MiJuego() {
  const canvasRef = useRef(null);
  // Resto del código...
}
```

4. 🎯 Vamos a renderizar nuestra variable usando el elemento `<canvas>` de HTML5. Dentro del `return()`
   agregamos el elemento `<canvas>` con sus propiedades.

```js
import { useEffect, useRef } from "react";

function MiJuego() {
  // Aquí pondremos nuestro "control remoto" para el lienzo
  const canvasRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Este es nuestro lienzo (Canvas) */}
      <canvas
        id="miJuegoCanvas"
        ref={canvasRef}
        width={670}
        height={500}
        className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black"
      />
    </div>
  );
}

export default MiJuego;
```

5. 🎯 Bien, ya react le puede decir a App.jsx que usaremos canvas y tenemos nuestro marco o lienzo para dibujar el juego.
   Ahora, vamos a usar la función de UseEffect() de `react` que nos ayudará a ejecutar efectos secundarios en nuestro juego.
   Dentro del `useEffect()` iniciaremos dos variables una de nombre `canvas` que hará referencia al elemento canvas y otra que llamaremos `ctx` que hará referencia al contexto 2D para poder dibujar en él.

```js
import { useEffect, useRef } from "react";

function MiJuego() {
  // Resto del código...

  useEffect(() => {
    // crearemos estas variables constantes
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  }, []);

  // Resto del código...
}

export default MiJuego;
```

6. 🎯 Dentro del `useEffect()` vamos a crear el bucle que se repetirá muchas veces por segundo y nos dará la apariencia de movimiento real.

```js
const bucleJuego = () => {
  // 1. Limpiamos el lienzo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Dibujamos un fondo oscuro por ahora
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 3. Dibujamos un texto de prueba
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px sans-serif";
  ctx.fillText("¡Motor en Marcha!", 50, 50);

  // Pedimos que se repita este dibujo muchas veces por segundo
 requestAnimationFrame(bucleJuego);
};
```

7. 🎯 Dentro del mismo useEffect(), fuera de la función `bucleJuego` ejecutamos la función `bucleJuego()`

```js
const bucleJuego = () => {
  //código función bucle juego
};
bucleJuego(); // ¡Arrancamos el motor!
```

8. 🎯 Cuidado! ahora el motor arrancó sin parar y aunque no lo vemos, en segundo plano se está reiniciando muchas veces creando bucles fantasmas, asi que debemos decirle que se detenga. y se inicie nuevamente, luego de hacer cambios.
   Para ello creamos una nueva variable constante `const` de nombre `animacionRef` que es diferente a una variable `const` con `let` le decimos a react que la variable puede cambiar su valor y su alcance es limitado dentro de la función donde se encuentra.  
   y retornamos `cancelAnimationFrame(animacionRef.current)`, le dicimos a React: "Cada vez que guarde un cambio y el componente se actualice, primero apaga el motor de animación anterior y luego enciende el nuevo".

```js
import { useEffect, useRef } from "react";

function MiJuego() {
  const canvasRef = useRef(null);
  const animacionRef = useRef(null); // 💥 NUEVO Guardamos el id de animación aquí

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Esto le indica al bucle que si no hay canvas se detenga

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Esto le indica al bucle que si no hay contexto se detenga

    /**************************************
      🔄️ BUCLE DEL JUEGO
    ************************************* */
    const bucleJuego = () => {
      // 1. Limpiar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Fondo
      ctx.fillStyle = "#192EE3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Texto
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.fillText("¡El Motor está en marcha!", 200, 250);

      //💥 NUEVO Siguiente frame
      animacionRef.current = requestAnimationFrame(bucleJuego);
    };
    /* ----------------------------------------------------
      Hasta acá el bucleJuego 👆
      ----------------------------------------------------*/
    //  bucleJuego();  // 💥 NUEVO cambiamos la ejecución del bucle por la referencia del id de la animación
    animacionRef.current = requestAnimationFrame(bucleJuego);

    /**************************************
      🧹🧼 LIMPIEZA: Limpiamos todo cuando el componente se desmonte para evitar fugas de memoria y errores raros 👇
    ************************************* */
    return () => {
      cancelAnimationFrame(animacionRef.current);
    };
  }, []);

  /**************************************
       RENDERIZADO HTML 👇
  ************************************* */
  return(
    //Resto del código
  )
}
export default MiJuego;
```

**El efecto Dominó**: requestAnimationFrame funciona como una fila de piezas de dominó: cada fotograma dibuja y coloca la siguiente pieza (animacionRef = requestAnimationFrame(...)).

**El freno de mano**: Cuando guardas un cambio en tu código, React ejecuta la función de limpieza `return () => cancelAnimationFrame(animacionRef)`. Esto equivale a retirar la última pieza de dominó justo antes de que caiga. La cadena se rompe, el bucle viejo se detiene por completo y Vite puede iniciar el nuevo bucle sin que se acumulen en memoria.

### ¿Qué acabamos de hacer? 🧐

- **`canvasRef`**: Es como un cable que conecta nuestro código con el lienzo de dibujo.
- **`ctx` (Contexto)**: Es nuestro pincel. Con él podemos decir "pinta un rectángulo" o "escribe un texto".
- **`requestAnimationFrame`**: ¡Es el corazón! Hace que el juego se redibuje unas 60 veces por segundo. ¡Es tan rápido que parece movimiento real!

**Mira tu navegador:** Deberías ver un cuadro negro grande con el texto "¡Motor en Marcha!". ¡Ya tenemos donde jugar! 🎮

🎯 Es hora de los Retos 🔗 [Enlace Reto tres](RETO-GUIA-TRES.md)

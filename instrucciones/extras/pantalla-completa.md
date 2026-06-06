# 🎮 EXTRA: Botón de Pantalla Completa (Fullscreen API)

## 🎯 Vamos a agregar un botón como los juegos reales:

* En PC → entra en fullscreen

* En móvil → pide fullscreen (si el navegador lo permite)

* El canvas se expande al máximo

* Tu resizeCanvas sigue funcionando perfecto

⭐ Paso 1: Crearemos en la carpeta `/utils` un archivo de nombre `pantallaCompleta.js` con una función de nombre `activarPantallaCompleta`. Copia y pega esta función dentro del archivo.

```js
export const activarPantallaCompleta = (elemento) => {
  if (!elemento) return;
  // 🕵️ Revisamos de forma segura si el navegador ya está en pantalla completa
  const estaEnFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
    
  // 🕵️ COMPROBACIÓN: ¿Ya hay alguna pantalla completa activa en el navegador?
  if (!estaEnFullscreen) {
    // CASO A: No hay pantalla completa -> MAXIMIZAMOS
    if (elemento.requestFullscreen) {
      elemento.requestFullscreen();
    } else if (elemento.webkitRequestFullscreen) {
      elemento.webkitRequestFullscreen(); // Safari / iOS
    } else if (elemento.msRequestFullscreen) {
      elemento.msRequestFullscreen(); // IE / Edge
    }
  } else {
    // CASO B: Ya está maximizado -> MINIMIZAMOS (Salimos de pantalla completa)
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari / iOS
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE / Edge
    }
  }
};
```
⭐ Paso 2: importamos la función en `MiJuego.jsx` 

```js
import { activarPantallaCompleta } from "../utils/pantallaCompleta";
```
⭐ Paso 3: importamos `ùseState` de react para luego crear un estado que nos ayude a decirle al juego que está en pantalla completa o no.

El estado UseState de React 

// Estado local exclusivo para la interfaz de usuario (UI), no interfiere con el bucle del juego
 ```js 
 // ⚡ Importamos useState desde React
 import { useState } from "react";
 
 // La función MiJuego...

 // ⚡Creamos el estado
 const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
 ```
 
 ⭐ Paso 4: Creamos una función que maneje el estado de pantalla completa, y lo actualice de ser necesario. Lo colocamos luego de la función `manejarToqueMovil` y el escuchador del evento `touchstart`.
```js
// Resto de la función...
// luego de:
  canvas.addEventListener("touchstart", manejarToqueMovil, { passive: false });

// ⚡Agregamos manejador para sincronizar de manera segura el icono del botón Fullscreen
    const manejarCambioFullscreen = () => {
      setEsPantallaCompleta(!!document.fullscreenElement);
      manejarResize();
    };

  // ⚡ Agregamos debajo el escuchador que vigila si jugador giró el celular o cambió al modo de pantalla completa para ajustar el tamaño usará esta nueva función
    document.addEventListener("fullscreenchange", manejarCambioFullscreen);
   
```

⭐ Paso 5: Limpiamos el fullscreen dentro del return de limpieza

```js 
  // Limpiamos el fullScreen dentro del return cleanup
document.removeEventListener("fullscreenchange", manejarCambioFullscreen);
```

⭐ Paso 6: Agregar el botón flotante dinámico en ```MiJuego.jsx``` encima del lienzo `<canvas>` usando la función que acabamos de importar:

 **📢 ¿Qué quiere decir que sea dinámico?** 
 Que siempre pregunta al estado, ¿estés en pantalla completa?, si la respuesta es si(true), se muestra un icono, de lo contrario se muestra otro icono. La función `activarPantallaCompleta` se encarga de todo lo demás.

```js

  {/* Botón flotante */}
   <button
    onClick={() => activarPantallaCompleta(contenedorRef.current)}
    className="text-xl absolute top-4 right-4 bg-black/20 text-white w-10 h-10 rounded-fuhover:bg-black/80 transition flex items-center justify-center z-20 pointer-events-auto"
    aria-label="Alternar pantalla completa"
  >
    {esPantallaCompleta ?  "◱"  : "⛶"}
  </button>

``` 
## 💥💥 Esto hace que tu resizeCanvas se ejecute automáticamente cuando:

* entras en fullscreen

* sales de fullscreen

* giras el celular

* cambias tamaño
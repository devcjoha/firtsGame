# 🛸 DESAFÍOS DE CÓDIGO: DÍA 5 🚀

# 💥💥💥¡Iniciamos la segunda semana, Coder! 💥💥💥

Ya tienes el motor de tu juego encendido, tu lienzo con un fondo espacial listo para dibujar e iniciamos la creación del jugador, la nave. Ahora, nuevamente es momento de poner a prueba tus nuevos superpoderes de programación con estos tres retos.

📢📢📢 **Recuerda**: Guarda los cambios en tu archivo ```MiJuego.jsx``` **recarga la página del navegador!** y observa cómo se actualiza tu pantalla en tiempo real. 

🎯 RETO 1: Personaliza al jugador (Cambio de color)

En la carpeta src hay una carpeta llamada `colors` con un archivo del mismo nombre, abre el archivo y verás una lista de colores con un valor `hexadecimal` se ven así `"#ffffff"`, esta es una de las formas en código para definir colores `"#ffffff"` es el color blanco. Fijate que cada color empieza con la palabra `export` eso quiere decir que ese color está disponible para ser usado en cualquier componente del proyecto.

**Tu Misión**: Cambia el color de la nave/jugador por uno de tu elección, prueba todos los que hay.

Cómo hacerlo: 
* En la parte superior de tu archivo ```MiJuego.jsx``` fuera de la función ```MiJuego()``` vamos a importar el archivo de colores para poder usarlo en ```MiJuego```:

```js
import { color } from "../colors/colors";
```

* **Por ejemplo** si quisiera importar el color violeta escribiría esto:
```js
import { violeta } from "../colors/colors";
```
*  Una vez importado, ya puedo usar el color violeta en cualquier parte del componente ```MiJuego```.

📌 Prueba todos los colores que hay. Recuerda importarlo antes de usarlo.


🎯 RETO 2: El Tamaño del Jugador(La Nave)


**Tu Misión**: Cambia el tamaño del jugador para que sea más ancho o más alto.

Cómo hacerlo: 

* Modifica el ancho y alto dentro del objeto `jugador`.
  * Hazlo más grande.
  * Hazlo más pequeño.


```js
 const jugador = {
    x: 100,         // Posición horizontal (empieza a la izquierda)
    y: 250,         // Posición vertical (cerca del suelo)
    ancho: 50,      // ⚡ Qué tan gordo es
    alto: 50,       // ⚡Qué tan alto es
    velocidad: 5,   // Cuántos píxeles se mueve por frame
    color: "#38bdf8" // Un color azul genial
  };
```

🎯 RETO 3: Mueve el Jugador(La Nave)

**Tu Misión**: Coloca el jugador en los lugares que te indico dentro del lienzo.
  * Esquina superior derecha.
  * Esquina inferior izquierda.
  * En el centro

  Cómo hacerlo: 
* Modifica la posición según el eje `x` y el eje `y` dentro del lienzo en el objeto `jugador`.

🎯 RETO 4: Ajusta la Velocidad del Héroe

¿Sientes que tu personaje se mueve muy lento o muy rápido por el espacio? ¡Tú eres el programador, tú decides las reglas físicas de este universo!

**Tu Misión**: Haz que el héroe se mueva el doble de rápido.

Cómo hacerlo: 
* Busca al inicio del componente la variable u objeto `jugador`. 
* Modifica el valor de la propiedad `velocidad`, selecciona el navegador y mueve las flechas hacia la derecha e izquierda.

📌 ¿Qué pasa si le pones velocidad `35`? ¿Y si le pones velocidad `1`? ¡Prueba varios números!


### 🧩¡Excelente trabajo! 🧩

## 💥¡Nos vemos mañana, Coder! 💥

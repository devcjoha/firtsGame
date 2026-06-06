# 🛸 DESAFÍOS DE CÓDIGO: DÍA 3 🚀

# 💥💥💥¡Felicidades, Coder! 💥💥💥

Ya tienes el motor de tu juego encendido y tu lienzo listo para dibujarlo. Ahora es momento de poner a prueba tus nuevos superpoderes de programación con estos tres retos.

**Recuerda**: Guarda los cambios en tu archivo ```MiJuego.jsx``` y observa cómo se actualiza tu pantalla en tiempo real. ¡Si algo se congela, **solo recarga la página del navegador!**

🎯 RETO 1: Personaliza tu Universo (Cambio de Colores)

Por defecto, nuestro espacio es de color azul muy oscuro (#0f172a). ¡Pero este es TU juego y tú decides cómo se ve el cosmos!

**Tu Misión**: Cambia el color de fondo del lienzo por un tono espacial diferente.

Cómo hacerlo: 
* Busca en tu función bucleJuego la propiedad que define el color del pincel antes de pintar el fondo:

- ctx.fillStyle = '#0f172a'; // Este es el color actual


📌 Prueba estas opciones o busca tu propio código de color hexadecimal en Google:

* Espacio Profundo (Negro absoluto): #000000

* Nebulosa de Cobre (Marrón rojizo): #8F6242

* Galaxia de Cobalto (Azul oscuro eléctrico): #192EE3

🎯 RETO 2: Tu Nombre en las Estrellas (Coordenadas y Fuentes)

Actualmente, el motor dibuja el texto "¡Motor en Marcha!" en la posición 
```horizontal x = 50 ```
y 
```vertical y = 50```.

**Tu Misión**: Cambia el mensaje para que muestre tu nombre como creador del juego y muévelo hacia el centro inferior del lienzo.

Cómo hacerlo: 

* Modifica el texto en la función ```ctx.fillText```:

```ctx.fillText('¡Juego creado por [Tu Nombre]!', X, Y);```


📌 Juega con los números de las coordenadas X e Y para colocarlo abajo en el centro. (Pista: El lienzo mide 800 de ancho por 500 de alto, así que una buena coordenada para el centro inferior podría estar cerca de ```x = 250, y = 450```).

📌 Extra: Cambia el tamaño de la letra modificando ```ctx.font = '20px sans-serif';``` por ```'24px monospace';``` para darle un estilo retro de computadora.


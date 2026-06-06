# 🛸 DESAFÍOS DE CÓDIGO: DÍA 4 🚀

# 💥💥💥¡Terminamos la primera semana, Coder! 💥💥💥

Ya tienes el motor de tu juego encendido y tu lienzo con un fondo espacial listo para dibujar. Ahora es momento de poner a prueba tus nuevos superpoderes de programación con estos tres retos.

**Recuerda**: Guarda los cambios en tu archivo ```MiJuego.jsx``` y observa cómo se actualiza tu pantalla en tiempo real. ¡Si algo se congela, **solo recarga la página del navegador!**

🎯 RETO 1: Personaliza tu Universo (Cambio de imagen)

En la carpeta assets hay varias imágenes bg(background) ¡Como este es TU juego y tú decides cómo se ve el cosmos! pruebalas todas y elige cuál de ellas te gusta.

**Tu Misión**: Cambia la imagen fondo del lienzo por una de tu elección.

Cómo hacerlo: 
* Busca en tu función bucleJuego la variable que define el fondo del lienzo:

  - `imagenFondo.src = ` 
* Dale la ruta o dirección a la carpeta:
  - `"./src/assets/nombredelarchivo.extension"`



📌 Prueba todas las opciones de bg que hay.


🎯 RETO 2: El Tamaño del Lienzo


**Tu Misión**: Cambia el tamaño del lienzo para que sea más ancho o más alto.

Cómo hacerlo: 

* Modifica el elemento canvas dentro de return() 

```js
<canvas
  ref={canvasRef}
  width={800}
  height={500}
  className="border-4 border-slate-700 rounded-lg shadow-2xl bg-black"
/>
```

📌 Si quieres que el lienzo se vea más grande, puedes cambiar el width y height del `<canvas>`.



## 💥¡Nos vemos la próxima semana, Coder ! 💥

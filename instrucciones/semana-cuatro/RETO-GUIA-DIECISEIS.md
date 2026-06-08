# 🎯 Reto Coder Hero del Día 16: El Director de Arte Espacial

¡Impresionante, goCoder! Tu videojuego ha dejado de ser un prototipo de laboratorio y ahora se ve como un juego listo para publicar. Como *Game Artist*, ahora tu misión es personalizar la identidad visual del proyecto.

### Tus tareas de hoy:

1. **Tu Nave Personalizada:** Busca una imagen de una nave, héroe o criatura en formato `.png` (es fundamental que tenga fondo transparente). Descárgala, ponle el nombre de `player-ship.png` y guárdala dentro de tu carpeta de proyecto en `src/assets/` reemplazando la que venía por defecto. ¡Mira cómo cambia la temática de tu juego de inmediato!
2. **Ajuste de Proporciones:** Entra al dibujo del jugador (`ctx.drawImage`) y experimenta modificando los dos últimos parámetros (por ejemplo, ponle `gamer.ancho + 10` o altera su alto) solo en la línea del dibujo. Observa cómo el sprite cambia de forma visual sin que su hitbox sólida de colisión se deforme o falle al tocar los bloques.
3. **Sincronía de Colores:** Modifica el color del núcleo brillante de la meta galáctica del Día 15 (el rectangulo interior del portal) para que combine armónicamente con los colores predominantes de tu nueva nave espacial[cite: 2].
4. Vamos a ver de una vez por todas como nuestro fondo nos acompaña hasta la meta, para ello, **Realiza el EXTRA para el fondo infinito**.

---

### 🧠 Pregunta para pensar de ingenieros de software:

Hoy implementamos un interruptor de seguridad (`jugadorSpriteCargado = true`) que se activa únicamente adentro de la función `.onload` de la imagen.

* Si nuestro ciclo de juego (`requestAnimationFrame`) intenta dibujar una imagen en el lienzo usando `ctx.drawImage()` antes de que el archivo termine de descargarse del disco o de internet, el navegador podría ignorar el comando o generar un error visual. ¿Por qué el uso de estas variables de control garantiza que el videojuego sea estable y nunca sufra caídas o pantallas en blanco en teléfonos de gama baja o conexiones lentas?

```
# 🛸 DESAFÍOS DE CÓDIGO: DÍA 8 🚀

# 🕹️ ¡Mejora la vista de tus botones! 🕹️

Ayer lograste ver el juego en tu móvil, ¡hoy ya lo controla por completo como un jugador profesional!

## 🎯 Tu Misión:

¡Darle un toque profesional los botones! En lugar de usar emojis de texto comunes, instalaremos y utilizaremos **Lucide React**, una biblioteca de iconos vectoriales que usan los desarrolladores profesionales en todo el mundo.

1. Abre la terminal de tu proyecto y agrega la biblioteca de iconos ejecutando:

```bash
   npm install lucide-react
```


Espera la que la instalación se complete.

2. Levanta tu servidor de juego como ayer usando `npm run dev -- --host`.
3. Ve al inicio de tu archivo MiJuego.jsx e importa los iconos estilizadas escribiendo esto justo debajo de tus otros imports:

```js
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Maximize2,
  Minimize2,
} from "lucide-react";
```

4. Ahora ve al final de tu código y reemplaza los iconos ⬅️➡️⬆️ tu bloque de return por esta estructura base y limpia. ¡Nota cómo los botones ahora albergan los componentes
   `<ArrowLeft />, <ArrowRight />` y `<ArrowUp />`!

```js
<ArrowLeft size={28} />
<ArrowRight size={28} />
<ArrowUp size={28} />
```

_Nota: si ya hiciste el extra de pantalla completa puedes agregar `Maximize2, Minimize2`._

5. **Dale Color y Personalidad**: Cambia las clases de Tailwind de los botones (`bg-blue-900/40`) para que combinen con la temática de tu juego. Puedes usar gradientes, bordes brillantes (`border-2 border-indigo-400`), o efectos de desenfoque (`backdrop-blur-sm`).
6. **Efecto de Pulsación**: Agrégales un estado activo llamativo usando la propiedad `active:` de Tailwind (Por ejemplo: `active:scale-95 active:bg-orange-500` o `active:shadow-neon`). ¡Que se sienta vivo al presionarlo!
7. **El Tamaño Ideal**: Prueba cambiando la propiedad `size={28}` dentro de las etiquetas de los iconos de Lucide (`ArrowLeft`, `ArrowRight`, `ArrowUp`) para que se acoplen perfectamente al tamaño de tu dedo.
8. Entra desde tu celular.
9. Prueba la agilidad de los nuevos botones en pantalla.

### 🏆 Condición de victoria del reto:

Camina hacia la izquierda, corre hacia la derecha y combina un botón de dirección con el botón de salto (⬆️) para hacer un **salto diagonal hacia adelante**. Si tu cuadrado azul logra saltar moviéndose fluidamente en tus manos... ¡El reto está superado!

## 🚀 ¡EL PODER ESTÁ EN TUS DEDOS! 🚀


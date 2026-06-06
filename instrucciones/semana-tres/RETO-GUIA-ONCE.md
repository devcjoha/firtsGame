## 🎯 Reto Coder Hero del Día: El Borde del Universo

Intenta cambiar el número `150` en la fórmula de la cámara por `250` o `canvas.width / 2`. ¿Qué pasa con la posición del personaje en la pantalla cuando corre? ¡Experimenta y descubre tu encuadre favorito!

_"¿Viste que el fondo se acaba y queda un espacio negro? ¡No te asustes! Tu personaje acaba de llegar al borde del universo conocido. En la próxima clase (Mañana), aprenderemos a duplicar el espacio y crear un mundo infinito."_

Para evitar que tu pantalla muestre ese vacío negro mientras aprendemos a hacer el mapa infinito en la próxima clase, modifica tu condicional de seguridad en el Paso 2 agregando un límite máximo para la cámara:

```JavaScript
// 🛑 Bloqueo de seguridad izquierdo (Ya lo tienes)
if (camaraX.current < 0) {
  camaraX.current = 0;
}

// ✨ NUEVO BLOQUEO DERECHO DEL RETO:
// Si la cámara intenta pasar de 0 (Ancho del Fondo 1000 - Ancho Pantalla 1000), la frenamos
if (camaraX.current > 0) {
  camaraX.current = 0; 
}
```

Pregunta para investigar: Si mañana nuestro mapa pasa a medir 3000 píxeles de ancho gracias a que duplicaremos las plataformas, ¿cuál debería ser el nuevo número límite para que la cámara no muestre el espacio negro del final? ¡La respuesta la programaremos mañana!

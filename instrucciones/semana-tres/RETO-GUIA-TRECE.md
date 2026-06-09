# 🎯 RETO-GUIA-TRECE.md

## 🎯 Reto Coder GoCoder del Día 13: El Desafío del Parkour

¡Ya tienes un motor físico que soporta plataformas flotantes! Ahora tu misión como programador y diseñador de niveles es crear un circuito de saltos ("parkour") que sea jugable pero desafiante.

### Tus tareas de hoy:

1. **El Gran Salto:** Modifica tu array de `obstaculos` en `MiJuego.jsx` para que las plataformas estén colocadas de forma consecutiva (como escaleras o rampas).
2. **Ajuste de Altura:** Modifica el valor `y` de al menos tres plataformas para que estén a diferentes alturas en el cielo. (Recuerda que mientras menor sea el valor de `y`, más arriba en la pantalla estará).
3. **Prueba de Jugabilidad:** Juega tu propio nivel. Si un salto es matemáticamente imposible de alcanzar porque la plataforma quedó muy lejos o muy alta, ajusta sus coordenadas `x` o `y` hasta que puedas completarlo sin caerte al suelo base.

### Pregunta para pensar de ingenieros de software:

En el código de hoy usamos la condición `gamer.y + gamer.alto <= bloque.y + 15`. ¿Por qué crees que le sumamos un margen de `15` píxeles en lugar de exigir que la posición sea exactamente igual (`==`) a `bloque.y`? ¿Qué pasaría con velocidades de caída muy altas si no tuviéramos ese margen?

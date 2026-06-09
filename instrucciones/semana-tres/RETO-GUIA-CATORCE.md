# 🎯 RETO-GUIA-CATORCE.md

## 🎯 Reto Coder GoCoder del Día 14: El Laberinto de Bloques y Techos Bajos

¡Impresionante! Has transformado un mundo de fantasmas en un universo con leyes físicas reales y sólidas. Ahora que las plataformas tienen paredes laterales y techos inferiores habitables, tu misión como diseñador de videojuegos es crear un área de **"Techo Bajo" o "Laberinto Exigente"**.

### Tus tareas de hoy:

1. **El Techo Desafiante:** Modifica tu lista de `obstaculos` en `MiJuego.jsx` y añade una plataforma alargada que flote bastante alta (por ejemplo, en `y: 150`). Justo debajo de ella, coloca otra plataforma más pequeña (por ejemplo, en `y: 320`). El espacio intermedio debe ser estrecho.
2. **Prueba de Cabeza:** Intenta saltar mientras estás en la plataforma intermedia. Si calculaste bien las alturas, tu personaje debería golpear su cabeza contra el techo superior, impidiéndote alcanzar la cima a menos que busques el borde para salir.
3. **El Bloqueo de Camino:** Coloca un obstáculo alto y vertical en tu mapa (con un `ancho: 40` y `alto: 200`). Intenta correr directamente hacia él para comprobar que el personaje efectivamente se frena por completo en el eje X y no puede atravesarlo.

---

### 🧠 Pregunta para pensar de ingenieros de software:

En el código de hoy calculamos el `traslapeX` y el `traslapeY` usando `Math.min()`.

¿Por qué crees que comparar cuál traslape es **más pequeño** nos ayuda a saber si el choque fue de lado (izquierdo/derecho) o vertical (arriba/abajo)? Si el jugador entra corriendo de lado a un bloque, ¿cuál de los dos traslapes será más pequeño en el instante exacto del impacto?

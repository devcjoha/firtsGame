# 🎯 RETO-GUIA-QUINCE.md

## 🎯 Reto goCoder del Día 15: Ubicación Estratégica de la Victoria

¡Fabuloso! Tu juego ya tiene una condición clara de victoria. Ahora, tu trabajo como desarrollador y diseñador de niveles es calibrar el juego para que la meta requiera verdadera destreza para ser alcanzada.

### Tus tareas de hoy:

1. **La Meta Flotante Exigente:** Actualmente la meta está en `y: 120`. Cambia su posición o el arreglo de tus `obstaculos` de modo que la meta quede justo encima de una plataforma muy alta y estrecha, obligando al jugador a realizar un salto milimétrico perfecto para poder tocarla.
2. **Mensaje Personalizado:** Modifica el texto del cartel de victoria en el HTML por una frase espacial épica inventada por ti (ej: *"¡Universo Salvado! Eres un Coder de Élite"*).

---

### 🧠 Pregunta para pensar de ingenieros de software:

¿Por qué usamos un estado de React (`useState`) para controlar la aparición del cartel de Victoria, pero usamos un `useRef` para manejar los datos de la posición de la Meta?

*Pista: Recuerda qué pasa con el rendimiento de nuestro bucle de juego continuo de 60 fotogramas por segundo cuando un estado cambia constantemente.*
## 🛠️ Resolución de la Fase 1: Análisis de los Experimentos

Este ejercicio es cualitativo. Debes notar cómo impacta la matemática al comportamiento del Canvas:

1. **El Planeta de Hielo (`friccion: 0.99`, `aceleracion: 0.1`):** * **Resolución:** El personaje se siente "pesado" al arrancar porque la aceleración es muy baja (tarda muchos fotogramas en llegar a la velocidad máxima). Al soltar el botón, como la fricción es casi 1, el juego apenas le resta velocidad por fotograma. El jugador experimentará un **deslizamiento infinito**, haciendo casi imposible frenar a tiempo.
2. **El Pantano Pegajoso (`friccion: 0.5`, `aceleracion: 4`):**
* **Resolución:** Aquí ocurre lo opuesto. Al presionar el botón, el personaje alcanza su velocidad máxima casi de inmediato (en solo 2 fotogramas). Pero al soltarlo, la velocidad se reduce a la mitad instantáneamente en cada fotograma (`vx *= 0.5`). El personaje **se frena en seco de forma robótica**, eliminando por completo el *Game Feel* suave.
3. **El Rompe-Barreras (`friccion: 0.90`, `velocidadMaxima: 20`):**
* **Resolución:** Al subir el límite de velocidad a 20 píxeles por fotograma, el personaje cruza el lienzo entero (`ANCHO_LOGICO = 1000`) en menos de un segundo. Los niños verán que el control se vuelve **inmanejable** y el héroe se "teletransporta" de un lado a otro, saliéndose de la pantalla antes de que puedan reaccionar.


---

## 📐 Resolución de la Fase 2: El "Punto de Seda" Recomendado

Aunque puedes dejar tus valores preferidos, el rango ideal de calibración para que el juego responda de forma ágil pero fluida en teclado y móvil es:

* `aceleracion`: Entre `0.6` y `1.2`
* `friccion`: Entre `0.80` y `0.88`
* `velocidadMaxima`: Entre `7` y `10`

---

## 💻 Resolución del Mini-Desafío Extra: El Código del "Turbo"

Para resolver el reto opcional sin romper la estructura base, los niños solo deben alterar temporalmente la propiedad `velocidadMaxima` dentro de las funciones de lectura del teclado que ya existen en su archivo `MiJuego.jsx`.

Así debe quedar la solución a nivel de código:

### 1. Modificación en `manejarKeyDown`

Buscan la función que detecta cuándo se presiona una tecla y añaden la condición para la tecla **Shift** (su nombre técnico en JavaScript es `"Shift"`):

```javascript
const manejarKeyDown = (evento) => {
  if (evento.key === "ArrowRight") jugador.current.moviendoDerecha = true;
  if (evento.key === "ArrowLeft") jugador.current.moviendoIzquierda = true;

  // 👇 ¡NUEVA LÍNEA PARA EL TURBO! 👇
  if (evento.key === "Shift") {
    jugador.current.velocidadMaxima = 12; // Aumentamos el límite de velocidad
  }

  if (
    (evento.key === " " || evento.key === "ArrowUp") &&
    !jugador.current.saltando
  ) {
    jugador.current.velocidadY = -15;
    jugador.current.saltando = true;
  }
};

```

### 2. Modificación en `manejarKeyUp`

Para que el turbo no sea infinito, al soltar la tecla **Shift** la velocidad máxima debe regresar a su estado original (`8`):

```javascript
const manejarKeyUp = (evento) => {
  if (evento.key === "ArrowRight") jugador.current.moviendoDerecha = false;
  if (evento.key === "ArrowLeft") jugador.current.moviendoIzquierda = false;

  // 👇 ¡NUEVA LÍNEA PARA APAGAR EL TURBO! 👇
  if (evento.key === "Shift") {
    jugador.current.velocidadMaxima = 8; // Regresa a la velocidad normal
  }
};

```

### DEPLOY  en github pages
### Paso 1: Ajustar las importaciones de las imágenes.
Las imágenes en src/assets y luego importadas en el componente
```js
import imagen from "./src/assets/imagen.png"

```
### Paso 2: Configurar el archivo vite.config

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:"/gocoder/"
});
```

### Paso 3: Configurar los Comandos de Publicación Automatizada

Para que nuestro juego suba a internet con un solo clic, utilizaremos una pequeña herramienta que automatiza todo el proceso. 

1. Abre tu terminal de VS Code y ejecuta el siguiente comando para instalar la herramienta de GitHub Pages:

```bash
npm install gh-pages --save-dev

```

2. Ahora, abre tu archivo `package.json` que está en la raíz de tu proyecto. Vamos a buscar la sección llamada `"scripts"` y agregaremos dos nuevas líneas mágicas al principio de esa lista.

Modifica tu sección de scripts para que quede exactamente así:

```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },

```

---

## 🚀 ¡Momento del Despegue: Publica tu Juego en Internet!

¡Felicidades, goCoder! Tu código ya está listo para ser compartido con todo el mundo. Sigue estos pasos finales en tu terminal para publicar el juego:

1. Asegúrate de haber guardado todos tus cambios en GitHub ejecutando en la terminal:
```bash
git add .
git commit -m "Configuración de deploy completada"
git push origin main

```


2. ¡Llegó el momento de la verdad! Ejecuta el comando de despliegue:
```bash
npm run deploy

```

3. **¿Qué está pasando detrás de escena?** `predeploy` compilará automáticamente todo tu código convirtiéndolo en una carpeta optimizada llamada `dist`. Después, `gh-pages` tomará esa carpeta y la subirá a una rama especial en tu repositorio de GitHub.
4. Abre tu navegador, ve a tu repositorio en GitHub, entra en **Settings ⚙️ -> Pages** y verás un mensaje que dice: *"Your site is live at..."* seguido de tu enlace personalizado. ¡Entra y prueba tu juego directamente desde internet!

---
¡Perfecto! Vamos a completar la guía añadiendo los pasos que deben hacer los niños directamente dentro de la plataforma de **GitHub** en la nube.

Aquí tienes la continuación exacta (la segunda parte del bloque) para que tus estudiantes configuren su repositorio y dejen el juego funcionando en internet:

---

## 🌐 Configuración Final en la Plataforma de GitHub

Una vez que la terminal ha terminado de subir los archivos con éxito, debemos darle el último vistazo a nuestro perfil de GitHub para asegurarnos de que la página web sea pública y use la rama correcta.

### Paso 4: Activar la Rama `gh-pages` en tu Repositorio

1. Entra a tu navegador web y abre tu cuenta de **GitHub**.
2. Ingresa a tu repositorio del juego (el que llamaste `gocoder`).
3. En la barra superior de pestañas del repositorio, haz clic en el ícono de la tuerca: **Settings ⚙️** (Configuración).
4. En el menú vertical de la izquierda, busca la sección **Code and automation** y haz clic en la opción **Pages**.
5. Dirígete al apartado **Build and deployment**.
6. Justo debajo, en la opción **Source**, asegúrate de que esté seleccionado *"Deploy from a branch"*.
7. En la opción **Branch** (Rama), cambia la que dice `main` o `none` por la nueva rama llamada **`gh-pages`** y mantén la carpeta en `/(root)`.
8. Haz clic en el botón **Save** (Guardar).

---

## 🚀 ¡Momento del Despegue: Tu Juego en Internet!

¡Felicidades, goCoder! Tu código ya está flotando en la red. 

1. Espera aproximadamente **1 o 2 minutos** para que los servidores de GitHub terminen de procesar tu Canvas de forma interna.
2. Refresca la página actual de tu navegador (`F5`).
3. En la parte superior de esa misma sección de **Pages**, aparecerá mágicamente un recuadro verde con un mensaje similar a este: 
   
   > 🔗 *Your site is live at:* `https://tu-usuario.github.io/gocoder/`

4. ¡Haz clic en ese enlace oficial! Tu juego se abrirá en una pestaña completamente nueva y funcional.

---

# 🎯 Reto Coder GoCoder del Día: ¡Comparte tu Creación con el Universo!

1. **Prueba de Enlace:** Copia el enlace oficial que te dio GitHub. Ábrelo en una pestaña de incógnito o compártelo en el chat de la clase para confirmar que tus compañeros y tu profesora puedan jugar tu misión espacial.
2. **Control de Calidad Móvil:** Escanea o escribe el enlace en tu teléfono inteligente o tablet. Comprueba si los botones táctiles y el sensor de salto responden de forma ágil y fluida. ¡Ya eres un desarrollador de videojuegos real con proyectos alojados en la nube!


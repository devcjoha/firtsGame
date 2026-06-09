# 💥💥💥BIENVENIDO CODER💥💥💥

### Preparando la PC

# GUIA 0 🚀

- Conceptos:
  1. ¿Qué es Nodejs y npm?. (Instalación).
  2. ¿Qué es Visual Estudio Code?. Instalación.
  3. ¿Qué es Git y qué es GitHub?
  4. ¿Qué es un navegador?
  5. ¿Qué es React, Vite y tailwind?
  6. Verificación (Checklist) de instalación.

  1.💻 **Node.js** es el entorno que nos permite ejecutar JavaScript en la computadora y gestionar las herramientas como React y Vite.

  💻**npm** (Node Package Manager) es el gestor de paquetes y dependencias predeterminado para Node.js. Funciona como una gigantesca tienda de software donde los programadores comparten y descargan herramientas o librerías de código abierto, evitando tener que "reinventar la rueda" en sus proyectos de JavaScript
  _ Instalación de Node.js ("el motor que nos deja usar herramientas").
  🔗 [Enlace instalación](https://nodejs.org/en/download/)
  _ Qué instalar: Versión LTS (Long Term Support) actual.

  📢 **Nota para la instalación: Durante el asistente de instalación en Windows, asegúrate de dejar marcadas todas las opciones por defecto (especialmente la de "Add to PATH").**

  📢 **Al instalar `Nodejs`, se instala `npm` automáticamente**

  2.💻 **Visual Estudio Code - VSC** es un editor de código fuente gratuito y de código abierto desarrollado por Microsofes un editor de código fuente gratuito y de código abierto desarrollado por Microsof
  Instalación de VS Code (nuestro editor espacial).

       🔗 [Enlace instalación VSC](https://code.visualstudio.com/download)

  3.💻 **¿Qué es Git?** es un sistema de control de versiones distribuido, gratuito y de código abierto. Fue creado por Linus Torvalds para rastrear los cambios en los archivos de un proyecto, permitiendo a varios desarrolladores colaborar sin riesgo de perder información o sobrescribir el trabajo de otros

      🔗 [Enlace instalación Git](https://git-scm.com/install/windows)

  Abre tu cuenta en **GitHub**.

  4.💻 ¿Qué es un navegador?
  Un navegador es un programa o aplicación que te permite acceder, interpretar y visualizar el contenido de Internet (páginas web, imágenes, videos). Traduce códigos (como HTML) para que puedas interactuar con ellos de forma visual y sencilla

  5.💻 **Vite** es una herramienta ultrarrápida para desarrollo web. Sirve para crear y compilar proyectos, destacando por su velocidad al actualizar cambios al instante.

  Creación del proyecto con Vite:
  - Abre la terminal en VSC `Ctrl + Ñ`.
    - escribe: `npm create vite@latest`.

  💻 Instalación de Tailwind CSS v4 (siguiendo la guía rápida)
  - En la terminal `npm install tailwindcss @tailwindcss/vite` y presiona enter.
  - Configura Tailwind para Vite: el archivo`vite.config` debería verse así.

  ```js
  import { defineConfig } from "vite";
  import tailwindcss from "@tailwindcss/vite";

  export default defineConfig({
    plugins: [tailwindcss()],
  });
  ```

````
🎯 Ejercicio:
6.💻 Verificación (Checklist) de instalación.
Una vez instalado todo, puedes hacer esta pequeña prueba rápida para comprobar que la computadora está lista, En la terminal:

* Escriba el comando: ```node -v``` y presione Enter. Debería aparecer un número de versión (ej. v20.x.x).
* Escriba el comando: ```npm -v``` y presione Enter. Debería aparecer otro número de versión (ej. 10.x.x).
* Escriba el comando: ```git --version``` y presione Enter. Debería aparecer algo como git version 2.x.x.

***¡Tu PC ya tiene todo lo necesario para iniciar la travesía!***
````

import MiJuego from "./components/MiJuego";
// import DiaDieciseis from "./components/completos/DiaDieciseis";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* <header className="mb-8 text-center"> */}
      {/* <div className="w-80 h-80"> */}
      {/* <img
            className="w-80 h-80 object-contain mx-auto mb-4"
            src="./src/assets/coder/dev-young-uno.png"
            alt="imagen Hero"
          /> */}
      {/* </div> */}
      {/* <h1 className="p-2 text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight sm:text-4xl"> */}
      {/* TITULO */}
      {/* El titulo de tu juego aquí
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Entorno de desarrollo React + Tailwind CSS + HTML5 Canvas
        </p> */}
      {/* </header> */}

      <main className="w-full max-w-screen flex items-center justify-center">
        {/* Renderizado de nuestro componente principal de juego */}
        <MiJuego />
        {/* <DiaDieciseis/> */}
      </main>

      <footer className="mt-2 text-center text-xs text-slate-500 ">
        &copy;{new Date().getFullYear()} Curso inicial para Jóvenes
        Desarrolladores. Creado por{" "}
        <a
          href="https://github.com/devcJoha"
          className="text-indigo-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          @devcJoha
        </a>
        . Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;

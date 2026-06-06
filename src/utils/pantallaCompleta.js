export const activarPantallaCompleta = (elemento) => {
  if (!elemento) return;
  // 🕵️ Revisamos de forma segura si el navegador ya está en pantalla completa
  const estaEnFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
  // 🕵️ COMPROBACIÓN: ¿Ya hay alguna pantalla completa activa en el navegador?
  if (!estaEnFullscreen) {
    // CASO A: No hay pantalla completa -> MAXIMIZAMOS
    if (elemento.requestFullscreen) {
      elemento.requestFullscreen();
    } else if (elemento.webkitRequestFullscreen) {
      elemento.webkitRequestFullscreen(); // Safari / iOS
    } else if (elemento.msRequestFullscreen) {
      elemento.msRequestFullscreen(); // IE / Edge
    }
  } else {
    // CASO B: Ya está maximizado -> MINIMIZAMOS (Salimos de pantalla completa)
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari / iOS
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE / Edge
    }
  }
};

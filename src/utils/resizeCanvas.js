// 📱 Adaptación a celulares - responsive

export function resizeCanvas(canvas, anchoLogico, altoLogico) {
  if (!canvas) return;

  const anchoVentana = window.innerWidth;
  const altoVentana = window.innerHeight;

  let anchoMaximo = anchoVentana;
  let altoMaximo;

  // 📱 Horizontal PC (ideal para jugar)
  if (anchoVentana > altoVentana && anchoVentana > anchoLogico) {
    altoMaximo = altoVentana - 120;  // margen mínimo
    anchoMaximo = anchoVentana;     // usar todo el ancho
  } else if (anchoVentana > altoVentana && altoVentana < altoLogico) {
    // 📱 Horizontal celular (menos ideal para jugar, pero al menos se ve bien)
    altoMaximo = altoVentana - 20;  // margen mínimo
    anchoMaximo = anchoVentana;     // usar todo el ancho
  }
  // 📱 Vertical
  else {
    altoMaximo = altoVentana - 120; // deja espacio para título
  }

  // 🎯 Mantener proporción exacta del mundo lógico
  const escala = Math.min(
    anchoMaximo / anchoLogico,
    altoMaximo / altoLogico
  );

  // 🎨 Tamaño visual (CSS)
  canvas.style.width = `${anchoLogico * escala}px`;
  canvas.style.height = `${altoLogico * escala}px`;

  // 🧱 Tamaño interno fijo (física estable)
  canvas.width = anchoLogico;
  canvas.height = altoLogico;
};

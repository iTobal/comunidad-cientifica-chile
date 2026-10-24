document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll(
    '.filtros-ciencia button'
  );

  const tarjetas = document.querySelectorAll(
    '.tarjeta-ciencia'
  );

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const categoriaSeleccionada =
        boton.dataset.categoria;

      botones.forEach((elemento) => {
        elemento.classList.remove('filtro-activo');
      });

      boton.classList.add('filtro-activo');

      tarjetas.forEach((tarjeta) => {
        const categoriaTarjeta =
          tarjeta.dataset.categoria;

        const mostrarTarjeta =
          categoriaSeleccionada === 'todas' ||
          categoriaTarjeta === categoriaSeleccionada;

        tarjeta.hidden = !mostrarTarjeta;
      });
    });
  });
});

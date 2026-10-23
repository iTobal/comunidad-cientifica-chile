document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('joinForm');

  if (joinForm) {
    joinForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Evita el 'Cannot POST /' y la recarga

      const formData = new FormData(joinForm);
      const datos = {
        nombre: formData.get('nombre')?.trim(),
        email: formData.get('email')?.trim(),
        area: formData.get('area')?.trim(),
        region: formData.get('region'),
        descripcion: formData.get('mensaje')?.trim()
      };

      if (!datos.nombre || !datos.email) {
        alert('Por favor, ingresa tu Nombre completo y Correo electrónico.');
        return;
      }

	  try {
	    const res = await fetch(apiUrl('/api/registro'), {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(datos)
        });

        const resultado = await res.json();

        if (res.ok) {
          alert('¡Solicitud registrada con éxito en PostgreSQL!');
          joinForm.reset();
        } else {
          alert('Error: ' + resultado.error);
        }
      } catch (err) {
        console.error('Error al conectar:', err);
        alert('Ocurrió un error al intentar conectar con el servidor.');
      }
    });
  }
});

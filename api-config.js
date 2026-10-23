// En producción reemplaza el valor por la URL pública de Render.
// Ejemplo: https://ccch-backend.onrender.com
window.API_BASE_URL = 'https://comunidad-cientifica-chile.onrender.com';

function apiUrl(path) {
  return `${window.API_BASE_URL}${path}`;
}

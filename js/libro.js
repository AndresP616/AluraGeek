import { getLibro, enviarLibro, deleteLibro } from './api.js';

// Seleccionar el modal y elementos de su contenido
const modal = document.getElementById("descripcion-modal");
const tituloLibro = document.getElementById("titulo-libro");
const autorLibro = document.getElementById("autor-libro");
const descripcionLibro = document.getElementById("descripcion-libro");
const cerrarModal = document.querySelector(".cerrar-modal");

// Función para renderizar los libros en el contenedor
async function renderCards() {
  const libros = await getLibro();
  const libroContainer = document.querySelector('#libro-container');

  // Limpiamos el contenedor antes de renderizar
  libroContainer.innerHTML = '';

  if (libros.length === 0) {
    libroContainer.innerHTML = '<p>No se han agregado libros.</p>';
    return;
  }

  // Iteramos sobre los libros y generamos las tarjetas
  libros.forEach(libro => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', libro.id);

    card.innerHTML = `
      <img src="/img/${libro.imagen}" alt="${libro.nombre}">
      <div class="card-container--info">
        <p class="book-title">${libro.nombre}</p>
        <p class="book-price">${libro.precio}</p>
        <img src="./img/trashIcon.png" alt="" class="delete-icon" data-id="${libro.id}">        
      </div>
    `;

    // Evento de clic para mostrar la descripción en el modal
    card.addEventListener('click', () => {
      tituloLibro.textContent = libro.nombre;
      autorLibro.textContent = `Autor: ${libro.autor || "Autor desconocido"}`;
      descripcionLibro.textContent = libro.descripcion || "Descripción no disponible.";
      modal.style.display = "flex";
    });

    // Evento de eliminación
    const deleteIcon = card.querySelector('.delete-icon');
    deleteIcon.addEventListener('click', async (event) => {
      event.stopPropagation();
      const libroId = libro.id;
      const success = await deleteLibro(libroId);
      if (success) {
        setTimeout(() => card.remove(), 200);
      }
    });

    libroContainer.appendChild(card);
  });
}

// Cerrar el modal al hacer clic en la 'X'
cerrarModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera de su contenido
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Capturar evento de envío de formulario para agregar un nuevo libro
document.querySelector('#form-agregar-libro').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nuevoLibro = {
    nombre: document.querySelector('#nombre-libro').value,
    autor: document.querySelector('#autor-libro').value,
    descripcion: document.querySelector('#descripcion-libro').value || 'Descripción del libro',
    imagen: document.querySelector('#imagen-libro').value,
    precio: document.querySelector('#precio-libro').value,
  };

  // Comprobar si el libro ya existe
  const libros = await getLibro(); 
  const libroExistente = libros.find(libro => libro.nombre === nuevoLibro.nombre);

  if (libroExistente) {
    alert('El libro ya está en la librería.');
    return; 
  }

  // Agregar libro si no existe
  const result = await enviarLibro(nuevoLibro);
  if (result) {
    renderCards(); // Actualizar la lista de libros
  }
});

// Llamada inicial para renderizar los libros cuando se carga la página
renderCards();

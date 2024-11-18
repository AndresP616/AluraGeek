// Selección del formulario y los inputs
const form = document.querySelector("#formularioProducto");
const nombreInput = document.querySelector("#nombreProducto");
const precioInput = document.querySelector("#precioProducto");
const imagenInput = document.querySelector("#imagenProducto");
const libroContainer = document.querySelector("#libro-container");

// Función para agregar el libro de manera dinámica
function agregarLibro(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto
  
  // Capturamos los valores de los inputs
  const nombre = nombreInput.value;
  const precio = precioInput.value;
  const imagen = imagenInput.value;

  // Verificar que los campos no estén vacíos
  if (!nombre || !precio || !imagen) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Crear un nuevo contenedor de tarjeta para el libro
  const card = document.createElement("div");
  card.classList.add("card");

  // Insertar la imagen
  const img = document.createElement("img");
  img.src = imagen;
  img.alt = nombre;
  card.appendChild(img);

  // Contenedor de la información
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-container--info");

  // Nombre del libro
  const nombreP = document.createElement("p");
  nombreP.textContent = nombre;
  cardInfo.appendChild(nombreP);

  // Contenedor de valor (precio y botón de eliminar)
  const cardValue = document.createElement("div");
  cardValue.classList.add("card-container--value");

  // Precio
  const precioP = document.createElement("p");
  precioP.textContent = precio;
  cardValue.appendChild(precioP);

  // Icono de eliminación
  const trashIcon = document.createElement("img");
  trashIcon.src = "img/trashIcon.png"; 
  trashIcon.alt = "Eliminar";
  trashIcon.addEventListener("click", () => {
    card.remove(); 
  });
  cardValue.appendChild(trashIcon);

  // Agregar el contenedor de valor al contenedor de la información
  cardInfo.appendChild(cardValue);

  // Agregar el contenedor de información a la tarjeta
  card.appendChild(cardInfo);

  // Agregar la tarjeta al contenedor principal de libros
  libroContainer.appendChild(card);

  // Limpiar los inputs después de agregar el libro
  nombreInput.value = "";
  precioInput.value = "";
  imagenInput.value = "";
}

// Añadir el escuchador de eventos al formulario
form.addEventListener("submit", agregarLibro);

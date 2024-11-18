// Obtener todos los libros
export async function getLibro() {
  try {
    const response = await fetch('http://localhost:3000/libro');
    if (!response.ok) {
      throw new Error('Error al obtener los libros');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Agregar un nuevo libro
export async function enviarLibro(data) {
  try {
    const response = await fetch("http://localhost:3000/libro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el libro");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

// Eliminar un libro
export async function deleteLibro(id) {
  try {
    const response = await fetch(`http://localhost:3000/libros`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el libro');
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
  }
}

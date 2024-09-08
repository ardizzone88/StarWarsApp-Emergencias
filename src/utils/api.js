const BASE_URL = "https://swapi.dev/api/people/";

export const fetchData = async () => {
  let allCharacters = [];
  let nextPage = BASE_URL; // Empezamos con la primera página

  try {
    while (nextPage) {
      const res = await fetch(nextPage);
      const data = await res.json();

      // Agregar los resultados de esta página a allCharacters
      allCharacters = [...allCharacters, ...data.results];

      // Actualizar nextPage con la URL de la próxima página (si existe)
      nextPage = data.next;
    }
    return allCharacters;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
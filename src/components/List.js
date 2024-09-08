import React, { useEffect, useState } from "react";
import "./CardStyles.css"; // Importar los estilos CSS para las tarjetas

// Función para obtener la imagen de un personaje basado en su ID
const getCharacterImage = (url) => {
  const id = url.match(/\/([0-9]*)\/$/)[1]; // Extraer el ID del personaje de la URL
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};

const fetchStarshipName = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.name;
  } catch (error) {
    console.error("Error fetching starship name:", error);
    return "Unknown Starship";
  }
};

export const List = ({ people }) => {
  const [starships, setStarships] = useState({});

  useEffect(() => {
    const fetchAllStarships = async () => {
      const starshipData = {};
      for (const person of people) {
        if (person.starships.length > 0) {
          starshipData[person.name] = await Promise.all(
            person.starships.map((url) => fetchStarshipName(url))
          );
        } else {
          starshipData[person.name] = [];
        }
      }
      setStarships(starshipData);
    };
    fetchAllStarships();
  }, [people]);

  return (
    <div className="row">
      {people.map((person) => (
        <div key={person.name} className="col-md-4 mb-4">
          <div className="card h-100 card-custom"> {/* Añadir clase card-custom */}
            <img
              src={getCharacterImage(person.url)}
              className="card-img-top"
              alt={person.name}
              onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg")} // Si la imagen no se carga, usar un placeholder
            />
            <div className="card-body">
              <h5 className="card-title">{person.name}</h5>
              <p className="card-text">
                <strong>Height:</strong> {person.height} cm
              </p>
              <p className="card-text">
                <strong>Mass:</strong> {person.mass} kg
              </p>
              <p className="card-text">
                <strong>Hair Color:</strong> {person.hair_color}
              </p>
              <p className="card-text">
                <strong>Eye Color:</strong> {person.eye_color}
              </p>
              {starships[person.name] && starships[person.name].length > 0 ? (
                <div>
                  <h6>Starships:</h6>
                  <ul>
                    {starships[person.name].map((starship, index) => (
                      <li key={index}>{starship}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No starships available</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
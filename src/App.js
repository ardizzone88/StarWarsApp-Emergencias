import React, { useEffect, useState } from "react";
import { List } from "./components/List";
import { fetchData } from "./utils/api";
import { Pagination } from "./components/Pagination";
import './components/CardStyles.css'; // Importar los estilos

function App() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carga
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData().then((response) => {
      setPeople(response);
      setFilteredPeople(response);
      setLoading(false); // Deja de mostrar el spinner cuando se cargan los datos
    });
  }, []);

  useEffect(() => {
    const result = people.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(result);
    setCurrentPage(1);
  }, [searchTerm, people]);

  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
  const currentPeople = filteredPeople.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">En una galaxia muy, muy lejana...</p>
        </div>
      ) : (
        <div className="container mt-4">
          <h1 className="text-center mb-4">Star Wars Characters - Emergencias Salud</h1>
          <div className="search-container mb-4 w-50 mx-auto">
          <input
    type="text"
    className="form-control search-input"
    placeholder="Search characters..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <i className="fas fa-search search-icon"></i> {/* Lupa a la derecha */}
          </div>
          <List people={currentPeople} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredPeople.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
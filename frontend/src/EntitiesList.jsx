import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  // Fetch entities from API
  const fetchEntities = () => {
    axios.get("http://localhost:6000/api/entities") // Adjust if needed
      .then(response => setEntities(response.data))
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  // Handle delete entity
  const handleDelete = (id) => {
    axios.delete(`http://localhost:6000/api/entities/${id}`)
      .then(() => {
        alert("Entity deleted successfully!");
        fetchEntities(); // Refresh list
      })
      .catch(error => console.error("Error deleting entity:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Entities List</h1>
      <button onClick={() => navigate("/add-entity")} style={{ marginBottom: "10px" }}>
        Add New Entity
      </button>
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <strong>{entity.name}</strong>: {entity.description} &nbsp;
            <button onClick={() => navigate(`/update-entity/${entity._id}`)}>Update</button>
            <button onClick={() => handleDelete(entity._id)} style={{ marginLeft: "5px", color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;

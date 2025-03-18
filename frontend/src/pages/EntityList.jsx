import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EntityList = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  // Fetch entities from the server
  const fetchEntities = async () => {
    try {
      const response = await axios.get("http://localhost:6000/api/entities"); // Change port if needed
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete an entity
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6000/api/entities/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Entities List</h1>
      <Link to="/add-entity">
        <button style={{ marginBottom: "10px" }}>Add New Entity</button>
      </Link>
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <strong>{entity.name}</strong>: {entity.description}
            <Link to={`/update-entity/${entity._id}`} style={{ marginLeft: "10px" }}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(entity._id)} style={{ marginLeft: "10px", color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;

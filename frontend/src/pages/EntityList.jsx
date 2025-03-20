import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UsersDropdown from "./UsersDropdown";

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchEntities();
  }, []);

  // Fetch all entities initially
  const fetchEntities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/entities"); // Change port if needed
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch entities based on selected user
  const fetchEntitiesByUser = async (userId) => {
    if (!userId) {
      fetchEntities(); // Load all entities if no user is selected
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/entities/${userId}`);
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching user-specific entities:", error);
    }
  };

  // Delete an entity
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/entities/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Entities List</h1>
      <UsersDropdown onSelectUser={(userId) => {
        setSelectedUser(userId);
        fetchEntitiesByUser(userId);
      }} />
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersDropdown from "../components/UsersDropdown"; // Import the dropdown

const EntityList = () => {
    const [entities, setEntities] = useState([]);
    const [selectedUser, setSelectedUser] = useState(""); // Track selected user
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch entities (with optional user filter)
    const fetchEntities = async (userId = "") => {
        try {
            const url = userId ? `http://localhost:5000/api/entities?user=${userId}` : "http://localhost:5000/api/entities";
            const response = await axios.get(url);
            setEntities(response.data);
        } catch (err) {
            setError("Error fetching data. Please try again.");
            console.error("Error fetching entities:", err);
        }
    };

    useEffect(() => {
        fetchEntities();
    }, [selectedUser]); // Refetch when user changes

    // Handle delete entity
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/entities/${id}`);
            alert("Entity deleted successfully!");
            fetchEntities(selectedUser); // Refresh with the current user filter
        } catch (err) {
            console.error("Error deleting entity:", err);
            setError("Failed to delete entity.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Entities List</h1>

            {/* User Selection Dropdown */}
            <UsersDropdown onSelectUser={setSelectedUser} />

            <button onClick={() => navigate("/add-entity")} style={{ marginBottom: "10px" }}>
                Add New Entity
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <ul>
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <li key={entity.id}>
                            <strong>{entity.name}</strong>: {entity.description} &nbsp;
                            <button onClick={() => navigate(`/update-entity/${entity.id}`)}>Update</button>
                            <button onClick={() => handleDelete(entity.id)} style={{ marginLeft: "5px", color: "red" }}>
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No entities found for the selected user.</p>
                )}
            </ul>
        </div>
    );
};

export default EntityList;

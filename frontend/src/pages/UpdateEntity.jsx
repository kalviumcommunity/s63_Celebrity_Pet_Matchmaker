import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEntity = () => {
  const { id } = useParams(); // Get the entity ID from the URL
  const navigate = useNavigate();
  const [entity, setEntity] = useState({ name: "", description: "" });

  // Fetch entity details
  useEffect(() => {
    fetch(`http://localhost:5000/entities/${id}`)
      .then((res) => res.json())
      .then((data) => setEntity(data))
      .catch((err) => console.error("Error fetching entity:", err));
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/entities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entity),
    });

    if (response.ok) {
      alert("Entity updated successfully!");
      navigate("/entities");
    } else {
      alert("Failed to update entity.");
    }
  };

  return (
    <div>
      <h2>Update Entity</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={entity.name}
          onChange={(e) => setEntity({ ...entity, name: e.target.value })}
          required
        />

        <label>Description:</label>
        <textarea
          value={entity.description}
          onChange={(e) => setEntity({ ...entity, description: e.target.value })}
          required
        ></textarea>

        <button type="submit">Update Entity</button>
      </form>
    </div>
  );
};

export default UpdateEntity;

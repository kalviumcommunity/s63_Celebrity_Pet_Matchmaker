import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6000/api/entities") // Change to 8000 if using Django
      .then(response => {
        setEntities(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Entities List</h1>
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <strong>{entity.name}</strong>: {entity.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

const UsersDropdown = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Ensure API is correct
        if (!response.ok) throw new Error("Failed to fetch users");
        
        const data = await response.json();
        console.log("Fetched Users:", data); // ✅ Debugging log

        if (data.length === 0) {
          setError("No users available. Please add users.");
        } else {
          setUsers(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <select onChange={(e) => onSelectUser(e.target.value)} defaultValue="">
          <option value="" disabled>Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default UsersDropdown;

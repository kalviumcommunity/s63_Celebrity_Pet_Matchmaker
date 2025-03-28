import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/authContext";

const UsersDropdown = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Log the current user for debugging
  useEffect(() => {
    console.log("Current User from AuthContext:", currentUser);
  }, [currentUser]);

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
          
          // If current user exists and is in the user list, preselect them
          if (currentUser && currentUser.id) {
            const userExists = data.some(user => user.id === currentUser.id);
            if (userExists) {
              setSelectedUserId(currentUser.id);
              onSelectUser(currentUser.id);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
        
        // Fallback: Use hardcoded users when API fails
        console.log("Using fallback users");
        const fallbackUsers = [
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "testuser", username: "testuser" }
        ];
        setUsers(fallbackUsers);
        
        // If current user exists, try to find it in fallback users
        if (currentUser) {
          console.log("Looking for current user in fallback users:", currentUser);
          // Try to match by username or id
          const matchedUser = fallbackUsers.find(
            user => (user.username && user.username === currentUser.username) || 
                   (currentUser.id && user.id === currentUser.id)
          );
          
          if (matchedUser) {
            console.log("Found current user in fallback users:", matchedUser);
            setSelectedUserId(matchedUser.id);
            onSelectUser(matchedUser.id);
          } else if (fallbackUsers.length > 0) {
            // If no match, select the first user
            console.log("No match found, selecting first fallback user");
            setSelectedUserId(fallbackUsers[0].id);
            onSelectUser(fallbackUsers[0].id);
          }
        } else if (fallbackUsers.length > 0) {
          // If no current user, select the first user
          setSelectedUserId(fallbackUsers[0].id);
          onSelectUser(fallbackUsers[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, onSelectUser]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  return (
    <div>
      {/* Always show the dropdown, regardless of loading or error state */}
      <select 
        onChange={handleUserChange} 
        value={selectedUserId || ""}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #e0e0e0",
          fontSize: "1rem",
          outline: "none"
        }}
        disabled={loading}
      >
        <option value="" disabled>
          {loading ? "Loading users..." : error ? "Error: " + error : "Select User"}
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} {currentUser && user.id === currentUser.id ? "(You)" : ""}
          </option>
        ))}
      </select>
      {/* Show loading or error message below the dropdown */}
      {loading && (
        <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: "#666" }}>
          Loading users...
        </p>
      )}
      {error && !loading && users.length === 0 && (
        <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

// PropTypes validation
UsersDropdown.propTypes = {
  onSelectUser: PropTypes.func.isRequired
};

export default UsersDropdown;
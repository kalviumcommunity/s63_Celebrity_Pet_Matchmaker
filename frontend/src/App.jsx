import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import MyComponent from "./MyComponent";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntityList from "./pages/EntityList"; 
import "./pages/LandingCss.css";

function NotFound() {
  return <h2 style={{ textAlign: "center", color: "red" }}>404 - Page Not Found</h2>;
}

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users"); // Adjust API URL
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/add-entity" style={{ marginRight: "15px" }}>Add Entity</Link>

          {/* User Selection Dropdown */}
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            style={{ marginLeft: "15px" }}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {/* Button to fetch user's entities */}
          {selectedUser && (
            <Link to={`/entities/${selectedUser}`} style={{ marginLeft: "10px" }}>
              <button>View Entities</button>
            </Link>
          )}
        </nav>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entities" element={<EntityList />} />
          <Route path="/entities/:userId" element={<EntityList />} /> {/* Filtered list */}
          <Route path="/add-entity" element={<AddEntity />} />
          <Route path="/update-entity/:id" element={<UpdateEntity />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>

        {/* Additional Component */}
        <MyComponent />
      </div>
    </Router>
  );
}

export default App;

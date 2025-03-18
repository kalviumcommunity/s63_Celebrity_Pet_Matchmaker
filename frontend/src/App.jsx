import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyComponent from "./MyComponent";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntityList from "./pages/EntityList"; // Ensure this file exists
import "./pages/LandingCss.css";

function NotFound() {
  return <h2 style={{ textAlign: "center", color: "red" }}>404 - Page Not Found</h2>;
}

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/add-entity" style={{ marginRight: "15px" }}>Add Entity</Link>
        </nav>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entities" element={<EntityList />} />
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

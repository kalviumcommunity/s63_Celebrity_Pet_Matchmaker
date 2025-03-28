import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import LandingPage from "./pages/LandingPage";
import MyComponent from "./MyComponent";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntityList from "./pages/EntityList"; 
import Login from "./pages/Login";
import MysteryPetGenerator from "./pages/MysteryPetGenerator";
import { AuthProvider, AuthContext } from "./context/authContext";
import "./pages/LandingCss.css";

// Import new pages for the required features
import PetQuiz from "./pages/PetQuiz";
import PetGallery from "./pages/PetGallery";
import VirtualPet from "./pages/VirtualPet";
import ARMode from "./pages/ARMode";
import Leaderboard from "./pages/Leaderboard";
import Adoption from "./pages/Adoption";

function NotFound() {
  return <h2 style={{ textAlign: "center", color: "red" }}>404 - Page Not Found</h2>;
}

// Auto Login Component for Testing
function AutoLogin() {
  const { login, user } = useContext(AuthContext);
  
  useEffect(() => {
    // Only attempt login if not already logged in
    if (!user) {
      console.log("AutoLogin: Attempting to log in with test user");
      login("testuser").then(() => {
        console.log("AutoLogin: Login successful");
      }).catch(error => {
        console.error("AutoLogin: Login failed", error);
      });
    } else {
      console.log("AutoLogin: User already logged in", user);
    }
  }, [login, user]);
  
  return null; // This component doesn't render anything
}

function App() {
  // Global state for selected user (if needed across components)
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <AuthProvider>
      <Router>
        <div>
          {/* Auto Login Component - Disabled to allow manual login after logout */}
          {/* <AutoLogin /> */}
          
          {/* Application Routes */}
          <Routes>
            <Route path="/" element={<LandingPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mystery-pet" element={<MysteryPetGenerator />} />
            <Route path="/entities" element={<EntityList />} />
            <Route path="/entities/:userId" element={<EntityList />} /> {/* Filtered list */}
            <Route path="/add-entity" element={<AddEntity />} />
            <Route path="/update-entity/:id" element={<UpdateEntity />} />
            
            {/* New feature routes */}
            <Route path="/pet-quiz" element={<PetQuiz />} />
            <Route path="/pet-gallery" element={<PetGallery />} />
            <Route path="/virtual-pet" element={<VirtualPet />} />
            <Route path="/ar-mode" element={<ARMode />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/adoption" element={<Adoption />} />
            
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
          </Routes>

          {/* Additional Component */}
          <MyComponent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

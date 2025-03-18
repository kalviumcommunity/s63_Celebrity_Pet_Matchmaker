import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import MyComponent from "./Mycomponent";
import AddEntity from "./pages/AddEntity";

import "./pages/LandingCss.css";

function App() {
  return (
    <div>
      <LandingPage />
      <MyComponent /> 
      <AddEntity /> {/* AddEntity Form Component */}
    </div>
  );
}

export default App;

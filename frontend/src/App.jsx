import { useState } from "react";

const LandingPage = () => {
  const [image, setImage] = useState(null);
  const [traits, setTraits] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log("Uploaded Image:", image);
    console.log("Personality Traits:", traits);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", padding: "20px", backgroundColor: "#e0f7fa", minHeight: "100vh", width: "100vw" }}>
      <div style={{ width: "90%", maxWidth: "600px", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#006064", fontSize: "2em", marginBottom: "10px" }}>Celebrity Pet Matchmaker</h1>
        <p style={{ color: "#004d40", fontSize: "1.2em", marginBottom: "20px" }}>Upload a selfie and describe yourself to find your celebrity pet match!</p>
        <label style={{ display: "inline-block", padding: "10px 15px", backgroundColor: "#00838f", color: "white", borderRadius: "5px", cursor: "pointer", marginBottom: "10px" }}>
          Choose File
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        </label>
        {image && <img src={image} alt="Preview" style={{ width: "150px", height: "150px", borderRadius: "50%", marginTop: "10px", border: "3px solid #00838f" }} />}
        <textarea
          placeholder="Describe your personality..."
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
          style={{ display: "block", margin: "10px auto", width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "2px solid #00838f", backgroundColor: "#f5f5f5", color: "#004d40", resize: "none" }}
        ></textarea>
        <button 
          onClick={handleSubmit} 
          style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer", backgroundColor: "#006064", color: "white", border: "none", borderRadius: "5px", fontSize: "1em", width: "100%" }}
        >
          Find My Match
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

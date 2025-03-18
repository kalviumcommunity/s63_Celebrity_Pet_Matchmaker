import { useState } from "react";

function AddEntity() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submittedData, setSubmittedData] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]); // Store data
    setFormData({ name: "", email: "" }); // Reset form fields
  };

  return (
    <div>
      <h2>Add Entity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Entity</button>
      </form>

      {/* Display Submitted Data */}
      <h3>Submitted Entities</h3>
      <ul>
        {submittedData.map((data, index) => (
          <li key={index}>
            <strong>Name:</strong> {data.name}, <strong>Email:</strong> {data.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddEntity;

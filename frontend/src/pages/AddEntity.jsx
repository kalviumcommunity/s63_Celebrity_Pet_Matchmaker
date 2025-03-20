import { useState } from "react";
import UsersDropdown from "./UsersDropdown";

function AddEntity() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // ✅ Store selected user

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle User Selection
  const handleUserSelect = (userId) => {
    console.log("User selected:", userId);
    setSelectedUser(userId);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Prevent submission if no user is selected
    if (!selectedUser) {
      alert("Please select a user before adding an entity!");
      return;
    }

    // ✅ Store data with selected user
    setSubmittedData([...submittedData, { ...formData, userId: selectedUser }]);
    setFormData({ name: "", email: "" }); // Reset form fields
  };

  return (
    <div>
      <h2>Add Entity</h2>
      
      {/* ✅ Users Dropdown */}
      <UsersDropdown onSelectUser={handleUserSelect} />

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
            <strong>Name:</strong> {data.name}, <strong>Email:</strong> {data.email}, <strong>User ID:</strong> {data.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddEntity;

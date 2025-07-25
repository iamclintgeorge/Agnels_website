import React, { useState } from "react";
import axios from "axios";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    academicDetails: "",
    address: "",
    dateOfBirth: "",
  });
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDocumentsChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (photo) {
      data.append("photo", photo);
    }
    documents.forEach((doc, index) => {
      data.append("documents", doc);
    });

    try {
      const response = await axios.post("/api/admission/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Application submitted successfully.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        academicDetails: "",
        address: "",
        dateOfBirth: "",
      });
      setPhoto(null);
      setDocuments([]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Error submitting the application."
      );
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Admission Application Form</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Academic Details:</label>
          <textarea
            name="academicDetails"
            value={formData.academicDetails}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div>
          <label>Documents (PDF, images):</label>
          <input
            type="file"
            name="documents"
            accept="application/pdf,image/*"
            multiple
            onChange={handleDocumentsChange}
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default AdmissionForm;

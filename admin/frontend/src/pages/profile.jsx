import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/useAuthCheck";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic"); // Default tab
  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    areasOfSpecialization: [],
    subjectsTaught: [],
    resume: null,
    publications: null,
    papersPresented: [{ title: "", link: "" }],
    researchProjects: [{ title: "", link: "" }],
  });
  const [message, setMessage] = useState("");

  // Load initial user data
  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        emailId: user.emailId || "",
        areasOfSpecialization: user.areasOfSpecialization || [],
        subjectsTaught: user.subjectsTaught || [],
        resume: null,
        publications: null,
        papersPresented: user.papersPresented || [{ title: "", link: "" }],
        researchProjects: user.researchProjects || [{ title: "", link: "" }],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (e, field, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedList = [...prev[field]];
      updatedList[index][name] = value;
      return { ...prev, [field]: updatedList };
    });
  };

  const handleAddItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], { title: "", link: "" }],
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("emailId", formData.emailId);
    data.append(
      "areasOfSpecialization",
      JSON.stringify(formData.areasOfSpecialization)
    );
    data.append("subjectsTaught", JSON.stringify(formData.subjectsTaught));
    if (formData.resume) data.append("resume", formData.resume);
    if (formData.publications)
      data.append("publications", formData.publications);
    data.append("papersPresented", JSON.stringify(formData.papersPresented));
    data.append("researchProjects", JSON.stringify(formData.researchProjects));

    try {
      const response = await axios.put(
        "http://localhost:3663/api/profile",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(error.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            type="button"
            className={`p-2 flex-1 ${
              activeTab === "basic" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </button>
          <button
            type="button"
            className={`p-2 flex-1 ${
              activeTab === "specialization" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("specialization")}
          >
            Areas of Specialization
          </button>
          <button
            type="button"
            className={`p-2 flex-1 ${
              activeTab === "subjects" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            Subjects Taught
          </button>
          <button
            type="button"
            className={`p-2 flex-1 ${
              activeTab === "papers" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("papers")}
          >
            Papers Presented
          </button>
          <button
            type="button"
            className={`p-2 flex-1 ${
              activeTab === "projects" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Research Projects
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
            </div>
          )}
          {activeTab === "specialization" && (
            <div>
              <label>Areas of Specialization (comma-separated)</label>
              <input
                type="text"
                value={formData.areasOfSpecialization.join(", ")}
                onChange={(e) => handleArrayChange(e, "areasOfSpecialization")}
                className="border p-2 w-full"
              />
            </div>
          )}
          {activeTab === "subjects" && (
            <div>
              <label>Subjects Taught (comma-separated)</label>
              <input
                type="text"
                value={formData.subjectsTaught.join(", ")}
                onChange={(e) => handleArrayChange(e, "subjectsTaught")}
                className="border p-2 w-full"
              />
            </div>
          )}
          {activeTab === "papers" && (
            <div>
              <label>Papers Presented</label>
              {formData.papersPresented.map((paper, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    name="title"
                    value={paper.title}
                    onChange={(e) =>
                      handleListChange(e, "papersPresented", index)
                    }
                    placeholder="Title"
                    className="border p-2 flex-1"
                  />
                  <input
                    type="url"
                    name="link"
                    value={paper.link}
                    onChange={(e) =>
                      handleListChange(e, "papersPresented", index)
                    }
                    placeholder="Link"
                    className="border p-2 flex-1"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("papersPresented")}
                className="text-blue-500"
              >
                + Add Paper
              </button>
            </div>
          )}
          {activeTab === "projects" && (
            <div>
              <label>Research Projects</label>
              {formData.researchProjects.map((project, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    name="title"
                    value={project.title}
                    onChange={(e) =>
                      handleListChange(e, "researchProjects", index)
                    }
                    placeholder="Title"
                    className="border p-2 flex-1"
                  />
                  <input
                    type="url"
                    name="link"
                    value={project.link}
                    onChange={(e) =>
                      handleListChange(e, "researchProjects", index)
                    }
                    placeholder="Link"
                    className="border p-2 flex-1"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("researchProjects")}
                className="text-blue-500"
              >
                + Add Project
              </button>
            </div>
          )}
        </div>

        {/* Standalone File Uploads */}
        <div className="space-y-4">
          <div>
            <label>Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Publications (PDF)</label>
            <input
              type="file"
              name="publications"
              accept=".pdf"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Profile;

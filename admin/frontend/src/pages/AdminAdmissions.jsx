import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminAdmissions = () => {
  const [applications, setApplications] = useState([]);
  const [sectionKey, setSectionKey] = useState("admission_process");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const admissionSections = [
    { key: "admission_process", label: "Admission Process" },
    { key: "admission_undergraduate", label: "Under Graduate" },
    { key: "admission_postgraduate", label: "Post Graduate" },
    { key: "admission_phd", label: "PhD" },
    { key: "admission_fee_payment", label: "Fee Payment" },
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/admission", {
          withCredentials: true,
        });
        setApplications(response.data || []);
      } catch (err) {
        setError("Error fetching admission applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const fetchSection = async (key) => {
    try {
      const res = await axios.get(
        `http://localhost:3663/api/admissions/sections/${encodeURIComponent(key)}`,
        { withCredentials: true }
      );
      const contentData = res.data?.content || {};
      // Convert JSON content to readable text for editing
      if (contentData.content) {
        setContent(contentData.content);
      } else {
        setContent(JSON.stringify(contentData, null, 2));
      }
    } catch (e) {
      console.error(e);
      setContent("");
    }
  };

  useEffect(() => {
    fetchSection(sectionKey);
  }, [sectionKey]);

  const saveSection = async () => {
    try {
      // Save as simple content structure
      const contentToSave = { content: content };
      await axios.put(
        `http://localhost:3663/api/admissions/sections/${encodeURIComponent(sectionKey)}`,
        contentToSave,
        { withCredentials: true }
      );
      alert("Section saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save section");
    }
  };

  const deleteSection = async () => {
    if (!window.confirm("Delete this section content? This cannot be undone.")) return;
    try {
      await axios.delete(
        `http://localhost:3663/api/admissions/sections/${encodeURIComponent(sectionKey)}`,
        { withCredentials: true }
      );
      setContent("");
      alert("Section deleted successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to delete section");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Applications Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Admission Applications</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {applications.length === 0 ? (
            <p className="text-gray-600">No admission applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Course</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{app.id}</td>
                      <td className="border border-gray-200 px-4 py-2">{app.name}</td>
                      <td className="border border-gray-200 px-4 py-2">{app.email}</td>
                      <td className="border border-gray-200 px-4 py-2">{app.phone}</td>
                      <td className="border border-gray-200 px-4 py-2">{app.course}</td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(app.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Content Management Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Admissions Content Management</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Section:
            </label>
            <select
              value={sectionKey}
              onChange={(e) => setSectionKey(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
            >
              {admissionSections.map((section) => (
                <option key={section.key} value={section.key}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content:
            </label>
            <ReactQuill value={content} onChange={setContent} theme="snow" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveSection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Save Section
            </button>
            <button
              onClick={deleteSection}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Delete Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdmissions;

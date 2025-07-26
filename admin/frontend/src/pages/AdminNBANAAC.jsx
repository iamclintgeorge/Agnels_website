import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNBANAAC = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [homeContent, setHomeContent] = useState("");
  const [homeFiles, setHomeFiles] = useState([]);
  const [homePdf, setHomePdf] = useState(null); // Separate state for PDF
  const [nbaFiles, setNbaFiles] = useState([]);
  const [naacFiles, setNaacFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setHomeFiles([]);
    setHomePdf(null);
    setNbaFiles([]);
    setNaacFiles([]);
    setFileInputKey(Date.now());
  };

  const handleHomeSubmit = async (e) => {
    e.preventDefault();
    if (!homeContent) {
      toast.error("Please enter content for Home section.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("content", homeContent);
    homeFiles.forEach((file) => formData.append("files", file));
    if (homePdf) formData.append("files", homePdf); // Add PDF to files

    try {
      const response = await axios.post(
        "http://localhost:3663/api/nba-naac/home",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setHomeContent("");
      setHomeFiles([]);
      setHomePdf(null);
      setFileInputKey(Date.now());
    } catch (error) {
      toast.error(error.response?.data?.error || "Error saving Home content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSubmit = async (e, section) => {
    e.preventDefault();
    const files = section === "NBA" ? nbaFiles : naacFiles;
    if (files.length === 0) {
      toast.error(`Please select files for ${section}.`);
      return;
    }

    setIsSubmitting(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("section", section);
      formData.append("file", file);
      formData.append("fileTitle", file.name);

      try {
        const response = await axios.post(
          "http://localhost:3663/api/nba-naac/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(
          error.response?.data?.error || `Error uploading ${section} file`
        );
      }
    }
    setNbaFiles([]);
    setNaacFiles([]);
    setFileInputKey(Date.now());
    setIsSubmitting(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NBA/NAAC Admin Panel</h1>
      <div className="flex gap-4 mb-8">
        {["Home", "NBA", "NAAC"].map((section) => (
          <button
            key={section}
            onClick={() => handleSectionChange(section)}
            className={`py-2 px-4 rounded ${
              activeSection === section
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-blue-800"
            } hover:bg-blue-500 hover:text-white transition`}
            disabled={isSubmitting}
          >
            {section}
          </button>
        ))}
      </div>

      {activeSection === "Home" && (
        <form onSubmit={handleHomeSubmit} className="max-w-lg">
          <h2 className="text-2xl font-medium mb-4">Home Content</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              value={homeContent}
              onChange={(e) => setHomeContent(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Enter text content for Home section"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Images</label>
            <input
              key={`${fileInputKey}-images`}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={(e) => setHomeFiles([...e.target.files])}
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Upload PDF (Optional)
            </label>
            <input
              key={`${fileInputKey}-pdf`}
              type="file"
              accept="application/pdf"
              onChange={(e) => setHomePdf(e.target.files[0])}
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {activeSection === "NBA" && (
        <form onSubmit={(e) => handleFileSubmit(e, "NBA")} className="max-w-lg">
          <h2 className="text-2xl font-medium mb-4">NBA Files</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Upload Videos, Photos, or PDFs
            </label>
            <input
              key={fileInputKey}
              type="file"
              accept="video/mp4,image/jpeg,image/png,application/pdf"
              multiple
              onChange={(e) => setNbaFiles([...e.target.files])}
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {activeSection === "NAAC" && (
        <form
          onSubmit={(e) => handleFileSubmit(e, "NAAC")}
          className="max-w-lg"
        >
          <h2 className="text-2xl font-medium mb-4">NAAC Files</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Upload Videos, Photos, or PDFs
            </label>
            <input
              key={fileInputKey}
              type="file"
              accept="video/mp4,image/jpeg,image/png,application/pdf"
              multiple
              onChange={(e) => setNaacFiles([...e.target.files])}
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminNBANAAC;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ComputerAssociation = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch PDFs when the component mounts
  useEffect(() => {
    console.log("Fetching PDFs...");
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    console.log("fetchPdfs called");
    try {
      const response = await axios.get(
        "http://localhost:3663/api/department/computer-engineering/association"
      );
      console.log("Fetched PDFs:", response.data);
      setPdfs(response.data);
    } catch (err) {
      console.error("Error loading PDFs:", err);
      toast.error("Error fetching PDFs");
    }
  };

  // Handle the file change for PDF upload
  const handleFileChange = (e) => {
    console.log("File selected:", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  // Handle the upload action
  const handleUpload = async (e) => {
    e.preventDefault();

    // Basic validation before proceeding
    if (!file || !title) {
      console.log("Validation failed: no file or title");
      toast.error("Please select a PDF file and provide a title");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", title);

    setUploading(true);
    console.log("Uploading PDF...");

    try {
      // Upload the PDF
      const uploadResponse = await axios.post(
        "http://localhost:3663/api/department/computer-engineering/association",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("PDF uploaded successfully:", uploadResponse.data);

      // Show success feedback
      toast.success("PDF uploaded successfully");

      // Reset form fields
      setFile(null);
      setTitle("");

      // Refetch PDFs after upload
      console.log("Refetching PDFs after upload...");
      await fetchPdfs(); // Make sure PDFs are updated in the state
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading PDF");
    } finally {
      setUploading(false); // Reset the uploading state
      console.log("Upload process complete.");
    }
  };

  // Handle delete action for PDF
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    console.log("Deleting PDF with id:", id);
    try {
      await axios.delete(
        `http://localhost:3663/api/department/computer-engineering/association/${id}`
      );
      toast.success("PDF deleted successfully");
      fetchPdfs(); // Fetch updated PDFs after deletion
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting PDF");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Computer - Association</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">PDF Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter PDF title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={uploading} // Disable button while uploading
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {/* Display PDFs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <a
                  href={`http://localhost:3663${pdf.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {pdf.title}
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(pdf.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No PDFs available.</p>
        )}
      </div>
    </div>
  );
};

export default ComputerAssociation;

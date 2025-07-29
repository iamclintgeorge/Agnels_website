import React, { useState, useEffect } from "react";
import axios from "axios";

const NonTeachingStaff = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");
  const [displayPdfs, setDisplayPdfs] = useState([]);

  useEffect(() => {
    fetchPdfs(); // Load PDFs on mount
  }, []);

  // Fetch uploaded PDFs
  const fetchPdfs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/humanResource/pdf/nonteachingstaff"
      ); //this matches the :category route
      setDisplayPdfs(response.data);
    } catch (err) {
      setMessage("Error fetching PDFs.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("category", "nonteachingstaff"); //include category here, required by backend

    try {
      await axios.post(
        "http://localhost:3663/api/humanResource/pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("PDF uploaded successfully!");
      setPdfFile(null);
      fetchPdfs(); // Refresh list
    } catch (error) {
      setMessage("Error uploading PDF.");
    }
  };

  return (
    <div className="p-4">
      {/* PDF Upload Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Upload PDF (Non-Teaching Staff)
        </h2>
        <form className="flex gap-4 items-end" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm">Choose a PDF:</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
          </div>
          <button
            className="bg-black px-8 py-2 text-white rounded"
            type="submit"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      </div>

      {/* List of Uploaded PDFs */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Uploaded PDFs</h2>
        {displayPdfs.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {displayPdfs.map((pdf) => (
              <li key={pdf.id} className="my-2">
                <a
                  href={`http://localhost:3663/cdn/${pdf.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {pdf.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No PDFs available yet.</p>
        )}
      </div>
    </div>
  );
};

export default NonTeachingStaff;

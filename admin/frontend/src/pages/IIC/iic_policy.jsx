import React, { useState, useEffect } from "react";
import axios from "axios";

const Iic_policy = () => {
  const [textContent, setTextContent] = useState("");  // Store the text content
  const [pdfFile, setPdfFile] = useState(null);  // Store the selected PDF
  const [message, setMessage] = useState("");  // Show success/error messages
  const [displayPdfs, setDisplayPdfs] = useState([]);  // Store list of PDFs

  useEffect(() => {
    fetchText();  // Fetch the text content from the backend
    fetchPdfs();  // Fetch PDFs from the backend
  }, []);

  // Fetch the text content for the Innovation and Startup Policy
const fetchText = async () => {
  try {
    const section = 'iic_policy';  // Specify the section you need
    const response = await axios.get(`http://localhost:3663/api/iic/text?section=${section}`);
    setTextContent(response.data.content || "");  // Set the fetched content
  } catch (err) {
    setMessage("Error fetching text.");
  }
};

  

  // Fetch uploaded PDFs for the Innovation and Startup Policy
  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:3663/api/iic/pdf");
      setDisplayPdfs(response.data);  // Set PDFs in state
    } catch (err) {
      setMessage("Error fetching PDFs.");
    }
  };

  // Handle text update
  const updateText = async () => {
    try {
      await axios.put("http://localhost:3663/api/iic/text/1", {
        content: textContent,  // Send the updated text
      });
      setMessage("Text updated successfully!");
    } catch (err) {
      setMessage("Error updating text.");
    }
  };

  // Handle PDF upload
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from refreshing
    if (!pdfFile) {
      setMessage("Please select a PDF file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", pdfFile);  // Attach the selected file to formData

    try {
      await axios.post("http://localhost:3663/api/iic/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("PDF uploaded successfully!");
      fetchPdfs();  // Refresh the PDF list
    } catch (error) {
      setMessage("Error uploading PDF.");
    }
  };

  return (
    <div>
      {/* Text Content Section */}
      <div>
        <h2>Innovation and Startup Policy Text</h2>
        <textarea
          value={textContent}  // Display the current text
          onChange={(e) => setTextContent(e.target.value)}  // Update text on change
          rows="10"
          cols="80"
          className="border p-2"
        />
        <button
          onClick={updateText}  // Update the text when clicked
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Save Text
        </button>
      </div>

      {/* PDF Upload Section */}
      <div>
        <p>Upload PDF</p>
        <form className="flex gap-4 items-end" onSubmit={handleSubmit}>
          <div>
            <p>Choose a PDF:</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}  // Set selected file
              required
            />
          </div>
          <button className="bg-black px-8 py-2 text-white rounded" type="submit">
            Upload
          </button>
        </form>
        {message && <p className="mt-2">{message}</p>}
      </div>

      {/* List of Uploaded PDFs */}
      <div className="mt-8">
        <h2>Uploaded PDFs</h2>
        {displayPdfs.length > 0 ? (
          <ul>
            {displayPdfs.map((pdf) => (
              <li key={pdf.id} className="my-2">
                <a
                  href={`http://localhost:3663/uploads/IIC/${pdf.file_url}`}
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
          <p>No PDFs available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Iic_policy;

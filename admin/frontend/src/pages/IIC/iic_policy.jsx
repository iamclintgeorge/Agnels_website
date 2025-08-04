import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Iic_policy = () => {
  const [content, setContent] = useState("");
  const [textData, setTextData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [displayPdfs, setDisplayPdfs] = useState([]);

  useEffect(() => {
    fetchText();
    fetchPdfs();
  }, []);

  const fetchText = async () => {
    try {
      const res = await axios.get("http://localhost:3663/api/iic/text", {
        params: { section: "iic_policy" },
      });
      setTextData(res.data);
      setContent(res.data?.content || "");
    } catch (err) {
      setMessage("Error fetching text.");
    }
  };

  const updateText = async () => {
    if (!textData || !textData.id) {
      setMessage("No valid text entry to update.");
      return;
    }
    try {
      await axios.put(`http://localhost:3663/api/iic/text/${textData.id}`, {
        content,
      });
      setMessage("Text updated successfully!");
      setEditMode(false);
      fetchText();
    } catch (err) {
      setMessage("Error updating text.");
    }
  };

  const fetchPdfs = async () => {
    try {
      const res = await axios.get("http://localhost:3663/api/iic/pdf");
      setDisplayPdfs(res.data || []);
    } catch (err) {
      setMessage("Error fetching PDFs.");
    }
  };

  const deletePdf = async (pdfId) => {
    try {
      await axios.delete(`http://localhost:3663/api/iic/pdf/${pdfId}`);
      setMessage("PDF deleted successfully!");
      fetchPdfs(); // Refresh the PDF list
    } catch (err) {
      setMessage("Error deleting PDF.");
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

    try {
      await axios.post("http://localhost:3663/api/iic/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("PDF uploaded successfully!");
      setPdfFile(null);
      fetchPdfs();
    } catch (err) {
      setMessage("Error uploading PDF.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="p-4 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Innovation and Startup Policy Text
        </h2>
        {editMode ? (
          <>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              className="mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={updateText}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setContent(textData?.content || "");
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="prose prose-blue mb-4"
              dangerouslySetInnerHTML={{
                __html: textData?.content || "<p>No content available.</p>",
              }}
            />
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </>
        )}
        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Upload Innovation Policy PDF
        </h2>
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-black px-6 py-2 text-white rounded hover:bg-gray-800"
          >
            Upload
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Uploaded PDFs</h2>
        {displayPdfs.length > 0 ? (
          <ul className="list-disc pl-5">
            {displayPdfs.map((pdf) => (
              <li key={pdf.id} className="flex justify-between items-center">
                <a
                  href={`http://localhost:3663/cdn/IIC/${pdf.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {pdf.title}
                </a>
                <button
                  onClick={() => deletePdf(pdf.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Delete
                </button>
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

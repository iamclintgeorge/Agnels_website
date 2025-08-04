import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PrincipalDesk = () => {
  const [message, setMessage] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/aboutus/principaldesk"
      );
      console.log("Fetched Text:", response.data);
      setMessage(response.data);

      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content);
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setStatus("No valid text entry found.");
      }
    } catch (err) {
      console.error("Error loading text:", err);
      setStatus("Error fetching text.");
    }
  };

  const handleUpdate = async () => {
    if (!message.length || !message[0]?.id) {
      setStatus("No valid text entry to update.");
      return;
    }

    const id = message[0].id;
    try {
      await axios.put(`http://localhost:3663/api/aboutus/principaldesk/${id}`, {
        content,
      });
      setStatus("Text updated successfully!");
      setEditMode(false);
      fetchText();
    } catch (error) {
      console.error("Update error:", error);
      setStatus("Error updating text.");
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
    <div className="p-4">
      <p className="text-black text-3xl font-bold mb-10 font-playfair">
        Principal's Desk
      </p>

      {message.length > 0 ? (
        editMode ? (
          <div>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              className="mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setContent(message[0]?.Content || "");
                  setStatus("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            {status && <p className="mt-2">{status}</p>}
          </div>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: message[0].Content }}
              className="mb-4 text-base text-justify font-inter leading-7"
            />
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default PrincipalDesk;

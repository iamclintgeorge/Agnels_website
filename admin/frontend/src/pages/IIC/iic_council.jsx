import React, { useEffect, useState, useRef, forwardRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Iic_council = () => {
  const [text, setText] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get("http://localhost:3663/api/iic/text");
      setText(response.data);
      if (response.data && response.data.content) {
        setContent(response.data.content);
      } else {
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      setMessage("Error fetching text.");
    }
  };

  const handleUpdate = async () => {
    if (!text || !text.id) {
      setMessage("No valid text entry to update.");
      return;
    }

    try {
      await axios.put(`http://localhost:3663/api/iic/text/${text.id}`, { content });
      setMessage("Text updated successfully!");
      setEditMode(false);
      fetchText();
    } catch (error) {
      setMessage("Error updating text.");
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

  const QuillWrapper = forwardRef((props, ref) => (
    <ReactQuill {...props} ref={ref} />
  ));

  return (
    <div className="p-4">
      {text && text.content ? (
        editMode ? (
          <div>
            <QuillWrapper
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              className="mb-4"
            />
            <div className="flex gap-4">
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setContent(text.content || "");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            {message && <p className="mt-2">{message}</p>}
          </div>
        ) : (
          <div>
            <div dangerouslySetInnerHTML={{ __html: text.content }} className="mb-4" />
            <button onClick={() => setEditMode(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Edit
            </button>
          </div>
        )
      ) : (
        <p>No intro text available.</p>
      )}
    </div>
  );
};

export default Iic_council;

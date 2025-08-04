import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../services/useAuthCheck";

const ComHod = () => {
  const { user } = useAuth();
  const [hodText, setHodText] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  // Check if user has permission to edit (compHod role or superAdmin)
  const canEdit =
    user && (user.role === "compHod" || user.role === "superAdmin");

  useEffect(() => {
    fetchText();
  }, []);

  useEffect(() => {
    // Add custom tab handling when in edit mode
    if (!editMode || !quillRef.current) return;

    const handleTab = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          // Insert 4 non-breaking spaces instead of tab character for better consistency
          const tabSpaces = "\u00A0\u00A0\u00A0\u00A0"; // 4 non-breaking spaces
          quill.insertText(range.index, tabSpaces);
          quill.setSelection(range.index + 4);
        }
      }
    };

    // Add event listener with a small delay to ensure editor is ready
    const timer = setTimeout(() => {
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        const editorContainer = quillEditor.container;
        editorContainer.addEventListener("keydown", handleTab);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        const editorContainer = quillEditor.container;
        editorContainer.removeEventListener("keydown", handleTab);
      }
    };
  }, [editMode]);

  // Convert tabs to non-breaking spaces when entering edit mode
  useEffect(() => {
    if (editMode && hodText.length > 0 && hodText[0].Content) {
      // Convert tab characters to non-breaking spaces for consistent display
      const contentWithSpaces = hodText[0].Content.replace(
        /\t/g,
        "\u00A0\u00A0\u00A0\u00A0"
      );
      setContent(contentWithSpaces);
    }
  }, [editMode, hodText]);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/hod-desk/computer"
      );
      console.log("Fetched Computer HOD Text:", response.data);
      setHodText(response.data);
      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content);
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error("Error loading Computer HOD text:", err);
      setMessage("Error fetching Computer HOD text.");
    }
  };

  const handleUpdate = async () => {
    console.log("hodText before update:", hodText);
    if (!hodText.length || !hodText[0]?.id) {
      setMessage("No valid text entry to update.");
      console.error("Invalid hodText data:", hodText);
      return;
    }

    const id = hodText[0].id;
    console.log("Updating with id:", id);
    try {
      // Convert non-breaking spaces back to regular spaces or tabs for storage
      const contentForStorage = content.replace(/\u00A0{4}/g, "\t");

      await axios.put(`http://localhost:3663/api/hod-desk/computer/${id}`, {
        content: contentForStorage,
      });
      setMessage("Computer HOD text updated successfully!");
      setEditMode(false);
      fetchText();
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Error updating Computer HOD text.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // Add indent controls
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent", // Add indent format
    "size",
    "font",
    "align",
    "link",
  ];

  return (
    <div className="p-4">
      <style jsx>{`
        /* Custom styling for consistent spacing */
        .ql-editor {
          font-family: "Courier New", monospace; /* Use monospace font for consistent spacing */
          line-height: 1.6;
        }

        .preview-content {
          white-space: pre-wrap;
          font-family: "Courier New", monospace; /* Same font for consistent spacing */
          line-height: 1.6;
        }

        /* Ensure non-breaking spaces are visible */
        .ql-editor,
        .preview-content {
          word-spacing: normal;
        }
      `}</style>

      <h2 className="text-2xl font-bold mb-4">
        Computer Engineering - HOD Desk
      </h2>

      {hodText.length > 0 ? (
        editMode ? (
          <div>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
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
                  setContent(hodText[0]?.Content || "");
                  setMessage("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            {message && <p className="mt-2 text-green-600">{message}</p>}
          </div>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: hodText[0].Content }}
              className="mb-4 preview-content"
            />
            {canEdit && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Edit HOD Desk
              </button>
            )}
          </div>
        )
      ) : (
        <div>
          <p>No Computer HOD text available.</p>
          {canEdit && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            >
              Create HOD Desk Content
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComHod;

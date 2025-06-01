import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DeptHome = () => {
  const [deptText, setDeptText] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/department/home"
      );
      console.log("Fetched Department Text:", response.data);
      setDeptText(response.data);
      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content);
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error("Error loading department text:", err);
      setMessage("Error fetching department text.");
    }
  };

  const handleUpdate = async () => {
    console.log("deptText before update:", deptText);
    if (!deptText.length || !deptText[0]?.id) {
      setMessage("No valid text entry to update.");
      console.error("Invalid deptText data:", deptText);
      return;
    }

    const id = deptText[0].id;
    console.log("Updating with id:", id);
    try {
      await axios.put(`http://localhost:3663/api/department/home/${id}`, {
        content,
      });
      setMessage("Department text updated successfully!");
      setEditMode(false);
      fetchText();
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Error updating department text.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
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
    "size",
    "font",
    "align",
    "link",
  ];

  return (
    <div className="p-4">
      {deptText.length > 0 ? (
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
                  setContent(deptText[0]?.Content || "");
                  setMessage("");
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
            <div
              dangerouslySetInnerHTML={{ __html: deptText[0].Content }}
              className="mb-4"
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
        <p>No department home text available.</p>
      )}
    </div>
  );
};

export default DeptHome;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { deptId, deptname } from "../../../util/dept_mapping.js";

const DeptInnovativeTeaching = () => {
  const [textData, setTextData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  useEffect(() => {
    fetchText();
  }, [departmentId]);

  // Custom tab handling: inserts 4 non-breaking spaces instead of tabs
  useEffect(() => {
    if (!editMode || !quillRef.current) return;

    const handleTab = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          const tabSpaces = "\u00A0\u00A0\u00A0\u00A0";
          quill.insertText(range.index, tabSpaces);
          quill.setSelection(range.index + 4);
        }
      }
    };

    // Add listener after small delay to ensure editor ready
    const timer = setTimeout(() => {
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        quillEditor.container.addEventListener("keydown", handleTab);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        quillEditor.container.removeEventListener("keydown", handleTab);
      }
    };
  }, [editMode]);

  // On entering edit mode, convert tabs to 4 non-breaking spaces for consistent display
  useEffect(() => {
    if (editMode && textData.length > 0 && textData[0].methods) {
      const contentWithSpaces = textData[0].methods.replace(
        /\t/g,
        "\u00A0\u00A0\u00A0\u00A0"
      );
      setContent(contentWithSpaces);
    }
  }, [editMode, textData]);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/innovative/${departmentId}`
      );
      console.log(response.data);

      const fetched = response.data?.data || [];
      setTextData(fetched);

      if (fetched.length > 0 && fetched[0].methods) {
        setContent(fetched[0].methods);
      } else {
        setMessage("No valid text entry found.");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Error fetching ${deptName} text.`);
    }
  };

  const handleUpdate = async () => {
    if (!textData.length || !textData[0]?.id) {
      setMessage("No valid text entry to update.");
      return;
    }

    const id = textData[0].id;
    // Convert non-breaking spaces back to tabs for storage
    const contentForStorage = content.replace(/\u00A0{4}/g, "\t");

    try {
      await axios.put(
        `http://localhost:3663/api/department/innovative-teaching/${departmentId}/${id}`,
        { content: contentForStorage }
      );
      setMessage(`${deptName} text updated successfully!`);
      setEditMode(false);
      fetchText();
    } catch (error) {
      setMessage(`Error updating ${deptName} text.`);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
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
    "indent",
    "size",
    "font",
    "align",
    "link",
  ];

  return (
    <div className="p-4">
      <style jsx>{`
        .ql-editor {
          font-family: "Courier New", monospace;
          line-height: 1.6;
        }
        .preview-content {
          white-space: pre-wrap;
          font-family: "Courier New", monospace;
          line-height: 1.6;
        }
        .ql-editor,
        .preview-content {
          word-spacing: normal;
        }
      `}</style>

      <h2 className="text-2xl font-bold mb-4">
        {deptName} - Innovative Teaching
      </h2>

      {textData.length > 0 ? (
        editMode ? (
          <>
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
                  setContent(textData[0]?.methods || "");
                  setMessage("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            {message && <p className="mt-2">{message}</p>}
          </>
        ) : (
          <>
            <div
              className="mb-4 preview-content"
              dangerouslySetInnerHTML={{ __html: textData[0].methods }}
            />
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
          </>
        )
      ) : (
        <p>No {deptName} text available.</p>
      )}
    </div>
  );
};

export default DeptInnovativeTeaching;

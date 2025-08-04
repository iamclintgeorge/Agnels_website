// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { deptId, deptname } from "../../../util/dept_mapping.js";

// const DeptAbout = () => {
//   const [deptText, setDeptText] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [content, setContent] = useState("");
//   const [message, setMessage] = useState("");
//   const quillRef = useRef(null);
//   const { departmentName } = useParams();
//   const departmentId = deptId[departmentName];
//   const deptName = deptname[departmentName];

//   useEffect(() => {
//     fetchText();
//   }, []);

//   useEffect(() => {
//     // Add custom tab handling when in edit mode
//     if (!editMode || !quillRef.current) return;

//     const handleTab = (e) => {
//       if (e.key === "Tab") {
//         e.preventDefault();
//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         if (range) {
//           // Insert 4 non-breaking spaces instead of tab character for better consistency
//           const tabSpaces = "\u00A0\u00A0\u00A0\u00A0"; // 4 non-breaking spaces
//           quill.insertText(range.index, tabSpaces);
//           quill.setSelection(range.index + 4);
//         }
//       }
//     };

//     // Add event listener with a small delay to ensure editor is ready
//     const timer = setTimeout(() => {
//       const quillEditor = quillRef.current?.getEditor();
//       if (quillEditor) {
//         const editorContainer = quillEditor.container;
//         editorContainer.addEventListener("keydown", handleTab);
//       }
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       const quillEditor = quillRef.current?.getEditor();
//       if (quillEditor) {
//         const editorContainer = quillEditor.container;
//         editorContainer.removeEventListener("keydown", handleTab);
//       }
//     };
//   }, [editMode]);

//   // Convert tabs to non-breaking spaces when entering edit mode
//   useEffect(() => {
//     if (editMode && deptText.length > 0 && deptText[0].paragraph1) {
//       // Convert tab characters to non-breaking spaces for consistent display
//       const contentWithSpaces = deptText[0].paragraph1.replace(
//         /\t/g,
//         "\u00A0\u00A0\u00A0\u00A0"
//       );
//       setContent(contentWithSpaces);
//     }
//   }, [editMode, deptText]);

//   const fetchText = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3663/api/department/home/${departmentId}`
//       );
//       console.log(`Fetched ${deptName} Department Text:`, response.data);
//       setDeptText(response.data);
//       if (response.data.length > 0 && response.data[0].id) {
//         setContent(response.data[0].paragraph1);
//       } else {
//         console.warn("No valid id or content in fetched data:", response.data);
//         setMessage("No valid text entry found.");
//       }
//     } catch (err) {
//       console.error(`Error loading ${deptName} department text:`, err);
//       setMessage(`Error fetching ${deptName} department text.`);
//     }
//   };

//   const handleUpdate = async () => {
//     console.log("deptText before update:", deptText);
//     if (!deptText.length || !deptText[0]?.id) {
//       setMessage("No valid text entry to update.");
//       console.error("Invalid deptText data:", deptText);
//       return;
//     }

//     const id = deptText[0].id;
//     console.log("Updating with id:", id);
//     try {
//       // Convert non-breaking spaces back to regular spaces or tabs for storage
//       const contentForStorage = content.replace(/\u00A0{4}/g, "\t");

//       await axios.put(
//         `http://localhost:3663/api/department/home/${departmentId}/${id}`,
//         {
//           content: contentForStorage,
//         }
//       );
//       setMessage(`${deptName} department text updated successfully!`);
//       setEditMode(false);
//       fetchText();
//     } catch (error) {
//       console.error("Update error:", error);
//       setMessage(`Error updating ${deptName} department text.`);
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }], // Add indent controls
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["link"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "list",
//     "bullet",
//     "indent", // Add indent format
//     "size",
//     "font",
//     "align",
//     "link",
//   ];

//   return (
//     <div className="p-4">
//       <style jsx>{`
//         /* Custom styling for consistent spacing */
//         .ql-editor {
//           font-family: "Courier New", monospace; /* Use monospace font for consistent spacing */
//           line-height: 1.6;
//         }

//         .preview-content {
//           white-space: pre-wrap;
//           font-family: "Courier New", monospace; /* Same font for consistent spacing */
//           line-height: 1.6;
//         }

//         /* Ensure non-breaking spaces are visible */
//         .ql-editor,
//         .preview-content {
//           word-spacing: normal;
//         }
//       `}</style>

//       <h2 className="text-2xl font-bold mb-4">{deptName} - Home</h2>

//       {deptText.length > 0 ? (
//         editMode ? (
//           <div>
//             <ReactQuill
//               ref={quillRef}
//               value={content}
//               onChange={setContent}
//               modules={modules}
//               formats={formats}
//               className="mb-4"
//             />

//             <div className="flex gap-4">
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setEditMode(false);
//                   setContent(deptText[0]?.paragraph1 || "");
//                   setMessage("");
//                 }}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </div>
//             {message && <p className="mt-2">{message}</p>}
//           </div>
//         ) : (
//           <div>
//             <div
//               dangerouslySetInnerHTML={{ __html: deptText[0].paragraph1 }}
//               className="mb-4 preview-content"
//             />
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Edit
//             </button>
//           </div>
//         )
//       ) : (
//         <p>No {deptName} department home text available.</p>
//       )}
//     </div>
//   );
// };

// export default DeptAbout;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { deptId, deptname } from "../../../util/dept_mapping.js";

// Optional: use environment variable for backend base URL
const API_BASE = "http://localhost:3663";

const SectionEditor = ({ title, fetchUrl, updateUrl, contentKey }) => {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const quillRef = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(fetchUrl);
      const data = res.data.data || res.data[0] || res.data; // handle various response structures

      console.log(`${title} fetch response:`, res.data); // Debug log

      setText(data ? data[contentKey] || "" : "");
      setId(data?.id);
    } catch (err) {
      console.error(`${title} fetch error:`, err);
      setMessage(`Error fetching ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!id) {
      setMessage("No ID found for update");
      return;
    }

    try {
      setLoading(true);
      setMessage("Updating...");

      const updatePayload = {
        [contentKey]: text,
      };

      console.log(`${title} update payload:`, updatePayload); // Debug log

      const response = await axios.put(`${updateUrl}/${id}`, updatePayload);

      console.log(`${title} update response:`, response.data); // Debug log

      setMessage(`${title} updated successfully.`);
      setEditMode(false);

      // Force a fresh fetch after successful update
      await new Promise((resolve) => setTimeout(resolve, 500)); // Increased delay
      await fetchData();
    } catch (err) {
      console.error(`${title} update error:`, err);
      setMessage(
        `Error updating ${title.toLowerCase()}: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    fetchData(); // Refresh to original state
    setMessage("");
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

  if (loading && !editMode) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {editMode ? (
        <>
          <ReactQuill
            ref={quillRef}
            value={text}
            onChange={setText}
            modules={modules}
            formats={formats}
            className="mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className="preview-content mb-4 min-h-[50px] border border-gray-200 p-3 rounded"
          />
          <button
            onClick={() => setEditMode(true)}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Edit
          </button>
        </>
      )}
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

const DeptAbout = () => {
  const { departmentName } = useParams();
  const departmentId = deptId[departmentName];
  const deptName = deptname[departmentName];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{deptName} Department</h1>

      {/* About Section */}
      <SectionEditor
        title="About"
        fetchUrl={`${API_BASE}/api/department/home/${departmentId}`}
        updateUrl={`${API_BASE}/api/department/home`} // Note: removed departmentId from update URL
        contentKey="paragraph1"
      />

      {/* Vision Section */}
      <SectionEditor
        title="Department Vision"
        fetchUrl={`${API_BASE}/api/department/vision/${departmentId}`}
        updateUrl={`${API_BASE}/api/department/vision`}
        contentKey="vision"
      />

      {/* Mission Section */}
      <SectionEditor
        title="Department Mission"
        fetchUrl={`${API_BASE}/api/department/mission/${departmentId}`}
        updateUrl={`${API_BASE}/api/department/mission`}
        contentKey="mission"
      />

      {/* Objective Section */}
      <SectionEditor
        title="Department Objective"
        fetchUrl={`${API_BASE}/api/department/objectives/${departmentId}`}
        updateUrl={`${API_BASE}/api/department/objectives`}
        contentKey="objective"
      />

      {/* Outcome Section */}
      <SectionEditor
        title="Department Outcome"
        fetchUrl={`${API_BASE}/api/department/outcomes/${departmentId}`}
        updateUrl={`${API_BASE}/api/department/outcomes`}
        contentKey="outcome"
      />
    </div>
  );
};

export default DeptAbout;

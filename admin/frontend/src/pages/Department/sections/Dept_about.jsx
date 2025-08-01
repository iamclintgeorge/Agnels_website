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

const SectionEditor = ({ title, fetchUrl, updateUrl }) => {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(fetchUrl);
      setText(res.data[0]?.text || res.data[0]?.paragraph1 || "");
      setId(res.data[0]?.id);
    } catch (err) {
      console.error(`${title} fetch error:`, err);
      setMessage(`Error fetching ${title.toLowerCase()}`);
    }
  };

  const handleUpdate = async () => {
    if (!id) return;

    const cleaned = text.replace(/\u00A0{4}/g, "\t");
    try {
      await axios.put(`${updateUrl}/${id}`, { content: cleaned });
      setMessage(`${title} updated successfully.`);
      setEditMode(false);
      fetchData();
    } catch (err) {
      console.error(`${title} update error:`, err);
      setMessage(`Error updating ${title.toLowerCase()}`);
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                fetchData();
                setMessage("");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className="preview-content mb-4"
          />
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </>
      )}
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
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

      <SectionEditor
        title="About"
        fetchUrl={`http://localhost:3663/api/department/home/${departmentId}`}
        updateUrl={`http://localhost:3663/api/department/home/${departmentId}`}
      />

      <SectionEditor
        title="Vision"
        fetchUrl={`http://localhost:3663/api/department/vision/${departmentId}`}
        updateUrl={`http://localhost:3663/api/department/vision/${departmentId}`}
      />

      <SectionEditor
        title="Mission"
        fetchUrl={`http://localhost:3663/api/department/mission/${departmentId}`}
        updateUrl={`http://localhost:3663/api/department/mission/${departmentId}`}
      />
    </div>
  );
};

export default DeptAbout;

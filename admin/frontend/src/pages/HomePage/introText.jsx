// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const IntroText = () => {
//   const [introText, setIntroText] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [content, setContent] = useState("");
//   const [message, setMessage] = useState("");
//   const quillRef = useRef(null);

//   useEffect(() => {
//     fetchText();
//   }, []);

//   const fetchText = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3663/api/home/introtext"
//       );
//       console.log("Fetched Text:", response.data);
//       setIntroText(response.data);
//       if (response.data.length > 0 && response.data[0].id) {
//         setContent(response.data[0].Content);
//       } else {
//         console.warn("No valid id or content in fetched data:", response.data);
//         setMessage("No valid text entry found.");
//       }
//     } catch (err) {
//       console.error("Error loading text:", err);
//       setMessage("Error fetching text.");
//     }
//   };

//   const handleUpdate = async () => {
//     console.log("introText before update:", introText);
//     if (!introText.length || !introText[0]?.id) {
//       setMessage("No valid text entry to update.");
//       console.error("Invalid introText data:", introText);
//       return;
//     }

//     const id = introText[0].id;
//     console.log("Updating with id:", id);
//     try {
//       // console.log(`URL: `, `http://localhost:3663/api/home/introtext/${id}`);
//       await axios.put(`http://localhost:3663/api/home/introtext/${id}`, {
//         content,
//       });
//       setMessage("Text updated successfully!");
//       setEditMode(false);
//       fetchText();
//     } catch (error) {
//       console.error("Update error:", error);
//       setMessage("Error updating text.");
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline"],
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="p-4">
//       {introText.length > 0 ? (
//         editMode ? (
//           <div>
//             <ReactQuill
//               ref={quillRef}
//               value={content}
//               onChange={setContent}
//               modules={modules}
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
//                   setContent(introText[0]?.Content || "");
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
//               dangerouslySetInnerHTML={{ __html: introText[0].Content }}
//               className="mb-4"
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
//         <p>No intro text available.</p>
//       )}
//     </div>
//   );
// };

// export default IntroText;

import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Note: ReactQuill uses findDOMNode, which is deprecated in React Strict Mode.
// Consider updating to react-quill v2.0.0+ or exploring alternatives like slate
// if the warning persists in future React versions. See https://reactjs.org/link/strict-mode-find-node

// Custom wrapper to pass ref explicitly, attempting to minimize findDOMNode usage
const QuillEditor = forwardRef((props, ref) => (
  <ReactQuill
    ref={ref}
    {...props}
    className="mb-4 bg-white border border-gray-300 rounded-md"
  />
));
QuillEditor.displayName = "QuillEditor";

const IntroText = () => {
  const [introText, setIntroText] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/home/introtext"
      );
      console.log("Fetched Text:", response.data);
      setIntroText(response.data);
      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content);
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error("Error loading text:", err);
      setMessage("Error fetching text.");
    }
  };

  const handleUpdate = async () => {
    if (!introText.length || !introText[0]?.id) {
      setMessage("No valid text entry to update.");
      console.error("Invalid introText data:", introText);
      return;
    }

    const id = introText[0].id;

    try {
      const response = await axios.post(
        "http://localhost:3663/api/content-approval/request",
        {
          method: "PUT",
          section: "Homepage",
          title: "Home Page Intro Text Update",
          change_summary: "Updated intro text with enhanced formatting",
          current_content: introText[0].Content,
          proposed_content: content,
          endpoint_url: "api/home/introtext",
          id: id,
        }
      );
      console.log("Approval request created:", response.data);
      setMessage("Your update has been submitted for approval.");
      setApprovalStatus("pending");
      setEditMode(false);
    } catch (error) {
      console.error("Approval request error:", error);
      setMessage("Error submitting approval request.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["blockquote", "code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {introText.length > 0 ? (
        editMode ? (
          <div>
            <QuillEditor
              value={content}
              onChange={setContent}
              modules={modules}
              theme="snow"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Submit for Approval
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setContent(introText[0]?.Content || "");
                  setMessage("");
                  setApprovalStatus("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
            {approvalStatus && (
              <p className="mt-2 text-sm text-blue-600">
                {approvalStatus === "pending" &&
                  "Your request is pending approval."}
              </p>
            )}
          </div>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: introText[0].Content }}
              className="mb-4 text-gray-700"
            />
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p className="text-sm text-gray-500">No intro text available.</p>
      )}
    </div>
  );
};

export default IntroText;

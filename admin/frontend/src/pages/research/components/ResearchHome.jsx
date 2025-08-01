// // admin/frontend/src/components/ResearchHome.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles

// const ResearchHome = () => {
//   const [content, setContent] = useState("");
//   const [researchText, setResearchText] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchResearchText();
//   }, []);

//   const fetchResearchText = async () => {
//     try {
//       const response = await axios.get("http://localhost:3663/api/research/home", {
//         withCredentials: true,
//       });
//       console.log(response.data);
//       setResearchText(response.data);
//       if (response.data.length > 0) {
//         setSelectedId(response.data[0].id);
//         setContent(response.data[0].content);
//       }
//     } catch (error) {
//       console.error("Error fetching research text:", error);
//       setMessage("Error fetching research text.");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedId || !content) {
//       setMessage("Please provide content.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:3663/api/research/home/${selectedId}`,
//         { content },
//         { withCredentials: true }
//       );
//       console.log("Update response:", response.data);
//       setMessage("Research text updated successfully!");
//       fetchResearchText();
//     } catch (error) {
//       console.error("Error updating research text:", error);
//       if (error.response?.status === 401) {
//         setMessage("Unauthorized: Please log in again.");
//       } else {
//         setMessage("Error updating research text.");
//       }
//     }
//   };
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-lg font-medium mb-4">Edit Research Home Text</h3>
//       {researchText.length > 0 ? (
//         <form onSubmit={handleUpdate} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Current Research Text:
//             </label>
//             {researchText.map((text) => (
//               <div
//                 key={text.id}
//                 className="mt-2 p-4 border rounded"
//                 dangerouslySetInnerHTML={{ __html: text.content }}
//               />
//             ))}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Update Research Text:
//             </label>
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               className="mt-1"
//               modules={{
//                 toolbar: [
//                   [{ header: [1, 2, false] }],
//                   ["bold", "italic", "underline", "strike"],
//                   [{ list: "ordered" }, { list: "bullet" }],
//                   ["link"],
//                   ["clean"],
//                 ],
//               }}
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Update Text
//           </button>
//         </form>
//       ) : (
//         <p className="text-gray-600">No research text available.</p>
//       )}
//       {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
//     </div>
//   );
// };

// export default ResearchHome;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ResearchHome = () => {
  const [content, setContent] = useState("");
  const [researchText, setResearchText] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchResearchText();
  }, []);

  const fetchResearchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/department/research/home",
        {
          withCredentials: true,
        }
      );
      setResearchText(response.data);
      if (response.data.length > 0) {
        setSelectedId(response.data[0].id);
        setContent(response.data[0].content);
      }
      setMessage("");
    } catch (error) {
      console.error("Error fetching research text:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(
        `Error fetching research text: ${error.response?.status} - ${errorMsg}`
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newContent) {
      setMessage("Please provide content to upload.");
      return;
    }

    try {
      // ✅ FIXED: Changed URL to the authenticated admin route
      const response = await axios.post(
        "http://localhost:3663/api/department/research/admin/home",
        { section: "researchHome", content: newContent },
        { withCredentials: true }
      );
      setMessage("Research text uploaded successfully!");
      setNewContent("");
      fetchResearchText();
    } catch (error) {
      console.error("Error uploading research text:", error);
      const errorMsg = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        setMessage("Unauthorized: Please log in again.");
      } else {
        setMessage(
          `Error uploading research text: ${error.response?.status} - ${errorMsg}`
        );
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedId || !content) {
      setMessage("Please select a text and provide content.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3663/api/department/research/admin/home/${selectedId}`,
        { content },
        { withCredentials: true }
      );
      setMessage("Research text updated successfully!");
      fetchResearchText();
    } catch (error) {
      console.error("Error updating research text:", error);
      const errorMsg = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        setMessage("Unauthorized: Please log in again.");
      } else {
        setMessage(
          `Error updating research text: ${error.response?.status} - ${errorMsg}`
        );
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Edit Research Home Text</h3>
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Current Research Text:</h4>
        {researchText.length > 0 ? (
          <ul>
            {researchText.map((text) => (
              <li
                key={text.id}
                className={`mt-2 p-4 border rounded cursor-pointer ${
                  selectedId === text.id ? "border-blue-500" : ""
                }`}
                onClick={() => {
                  setSelectedId(text.id);
                  setContent(text.content);
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: text.content }} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No research text available.</p>
        )}
      </div>
      <form onSubmit={handleUpdate} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Update Selected Text:
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="mt-1"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Text
        </button>
      </form>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload New Text:
          </label>
          <ReactQuill
            value={newContent}
            onChange={setNewContent}
            className="mt-1"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload New Text
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default ResearchHome;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ResearchPdfManager = ({ section, topic }) => {
//   const [files, setFiles] = useState([]);
//   const [currentPdfs, setCurrentPdfs] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchPdfs();
//   }, [section]);

//   const fetchPdfs = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3663/api/research/pdf?section=${section}`, {
//         withCredentials: true,
//       });
//       setCurrentPdfs(response.data);
//     } catch (error) {
//       console.error("Error fetching PDFs:", error);
//       setMessage("Error fetching PDFs.");
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (files.length === 0) {
//       setMessage("Please select at least one PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("section", section);
//     formData.append("topic", topic);
//     files.forEach((file) => formData.append("file", file));

//     try {
//       await axios.post("http://localhost:3663/api/research/pdf", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       setMessage("PDF(s) uploaded successfully!");
//       setFiles([]);
//       e.target.reset();
//       fetchPdfs();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       setMessage("Error uploading PDF.");
//     }
//   };

//   const handleUpdate = async (id, file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.put(`http://localhost:3663/api/research/pdf/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       setMessage("PDF updated successfully!");
//       fetchPdfs();
//     } catch (error) {
//       console.error("Error updating PDF:", error);
//       setMessage("Error updating PDF.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3663/api/research/pdf/${id}`, {
//         withCredentials: true,
//       });
//       setMessage("PDF deleted successfully!");
//       fetchPdfs();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//       setMessage("Error deleting PDF.");
//     }
//   };
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-lg font-medium mb-4">{topic}</h3>
//       <div className="mb-6">
//         <h4 className="text-md font-medium mb-2">Current PDFs:</h4>
//         {currentPdfs.length > 0 ? (
//           <ul>
//             {currentPdfs.map((pdf) => (
//               <li key={pdf.id} className="mb-2">
//                 <a
//                   href={`http://localhost:3663${pdf.content}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   {pdf.filename || "Unnamed PDF"}
//                 </a>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={(e) => handleUpdate(pdf.id, e.target.files[0])}
//                   className="ml-4"
//                 />
//                 <button
//                   onClick={() => handleDelete(pdf.id)}
//                   className="ml-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No PDFs uploaded yet.</p>
//         )}
//       </div>
//       <form onSubmit={handleUpload} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Upload New PDFs:
//           </label>
//           <input
//             type="file"
//             accept="application/pdf"
//             multiple // Allow multiple files
//             onChange={(e) => setFiles(Array.from(e.target.files))}
//             className="mt-1 block w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Upload PDF(s)
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
//     </div>
//   );
// };

// export default ResearchPdfManager;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ResearchPdfManager = ({ section, topic }) => {
  const [files, setFiles] = useState([]);
  const [currentPdfs, setCurrentPdfs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPdfs();
  }, [section]);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/department/research/pdf?section=${section}`,
        {
          withCredentials: true,
        }
      );
      setCurrentPdfs(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(
        `Error fetching PDFs: ${error.response?.status} - ${errorMsg}`
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage("Please select at least one PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("section", section);
    formData.append("topic", topic);
    files.forEach((file) => formData.append("files", file));

    try {
      // ✅ FIXED: Changed URL to the authenticated admin route
      await axios.post(
        "http://localhost:3663/api/department/research/admin/pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage("PDF(s) uploaded successfully!");
      setFiles([]);
      e.target.reset();
      fetchPdfs();
    } catch (error) {
      console.error("Error uploading PDF:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(
        `Error uploading PDF: ${error.response?.status} - ${errorMsg}`
      );
    }
  };

  const handleUpdate = async (id, file) => {
    if (!file) {
      setMessage("Please select a file to update.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      // ✅ FIXED: Changed URL to the authenticated admin route
      await axios.put(
        `http://localhost:3663/api/department/research/admin/pdf/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage("PDF updated successfully!");
      fetchPdfs();
    } catch (error) {
      console.error("Error updating PDF:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(`Error updating PDF: ${error.response?.status} - ${errorMsg}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      // ✅ FIXED: Changed URL to the authenticated admin route
      await axios.delete(
        `http://localhost:3663/api/department/research/admin/pdf/${id}`,
        {
          withCredentials: true,
        }
      );
      setMessage("PDF deleted successfully!");
      fetchPdfs();
    } catch (error) {
      console.error("Error deleting PDF:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(`Error deleting PDF: ${error.response?.status} - ${errorMsg}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">{topic}</h3>
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Current PDFs:</h4>
        {currentPdfs.length > 0 ? (
          <ul>
            {currentPdfs.map((pdf) => (
              <li
                key={pdf.id}
                className="flex items-center justify-between mb-2 p-2 border rounded"
              >
                <a
                  href={`http://localhost:3663${pdf.content}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline truncate"
                  title={pdf.filename}
                >
                  {pdf.filename || "Unnamed PDF"}
                </a>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleUpdate(pdf.id, e.target.files[0])}
                    className="text-sm"
                  />
                  <button
                    onClick={() => handleDelete(pdf.id)}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No PDFs uploaded yet.</p>
        )}
      </div>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload New PDFs:
          </label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload PDF(s)
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default ResearchPdfManager;

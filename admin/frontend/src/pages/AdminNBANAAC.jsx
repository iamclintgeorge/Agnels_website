





// // AdminNBANAAC.jsx

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminNBANAAC = () => {
//   // ✨ ADDED NEW SECTIONS TO THE LIST
//   const SECTIONS = ["Home", "NBA", "NAAC", "NAAC Appeals", "AQAR 2019-20", "AQAR 2020-21"];
//   const [activeSection, setActiveSection] = useState("Home");

//   // State for form inputs
//   const [homeContent, setHomeContent] = useState("");
//   const [homeFiles, setHomeFiles] = useState([]);
//   const [homePdf, setHomePdf] = useState(null);
//   const [uploadFiles, setUploadFiles] = useState([]); // Generic state for file uploads

//   // State for displaying existing data
//   const [existingHomeData, setExistingHomeData] = useState({ images: [], pdf: null });
//   const [existingFiles, setExistingFiles] = useState([]); // Generic state for displaying files
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());

//   // Fetches data for the active section
//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       if (activeSection === "Home") {
//         setExistingFiles([]); // Clear file list for home section
//         const res = await axios.get("http://localhost:3663/api/nba-naac/home", { withCredentials: true });
//         setHomeContent(res.data.content || "");
//         setExistingHomeData({
//           images: res.data.image_urls || [],
//           pdf: res.data.pdf_url ? { url: res.data.pdf_url, title: res.data.pdf_title } : null,
//         });
//       } else {
//         // Generic file fetching for all other sections
//         const res = await axios.get(`http://localhost:3663/api/nba-naac/files/${activeSection}`, { withCredentials: true });
//         setExistingFiles(res.data);
//       }
//     } catch (error) {
//        if (error.response?.status !== 404) {
//          toast.error(`Error fetching ${activeSection} data.`);
//        }
//        setExistingFiles([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [activeSection]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Clear all input states
//     setHomeContent("");
//     setHomeFiles([]);
//     setHomePdf(null);
//     setUploadFiles([]);
//     setFileInputKey(Date.now());
//   };

//   const handleHomeSubmit = async (e) => {
//     e.preventDefault();
//     if (!homeContent) {
//       toast.error("Please enter content for Home section.");
//       return;
//     }
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("content", homeContent);
//     homeFiles.forEach((file) => formData.append("files", file));
//     if (homePdf) formData.append("files", homePdf);

//     try {
//       const response = await axios.post("http://localhost:3663/api/nba-naac/home", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       setHomeFiles([]);
//       setHomePdf(null);
//       setFileInputKey(Date.now());
//       fetchData(); 
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Error saving Home content");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFileSubmit = async (e, section) => {
//     e.preventDefault();
//     if (uploadFiles.length === 0) {
//       toast.error(`Please select files for ${section}.`);
//       return;
//     }
//     setIsSubmitting(true);
//     for (const file of uploadFiles) {
//       const formData = new FormData();
//       formData.append("section", section);
//       formData.append("file", file);
//       formData.append("fileTitle", file.name);

//       try {
//         const response = await axios.post("http://localhost:3663/api/nba-naac/upload", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         });
//         toast.success(`'${file.name}' uploaded successfully.`);
//       } catch (error) {
//         toast.error(error.response?.data?.error || `Error uploading ${section} file`);
//       }
//     }
//     setUploadFiles([]);
//     setFileInputKey(Date.now());
//     fetchData();
//     setIsSubmitting(false);
//   };

//   const handleDeleteFile = async (fileId) => {
//     if (!window.confirm("Are you sure you want to delete this file?")) return;
//     try {
//         await axios.delete(`http://localhost:3663/api/nba-naac/files/${fileId}`, { withCredentials: true });
//         toast.success("File deleted successfully!");
//         setExistingFiles(prev => prev.filter(f => f.id !== fileId));
//     } catch (error) {
//         toast.error("Failed to delete file.");
//     }
//   };
  
//   // Reusable component for rendering file lists
//   const renderFileList = (files) => (
//     <div className="mt-6">
//       <h3 className="text-xl font-medium mb-2">Currently Uploaded Files</h3>
//       {files.length === 0 ? <p>No files uploaded for this section yet.</p> : (
//         <ul className="space-y-2">
//           {files.map(file => (
//             <li key={file.id} className="flex justify-between items-center p-2 bg-white rounded border">
//               <a href={`http://localhost:3663${file.file_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                 {file.file_title}
//               </a>
//               <button onClick={() => handleDeleteFile(file.id)} className="text-red-500 hover:text-red-700 font-semibold">
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   // Reusable component for file upload forms
//   const renderFileUploadForm = (section) => (
//       <div>
//         <form onSubmit={(e) => handleFileSubmit(e, section)} className="max-w-lg">
//           <h2 className="text-2xl font-medium mb-4">Upload {section} Files</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Upload Videos, Photos, or PDFs</label>
//             <input
//               key={fileInputKey} type="file" accept="video/mp4,image/jpeg,image/png,application/pdf" multiple
//               onChange={(e) => setUploadFiles([...e.target.files])}
//               className="w-full p-2 border rounded" disabled={isSubmitting}
//             />
//           </div>
//           <button type="submit" className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
//             {isSubmitting ? "Uploading..." : "Upload Files"}
//           </button>
//         </form>
//         {renderFileList(existingFiles)}
//       </div>
//   );

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NBA/NAAC Admin Panel</h1>
//       <div className="flex flex-wrap gap-4 mb-8">
//         {SECTIONS.map((section) => (
//           <button
//             key={section}
//             onClick={() => handleSectionChange(section)}
//             className={`py-2 px-4 rounded ${activeSection === section ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"} hover:bg-blue-500 hover:text-white transition`}
//             disabled={isSubmitting}
//           >
//             {section}
//           </button>
//         ))}
//       </div>

//       {isLoading ? <p>Loading...</p> : (
//         <>
//           {activeSection === "Home" && (
//             <form onSubmit={handleHomeSubmit} className="max-w-4xl">
//               <h2 className="text-2xl font-medium mb-4">Update Home Content</h2>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Content</label>
//                 <textarea
//                   value={homeContent}
//                   onChange={(e) => setHomeContent(e.target.value)}
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   rows="5"
//                   placeholder="Enter text content for Home section"
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Upload New Images (this will replace existing ones)</label>
//                 <input
//                   key={`${fileInputKey}-images`} type="file" accept="image/jpeg,image/png" multiple
//                   onChange={(e) => setHomeFiles([...e.target.files])}
//                   className="w-full p-2 border rounded" disabled={isSubmitting}
//                 />
//               </div>
//                <div className="mb-4">
//                  <label className="block text-gray-700 mb-2">Upload New PDF (this will replace the existing one)</label>
//                  <input
//                   key={`${fileInputKey}-pdf`} type="file" accept="application/pdf"
//                   onChange={(e) => setHomePdf(e.target.files[0])}
//                   className="w-full p-2 border rounded" disabled={isSubmitting}
//                 />
//               </div>
//               <button type="submit" className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
//                 {isSubmitting ? "Saving..." : "Save Home Content"}
//               </button>
//                {/* Display existing home content */}
//                <div className="mt-6">
//                  <h3 className="text-xl font-medium mb-2">Current Live Content</h3>
//                  {existingHomeData.images.length > 0 && (
//                      <>
//                      <p className="font-semibold text-gray-700">Images:</p>
//                      <div className="flex flex-wrap gap-4 mt-2">
//                          {existingHomeData.images.map((img, idx) => (
//                              <img key={idx} src={`http://localhost:3663${img}`} alt={`home-img-${idx}`} className="w-32 h-32 object-cover rounded"/>
//                          ))}
//                      </div>
//                      </>
//                  )}
//                   {existingHomeData.pdf && (
//                       <div className="mt-4">
//                       <p className="font-semibold text-gray-700">PDF:</p>
//                       <a href={`http://localhost:3663${existingHomeData.pdf.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                           {existingHomeData.pdf.title}
//                       </a>
//                       </div>
//                   )}
//               </div>
//             </form>
//           )}
          
//           {/* ✨ RENDER GENERIC FORM FOR ALL OTHER SECTIONS */}
//           {activeSection !== "Home" && renderFileUploadForm(activeSection)}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminNBANAAC;






// AdminNBANAAC.jsx

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// FIX: Separated the Home component from the main logic to prevent state conflicts.
const HomeSection = () => {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [existingData, setExistingData] = useState({ images: [], pdf: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const fetchHomeData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:3663/api/nba-naac/home", { withCredentials: true });
            setContent(res.data.content || "");
            setExistingData({
                images: res.data.image_urls || [],
                pdf: res.data.pdf_url ? { url: res.data.pdf_url, title: res.data.pdf_title } : null,
            });
        } catch (error) {
            toast.error("Error fetching Home data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHomeData();
    }, [fetchHomeData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            toast.error("Please enter content for Home section.");
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("content", content);
        files.forEach((file) => formData.append("files", file));
        if (pdf) formData.append("files", pdf);

        try {
            const response = await axios.post("http://localhost:3663/api/nba-naac/home", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            toast.success(response.data.message);
            setFiles([]);
            setPdf(null);
            setFileInputKey(Date.now());
            fetchHomeData(); 
        } catch (error) {
            toast.error(error.response?.data?.error || "Error saving Home content");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <p>Loading Home data...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl">
            <h2 className="text-2xl font-medium mb-4">Update Home Content</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5" placeholder="Enter text content for Home section" disabled={isSubmitting}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload New Images (this will replace existing ones)</label>
                <input key={`${fileInputKey}-images`} type="file" accept="image/jpeg,image/png" multiple
                    onChange={(e) => setFiles([...e.target.files])}
                    className="w-full p-2 border rounded" disabled={isSubmitting}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload New PDF (this will replace the existing one)</label>
                <input key={`${fileInputKey}-pdf`} type="file" accept="application/pdf"
                    onChange={(e) => setPdf(e.target.files[0])}
                    className="w-full p-2 border rounded" disabled={isSubmitting}/>
            </div>
            <button type="submit" className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Home Content"}
            </button>
            <div className="mt-6">
                <h3 className="text-xl font-medium mb-2">Current Live Content</h3>
                {existingData.images.length > 0 && (
                    <><p className="font-semibold text-gray-700">Images:</p>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {existingData.images.map((img, idx) => (
                                <img key={idx} src={`http://localhost:3663${img}`} alt={`home-img-${idx}`} className="w-32 h-32 object-cover rounded"/>
                            ))}
                        </div></>
                )}
                {existingData.pdf && (
                    <div className="mt-4">
                        <p className="font-semibold text-gray-700">PDF:</p>
                        <a href={`http://localhost:3663${existingData.pdf.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {existingData.pdf.title}
                        </a>
                    </div>
                )}
            </div>
        </form>
    );
};


const AdminNBANAAC = () => {
  const SECTIONS = ["Home", "NBA", "NAAC", "NAAC Appeals", "AQAR 2019-20", "AQAR 2020-21"];
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NBA/NAAC Admin Panel</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        {SECTIONS.map((section) => (
          <button key={section} onClick={() => setActiveSection(section)}
            className={`py-2 px-4 rounded ${activeSection === section ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"} hover:bg-blue-500 hover:text-white transition`}>
            {section}
          </button>
        ))}
      </div>

      {activeSection === 'Home' ? <HomeSection /> : <FileSection activeSection={activeSection} />}
    </div>
  );
};

// FIX: Created a dedicated component for all file-based sections.
const FileSection = ({ activeSection }) => {
    const [uploadFiles, setUploadFiles] = useState([]);
    const [appealRows, setAppealRows] = useState([{ id: 1, matrices: "", file: null }]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:3663/api/nba-naac/files/${activeSection}`, { withCredentials: true });
            setExistingFiles(res.data);
        } catch (error) {
            setExistingFiles([]);
            if (error.response?.status !== 404) {
                toast.error(`Error fetching ${activeSection} data.`);
            }
        } finally {
            setIsLoading(false);
        }
    }, [activeSection]);

    useEffect(() => {
        fetchData();
        setAppealRows([{ id: 1, matrices: "", file: null }]);
        setUploadFiles([]);
    }, [activeSection, fetchData]);

    const handleAppealChange = (index, field, value) => {
        const newRows = [...appealRows];
        newRows[index][field] = value;
        setAppealRows(newRows);
    };
    const addAppealRow = () => setAppealRows([...appealRows, { id: Date.now(), matrices: "", file: null }]);
    const removeAppealRow = (index) => setAppealRows(appealRows.filter((_, i) => i !== index));

    const handleAppealSubmit = async (e) => {
        e.preventDefault();
        const rowsToUpload = appealRows.filter(row => row.matrices && row.file);
        if (rowsToUpload.length === 0) {
            toast.error("Please fill out at least one row with both a Matrices value and a file.");
            return;
        }
        setIsSubmitting(true);
        for (const row of rowsToUpload) {
            const formData = new FormData();
            formData.append("section", "NAAC Appeals");
            formData.append("file", row.file);
            formData.append("fileTitle", row.file.name);
            formData.append("matrices", row.matrices);
            try {
                await axios.post("http://localhost:3663/api/nba-naac/upload", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
                toast.success(`'${row.matrices}' uploaded successfully.`);
            } catch (error) {
                toast.error(error.response?.data?.error || `Error uploading file for '${row.matrices}'`);
            }
        }
        setAppealRows([{ id: 1, matrices: "", file: null }]);
        fetchData();
        setIsSubmitting(false);
    };

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (uploadFiles.length === 0) {
            toast.error(`Please select files for ${activeSection}.`);
            return;
        }
        setIsSubmitting(true);
        for (const file of uploadFiles) {
            const formData = new FormData();
            formData.append("section", activeSection);
            formData.append("file", file);
            formData.append("fileTitle", file.name);
            try {
                await axios.post("http://localhost:3663/api/nba-naac/upload", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
                toast.success(`'${file.name}' uploaded successfully.`);
            } catch (error) {
                toast.error(error.response?.data?.error || `Error uploading ${activeSection} file`);
            }
        }
        setUploadFiles([]);
        setFileInputKey(Date.now());
        fetchData();
        setIsSubmitting(false);
    };

    const handleDeleteFile = async (fileId) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        try {
            await axios.delete(`http://localhost:3663/api/nba-naac/files/${fileId}`, { withCredentials: true });
            toast.success("File deleted successfully!");
            // This is the crucial part that now works correctly
            setExistingFiles(prev => prev.filter(f => f.id !== fileId));
        } catch (error) {
            toast.error("Failed to delete file.");
        }
    };

    const renderFileList = () => (
        <div className="mt-6">
            <h3 className="text-xl font-medium mb-2">Currently Uploaded Files</h3>
            {existingFiles.length === 0 ? <p>No files uploaded for this section yet.</p> : (
                <ul className="space-y-2">
                    {existingFiles.map(file => (
                        <li key={file.id} className="flex justify-between items-center p-2 bg-white rounded border">
                            <span>
                                {file.matrices && <span className="font-bold">{file.matrices}: </span>}
                                <a href={`http://localhost:3663${file.file_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{file.file_title}</a>
                            </span>
                            <button onClick={() => handleDeleteFile(file.id)} className="text-red-500 hover:text-red-700 font-semibold ml-4">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    if (isLoading) return <p>Loading {activeSection} data...</p>;

    if (activeSection === "NAAC Appeals") {
        return (
            <div>
                <form onSubmit={handleAppealSubmit} className="max-w-3xl">
                    <h2 className="text-2xl font-medium mb-4">Upload NAAC Appeals</h2>
                    {appealRows.map((row, index) => (
                        <div key={row.id} className="flex items-center gap-4 mb-4 p-2 border rounded">
                            <div className="flex-1"><label className="block text-gray-700 mb-1 text-sm">Matrices</label><input type="text" placeholder="e.g., Criteria 2" value={row.matrices} onChange={(e) => handleAppealChange(index, 'matrices', e.target.value)} className="w-full p-2 border rounded" disabled={isSubmitting}/></div>
                            <div className="flex-1"><label className="block text-gray-700 mb-1 text-sm">Supporting File (PDF)</label><input type="file" accept="application/pdf" onChange={(e) => handleAppealChange(index, 'file', e.target.files[0])} className="w-full p-1.5 border rounded" disabled={isSubmitting}/></div>
                            <button type="button" onClick={() => removeAppealRow(index)} className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 self-end" disabled={isSubmitting}>&times;</button>
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <button type="button" onClick={addAppealRow} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600" disabled={isSubmitting}>Add Row</button>
                        <button type="submit" className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>{isSubmitting ? "Uploading..." : "Upload All"}</button>
                    </div>
                </form>
                {renderFileList()}
            </div>
        );
    }

    // Generic form for all other sections
    return (
        <div>
            <form onSubmit={handleFileSubmit} className="max-w-lg">
                <h2 className="text-2xl font-medium mb-4">Upload {activeSection} Files</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Upload Videos, Photos, or PDFs</label>
                    <input key={fileInputKey} type="file" accept="video/mp4,image/jpeg,image/png,application/pdf" multiple onChange={(e) => setUploadFiles([...e.target.files])} className="w-full p-2 border rounded" disabled={isSubmitting}/>
                </div>
                <button type="submit" className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>{isSubmitting ? "Uploading..." : "Upload Files"}</button>
            </form>
            {renderFileList()}
        </div>
    );
};

export default AdminNBANAAC;
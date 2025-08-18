

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminNIRF = () => {
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [content, setContent] = useState("");
//   const [file, setFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

//   const handleYearSelect = (year) => {
//     setSelectedYear(year);
//     setContent("");
//     setFile(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedYear || !content) {
//       toast.error("Please select a year and enter content.");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("year", selectedYear);
//     formData.append("content", content);
//     if (file) formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:3663/api/nirf/data", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       setContent("");
//       setFile(null);
//       setSelectedYear(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error uploading data");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NIRF Admin Panel</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
//         {years.map((year) => (
//           <button
//             key={year}
//             onClick={() => handleYearSelect(year)}
//             className={`py-2 px-4 rounded ${
//               selectedYear === year ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"
//             } hover:bg-blue-500 hover:text-white transition`}
//             disabled={isSubmitting}
//           >
//             NIRF {year}
//           </button>
//         ))}
//       </div>

//       {selectedYear && (
//         <form onSubmit={handleSubmit} className="max-w-lg">
//           <h2 className="text-2xl font-medium mb-4">Upload for NIRF {selectedYear}</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Content</label>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="5"
//               placeholder="Enter text content for this year"
//               disabled={isSubmitting}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Upload PDF</label>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="w-full p-2 border rounded"
//               disabled={isSubmitting}
//             />
//           </div>
//           <button
//             type="submit"
//             className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AdminNIRF;




// AdminNIRF.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNIRF = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null); // ✨ State for existing PDF
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // To reset file input

  const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

  // ✨ Fetches data when a year is selected
  const handleYearSelect = async (year) => {
    setSelectedYear(year);
    setIsLoading(true);
    // Reset fields
    setContent("");
    setFile(null);
    setExistingPdf(null);
    setFileInputKey(Date.now());
    
    try {
        const response = await axios.get(`http://localhost:3663/api/nirf/data?year=${year}`, { withCredentials: true });
        setContent(response.data.content);
        if(response.data.pdf_url) {
            setExistingPdf({ url: response.data.pdf_url, title: response.data.pdf_title });
        }
    } catch (error) {
        if (error.response?.status === 404) {
             toast.info(`No data found for ${year}. You can create a new entry.`);
        } else {
            toast.error("Error fetching NIRF data.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear || !content) {
      toast.error("Please select a year and enter content.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("year", selectedYear);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3663/api/nirf/data", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success(response.data.message);
      // Refresh data for the current year
      handleYearSelect(selectedYear);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ Handler for deleting NIRF data for the selected year
  const handleDelete = async () => {
    if (!selectedYear || !window.confirm(`Are you sure you want to delete all data for NIRF ${selectedYear}?`)) {
        return;
    }
    
    setIsSubmitting(true);
    try {
        const response = await axios.delete(`http://localhost:3663/api/nirf/data/${selectedYear}`, { withCredentials: true });
        toast.success(response.data.message);
        // Clear the form completely
        setContent("");
        setFile(null);
        setExistingPdf(null);
        setSelectedYear(null);
    } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting data");
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NIRF Admin Panel</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`py-2 px-4 rounded ${selectedYear === year ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"} hover:bg-blue-500 hover:text-white transition`}
            disabled={isSubmitting}
          >
            NIRF {year}
          </button>
        ))}
      </div>

      {selectedYear && (
        <>
        {isLoading ? <p>Loading data for {selectedYear}...</p> : (
            <form onSubmit={handleSubmit} className="max-w-lg">
                <h2 className="text-2xl font-medium mb-4">{content ? 'Update' : 'Upload for'} NIRF {selectedYear}</h2>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Enter text content for this year"
                    disabled={isSubmitting}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload/Replace PDF</label>
                <input
                    key={fileInputKey}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-2 border rounded"
                    disabled={isSubmitting}
                />
                </div>
                {/* ✨ Display link to existing PDF */}
                {existingPdf && (
                    <div className="mb-4 p-2 bg-gray-200 rounded">
                        <p className="text-sm text-gray-800">
                            Current PDF:{" "}
                            <a href={`http://localhost:3663${existingPdf.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {existingPdf.title}
                            </a>
                        </p>
                    </div>
                )}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    {/* ✨ Delete button */}
                    {(content || existingPdf) && (
                         <button
                            type="button"
                            onClick={handleDelete}
                            className={`py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Deleting..." : "Delete Entry"}
                        </button>
                    )}
                </div>
            </form>
        )}
        </>
      )}
    </div>
  );
};

export default AdminNIRF;
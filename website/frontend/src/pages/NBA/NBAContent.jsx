// // NBAContent.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const backendBaseUrl = "http://localhost:3663"; // Backend URL

// // Home Content component (remains mostly the same)
// const HomeContent = () => {
//   const [data, setData] = useState({ content: "", image_urls: [], pdf_url: null, pdf_title: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3663/api/nba-naac/home");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching Home content:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NBA/NAAC Home</h1>
//       <div className="border-t-2 border-blue-500 my-4"></div>
//       <div className="mb-6 text-lg">{data.content || "No content available"}</div>
//       {Array.isArray(data.image_urls) && data.image_urls.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//           {data.image_urls.map((url, index) => (
//             <img key={index} src={`${backendBaseUrl}${url}`} alt={`Home Media ${index + 1}`} className="w-full h-48 object-cover rounded"/>
//           ))}
//         </div>
//       )}
//       {data.pdf_url && (
//         <div>
//           <h3 className="text-lg font-medium mb-2">{data.pdf_title || "Document"}</h3>
//           <iframe src={`${backendBaseUrl}${data.pdf_url}`} width="100%" height="800px" title={data.pdf_title || "Document"}/>
//         </div>
//       )}
//     </div>
//   );
// };

// // ✨ --- NEW REUSABLE COMPONENT FOR DISPLAYING FILES ---
// const FileDisplayComponent = ({ sectionName, title }) => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3663/api/nba-naac/files/${sectionName}`);
//         setFiles(response.data);
//       } catch (error) {
//         console.error(`Error fetching ${sectionName} files:`, error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFiles();
//   }, [sectionName]);

//   if (loading) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">{title}</h1>
//       <div className="border-t-2 border-blue-500 my-4"></div>
//       {files.length > 0 ? (
//         <div className="space-y-4">
//           {files.map((file) => (
//             <div key={file.id} className="border p-4 rounded bg-white shadow-sm">
//               <h3 className="text-xl font-medium mb-2">{file.file_title}</h3>
//               {file.file_type === "pdf" ? (
//                 <iframe src={`${backendBaseUrl}${file.file_url}`} width="100%" height="800px" title={file.file_title}/>
//               ) : file.file_type === "video" ? (
//                 <video src={`${backendBaseUrl}${file.file_url}`} controls className="w-full rounded"/>
//               ) : (
//                 <img src={`${backendBaseUrl}${file.file_url}`} alt={file.file_title} className="w-full h-auto object-cover rounded"/>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No files available for this section.</p>
//       )}
//     </div>
//   );
// };

// // ✨ USE THE REUSABLE COMPONENT FOR ALL FILE-BASED SECTIONS
// export const NBAContent = () => <FileDisplayComponent sectionName="NBA" title="NBA" />;
// export const NAACContent = () => <FileDisplayComponent sectionName="NAAC" title="NAAC" />;
// export const NAACAppealsContent = () => <FileDisplayComponent sectionName="NAAC Appeals" title="NAAC Appeals" />;
// export const AQAR19Content = () => <FileDisplayComponent sectionName="AQAR 2019-20" title="AQAR 2019-20" />;
// export const AQAR20Content = () => <FileDisplayComponent sectionName="AQAR 2020-21" title="AQAR 2020-21" />;
// export { HomeContent }; // Also export HomeContent

// NBAContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const backendBaseUrl = "http://localhost:3663";

// Home Content component (remains unchanged)
const HomeContent = () => {
  const [data, setData] = useState({
    content: "",
    image_urls: [],
    pdf_url: null,
    pdf_title: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendBaseUrl}/api/nba-naac/home`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Home content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen font-librefranklin">
      <h1 className="text-3xl font-playfair font-semibold mb-6">
        NBA/NAAC Home
      </h1>
      <div className=""></div>
      <div
        className="mb-6 text-lg ql-editor"
        dangerouslySetInnerHTML={{
          __html: data.content?.trim() || "No content available",
        }}
      />

      {Array.isArray(data.image_urls) && data.image_urls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {data.image_urls.map((url, index) => (
            <img
              key={index}
              src={`${backendBaseUrl}${url}`}
              alt={`Home Media ${index + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      )}
      {data.pdf_url && (
        <div>
          <h3 className="text-lg font-medium mb-2">
            {data.pdf_title || "Document"}
          </h3>
          <iframe
            src={`${backendBaseUrl}${data.pdf_url}`}
            width="100%"
            height="800px"
            title={data.pdf_title || "Document"}
          />
        </div>
      )}
    </div>
  );
};

// Reusable component for displaying files in a standard list format
const FileDisplayComponent = ({ sectionName, title }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/nba-naac/files/${sectionName}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error(`Error fetching ${sectionName} files:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [sectionName]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>
      {files.length > 0 ? (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="border p-4 rounded bg-white shadow-sm"
            >
              <h3 className="text-xl font-medium mb-2">{file.file_title}</h3>
              <a
                href={`${backendBaseUrl}${file.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View/Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No files available for this section.</p>
      )}
    </div>
  );
};

// ✨ --- NEW CUSTOM COMPONENT FOR NAAC APPEALS TABLE ---
const NAACAppealsContent = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/nba-naac/files/NAAC Appeals`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching NAAC Appeals files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="border p-6 bg-white shadow-md">
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-semibold">NAAC Appeal</h1>
          <p className="text-gray-600 mt-1">
            {"{Click on the Link below to View/Download}"}
          </p>
        </div>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left font-semibold text-gray-700 w-1/4">
                  Matrices
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Supporting information
                </th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr key={file.id} className="border-b">
                    <td className="p-3 align-top">{file.matrices}</td>
                    <td className="p-3 align-top">
                      <a
                        href={`${backendBaseUrl}${file.file_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.file_title}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-gray-500">
                    No appeal documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Use the reusable component for all other file-based sections
export const NBAContent = () => (
  <FileDisplayComponent sectionName="NBA" title="NBA" />
);
export const NAACContent = () => (
  <FileDisplayComponent sectionName="NAAC" title="NAAC" />
);
export const AQAR19Content = () => (
  <FileDisplayComponent sectionName="AQAR 2019-20" title="AQAR 2019-20" />
);
export const AQAR20Content = () => (
  <FileDisplayComponent sectionName="AQAR 2020-21" title="AQAR 2020-21" />
);
export { HomeContent, NAACAppealsContent };

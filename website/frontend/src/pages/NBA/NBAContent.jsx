// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const backendBaseUrl = "http://localhost:3663"; // Backend URL

// const HomeContent = () => {
//   const [data, setData] = useState({ content: "", image_urls: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3663/api/nba-naac/home");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching Home content:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NBA/NAAC Home</h1>
//       <div className="border-t-2 border-blue-500 my-4"></div>
//       <div className="mb-6 text-lg">{data.content || "No content available"}</div>
//       {data.image_urls && data.image_urls.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {data.image_urls.map((url, index) => (
//             <img
//               key={index}
//               src={`${backendBaseUrl}${url}`}
//               alt={`Home Image ${index + 1}`}
//               className="w-full h-48 object-cover rounded"
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No images available</p>
//       )}
//     </div>
//   );
// };

// const NBAContent = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get("http://localhost:3663/api/nba-naac/files/NBA");
//         setFiles(response.data);
//       } catch (error) {
//         console.error("Error fetching NBA files:", error);
//       }
//     };
//     fetchFiles();
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NBA</h1>
//       <div className="border-t-2 border-blue-500 my-4"></div>
//       {files.length > 0 ? (
//         <div className="space-y-4">
//           {files.map((file) => (
//             <div key={file.id} className="border p-4 rounded">
//               <h3 className="text-lg font-medium">{file.file_title}</h3>
//               {file.file_type === "pdf" ? (
//                 <iframe
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   width="100%"
//                   height="800px"
//                   title={file.file_title}
//                 />
//               ) : file.file_type === "video" ? (
//                 <video
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   controls
//                   className="w-full h-48 object-cover rounded"
//                 />
//               ) : (
//                 <img
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   alt={file.file_title}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No files available</p>
//       )}
//     </div>
//   );
// };

// const NAACContent = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get("http://localhost:3663/api/nba-naac/files/NAAC");
//         setFiles(response.data);
//       } catch (error) {
//         console.error("Error fetching NAAC files:", error);
//       }
//     };
//     fetchFiles();
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <h1 className="text-3xl font-semibold mb-6">NAAC</h1>
//       <div className="border-t-2 border-blue-500 my-4"></div>
//       {files.length > 0 ? (
//         <div className="space-y-4">
//           {files.map((file) => (
//             <div key={file.id} className="border p-4 rounded">
//               <h3 className="text-lg font-medium">{file.file_title}</h3>
//               {file.file_type === "pdf" ? (
//                 <iframe
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   width="100%"
//                   height="800px"
//                   title={file.file_title}
//                 />
//               ) : file.file_type === "video" ? (
//                 <video
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   controls
//                   className="w-full h-48 object-cover rounded"
//                 />
//               ) : (
//                 <img
//                   src={`${backendBaseUrl}${file.file_url}`}
//                   alt={file.file_title}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No files available</p>
//       )}
//     </div>
//   );
// };

// export { HomeContent, NBAContent, NAACContent };

import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const backendBaseUrl = "http://localhost:3663"; // Backend URL

const HomeContent = () => {
  const [data, setData] = useState({
    content: "",
    image_urls: [],
    pdf_url: null,
    pdf_title: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3663/api/nba-naac/home",
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching Home content:", error);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("Current Data State:", data);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans text-red-500">
        {error}
      </div>
    );
  }

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

      {Array.isArray(data.image_urls) && data.image_urls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {data.image_urls.map((url, index) => (
            <img
              key={index}
              src={`${backendBaseUrl}${url}`}
              alt={`Home Image ${index + 1}`}
              className="w-full h-48 object-cover rounded"
              onError={(e) =>
                console.error(`Failed to load image: ${backendBaseUrl}${url}`)
              }
            />
          ))}
        </div>
      ) : (
        ""
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
            onError={(e) =>
              console.error(
                `Failed to load PDF: ${backendBaseUrl}${data.pdf_url}`
              )
            }
          />
        </div>
      )}
    </div>
  );
};

// NBAContent and NAACContent remain unchanged
const NBAContent = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3663/api/nba-naac/files/NBA",
          {
            withCredentials: true,
          }
        );
        console.log("NBA Files Response:", response.data);
        setFiles(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching NBA files:", error);
        setError("Failed to load NBA files. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NBA</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>
      {files.length > 0 ? (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border p-4 rounded">
              <h3 className="text-lg font-medium">{file.file_title}</h3>
              {file.file_type === "pdf" ? (
                <iframe
                  src={`${backendBaseUrl}${file.file_url}`}
                  width="100%"
                  height="800px"
                  title={file.file_title}
                />
              ) : file.file_type === "video" ? (
                <video
                  src={`${backendBaseUrl}${file.file_url}`}
                  controls
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <img
                  src={`${backendBaseUrl}${file.file_url}`}
                  alt={file.file_title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

const NAACContent = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3663/api/nba-naac/files/NAAC",
          {
            withCredentials: true,
          }
        );
        console.log("NAAC Files Response:", response.data);
        setFiles(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching NAAC files:", error);
        setError("Failed to load NAAC files. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NAAC</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>
      {files.length > 0 ? (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border p-4 rounded">
              <h3 className="text-lg font-medium">{file.file_title}</h3>
              {file.file_type === "pdf" ? (
                <iframe
                  src={`${backendBaseUrl}${file.file_url}`}
                  width="100%"
                  height="800px"
                  title={file.file_title}
                />
              ) : file.file_type === "video" ? (
                <video
                  src={`${backendBaseUrl}${file.file_url}`}
                  controls
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <img
                  src={`${backendBaseUrl}${file.file_url}`}
                  alt={file.file_title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

export { HomeContent, NBAContent, NAACContent };

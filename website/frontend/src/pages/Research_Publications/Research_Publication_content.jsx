
// import React, { useState, useEffect } from "react";
// import axios from "axios";



// export const Home = () => {
//   const [researchText, setResearchText] = useState([]);

//   useEffect(() => {
//     const fetchResearchText = async () => {
//       try {
//         const response = await axios.get("http://localhost:3663/api/research/home");
//         setResearchText(response.data);
//       } catch (error) {
//         console.error("Error fetching research text:", error);
//       }
//     };
//     fetchResearchText();
//   }, []);


//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", padding: "20px" }}>
//       <h2 style={{ fontSize: "2em", marginBottom: "10px" }}>Research and Publications</h2>
//       <hr style={{ border: "1px solid #ccc", marginBottom: "20px" }} />
//       {researchText.length > 0 ? (
//         researchText.map((text) => (
//           <div
//             key={text.id}
//             dangerouslySetInnerHTML={{ __html: text.content }}
//           />
//         ))
//       ) : (
//         <p>No content available.</p>
//       )}
//     </div>
//   );
// };

// const PdfSection = ({ section }) => {
//   const [pdfs, setPdfs] = useState([]);

//   useEffect(() => {
//     const fetchPdfs = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3663/api/research/pdf?section=${section}`
//         );
//         setPdfs(response.data); // Set all PDFs for the section
//       } catch (error) {
//         console.error(`Error fetching PDFs for ${section}:`, error);
//       }
//     };
//     fetchPdfs();
//   }, [section]);

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", padding: "20px" }}>
//       <h2 style={{ fontSize: "2em", marginBottom: "10px" }}>{section.replace(/-/g, " ")}</h2>
//       <hr style={{ border: "1px solid #ccc", marginBottom: "20px" }} />
//       {pdfs.length > 0 ? (
//         <div>
//           <p>Available PDFs for {section.replace(/-/g, " ")}:</p>
//           <ul>
//             {pdfs.map((pdf) => (
//               <li key={pdf.id}>
//                 <a
//                   href={`http://localhost:3663${pdf.content}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "blue", textDecoration: "underline" }}
//                 >
//                   {pdf.filename || "Unnamed PDF"}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No PDFs available for this section.</p>
//       )}
//     </div>
//   );
// };
// export const Research_Projects = () => <PdfSection section="research-projects" />;
// export const Publications = () => <PdfSection section="publications" />;
// export const Books_Published = () => <PdfSection section="books-published" />;
// export const Consultancy_Projects = () => <PdfSection section="consultancy-projects" />;
// export const Patents = () => <PdfSection section="patents" />;
// export const Code_of_Conduct = () => <PdfSection section="code-of-conduct" />;

import React, { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [researchText, setResearchText] = useState([]);

  useEffect(() => {
    const fetchResearchText = async () => {
      try {
        // ✅ FIXED: Corrected the API endpoint URL
        const response = await axios.get("http://localhost:3663/api/department/research/home");
        setResearchText(response.data);
      } catch (error) {
        console.error("Error fetching research text:", error);
      }
    };
    fetchResearchText();
  }, []);


  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", padding: "20px" }}>
      <h2 style={{ fontSize: "2em", marginBottom: "10px" }}>Research and Publications</h2>
      <hr style={{ border: "1px solid #ccc", marginBottom: "20px" }} />
      {researchText.length > 0 ? (
        researchText.map((text) => (
          <div
            key={text.id}
            dangerouslySetInnerHTML={{ __html: text.content }}
          />
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

const PdfSection = ({ section }) => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        // ✅ FIXED: Corrected the API endpoint URL
        const response = await axios.get(
          `http://localhost:3663/api/department/research/pdf?section=${section}`
        );
        setPdfs(response.data);
      } catch (error) {
        console.error(`Error fetching PDFs for ${section}:`, error);
      }
    };
    fetchPdfs();
  }, [section]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", padding: "20px" }}>
      <h2 style={{ textTransform: "capitalize", fontSize: "2em", marginBottom: "10px" }}>{section.replace(/-/g, " ")}</h2>
      <hr style={{ border: "1px solid #ccc", marginBottom: "20px" }} />
      {pdfs.length > 0 ? (
        <div>
          <ul>
            {pdfs.map((pdf) => (
              <li key={pdf.id} style={{ marginBottom: "10px" }}>
                <a
                  href={`http://localhost:3663${pdf.content}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {pdf.filename || "Unnamed PDF"}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No PDFs available for this section.</p>
      )}
    </div>
  );
};
export const Research_Projects = () => <PdfSection section="research-projects" />;
export const Publications = () => <PdfSection section="publications" />;
export const Books_Published = () => <PdfSection section="books-published" />;
export const Consultancy_Projects = () => <PdfSection section="consultancy-projects" />;
export const Patents = () => <PdfSection section="patents" />;
export const Code_of_Conduct = () => <PdfSection section="code-of-conduct" />;
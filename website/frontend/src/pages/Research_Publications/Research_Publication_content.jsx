import React, { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [researchText, setResearchText] = useState([]);

  useEffect(() => {
    const fetchResearchText = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3663/api/department/research/home"
        );
        setResearchText(response.data);
      } catch (error) {
        console.error("Error fetching research text:", error);
      }
    };
    fetchResearchText();
  }, []);

  return (
    <div className="leading-relaxed">
      <h2 className="text-3xl font-playfair font-semibold mb-10 text-black">
        Research and Publications
      </h2>

      {researchText.length > 0 ? (
        researchText.map((text) => (
          <div
            key={text.id}
            className="mb-6 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: text.content }}
          />
        ))
      ) : (
        <p className="text-gray-600">No content available.</p>
      )}
    </div>
  );
};

const PdfSection = ({ section }) => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
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
    <div className="">
      <h2 className="text-3xl font-playfair font-semibold text-black capitalize mb-10">
        {section.replace(/-/g, " ")}
      </h2>

      {pdfs.length > 0 ? (
        <ul className="space-y-3">
          {pdfs.map((pdf) => (
            <li key={pdf.id}>
              <a
                href={`http://localhost:3663${pdf.content}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {pdf.filename || "Unnamed PDF"}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No PDFs available for this section.</p>
      )}
    </div>
  );
};

export const Research_Projects = () => (
  <PdfSection section="research-projects" />
);
export const Publications = () => <PdfSection section="publications" />;
export const Books_Published = () => <PdfSection section="books-published" />;
export const Consultancy_Projects = () => (
  <PdfSection section="consultancy-projects" />
);
export const Patents = () => <PdfSection section="patents" />;
export const Code_of_Conduct = () => <PdfSection section="code-of-conduct" />;

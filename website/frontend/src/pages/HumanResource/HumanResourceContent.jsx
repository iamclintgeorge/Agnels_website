import React, { useEffect, useState } from "react";
import axios from "axios";

export const Teaching_Staff = () => {
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPDFs("teachingstaff", setPdfs);
  }, []);

  const fetchPDFs = async (category, setter) => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/humanResource/pdf/${category}`
      );
      setter(response.data);
    } catch (err) {
      console.error(`Failed to load ${category} PDFs:`, err);
      setError("Failed to load PDFs.");
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-playfair font-semibold mb-10">
        List of Teaching Staff
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {pdfs.length > 0 ? (
        <ul>
          {pdfs.map((pdf, idx) => (
            <li key={idx}>
              <a
                href={`http://localhost:3663/cdn/${pdf.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {pdf.title || pdf.file_url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents uploaded.</p>
      )}
    </div>
  );
};

export const Non_Teaching_Staff = () => {
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPDFs("nonteachingstaff", setPdfs);
  }, []);

  const fetchPDFs = async (category, setter) => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/humanResource/pdf/${category}`
      );
      setter(response.data);
    } catch (err) {
      console.error(`Failed to load ${category} PDFs:`, err);
      setError("Failed to load PDFs.");
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-playfair font-semibold mb-10">
        List of Non-Teaching Staff
      </h2>
      <h1 className="text-xl font-librefranklin font-semibold mt-12 mb-6">
        Non-Technical/Administrative Staff
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      {pdfs.length > 0 ? (
        <iframe
          src={`http://localhost:3663/cdn/${pdfs[0].file_url}`}
          width="100%"
          height="800px"
          title="Non-Technical"
        />
      ) : (
        <p>No document available to preview.</p>
      )}
    </div>
  );
};

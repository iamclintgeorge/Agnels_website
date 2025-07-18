import React, { useEffect, useState } from "react";
import axios from "axios";

//1. Institution's Innovation Council
export const Institutions_Innovation_Council = () => {
  const [content, setContent] = useState("<p>Loading...</p>");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("http://localhost:3663/api/iic/text", {
          params: { section: "iic_council" },
        });
        setContent(res.data?.content || "<p>No content available.</p>");
      } catch (err) {
        console.error("Error fetching IIC content:", err);
        setError("Failed to load content.");
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
      <h1 className="text-4xl font-semibold mb-6">Institution's Innovation Council (IIC)</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>
      {error && <p className="text-red-500">{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

// 2. Innovation and Startup Policy
export const Innovation_and_Startup_Policy = () => {
  const [text, setText] = useState("<p>Loading...</p>");
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      try {
        const res = await axios.get("http://localhost:3663/api/iic/text", {
          params: { section: "iic_policy" },
        });
        setText(res.data?.content || "<p>No content available.</p>");
      } catch (err) {
        console.error("Error fetching policy text:", err);
        setError("Failed to load policy text.");
      }
    };

    const fetchPDFs = async () => {
      try {
        const res = await axios.get("http://localhost:3663/api/iic/pdf");
        setPdfs(res.data || []);
      } catch (err) {
        console.error("Error fetching PDFs:", err);
        setError("Failed to load PDFs.");
      }
    };

    fetchText();
    fetchPDFs();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
      <h1 className="text-3xl font-semibold mb-6">Innovation and Startup Policy</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>

      {error && <p className="text-red-500">{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: text }} className="mb-8" />

      {/* Loop through each PDF and display it with a title + preview */}
      {pdfs.length > 0 ? (
        pdfs.map((pdf, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{pdf.title?.replace(".pdf", "")}</h2>
            <div className="border-t-2 border-blue-500 my-2"></div>
            <iframe
              src={`http://localhost:3663/uploads/IIC/${pdf.file_url}`}
              width="100%"
              height="700px"
              title={pdf.title}
              className="border"
            ></iframe>
          </div>
        ))
      ) : (
        <p>No PDFs uploaded.</p>
      )}
    </div>
  );
};


//3. Innovation Ambassador
export const Innovation_Ambassador = () => (
  <div className="p-4 bg-white shadow rounded-lg mt-4">
    <h2 className="text-3xl font-semibold">Innovation Ambassador</h2>
    <div className="border-t-2 border-blue-500 my-4"></div>
    <p className="text-lg text-gray-700 mb-6 leading-relaxed">Coming soon...</p>
  </div>
);

//4. Centre of Innovation and Entrepreneurship
export const Centre_of_Innovation_and_Entrepreneurship = () => (
  <div className="p-4 bg-white shadow rounded-lg mt-4">
    <h2 className="text-3xl font-semibold">Centre of Innovation and Entrepreneurship</h2>
    <div className="border-t-2 border-blue-500 my-4"></div>
    <p className="text-lg text-gray-700 mb-6 leading-relaxed">Coming soon...</p>
  </div>
);

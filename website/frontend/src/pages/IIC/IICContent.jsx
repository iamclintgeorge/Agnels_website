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
    <div className="min-h-screen font-sans text-gray-900">
      <h1 className="text-3xl font-playfair font-semibold mb-10">
        Institution's Innovation Council (IIC)
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div
        className="text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
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
    <div className="min-h-screen font-sans text-gray-900">
      <h1 className="text-3xl font-playfair font-semibold mb-10">
        Innovation and Startup Policy
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: text }} className="mb-8" />

      {/* Loop through each PDF and display it with a title + preview */}
      {pdfs.length > 0 ? (
        pdfs.map((pdf, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">
              {pdf.title?.replace(".pdf", "")}
            </h2>
            <div className="border-t-2 border-blue-500 my-2"></div>
            <iframe
              src={`http://localhost:3663/cdn/IIC/${pdf.file_url}`}
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
  <div className="mt-4">
    <h2 className="text-3xl font-playfair mb-10 font-semibold">
      Innovation Ambassador
    </h2>
    <p className="text-lg text-gray-700 mb-6 leading-relaxed"></p>
  </div>
);

//4. Centre of Innovation and Entrepreneurship
export const Centre_of_Innovation_and_Entrepreneurship = () => (
  <div className="mt-4">
    <h2 className="text-3xl font-playfair mb-10 font-semibold">
      Centre of Innovation and Entrepreneurship
    </h2>
    <p className="text-lg text-gray-700 mb-6 leading-relaxed"></p>
  </div>
);

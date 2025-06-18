import React, { useEffect, useState } from "react";
import StaticPages from "../../layouts/staticPages";
import axios from "axios";

const IIC = () => {
  const [iicContent, setIicContent] = useState(""); // For iic_council
  const [innovationPolicyText, setInnovationPolicyText] = useState(""); // Rich text HTML
  const [innovationPolicyPdfs, setInnovationPolicyPdfs] = useState([]); // PDF list
  
  const sidebar = [
    "Institution's Innovation Council",
    "Innovation and Startup Policy",
    "Innovation Ambassador",
    "Centre of Innovation and Entrepreneurship",
  ];

  useEffect(() => {
    // Fetch IIC council content
    const fetchIICContent = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/iic/text", {
          params: { section: "iic_council" },
        });
        setIicContent(response.data?.content || "<p>No content available.</p>");
      } catch (error) {
        console.error("Error fetching IIC content:", error);
        setIicContent("<p>Error loading content.</p>");
      }
    };

    // Fetch innovation and startup policy text
    const fetchInnovationPolicyText = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/iic/text", {
          params: { section: "iic_policy" },
        });
        setInnovationPolicyText(response.data?.content || "<p>No policy content available.</p>");
      } catch (error) {
        console.error("Error fetching policy text:", error);
        setInnovationPolicyText("<p>Policy content not found.</p>");
      }
    };

    // Fetch PDFs for innovation policy
    const fetchInnovationPolicyPdfs = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/iic/pdf");
        setInnovationPolicyPdfs(response.data || []);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setInnovationPolicyPdfs([]);
      }
    };

    fetchIICContent();
    fetchInnovationPolicyText();
    fetchInnovationPolicyPdfs();
  }, []);

  const content = {
    "Institution's Innovation Council": (
      <div dangerouslySetInnerHTML={{ __html: iicContent }} />
    ),
    "Innovation and Startup Policy": (
      <div>
        <div dangerouslySetInnerHTML={{ __html: innovationPolicyText }} className="mb-4" />
        {innovationPolicyPdfs.length > 0 ? (
          <div>
            <h4 className="font-semibold">Policy Documents:</h4>
            <ul className="list-disc pl-5 mt-2">
              {innovationPolicyPdfs.map((pdf, idx) => (
                <li key={idx}>
                  <a
                    href={`/Uploads/IIC/${pdf.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {pdf.title || pdf.filename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No PDFs uploaded.</p>
        )}
      </div>
    ),
    "Innovation Ambassador": <p>Coming soon...</p>,
    "Centre of Innovation and Entrepreneurship": <p>Coming soon...</p>,
  };

  return (
    <div>
      <StaticPages
        pagename={"IIC"}
        path={"Academics / IIC"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default IIC;

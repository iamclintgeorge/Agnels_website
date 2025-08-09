import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const ResultAnalysis = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Result Analysis"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="result-analysis-section">
      <h2 className="font-playfair text-3xl font-semibold">Result Analysis</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ResultAnalysis;

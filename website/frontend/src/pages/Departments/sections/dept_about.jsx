import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const About = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(departmentName, "About");
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="about-section">
      <h2>About {departmentName}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default About;

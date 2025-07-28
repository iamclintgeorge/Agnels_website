import React, { useEffect, useState } from "react";
// import { fetchDepartmentSectionContent } from "./api";

const AlumniTestimonials = ({ departmentName }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchDepartmentSectionContent(
        departmentName,
        "Alumni Testimonials"
      );
      setContent(data.Content);
    };
    getContent();
  }, [departmentName]);

  return (
    <div className="alumni-testimonials-section">
      <h2>Alumni Testimonials</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default AlumniTestimonials;

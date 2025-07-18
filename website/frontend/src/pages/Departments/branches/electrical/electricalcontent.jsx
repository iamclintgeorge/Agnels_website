import React, { useEffect, useState } from "react";
import { fetchDepartmentSectionContent } from "../../../../services/departmentService";

// Generic component for displaying department section content
const DepartmentSectionContent = ({ sectionName, departmentName = "Electrical Engineering" }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDepartmentSectionContent(departmentName, sectionName);
        setContent(data.Content || '<p>No content available.</p>');
      } catch (err) {
        setError('Failed to load content');
        setContent('<p>Error loading content. Please try again later.</p>');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [sectionName, departmentName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading {sectionName}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center min-h-[200px] flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="department-section-content">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose max-w-none"
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'inherit',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
};

export const About = () => {
  return <DepartmentSectionContent sectionName="About" />;
};

export const Head_of_Department = () => {
  return <DepartmentSectionContent sectionName="Head of Department" />;
};

export const Faculty_SupportingStaff = () => {
  return <DepartmentSectionContent sectionName="Faculty and Supporting Staff" />;
};

export const Committees_BoardOfStudy = () => {
  return <DepartmentSectionContent sectionName="Committees and Board of Studies" />;
};

export const Infrastructure = () => {
  return <DepartmentSectionContent sectionName="Infrastructure" />;
};

export const Activities = () => {
  return <DepartmentSectionContent sectionName="Activities" />;
};

export const Student_Association = () => {
  return <DepartmentSectionContent sectionName="Student Association" />;
};

export const Magazine = () => {
  return <DepartmentSectionContent sectionName="Magazine" />;
};

export const Syllabus = () => {
  return <DepartmentSectionContent sectionName="Syllabus" />;
};

export const Result_Analysis = () => {
  return <DepartmentSectionContent sectionName="Result Analysis" />;
};

export const Time_Table = () => {
  return <DepartmentSectionContent sectionName="Time Table" />;
};

export const Achievements = () => {
  return <DepartmentSectionContent sectionName="Achievements" />;
};

export const Academic_Calendar = () => {
  return <DepartmentSectionContent sectionName="Academic Calendar" />;
};

export const Innovative_Teaching = () => {
  return <DepartmentSectionContent sectionName="Innovative Teaching and Learning Methods" />;
};

export const Alumni_Testimonials = () => {
  return <DepartmentSectionContent sectionName="Alumni Testimonials" />;
};

export const Publications = () => {
  return <DepartmentSectionContent sectionName="Publications" />;
};

export const Projects = () => {
  return <DepartmentSectionContent sectionName="Projects" />;
};
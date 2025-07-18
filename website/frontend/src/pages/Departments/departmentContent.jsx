import React, { useEffect, useState } from "react";
import { fetchDepartmentContent } from "../../services/departmentService";

// Generic component for displaying department content
const DepartmentContent = ({ departmentName }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDepartmentContent(departmentName);
        setContent(data.Content || '<p>No content available.</p>');
      } catch (err) {
        setError('Failed to load content');
        setContent('<p>Error loading content. Please try again later.</p>');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [departmentName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading...</div>
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
    <div className="department-content">
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

export const Home = () => {
  return <DepartmentContent departmentName="Home" />;
};

export const Comps = () => {
  return <DepartmentContent departmentName="Computer Engineering" />;
};

export const Mech = () => {
  return <DepartmentContent departmentName="Mechanical Engineering" />;
};

export const EXTC = () => {
  return <DepartmentContent departmentName="Electronics and Telecommunication Engineering" />;
};

export const Electrical = () => {
  return <DepartmentContent departmentName="Electrical Engineering" />;
};

export const InfoT = () => {
  return <DepartmentContent departmentName="Information Technology" />;
};

export const Humanities = () => {
  return <DepartmentContent departmentName="Basic Science and Humanities" />;
};

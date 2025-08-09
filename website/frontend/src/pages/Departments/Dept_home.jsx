import React, { useEffect, useState } from "react";
import axios from "axios";
import "quill/dist/quill.snow.css";

const Dept_home = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get("http://localhost:3663/api/department/home");
      console.log("Fetched content:", res.data);
      setContent(res.data[0].Content);
    } catch (err) {
      console.error("Error fetching department home content:", err);
      setError("Failed to load content.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-playfair font-bold mb-10">
        Department Home
      </h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          className="ql-editor text-justify font-librefranklin"
          style={{ padding: 0 }} // Optional: removes default padding from .ql-editor
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

export default Dept_home;

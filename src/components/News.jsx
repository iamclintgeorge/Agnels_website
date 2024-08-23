import React, { useState, useEffect } from "react";
import "../index.css";

const News = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(
      "Institute Level Provisional Merit List for Admission to the First Year Engineering for the A.Y.2024-25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fee Approval Proposal for Academic Year 2024-25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NBA Accreditation to Computer Engineering, Mechanical Engineering, Electronics and Telecommunication Engg., Electrical Engineering for three years up to June 2025&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NIRF 2020 Rank Band : 201-250"
    );
  }, []);

  return (
    <div className="flex items-center">
      <div className="latest-news bg-yellow-400 w-48 h-16 rounded-lg p-4">
        <h1 className="text-black font-bold">Latest News</h1>
      </div>
      <div className="headline-container bg-blue-500 w-full h-16 rounded-lg p-4 text-white font-bold overflow-hidden">
        <div id="headline" className="marquee">
          {/* used "dangerouslySetInnerHTML to enable &nbsp;" */}
          <span dangerouslySetInnerHTML={{ __html: text }}></span>
          <span dangerouslySetInnerHTML={{ __html: text }}></span>
        </div>
      </div>
    </div>
  );
};

export default News;

import React, { useState, useEffect } from "react";
import "../styles/Header.css"; // Custom styles if needed

const News = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Simulating news items fetched from an API
    setNewsItems([
      "Institute Level Provisional Merit List for Admission to the First Year Engineering for the A.Y.2024-25",
      "Fee Approval Proposal for Academic Year 2024-25",
      "NBA Accreditation to Computer Engineering, Mechanical Engineering, Electronics and Telecommunication Engg., Electrical Engineering for three years up to June 2025",
      "NIRF 2020 Rank Band : 201-250",
      "New Sports Infrastructure Opened",
      "Placement Drive for Batch 2024",
    ]);
  }, []);

  // bg-[#102239]

  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="w-full h-12 pt-2 bg-[#102239] text-white overflow-hidden font-librefranklin text-base md:text-base lg:text-base">
        <div className="marquee flex animate-marquee whitespace-nowrap">
          {/* Render the news items with dots separating them */}
          {newsItems.map((item, index) => (
            <span key={index} className="mr-4 flex items-center">
              {/* News text */}
              <span dangerouslySetInnerHTML={{ __html: item }}></span>
              {/* Dot between news items */}
              {index < newsItems.length - 1 && (
                <span className="ml-5 text-[#AE9142] text-xl md:text-3xl lg:text-4xl">
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

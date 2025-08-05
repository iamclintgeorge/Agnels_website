import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Header.css";          // marquee CSS you already have

function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:3663/api/home/news");
        // res.data.result is an array of rows – take the subject for the marquee
        const titles = res.data?.result?.map((row) => row.subject) || [];
        setNewsItems(titles);
      } catch (err) {
        console.error("Error fetching news:", err);
        // Optional fallback (leave empty array if you prefer)
        setNewsItems(["Unable to load news at the moment"]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="w-full h-12 pt-2 bg-[#102239] text-white overflow-hidden font-librefranklin text-base">
        <div className="marquee flex animate-marquee whitespace-nowrap">
          {newsItems.map((item, idx) => (
            <span key={idx} className="mr-4 flex items-center">
              {/* News text */}
              <span dangerouslySetInnerHTML={{ __html: item }}></span>
              {/* Dot between news items */}
              {idx < newsItems.length - 1 && (
                <span className="ml-5 text-[#AE9142] text-xl">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
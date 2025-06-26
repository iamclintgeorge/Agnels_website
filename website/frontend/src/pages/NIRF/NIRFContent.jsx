

import React, { useEffect, useState } from "react";
import axios from "axios";

const NIRFYearComponent = ({ year }) => {
  const [data, setData] = useState({ content: "", pdf_url: "", pdf_title: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3663/api/nirf/data", {
          params: { year },
        });
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching NIRF ${year} data:`, error);
      }
    };
    fetchData();
  }, [year]);

  // Define the backend base URL
  const backendBaseUrl = "http://localhost:3663";
  // Construct the full PDF URL
  const pdfUrl = data.pdf_url ? `${backendBaseUrl}${data.pdf_url}` : "";

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold mb-6">NIRF {year}</h1>
      <div className="border-t-2 border-blue-500 my-4"></div>
      <div className="mb-6 text-lg">{data.content || "No content available"}</div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="800px"
          title={`NIRF ${year}`}
        />
      ) : (
        <p>No PDF available</p>
      )}
    </div>
  );
};

export const NIRF_2025 = () => <NIRFYearComponent year="2025" />;
export const NIRF_2024 = () => <NIRFYearComponent year="2024" />;
export const NIRF_2023 = () => <NIRFYearComponent year="2023" />;
export const NIRF_2022 = () => <NIRFYearComponent year="2022" />;
export const NIRF_2021 = () => <NIRFYearComponent year="2021" />;
export const NIRF_2020 = () => <NIRFYearComponent year="2020" />;
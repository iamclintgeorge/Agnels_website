import React, { useEffect, useState } from "react";
import axios from "axios";

const PrincipalDesk = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/aboutus/principaldesk"
      );
      console.log("Fetched Text:", response.data);
      setMessage(response.data);
      // if (response.data.length > 0 && response.data[0].id) {
      //   setContent(response.data[0].Content);
      // } else {
      //   console.warn("No valid id or content in fetched data:", response.data);
      // }
    } catch (err) {
      console.error("Error loading text:", err);
    }
  };

  // console.log(message[0].Content);

  return (
    <>
      <p className="text-black text-2xl font-inter font-bold mb-3">
        Principal's Desk
      </p>
      <div className="text-justify">
        {message.length > 0 ? message[0].Content : "No content"}
      </div>
    </>
  );
};

export default PrincipalDesk;

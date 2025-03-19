import React, { useEffect, useState } from "react";
import axios from "axios";

const IntroText = () => {
  const [introtext, setIntroText] = useState([]);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/home/introtext"
      );
      console.log("Fetched Text:", response.data);
      setIntroText(response.data);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  return <div>{introtext.length > 0 && introtext[0].Content}</div>;
};

export default IntroText;

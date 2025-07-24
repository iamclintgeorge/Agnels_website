import React, { useEffect, useState } from "react";
import axios from "axios";

const Iic_innovation = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get("http://localhost:3663/api/iic/text");
      console.log("Fetched Text:", response.data);
      setText(response.data);
      // if (response.data.length > 0 && response.data[0].id) {
      //   setContent(response.data[0].Content);
      // } else {
      //   console.warn("No valid id or content in fetched data:", response.data);
      //   setMessage("No valid text entry found.");
      // }
    } catch (err) {
      console.error("Error loading text:", err);
      // setMessage("Error fetching text.");
    }
  };

  return (
    <>
      {/* {text.content} */}
      {text.length > 0 ? text[0].content : "No content available in the DB"}
    </>
  );
};

export default Iic_innovation;

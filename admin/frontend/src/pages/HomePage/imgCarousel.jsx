import React, { useState } from "react";
import axios from "axios";

const ImgCarousel = () => {
  const [altText, setAltText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!altText || !image) {
      setMessage("Please enter both alt text and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("altText", altText);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3663/api/home/carousel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      console.log("POST Request for Carousel SUCCESS");
      setMessage("Image uploaded successfully!");
      setAltText("");
      setImage(null);
      e.target.reset();
    } catch (error) {
      console.log("Error Message: ", error);
      setMessage("Error uploading image.");
    }
  };

  return (
    <div>
      <p>Upload Image</p>
      <form className="flex" onSubmit={handleSubmit}>
        <div>
          <p>Alt Text:</p>
          <input
            className="bg-gray-200"
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Choose an image:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button className="bg-black px-8 py-0 text-white" type="submit">
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImgCarousel;

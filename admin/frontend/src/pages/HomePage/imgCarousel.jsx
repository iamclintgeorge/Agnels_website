import React, { useState, useEffect } from "react"; // Add useEffect import
import axios from "axios";

const ImgCarousel = () => {
  const [altText, setAltText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [displayImg, setDisplayImg] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3663/api/home/carousel"
        );
        console.log("Fetched images:", response.data); // Debug the response
        setDisplayImg(response.data);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    };

    fetchImages();
  }, []);

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

      // Refresh images after upload
      const updatedImages = await axios.get(
        "http://localhost:3663/api/home/carousel"
      );
      setDisplayImg(updatedImages.data);
    } catch (error) {
      console.log("Error Message: ", error);
      setMessage("Error uploading image.");
    }
  };

  return (
    <>
      <div>
        <p>Upload Image</p>
        <form
          className="flex gap-4 items-end"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <p>Alt Text:</p>
            <input
              className="bg-gray-200 p-2 rounded"
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
          <button
            className="bg-black px-8 py-2 text-white rounded"
            type="submit"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-2">{message}</p>}
      </div>

      <div className="mt-8">
        <h2>Uploaded Images</h2>
        {displayImg.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayImg.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={`http://localhost:3663${img.imageUrl}`}
                  alt={img.altText}
                  className="w-full max-w-xs h-auto object-cover rounded-lg"
                  onError={(e) =>
                    console.log(`Failed to load image: ${img.imageUrl}`)
                  }
                />
                <p className="mt-2 text-sm">{img.altText}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No images available yet.</p>
        )}
      </div>
    </>
  );
};

export default ImgCarousel;

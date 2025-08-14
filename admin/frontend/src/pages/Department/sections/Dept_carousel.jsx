import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { deptFirst, deptname } from "../../../util/dept_mapping.js";

const DeptCarousel = () => {
  const [altText, setAltText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [displayImg, setDisplayImg] = useState([]);
  const { departmentName } = useParams();
  const deptSlug = deptFirst[departmentName];
  const deptName = deptname[departmentName];
  const section = `${deptSlug}_carousel`;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/home/carousel/${section}`
      );
      console.log("Fetched images:", response.data); // Debug the response
      setDisplayImg(response.data);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  //Using Content Approval System
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!altText || !image) {
      setMessage("Please enter both alt text and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image); // File object
    formData.append("method", "POST");
    formData.append("section", "Homepage");
    formData.append("title", "Upload Homepage Image Carousel");
    formData.append("change_summary", "Added Image to Carousel");
    formData.append("current_content", "");
    formData.append(
      "proposed_content",
      JSON.stringify({
        altText: altText,
        imageFilename: image.name,
      })
    );
    formData.append("endpoint_url", `api/home/carousel/${section}`);
    formData.append("id", 0);

    try {
      const response = await axios.post(
        "http://localhost:3663/api/content-approval/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("POST Request for Carousel SUCCESS");
      setMessage("Image uploaded successfully!");
      setAltText("");
      setImage(null);
      e.target.reset();
      fetchImages(); // Refresh images
    } catch (error) {
      console.log("Error Message: ", error);
      setMessage("Error uploading image.");
    }
  };

  const handleDelete = async (img) => {
    if (!img?.Id) {
      console.error("No valid Id provided for deletion");
      setMessage("Cannot delete: No valid ID found.");
      return;
    }

    const currentContent = {
      altText: img.altText,
      imageFilename: img.imageFilename || img.imageUrl?.split("/").pop(), // fallback if filename missing
      imageUrl: img.imageUrl,
    };

    try {
      console.log(`Attempting to delete image with Id: ${img.Id}`);

      const formData = new FormData();
      formData.append("method", "DELETE");
      formData.append("section", "Homepage");
      formData.append("title", "Delete Carousel Image");
      formData.append("change_summary", "Deleted Image from homepage Carousel");
      formData.append("current_content", JSON.stringify(currentContent));
      formData.append("proposed_content", "");
      formData.append("endpoint_url", "api/home/carousel");
      formData.append("id", img.Id);

      const response = await axios.post(
        "http://localhost:3663/api/content-approval/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Image delete request submitted for approval!");
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Error submitting delete request.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-inter font-bold mt-3 mb-10">
        {deptName} Department - Carousel
      </h1>
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
              <div
                key={img.Id || index} // Fallback to index if Id is missing
                className="flex flex-col items-center"
              >
                <img
                  src={`http://localhost:3663${img.imageUrl}`}
                  alt={img.altText}
                  className="w-full max-w-xs h-auto object-cover rounded-lg"
                  onError={(e) =>
                    console.log(`Failed to load image: ${img.imageUrl}`)
                  }
                />
                <p className="mt-2 text-sm">{img.altText}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(img)}
                >
                  Delete
                </button>
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

export default DeptCarousel;

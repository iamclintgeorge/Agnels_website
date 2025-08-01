import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeModal = () => {
  const [displayImg, setDisplayImg] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("homeModalLastShown");
    const now = Date.now();

    // If not shown before or more than 30 minutes ago
    if (!lastShown || now - parseInt(lastShown) > 30 * 60 * 1000) {
      fetchImages();
      setShowModal(true);
      localStorage.setItem("homeModalLastShown", now.toString());
    }

    // Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/home/carousel/home_modal"
      );
      setDisplayImg(response.data);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  const handleOverlayClick = (e) => {
    // Close only if clicked on the overlay itself
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div>
      {showModal && displayImg.length > 0 && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-[60vw] h-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <img
              src={`http://localhost:3663${displayImg[0].imageUrl}`}
              alt={displayImg[0].altText || "Modal Image"}
              className="w-full h-auto rounded-t-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeModal;

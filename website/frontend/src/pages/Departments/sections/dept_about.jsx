import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 rounded-full w-10 h-10 flex justify-center items-center text-lg font-bold z-10 hover:scale-110 hover:bg-yellow-400"
    onClick={onClick}
  >
    <FaArrowRight />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 rounded-full w-10 h-10 flex justify-center items-center text-lg font-bold z-10 hover:scale-110 hover:bg-yellow-400"
    onClick={onClick}
  >
    <FaArrowLeft />
  </button>
);

const calculateSizes = (isSmall, isMobile, isTablet) => {
  if (isSmall) {
    return {
      fontSize: 12,
      slidesToShow: 1,
    };
  } else if (isMobile) {
    return {
      fontSize: 14,
      slidesToShow: 1,
    };
  } else if (isTablet) {
    return {
      fontSize: 16,
      slidesToShow: 2,
    };
  }
  // Default size for larger screens
  return {
    fontSize: 18,
    slidesToShow: 1,
  };
};

const About = ({ departmentName }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [images, setImages] = useState([]);
  const dept_url = {
    "Computer Engineering": 2,
    "Mechanical Engineering": 5,
    "Electronics and Telecommunication Engineering": 1,
    "Electrical Engineering": 4,
    "Information Technology": 6,
    "Basic Science and Humanities": 3,
  };

  useEffect(() => {
    fetchText();
    fetchImages();
  }, [departmentName]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/home/carousel/home_carousel"
      );
      // console.log("Fetched images:", response.data);
      setImages(response.data);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  const fetchText = async () => {
    try {
      const departmentSlug = dept_url[departmentName];
      const response = await axios.get(
        `http://localhost:3663/api/department/home/${departmentSlug}`
      );
      console.log(`Fetched ${departmentName} Department Text:`, response.data);

      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].paragraph1); // Set the content if fetched successfully
        setMessage(""); // Clear any previous error messages
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department text:`, err);
      setMessage(`Error fetching ${departmentName} department text.`);
    }
  };

  const { fontSize, slidesToShow } = calculateSizes(
    isSmall,
    isMobile,
    isTablet
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    lazyLoad: "ondemand",
  };

  return (
    <>
      <div className="relative w-full mx-auto m-0 mb-14">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div className="px-0" key={index}>
              <img
                src={`http://localhost:3663${image.imageUrl}`}
                alt={image.altText}
                className="w-screen h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="about-section">
        {message && <p className="error-message">{message}</p>}
        {/* Show error message if any */}
        <div
          className="department-content text-justify font-inter mb-10"
          dangerouslySetInnerHTML={{ __html: content }} // Display the fetched content
        />
      </div>
      <div className="about-section">
        {message && <p className="error-message">{message}</p>}
        {/* Show error message if any */}
        <div
          className="department-content text-justify font-inter "
          dangerouslySetInnerHTML={{ __html: content }} // Display the fetched content
        />
      </div>
    </>
  );
};

export default About;

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
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [objective, setObjective] = useState("");
  const [outcomes, setOutcomes] = useState("");
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
    fetchVision();
    fetchObjective();
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

  const fetchVision = async () => {
    try {
      const departmentSlug = dept_url[departmentName];
      const responseVision = await axios.get(
        `http://localhost:3663/api/department/vision/${departmentSlug}`
      );
      console.log(
        `Fetched ${departmentName} Department Vision Text:`,
        responseVision.data
      );
      console.log(
        "responseVision.data.vision",
        responseVision.data.data.vision
      );

      // Directly check if vision exists in the response
      if (responseVision.data.data && responseVision.data.data.vision) {
        setVision(responseVision.data.data.vision);
        setMission(responseVision.data.data.mission);
        setMessage("");
      } else {
        console.warn(
          "No valid id or content in fetched data:",
          responseVision.data
        );
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error(`Error loading ${departmentName} department text:`, err);
      setMessage(`Error fetching ${departmentName} department text.`);
    }
  };

  const fetchObjective = async () => {
    try {
      const departmentSlug = dept_url[departmentName];
      const responseObjective = await axios.get(
        `http://localhost:3663/api/department/objectives/${departmentSlug}`
      );
      console.log(
        `Fetched ${departmentName} Department Objective Text:`,
        responseObjective.data
      );
      console.log(
        "responseObjective.data.vision",
        responseObjective.data.data.objective
      );

      // Directly check if Objective exists in the response
      if (
        responseObjective.data.data &&
        responseObjective.data.data.objective
      ) {
        setObjective(responseObjective.data.data.objective);
        setOutcomes(responseObjective.data.data.outcome);
        setMessage("");
      } else {
        console.warn(
          "No valid id or content in fetched data:",
          responseObjective.data
        );
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
          className="department-content text-justify font-librefranklin mb-10"
          dangerouslySetInnerHTML={{ __html: content }} // Display the fetched content
        />
      </div>
      <h1 className="font-playfair text-2xl font-bold mb-4">
        Vision and Mission
      </h1>
      <h3 className="font-playfair text-xl mb-2">Vision:</h3>
      <div className="vision-section mb-5">
        {message && <p className="error-message">{message}</p>}
        {/* Show error message if any */}
        <div
          className="department-content text-justify font-librefranklin"
          dangerouslySetInnerHTML={{ __html: vision }} // Display the fetched content
        />
      </div>
      <h3 className="font-playfair text-xl mb-2">Mission:</h3>
      <div className="mission-section mb-5">
        {message && <p className="error-message">{message}</p>}
        <div
          className="department-content text-justify font-librefranklin"
          dangerouslySetInnerHTML={{ __html: mission }}
        />
      </div>
      <h1 className="font-playfair text-2xl font-bold mb-4">
        PEOs, PSOs and Board of Studies/Course Outcomes
      </h1>
      <h3 className="font-playfair text-xl mb-2">
        Program Educational Objectives (PEO):
      </h3>
      <div className="mission-section mb-5">
        {message && <p className="error-message">{message}</p>}
        <div
          className="department-content text-justify font-librefranklin"
          dangerouslySetInnerHTML={{ __html: objective }}
        />
      </div>
      <h3 className="font-playfair text-xl mb-2">
        Program Specific Outcomes (PSO):
      </h3>
      <div className="mission-section mb-5">
        {message && <p className="error-message">{message}</p>}
        <div
          className="department-content text-justify font-librefranklin"
          dangerouslySetInnerHTML={{ __html: outcomes }}
        />
      </div>
    </>
  );
};

export default About;

import React from "react";
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
      slidesToShow: 2,
    };
  } else if (isMobile) {
    return {
      fontSize: 14,
      slidesToShow: 2,
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
    slidesToShow: 2,
  };
};

function AboutUs() {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const { fontSize, slidesToShow } = calculateSizes(isSmall, isMobile, isTablet);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section className="flex flex-col gap-10 p-0 bg-gray-100">
      <div className="relative w-full mx-auto m-0">
        <Slider {...settings}>
          <div className="px-0">
            <img
              src="/src/imgs/campus1.png"
              alt="Campus View 1"
              className="w-screen h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div>
          <div className="px-0">
            <img
              src="/src/imgs/campus2.png"
              alt="Campus View 2"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div>
          <div className="px-0">
            <img
              src="/src/imgs/campus3.png"
              alt="Campus View 3"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div>
          <div className="px-0">
            <img
              src="/src/imgs/campus4.png"
              alt="Campus View 4"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div>
        </Slider>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-10 p-10">
        <div className="flex-1.2 max-w-lg">
          <h2 className="text-4xl text-blue-900 font-bold mb-2" style={{ fontSize }}>
            About Us
          </h2>
          <div className="w-36 h-1 bg-yellow-400 mb-5"></div>
          <p className="text-gray-700 leading-8 text-lg">
            Fr. Conceicao Rodrigues Institute of Technology has, within a short
            span of time, established itself as a leading engineering college
            in Mumbai University. Though its reputation rests mainly on the
            high quality, value-based technical education that it imparts, it
            has to its credit a verdant, well-maintained Campus and extensive
            facilities. Its location in the vicinity of the holy places of
            various religious denominations underscores its secular credentials
            and its philosophy of <strong>Vasudhaiva Kuttumbakam</strong>.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/src/imgs/campus.png"
            alt="Campus"
            className="w-full max-w-xs border-0 rounded-lg shadow-lg ml-4"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

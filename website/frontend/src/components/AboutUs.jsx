import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import axios from "axios";

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
    slidesToShow: 2,
  };
};

function AboutUs() {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3663/api/home/images"
        );
        setImages(response.data);
      } catch (err) {
        console.log("Error loading images: ", err);
      }
    };

    fetchImages();
  }, []);

  const { fontSize, slidesToShow } = calculateSizes(
    isSmall,
    isMobile,
    isTablet
  );

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
    lazyLoad: "ondemand",
  };

  return (
    <section className="flex flex-col gap-10 p-0 bg-gray-100">
      <div className="relative w-full mx-auto m-0">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div className="px-0" key={index}>
              <img
                src={`http://localhost:3663${image.url}`}
                alt={image.alt}
                className="w-screen h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
              />
            </div>
          ))}
          {/* <div className="px-0">
            <img
              src="/src/assets/imgs/campus2.png"
              alt="Campus View 2"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div> */}
          {/* <div className="px-0">
            <img
              src="/src/assets/imgs/campus3.png"
              alt="Campus View 3"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div>
          <div className="px-0">
            <img
              src="/src/assets/imgs/campus4.png"
              alt="Campus View 4"
              className="w-full h-96 object-cover brightness-90 transition hover:brightness-100 hover:scale-105"
            />
          </div> */}
        </Slider>
      </div>

      <div
        className="about flex gap-[100px] justify-evenly w-full h-[658px] mt-[0px] pt-[20px] bg-cover bg-center bg-no-repeat"
        style={{
          background:
            'linear-gradient(rgba(241, 241, 241, 0.9), rgba(241, 241, 241, 2)), url("/src/assets/imgs/campus2.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="about-content flex-1.2 ">
          <h2 className="about-title font-semibold italic text-[30px] pl-[90px] text-[#0C2340] w-[316px] h-[29px] mt-[75px]">
            ABOUT US
          </h2>
          {/* <div className="underline w-[106px] h-[4px] bg-[#AE9142] mt-[10px] mr-[40px] mb-[20px] ml-[40px] top-[66px] left-[874px]"></div> */}
          <div className="underline w-[120px] h-[4px] bg-[#AE9142] pl-[10px] mt-[25px] ml-[40px]"></div>
          <p className="text-base leading-8 tracking-wider text-justify font-librefranklin text-[#000000] pt-[30px] pl-[90px] w-[848px] h-[206px] mt-[25px] ">
            Fr. Conceicao Rodrigues Institute of Technology has, within a short
            span of time, established itself as a leading engineering college in
            Mumbai University. Though its reputation rests mainly on the high
            quality, value-based technical education that it imparts, it has to
            its credit a verdant, well-maintained Campus and extensive
            facilities. Its location in the vicinity of the holy places of
            various religious denominations underscores its secular credentials
            and its philosophy of <strong>Vasudhaiva Kuttumbakam</strong>.
          </p>
        </div>
        <div className="flex justify-center items-center flex-1 w-[320px] h-[494px]">
          <img
            src="/src/assets/imgs/campus.png"
            alt="Campus"
            className="max-w-full h-full mt-[0px] ml-[30px] border-[3px] border-[#AE9142] shadow-[inset_0_0_0_5px #AE9142]"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

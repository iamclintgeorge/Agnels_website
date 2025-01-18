import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/AboutUs.css";

// Custom Arrow Components
const CustomNextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow next-arrow" onClick={onClick}>
      ▶
    </button>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow prev-arrow" onClick={onClick}>
      ◀
    </button>
  );
};

function AboutUs() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 images at once
    slidesToScroll: 1, // Scroll 1 image at a time
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section className="about-section">
      {/* Carousel Section */}
      <div className="about-carousel">
        <Slider {...settings}>
          <div>
            <img src="/src/imgs/campus1.png" alt="Campus View 1" className="carousel-image" />
          </div>
          <div>
            <img src="/src/imgs/campus2.png" alt="Campus View 2" className="carousel-image" />
          </div>
          <div>
            <img src="/src/imgs/campus3.png" alt="Campus View 3" className="carousel-image" />
          </div>
          <div>
            <img src="/src/imgs/campus4.png" alt="Campus View 4" className="carousel-image" />
          </div>
        </Slider>
      </div>

      {/* About Section */}
      <div className="about">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <div className="underline"></div>
          <p>
            Fr. Conceicao Rodrigues Institute of Technology has, within a short span of
            time, established itself as a leading engineering college in Mumbai
            University. Though its reputation rests mainly on the high quality,
            value-based technical education that it imparts, it has to its credit a
            verdant, well-maintained Campus and extensive facilities. Its location
            in the vicinity of the holy places of various religious denominations
            underscores its secular credentials and its philosophy of
            <strong> Vasudhaiva Kuttumbakam</strong>.
          </p>
        </div>
        <div className="about-image">
          <img src="/src/imgs/campus.png" alt="Campus" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-images-row">
        <img src="/src/imgs/campus1.png" alt="Campus View 1" className="image" />
        <img src="/src/imgs/campus2.png" alt="Campus View 2" className="image" />
      </div>
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

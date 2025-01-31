import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-[#EEEBE5] py-[40px] h-[425px]">
      <div className="flex justify-between flex-wrap ">
        <div className="footer-section logo-section flex-1 my-[10px]">
          <img
            src="/src/assets/imgs/fcritlogo.png" // Replace with your logo path
            alt="FCRIT Logo"
            className="footer-logo w-[75x] h-[75px] mb-[95px] ml-[67px]"
          />
          <div className="absolute left-14 top-[2295px]">
            <p className="font-playfair text-[21.21px] font-medium leading-8">
              FR. CONCEICAO RODRIGUES
            </p>
            <p className="font-playfair font-thin text-[15.27px] tracking-[3.7px]">
              INSTITUTE OF TECHNOLOGY
            </p>
            <p className="font-playfair font-thin text-[9px] tracking-[3.7px] leading-5">
              <span className="tracking-[-3px]">
                {" "}
                -------------------------------------------------------------------
              </span>
              <span className="mr-2 ml-4">VASHI</span>
              <span className="tracking-[-3px]">
                {" "}
                -------------------------------------------------------------------
              </span>
            </p>
          </div>
        </div>
        <div className="footer-section navigation absolute left-[470px] top-[2295px]">
          <h4 class="mb-[10px] font-bold text-[19px]">Navigation</h4>
          <ul className="p-0 mb-[8px] text-[18px] ">
            <li>Home</li>
            <li>About Us</li>
            <li>Departments</li>
            <li>Academics</li>
            <li>Admission</li>
            <li>Students</li>
          </ul>
        </div>
        <div className="footer-section quick-links absolute left-[700px] top-[2295px]">
          <h4 class="mb-[10px] font-bold text-[19px]">Quick Links</h4>
          <ul className="p-0 mb-[8px] text-[18px] ">
            <li>Downloads</li>
            <li>Feedback</li>
            <li>Important Links</li>
            <li>Circulars</li>
            <li>Fee Payment</li>
          </ul>
        </div>
        <div className="footer-section contact absolute left-[940px] top-[2295px]">
          <h4 class="mb-[10px] font-bold text-[19px]">Contact Us</h4>
          <address className="p-0 mb-[8px] text-[17px] not-italic ">
            Agnel Technical Education Complex,
            <br />
            Sector 9-A, Vashi, Navi Mumbai,
            <br />
            Maharashtra, India. PIN - 400703
          </address>
          <p className="p-0 mb-[8px] text-[17px] ">
            Telephone: (022) 27661924, 27660619, 27660714, 27660715
            <br />
            Fax: (022) 27660619
            <br />
            Email:{" "}
            <a href="mailto:principal@fcrit.ac.in">principal@fcrit.ac.in</a>
          </p>
          <a
            href="https://goo.gl/maps/path-to-location"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit underline left-[1074px] top-[2625px] text-[18px]"
          >
            Google Maps
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-icons">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
        <div className="social-media flex-1">
          <img
            src="/src/assets/imgs/instagramlogo.webp" // Replace with your logo path
            alt="Instagram"
            className="footer-logo w-[24px] h-[24px] absolute left-[234px] top-[2515px]"
          />
          <img
            src="/src/assets/imgs/facebooklogo.png" // Replace with your logo path
            alt="Facebook"
            className="footer-logo w-[28px] h-[28px] relative left-[255px] top-[40px]"
          />
          <img
            src="/src/assets/imgs/youtubelogo.png" // Replace with your logo path
            alt="Youtube"
            className="footer-logo w-[32x] h-[32px] absolute left-[316px] top-[2510px]"
          />
          <img
            src="/src/assets/imgs/linkedinlogo.png" // Replace with your logo path
            alt="Linkedin"
            className="footer-logo w-[32x] h-[32px] absolute left-[356px] top-[2510px]"
          />
        </div>
        <div>
          <span className="block w-[1310px] h-[1px] bg-black absolute top-[2560px]"></span>
          <p className="absolute left-[543px] top-[2590px] text-[15px]">
            &copy; 2024 Fr. C. Rodrigues Institute of Technology.
          </p>
          <p className="absolute text-center left-[643px] top-[2609px] text-[15px]">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

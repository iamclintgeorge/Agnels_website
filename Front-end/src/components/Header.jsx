import React from "react";
import "../styles/Header.css";
import instalogo from "../imgs/instagramlogo.webp"
import fblogo from "../imgs/facebooklogo.png"
import linklogo from "../imgs/linkedinlogo.png"
import ytlogo from "../imgs/youtubelogo.png"

const Header = () => {
  return (
    <>
      <div className="bg-gray-100">
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex">
            <img src={instalogo} alt="" style={{height:25, width:25}} className="mr-2 mt-1"/>
            <img src={fblogo} alt="" style={{height:23, width:23}} className="mr-1 mt-1"/>
            <img src={linklogo} alt="" style={{height:35, width:35}} className="mr-1"/>
            <img src={ytlogo} alt="" style={{height:35, width:35}}/>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                Downloads
              </a>
              <a href="#" className="hover:underline">
                Feedback
              </a>
              <a href="#" className="hover:underline">
                Important Links
              </a>
              <a href="#" className="hover:underline">
                Fee payment
              </a>
              <a href="#" className="hover:underline">
                NIRF
              </a>
              <a href="#" className="hover:underline">
                IQAC
              </a>
              <a href="#" className="hover:underline">
                IIC
              </a>
            </div>
          </div>
        </header>

        <div className="container mx-auto mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 mb-7">
                <ul className="flex gap-5">
                  <li className="hover:underline">
                    <a href="#">Home</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">About Us</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Departments</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Academics</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Admission</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Training & Placement</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Research & Publications</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Human Resource</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Student Corner</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Library</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Alumni</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">NBA / NAAC</a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

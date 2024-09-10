import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      <div className="bg-gray-100">
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Fr. C. Rodrigues Institute of Technology
            </h1>
            <nav className="flex gap-4">
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
            </nav>
          </div>
        </header>

        <div className="container mx-auto mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <nav className="bg-white p-4 rounded-md shadow">
                <ul>
                  <li className="hover:underline">
                    <a href="#">HOME</a>
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserOpen((prevstate) => !prevstate);
  };

  return (
    <>
      <div className="z-10 fixed w-full">
        <div className="bg-[#AE9142] h-[3px] w-full top-0"></div>
        <div className="bg-[#0C2340] h-16 w-full top-[3px] bottom-0 border-b-[0.5px] border-[#888888]">
          <div className="flex flex-row justify-between">
            <Link to="/">
              {" "}
              <div className="pl-9 pt-3 text-white">
                <p className="font-playfair text-[13px] font-[350] tracking-[0.5px] leading-6">
                  FR. CONCEICAO RODRIGUES
                </p>
                <p className="font-playfair font-thin text-[9px] tracking-[2.7px]">
                  INSTITUTE OF TECHNOLOGY
                </p>
              </div>
            </Link>
            <div className="text-white flex flex-row text-sm pr-10">
              <div>
                <p
                  className="relative cursor-pointer mr-7 pt-[22px] font-light font-inter"
                  onClick={handleUserClick}
                >
                  John Doe
                </p>
                {isUserOpen && (
                  <div className="absolute py-4 px-5 space-y-4 bg-[#0C2340]">
                    <Link to="/profile">
                      <p>Edit Profile</p>
                    </Link>
                    <p>Sign Out</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

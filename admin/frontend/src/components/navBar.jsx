import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="z-10 fixed w-full">
        <div className="bg-[#AE9142] h-[3px] w-full top-0"></div>
        <div className="bg-[#0C2340] h-16 w-full top-[3px] bottom-0 border-b-[0.5px] border-[#888888]">
          <div className="flex flex-row justify-between">
            <div className="pl-9 pt-3 text-white">
              <p className="font-playfair text-[13px] font-[350] tracking-[0.5px] leading-6">
                FR. CONCEICAO RODRIGUES
              </p>
              <p className="font-playfair font-thin text-[9px] tracking-[2.7px]">
                INSTITUTE OF TECHNOLOGY
              </p>
            </div>
            <div className="text-white flex flex-row text-sm pr-10">
              <p className="mr-7 pt-[22px] font-light font-inter">John Doe</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

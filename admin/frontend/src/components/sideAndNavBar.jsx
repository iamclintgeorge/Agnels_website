import React from 'react'

const SideAndNavBar = () => {
  return (
    <>
    <div className="bg-[#AE9142] h-[3px] w-full fixed top-0">
       </div>
    <div className="bg-[#0C2340] h-16 w-full fixed top-[3px] bottom-0 border-b-[0.5px] border-[#888888]">
      <div className="flex flex-row justify-between">
      <div className="pl-9 pt-3 text-white">
            <p className="font-playfair text-[13px] font-[350] tracking-[0.5px] leading-6">FR. CONCEICAO RODRIGUES</p>
            <p className="font-playfair font-thin text-[9px] tracking-[2.7px]">INSTITUTE OF TECHNOLOGY</p>
        </div>
        <div className="text-white flex flex-row text-sm pr-10">
          <p className="mr-7 pt-[22px] font-light font-inter">John Doe</p>
          <div className="w-8 h-8 mt-[15px] rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div className="bg-[#0C2340] mt-16 h-screen w-64 text-white">
      <div className="font-inter text-sm font-light pl-8 pt-9 flex flex-col space-y-9">
      <p>Dashboard</p>
      <p>Home Page</p>
      <p>Logs</p>
      <p>Departments Page</p>
      <p>Admission Page</p>
      <p>Academics Page</p>
      <p>Students Corner</p>
      </div>
    </div>
    </>
  )
}

export default SideAndNavBar
import React from "react";

function AboutUs() {
  return (
    <section className="about-section flex flex-col gap-0 bg-[#f9f9f9] pb-8">
      <div className="about-images-row flex w-full justify-between">
        <img
          src="/src/imgs/campus1.png"
          alt="Campus View 1"
          className="image flex-1 max-w-[50%] rounded-none shadow-none brightness-70 mr-0"
        />
        <img
          src="/src/imgs/campus2.png"
          alt="Campus View 2"
          className="image flex-1 max-w-[50%] rounded-none shadow-none brightness-70"
        />
      </div>

      {/* <div className="about flex gap-[100px] justify-evenly bg-[#F1F1F1] w-full h-[658px] mt-[0px] pt-[20px]"> */}
      <div className="about flex gap-[100px] justify-evenly w-full h-[658px] mt-[0px] pt-[20px] bg-cover bg-center bg-no-repeat" 
     style={{ background: 'linear-gradient(rgba(241, 241, 241, 0.9), rgba(241, 241, 241, 2)), url("/src/imgs/campus2.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
        <div className="about-content flex-1.2 ">
          <h2 className="about-title font-semibold italic text-[30px] pl-[90px] text-[#0C2340] w-[316px] h-[29px] mt-[75px]">
            ABOUT US
          </h2>
          {/* <div className="underline w-[106px] h-[4px] bg-[#AE9142] mt-[10px] mr-[40px] mb-[20px] ml-[40px] top-[66px] left-[874px]"></div> */}
          <div className="underline w-[120px] h-[4px] bg-[#AE9142] pl-[10px] mt-[25px] ml-[40px]"></div>
          <p className="text-[19px] leading-8 tracking-wider text-justify text-[#000000] pt-[30px] pl-[90px] w-[848px] h-[206px] mt-[25px] ">
            Fr. Conceicao Rodrigues Institute of Technology has, within a short
            span of time, established itself as a leading engineering college in
            Mumbai University. Though its reputation rests mainly on the high
            quality, value-based technical education that it imparts, it has to
            its credit a verdant, well-maintained Campus and extensive facilities.
            Its location in the vicinity of the holy places of various religious
            denominations underscores its secular credentials and its philosophy
            of <strong>Vasudhaiva Kuttumbakam</strong>.
          </p>
        </div>
        <div className="flex justify-center items-center flex-1 w-[320px] h-[494px]">
          <img
            src="/src/imgs/campus.png"
            alt="Campus"
            className="max-w-full h-full mt-[0px] ml-[30px] border-[3px] border-[#AE9142] shadow-[inset_0_0_0_5px #AE9142]"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

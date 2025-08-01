import React from "react";
import News from "../../components/News";
import AboutUs from "../../components/AboutUs";
import WhatsNew from "../../components/WhatsNew";
import Widgets from "../../components/Widgets";
import HomeModal from "../../components/home_Modal";

const HomePage = () => {
  return (
    <>
      <News />
      <AboutUs />
      <WhatsNew />
      <HomeModal />
      {/* <Widgets /> */}
    </>
  );
};

export default HomePage;

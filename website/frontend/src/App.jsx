import React from "react";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import WhatsNew from "./components/WhatsNew";
import Footer from "./components/Footer";
import ScrollWrapper from "./components/ScrollWrapper";

function App() {
  return (
    <ScrollWrapper>
      <Header />
      <AboutUs />
      <WhatsNew />
      <Footer />
    </ScrollWrapper>
  );
}

export default App;

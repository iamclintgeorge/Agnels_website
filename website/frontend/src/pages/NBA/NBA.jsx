import React from "react";
import StaticPages from "../../layouts/staticPages";
import { HomeContent, NBAContent, NAACContent } from "./NBAContent";

const NBA = () => {
  const sidebar = ["Home", "NBA", "NAAC"];

  const content = {
    Home: <HomeContent />,
    NBA: <NBAContent />,
    NAAC: <NAACContent />,
  };

  return (
    <div>
      <StaticPages
        pagename={"NBA/NAAC"}
        path={"Academics / NBA/NAAC"}
        sidebar={sidebar}
        content={content}
        defaultTab="Home"
      />
    </div>
  );
};

export default NBA;
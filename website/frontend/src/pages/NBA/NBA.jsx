// import React from "react";
// import StaticPages from "../../layouts/staticPages";
// import { HomeContent, NBAContent, NAACContent } from "./NBAContent";

// const NBA = () => {
//   const sidebar = ["Home", "NBA", "NAAC"];

//   const content = {
//     Home: <HomeContent />,
//     NBA: <NBAContent />,
//     NAAC: <NAACContent />,
//   };

//   return (
//     <div>
//       <StaticPages
//         pagename={"NBA/NAAC"}
//         path={"Academics / NBA/NAAC"}
//         sidebar={sidebar}
//         content={content}
//         defaultTab="Home"
//       />
//     </div>
//   );
// };

// export default NBA;



// NBA.jsx

import React from "react";
import StaticPages from "../../layouts/staticPages";
import { HomeContent, NBAContent, NAACContent, NAACAppealsContent, AQAR19Content, AQAR20Content } from "./NBAContent";

const NBA = () => {
  // ✨ ADDED NEW SECTIONS TO SIDEBAR
  const sidebar = ["Home", "NBA", "NAAC", "NAAC Appeals", "AQAR 2019-20", "AQAR 2020-21"];

  // ✨ MAPPED NEW COMPONENTS TO THEIR RESPECTIVE TABS
  const content = {
    Home: <HomeContent />,
    NBA: <NBAContent />,
    NAAC: <NAACContent />,
    "NAAC Appeals": <NAACAppealsContent />,
    "AQAR 2019-20": <AQAR19Content />,
    "AQAR 2020-21": <AQAR20Content />,
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
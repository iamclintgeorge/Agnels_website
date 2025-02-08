import React from "react";
import StaticPages from "../../layouts/staticPages";
import { TP_Home, VisionandMission, CodeOfConduct, Placement_Officer, Placement_Team } from "./TrainingPlacementContent";

const TrainingPlacement = () => {
  const sidebar = [
    "TP_Home",  
    "Vision and Mission",
    "Code Of Conduct",
    "Placement Officer",
    "Placement Team",
  ];

  const content = {
    "TP_Home": <TP_Home />,
    "Vision and Mission": <VisionandMission />,
    "Code Of Conduct": <CodeOfConduct />,
    "Placement Officer": <Placement_Officer />,
    "Placement Team": <Placement_Team />,
  };

  return (
    <div>
    <StaticPages
      pagename="Training and Placement"
      path="Home / Training and Placement"
      sidebar={sidebar}
      content={content}
    />
    </div>
  );
};

export default TrainingPlacement;

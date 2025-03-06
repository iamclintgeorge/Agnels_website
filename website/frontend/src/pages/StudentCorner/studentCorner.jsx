import React from "react";
import StaticPages from "../../layouts/staticPages";
// import { useNavigate } from "react-router-dom";
import { SC_Home,
         CodeOfConduct,
         StudentCouncil,
         ProfessionalBodies,
         NSS,
         StudentClubs,
         Infrastructure,
         CulturalActivities,
         AntiRagging,
         Survey,} from "./studentCornerContent";

const StudentCorner = () => {
  const sidebar = [
    "SC_Home",
    "Code of Conduct",
    "Student Council",
    "Professional Bodies",
    "National Service Scheme",
    "Student Clubs",
    "Infrastructure",
    "Cultural Activities",
    "Anti Ragging",
    "Student Satisfaction Survey",
  ];

  // const navigate = useNavigate();

  const content = {
    "SC_Home": <SC_Home />,
    "Code of Conduct": <CodeOfConduct/>,
    "Student Council":<StudentCouncil/>,
    "Professional Bodies":<ProfessionalBodies/>,
    "National Service Scheme":<NSS/>,
    "Student Clubs":<StudentClubs/>,
    "Infrastructure":<Infrastructure/>,
    "Cultural Activities":<CulturalActivities/>,
    "Anti Ragging":<AntiRagging/>,
    "StudentSatisfactionSurvey":<Survey/>,

    // "Information Technology": <InfoT />,
    // "Basic Science and Humanities": <Humanities />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Student Corner"}
        path={"Home / Student Corner"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default StudentCorner;

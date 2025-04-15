import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  History,
  Vision_and_Mission,
  Trustees,
  Managing_Director_Desk,
  Principal_Desk,
  Governance,
  Audit_Report_and_Affiliations,
  Institute_Roadmap,
  Service_Regulation,
  Qualification_and_Eligiblity_Norms_for_Recruitment,
  Best_Practices,
  Mandatory_Disclosure,
} from "./aboutusContent";

const Aboutus = () => {
  const sidebar = [
    "History",
    "Vision and Mission",
    "Trustees",
    "Managing Director's Desk",
    "Principal's Desk",
    "Governance",
    "Audit Report and Affiliations",
    "Institute Roadmap",
    "Service Regulation",
    "Qualification and Eligiblity Norms for Recruitment",
    "Best Practices",
    "Mandatory Disclosure",
  ];

  // const navigate = useNavigate();

  const content = {
    History: <History />,
    "Vision and Mission": <Vision_and_Mission />,
    Trustees: <Trustees />,
    "Managing Director's Desk": <Managing_Director_Desk />,
    "Principal's Desk": <Principal_Desk />,
    Governance: <Governance />,
    "Audit Report and Affiliations": <Audit_Report_and_Affiliations />,
    "Institute Roadmap": <Institute_Roadmap />,
    "Service Regulation": <Service_Regulation />,
    "Qualification and Eligiblity Norms for Recruitment": (
      <Qualification_and_Eligiblity_Norms_for_Recruitment />
    ),
    "Best Practices": <Best_Practices />,
    "Mandatory Disclosure": <Mandatory_Disclosure />,
  };

  return (
    <div>
      <StaticPages
        pagename={"About us"}
        path={"Home / about us"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default Aboutus;

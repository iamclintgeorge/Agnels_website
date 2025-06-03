
import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  NIRF_2025,
  NIRF_2024,
  NIRF_2023,
  NIRF_2022,
  NIRF_2021,
  NIRF_2020,
} from "./NIRFContent";
// import { useNavigate } from "react-router-dom";

const NIRF = () => {
  const sidebar = [
    "NIRF 2025",
    "NIRF 2024",
    "NIRF 2023",
    "NIRF 2022",
    "NIRF 2021",
    "NIRF 2020",
  ];

  // const navigate = useNavigate();

  const content = {
    "NIRF 2025": <NIRF_2025 />,
    "NIRF 2024": <NIRF_2024 />,
    "NIRF 2023": <NIRF_2023    />,
    "NIRF 2022": <NIRF_2022 />,
    "NIRF 2021": <NIRF_2021 />,
    "NIRF 2020": <NIRF_2020 />,
  };

  return (
    <div>
      <StaticPages
        pagename={"NIRF"}
        path={"Academics / NIRF"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default NIRF;

import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Teaching_Staff,
  Non_Teaching_Staff,
} from "./HumanResourceContent";

const HumanResource = () => {
  const sidebar = ["Teaching Staff", "Non-Teaching Staff"];

  const content = {
    "Teaching Staff": <Teaching_Staff />,
    "Non-Teaching Staff": <Non_Teaching_Staff />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Human Resources"}
        path={"Administration / Human Resources"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default HumanResource;

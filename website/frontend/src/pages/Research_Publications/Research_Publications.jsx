import React from "react";
import StaticPages from "../../layouts/staticPages";
import {
  Home,
  Research_Projects,
  Publications,
  Books_Published,
  Consultancy_Projects,
  Patents,
  Code_of_Conduct,
} from "./Research_Publication_content";

const Research_Publications = () => {
  const sidebar = [
    "Home",
    "Research Projects",
    "Publications",
    "Books Published",
    "Consultancy Projects",
    "Patents",
    "Code of Conduct",
  ];

  const content = {
    Home: <Home />,
    "Research Projects": <Research_Projects />,
    Publications: <Publications />,
    "Books Published": <Books_Published />,
    "Consultancy Projects": <Consultancy_Projects />,
    Patents: <Patents />,
    "Code of Conduct": <Code_of_Conduct />,
  };

  return (
    <div>
      <StaticPages
        pagename={"Research and Publications"}
        path={"Home / Research and Publications"}
        sidebar={sidebar}
        content={content}
      />
    </div>
  );
};

export default Research_Publications;

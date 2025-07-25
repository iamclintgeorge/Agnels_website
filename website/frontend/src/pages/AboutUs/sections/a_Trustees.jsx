import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Trustees = () => {
  const trusteesList = [
    { name: "Fr. Bento Rodrigues", position: "Chairman" },
    { name: "Fr. Alarico Carvalho", position: "Vice Chairman" },
    { name: "Fr. Peter D'Souza", position: "Treasurer" },
    { name: "Fr. Valerian D'Souza", position: "Secretary" },
    { name: "Fr. Agnelo Gomes", position: "Member" },
  ];

  return (
    <SectionContainer
      title="List of Trustees"
      subtitle="Guiding us with vision and leadership"
    >
      <div className="flex flex-col gap-10">{/* Content goes here */}</div>
    </SectionContainer>
  );
};

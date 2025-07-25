import React from "react";
import { SectionContainer } from "./SectionContainer"; // Assuming you move the shared container to a separate file.

export const History = () => {
  return (
    <SectionContainer
      title="Our History"
      subtitle="Tracing the roots and evolution of our institution"
    >
      <div className="flex flex-col gap-10">{/* Content goes here */}</div>
    </SectionContainer>
  );
};

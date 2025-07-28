import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Principal_Desk = () => {
  return (
    <SectionContainer
      title="Principal's Desk"
      subtitle="A message from our Principal"
    >
      <div className="flex flex-col gap-10">{/* Content goes here */}</div>
    </SectionContainer>
  );
};

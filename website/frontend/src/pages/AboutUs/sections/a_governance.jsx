import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Governance = () => {
  return (
    <SectionContainer
      title="Governance"
      subtitle="Ensuring accountability and transparency"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to the Governance Page, where we uphold the highest
            standards of institutional leadership...
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

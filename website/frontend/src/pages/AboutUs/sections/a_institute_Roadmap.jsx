import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Institute_Roadmap = () => {
  return (
    <SectionContainer
      title="Institute Roadmap"
      subtitle="Charting our course for the future"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to the Institute Roadmap Page, where we outline our vision
            for the years ahead...
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

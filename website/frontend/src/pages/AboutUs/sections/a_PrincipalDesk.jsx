import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Principal_Desk = () => {
  return (
    <SectionContainer
      title="Principal's Desk"
      subtitle="A message from our Principal"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to Principal's Desk Page. Here is a brief message from our
            Principal...
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

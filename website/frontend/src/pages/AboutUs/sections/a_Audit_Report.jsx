import React from "react";
import { SectionContainer } from "../SectionContainer";

export const Audit_Report_and_Affiliations = () => {
  return (
    <SectionContainer
      title="Audit Report & Affiliations"
      subtitle="Transparency in finances and partnerships"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Our latest audit reports and institutional affiliations are provided
            here.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

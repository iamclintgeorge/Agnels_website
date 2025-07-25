import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Service_Regulation = () => {
  const pdfUrl = "src/assets/Documents/service.pdf";

  return (
    <SectionContainer
      title="Service Regulations"
      subtitle="Information on policies and standards"
    >
      <div className="flex flex-col gap-10">{/* Content for PDF viewer */}</div>
    </SectionContainer>
  );
};

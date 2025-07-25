import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Mandatory_Disclosure = () => {
  const pdfUrl = "src/assets/Documents/mandatory_disclosure.pdf";

  return (
    <SectionContainer
      title="Mandatory Disclosure"
      subtitle="Ensuring compliance and transparency"
    >
      <div className="flex flex-col gap-10">{/* Content for PDF viewer */}</div>
    </SectionContainer>
  );
};

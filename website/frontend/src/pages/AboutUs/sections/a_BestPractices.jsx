import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Best_Practices = () => {
  const pdfUrl = "src/assets/Documents/bestprac.pdf";

  return (
    <SectionContainer
      title="Best Practices"
      subtitle="Committed to excellence in every endeavor"
    >
      <div className="flex flex-col gap-10">{/* Content for PDF viewer */}</div>
    </SectionContainer>
  );
};

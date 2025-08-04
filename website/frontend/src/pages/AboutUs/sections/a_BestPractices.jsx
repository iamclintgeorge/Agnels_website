import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Best_Practices = () => {
  const pdfUrl = "src/assets/Documents/bestprac.pdf"; // Adjust your PDF path here

  return (
    <SectionContainer
      title="Best Practices"
      subtitle="Committed to excellence in every endeavor"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-sm ">
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <p className="p-4 text-gray-700">
                It appears you don't have a PDF plugin for this browser. No
                worries though, you can{" "}
                <a href={pdfUrl} className="text-blue-500 underline">
                  click here to download the PDF file.
                </a>
              </p>
            </object>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

import React from "react";
import { SectionContainer } from "../SectionContainer";

export const Trustees = () => {
  const trusteesList = [
    { name: "Fr. Bento Rodrigues", position: "Chairman" },
    { name: "Fr. Alarico Carvalho", position: "Vice Chairman" },
    { name: "Fr. Peter D'Souza", position: "Treasurer" },
    { name: "Fr. Valerian D'Souza", position: "Secretary" },
    { name: "Fr. Agnelo Gomes", position: "Member" },
  ];

  return (
    <SectionContainer
      title="List of Trustees"
      subtitle="Guiding us with vision and leadership"
    >
      <div className="flex flex-col gap-10">
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Meet the esteemed members of our trust who guide our institution.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {trusteesList.map((trustee, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center  p-4 rounded-md shadow-sm hover:shadow-md transition-shadow w-48"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                  {/* Could use an actual image or icon here */}
                </div>
                <p className="text-gray-800 font-semibold">{trustee.name}</p>
                <p className="text-gray-500">{trustee.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

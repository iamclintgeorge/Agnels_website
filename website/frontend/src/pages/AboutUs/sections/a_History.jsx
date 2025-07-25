import React from "react";
import { SectionContainer } from "./SectionContainer";

export const History = () => {
  return (
    <SectionContainer
      title="Our History"
      subtitle="Tracing the roots and evolution of our institution"
    >
      <div className="flex flex-col gap-10">
        {/* Establishment Card */}
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Establishment
          </h3>
          <div className="overflow-hidden rounded-md mb-4">
            <img
              src="src/assets/imgs/history_image.jpg"
              alt="Establishment"
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* An Endeavor called Fr. CRIT Card */}
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            An Endeavor called Fr. CRIT
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The Agnel Ashram Family Movement originated way back in 1957 in
            Mumbai. Starting with the preschool level, seeks to touch the lives
            of students and citizens of India, right up to graduation and post
            graduation level, in such a way that every student entrusted to the
            care of an Agnel Ashram Fathers' institution.
          </p>
        </div>

        {/* History Card */}
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            History
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The Agnel Ashram Fathers - a group of Catholic priests and brothers,
            along with some well-educated, dedicated, zealous and patriotic
            co-workers have, during the last 45 years, built up a large
            well-knit family of committed individuals. This unique family, which
            is spread over different parts of the country, has been instrumental
            in propounding a powerful{" "}
            <span className="font-semibold">MOVEMENT</span> in the realm of
            education.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
            Starting with the preschool level, seeks to touch the lives of
            students and citizens of India, right up to graduation and post
            graduation level, in such a way that every student entrusted to the
            care of an Agnel Ashram Fathers' institution, grows into a balanced,
            versatile and courageous individual who has the physical, mental,
            emotional and spiritual strength to face the challenges of life.
            This Agnel Ashram Family Movement originated way back in 1957 in
            Mumbai.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

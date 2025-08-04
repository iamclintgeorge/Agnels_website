import React from "react";
import { SectionContainer } from "../SectionContainer";

export const Managing_Director_Desk = () => {
  return (
    <SectionContainer
      title="Managing Director's Desk"
      subtitle="Hear from our esteemed Managing Director"
    >
      <div className="flex flex-col gap-10">
        {/* Single Card Matching the Layout of Other Pages */}
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          {/* Image */}
          <div className="overflow-hidden rounded-md mb-6 max-w-xs mx-auto shadow-sm hover:shadow-md transition-shadow">
            <img
              src="src/assets/imgs/Father.jpg"
              alt="Rev. Fr. Peter D'Souza"
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Rev. Fr. Peter D'Souza, Managing Director
          </h3>

          {/* Text Content */}
          <div className="text-gray-700 space-y-4">
            <p>
              In its brief existence of thirty years, Fr. Conceicao Rodrigues
              Institute of Technology has established itself as an exemplary
              centre of quality education, leading to the holistic development
              of it's learners.
            </p>
            <p>
              It's truly heartening to note that FCRIT, in all its educational
              initiatives and teaching-learning programmes, in conformity with
              New Education Policy-2020 insights and recommendations, is
              effectively moving towards multidisciplinary and holistic
              education, promotion of quality research and institutional
              autonomy.
            </p>
            <p>
              The institute has taken care in consistently maintaining high
              academic standards, across all areas of teaching and learning. It
              has also been able to create and maintain a safe and equitable
              learning environment, while ensuring the mental well-being of all
              its students.
            </p>
            <p>
              In its constant endeavour to equip the learners to the swiftly
              evolving demands of industries and their modern challenges, as
              well as to promote their industry readiness and their
              employability skills, the institution has sharply focused on
              developing the soft skills of its students, like communication
              skills, creative and critical thinking, initiatives and
              self-direction, leadership and responsibility; collaboration as
              well as social and cross-cultural interaction skills.
            </p>
            <p>
              Blissfully, FCRIT has embraced diversity, equity and inclusivity
              into it's culture with highest regard for all, and thus creating a
              sense of belongingness, values and meaningfulness in the life of
              all its students, faculty and staff.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

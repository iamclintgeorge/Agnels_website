import React from "react";
import { SectionContainer } from "../SectionContainer";

export const Vision_and_Mission = () => {
  return (
    <SectionContainer
      title="Vision & Mission"
      subtitle="Exploring our guiding principles and aspirations"
    >
      <div className="flex flex-col gap-10">
        {/* Image (Row 1) */}
        <div className="relative rounded-md overflow-hidden shadow-sm group mx-auto w-full max-w-4xl">
          <img
            src="src/assets/imgs/history_image.jpg"
            alt="Vision and Mission"
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-5 right-5 text-white text-lg md:text-xl font-bold bg-black bg-opacity-60 px-3 py-2 rounded">
            89% of our Alumni are LEADERS !!
          </div>
        </div>

        {/* Vision & Mission (Row 2) side by side on larger screens */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          {/* Vision */}
          <div className="flex-1  rounded-md shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
              Vision
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              To evolve and flourish as a progressive centre for modern
              technical education, stirring creativity in every student leading
              to self-sustainable professionals, through holistic development;
              nurtured by strength and legitimate pride of Indian values and
              ethics.
            </p>
          </div>

          {/* Mission */}
          <div className="flex-1  rounded-md shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
              Mission
            </h3>
            <ul className="list-disc list-inside text-base md:text-lg text-gray-700 leading-relaxed space-y-1">
              <li>To provide industry oriented quality education.</li>
              <li>
                To provide holistic environment for overall personal
                development.
              </li>
              <li>
                To foster relationship with other institutes of repute, alumni,
                and industry.
              </li>
            </ul>
          </div>
        </div>

        {/* Message Section (Row 3) */}
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
            Message from Rev. Dr. Ivon Almeida
          </h3>
          <div className="border border-gray-300 p-4 rounded-md shadow-sm ">
            <div className="flex items-center justify-between text-gray-500 mb-4">
              <span className="text-sm italic">
                Late Rev. Fr. Conceicao Rodrigues, a singular and unique
              </span>
              <div className="flex gap-1 cursor-pointer text-gray-600">
                <span className="text-lg hover:text-gray-800 transition-colors">
                  &lt;
                </span>
                <span className="text-lg hover:text-gray-800 transition-colors">
                  &gt;
                </span>
              </div>
            </div>
            <div className="overflow-y-auto h-72 pr-2">
              {/* Full original text restored below */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Fr. C. Rodrigues Institute of Technology, Vashi, is one such
                exemplar of educational refinement as envisioned by our founder.
                We are known for our commitment towards building future citizens
                who are imbued in a strong sense of professionalism and ethical
                values. We take it upon ourselves to help the fresh entrants of
                engineering to develop into not only a well-rounded but also
                well-grounded citizens by providing them with a holistic
                environment. A student who enters the environs of this institute
                leaves this place a transformed individual, having learnt the
                ropes of cultivating academics and relationships.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                I understand that in the initial days students find the rules of
                the college a slightly strange and overwhelming; but stay
                assured that all this comes in good stead. As we realise that
                the world outside is not an easy place to
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Principal_Desk = () => {
  return (
    <SectionContainer
      title="Principal's Desk"
      subtitle="A message from our Principal"
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
            “To make our country great, self-supporting and strong, work hard, work harder, work with efficiency, work with a cooperative spirit and work with a team spirit”                                                                                                                                   ……Sir M.Visvesvaraya

            These words by the renowned father of Indian Engineering resounds in the annals of education and engineering studies. Fr. Conceicao Rodrigues Institute of Technology (Fr. CRIT), one of the top engineering colleges, under the domain of Mumbai University, strongly believes in nurturing their students to create builders of the nation. We not only impart academic education, but also inculcate in our students the knowledge that they have the power to create a better tomorrow. We, as an institute, believe strongly in the holistic development of each and every student of our institute. No one is left behind. Every child is given an opportunity to regenerate and enhance his individual skills and academic quotient. We believe that every student is unique and needs to be nurtured in a comprehensive manner. We have managed a fine balance between providing academic knowledge and bolstering their finer skills.

            Our dedicated and diligent faculty and staff play a major role in achieving the objectives of this institute. My very competent team of teaching and non-teaching staff strive to focus on each and every child, monitor and mentor them, appreciate their achievement and encourage them to overcome their shortcomings. We lay emphasis on key areas such as teaching/learning methodology with special focus on developing strong fundamentals and enhancing analytical abilities. And our main objective is to give rise to professional and practising engineers who will play an active role in the progress of our nation.

            Also in keeping with the Make in India theme, Fr. CRIT. encourages the entrepreneur spirit in their students. For this we have the Centre for Innovation and Business Acceleration where a platform is provided for the propagation of innovative business ideas. Apart from the undergraduate course in five streams, we also offer post graduate courses in the Mechanical, Electronics & Telecommunication (EXTC) and Electrical fields of engineering. It gives me great pride to say that we also offer Doctoral courses in the Mechanical, EXTC and Electrical streams. Our institute stands by its mission of churning out well-rounded individuals and thorough professionals.
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

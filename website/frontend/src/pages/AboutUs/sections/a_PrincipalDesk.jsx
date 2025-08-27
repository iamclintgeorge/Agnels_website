import React from "react";
import { SectionContainer } from "./SectionContainer";

export const Principal_Desk = () => {
  return (
    <SectionContainer
      title="Principal's Desk"
      subtitle="A message from our Principal"
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dr. S. M. Khot</h3>
              <p className="text-sm text-gray-700 leading-7">
                Ph.D. (IIT-Bombay)
                <br />
                M.E. (Mechanical-Design Engineering)
                <br />
                B.E. (Mechanical Engineering)
                <br />
                e-mail: principal@fcrit.ac.in
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Positions Held</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Former Chairman Board of Studies in Mechanical Engineering, University of Mumbai, Mumbai.</li>
                <li>Former Member of Academic Council, University of Mumbai, Mumbai.</li>
                <li>Former Member of Faculty of Technology, University of Mumbai, Mumbai.</li>
                <li>Former Member of B.U.T.R, University of Mumbai, Mumbai.</li>
                <li>Former Member of Research and Recognition Committee, University of Mumbai, Mumbai.</li>
                <li>Former Member of Staff Grievances Committee of University of Mumbai, Mumbai.</li>
                <li>Former Member Board of Studies in Mechanical Engineering, University of Pune, Pune.</li>
                <li>Member Board of Studies of Autonomous Institute, K.J. Somaiya College of Engineering, Vidyavihar, Mumbai.</li>
                <li>Member of Governing Council of Fr. C. Rodrigues College of Engineering, Bandra.</li>
                <li>University Nominee on Governing Council of Finolex Academy College of Engineering, Ratnagiri.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Message</h4>
          <blockquote className="italic text-gray-700 border-l-4 border-gray-300 pl-4 mb-6">
            To make our country great, self-supporting and strong, work hard, work harder, work with efficiency, work with a cooperative spirit and work with a team spirit. — Sir M. Visvesvaraya
          </blockquote>
          <div className="text-base text-gray-700 space-y-4 leading-7 text-justify">
            <p>
              These words by the renowned father of Indian Engineering resound in the annals of education and engineering studies. Fr. Conceicao Rodrigues Institute of Technology (Fr. CRIT), one of the top engineering colleges under the domain of Mumbai University, strongly believes in nurturing students to create builders of the nation. We not only impart academic education, but also inculcate in our students the knowledge that they have the power to create a better tomorrow. We, as an institute, believe strongly in the holistic development of each and every student of our institute. No one is left behind. Every child is given an opportunity to regenerate and enhance his individual skills and academic quotient. We believe that every student is unique and needs to be nurtured in a comprehensive manner. We have managed a fine balance between providing academic knowledge and bolstering their finer skills.
            </p>
            <p>
              Our dedicated and diligent faculty and staff play a major role in achieving the objectives of this institute. My very competent team of teaching and non-teaching staff strive to focus on each and every child, monitor and mentor them, appreciate their achievement and encourage them to overcome their shortcomings. We lay emphasis on key areas such as teaching/learning methodology with special focus on developing strong fundamentals and enhancing analytical abilities. And our main objective is to give rise to professional and practising engineers who will play an active role in the progress of our nation.
            </p>
            <p>
              Also in keeping with the Make in India theme, Fr. CRIT encourages the entrepreneur spirit in their students. For this we have the Centre for Innovation and Business Acceleration where a platform is provided for the propagation of innovative business ideas. Apart from the undergraduate course in the five streams, we also offer post graduate courses in the Mechanical, Electronics &amp; Telecommunication (EXTC) and Electrical fields of engineering. It gives me great pride to say that we also offer Doctoral courses in the Mechanical, EXTC and Electrical streams. Our institute stands by its mission of churning out well‑rounded individuals and thorough professionals.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

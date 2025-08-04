import React, { useState, useEffect } from "react";

/* ------------------------------------------------------------------
   A) SHARED CONTAINER FOR THE WHOLE PAGE
   ------------------------------------------------------------------ */
const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-12 ">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Title & Subtitle */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 heading-premium">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   B) PAGES
   ------------------------------------------------------------------ */

/* ------------------------ 1) HISTORY ------------------------ */
export const History = () => {
  return (
    <SectionContainer
      title="Our History"
      subtitle="Tracing the roots and evolution of our institution"
    >
      <div className="flex flex-col gap-10">
        {/* Establishment Card */}
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2 heading-premium">
            Establishment
          </h3>
          <div className="overflow-hidden rounded-md mb-4">
            <img
              src="src/assets/imgs/history_image.jpg"
              alt="Establishment"
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* Original snippet had no extra paragraph text here */}
        </div>

        {/* An Endeavor called Fr. CRIT Card */}
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2 font-playfair">
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
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2 heading-premium">
            History
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The Agnel Ashram Fathers - a group of Catholic priests and brothers,
            along with some well educated, dedicated, zealous and patriotic
            co-workers have, during the last 45 years, built up a large
            well-knit family of committed individuals. This unique family, which
            is spread over different parts of the country, has been instrumental
            in propounding a powerful
            <span className="font-semibold"> MOVEMENT</span> in the realm of
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

/* ------------------------ 2) VISION & MISSION ------------------------ */
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2 heading-premium">
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
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2 heading-premium">
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

/* ------------------------ 3) TRUSTEES ------------------------ */
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

/* ------------------------ 4) MANAGING DIRECTOR'S DESK ------------------------ */
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
            <p>
              Contentedly and with a joyful heart, I would like to mention here,
              that hundreds of our alumni today are talented and accomplished
              professionals and successful entrepreneurs in various fields of
              business activities. Our alumni in the truest sense are serving as
              powerful ambassadors for their alma mater.
            </p>
            <p>
              Given the commitment of its faculty and their expertise in
              empowering all their students, and the consistent academic
              excellence achieved year after year, I'm sure that FCRIT shall
              continue to maintain its high standards and its effective and
              meaningful collaboration with communities and industries as well
              as face all future challenges with poise and courage.
            </p>
            <p>Wishing you all Godspeed.</p>

            <blockquote className="italic mt-8 border-l-4 border-gray-400 pl-4 text-gray-600">
              "Any sound disciplinary policy should aim at education rather than
              punishment, constructive correction rather than reproof and 'what
              is wrong' rather than 'who is wrong'. Treat a man as he is and he
              will remain as he is. Treat a man as he can and should be and he
              will become as he can and should be."
              <footer className="mt-2 not-italic font-semibold">
                — Goethe
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
/* ------------------------ 5) PRINCIPAL'S DESK ------------------------ */
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
              src="src/assets/imgs/principal.png"
              alt="Rev. Fr. Peter D'Souza"
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Dr.S. M. Khot
          </h3>

          {/* Text Content */}
          <div className="text-gray-700 space-y-4">

            “To make our country great, self-supporting and strong, work hard, work harder, work with efficiency, work with a cooperative spirit and work with a team spirit” <br /> <b>      ……Sir M.Visvesvaraya</b><br />
            <br />

            These words by the renowned father of Indian Engineering resounds in the annals of education and engineering studies. Fr. Conceicao Rodrigues Institute of Technology (Fr. CRIT), one of the top engineering colleges, under the domain of Mumbai University, strongly believes in nurturing their students to create builders of the nation. We not only impart academic education, but also inculcate in our students the knowledge that they have the power to create a better tomorrow. We, as an institute, believe strongly in the holistic development of each and every student of our institute. No one is left behind. Every child is given an opportunity to regenerate and enhance his individual skills and academic quotient. We believe that every student is unique and needs to be nurtured in a comprehensive manner. We have managed a fine balance between providing academic knowledge and bolstering their finer skills.
            <br />

            Our dedicated and diligent faculty and staff play a major role in achieving the objectives of this institute. My very competent team of teaching and non-teaching staff strive to focus on each and every child, monitor and mentor them, appreciate their achievement and encourage them to overcome their shortcomings. We lay emphasis on key areas such as teaching/learning methodology with special focus on developing strong fundamentals and enhancing analytical abilities. And our main objective is to give rise to professional and practising engineers who will play an active role in the progress of our nation.
            <br />

            Also in keeping with the Make in India theme, Fr. CRIT. encourages the entrepreneur spirit in their students. For this we have the Centre for Innovation and Business Acceleration where a platform is provided for the propagation of innovative business ideas. Apart from the undergraduate course in five streams, we also offer post graduate courses in the Mechanical, Electronics & Telecommunication (EXTC) and Electrical fields of engineering. It gives me great pride to say that we also offer Doctoral courses in the Mechanical, EXTC and Electrical streams. Our institute stands by its mission of churning out well-rounded individuals and thorough professionals.
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ------------------------ 6) GOVERNANCE ------------------------ */
export const Governance = () => {
  return (
    <SectionContainer
      title="Governance"
      subtitle="Ensuring accountability and transparency"
    >
      <div className="flex flex-col gap-10">
        <div className="main-container py-5">
          <div className="container mx-auto px-4">
            <div className="row sponsorship-detail">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">


                {/* Main Content Table */}
                <div className="p-6">
                  <table className="w-full text-center border-collapse">
                    <tbody>
                      {/* Member List Link Row */}
                      <tr>
                        <td colSpan={2} className="py-4">
                          <a
                            href="https://fcrit.ac.in/cdn/MoM/AcademicCouncil.pdf"
                            target="_blank"
                            className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                          >
                            Academic Council Member List
                          </a>
                        </td>
                      </tr>

                      {/* Minutes of Meeting Header Row */}
                      <tr className="border-b border-gray-200">
                        <td colSpan={2} className="py-4">
                          <h4 className="text-xl font-semibold text-gray-700">
                            Minutes of Meeting
                          </h4>
                        </td>
                      </tr>

                      {/* Meeting Item Rows */}
                      <tr className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-4 text-left font-medium text-gray-600">
                          Ist Meeting
                        </td>
                        <td className="py-4 px-4 text-right">
                          <a
                            href="https://fcrit.ac.in/cdn/MoM/ACM.pdf"
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
                          >
                            (29 April 2024)
                          </a>
                        </td>
                      </tr>

                      {/* Add more meeting rows here if needed */}

                      <tr className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-4 text-left font-medium text-gray-600">
                          IInd Meeting
                        </td>
                        <td className="py-4 px-4 text-right">
                          <a
                            href="https://fcrit.ac.in/cdn/MoM/ACM.pdf"
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
                          >
                            (25 May 2024)
                          </a>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ------------------------ 7) AUDIT REPORT & AFFILIATIONS ------------------------ */
export const Audit_Report_and_Affiliations = () => {

 const tabsData = [
  {
    name: 'Audit Report',
    id: 'audit-reports',
    subTabs: [
      { year: '2023-2024', id: 'audit-1', url: 'https://fcrit.ac.in/cdn/auditreport/1736404988-Audit.Report.2023.24.pdf' },
      { year: '2022-2023', id: 'audit-2', url: 'https://fcrit.ac.in/cdn/auditreport/1736405105-Audit.Report.20222023.pdf' },
      { year: '2021-2022', id: 'audit-3', url: 'https://fcrit.ac.in/cdn/auditreport/1736404934-Audited.2021.2022.pdf' },
      { year: '2020-2021', id: 'audit-4', url: 'https://fcrit.ac.in/cdn/auditreport/Audit Report 2020-21.pdf' },
      { year: '2019-2020', id: 'audit-5', url: 'https://fcrit.ac.in/cdn/auditreport/Audit Report 2019-20.pdf' },
      { year: '2018-2019', id: 'audit-6', url: 'https://fcrit.ac.in/cdn/auditreport/1575093235-Audit.Report.2018.19.pdf' },
      { year: '2017-2018', id: 'audit-7', url: 'https://fcrit.ac.in/cdn/auditreport/1540539118-Audit.FRCRIT.pdf' },
      { year: '2016-2017', id: 'audit-8', url: 'https://fcrit.ac.in/cdn/auditreport/1532517564-Annual.Report.2016.17.pdf' },
      { year: '2015-2016', id: 'audit-9', url: 'https://fcrit.ac.in/cdn/auditreport/1532516760-FCRIT.AUDIT.REPORT.pdf' },
      { year: '2014-2015', id: 'audit-10', url: 'https://fcrit.ac.in/cdn/auditreport/Audit Report 2014-15.pdf' },
    ],
  },
  {
    name: 'EOA Reports',
    id: 'eoa-reports',
    subTabs: [
      { year: 'EOA 2025-2026', id: 'eoa-1', url: 'https://fcrit.ac.in/cdn/aicte/1744795462-EOA.2025.26.PDF' },
      { year: 'EOA 2024-2025', id: 'eoa-2', url: 'https://fcrit.ac.in/cdn/aicte/1714623126-EOA.Report.2024.25.pdf' },
      { year: 'EOA 2023-2024', id: 'eoa-3', url: 'https://fcrit.ac.in/cdn/aicte/1709624873-EOA.Report.2023.24.PDF' },
      { year: 'EOA 2022-2023', id: 'eoa-4', url: 'https://fcrit.ac.in/cdn/aicte/1678444672-EOA.2022.23.PDF' },
      { year: 'EOA 2021-2022', id: 'eoa-5', url: 'https://fcrit.ac.in/cdn/aicte/1648121106-EOA.Report.21.22.PDF' },
      { year: 'EOA 2020-2021', id: 'eoa-6', url: 'https://fcrit.ac.in/cdn/aicte/1625207909-EOA.2020.21.pdf' },
      { year: 'EOA 2019-2020', id: 'eoa-7', url: 'https://fcrit.ac.in/cdn/aicte/1625207889-EOA.2019.20.pdf' },
      { year: 'EOA 2018-2019', id: 'eoa-8', url: 'https://fcrit.ac.in/cdn/aicte/1555044128-EOA.2018.2019.PDF' },
      { year: 'EOA 2017-2018', id: 'eoa-9', url: 'https://fcrit.ac.in/cdn/aicte/1555044104-EOA.2017.2018.pdf' },
      { year: 'EOA 2016-2017', id: 'eoa-10', url: 'https://fcrit.ac.in/cdn/aicte/1499961603-EOA201617.pdf' },
      { year: 'EOA 2015-2016', id: 'eoa-11', url: 'https://fcrit.ac.in/cdn/aicte/1499961569-EOA201516.pdf' },
      { year: 'EOA 2014-2015', id: 'eoa-12', url: 'https://fcrit.ac.in/cdn/aicte/1499961550-EOA201415.pdf' },
      { year: 'EOA 2013-2014', id: 'eoa-13', url: 'https://www.fcrit.ac.in/cdn/aicte/1499961528-EOA201314.pdf' },
      { year: 'EOA 2012-2013', id: 'eoa-14', url: 'https://fcrit.ac.in/cdn/aicte/1649159728-EOA.2012.2013.pdf' },
      { year: 'EOA 2011-2012', id: 'eoa-15', url: 'https://fcrit.ac.in/cdn/aicte/1649159796-EOA.2011.2012.pdf' },
      { year: 'EOA 2008-2011', id: 'eoa-16', url: 'https://fcrit.ac.in/cdn/aicte/1649159687-EOA.2008.2011.pdf' },
      { year: 'EOA 2007-2008', id: 'eoa-17', url: 'https://fcrit.ac.in/cdn/aicte/1649159670-EOA.2007.2008.pdf' },
      { year: 'EOA 2006-2007', id: 'eoa-18', url: 'https://fcrit.ac.in/cdn/aicte/1649159651-EOA.2006.2007.pdf' },
      { year: 'EOA 2005-2006', id: 'eoa-19', url: 'https://fcrit.ac.in/cdn/aicte/1649159633-EOA.2005.2006.pdf' },
      { year: 'EOA 2002-2005', id: 'eoa-20', url: 'https://fcrit.ac.in/cdn/aicte/1649159611-EOA.2002.2005.pdf' },
      { year: 'EOA 2001-2002', id: 'eoa-21', url: 'https://fcrit.ac.in/cdn/aicte/1649159589-EOA.2001.2002.pdf' },
      { year: 'EOA 1999-2001', id: 'eoa-22', url: 'https://fcrit.ac.in/cdn/aicte/1649159570-EOA.1999.2001.pdf' },
      { year: 'EOA 1998-1999', id: 'eoa-23', url: 'https://fcrit.ac.in/cdn/aicte/1649159527-EOA.1998.99.pdf' },
      { year: 'EOA 1996-1997', id: 'eoa-24', url: 'https://fcrit.ac.in/cdn/aicte/1649159224-EOA.1996.97.pdf' },
      { year: 'EOA 1995-1996', id: 'eoa-25', url: 'https://fcrit.ac.in/cdn/aicte/1649159205-EOA.1995.96.pdf' },
      { year: 'EOA 1994-1995', id: 'eoa-26', url: 'https://fcrit.ac.in/cdn/aicte/1649159179-EOA.1994.95.pdf' },
    ],
  },
  // Add other two tabs here
  {
    name: 'Mumbai University',
    id: 'mumbai-university',
    subTabs: [
      { year: 'Tab 3 Item 1', id: 't3-1', url: 'some_url_3_1.pdf' },
      { year: 'Tab 3 Item 2', id: 't3-2', url: 'some_url_3_2.pdf' },
    ],
  },
  {
    name: 'DTE',
    id: 'dte',
    subTabs: [
      { year: 'Tab 4 Item 1', id: 't4-1', url: 'some_url_4_1.pdf' },
      { year: 'Tab 4 Item 2', id: 't4-2', url: 'some_url_4_2.pdf' },
    ],
  },
];
  const [activeMainTab, setActiveMainTab] = useState(tabsData[0].id);
  const [activeSubTab, setActiveSubTab] = useState(tabsData[0].subTabs[0].id);

  const currentMainTab = tabsData.find(tab => tab.id === activeMainTab);
  const currentSubTab = currentMainTab?.subTabs.find(tab => tab.id === activeSubTab);

  useEffect(() => {
    if (currentMainTab?.subTabs?.length > 0) {
      setActiveSubTab(currentMainTab.subTabs[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [activeMainTab]);

  return (
    <SectionContainer
      title="Audit Report & Affiliations"
      subtitle="Transparency in finances and partnerships"
    >
      <div className="py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Main Tabs */}
          <div className="flex flex-wrap justify-center gap-3 bg-white p-4 rounded-lg shadow">
            {tabsData.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition
                  ${activeMainTab === tab.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {tab.name}
              </button>
            ))}
          </div>

{activeMainTab === 'audit-reports' || activeMainTab === 'eoa-reports' ? (
   <div className="lg:flex gap-8">
            {/* SubTabs List */}
            <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow max-h-[700px] overflow-y-auto">
              <ul className="space-y-2">
                {currentMainTab?.subTabs?.map(sub => (
                  <li key={sub.id}>
                    <button
                      onClick={() => setActiveSubTab(sub.id)}
                      className={`w-full text-left px-4 py-2 rounded-md transition font-medium text-sm
                        ${activeSubTab === sub.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-gray-100 text-gray-700'}
                      `}
                    >
                      {sub.year}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PDF Viewer */}
            <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow min-h-[700px] flex items-center justify-center">
              {currentSubTab ? (
                <object
                  className="w-full h-[700px] rounded-lg border"
                  data={currentSubTab.url}
                  type="application/pdf"
                >
                  <div className="text-center text-gray-600">
                    <p>
                      <strong>Error:</strong> Your browser does not support PDF viewing. You can download it below.
                    </p>
                    <a
                      href={currentSubTab.url}
                      className="mt-3 inline-block text-indigo-600 font-medium underline"
                      download
                    >
                      Download PDF
                    </a>
                  </div>
                </object>
              ) : (
                <p className="text-gray-500">No report available for this selection.</p>
              )}
            </div>
          </div>
):(
activeMainTab === 'mumbai-university' ? (
<div className="main-container px-4 py-6">
  <div className="container mx-auto">
    <div className="col-span-10">
      <div className="tab-content">
        <div className="tab-pane active" id="univ">
          <h2 className="text-xl font-semibold mb-4">Approval from University of Mumbai</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Approval Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Letter No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">First Approval from University of Mumbai</td>
                  <td className="border border-gray-300 px-4 py-2">Aff/Reog/3722 of 1994</td>
                  <td className="border border-gray-300 px-4 py-2">20th July 1994</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Permanent Affiliation from Academic Year 2020-21</td>
                  <td className="border border-gray-300 px-4 py-2">Aff/ICD/2022-23/991</td>
                  <td className="border border-gray-300 px-4 py-2">29th July 2022</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
):(
  <div className="main-container px-4 py-6">
  <div className="container mx-auto">
    <div className="col-span-10">
      <div className="tab-content">
        <div className="tab-pane active" id="mu">
          <h2 className="text-xl font-semibold mb-4">Approval from DTE</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Sr. No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Approval Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">23-11-2014</td>
                  <td className="border border-gray-300 px-4 py-2">Approved by DTE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

)

)}
          {/* Sub-tabs + PDF */}
         
        </div>
      </div>
    </SectionContainer>
  );
};

/* ------------------------ 8) INSTITUTE ROADMAP ------------------------ */
export const Institute_Roadmap = () => {
  return (
    <SectionContainer
      title="Institute Roadmap"
      subtitle="Charting our course for the future"
    >
      <div className="main-container" style={{ paddingBottom: 5 }}>
  {/*  Main-container start */}
  <div className="container ">
    <div
      className="row sponsorship-detail"
      style={{ padding: "0 10px", height: "auto" }}
    >
      <object
        className="displaypdf"
        data="https://fcrit.ac.in/cdn/InstituteRoadmap/institute roadmap.pdf"
        type="application/pdf"
        width="100%"
        height="600px"
      >
        <p>
          <b>Error:</b>: This browser does not support PDFs. Please download the
          PDF to view it:{" "}
          <a href="https://fcrit.ac.in/cdn/InstituteRoadmap/institute roadmap.pdf">
            Download PDF
          </a>
          .
        </p>
      </object>
    </div>
  </div>
</div>

    </SectionContainer>
  );
};

/* ------------------------ 9) SERVICE REGULATION ------------------------ */
export const Service_Regulation = () => {
  const pdfUrl = "src/assets/Documents/service.pdf"; // Adjust your PDF path here

  return (
    <SectionContainer
      title="Service Regulations"
      subtitle="Information on policies and standards"
    >
      <div className="flex flex-col gap-10">
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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

/* ------------------------ 10) QUALIFICATION & ELIGIBILITY NORMS ------------------------ */
export const Qualification_and_Eligiblity_Norms_for_Recruitment = () => {
  return (
    <SectionContainer
      title="Qualification & Eligibility Norms"
      subtitle="Guidelines for recruitment"
    >
      <div className="main-container" style={{ paddingBottom: 5 }}>
  {/*  Main-container start */}
  <div className="container ">
    <div
      className="row sponsorship-detail"
      style={{ padding: "0 10px", height: "auto" }}
    >
      <object
        className="displaypdf"
        data="https://fcrit.ac.in/cdn/Qualification/note.pdf"
        type="application/pdf"
        width="100%"
        height="600px"
      >
        <p>
          <b>Error:</b>: This browser does not support PDFs. Please download the
          PDF to view it:{" "}
          <a href="https://fcrit.ac.in/cdn/Qualification/note.pdf">
            Download PDF
          </a>
          .
        </p>
      </object>
    </div>
  </div>
</div>

    </SectionContainer>
  );
};

/* ------------------------ 11) BEST PRACTICES ------------------------ */
export const Best_Practices = () => {
  const pdfUrl = "src/assets/Documents/bestprac.pdf"; // Adjust your PDF path here

  return (
    <SectionContainer
      title="Best Practices"
      subtitle="Committed to excellence in every endeavor"
    >
      <div className="flex flex-col gap-10">
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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

/* ------------------------ 12) MANDATORY DISCLOSURE ------------------------ */
export const Mandatory_Disclosure = () => {
  const pdfUrl = "src/assets/Documents/mandatory_disclosure.pdf"; // Adjust your PDF path here

  return (
    <SectionContainer
      title="Mandatory Disclosure"
      subtitle="Ensuring compliance and transparency"
    >
      <div className="flex flex-col gap-10">
        <div className=" rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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

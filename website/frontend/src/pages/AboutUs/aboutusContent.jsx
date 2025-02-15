import React from "react";

/* ------------------------------------------------------------------
   A) SHARED CONTAINER FOR THE WHOLE PAGE
   ------------------------------------------------------------------ */
const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Title & Subtitle */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">{title}</h2>
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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
          {/* Original snippet had no extra paragraph text here */}
        </div>

        {/* An Endeavor called Fr. CRIT Card */}
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            History
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The Agnel Ashram Fathers - a group of Catholic priests and brothers,
            along with some well educated, dedicated, zealous and patriotic
            co-workers have, during the last 45 years, built up a large
            well-knit family of committed individuals. This unique family,
            which is spread over different parts of the country, has been
            instrumental in propounding a powerful
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
          <div className="flex-1 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow p-5">
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
          <div className="flex-1 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow p-5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
              Mission
            </h3>
            <ul className="list-disc list-inside text-base md:text-lg text-gray-700 leading-relaxed space-y-1">
              <li>To provide industry oriented quality education.</li>
              <li>To provide holistic environment for overall personal development.</li>
              <li>
                To foster relationship with other institutes of repute, alumni,
                and industry.
              </li>
            </ul>
          </div>
        </div>

        {/* Message Section (Row 3) */}
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
            Message from Rev. Dr. Ivon Almeida
          </h3>
          <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-white">
            <div className="flex items-center justify-between text-gray-500 mb-4">
              <span className="text-sm italic">
                Late Rev. Fr. Conceicao Rodrigues, a singular and unique
              </span>
              <div className="flex gap-1 cursor-pointer text-gray-600">
                <span className="text-lg hover:text-gray-800 transition-colors">&lt;</span>
                <span className="text-lg hover:text-gray-800 transition-colors">&gt;</span>
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Meet the esteemed members of our trust who guide our institution.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {trusteesList.map((trustee, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow w-48"
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
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
              In its brief existence of thirty years, Fr. Conceicao Rodrigues Institute
              of Technology has established itself as an exemplary centre of quality
              education, leading to the holistic development of it's learners.
            </p>
            <p>
              It's truly heartening to note that FCRIT, in all its educational initiatives
              and teaching-learning programmes, in conformity with New Education
              Policy-2020 insights and recommendations, is effectively moving towards
              multidisciplinary and holistic education, promotion of quality research
              and institutional autonomy.
            </p>
            <p>
              The institute has taken care in consistently maintaining high academic
              standards, across all areas of teaching and learning. It has also been
              able to create and maintain a safe and equitable learning environment,
              while ensuring the mental well-being of all its students.
            </p>
            <p>
              In its constant endeavour to equip the learners to the swiftly evolving
              demands of industries and their modern challenges, as well as to promote
              their industry readiness and their employability skills, the institution
              has sharply focused on developing the soft skills of its students, like
              communication skills, creative and critical thinking, initiatives and
              self-direction, leadership and responsibility; collaboration as well as
              social and cross-cultural interaction skills.
            </p>
            <p>
              Blissfully, FCRIT has embraced diversity, equity and inclusivity into it's
              culture with highest regard for all, and thus creating a sense of
              belongingness, values and meaningfulness in the life of all its students,
              faculty and staff.
            </p>
            <p>
              Contentedly and with a joyful heart, I would like to mention here, that
              hundreds of our alumni today are talented and accomplished professionals
              and successful entrepreneurs in various fields of business activities. Our
              alumni in the truest sense are serving as powerful ambassadors for their
              alma mater.
            </p>
            <p>
              Given the commitment of its faculty and their expertise in empowering all
              their students, and the consistent academic excellence achieved year after
              year, I'm sure that FCRIT shall continue to maintain its high standards
              and its effective and meaningful collaboration with communities and
              industries as well as face all future challenges with poise and courage.
            </p>
            <p>Wishing you all Godspeed.</p>

            <blockquote className="italic mt-8 border-l-4 border-gray-400 pl-4 text-gray-600">
              "Any sound disciplinary policy should aim at education rather than
              punishment, constructive correction rather than reproof and 'what is
              wrong' rather than 'who is wrong'. Treat a man as he is and he will
              remain as he is. Treat a man as he can and should be and he will become
              as he can and should be."
              <footer className="mt-2 not-italic font-semibold">— Goethe</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
;

/* ------------------------ 5) PRINCIPAL'S DESK ------------------------ */
export const Principal_Desk = () => {
  return (
    <SectionContainer
      title="Principal's Desk"
      subtitle="A message from our Principal"
    >
      <div className="flex flex-col gap-10">
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to Principal_DeskPage. Here is a brief message from our Principal...
          </p>
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to the Governance Page, where we uphold the highest standards of
            institutional leadership...
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

/* ------------------------ 7) AUDIT REPORT & AFFILIATIONS ------------------------ */
export const Audit_Report_and_Affiliations = () => {
  return (
    <SectionContainer
      title="Audit Report & Affiliations"
      subtitle="Transparency in finances and partnerships"
    >
      <div className="flex flex-col gap-10">
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Our latest audit reports and institutional affiliations are provided here.
          </p>
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
      <div className="flex flex-col gap-10">
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to Institute_Roadmap Page, where we outline our vision for the
            years ahead...
          </p>
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
            <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
              <p className="p-4 text-gray-700">
                It appears you don't have a PDF plugin for this browser. No worries
                though, you can{" "}
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
      <div className="flex flex-col gap-10">
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-lg text-gray-700">
            Welcome to Qualification_and_Eligiblity_Norms_for_RecruitmentPage. Learn
            about our hiring standards...
          </p>
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
            <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
              <p className="p-4 text-gray-700">
                It appears you don't have a PDF plugin for this browser. No worries
                though, you can{" "}
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
        <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
            <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
              <p className="p-4 text-gray-700">
                It appears you don't have a PDF plugin for this browser. No worries
                though, you can{" "}
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

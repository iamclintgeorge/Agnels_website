import React from "react";



export const History = () => {
  return (
    <div className="flex flex-wrap justify-between gap-10">
        {/* Left Section */}
      <div className="w-full md:w-1/2">
         <div className="mb-8">
           <h2 className="text-2xl font-semibold mb-4">Establishment</h2>
          <img
            src="src/assets/imgs/history_image.jpg"
            alt="Establishment"
            className="w-full mb-4"
           />
          </div>
        
        <div>
           <h2 className="text-2xl font-semibold mb-4">An Endeavor called Fr. CRIT</h2>
          <p className="text-lg">
            The Agnel Ashram Family Movement originated way back in 1957 in
            Mumbai. Starting with the preschool level, seeks to touch the lives
            of students and citizens of India, right up to graduation and post
            graduation level, in such a way that every student entrusted to the
            care of an Agnel Ashram Fathers' institution.
          </p>
        </div>
      </div>

    {/* Right Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <p className="text-lg">
          The Agnel Ashram Fathers - a group of Catholic priests and brothers,
          along with some well educated, dedicated, zealous and patriotic co-
          workers have, during the last 45 years, built up a large well-knit family
          of committed individuals. This unique family, which is spread over different
          parts of the country, has been instrumental in propounding a powerful
          <span className="font-bold">MOVEMENT</span> in the realm of education.
        </p>
          <p className="text-lg mt-4">
          Starting with the preschool level, seeks to touch the lives of students
          and citizens of India, right up to graduation and post graduation
          level, in such a way that every student entrusted to the care of an Agnel
          Ashram Fathers' institution, grows into a balanced, versatile and
          courageous individual who has the physical, mental, emotional and
          spiritual strength to face the challenges of life. This Agnel Ashram
          Family Movement originated way back in 1957 in Mumbai.
        </p>
      </div>
    </div>
  );
};

export const Vision_and_Mission = () => {
  return (
    <div className="flex flex-wrap justify-between gap-10">
      {/* Left Section */}
      <div className="w-full md:w-1/2">
        <div className="relative mb-8">
          <img
            src="src/assets/imgs/history_image.jpg"
            alt="Vision and Mission"
            className="w-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded">
            89% of our Alumni are LEADERS !!
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Vision</h2>
          <p className="text-lg">
            To evolve and flourish as a progressive centre for modern technical
            education, stirring creativity in every student leading to self-
            sustainable professionals, through holistic development; nurtured
            by strength and legitimate pride of Indian values and ethics.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Mission</h2>
          <ul className="list-disc list-inside text-lg">
            <li>To provide industry oriented quality education.</li>
            <li>To provide holistic environment for overall personal development.</li>
            <li>
              To foster relationship with other institute of repute, alumni and
              industry.
            </li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Message from Rev. Dr. Ivon Almeida</h2>
        <div className="relative border border-gray-300 p-4 rounded-md">
          <div className="flex items-center justify-between text-gray-500 mb-4">
            <span className="text-sm italic">
               Late Rev. Fr. Conceicao Rodrigues, a singular and unique
            </span>
           <div className="flex gap-1 cursor-pointer">
             <span className="text-lg">{'<'}</span>
             <span className="text-lg">{'>'}</span>
           </div>
          </div>
        <div className="overflow-y-auto h-72 pr-2">
          <p className="text-lg">
            Fr. C. Rodrigues Institute of Technology, Vashi, is one such
            exemplar of educational refinement as envisioned by our founder. We
            are known for our commitment towards building future citizens who
            are imbued in a strong sense of professionalism and ethical values.
            We take it upon ourselves to help the fresh entrants of engineering
            to develop into not only a well-rounded but also well-grounded
            citizens by providing them with a holistic environment. A student
            who enters the environs of this institute leaves this place a
            transformed individual, having learnt the ropes of cultivating
            academics and relationships.
          </p>
          <p className="text-lg mt-4">
            I understand that in the initial days students find the rules of
            the college a slightly strange and overwhelming; but stay assured
            that all this comes in good stead. As we realise that the world
            outside is not an easy place to
          </p>
        </div>
       
        </div>
      </div>
    </div>
  );
};



export const Trustees = () => {
  return (
    <div>
      <h2>List of Trustees</h2>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#eee", margin: "0 auto 10px", borderRadius: "50%" }}>
            {/* Image Placeholder */}
          </div>
          <p style={{ textAlign: "center" }}>Fr. Bento Rodrigues</p>
          <p style={{ textAlign: "center" }}>Chairman</p>
        </div>
        <div>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#eee", margin: "0 auto 10px", borderRadius: "50%" }}>
            {/* Image Placeholder */}
          </div>
          <p style={{ textAlign: "center" }}>Fr. Alarico Carvalho</p>
          <p style={{ textAlign: "center" }}>Vice Chairman</p>
        </div>
        <div>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#eee", margin: "0 auto 10px", borderRadius: "50%" }}>
            {/* Image Placeholder */}
          </div>
          <p style={{ textAlign: "center" }}>Fr. Peter D'Souza</p>
          <p style={{ textAlign: "center" }}>Treasurer</p>
        </div>
        <div>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#eee", margin: "0 auto 10px", borderRadius: "50%" }}>
            {/* Image Placeholder */}
          </div>
          <p style={{ textAlign: "center" }}>Fr. Valerian D'Souza</p>
          <p style={{ textAlign: "center" }}>Secretary</p>
        </div>
        <div>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#eee", margin: "0 auto 10px", borderRadius: "50%" }}>
            {/* Image Placeholder */}
          </div>
          <p style={{ textAlign: "center" }}>Fr. Agnelo Gomes</p>
          <p style={{ textAlign: "center" }}>Member</p>
        </div>
      </div>
    </div>
  );
};

export const Managing_Director_Desk = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      {/* Image */}
      <img
        src="src/assets/imgs/Father.jpg"  // Replace with your actual image path
        alt="Rev. Fr. Peter D'Souza"
        style={{ maxWidth: "400px", display: "block", margin: "0 auto"  }} // Adjust max-width as needed
      />

      {/* Title */}
      <h3 style={{ textAlign: "left", marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
        Rev. Fr. Peter D'Souza, Managing Director
      </h3>

      {/* Text Content */}
      <div style={{ textAlign: "left" }}>
        <p>
          In its brief existence of thirty years, Fr. Conceicao Rodrigues Institute of Technology has established itself as an exemplary centre of quality education, leading to the holistic development of it's learners.
        </p>
        <p>
          It's truly heartening to note that FCRIT, in all its educational initiatives and teaching- learning programmes, in conformity with New Education Policy-2020 insights and recommendations, is effectively moving towards multidisciplinary and holistic education, promotion of quality research and institutional autonomy.
        </p>
        <p>
          The institute has taken care in consistently maintaining high academic standards, across all areas of teaching and learning. It has also been able to create and maintain a safe and equitable learning environment, while ensuring the mental well-being of all its students.
        </p>
        <p>
          In its constant endeavour to equip the learners to the swiftly evolving demands of industries and their modern challenges, as well as to promote their industry readiness and their employability skills, the institution has sharply focused on developing the soft skills of its students, like communication skills, creative and critical thinking, initiatives and self-direction, leadership and responsibility; collaboration as well as social and cross-cultural interaction skills.
        </p>
        <p>
          Blissfully, FCRIT has embraced diversity, equity and inclusivity into it's culture with highest regard for all, and thus creating a sense of belongingness, values and meaningfulness in the life of all its students, faculty and staff.
        </p>
        <p>
          Contentedly and with a joyful heart, I would like to mention here, that hundreds of our alumni today are talented and accomplished professionals and successful entrepreneurs in various fields of business activities. Our alumni in the truest sense are serving as powerful ambassadors for their alma mater.
        </p>
        <p>
          Given the commitment of its faculty and their expertise in empowering all their students, and the consistent academic excellence achieved year after year, I'm sure that FCRIT shall continue to maintain its high standards and its effective and meaningful collaboration with communities and industries as well as face all future challenges with poise and courage.
        </p>
        <p>
          Wishing you all Godspeed.
        </p>
      </div>

      {/* Goethe Quote */}
      <blockquote style={{ fontStyle: "italic", marginTop: "30px", borderLeft: "3px solid #ccc", paddingLeft: "15px", textAlign: "left" }}>
        "Any sound disciplinary policy should aim at education rather than punishment, constructive correction rather than reproof and 'what is wrong' rather than 'who is wrong'. Treat a man as he is and he will remain as he is. Treat a man as he can and should be and he will become as he can and should be."
        <footer style={{ fontStyle: "normal", marginTop: "5px" }}>— Goethe</footer>
      </blockquote>
    </div>
  );
};

export const Principal_Desk = () => {
  return (
    <div>
      <p>Welcome to Principal_DeskPage</p>
    </div>
  );
};

export const Governance = () => {
  return (
    <div>
      <p>Welcome to Governance Page</p>
    </div>
  );
};

export const  Audit_Report_and_Affiliations = () => {
  return (
    <div>
      <p>Welcome to  Audit_Report_and_Affiliations Page</p>
    </div>
  );
};


export const   Institute_Roadmap= () => {
    return (
      <div>
        <p>Welcome to   Institute_Roadmap  Page</p>
      </div>
    );
  };

  export const Service_Regulation = () => {
    const pdfUrl = "src/assets/Documents/service.pdf"; // Replace with your actual path to your PDF
  
    return (
      <div>
        <h2>Service Regulations</h2>
        <div style={{ width: "100%", height: "600px" }}> {/* Adjust width and height as needed */}
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              It appears you don't have a PDF plugin for this browser. No worries though, you can <a href={pdfUrl}>click here to download the PDF file.</a>
            </p>
          </object>
        </div>
      </div>
    );
  };
  export const   Qualification_and_Eligiblity_Norms_for_Recruitment = () => {
    return (
      <div>
        <p>Welcome to   Qualification_and_Eligiblity_Norms_for_RecruitmentPage</p>
      </div>
    );
  };

  export const Best_Practices = () => {
    const pdfUrl = "src/assets/Documents/bestprac.pdf"; // Replace with the actual path to your PDF
  
    return (
      <div>
        <h2>Best Practices</h2>
        <div style={{ width: "100%", height: "600px" }}> {/* Adjust width and height as needed */}
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              It appears you don't have a PDF plugin for this browser. No worries though, you can <a href={pdfUrl}>click here to download the PDF file.</a>
            </p>
          </object>
        </div>
      </div>
    );
  };



  export const Mandatory_Disclosure = () => {
    const pdfUrl = "src/assets/Documents/mandatory_disclosure.pdf"; // Replace with the actual path to your PDF
  
    return (
      <div>
        <h2>Mandatory Disclosure</h2>
        <div style={{ width: "100%", height: "600px" }}> {/* Adjust width and height as needed */}
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              It appears you don't have a PDF plugin for this browser. No worries though, you can <a href={pdfUrl}>click here to download the PDF file.</a>
            </p>
          </object>
        </div>
      </div>
    );
  };
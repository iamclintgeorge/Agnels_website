import React from "react";

export const Strategies = () => {
    return (
        <div id="vm" className="p-4 bg-white shadow rounded-lg mt-4">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-6">Strategies</h1>
            <div className="border-t-2 border-blue-500 my-4"></div>
            <h3 className="text-xl font-semibold mt-4">IQAC shall evolve mechanisms and procedures for:</h3>
            <ol className="text-lg mt-2 list-decimal pl-6">
                <li>Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.</li>
                <li>Concentrating on relevance and quality of academic and research programs.</li>
                <li>Implementing and operating optimization and integration of modenrn methods of teaching and learning.</li>
                <li>Upholding the credibility of evaluation procedures.</li>
                <li>Ensuring the adequacy, maintenance and functioning of the support structure and services.</li>
                <li>Creating affable academic atmosphere for sharing research findings and networking with other institutions in India and abroad by means of collaborations and internship programmes.</li>
            </ol>
        </div>
        </div>
    );
};

export const Functions = () => {
    return (
        <div id="vm" className="p-4 bg-white shadow rounded-lg mt-4">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-6">Functions</h1>
            <div className="border-t-2 border-blue-500 my-4"></div>
            <h3 className="text-xl font-semibold mt-4">Some of the functions expected of the IQAC are:</h3>
            <ol className="text-lg mt-2 list-decimal pl-6">
                <li>Improving the academic and administrative activities of the institution by developing and applying relevant practices and parameters from time to time.</li>
                <li>Improving the teaching and learning process by means of creating a learner-centric environment conducive to impart quality education and encourage faculty and students to adopt the required knowledge and technology.</li>
                <li>Collection and analysis of feedback from all stakeholders on quality-related institutional processes.</li>
                <li>Organisation of inter and intra institutional workshops, seminars on quality related themes.</li>
                <li>Documentation of the various programmes/activities leading to quality improvement.</li>
                <li>Development and maintenance of institutional database for the purpose of maintaining /enhancing the institutional quality.</li>
                <li>Periodical conduct of Academic and Administrative Audit.</li>
                <li>Preparation and submission of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC.</li>
            </ol>
        </div>
        </div>
    );
};

export const Benefits = () => {
    return (
        <div id="vm" className="p-4 bg-white shadow rounded-lg mt-4">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-6">Benefits</h1>
            <div className="border-t-2 border-blue-500 my-4"></div>
            <h3 className="text-xl font-semibold mt-4">IQAC will facilitate / contribute to:</h3>
            <ol className="text-lg mt-2 list-decimal pl-6">
                <li>Ensure clarity and focus in institutional functioning towards quality enhancement.</li>
                <li>Ensure enhancement and coordination among various activities of the institution and institutionalize all good practices.</li>
                <li>Provide a sound basis for decision-making to improve institutional functioning.</li>
                <li>Act as a dynamic system for quality changes in the institution.</li>
                <li>Build an organised methodology of documentation and internal communication.</li>
            </ol>
        </div>
        </div>
    );
};

export const Coordinator = () => {
    return (
        <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-6">Coordinator</h1>
            
            <div className="border-t-2 border-blue-500 my-4"></div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Name: Dr. Mini K Namboothirpad <br/> Contact: mini.n@fcrit.ac.in <br/> Phone: 022-27771000 
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Name: Dr. Sanjay Rukhande <br/> Contact: sanjay.rukhande@fcrit.ac.in <br/> Phone: 022-27771000
            </p>
          </div>
        </div>
    );
};

export const Our_Team = () => {
    const teamData = [
        { srNo: 1, role: "Management", name: "Fr. Peter D’Souza", designation: "Managing Director" },
        { srNo: 2, role: "Chairperson", name: "Dr. S. M. Khot", designation: "Principal" },
        { srNo: 3, role: "Administrative Officers", name: "Dr. Milind Shah", designation: "Dean (Academics), Professor, EXTC Engineering" },
        { srNo: "", role: "", name: "Dr. Sushil Thale", designation: "Professor and Dean (R&D, Industry Liaisoning), Electrical Engineering" },
        { srNo: "", role: "", name: "Dr. Lata Ragha", designation: "Dean Students & Alumni, Professor, Computer Engineering" },
        { srNo: "", role: "", name: "Dr. Nilaj Deshmukh", designation: "Dean (Admin & Faculty), Professor, Mechanical Engineering" },
        { srNo: "", role: "", name: "Mr. Mathewlal Thomas", designation: "Associate Professor, Mechanical Engineering" },
        { srNo: "", role: "Controller of Examinations", name: "Dr. Mahendra Rane", designation: "Associate Professor, Electrical Engineering and Placement Coordinator" },
        { srNo: 4, role: "Teachers", name: "Dr. Bindu S", designation: "Professor, Head of Dept, Electrical Engineering" },
        { srNo: "", role: "", name: "Dr. Shubhangi Vaikole", designation: "Professor, Head of Dept, Information Technology" },
        { srNo: "", role: "", name: "Dr. Megha Kolhekar", designation: "Associate Professor, Head of Dept, EXTC Engineering" },
        { srNo: "", role: "", name: "Dr. Kiruthika", designation: "Associate Professor, Head of Dept, Computer Engineering" },
        { srNo: "", role: "", name: "Dr. Aqleem S", designation: "Associate Professor, Head of Dept, Mechanical Engineering" },
        { srNo: "", role: "", name: "Dr. Christu N David", designation: "Associate Professor, Head of Dept, Humanities and Basic Sciences" },
        { srNo: "", role: "", name: "Dr. Sanjay W Rukhande", designation: "Assistant Controller of Examinations & Assistant Professor, Mechanical Engineering" },
        { srNo: "", role: "", name: "Mr. Rahul Jadhav", designation: "N.S.S coordinator" },
        { srNo: 5, role: "Local Society Member", name: "Dr. Ramesh Karandikar", designation: "Professor, EXTC Department and Dean-Academic Program, KJSCOE, Mumbai" },
        { srNo: 6, role: "Student Member", name: "Mr. Nair Yedhukrishnan", designation: "V Sem EXTC Engineering" },
        { srNo: 7, role: "Alumni Member", name: "Mr. Nitin Gurav", designation: "ABB Global Industries and Services" },
        { srNo: 8, role: "Employer Member", name: "Mr. Gaurav Ghelani", designation: "Academic Relationship Manager - India West, Tata Consultancy Services" },
        { srNo: 9, role: "Parent and Industry Member", name: "Mr. S.P. Singh", designation: "Head-Marketing Certification Engineers International Ltd." },
        { srNo: 10, role: "Parent and Industry Member", name: "Mr. Sumesh Wadawa", designation: "Scientific Officer, 'G' BARC" },
        { srNo: 11, role: "Coordinator", name: "Dr. Mini K Namboothiripad", designation: "Assistant Professor, Electrical Engineering" },
        { srNo: 12, role: "Coordinator", name: "Dr. Smita Dange", designation: "Assistant Professor, Computer Engineering" },
    ];

    return (
        <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-semibold mb-6">Our Team</h1>

                <div className="border-t-2 border-blue-500 my-4"></div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamData.map((member, index) => (
                                <tr key={index} className="even:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{member.srNo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{member.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{member.designation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export const IQAC_Initiatives = () => {
    return (
        <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold  mb-6">Initiatives</h1>
          
          <div className="border-t-2 border-blue-500 my-4"></div>

          <ul class="space-y-2 text-gray-700">
    <li class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">Department and Clubs: Activities and Achievements</li>
    <li class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">Meeting Details</li>
    <li class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">Institute Policy Manual</li>
    <li class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">Report Templates</li>
  </ul>
        </div>
      </div>
    );
};

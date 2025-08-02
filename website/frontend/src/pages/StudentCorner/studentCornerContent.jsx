import React from "react";

// Home Component
export const SC_Home = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-black mb-6 heading-premium">Student's Corner</h1>
      
      <p className="text-md text-gray-700 mb-6 leading-relaxed">
        Graduate school can be one of the most exciting, challenging, and enriching experiences in a student's life. Whether you're pursuing a Master's, Doctoral, or Graduate professional degree, it's essential to have a one-point contact that helps you navigate through your years in the institute.
      </p>
      
      <p className="text-md text-gray-700 mb-6 leading-relaxed">
        The Students' Corner provides you with tools, resources, clubs, and programs that will not only help you become an integral part of the institute but also ensure you have a great and holistic experience during your time here.
      </p>

      <div className="mt-8">
        <button className="btn-primary px-6 py-3 font-semibold rounded-lg shadow-lg">
          Learn More
        </button>
      </div>
    </>
  );
};



// Code of Conduct Component
export const CodeOfConduct = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Embedding PDF using iframe */}
      <iframe
        src="src\assets\pdfs\CodeofConductStudents.pdf"
        width="100%"
        height="800px"
        title="Code of Conduct"
      />
    </div>
  );
};


// Student Council Component
export const StudentCouncil = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <h1 className="text-3xl font-bold  mb-6">Student Council</h1>
      <p className="text-gray-700 mb-4">
        The student council is a body which represents the entire student community and undertakes the organization of various events and fests in the institute. Apart from regularly organizing annual events like Independence Day, Republic Day, and Teachers’ Day, the Student Council along with a host of other students organizes an intra-collegiate fest (FACES) and an inter-collegiate techno fest (EtaMax).
      </p>
      <p className="text-gray-700 mb-4">
        While FACES is conducted in the odd semester with sports and cultural events, Eta Max is celebrated in the even semester with a highlight on technical events and workshops. The Student Council plays a pivotal role as the interface between the student body and the Management of the college, and the core committee of the council also represents the student body at the University level. The student council is an integral part of the functioning of the entire co-curricular and extracurricular activity spectrum.
      </p>

      {/* Members Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Council Members</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Post</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Sojith Sunny", "General Secretary"],
            ["Sanchi Tiwade", "Joint Secretary"],
            ["Atharva Magar", "Cultural Secretary"],
            ["Abhishek Rubde", "Asst. Cultural Secretary"],
            ["Om Shinde", "Sports Secretary"],
            ["Srushti Patil", "Asst. Sports Secretary"],
            ["Poorva Raut", "Ladies Representative"],
            ["Manvi Desai", "Asst. Ladies Representative"],
            ["Aishwarya V Iyer", "Technical Head"],
            ["Sanket Zende", "Asst. Technical Head"],
            ["Swaraj Patil", "Treasurer"],
            ["Soham Shravane", "Asst. Treasurer"],
            ["Ann Rachel Koshy", "Sponsorship Head"],
            ["Vaishakh Varier", "Documentation Head"],
            ["Poorva Narkhede", "Creative Head"],
            ["Kaustubh Lamkhade", "Public Representative"],
            ["Rayyan Khan", "Security Head"],
            ["Yaseer Quraishi", "OC Head"],
          ].map(([name, post], index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="border border-gray-300 px-4 py-2">{name}</td>
              <td className="border border-gray-300 px-4 py-2">{post}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reports Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Reports</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">Event</th>
            <th className="border border-gray-300 px-4 py-2">2023</th>
            <th className="border border-gray-300 px-4 py-2">2022</th>
            <th className="border border-gray-300 px-4 py-2">2021</th>
            <th className="border border-gray-300 px-4 py-2">2020</th>
            <th className="border border-gray-300 px-4 py-2">2019</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">FACES</td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">ETAMAX</td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
            <td className="border border-gray-300 px-4 py-2"><a href="#" className="text-blue-500 underline">Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


// Professional Bodies Component
export const ProfessionalBodies = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-8 text-center heading-premium">Professional Bodies</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/csi.png" alt="Computer Society of India Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">CSI</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">Computer Society of India</p>
          <p className="text-sm text-gray-600 mb-4">Department of Computer Engineering</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Second body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/sae.png" alt="Society of Automotive Engineers India Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">SAE</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">Society of Automotive Engineers India</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Third body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/ieee.png" alt="The Institute of Electrical and Electronics Engineers Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">IEEE</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">The Institute of Electrical and Electronics Engineers</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Fourth body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/iei.jpg" alt="The Institution of Engineers (India) Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">IE</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">The Institution of Engineers (India)</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Fifth body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/csi.png" alt="Computer Society of India Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">CSI</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">Computer Society of India</p>
          <p className="text-sm text-gray-600 mb-4">Department of Information Technology</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Sixth body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/ishrae.jpg" alt="The Indian Society of Heating, Refrigerating and Air Conditioning Engineers Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">ISHRAE</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">The Indian Society of Heating, Refrigerating and Air Conditioning Engineers</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Seventh body */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center mb-4">
            <img src="src/assets/imgs/iete2.jpg" alt="The Institution of Electronics and Telecommunication Engineers Logo" className="w-12 h-12 mr-4" />
            <p className="font-medium text-lg">IETE</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">The Institution of Electronics and Telecommunication Engineers</p>
          <div className="mt-auto">
            <button className="btn-primary w-full px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



// National Service Scheme Component
export const NSS = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <h1 className="text-3xl font-bold mb-6">National Service Scheme (NSS)</h1>
      
      {/* Introduction Section */}
      <p className="text-gray-700 mb-4">
        The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides opportunity to the student youth of Technical Institutions, Graduate & Post Graduate students at colleges and universities in India to take part in various government-led community service activities and programs. The sole aim of the NSS is to provide hands-on experience to young students in delivering community service.
      </p>
      <p className="text-gray-700 mb-4">
        Since its inception in 1969, the number of student participants has grown from 40,000 to over 3.8 million by March 2018. These students, from various universities, colleges, and institutions of higher learning, have volunteered to take part in numerous community service programs. The motto of the National Service Scheme is <strong>"NOT ME BUT YOU"</strong>.
      </p>
      <p className="text-gray-700 mb-4">
        The NSS unit of Fr. C. Rodrigues Institute of Technology has been active since the academic year 2019-2020, with a team of 50 student members under the Mumbai University.
      </p>

      {/* Aims and Objectives */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Aims and Objectives</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>Understand the community in which they work.</li>
        <li>Understand themselves in relation to their community.</li>
        <li>Identify the needs and problems of the community and involve themselves in the problem-solving process.</li>
        <li>Develop a sense of social and civic responsibility.</li>
        <li>Utilize their knowledge in finding practical solutions to individual and community problems.</li>
        <li>Develop competence required for group living and sharing of responsibilities.</li>
        <li>Gain skills in mobilizing community participation.</li>
        <li>Acquire leadership qualities and a democratic attitude.</li>
        <li>Develop capacity to meet emergencies and natural disasters.</li>
        <li>Practice national integration and social harmony.</li>
      </ul>

      {/* Activities */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">NSS Activities</h2>
      <p className="text-gray-700 mb-4">
        The college NSS unit has conducted various activities, including participation in a university-level peace march on the occasion of the 150th birth anniversary of Mahatma Gandhi and a pledge on National Unity Day, among others.
      </p>

      {/* Program Officers */}
      <h2 className="text-2xl font-semibold  mt-8 mb-4">Program Officers</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>Mr. Rahul Jadhav</li>
        <li>Mrs. Dhanashree Hadsul</li>
      </ul>

      {/* Activity Reports */}
      <h2 className="text-2xl font-semibold  mt-8 mb-4">Activity Reports</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">Academic Year</th>
            <th className="border border-gray-300 px-4 py-2">Activity Report</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["2021-22", "Activity Report"],
            ["2020-21", "Activity Report"],
            ["2019-20", "Activity Report / Special Camp Report"],
          ].map(([year, report], index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="border border-gray-300 px-4 py-2">{year}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href="#" className="text-blue-500 underline">{report}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// Student Clubs Component
export const StudentClubs = () => {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-black mb-8 text-center heading-premium">Student Clubs</h2>


        <div className="space-y-6">
          {/* Agnel Robotics Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/agnels-robotic-club.png" alt="Agnel Robotics Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">Agnel Robotics Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* Agnel Sports Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/sports-club.jpeg" alt="Agnel Sports Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">Agnel Sports Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* Drama Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/drama-club.jpeg" alt="Drama Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">Drama Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* AI and Deep Learning Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/artificial-intelligence-and-deep-learning-club.jpeg" alt="AI and Deep Learning Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">AI and Deep Learning Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* Music Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/music-club.jpeg" alt="Music Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">Music Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* College Magazine */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/college-magazine.jpeg" alt="College Magazine Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">College Magazine</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>

          {/* Coders' Club */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            <div className="flex items-center space-x-4">
              <img src="src/assets/imgs/coders-club.jpeg" alt="Coders' Club Logo" className="w-16 h-16 rounded-full" />
              <p className="text-lg font-medium">Coders' Club</p>
            </div>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-lg">
              Read More
            </button>
          </div>
        </div>
    </>
  );
};



// Infrastructure Component
export const Infrastructure = () => {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-black mb-12 text-center heading-premium">Infrastructure</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Library */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/library.jpg" alt="Library" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Library</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Gymnasium */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/gymnasium.jpg" alt="Gymnasium" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Gymnasium</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Boys and Girls Hostel */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/hostel.jpg" alt="Boys and Girls Hostel" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Boys and Girls Hostel</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Swimming Pool */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/swimming-pool.jpg" alt="Swimming Pool" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Swimming Pool</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Medical Centre */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/medical-centre.jpeg" alt="Medical Centre" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Medical Centre</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Meditation Centre */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/meditation-centre.jpg" alt="Meditation Centre" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Meditation Centre</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Basketball Court */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/basketball-court.jpg" alt="Basketball Court" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Basketball Court</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Football Turf */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/football-turf.jpg" alt="Football Turf" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Football Turf</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Badminton Gurukul */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/badminton-gurukul.jpg" alt="Badminton Gurukul" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Badminton Gurukul</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>

        {/* Canteen */}
        <div className="relative group h-72 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img src="src/assets/imgs/canteen.jpg" alt="Canteen" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <p className="text-2xl font-bold mb-4">Canteen</p>
            <button className="btn-primary px-6 py-2 rounded-lg shadow-md">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};





// Cultural Activities Component
export const CulturalActivities = () => {
  return (
    <>
      <p className="text-2xl font-bold mb-4">No content yet
      </p>
    </>
  );
};

// Anti Ragging Component
export const AntiRagging = () => {
  return (
    <>
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-red-600 mb-6">Anti Ragging</h1>
      
      {/* Content Section */}
      <p className="text-gray-700 mb-4">
        This is for the information of the students of FCRIT, Vashi that 
        <strong> "Ragging is a cognizable offense and is banned in any form inside and outside the campus".</strong>
      </p>
      <p className="text-gray-700 mb-4">
        In order to ensure that ragging does not take place in the institute in any form, the institute has constituted an 
        <strong> Anti-Ragging Committee</strong>, which would conduct raids, detect cases (if any), and suggest preventive measures.
      </p>
      <p className="text-gray-700 mb-4">
        Any student becoming a victim of ragging should immediately inform the members of the Anti-Ragging Committee.
      </p>

      {/* Call to Action */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Contact the Anti-Ragging Committee</h2>
        <p className="text-gray-700">
          Please report any cases or concerns to ensure a safe and secure environment for all students.
        </p>
      </div>
    </>
  );
};

// Student Satisfaction Survey Component
export const Survey = () => {
  return (
    <>
      <p className="text-2xl font-bold mb-4">No content yet
      </p>
    </>
  );
};




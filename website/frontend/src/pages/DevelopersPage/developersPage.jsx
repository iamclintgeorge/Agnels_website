import React from "react";
import { FaShare, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Developers = () => {
  // Developer profiles data
  const developers = {
    principal: {
      name: "Dr. S. M Khot",
      role: "Principal",
      image: "/src/assets/imgs/developers page/principal.jpeg",
    },
    leadDevelopers: [
      {
        name: "Mr. Mrityunjay Ojha",
        department: "Department of Computer Engineering",
        image: "/src/assets/imgs/developers page/mritunjay.jpg",
        position: "Asst. Professor",
      },
    ],
    teamMembers: [
      // 2025-2026 Student Contributors (9 members) - Full data - Reordered
      {
        name: "Anuj Kadu",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Anuj.jpg",
        linkedin: "https://www.linkedin.com/in/anuj-kadu-b3050431a",
        github: "https://github.com/anujkadu",
        department: "Department of Computer Engineering",
      },
      {
        name: "Anushka Dalvi",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Anushka.jpg",
        linkedin: "https://www.linkedin.com/in/anushka-dalvi-18a906248/",
        github: "https://github.com/DalviAnushka",
        department: "Department of Computer Engineering",
      },
      {
        name: "Clint George",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Clint.jpg",
        linkedin: "https://www.linkedin.com/in/clint-george-749267157/",
        github: "https://github.com/iamclintgeorge",
        department: "Department of Computer Engineering",
      },
      {
        name: "Joel Matthew",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Joel.jpg",
        linkedin: "http://www.linkedin.com/in/joel-mathew-job-031220286",
        github: "https://github.com/JoelMathewJob",
        department: "Department of Computer Engineering",
      },
      {
        name: "Joshua Koshy",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Joshua.jpg",
        linkedin: "https://www.linkedin.com/in/joshua-vinu-koshy-8328b7287/",
        github: "https://github.com/Joshua16vinu",
        department: "Department of Computer Engineering",
      },
      {
        name: "Luziana Dmello",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Luziana.jpg",
        linkedin: "https://www.linkedin.com/in/luziana-d-mello-262bb6307",
        github: "https://github.com/creativeluziana",
        department: "Department of Computer Engineering",
      },
      {
        name: "Leonardo Dsouza",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Leonardo.jpg",
        linkedin:
          "https://www.linkedin.com/in/leonardo-d-souza-035709241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "https://github.com/leothedev0705",
        department: "Department of Computer Engineering",
      },
      {
        name: "Mustansir Bhagat",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Mustansir.jpg",
        linkedin: "https://www.linkedin.com/in/mustansir-bhagat/",
        github: "https://github.com/UnagiCodezz",
        department: "Department of Computer Engineering",
      },
      {
        name: "Tanmay Chavan",
        position: "Student Contributor",
        image: "/src/assets/imgs/developers page/Tanmay.jpg",
        linkedin: "http://www.linkedin.com/in/tanmay-chavan-2832432b7",
        github: "https://github.com/tanmaychavan14",
        department: "Department of Computer Engineering",
      },
      // 2019-2020 Student Contributors (14 members, 7 per column) - Names only - Reordered
      {
        name: "Benedict William Raj",
      },
      {
        name: "Harman Rayat",
      },
      {
        name: "Hingis Martin",
      },
      {
        name: "Joseph Blessingh",
      },
      {
        name: "Mubasshir Pawle",
      },
      {
        name: "Nirmal Babu",
      },
      {
        name: "Nitin Tiwari",
      },
      {
        name: "Paresh Pandit",
      },
      {
        name: "Prateesh R K",
      },
      {
        name: "Rony Benny",
      },
      {
        name: "Shruthi Nair",
      },
      {
        name: "Swapnil Shinde",
      },
      {
        name: "Tanvi Rajadhyaksha",
      },
      {
        name: "Vikas Tripathi",
      },
    ],
  };

  // Function to render developer card
  const DeveloperCard = ({
    name,
    department,
    position,
    affiliation,
    image,
    size = "small",
    isPrincipal = false,
    linkedin = null,
    github = null,
    imageFit = "cover",
  }) => {
    const sizeClasses = {
      medium: "w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52",
      small: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44",
    };

    const textClasses = {
      medium: "text-base md:text-lg lg:text-xl mt-2 md:mt-3",
      small: "text-xs sm:text-sm mt-1 md:mt-2",
    };

    // Determine border color based on whether it's the principal or not
    const borderColor = isPrincipal ? "border-[#AE9142]" : "border-[#0C2340]";

    return (
      <div className="flex flex-col items-center">
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 ${borderColor} shadow-md`}
        >
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-${imageFit}`}
          />
        </div>
        {/* Display name and department inline for small cards, block for medium/large */}
        <h4
          className={`text-center font-medium ${
            size === "small" ? textClasses.small : textClasses.medium
          }`}
        >
          {" "}
          {/* Simplified text size class logic */}
          {name}
        </h4>
        {department && (
          // Display department on a new line below the name
          <p className="text-xs text-gray-600 text-center font-normal mt-0">
            {" "}
            {/* Removed mt-1 for closer spacing, added font-normal */}
            {department}
          </p>
        )}

        {size === "medium" && position && (
          <p className="text-xs text-gray-600 text-center mt-1 px-1">
            {position}
          </p>
        )}
        {size === "medium" && affiliation && (
          <p className="text-xs text-gray-600 text-center px-1">
            {affiliation}
          </p>
        )}

        {/* Social media icons for non-principal members with links */}
        {(linkedin || github) && !isPrincipal && (
          <div className="flex gap-2 mt-2 items-center justify-center">
            {" "}
            {/* Use mt-2 for spacing and center */}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-600 cursor-pointer" />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-600 cursor-pointer" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  // Extract only the 2025-2026 team members (first 9 from the updated array)
  const currentTeamMembers = developers.teamMembers.slice(0, 9);

  // Extract the 2019-2020 team members (from index 9 onwards)
  const teamMembers2019 = developers.teamMembers.slice(9);

  // Data for 2019-2020 Mentors
  const mentors2019 = [
    {
      name: "Mr. Mrityunjay Ojha",
      department: "Department of Computer Engineering",
      position: "Asst. Professor",
      // You might want to include other relevant fields here if needed for display
    },
    {
      name: "Mr. Suraj Khandare",
      department: "Department of Computer Science and Engineering (Prev. IT)",
      position: "Asst. Professor",
      // You might want to include other relevant fields here if needed for display
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Page header */}
      <div className="container mx-auto px-4 py-6"></div>

      <div className="relative">
        {/* Responsive Timeline line */}
        <div className="absolute left-10 md:left-[215px] top-0 bottom-0 w-0.5 bg-[#0C2340]"></div>

        {/* Timeline content container */}
        <div className="container mx-auto">
          {/* Principal above timeline */}
          <div className="md:ml-[240px] pl-10 flex flex-col items-center mb-16">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <DeveloperCard
                  name={developers.principal.name}
                  department={developers.principal.role}
                  image={developers.principal.image}
                  size="medium"
                  isPrincipal={true}
                />
              </div>
            </div>
          </div>

          {/* 2025-2026 Section */}
          <div className="relative mb-16 md:mb-24">
            <div className="flex items-center mb-10 md:mb-16">
              <div className="w-6 h-6 bg-[#0C2340] rounded-full absolute left-10 md:left-[205px] -translate-x-1/2 z-10"></div>
              {/* Responsive heading alignment for timeline */}
              <h2 className="text-xl font-bold absolute left-[60px] md:static md:ml-[240px]">
                2025-2026
              </h2>{" "}
              {/* Position heading relative to dot */}
            </div>

            {/* Content container - shifted right of timeline */}
            <div className="md:ml-[240px] pl-10 flex flex-col items-center">
              {/* Lead Developers - Medium Circles (Row of 2) */}
              <div className="flex justify-center gap-16 md:gap-20 mb-12 md:mb-26">
                {" "}
                {/* Increased bottom margin */}
                {developers.leadDevelopers.map((dev, index) => (
                  <div
                    key={`lead-container-${index}`}
                    className="flex flex-col items-center"
                  >
                    {" "}
                    {/* Wrap with flex container */}
                    <DeveloperCard
                      key={`lead-${index}`}
                      name={dev.name}
                      department={dev.department}
                      position={dev.position}
                      image={dev.image}
                      size="medium"
                      linkedin={dev.linkedin}
                      github={dev.github}
                    />
                  </div>
                ))}
              </div>

              {/* Team Members in grid - flexible grid for 9 members */}
              <div className="mx-auto w-full">
                {/* Responsive flex layout for 2025-2026 students */}
                <div className="flex flex-wrap justify-center gap-10 mb-8 md:mb-12">
                  {currentTeamMembers.map((dev, devIndex) => {
                    // Determine imageFit for specific developers
                    const developerImageFit = "cover"; // Revert to default cover for all

                    return (
                      <div
                        key={`team-container-${devIndex}`}
                        className="flex flex-col items-center"
                      >
                        <DeveloperCard
                          key={`team-${devIndex}`}
                          name={dev.name}
                          department={dev.department}
                          image={dev.image}
                          linkedin={dev.linkedin}
                          github={dev.github}
                          imageFit={developerImageFit}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 2019-2020 Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-10 md:mb-16">
              <div className="w-6 h-6 bg-[#0C2340] rounded-full absolute left-10 md:left-[205px] -translate-x-1/2 z-10"></div>
              {/* Responsive heading alignment for timeline */}
              <h2 className="text-xl font-bold absolute left-[60px] md:static md:ml-[240px]">
                2019-2020
              </h2>{" "}
              {/* Position heading relative to dot */}
            </div>

            {/* Content container - shifted right of timeline */}
            {/* Added padding-left for small screens to align with timeline */}
            <div className="md:ml-[240px] pl-10 flex flex-col items-center">
              {/* 2019-2020 Mentors */}
              <h3 className="text-lg font-semibold mb-4 text-[#0C2340]">
                Mentors
              </h3>{" "}
              {/* Title for mentors */}
              {/* Display mentor names */}
              <div className="flex justify-center gap-8 mb-8">
                {" "}
                {/* Centered container with gap below names */}
                {mentors2019.map((dev, index) => (
                  <div
                    key={`mentor-info-${index}`}
                    className="text-center flex flex-col items-center"
                  >
                    {" "}
                    {/* Container for name, department, position - flex col for stacking */}
                    <p className="text-base font-medium">{dev.name}</p>{" "}
                    {/* Display only the name */}
                    {dev.department && (
                      <p className="text-sm text-gray-600 mt-0.5">
                        {dev.department}
                      </p> // Display department
                    )}
                    {dev.position && (
                      <p className="text-sm text-gray-600 mt-0.5">
                        {dev.position}
                      </p> // Display position
                    )}
                  </div>
                ))}
              </div>
              {/* 2019-2020 Student Contributors (Names only) */}
              <h3 className="text-lg font-semibold mb-4 text-[#0C2340]">
                Student Contributors
              </h3>{" "}
              {/* Title for students */}
              {/* Responsive grid layout for 2019-2020 students (names only) - 2 columns on small screens, centered */}
              {/* Reduced gap between columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 lg:gap-x-1 gap-y-2 w-full max-w-2xl mx-auto justify-items-center justify-center">
                {teamMembers2019.map((dev, index) => (
                  <div key={`student2019-${index}`} className="text-center">
                    {" "}
                    {/* Container for name */}{" "}
                    {/* Added text-center for name */}
                    <p className="text-sm font-medium">{dev.name}</p>{" "}
                    {/* Display only the name */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;

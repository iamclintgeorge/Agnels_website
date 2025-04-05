import React from "react";
import { FaShare, FaLinkedin, FaTwitter } from "react-icons/fa";

const Developers = () => {
  // Developer profiles data
  const developers = {
    principal: {
      name: "Dr. S. M Khot",
      role: "Principal",
      image: "/src/assets/imgs/principal.jpg"
    },
    leadDevelopers: [
      {
        name: "Mr. Mrityunjay Ojha",
        department: "Department of Computer Engineering",
        image: "/src/assets/imgs/mrityunjay.jpg",
        position: "Asst. Professor"
      },
      {
        name: "Mr. Suraj Khandare",
        department: "Department of Information Technology",
        image: "/src/assets/imgs/suraj.jpg",
        position: "Asst. Professor"
      }
    ],
    teamMembers: [
      // Row 1
      {
        name: "Hingis Martin",
        position: "Department of Computer Engineering (2016-2019)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Shruti Nair",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
   
      {
        name: "Joseph Blessingh",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Hingis Martin",
        position: "Department of Computer Engineering (2016-2019)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Shruti Nair",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
      // Row 2
      {
        name: "Joseph Blessingh",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Nirmal Babu",
        position: "Department of Computer Engineering(2015-2019)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
      {
        name: "Hingis Martin",
        position: "Department of Computer Engineering (2016-2019)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Shruti Nair",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
      {
        name: "Joseph Blessingh",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      // Row 3
      {
        name: "Nirmal Babu",
        position: "Department of Computer Engineering(2015-2019)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
      {
        name: "Hingis Martin",
        position: "Department of Computer Engineering (2016-2019)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Shruti Nair",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      },
      {
        name: "Joseph Blessingh",
        position: "Department of Computer Engineering (2016-2020)",
        image: "/src/assets/imgs/suraj.jpg"
      },
      {
        name: "Nirmal Babu",
        position: "Department of Computer Engineering(2015-2019)",
        image: "/src/assets/imgs/mrityunjay.jpg"
      }
    ]
  };

  // Function to render developer card
  const DeveloperCard = ({ name, department, position, affiliation, image, size = "small", isPrincipal = false }) => {
    const sizeClasses = {
      medium: "w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36",
      small: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
    };
    
    const textClasses = {
      medium: "text-base md:text-lg lg:text-xl mt-2 md:mt-3",
      small: "text-xs sm:text-sm mt-1 md:mt-2"
    };

    // Determine border color based on whether it's the principal or not
    const borderColor = isPrincipal ? "border-[#AE9142]" : "border-[#0C2340]";

    return (
      <div className="flex flex-col items-center">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 ${borderColor} shadow-md`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className={`text-center font-medium ${textClasses[size]}`}>{name}</h4>
        {department && <p className="text-xs text-gray-600 text-center mt-1">{department}</p>}
        {size === "medium" && position && <p className="text-xs text-gray-600 text-center mt-1 px-1">{position}</p>}
        {size === "medium" && affiliation && <p className="text-xs text-gray-600 text-center px-1">{affiliation}</p>}
      </div>
    );
  };

  // Create exactly 3 rows with 5 team members each
  const firstSection = developers.teamMembers.slice(0, 15);
  const secondSection = developers.teamMembers.slice(0, 15);
  
  const createRows = (members) => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(members.slice(i * 5, (i + 1) * 5));
    }
    return rows;
  };
  
  const firstSectionRows = createRows(firstSection);
  const secondSectionRows = createRows(secondSection);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Page header */}
      <div className="container mx-auto px-4 py-6"></div>
      
      <div className="relative">
        {/* Timeline line - fixed positioning to match screenshot */}
        <div className="absolute left-[215px] top-0 bottom-0 w-0.5 bg-[#0C2340]"></div>

        {/* Timeline content container */}
        <div className="container mx-auto">
          {/* Principal above timeline */}
          <div className="ml-[240px] flex flex-col items-center mb-16">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <DeveloperCard 
                  name={developers.principal.name} 
                  department={developers.principal.role} 
                  image={developers.principal.image} 
                  size="medium" 
                  isPrincipal={true}
                />
                {/* Social media icons */}
                <div className="flex gap-2 mt-2">
                  <FaShare className="text-gray-600 cursor-pointer" />
                  <FaLinkedin className="text-gray-600 cursor-pointer" />
                  <FaTwitter className="text-gray-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          
          {/* 2025-2026 Section */}
          <div className="relative mb-16 md:mb-24">
            <div className="flex items-center mb-10 md:mb-16">
              <div className="w-6 h-6 bg-[#0C2340] rounded-full absolute left-[215px] -translate-x-1/2 z-10"></div>
              <h2 className="text-xl font-bold ml-[240px]">2025-2026</h2>
            </div>

            {/* Content container - shifted right of timeline */}
            <div className="ml-[240px] flex flex-col items-center">
              {/* Lead Developers - Medium Circles (Row of 2) */}
              <div className="flex justify-center gap-16 md:gap-20 mb-8 md:mb-16">
                {developers.leadDevelopers.map((dev, index) => (
                  <DeveloperCard 
                    key={`lead-${index}`} 
                    name={dev.name} 
                    department={dev.department}
                    position={dev.position}
                    image={dev.image} 
                    size="medium" 
                  />
                ))}
              </div>

              {/* Team Members in grid - exactly 3 rows of 5 */}
              <div className="max-w-6xl mx-auto">
                {firstSectionRows.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="grid grid-cols-5 gap-4 mb-8 md:mb-12">
                    {row.map((dev, devIndex) => {
                      // Extract department from position (which contains year info)
                      const departmentMatch = dev.position ? dev.position.match(/(Department of [^(]+)/) : null;
                      const department = departmentMatch ? departmentMatch[1].trim() : dev.department || "";
                      
                      return (
                        <DeveloperCard 
                          key={`team-${rowIndex}-${devIndex}`} 
                          name={dev.name}
                          department={department}
                          image={dev.image} 
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2019-2020 Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-10 md:mb-16">
              <div className="w-6 h-6 bg-[#0C2340] rounded-full absolute left-[215px] -translate-x-1/2 z-10"></div>
              <h2 className="text-xl font-bold ml-[240px]">2019-2020</h2>
            </div>

            {/* Content container - shifted right of timeline */}
            <div className="ml-[240px] flex flex-col items-center">
              {/* Lead Developers - Medium Circles (Row of 2) */}
              <div className="flex justify-center gap-16 md:gap-20 mb-8 md:mb-16">
                {developers.leadDevelopers.map((dev, index) => (
                  <DeveloperCard 
                    key={`lead2-${index}`} 
                    name={dev.name} 
                    department={dev.department}
                    position={dev.position}
                    image={dev.image} 
                    size="medium" 
                  />
                ))}
              </div>

              {/* Team Members in grid - exactly 3 rows of 5 */}
              <div className="max-w-6xl mx-auto">
                {secondSectionRows.map((row, rowIndex) => (
                  <div key={`row2-${rowIndex}`} className="grid grid-cols-5 gap-4 mb-8 md:mb-12">
                    {row.map((dev, devIndex) => {
                      // Extract department from position (which contains year info)
                      const departmentMatch = dev.position ? dev.position.match(/(Department of [^(]+)/) : null;
                      const department = departmentMatch ? departmentMatch[1].trim() : dev.department || "";
                      
                      return (
                        <DeveloperCard 
                          key={`team2-${rowIndex}-${devIndex}`} 
                          name={dev.name}
                          department={department}
                          image={dev.image} 
                        />
                      );
                    })}
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
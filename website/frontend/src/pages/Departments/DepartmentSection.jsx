// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import { fetchDepartmentSectionContent } from "../../services/departmentService";

// // Department name mapping from URL to display name
// const DEPARTMENT_MAPPING = {
//   "computer-engineering": "Computer Engineering",
//   "mechanical-engineering": "Mechanical Engineering",
//   "electrical-engineering": "Electrical Engineering",
//   extc: "Electronics and Telecommunication Engineering",
//   it: "Computer Science and Engineering (Prev. IT)",
//   humanities: "Basic Science and Humanities",
// };

// // Section name mapping from URL to display name
// const SECTION_MAPPING = {
//   about: "About",
//   "head-of-department": "Head of Department",
//   "faculty-and-supporting-staff": "Faculty and Supporting Staff",
//   "committees-and-board-of-studies": "Committees and Board of Studies",
//   infrastructure: "Infrastructure",
//   activities: "Activities",
//   "student-association": "Student Association",
//   magazine: "Magazine",
//   syllabus: "Syllabus",
//   "result-analysis": "Result Analysis",
//   "time-table": "Time Table",
//   achievements: "Achievements",
//   "academic-calendar": "Academic Calendar",
//   "innovative-teaching-methods": "Innovative Teaching and Learning Methods",
//   "alumni-testimonials": "Alumni Testimonials",
//   publications: "Publications",
//   projects: "Projects",
// };

// const DepartmentSection = () => {
//   const { department, section } = useParams();
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const departmentName = DEPARTMENT_MAPPING[department];
//   const sectionName = SECTION_MAPPING[section];

//   // useEffect(() => {
//   //   const loadContent = async () => {
//   //     if (!departmentName || !sectionName) {
//   //       setError("Invalid department or section");
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     setLoading(true);
//   //     setError(null);
//   //     try {
//   //       console.log(`Loading content for ${departmentName} - ${sectionName}`);
//   //       const data = await fetchDepartmentSectionContent(
//   //         departmentName,
//   //         sectionName
//   //       );
//   //       setContent(data.Content || "<p>No content available.</p>");
//   //     } catch (err) {
//   //       console.error("Error loading section content:", err);
//   //       setError("Failed to load content");
//   //       setContent("<p>Error loading content. Please try again later.</p>");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   loadContent();
//   // }, [departmentName, sectionName]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <div className="bg-gray-100 text-[#0C2340] py-5 border-b-[0.5px] border-gray-400 pl-10 font-inter">
//           <h1 className="text-2xl font-semibold text-left pl-7 py-0">
//             {departmentName || "Department"} - {sectionName || "Section"}
//           </h1>
//           <p className="text-sm text-left pl-7 mt-1 font-normal">
//             Home / Departments / {departmentName} / {sectionName}
//           </p>
//         </div>
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-lg">Loading {sectionName}...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <div className="bg-gray-100 text-[#0C2340] py-5 border-b-[0.5px] border-gray-400 pl-10 font-inter">
//           <h1 className="text-2xl font-semibold text-left pl-7 py-0">Error</h1>
//           <p className="text-sm text-left pl-7 mt-1 font-normal">
//             Home / Departments / Error
//           </p>
//         </div>
//         <div className="text-red-500 text-center min-h-[400px] flex items-center justify-center">
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <div className="bg-gray-100 text-[#0C2340] py-5 border-b-[0.5px] border-gray-400 pl-10 font-inter">
//         <h1 className="text-2xl font-semibold text-left pl-7 py-0">
//           {departmentName} - {sectionName}
//         </h1>
//         <p className="text-sm text-left pl-7 mt-1 font-normal">
//           Home / Departments / {departmentName} / {sectionName}
//         </p>
//       </div>

//       {/* Content Section */}
//       <div className="container mx-auto px-6 py-8">
//         <div
//           dangerouslySetInnerHTML={{ __html: content }}
//           className="prose max-w-none bg-white p-6 rounded-lg shadow-sm"
//           style={{
//             whiteSpace: "pre-wrap",
//             fontFamily: "inherit",
//             lineHeight: "1.6",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DepartmentSection;

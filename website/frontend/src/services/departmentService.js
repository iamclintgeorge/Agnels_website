// import axios from "axios";

// const API_BASE_URL = "http://localhost:3663/api";

// // Correct Department ID mapping from admin frontend
// const DEPARTMENT_IDS = {
//   "Electronics and Telecommunication Engineering": 1,
//   "Computer Engineering": 2,
//   "Basic Science and Humanities": 3,
//   "Electrical Engineering": 4,
//   "Mechanical Engineering": 5,
//   "Computer Science and Engineering (Prev. IT)": 6,
//   Home: "general", // For general department home
// };

// const DEPT_API_SLUGS = {
//   "Computer Engineering": "computer-engineering",
//   "Mechanical Engineering": "mechanical-engineering",
//   "Electronics and Telecommunication Engineering":
//     "electronics-and-telecommunication-engineering",
//   "Electrical Engineering": "electrical-engineering",
//   "Computer Science and Engineering (Prev. IT)": "information-technology",
//   "Basic Science and Humanities": "basic-science-and-humanities",
// };

// // Department name to API mapping for home endpoints
// const DEPARTMENT_ENDPOINTS = {
//   "Computer Engineering": `${API_BASE_URL}/department/computer/home`,
//   "Mechanical Engineering": `${API_BASE_URL}/department/mechanical/home`,
//   "Electronics and Telecommunication Engineering": `${API_BASE_URL}/department/extc/home`,
//   "Electrical Engineering": `${API_BASE_URL}/department/electrical/home`,
//   "Computer Science and Engineering (Prev. IT)": `${API_BASE_URL}/department/cse/home`,
//   "Basic Science and Humanities": `${API_BASE_URL}/department/bsh/home`,
//   Home: `${API_BASE_URL}/department/home`, // General department home
// };

// // Section mapping for dept_text API
// const SECTION_MAPPINGS = {
//   About: "home", // About maps to home content
//   "Head of Department": "hod",
//   "Faculty and Supporting Staff": "staffs",
//   "Committees and Board of Studies": "committees",
//   Infrastructure: "infra",
//   Activities: "activities",
//   "Student Association": "association",
//   Magazine: "magazine",
//   Syllabus: "syllabus",
//   "Result Analysis": "result_analysis",
//   "Time Table": "timetable",
//   Achievements: "achievements",
//   "Academic Calendar": "academic_calendar",
//   "Innovative Teaching and Learning Methods": "innovative_teaching",
//   "Alumni Testimonials": "alumni_testimonials",
//   Publications: "publications",
//   Projects: "projects",
// };

// // HOD Desk department mapping (different from dept API)
// const HOD_DESK_MAPPING = {
//   "Computer Engineering": "computer",
//   "Mechanical Engineering": "mechanical",
//   "Electronics and Telecommunication Engineering": "extc",
//   "Electrical Engineering": "electrical",
//   "Computer Science and Engineering (Prev. IT)": "it",
//   "Basic Science and Humanities": "bsh",
// };

// export const fetchDepartmentContent = async (departmentName) => {
//   try {
//     const endpoint = DEPARTMENT_ENDPOINTS[departmentName];
//     if (!endpoint) {
//       throw new Error(`No endpoint found for department: ${departmentName}`);
//     }

//     const response = await axios.get(endpoint);

//     // Handle different response structures
//     if (
//       response.data &&
//       Array.isArray(response.data) &&
//       response.data.length > 0
//     ) {
//       return response.data[0];
//     } else if (response.data && response.data.Content) {
//       return response.data;
//     } else {
//       return { Content: "<p>No content available for this department.</p>" };
//     }
//   } catch (error) {
//     console.error(`Error fetching content for ${departmentName}:`, error);
//     return {
//       Content:
//         "<p>Error loading department content. Please try again later.</p>",
//     };
//   }
// };

// export const fetchHODContent = async (departmentName) => {
//   try {
//     const hodDeptName = HOD_DESK_MAPPING[departmentName];
//     if (!hodDeptName) {
//       throw new Error(`No HOD mapping found for department: ${departmentName}`);
//     }

//     console.log(
//       `Fetching HOD content for ${departmentName} using endpoint: /hod-desk/${hodDeptName}`
//     );
//     const endpoint = `${API_BASE_URL}/hod-desk/${hodDeptName}`;
//     const response = await axios.get(endpoint);

//     // Handle HOD response structure (similar to admin HOD files)
//     if (
//       response.data &&
//       Array.isArray(response.data) &&
//       response.data.length > 0
//     ) {
//       return response.data[0];
//     } else if (response.data && response.data.Content) {
//       return response.data;
//     } else {
//       return {
//         Content: "<p>No HOD content available for this department.</p>",
//       };
//     }
//   } catch (error) {
//     console.error(`Error fetching HOD content for ${departmentName}:`, error);
//     return {
//       Content: "<p>Error loading HOD content. Please try again later.</p>",
//     };
//   }
// };

// export const fetchDepartmentSectionContent = async (
//   departmentName,
//   sectionName
// ) => {
//   try {
//     const departmentId = DEPARTMENT_IDS[departmentName];
//     const sectionKey = SECTION_MAPPINGS[sectionName];

//     if (!departmentId) {
//       throw new Error(`Invalid department: ${departmentName}`);
//     }

//     console.log(
//       `Fetching content for ${departmentName} (ID: ${departmentId}) - Section: ${sectionName}`
//     );

//     // Special handling for "About" section - use department home content
//     if (sectionName === "About") {
//       console.log(
//         `Fetching About content for ${departmentName} from home endpoint...`
//       );
//       try {
//         const homeContent = await fetchDepartmentContent(departmentName);
//         if (homeContent && homeContent.Content) {
//           return homeContent;
//         }
//       } catch (homeError) {
//         console.log(
//           `No home content found for ${departmentName}, trying dept_text...`
//         );
//       }
//     }

//     // Special handling for "Head of Department" section - use HOD desk content
//     if (sectionName === "Head of Department") {
//       console.log(
//         `Fetching HOD content for ${departmentName} from hod-desk endpoint...`
//       );
//       try {
//         const hodContent = await fetchHODContent(departmentName);
//         if (hodContent && hodContent.Content) {
//           return hodContent;
//         }
//       } catch (hodError) {
//         console.log(
//           `No HOD content found for ${departmentName}, trying dept_text...`
//         );
//       }
//     }

//     // For other sections, try to get both text content and structured data
//     let combinedContent = "";
//     let hasContent = false;

//     // 1. Try to fetch text content first
//     if (sectionKey) {
//       try {
//         console.log(
//           `Trying dept_text endpoint: /dept/text/${departmentId}/${sectionKey}`
//         );
//         const textResponse = await axios.get(
//           `${API_BASE_URL}/dept/text/${departmentId}/${sectionKey}`
//         );
//         if (
//           textResponse.data &&
//           textResponse.data.success &&
//           textResponse.data.data &&
//           textResponse.data.data.content
//         ) {
//           combinedContent += textResponse.data.data.content;
//           hasContent = true;
//           console.log(`Found text content for ${sectionName}`);
//         }
//       } catch (textError) {
//         console.log(`No text content found for ${sectionName}`);
//       }
//     }

//     // 2. Try to fetch structured data
//     let endpoint = null;
//     let dataContent = "";

//     switch (sectionKey) {
//       case "activities":
//         endpoint = `${API_BASE_URL}/dept/activities/${departmentId}`;
//         break;
//       case "publications":
//         const publicationsdeptSlug = DEPT_API_SLUGS[departmentName];
//         if (publicationsdeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${publicationsdeptSlug}/publications`;
//         }
//         break;
//       case "magazine":
//         const magazinedeptSlug = DEPT_API_SLUGS[departmentName];
//         if (magazinedeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${magazinedeptSlug}/magazine`;
//         }
//         break;
//       case "achievements":
//         const achievementsdeptSlug = DEPT_API_SLUGS[departmentName];
//         if (achievementsdeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${achievementsdeptSlug}/achievements`;
//         }
//         break;
//       case "timetable":
//         const timetabledeptSlug = DEPT_API_SLUGS[departmentName];
//         if (timetabledeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${timetabledeptSlug}/time-table`;
//         }
//         break;
//       case "association":
//         const AssocdeptSlug = DEPT_API_SLUGS[departmentName];
//         if (AssocdeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${AssocdeptSlug}/association`;
//         }
//         break;
//       case "committees":
//         endpoint = `${API_BASE_URL}/dept/committees/${departmentId}`;
//         break;
//       case "academic_calendar":
//         endpoint = `${API_BASE_URL}/dept/academic-calendars/${departmentId}`;
//         break;
//       case "projects":
//         endpoint = `${API_BASE_URL}/dept/undergraduate-projects/${departmentId}`;
//         break;
//       case "innovative_teaching":
//         const innovative_teachingdeptSlug = DEPT_API_SLUGS[departmentName];
//         if (innovative_teachingdeptSlug) {
//           endpoint = `${API_BASE_URL}/department/${innovative_teachingdeptSlug}/innovative-teaching`;
//         }
//         break;
//       case "infra":
//         endpoint = `${API_BASE_URL}/infrastructure/department/${departmentId}`;
//         break;
//       case "staffs":
//         // Map department name to API format for faculty
//         const deptApiName = departmentName
//           .toLowerCase()
//           .replace(" engineering", "")
//           .replace("electronics and telecommunication", "extc")
//           .replace("Computer Science and Engineering (Prev. IT)", "cse")
//           .replace("basic science and humanities", "bsh")
//           .replace("computer", "computer")
//           .replace("mechanical", "mechanical")
//           .replace("electrical", "electrical")
//           .trim();
//         endpoint = `${API_BASE_URL}/faculty/department/${deptApiName}`;
//         break;
//     }

//     if (endpoint) {
//       try {
//         console.log(`Trying structured data endpoint: ${endpoint}`);
//         const dataResponse = await axios.get(endpoint);
//         if (
//           dataResponse.data &&
//           dataResponse.data.success &&
//           dataResponse.data.data &&
//           dataResponse.data.data.length > 0
//         ) {
//           dataContent = formatSpecialContent(
//             sectionName,
//             dataResponse.data.data
//           );
//           hasContent = true;
//           console.log(`Found structured data for ${sectionName}`);
//         } else if (
//           dataResponse.data &&
//           Array.isArray(dataResponse.data) &&
//           dataResponse.data.length > 0
//         ) {
//           dataContent = formatSpecialContent(sectionName, dataResponse.data);
//           hasContent = true;
//           console.log(`Found array data for ${sectionName}`);
//         }
//       } catch (apiError) {
//         console.log(
//           `No structured data found for ${sectionName}:`,
//           apiError.message
//         );
//       }
//     }

//     // 3. Combine text content and structured data
//     if (hasContent) {
//       if (combinedContent && dataContent) {
//         // Both text and data available
//         return { Content: combinedContent + "<br/><br/>" + dataContent };
//       } else if (combinedContent) {
//         // Only text content
//         return { Content: combinedContent };
//       } else if (dataContent) {
//         // Only structured data
//         return { Content: dataContent };
//       }
//     }

//     // Return default content if no data found
//     return {
//       Content: `<p>No content available for ${sectionName}. This section will be updated soon.</p>`,
//     };
//   } catch (error) {
//     console.error(
//       `Error fetching section content for ${departmentName} - ${sectionName}:`,
//       error
//     );
//     return { Content: "<p>Error loading content. Please try again later.</p>" };
//   }
// };

// // Format special content types for display
// const formatSpecialContent = (sectionName, data) => {
//   if (!data || data.length === 0) {
//     return `<p>No ${sectionName.toLowerCase()} data available.</p>`;
//   }

//   let content = "";

//   switch (sectionName) {
//     case "Publications":
//       content = '<div class="publications-list"><h3>Publications</h3>';
//       data.forEach((pub) => {
//         content += `<div class="publication-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Year: ${pub.year}</h4>
//           ${
//             pub.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${pub.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📄 View Publication</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Magazine":
//       content = '<div class="magazines-list"><h3>Magazines</h3>';
//       data.forEach((mag) => {
//         content += `<div class="magazine-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Year: ${mag.year}</h4>
//           ${
//             mag.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${mag.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📖 View Magazine</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Activities":
//       content = '<div class="activities-list"><h3>Department Activities</h3>';
//       data.forEach((activity) => {
//         content += `<div class="activity-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             activity.heading || "Activity"
//           }</h4>
//           ${
//             activity.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${activity.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📋 View Details</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Student Association":
//       content = '<div class="associations-list"><h3>Student Association</h3>';
//       data.forEach((assoc) => {
//         content += `<div class="association-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Year: ${
//             assoc.year
//           }</h4>
//           ${
//             assoc.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${assoc.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">👥 View Association Details</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Committees and Board of Studies":
//       content =
//         '<div class="committees-list"><h3>Committees and Board of Studies</h3>';
//       data.forEach((committee) => {
//         content += `<div class="committee-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             committee.type
//           } - Year: ${committee.year}</h4>
//           ${
//             committee.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${committee.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📋 View Committee Details</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Academic Calendar":
//       content =
//         '<div class="academic-calendars-list"><h3>Academic Calendar</h3>';
//       data.forEach((calendar) => {
//         content += `<div class="calendar-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             calendar.type
//           } Academic Calendar</h4>
//           ${
//             calendar.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${calendar.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📅 View Calendar</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Innovative Teaching and Learning Methods":
//       content =
//         '<div class="innovative-teaching-list"><h3>Innovative Teaching and Learning Methods</h3>';
//       data.forEach((method) => {
//         content += `<div class="innovative-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             method.title || method.heading || "Innovative Method"
//           }</h4>
//           ${
//             method.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${method.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">💡 View Method Details</a>`
//               : ""
//           }
//           ${
//             method.description
//               ? `<p style="margin: 10px 0; color: #666;">${method.description}</p>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Achievements":
//       content = '<div class="achievements-list"><h3>Achievements</h3>';
//       data.forEach((ach) => {
//         content += `<div class="achievement-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${ach.type} - Year: ${
//           ach.year
//         }</h4>
//           ${
//             ach.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${ach.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">🏆 View Achievement</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Time Table":
//       content = '<div class="timetables-list"><h3>Time Tables</h3>';
//       data.forEach((tt) => {
//         content += `<div class="timetable-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             tt.type
//           } - Semester ${tt.semester}</h4>
//           ${
//             tt.division
//               ? `<p style="margin: 5px 0; color: #666;">Division: ${tt.division}</p>`
//               : ""
//           }
//           ${
//             tt.attachment
//               ? `<a href="http://localhost:3663/cdn/department/${tt.attachment}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">📅 View Timetable</a>`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Faculty and Supporting Staff":
//       content = '<div class="faculty-list"><h3>Faculty & Supporting Staff</h3>';
//       data.forEach((faculty) => {
//         content += `<div class="faculty-item" style="margin-bottom: 20px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${faculty.name}</h4>
//           <p style="margin: 5px 0; color: #666;"><strong>Designation:</strong> ${
//             faculty.designation || "N/A"
//           }</p>
//           <p style="margin: 5px 0; color: #666;"><strong>Qualification:</strong> ${
//             faculty.qualification || "N/A"
//           }</p>
//           ${
//             faculty.email_address
//               ? `<p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${faculty.email_address}</p>`
//               : ""
//           }
//           ${
//             faculty.image
//               ? `<img src="http://localhost:3663/cdn/${faculty.image}" alt="${faculty.name}" style="max-width: 120px; height: auto; margin-top: 10px; border-radius: 4px;">`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Infrastructure":
//       content = '<div class="infrastructure-list"><h3>Infrastructure</h3>';
//       data.forEach((infra) => {
//         content += `<div class="infrastructure-item" style="margin-bottom: 20px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${infra.name}</h4>
//           <p style="margin: 10px 0; color: #666;">${
//             infra.description1 || "No description available."
//           }</p>
//           ${
//             infra.image
//               ? `<img src="http://localhost:3663/cdn/${infra.image}" alt="${infra.name}" style="max-width: 300px; height: auto; margin-top: 10px; border-radius: 4px;">`
//               : ""
//           }
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     case "Projects":
//       content = '<div class="projects-list"><h3>Projects</h3>';
//       data.forEach((project) => {
//         content += `<div class="project-item" style="margin-bottom: 15px; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; background: #f8f9fa;">
//           <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${
//             project.type || "Project"
//           }</h4>
//           <div style="margin: 10px 0; color: #666;">${
//             project.projects || "No project details available."
//           }</div>
//         </div>`;
//       });
//       content += "</div>";
//       break;

//     default:
//       content = `<p>Content for ${sectionName} is being updated. Please check back later.</p>`;
//   }

//   return content;
// };

// export const getAllDepartmentContent = async () => {
//   const departments = Object.keys(DEPARTMENT_ENDPOINTS);
//   const contentPromises = departments.map((dept) =>
//     fetchDepartmentContent(dept).then((content) => ({
//       department: dept,
//       content,
//     }))
//   );

//   try {
//     const results = await Promise.all(contentPromises);
//     return results.reduce((acc, { department, content }) => {
//       acc[department] = content;
//       return acc;
//     }, {});
//   } catch (error) {
//     console.error("Error fetching all department content:", error);
//     return {};
//   }
// };

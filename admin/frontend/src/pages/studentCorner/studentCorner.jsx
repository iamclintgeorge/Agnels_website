import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/useAuthCheck'; // Assuming useAuthCheck is in services
import FileUpload from '../../components/FileUpload'; // Assuming a reusable FileUpload component exists

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663'; // Adjust if your backend URL is different

// Define section structures to match website frontend
const sectionStructures = {
  "SC_Home": {
    title: "Student's Corner Home",
    description: "Configure the main headline and introductory text that appears on the Student's Corner landing page.",
    template: {
      heading: "Student's Corner",
      text1: "Welcome to the Student's Corner of SCET, the hub for all student-related activities and resources.",
      text2: "Find information about the Student Council, professional bodies, and more to enhance your academic journey.",
      buttonText: "Learn More"
    }
  },
  "Code of Conduct": {
    title: "Student Code of Conduct",
    description: "Upload and manage the official Student Code of Conduct document for the institute.",
    template: {
      documentUrl: ""
    }
  },
  "Student Council": {
    title: "Student Council",
    description: "Manage information about the Student Council, its members, and published reports.",
    template: {
      heading: "Student Council",
      description1: "The Student Council at SCET serves as the voice of the student body, organizing events and addressing student concerns.",
      description2: "Council members are elected annually and work closely with faculty to enhance campus life and academic experience.",
      membersHeading: "Council Members",
      members: [
        { name: "", post: "" }
      ],
      reportsHeading: "Annual Reports",
      reports: [
        { year: "", linkText: "Activity Report", url: "" }
      ]
    }
  },
  "Professional Bodies": {
    title: "Professional Bodies",
    description: "Manage the list of professional bodies associated with the institute and their details.",
    template: {
      heading: "Professional Bodies",
      bodies: [
        { 
          name: "", 
          acronym: "", 
          logo: "", 
          description: "", 
          department: "", 
          readMoreLink: "" 
        }
      ]
    }
  },
  "NSS": {
    title: "National Service Scheme (NSS)",
    description: "Update information about the NSS unit, objectives, activities, and program officers.",
    template: {
      heading: "National Service Scheme (NSS)",
      motto: "Not Me But You",
      introduction: "The National Service Scheme (NSS) is a public service program conducted by the Ministry of Youth Affairs and Sports, aimed at developing student personality through community service.",
      objectivesHeading: "Objectives of NSS",
      objectives: [
        "To understand the community in which they work",
        "To understand themselves in relation to their community",
        "To identify the needs and problems of the community and involve them in problem-solving",
        "To develop among themselves a sense of social and civic responsibility"
      ],
      activitiesHeading: "NSS Activities",
      activitiesText: "NSS volunteers work on various community service projects throughout the academic year including blood donation camps, cleanliness drives, and awareness campaigns.",
      officersHeading: "Program Officers",
      officers: [
        { name: "", designation: "", contact: "" }
      ],
      reportsHeading: "Activity Reports",
      reports: [
        { year: "", title: "", fileUrl: "" }
      ],
      galleryHeading: "Photo Gallery",
      galleryImages: []
    }
  },
  "Student Clubs": {
    title: "Student Clubs",
    description: "Manage the list of student clubs, their activities, and resources.",
    template: {
      heading: "Student Clubs",
      introduction: "Student clubs at SCET provide opportunities for students to explore their interests, develop leadership skills, and engage with peers sharing similar passions.",
      clubs: [
        { 
          name: "", 
          logo: "", 
          description: "", 
          coordinator: "", 
          activities: "", 
          readMoreLink: "" 
        }
      ]
    }
  },
  "Infrastructure": {
    title: "Infrastructure",
    description: "Manage information about campus infrastructure available to students.",
    template: {
      heading: "Campus Infrastructure",
      introduction: "SCET provides state-of-the-art infrastructure to support academic excellence and student development.",
      facilities: [
        {
          name: "",
          description: "",
          image: "",
          features: []
        }
      ]
    }
  },
  "Cultural Activities": {
    title: "Cultural Activities",
    description: "Update information about cultural events, festivals, and student performances.",
    template: {
      heading: "Cultural Activities",
      introduction: "Cultural activities at SCET provide students with opportunities to showcase their talents and celebrate diverse cultures.",
      upcomingEventsHeading: "Upcoming Events",
      upcomingEvents: [
        { name: "", date: "", venue: "", description: "", registrationLink: "" }
      ],
      pastEventsHeading: "Past Events",
      pastEvents: [
        { name: "", date: "", description: "", imagesGallery: [] }
      ],
      culturalTeamHeading: "Cultural Team",
      culturalTeam: [
        { name: "", role: "", contact: "" }
      ]
    }
  },
  "Anti Ragging": {
    title: "Anti-Ragging Policy",
    description: "Manage anti-ragging information, committee members, and resources.",
    template: {
      heading: "Anti-Ragging Committee",
      introduction: "SCET maintains a zero-tolerance policy towards ragging in any form.",
      contactInfo: "",
      committeeMembers: [
        { name: "", designation: "", contact: "" }
      ],
      resourceLinks: [
        { title: "", url: "", description: "" }
      ]
    }
  },
  "Student Satisfaction Survey": {
    title: "Student Satisfaction Survey",
    description: "Manage student survey information, links, and results.",
    template: {
      heading: "Student Satisfaction Survey",
      introduction: "The Student Satisfaction Survey helps us understand student experiences and identify areas for improvement.",
      currentSurveyHeading: "Current Survey",
      currentSurvey: {
        title: "",
        description: "",
        deadline: "",
        surveyLink: ""
      },
      pastSurveysHeading: "Past Surveys",
      pastSurveys: [
        { 
          year: "", 
          title: "", 
          participationRate: "", 
          keyFindings: "",
          reportUrl: "" 
        }
      ]
    }
  },
  "Training and Placement": {
    title: "Training & Placement",
    description: "Update information about the Training and Placement activities at the institute.",
    template: {
      heading: "Training & Placement Cell",
      introduction: "The Training and Placement Cell at SCET facilitates career opportunities for students.",
      highlights: [
        { title: "", content: "" }
      ],
      placementStatistics: {
        year: "",
        totalPlaced: "",
        topCompanies: []
      },
      contactInfo: ""
    }
  },
  "Examination": {
    title: "Examination Details",
    description: "Share important examination information, schedules, and resources.",
    template: {
      heading: "Examination",
      information: "",
      currentSchedule: { title: "", fileUrl: "" },
      pastPapers: [
        { subject: "", year: "", fileUrl: "" }
      ],
      announcements: [
        { date: "", title: "", content: "" }
      ]
    }
  }
};

// Preview Mode Component
const PreviewRenderer = ({ sectionKey, content }) => {
  if (!sectionKey || !content) return <p>No content to preview</p>;
  
  // Render a preview based on the section type
  switch (sectionKey) {
    case "SC_Home":
      return (
        <div className="preview-container bg-white rounded-lg shadow-md p-6">
          <div className="max-w-3xl mx-auto text-center py-8">
            <h1 className="text-3xl font-bold text-[#0C2340] mb-6">{content.heading || "Student's Corner"}</h1>
            <p className="text-lg text-gray-600 mb-4">{content.text1 || ""}</p>
            <p className="text-lg text-gray-600 mb-6">{content.text2 || ""}</p>
            {content.buttonText && (
              <button className="px-6 py-2 bg-[#0C2340] text-white rounded-md hover:bg-opacity-90 transition-colors">
                {content.buttonText}
              </button>
            )}
          </div>
        </div>
      );
    
    case "Student Council":
      return (
        <div className="preview-container bg-white rounded-lg shadow-md p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#0C2340] mb-4">{content.heading || "Student Council"}</h1>
            
            <div className="prose max-w-none mb-8">
              <p className="mb-4">{content.description1 || ""}</p>
              <p>{content.description2 || ""}</p>
            </div>
            
            {content.members && content.members.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#0C2340] mb-4 pb-2 border-b">
                  {content.membersHeading || "Council Members"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {content.members.map((member, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                      <p className="font-semibold text-[#0C2340]">{member.name || "Member Name"}</p>
                      <p className="text-gray-600 text-sm">{member.post || "Position"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {content.reports && content.reports.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#0C2340] mb-4 pb-2 border-b">
                  {content.reportsHeading || "Reports"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {content.reports.map((report, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg border">
                      <div className="p-2 bg-[#0C2340] text-white rounded mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{report.year || "Academic Year"}</p>
                        {report.url ? (
                          <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            {report.linkText || "Download Report"}
                          </a>
                        ) : (
                          <p className="text-gray-500 text-sm">{report.linkText || "Report Link"} (No URL)</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    
    case "Professional Bodies":
      return (
        <div className="preview-container bg-white rounded-lg shadow-md p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#0C2340] mb-6">{content.heading || "Professional Bodies"}</h1>
            
            {content.bodies && content.bodies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {content.bodies.map((body, idx) => (
                  <div key={idx} className="flex border rounded-lg overflow-hidden shadow-sm">
                    <div className="w-1/3 bg-gray-50 p-4 flex items-center justify-center">
                      {body.logo ? (
                        <img src={body.logo} alt={body.acronym} className="max-h-20 max-w-full object-contain" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-semibold text-[#0C2340] mb-1">
                        {body.acronym ? `${body.acronym} - ` : ""}{body.name || "Professional Body"}
                      </h3>
                      {body.department && (
                        <p className="text-sm text-gray-500 mb-2">{body.department}</p>
                      )}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{body.description || ""}</p>
                      {body.readMoreLink && (
                        <a href={body.readMoreLink} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline text-sm">
                          Read More →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No professional bodies added yet.</p>
            )}
          </div>
        </div>
      );
      
    case "Code of Conduct":
      return (
        <div className="preview-container bg-white rounded-lg shadow-md p-6">
          <div className="max-w-3xl mx-auto text-center py-6">
            <h1 className="text-2xl font-bold text-[#0C2340] mb-4">Student Code of Conduct</h1>
            
            <div className="bg-gray-50 p-6 rounded-lg border mb-6 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              
              <h2 className="text-lg font-medium mb-3">Student Code of Conduct Document</h2>
              
              {content.documentUrl ? (
                <Fragment>
                  <p className="text-gray-600 mb-4">Click the button below to download the full Code of Conduct document.</p>
                  <a 
                    href={content.documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#0C2340] text-white rounded-md hover:bg-opacity-90 transition-colors inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </a>
                </Fragment>
              ) : (
                <p className="text-gray-500">No document has been uploaded yet.</p>
              )}
            </div>
            
            <p className="text-gray-600">
              All students are required to adhere to the Code of Conduct. Please download and review it carefully.
            </p>
          </div>
        </div>
      );
    
    default:
      return <p className="text-gray-500 p-4 bg-gray-100 rounded">Preview not available for {sectionKey}</p>;
  }
};

const StudentCornerAdmin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editContent, setEditContent] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for section data
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileUploading, setFileUploading] = useState({});
  const [imageUploading, setImageUploading] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Modified useEffect to listen for section selection events
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllSections();
    }
  }, [isAuthenticated]);

  // New useEffect to listen for studentcorner-section-selected event
  useEffect(() => {
    const handleSectionEvent = (event) => {
      console.log("Received student corner section selection event:", event.detail.section);
      if (event.detail && event.detail.section) {
        handleSectionSelect(event.detail.section);
      }
    };
    
    window.addEventListener('studentcorner-section-selected', handleSectionEvent);
    
    // Check localStorage on initial mount
    const savedSection = localStorage.getItem('studentCornerSection');
    if (savedSection && sectionStructures[savedSection]) {
      console.log("Loading section from localStorage:", savedSection);
      handleSectionSelect(savedSection);
      // Clear the selection so it doesn't persist unnecessarily
      localStorage.removeItem('studentCornerSection');
    }
    
    return () => {
      window.removeEventListener('studentcorner-section-selected', handleSectionEvent);
    };
  }, []);

  const fetchAllSections = async () => {
    setLoading(true);
    setStatus('');
    try {
      // TODO: Adjust endpoint when backend route is created
      const response = await axios.get('/api/studentcorner'); // Assuming a GET endpoint for all sections
      // Process the response: create a map or directly use the array
      const fetchedSections = response.data || []; // Assuming response is an array of { sectionKey, content }
      
      // Initialize sections state (e.g., just the keys for the selection list)
      setSections(Object.keys(sectionStructures)); 

      // Pre-fill editContent with fetched data if needed, or handle it in handleSectionSelect
      // For simplicity, we'll fetch individual section data when selected

      setLoading(false);
    } catch (error) {
      console.error("Error fetching student corner sections:", error);
      setStatus(`Error fetching sections: ${error.response?.data?.error || error.message}`);
      setLoading(false);
    }
  };

  // Helper to initialize section with template data
  const initializeSectionWithTemplate = (sectionKey) => {
    const template = sectionStructures[sectionKey]?.template || {};
    return JSON.parse(JSON.stringify(template)); // Deep clone to avoid reference issues
  };

  // Modified fetchSpecificSection to use templates
  const fetchSpecificSection = async (sectionKey) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/studentcorner/${sectionKey}`);
      
      // Initialize with template structure if available
      const templateData = initializeSectionWithTemplate(sectionKey);
      
      // Merge fetched data with template
      const fetchedContent = response.data.content || {};
      const mergedContent = { ...templateData, ...fetchedContent };
      
      setEditContent(mergedContent);
      setStatus('');
    } catch (error) {
      console.error('Error fetching section:', error);
      
      // Use template as fallback
      setEditContent(initializeSectionWithTemplate(sectionKey));
      setStatus(`Error: Failed to load ${sectionKey} content. Using default template.`);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced handle section select with template support
  const handleSectionSelect = async (sectionKey) => {
    setSelectedSection(sectionKey);
    setStatus('');
    setImageUploading({});
    setFileUploading({});
    setEditContent({}); // Clear previous content
    setUploadedFiles({}); // Clear previous upload info
    
    // Fetch content with template fallback
    await fetchSpecificSection(sectionKey);
  };

  // Utility for deep merging objects (needed for default structure fallback)
  const deepMerge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else if (Array.isArray(source[key])) {
           // If source[key] is an array and target[key] is not, or source array is not empty
           // prioritize source array content. Handle array merging logic specifically if needed.
           if (!Array.isArray(target[key]) || source[key].length > 0) {
             output[key] = [...source[key]]; 
           } else {
             // Keep target array if source is empty and target exists
             output[key] = target[key];
           }
        }
         else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };

  const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
  };

  // Handle content changes in the form
  const handleContentChange = (field, index = null, value, subField = null) => {
    setEditContent(prev => {
      const newContent = { ...prev };
      if (index !== null && subField !== null && Array.isArray(newContent[field])) {
        // Handle changes within an array of objects (e.g., members, reports, clubs)
        const updatedArray = [...newContent[field]];
        if (updatedArray[index]) {
          updatedArray[index] = { ...updatedArray[index], [subField]: value };
          newContent[field] = updatedArray;
        }
      } else if (index !== null && Array.isArray(newContent[field])) {
         // Handle changes within an array of strings (e.g., objectives)
         const updatedArray = [...newContent[field]];
         if(updatedArray[index] !== undefined) {
            updatedArray[index] = value;
            newContent[field] = updatedArray;
         }
      }
       else {
        // Handle changes for simple fields
        newContent[field] = value;
      }
      return newContent;
    });
  };

  // Handle adding items to arrays (e.g., members, reports, clubs, objectives)
  const handleAddItem = (field, itemStructure) => {
    setEditContent(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), { ...itemStructure }] // Add a new item based on structure
    }));
  };

   // Handle adding simple string items to arrays (e.g., objectives)
  const handleAddStringItem = (field) => {
    setEditContent(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), ""] // Add a new empty string
    }));
  };

  // Handle removing items from arrays
  const handleRemoveItem = (field, index) => {
    setEditContent(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle file upload success
  const handleFileUploadSuccess = (sectionKey, field, url, fileName) => {
     handleContentChange(field, null, url); // Update the content field with the URL
     setUploadedFiles(prev => ({ ...prev, [sectionKey]: { name: fileName, url: url } }));
     setFileUploading(prev => ({ ...prev, [`${sectionKey}-${field}`]: false }));
  };
  
  // Handle image upload success (similar to file, maybe different state)
  const handleImageUploadSuccess = (sectionKey, field, url, fileName, index = null, subField = null) => {
    if (index !== null && subField !== null) {
      // Image within an array item (e.g., club logo, facility image)
      handleContentChange(field, index, url, subField); 
      // Store uploaded image info specific to the item if needed
      setUploadedImages(prev => ({ ...prev, [`${sectionKey}-${field}-${index}-${subField}`]: { name: fileName, url: url } })); 
    } else {
      // Image for a top-level field
      handleContentChange(field, null, url);
      setUploadedImages(prev => ({ ...prev, [`${sectionKey}-${field}`]: { name: fileName, url: url } }));
    }
    setImageUploading(prev => ({ ...prev, [`${sectionKey}-${field}${index !== null ? `-${index}-${subField}` : ''}`]: false }));
  };
  
  // Handle file/image upload initiation
  const handleUploadInitiation = (sectionKey, field, isImage = false, index = null, subField = null) => {
     if (isImage) {
        setImageUploading(prev => ({ ...prev, [`${sectionKey}-${field}${index !== null ? `-${index}-${subField}` : ''}`]: true }));
     } else {
        setFileUploading(prev => ({ ...prev, [`${sectionKey}-${field}`]: true }));
     }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedSection) return;
    setLoading(true);
    setStatus('Saving...');
    try {
      // TODO: Adjust endpoint when backend route is created
      await axios.put(`/api/studentcorner/${selectedSection}`, { content: editContent }); // Assuming PUT endpoint to update section
      setStatus('Changes saved successfully!');
      setLoading(false);
      // Optionally refetch all sections or just update local state
      // fetchAllSections(); // To reflect changes immediately if needed
    } catch (error) {
      console.error(`Error saving content for ${selectedSection}:`, error);
      setStatus(`Error saving changes: ${error.response?.data?.error || error.message}`);
      setLoading(false);
    }
  };

  // --- Render Functions for Different Section Forms ---

  const renderEditForm = () => {
    if (!selectedSection || !editContent) return <p>Select a section to edit.</p>;

    const structure = sectionStructures[selectedSection];
    if (!structure) return <p>Configuration error for this section.</p>;

    switch (selectedSection) {
      case "SC_Home":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
             <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
             
             <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
               <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
               <p className="text-sm text-gray-600">This section appears at the top of the Student's Corner page. The heading and introduction text set the tone for the section, while the button links to more information.</p>
             </div>
             
             <div>
                <label className="block text-sm font-medium mb-1">Heading</label>
                <input
                  type="text"
                  value={editContent.heading || ""}
                  onChange={(e) => handleContentChange('heading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Main heading (e.g., Student's Corner)"
                />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Introductory Text 1</label>
                <textarea
                  value={editContent.text1 || ""}
                  onChange={(e) => handleContentChange('text1', null, e.target.value)}
                  className="w-full p-2 border rounded min-h-[100px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="First paragraph of introduction..."
                />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Introductory Text 2</label>
                <textarea
                  value={editContent.text2 || ""}
                  onChange={(e) => handleContentChange('text2', null, e.target.value)}
                  className="w-full p-2 border rounded min-h-[100px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                   placeholder="Second paragraph of introduction..."
                />
             </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input
                  type="text"
                  value={editContent.buttonText || ""}
                  onChange={(e) => handleContentChange('buttonText', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Text for the 'Learn More' button"
                />
             </div>
          </div>
        );

      case "Code of Conduct":
        return (
           <div>
             <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
             <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
             
             <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
               <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
               <p className="text-sm text-gray-600">Upload the official PDF document containing the Student Code of Conduct. This will be available for download on the website.</p>
             </div>
             
             <FileUpload
               sectionKey={selectedSection}
               fieldKey="documentUrl"
               currentUrl={editContent.documentUrl}
               onUploadSuccess={handleFileUploadSuccess}
               onUploadStart={() => handleUploadInitiation(selectedSection, "documentUrl")}
               isUploading={fileUploading[`${selectedSection}-documentUrl`]}
               allowedTypes={['application/pdf']}
               label="Upload Code of Conduct PDF"
               uploadPath="uploads/studentcorner/docs" // Adjust backend upload path as needed
               className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#0C2340] transition-colors"
             />
             {editContent.documentUrl && (
               <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                 <p className="text-sm font-medium text-green-800">Current Document:</p>
                 <div className="flex items-center mt-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                   <a href={editContent.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all flex-1">
                     {uploadedFiles[selectedSection]?.name || editContent.documentUrl.split('/').pop() || "Code of Conduct PDF"}
                   </a>
                   <button
                     onClick={() => {
                         handleContentChange('documentUrl', null, '');
                         setUploadedFiles(prev => { const newState = {...prev}; delete newState[selectedSection]; return newState; });
                     }}
                     className="ml-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                   >
                     Remove
                   </button>
                 </div>
               </div>
             )}
           </div>
        );

      case "Student Council":
        return (
           <div className="space-y-6">
               <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
               <p className="text-sm text-gray-600 mb-4">{structure.description}</p>

               <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
                 <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
                 <p className="text-sm text-gray-600">This section displays information about the Student Council, its members and their roles, as well as annual reports. The layout on the website shows the description text followed by council members and reports in separate sections.</p>
               </div>

               {/* General Info */}
               <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                 <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-medium mb-1">Heading</label>
                       <input type="text" value={editContent.heading || ""} onChange={(e) => handleContentChange('heading', null, e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/>
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Description Paragraph 1</label>
                       <textarea value={editContent.description1 || ""} onChange={(e) => handleContentChange('description1', null, e.target.value)} className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/>
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Description Paragraph 2</label>
                       <textarea value={editContent.description2 || ""} onChange={(e) => handleContentChange('description2', null, e.target.value)} className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/>
                    </div>
                 </div>
               </div>

               {/* Council Members */}
               <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                   <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                     </svg>
                     {editContent.membersHeading || "Council Members"}
                   </h4>
                   
                   <div className="mb-4">
                     <label className="block text-sm font-medium mb-1">Section Heading</label>
                     <input 
                       type="text" 
                       value={editContent.membersHeading || "Council Members"} 
                       onChange={(e) => handleContentChange('membersHeading', null, e.target.value)} 
                       className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                       placeholder="Heading for members section"
                     />
                   </div>
                   
                   <div className="space-y-4">
                     {(editContent.members || []).map((member, index) => (
                         <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                           <div className="flex justify-between items-center mb-2">
                             <h5 className="font-medium">Member #{index + 1}</h5>
                             <button 
                               onClick={() => handleRemoveItem('members', index)} 
                               className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                               title="Remove this member"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                               </svg>
                             </button>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-xs text-gray-500 mb-1">Name</label>
                               <input 
                                 type="text" 
                                 value={member.name} 
                                 placeholder="Full Name" 
                                 onChange={(e) => handleContentChange('members', index, e.target.value, 'name')} 
                                 className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                               />
                             </div>
                             <div>
                               <label className="block text-xs text-gray-500 mb-1">Position</label>
                               <input 
                                 type="text" 
                                 value={member.post} 
                                 placeholder="e.g., President, Secretary" 
                                 onChange={(e) => handleContentChange('members', index, e.target.value, 'post')} 
                                 className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                               />
                             </div>
                           </div>
                         </div>
                     ))}
                     
                     <button 
                       onClick={() => handleAddItem('members', { name: '', post: '' })} 
                       className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                       </svg>
                       Add Council Member
                     </button>
                   </div>
               </div>

               {/* Reports */}
               <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                 <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                   {editContent.reportsHeading || "Reports"}
                 </h4>
                 
                 <div className="mb-4">
                   <label className="block text-sm font-medium mb-1">Section Heading</label>
                   <input 
                     type="text" 
                     value={editContent.reportsHeading || "Reports"} 
                     onChange={(e) => handleContentChange('reportsHeading', null, e.target.value)} 
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                     placeholder="Heading for reports section"
                   />
                 </div>
                 
                 <div className="space-y-4">
                    {(editContent.reports || []).map((report, index) => (
                        <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Report #{index + 1}</h5>
                            <button 
                              onClick={() => handleRemoveItem('reports', index)} 
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                              title="Remove this report"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                           
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Academic Year</label>
                              <input 
                                type="text" 
                                value={report.year} 
                                placeholder="e.g., 2023-24" 
                                onChange={(e) => handleContentChange('reports', index, e.target.value, 'year')} 
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Link Text</label>
                              <input 
                                type="text" 
                                value={report.linkText} 
                                placeholder="e.g., Activity Report" 
                                onChange={(e) => handleContentChange('reports', index, e.target.value, 'linkText')} 
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <label className="block text-xs text-gray-500 mb-1">Report PDF</label>
                            <FileUpload
                              sectionKey={`${selectedSection}-report-${index}`}
                              fieldKey={`url`}
                              currentUrl={report.url}
                              onUploadSuccess={(sectionKey, field, url, fileName) => {
                                handleContentChange('reports', index, url, 'url');
                              }}
                              onUploadStart={() => handleUploadInitiation(selectedSection, `reports-${index}-url`)}
                              isUploading={fileUploading[`${selectedSection}-reports-${index}-url`]}
                              allowedTypes={['application/pdf']}
                              label="Upload Report PDF"
                              uploadPath="uploads/studentcorner/reports"
                              className="p-4 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                            />
                            
                            {report.url && (
                              <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex-1">
                                  {report.url.split('/').pop() || `Report ${index + 1}`}
                                </a>
                                <button 
                                  onClick={() => handleContentChange('reports', index, '', 'url')} 
                                  className="ml-2 text-sm text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                    ))}
                    
                    <button 
                      onClick={() => handleAddItem('reports', { year: '', linkText: 'Activity Report', url: '' })} 
                      className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Activity Report
                    </button>
                 </div>
               </div>
           </div>
        );
      
      case "Professional Bodies":
         return (
             <div className="space-y-6">
                 <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
                 <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
                 
                 <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
                   <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
                   <p className="text-sm text-gray-600">This section shows professional bodies as cards with logos, names, and descriptions. Each card can have a "Read More" link for detailed information.</p>
                 </div>
                 
                 <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                   <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                     </svg>
                     Section Settings
                   </h4>
                   <div>
                      <label className="block text-sm font-medium mb-1">Section Heading</label>
                      <input type="text" value={editContent.heading || ""} onChange={(e) => handleContentChange('heading', null, e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/>
                   </div>
                 </div>

                 <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                     <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                       </svg>
                       Professional Bodies
                     </h4>
                     
                     <div className="space-y-6">
                       {(editContent.bodies || []).map((body, index) => (
                          <div key={index} className="p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative">
                              <div className="absolute top-4 right-4 flex space-x-2">
                                <button
                                  onClick={() => handleRemoveItem('bodies', index)}
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                                  title="Remove this body"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                              
                              <h5 className="text-lg font-medium text-[#0C2340] mb-4">Body #{index + 1}</h5>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                                  <input 
                                    type="text" 
                                    value={body.name} 
                                    placeholder="e.g., Computer Society of India" 
                                    onChange={(e) => handleContentChange('bodies', index, e.target.value, 'name')} 
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Acronym</label>
                                  <input 
                                    type="text" 
                                    value={body.acronym} 
                                    placeholder="e.g., CSI" 
                                    onChange={(e) => handleContentChange('bodies', index, e.target.value, 'acronym')} 
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Associated Department</label>
                                  <input 
                                    type="text" 
                                    value={body.department} 
                                    placeholder="e.g., Computer Engineering" 
                                    onChange={(e) => handleContentChange('bodies', index, e.target.value, 'department')} 
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Read More Link (Optional)</label>
                                  <input 
                                    type="text" 
                                    value={body.readMoreLink} 
                                    placeholder="https://example.com/body-details" 
                                    onChange={(e) => handleContentChange('bodies', index, e.target.value, 'readMoreLink')} 
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                                  />
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <label className="block text-xs text-gray-500 mb-1">Description</label>
                                <textarea 
                                  value={body.description} 
                                  placeholder="Brief description of the professional body" 
                                  onChange={(e) => handleContentChange('bodies', index, e.target.value, 'description')} 
                                  className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                                />
                              </div>
                              
                              <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                  {body.logo ? (
                                    <div className="relative w-24 h-24 border rounded-md overflow-hidden group">
                                      <img 
                                        src={body.logo} 
                                        alt={`${body.acronym || 'Body'} logo`} 
                                        className="w-full h-full object-contain p-1"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        onClick={() => handleContentChange('bodies', index, '', 'logo')}
                                      >
                                        <button className="text-white">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <label className="block text-xs text-gray-500 mb-1">Organization Logo</label>
                                  <FileUpload
                                    sectionKey={`${selectedSection}-body-${index}`}
                                    fieldKey="logo"
                                    currentUrl={body.logo}
                                    onUploadSuccess={(sectionKey, field, url, fileName) => handleImageUploadSuccess(selectedSection, 'bodies', url, fileName, index, 'logo')}
                                    onUploadStart={() => handleUploadInitiation(selectedSection, 'bodies', true, index, 'logo')}
                                    isUploading={imageUploading[`${selectedSection}-bodies-${index}-logo`]}
                                    allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']}
                                    label="Upload Logo (PNG or SVG recommended)"
                                    uploadPath="uploads/studentcorner/logos"
                                    className="p-3 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                                  />
                                  {body.logo && (
                                    <p className="text-xs text-gray-500 mt-2 break-all">{body.logo.split('/').pop()}</p>
                                  )}
                                </div>
                              </div>
                          </div>
                       ))}
                       
                       <button 
                         onClick={() => handleAddItem('bodies', { name: '', acronym: '', logo: '', description: '', department: '', readMoreLink: '' })} 
                         className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                         </svg>
                         Add Professional Body
                       </button>
                     </div>
                 </div>
             </div>
         );
         
      case "NSS":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">The NSS section highlights the service activities of the National Service Scheme at your institution. Make sure to include the motto, objectives, and key activities.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="National Service Scheme (NSS)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">NSS Motto</label>
                  <input
                    type="text"
                    value={editContent.motto || ""}
                    onChange={(e) => handleContentChange('motto', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Not Me But You"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Description of the NSS program at your institution..."
                  />
                </div>
              </div>
            </div>
            
            {/* Objectives */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {editContent.objectivesHeading || "Objectives of NSS"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.objectivesHeading || ""}
                  onChange={(e) => handleContentChange('objectivesHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Objectives of NSS"
                />
              </div>
              
              <div className="space-y-3">
                {(editContent.objectives || []).map((objective, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => handleContentChange('objectives', index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder={`Objective ${index + 1}`}
                    />
                    <button
                      onClick={() => handleRemoveItem('objectives', index)}
                      className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
                      title="Remove this objective"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddStringItem('objectives')}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Objective
                </button>
              </div>
            </div>
            
            {/* Activities */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {editContent.activitiesHeading || "NSS Activities"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.activitiesHeading || ""}
                  onChange={(e) => handleContentChange('activitiesHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="NSS Activities"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Activities Description</label>
                <textarea
                  value={editContent.activitiesText || ""}
                  onChange={(e) => handleContentChange('activitiesText', null, e.target.value)}
                  className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Description of NSS activities at your institution..."
                />
              </div>
            </div>
            
            {/* Program Officers */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {editContent.officersHeading || "Program Officers"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.officersHeading || ""}
                  onChange={(e) => handleContentChange('officersHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Program Officers"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.officers || []).map((officer, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Officer #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('officers', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this officer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Name</label>
                        <input
                          type="text"
                          value={officer.name}
                          placeholder="Full Name"
                          onChange={(e) => handleContentChange('officers', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Designation</label>
                        <input
                          type="text"
                          value={officer.designation}
                          placeholder="e.g., Program Officer, Coordinator"
                          onChange={(e) => handleContentChange('officers', index, e.target.value, 'designation')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Contact</label>
                        <input
                          type="text"
                          value={officer.contact}
                          placeholder="Email or Phone"
                          onChange={(e) => handleContentChange('officers', index, e.target.value, 'contact')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('officers', { name: '', designation: '', contact: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Program Officer
                </button>
              </div>
            </div>
            
            {/* Reports */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {editContent.reportsHeading || "Activity Reports"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.reportsHeading || ""}
                  onChange={(e) => handleContentChange('reportsHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Activity Reports"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.reports || []).map((report, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Report #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('reports', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this report"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Academic Year</label>
                        <input
                          type="text"
                          value={report.year}
                          placeholder="e.g., 2023-24"
                          onChange={(e) => handleContentChange('reports', index, e.target.value, 'year')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Report Title</label>
                        <input
                          type="text"
                          value={report.title}
                          placeholder="e.g., Annual Activity Report"
                          onChange={(e) => handleContentChange('reports', index, e.target.value, 'title')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 mb-1">Upload Report PDF</label>
                      <FileUpload
                        sectionKey={`${selectedSection}-report-${index}`}
                        fieldKey="fileUrl"
                        currentUrl={report.fileUrl}
                        onUploadSuccess={(sectionKey, field, url, fileName) => {
                          handleContentChange('reports', index, url, 'fileUrl');
                        }}
                        onUploadStart={() => handleUploadInitiation(selectedSection, `reports-${index}-fileUrl`)}
                        isUploading={fileUploading[`${selectedSection}-reports-${index}-fileUrl`]}
                        allowedTypes={['application/pdf']}
                        label="Upload Report PDF"
                        uploadPath="uploads/studentcorner/nss/reports"
                        className="p-4 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                      />
                      
                      {report.fileUrl && (
                        <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex-1">
                            {report.fileUrl.split('/').pop() || `Report ${index + 1}`}
                          </a>
                          <button
                            onClick={() => handleContentChange('reports', index, '', 'fileUrl')}
                            className="ml-2 text-sm text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('reports', { year: '', title: '', fileUrl: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Report
                </button>
              </div>
            </div>
            
            {/* Photo Gallery */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {editContent.galleryHeading || "Photo Gallery"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.galleryHeading || ""}
                  onChange={(e) => handleContentChange('galleryHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Photo Gallery"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.galleryImages || []).map((image, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Image #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('galleryImages', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Image Title</label>
                        <input
                          type="text"
                          value={image.title || ""}
                          placeholder="Image title or caption"
                          onChange={(e) => handleContentChange('galleryImages', index, e.target.value, 'title')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Image Description</label>
                        <input
                          type="text"
                          value={image.description || ""}
                          placeholder="Brief description of the image"
                          onChange={(e) => handleContentChange('galleryImages', index, e.target.value, 'description')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        {image.url ? (
                          <div className="relative w-24 h-24 border rounded-md overflow-hidden group">
                            <img
                              src={image.url}
                              alt={image.title || `Gallery image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              onClick={() => handleContentChange('galleryImages', index, '', 'url')}
                            >
                              <button className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Upload Image</label>
                        <FileUpload
                          sectionKey={`${selectedSection}-gallery-${index}`}
                          fieldKey="url"
                          currentUrl={image.url}
                          onUploadSuccess={(sectionKey, field, url, fileName) => handleImageUploadSuccess(selectedSection, 'galleryImages', url, fileName, index, 'url')}
                          onUploadStart={() => handleUploadInitiation(selectedSection, 'galleryImages', true, index, 'url')}
                          isUploading={imageUploading[`${selectedSection}-galleryImages-${index}-url`]}
                          allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
                          label="Upload Gallery Image"
                          uploadPath="uploads/studentcorner/nss/gallery"
                          className="p-3 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                        />
                        {image.url && (
                          <p className="text-xs text-gray-500 mt-2 break-all">{image.url.split('/').pop()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('galleryImages', { title: '', description: '', url: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Gallery Image
                </button>
              </div>
            </div>
          </div>
        );
      
      case "Student Clubs":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">Student Clubs are displayed as cards with their logos, names, and descriptions. Each club can have a coordinator and a link for more details.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Student Clubs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Introduction to student clubs at your institution..."
                  />
                </div>
              </div>
            </div>
            
            {/* Clubs */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Student Clubs
              </h4>
              
              <div className="space-y-6">
                {(editContent.clubs || []).map((club, index) => (
                  <div key={index} className="p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleRemoveItem('clubs', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this club"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <h5 className="text-lg font-medium text-[#0C2340] mb-4">Club #{index + 1}</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Club Name</label>
                        <input
                          type="text"
                          value={club.name}
                          placeholder="e.g., Robotics Club"
                          onChange={(e) => handleContentChange('clubs', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Faculty Coordinator</label>
                        <input
                          type="text"
                          value={club.coordinator}
                          placeholder="e.g., Prof. John Smith"
                          onChange={(e) => handleContentChange('clubs', index, e.target.value, 'coordinator')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Read More Link (Optional)</label>
                        <input
                          type="text"
                          value={club.readMoreLink}
                          placeholder="https://example.com/club-page"
                          onChange={(e) => handleContentChange('clubs', index, e.target.value, 'readMoreLink')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1">Club Description</label>
                      <textarea
                        value={club.description}
                        placeholder="Brief description of the club and its activities"
                        onChange={(e) => handleContentChange('clubs', index, e.target.value, 'description')}
                        className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1">Club Activities</label>
                      <textarea
                        value={club.activities}
                        placeholder="List of regular activities organized by the club"
                        onChange={(e) => handleContentChange('clubs', index, e.target.value, 'activities')}
                        className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        {club.logo ? (
                          <div className="relative w-24 h-24 border rounded-md overflow-hidden group">
                            <img
                              src={club.logo}
                              alt={`${club.name || 'Club'} logo`}
                              className="w-full h-full object-contain p-1"
                            />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              onClick={() => handleContentChange('clubs', index, '', 'logo')}
                            >
                              <button className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Club Logo</label>
                        <FileUpload
                          sectionKey={`${selectedSection}-club-${index}`}
                          fieldKey="logo"
                          currentUrl={club.logo}
                          onUploadSuccess={(sectionKey, field, url, fileName) => handleImageUploadSuccess(selectedSection, 'clubs', url, fileName, index, 'logo')}
                          onUploadStart={() => handleUploadInitiation(selectedSection, 'clubs', true, index, 'logo')}
                          isUploading={imageUploading[`${selectedSection}-clubs-${index}-logo`]}
                          allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']}
                          label="Upload Club Logo"
                          uploadPath="uploads/studentcorner/clubs/logos"
                          className="p-3 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                        />
                        {club.logo && (
                          <p className="text-xs text-gray-500 mt-2 break-all">{club.logo.split('/').pop()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('clubs', { name: '', logo: '', description: '', coordinator: '', activities: '', readMoreLink: '' })}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Student Club
                </button>
              </div>
            </div>
          </div>
        );
      
      case "Infrastructure":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section showcases campus infrastructure facilities available to students, such as labs, libraries, and recreational spaces.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Campus Infrastructure"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Introduction to campus infrastructure..."
                  />
                </div>
              </div>
            </div>
            
            {/* Facilities */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Campus Facilities
              </h4>
              
              <div className="space-y-6">
                {(editContent.facilities || []).map((facility, index) => (
                  <div key={index} className="p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleRemoveItem('facilities', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this facility"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <h5 className="text-lg font-medium text-[#0C2340] mb-4">Facility #{index + 1}</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Facility Name</label>
                        <input
                          type="text"
                          value={facility.name}
                          placeholder="e.g., Central Library, Computer Lab"
                          onChange={(e) => handleContentChange('facilities', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1">Facility Description</label>
                      <textarea
                        value={facility.description}
                        placeholder="Detailed description of the facility and its resources"
                        onChange={(e) => handleContentChange('facilities', index, e.target.value, 'description')}
                        className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Features List */}
                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1">Key Features</label>
                      <div className="bg-white p-3 rounded border">
                        {(facility.features || []).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...(facility.features || [])];
                                newFeatures[featureIndex] = e.target.value;
                                handleContentChange('facilities', index, newFeatures, 'features');
                              }}
                              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                              placeholder={`Feature ${featureIndex + 1}`}
                            />
                            <button
                              onClick={() => {
                                const newFeatures = [...(facility.features || [])];
                                newFeatures.splice(featureIndex, 1);
                                handleContentChange('facilities', index, newFeatures, 'features');
                              }}
                              className="ml-2 p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
                              title="Remove this feature"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newFeatures = [...(facility.features || []), ''];
                            handleContentChange('facilities', index, newFeatures, 'features');
                          }}
                          className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Feature
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        {facility.image ? (
                          <div className="relative w-24 h-24 border rounded-md overflow-hidden group">
                            <img
                              src={facility.image}
                              alt={`${facility.name || 'Facility'} image`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              onClick={() => handleContentChange('facilities', index, '', 'image')}
                            >
                              <button className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Facility Image</label>
                        <FileUpload
                          sectionKey={`${selectedSection}-facility-${index}`}
                          fieldKey="image"
                          currentUrl={facility.image}
                          onUploadSuccess={(sectionKey, field, url, fileName) => handleImageUploadSuccess(selectedSection, 'facilities', url, fileName, index, 'image')}
                          onUploadStart={() => handleUploadInitiation(selectedSection, 'facilities', true, index, 'image')}
                          isUploading={imageUploading[`${selectedSection}-facilities-${index}-image`]}
                          allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
                          label="Upload Facility Image"
                          uploadPath="uploads/studentcorner/infrastructure"
                          className="p-3 border border-dashed border-gray-300 rounded-md hover:border-[#0C2340] transition-colors"
                        />
                        {facility.image && (
                          <p className="text-xs text-gray-500 mt-2 break-all">{facility.image.split('/').pop()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('facilities', { name: '', description: '', image: '', features: [] })}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Facility
                </button>
              </div>
            </div>
          </div>
        );
      
      case "Cultural Activities":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section showcases cultural events, festivals, and performances organized throughout the academic year, as well as the cultural team members.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Cultural Activities"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Introduction to cultural activities at your institution..."
                  />
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {editContent.upcomingEventsHeading || "Upcoming Events"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.upcomingEventsHeading || ""}
                  onChange={(e) => handleContentChange('upcomingEventsHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Upcoming Events"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.upcomingEvents || []).map((event, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Event #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('upcomingEvents', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this event"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Event Name</label>
                        <input
                          type="text"
                          value={event.name}
                          placeholder="e.g., Annual Cultural Fest"
                          onChange={(e) => handleContentChange('upcomingEvents', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Event Date</label>
                        <input
                          type="text"
                          value={event.date}
                          placeholder="e.g., March 15-17, 2023"
                          onChange={(e) => handleContentChange('upcomingEvents', index, e.target.value, 'date')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Venue</label>
                        <input
                          type="text"
                          value={event.venue}
                          placeholder="e.g., College Auditorium"
                          onChange={(e) => handleContentChange('upcomingEvents', index, e.target.value, 'venue')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Registration Link (Optional)</label>
                        <input
                          type="text"
                          value={event.registrationLink}
                          placeholder="https://example.com/register"
                          onChange={(e) => handleContentChange('upcomingEvents', index, e.target.value, 'registrationLink')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Event Description</label>
                      <textarea
                        value={event.description}
                        placeholder="Detailed description of the event and activities"
                        onChange={(e) => handleContentChange('upcomingEvents', index, e.target.value, 'description')}
                        className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('upcomingEvents', { name: '', date: '', venue: '', description: '', registrationLink: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Upcoming Event
                </button>
              </div>
            </div>
            
            {/* Past Events */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {editContent.pastEventsHeading || "Past Events"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.pastEventsHeading || ""}
                  onChange={(e) => handleContentChange('pastEventsHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Past Events"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.pastEvents || []).map((event, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Past Event #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('pastEvents', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this event"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Event Name</label>
                        <input
                          type="text"
                          value={event.name}
                          placeholder="e.g., Annual Cultural Fest 2022"
                          onChange={(e) => handleContentChange('pastEvents', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Event Date</label>
                        <input
                          type="text"
                          value={event.date}
                          placeholder="e.g., March 15-17, 2022"
                          onChange={(e) => handleContentChange('pastEvents', index, e.target.value, 'date')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1">Event Description</label>
                      <textarea
                        value={event.description}
                        placeholder="Summary of the event and highlights"
                        onChange={(e) => handleContentChange('pastEvents', index, e.target.value, 'description')}
                        className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Image Gallery */}
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500 mb-1">Event Gallery Images</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(event.imagesGallery || []).map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            {img ? (
                              <div className="h-24 rounded border overflow-hidden">
                                <img
                                  src={img}
                                  alt={`Event image ${imgIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div
                                  className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                >
                                  <button
                                    onClick={() => {
                                      const newGallery = [...(event.imagesGallery || [])];
                                      newGallery.splice(imgIndex, 1);
                                      handleContentChange('pastEvents', index, newGallery, 'imagesGallery');
                                    }}
                                    className="text-white p-1 bg-red-500 rounded-full"
                                    title="Remove image"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                        <div className="h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                          <FileUpload
                            sectionKey={`${selectedSection}-pastEvent-${index}`}
                            fieldKey="galleryImage"
                            currentUrl=""
                            onUploadSuccess={(sectionKey, field, url, fileName) => {
                              const newGallery = [...(event.imagesGallery || []), url];
                              handleContentChange('pastEvents', index, newGallery, 'imagesGallery');
                            }}
                            onUploadStart={() => handleUploadInitiation(selectedSection, 'pastEvents', true, index, 'imagesGallery')}
                            isUploading={imageUploading[`${selectedSection}-pastEvents-${index}-imagesGallery`]}
                            allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
                            label="Add Image"
                            uploadPath="uploads/studentcorner/cultural/gallery"
                            className="h-full w-full flex items-center justify-center text-gray-400 hover:text-[#0C2340] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('pastEvents', { name: '', date: '', description: '', imagesGallery: [] })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Past Event
                </button>
              </div>
            </div>
            
            {/* Cultural Team */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {editContent.culturalTeamHeading || "Cultural Team"}
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section Heading</label>
                <input
                  type="text"
                  value={editContent.culturalTeamHeading || ""}
                  onChange={(e) => handleContentChange('culturalTeamHeading', null, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Cultural Team"
                />
              </div>
              
              <div className="space-y-4">
                {(editContent.culturalTeam || []).map((member, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Team Member #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('culturalTeam', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this member"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          placeholder="Full Name"
                          onChange={(e) => handleContentChange('culturalTeam', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Role</label>
                        <input
                          type="text"
                          value={member.role}
                          placeholder="e.g., Cultural Secretary, Coordinator"
                          onChange={(e) => handleContentChange('culturalTeam', index, e.target.value, 'role')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Contact</label>
                        <input
                          type="text"
                          value={member.contact}
                          placeholder="Email or Phone"
                          onChange={(e) => handleContentChange('culturalTeam', index, e.target.value, 'contact')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('culturalTeam', { name: '', role: '', contact: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        );
      
      case "Student Satisfaction Survey":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section contains the Student Satisfaction Survey information, including survey details, methodology, and results of the latest and previous surveys.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Student Satisfaction Survey"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Introduction to the Student Satisfaction Survey conducted at your institution..."
                  />
                </div>
              </div>
            </div>
            
            {/* Survey Methodology */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Survey Methodology
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Methodology Description</label>
                  <textarea
                    value={editContent.methodology || ""}
                    onChange={(e) => handleContentChange('methodology', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Describe the methodology used to conduct the survey, including sample size, target audience, and data collection methods..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Survey Parameters</label>
                  <p className="text-xs text-gray-500 mb-2">List the key parameters assessed in the survey</p>
                  
                  <div className="space-y-3">
                    {(editContent.surveyParameters || []).map((param, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={param}
                          onChange={(e) => {
                            const newParams = [...(editContent.surveyParameters || [])];
                            newParams[index] = e.target.value;
                            handleContentChange('surveyParameters', null, newParams);
                          }}
                          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder={`Parameter ${index + 1}`}
                        />
                        <button
                          onClick={() => {
                            const newParams = [...(editContent.surveyParameters || [])];
                            newParams.splice(index, 1);
                            handleContentChange('surveyParameters', null, newParams);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove parameter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => handleAddItem('surveyParameters', '')}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Survey Parameter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Latest Survey Results */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Latest Survey Results
              </h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Academic Year</label>
                    <input
                      type="text"
                      value={editContent.latestSurveyYear || ""}
                      onChange={(e) => handleContentChange('latestSurveyYear', null, e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="e.g., 2022-2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sample Size (Number of Respondents)</label>
                    <input
                      type="text"
                      value={editContent.latestSurveySampleSize || ""}
                      onChange={(e) => handleContentChange('latestSurveySampleSize', null, e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Key Findings</label>
                  <textarea
                    value={editContent.latestSurveyFindings || ""}
                    onChange={(e) => handleContentChange('latestSurveyFindings', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Summarize the key findings of the latest survey..."
                  />
                </div>
                
                {/* Survey Results Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">Survey Report (PDF)</label>
                  <div className="border rounded p-4 bg-gray-50">
                    {editContent.latestSurveyReportFile ? (
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm truncate">Survey Report</span>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={editContent.latestSurveyReportFile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          <button
                            onClick={() => handleContentChange('latestSurveyReportFile', null, '')}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        sectionKey={selectedSection}
                        fieldKey="latestSurveyReportFile"
                        currentUrl=""
                        onUploadSuccess={(sectionKey, field, url) => handleContentChange('latestSurveyReportFile', null, url)}
                        onUploadStart={() => handleUploadInitiation(selectedSection, 'latestSurveyReportFile')}
                        isUploading={fileUploading[`${selectedSection}-latestSurveyReportFile`]}
                        allowedTypes={['application/pdf']}
                        label="Upload Survey Report (PDF)"
                        uploadPath="uploads/studentcorner/survey"
                      />
                    )}
                  </div>
                </div>
                
                {/* Survey Infographics */}
                <div>
                  <label className="block text-sm font-medium mb-1">Survey Infographics</label>
                  <p className="text-xs text-gray-500 mb-2">Upload images/charts that represent the survey results visually</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(editContent.surveyInfographics || []).map((img, index) => (
                      <div key={index} className="relative group">
                        {img ? (
                          <div className="border rounded overflow-hidden h-32">
                            <img
                              src={img}
                              alt={`Infographic ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <button
                                onClick={() => {
                                  const newInfographics = [...(editContent.surveyInfographics || [])];
                                  newInfographics.splice(index, 1);
                                  handleContentChange('surveyInfographics', null, newInfographics);
                                }}
                                className="text-white p-1 bg-red-500 rounded-full"
                                title="Remove image"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-32">
                      <FileUpload
                        sectionKey={selectedSection}
                        fieldKey="surveyInfographic"
                        currentUrl=""
                        onUploadSuccess={(sectionKey, field, url) => {
                          const newInfographics = [...(editContent.surveyInfographics || []), url];
                          handleContentChange('surveyInfographics', null, newInfographics);
                        }}
                        onUploadStart={() => handleUploadInitiation(selectedSection, 'surveyInfographics')}
                        isUploading={imageUploading[`${selectedSection}-surveyInfographics`]}
                        allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
                        label="Upload Image"
                        uploadPath="uploads/studentcorner/survey/infographics"
                        className="h-full w-full flex flex-col items-center justify-center text-gray-400 hover:text-[#0C2340] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "Anti Ragging":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            <div><label className="block text-sm font-medium mb-1">Main Heading</label><input type="text" value={editContent.heading || ""} onChange={(e) => handleContentChange('heading', null, e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/></div>
            <div><label className="block text-sm font-medium mb-1">Paragraph 1</label><textarea value={editContent.text1 || ""} onChange={(e) => handleContentChange('text1', null, e.target.value)} className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/></div>
            <div><label className="block text-sm font-medium mb-1">Paragraph 2</label><textarea value={editContent.text2 || ""} onChange={(e) => handleContentChange('text2', null, e.target.value)} className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/></div>
            <div><label className="block text-sm font-medium mb-1">Paragraph 3</label><textarea value={editContent.text3 || ""} onChange={(e) => handleContentChange('text3', null, e.target.value)} className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"/></div>
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold mb-2">{editContent.contactHeading || "Contact Info"}</h4>
              <textarea value={editContent.contactText || ""} onChange={(e) => handleContentChange('contactText', null, e.target.value)} className="w-full p-2 border rounded min-h-[60px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent" placeholder="Text regarding contacting the committee..."/>
              {/* TODO: Add committee member list editing here if needed later */}
            </div>
          </div>
        );

      default:
        return <p>Edit form for {selectedSection} not implemented yet.</p>;
    }
  };

  // --- Main Component Render ---

  // Show loading state for auth
  if (authLoading) {
    return <div className="p-6">Loading authentication...</div>;
  }

  // Check if authenticated
  if (!isAuthenticated) {
    // Let AuthProvider handle redirect, or show message
    return <div className="p-6">Please log in to manage the Student Corner.</div>;
  }

  // Preview helper for showing how content will appear on frontend
  const togglePreviewMode = () => {
    setIsPreviewMode(prev => !prev);
  };

  // Utility function to check if form has unsaved changes
  const hasUnsavedChanges = () => {
    // Implementation would compare initial content with current editContent
    return Object.keys(editContent).length > 0;
  };

  // Add this within the existing JSX, right after the actionButtons div in the editor view
  // Add the preview toggle buttons
  const renderPreviewToggle = () => {
    if (!selectedSection) return null;
    
    return (
      <div className="flex justify-center items-center mt-8 mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setIsPreviewMode(false)}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              !isPreviewMode 
                ? 'bg-[#0C2340] text-white border-[#0C2340]' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Mode
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              isPreviewMode 
                ? 'bg-[#0C2340] text-white border-[#0C2340]' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Mode
          </button>
        </div>
      </div>
    );
  };

  // Main Component Render - Add more sophisticated layout and styling
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Header section */}
      <div className="bg-[#0C2340] text-white p-4 shadow-md mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Student Corner Management</h1>
          <p className="text-sm opacity-80">Edit and update content for the Student Corner section of the website</p>
        </div>
      </div>
      
      {/* Status message - centered and styled */}
      {status && (
        <div className={`p-3 mx-auto max-w-5xl my-4 rounded-lg shadow ${
          status.startsWith('Error') ? 'bg-red-100 text-red-700 border-l-4 border-red-500' : 'bg-green-100 text-green-700 border-l-4 border-green-500'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {status.startsWith('Error') ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
            </span>
            {status}
          </div>
        </div>
      )}
      
      {/* Loading states - centered and styled */}
      {loading && !selectedSection && (
        <div className="flex justify-center items-center my-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C2340]"></div>
          <span className="ml-3 text-lg text-gray-700">Loading sections...</span>
        </div>
      )}
      
      {loading && selectedSection && (
        <div className="flex justify-center items-center my-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C2340]"></div>
          <span className="ml-3 text-lg text-gray-700">Loading {selectedSection} content...</span>
        </div>
      )}

      {!loading && (
        <>
          {selectedSection ? (
            // Edit Form View - Centered and enhanced
            <div className="max-w-5xl mx-auto my-6">
              {/* Breadcrumb navigation */}
              <div className="text-sm mb-4 text-gray-600 flex items-center">
                <span className="cursor-pointer hover:text-[#0C2340]" onClick={() => setSelectedSection(null)}>
                  Student Corner
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-[#0C2340]">{selectedSection}</span>
              </div>
              
              {/* Section header */}
              <div className="bg-white rounded-t-lg shadow-md p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-[#0C2340]">
                  {sectionStructures[selectedSection]?.title || selectedSection}
                </h1>
                <p className="text-gray-600 mt-2">
                  {sectionStructures[selectedSection]?.description || `Edit the content for the ${selectedSection} section.`}
                </p>
              </div>
              
              {/* Add preview toggle buttons */}
              {renderPreviewToggle()}
              
              {/* Form content or Preview content based on mode */}
              <div className="bg-white rounded-b-lg shadow-md p-6 mb-6">
                <div className="flex justify-center">
                  <div className="w-full">
                    {isPreviewMode ? (
                      <PreviewRenderer sectionKey={selectedSection} content={editContent} />
                    ) : (
                      renderEditForm()
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                {!isPreviewMode && (
                  <button
                    className="px-6 py-2 bg-[#0C2340] text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Initial Welcome View - Enhanced with visuals
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentCornerAdmin;

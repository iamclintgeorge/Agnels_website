import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/useAuthCheck';
import FileUpload from '../../components/FileUpload';

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

// Define section structures to match website frontend
const sectionStructures = {
  "Academic_Home": {
    title: "Academics Home",
    description: "Configure the main content that appears on the Academics landing page.",
    template: {
      heading: "Academics",
      introduction: "Welcome to the Academics section of our institution, where excellence in education is our priority.",
      missionStatement: "Our teaching philosophy focuses on innovative methods and continuous improvement."
    }
  },
  "Academic_Handbook": {
    title: "Academic Handbook",
    description: "Upload and manage the Academic Handbook documents.",
    template: {
      heading: "Academic Handbook",
      description: "Access our comprehensive academic handbook to understand policies, regulations, and academic guidelines.",
      handbooks: []
    }
  },
  "Academic_Calendar": {
    title: "Academic Calendar",
    description: "Manage the academic calendar entries for different years and semesters.",
    template: {
      heading: "Academic Calendar",
      calendarEntries: []
    }
  },
  "Examinations": {
    title: "Examinations",
    description: "Manage examination schedules, notifications, and related documents.",
    template: {
      heading: "Examinations",
      notifications: [],
      forms: [],
      timetables: {}
    }
  },
  "APMS": {
    title: "Academic Performance Monitoring System",
    description: "Configure the APMS section and portal link.",
    template: {
      heading: "APMS Portal",
      description: "Access the Academic Performance Monitoring System (APMS) for student performance tracking.",
      portalUrl: "https://apms.fcrit.ac.in/apms/index.php"
    }
  },
  "LMS": {
    title: "Learning Management System",
    description: "Configure the LMS section and portal link.",
    template: {
      heading: "Learning Management System (LMS)",
      description: "Access our Learning Management System (LMS) for online courses, assignments, and resources.",
      portalUrl: "https://lms.fcrit.ac.in/"
    }
  },
  "Stakeholder_Feedback": {
    title: "Stakeholder Feedback on Syllabus",
    description: "Manage stakeholder feedback forms and submissions.",
    template: {
      heading: "Stakeholder Feedback on Syllabus",
      description: "Provide your valuable feedback on our academic curriculum and syllabus.",
      feedbackUrl: "https://forms.fcrit.ac.in/feedback/"
    }
  }
};

// Preview renderer component
const PreviewRenderer = ({ sectionKey, content }) => {
  if (!content) return <p>No content to preview.</p>;
  
  switch (sectionKey) {
    case "Academic_Home":
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{content.heading || "Academics"}</h2>
          <p className="mb-4">{content.introduction || "Welcome to our Academics section."}</p>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Our Teaching Philosophy</h3>
            <p>{content.missionStatement || "Our teaching philosophy statement goes here."}</p>
          </div>
        </div>
      );
      
    case "Academic_Handbook":
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{content.heading || "Academic Handbook"}</h2>
          <p className="mb-4">{content.description || "Access our comprehensive academic handbook."}</p>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Available Handbooks</h3>
            <ul className="list-disc pl-5">
              {(content.handbooks || []).map((handbook, index) => (
                <li key={index} className="mb-2">
                  <a href={handbook.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {handbook.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
      
    case "Academic_Calendar":
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{content.heading || "Academic Calendar"}</h2>
          <p className="mb-4">{content.description || "View and download academic calendars for the current and previous semesters."}</p>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Calendar Entries</h3>
            <ul className="list-disc pl-5">
              {(content.calendarEntries || []).map((entry, index) => (
                <li key={index} className="mb-2">
                  <a href={entry.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {entry.year || `Calendar ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
      
    // Add other section previews as needed
    
    default:
      return <p className="text-gray-500 p-4 bg-gray-100 rounded">Preview not available for {sectionKey}</p>;
  }
};

const AcademicsAdmin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const location = window.location.pathname;

  const [sections] = useState(Object.keys(sectionStructures));
  const [selectedSection, setSelectedSection] = useState(null);
  const [editContent, setEditContent] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [fileUploading, setFileUploading] = useState({});
  const [imageUploading, setImageUploading] = useState({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Determine selected section from URL path
  useEffect(() => {
    if (location === '/academics') {
      setSelectedSection('Academic_Home');
    } else if (location === '/academics/handbook') {
      setSelectedSection('Academic_Handbook');
    } else if (location === '/academics/calendar') {
      setSelectedSection('Academic_Calendar');
    } else if (location === '/academics/examinations') {
      setSelectedSection('Examinations');
    } else if (location === '/academics/apms') {
      setSelectedSection('APMS');
    } else if (location === '/academics/lms') {
      setSelectedSection('LMS');
    } else if (location === '/academics/feedback') {
      setSelectedSection('Stakeholder_Feedback');
    }
  }, [location]);

  // Fetch all sections on component mount
  useEffect(() => {
    if (isAuthenticated && selectedSection) {
      fetchSectionContent();
    }
  }, [isAuthenticated, selectedSection]);

  // Fetch section content
  const fetchSectionContent = async () => {
    if (!selectedSection) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/academics/${selectedSection}`);
      if (response.data && response.data.content) {
        setEditContent(response.data.content);
      } else {
        // Initialize with template if no content exists
        setEditContent(sectionStructures[selectedSection]?.template || {});
      }
    } catch (error) {
      console.error(`Error fetching ${selectedSection} content:`, error);
      // Initialize with template on error
      setEditContent(sectionStructures[selectedSection]?.template || {});
    } finally {
      setLoading(false);
    }
  };

  // Fetch all sections
  const fetchAllSections = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/academics/sections');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sections:', error);
      setStatus(`Error: ${error.response?.data?.error || 'Failed to fetch sections'}`);
      setLoading(false);
    }
  };

  // Handle section selection
  const handleSectionSelect = async (section) => {
    setSelectedSection(section);
    setEditContent({});
    setStatus('');
    setIsPreviewMode(false);
    setLoading(true);
    
    try {
      const response = await axios.get(`/api/academics/${section}`);
      if (response.data && response.data.content) {
        setEditContent(response.data.content);
      } else {
        // Initialize with template if no content exists
        setEditContent(sectionStructures[section]?.template || {});
      }
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      // Initialize with template on error
      setEditContent(sectionStructures[section]?.template || {});
    } finally {
      setLoading(false);
    }
  };

  // Handle content changes
  const handleContentChange = (field, index, value, subfield) => {
    setEditContent(prev => {
      const updated = { ...prev };
      
      if (index !== null && subfield) {
        // Update a specific subfield in an array item
        updated[field] = [...(prev[field] || [])];
        updated[field][index] = {
          ...updated[field][index],
          [subfield]: value
        };
      } else if (index !== null) {
        // Update an array item
        updated[field] = [...(prev[field] || [])];
        updated[field][index] = value;
      } else {
        // Update a direct field
        updated[field] = value;
      }
      
      return updated;
    });
  };

  // Handle adding items to arrays
  const handleAddItem = (field, template) => {
    setEditContent(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), template]
    }));
  };

  // Handle removing items from arrays
  const handleRemoveItem = (field, index) => {
    setEditContent(prev => {
      const updated = { ...prev };
      updated[field] = [...(prev[field] || [])];
      updated[field].splice(index, 1);
      return updated;
    });
  };

  // Handle file upload initialization
  const handleUploadInitiation = (section, field, isArray = false, index = null, subfield = null) => {
    const key = isArray 
      ? `${section}-${field}-${index}-${subfield}`
      : `${section}-${field}`;
      
    if (field.includes('file') || field.includes('pdf')) {
      setFileUploading(prev => ({ ...prev, [key]: true }));
    } else {
      setImageUploading(prev => ({ ...prev, [key]: true }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedSection) return;
    
    setLoading(true);
    setStatus('');
    
    try {
      const response = await axios.post(`/api/academics/${selectedSection}`, {
        content: editContent
      });
      
      setStatus('Content updated successfully!');
    } catch (error) {
      console.error('Error updating content:', error);
      setStatus(`Error: ${error.response?.data?.error || 'Failed to update content'}`);
    } finally {
      setLoading(false);
    }
  };

  // This function renders the appropriate edit form based on selected section
  const renderEditForm = () => {
    if (!selectedSection || !editContent) return <p>Select a section to edit.</p>;

    const structure = sectionStructures[selectedSection];
    if (!structure) return <p>Configuration error for this section.</p>;

    switch (selectedSection) {
      case "Academic_Home":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section represents the main Academic homepage. It showcases key academic features and links to various academic resources.</p>
            </div>
            
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">General Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Page Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Academics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Page Description</label>
                  <textarea
                    value={editContent.description || ""}
                    onChange={(e) => handleContentChange('description', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Brief description about the academic programs and resources available at the institution..."
                  />
                </div>
              </div>
            </div>
            
            {/* Featured Sections */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Featured Academic Resources
              </h4>
              
              <div className="space-y-4">
                {(editContent.featuredSections || []).map((section, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Resource #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('featuredSections', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this resource"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={section.title || ""}
                          onChange={(e) => handleContentChange('featuredSections', index, e.target.value, 'title')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., Academic Calendar"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Description</label>
                        <textarea
                          value={section.description || ""}
                          onChange={(e) => handleContentChange('featuredSections', index, e.target.value, 'description')}
                          className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="Brief description of this academic resource..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Link URL</label>
                        <input
                          type="url"
                          value={section.url || ""}
                          onChange={(e) => handleContentChange('featuredSections', index, e.target.value, 'url')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., /academics/calendar"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter a relative URL (e.g., /academics/calendar) or a full URL for external links</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Icon (Optional)</label>
                        <select
                          value={section.icon || ""}
                          onChange={(e) => handleContentChange('featuredSections', index, e.target.value, 'icon')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                        >
                          <option value="">Select an icon</option>
                          <option value="calendar">Calendar</option>
                          <option value="book">Book/Handbook</option>
                          <option value="exam">Examination</option>
                          <option value="form">Forms</option>
                          <option value="feedback">Feedback</option>
                          <option value="lms">Learning Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('featuredSections', { title: '', description: '', url: '', icon: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Featured Resource
                </button>
              </div>
            </div>
            
            {/* Banner Image */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Banner Image
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Academic Page Banner</label>
                  <div className="border rounded p-4 bg-gray-100">
                    {editContent.bannerImage ? (
                      <div className="space-y-4">
                        <div className="relative w-full aspect-[3/1] bg-gray-200 rounded overflow-hidden">
                          <img 
                            src={editContent.bannerImage} 
                            alt="Banner Preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex justify-between">
                          <a 
                            href={editContent.bannerImage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Full Size
                          </a>
                          <button
                            onClick={() => handleContentChange('bannerImage', null, '')}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <FileUpload
                        sectionKey={selectedSection}
                        fieldKey="bannerImage"
                        currentUrl=""
                        onUploadSuccess={(sectionKey, field, url) => handleContentChange('bannerImage', null, url)}
                        onUploadStart={() => handleUploadInitiation(selectedSection, 'bannerImage', false)}
                        isUploading={fileUploading[`${selectedSection}-bannerImage`]}
                        allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                        label="Upload Banner Image"
                        uploadPath="uploads/academics/banner"
                        note="Recommended dimensions: 1200x400 pixels. Use a high-quality image that represents academics."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Handbook Section */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academic Handbooks
              </h4>
              
              <div className="space-y-4">
                {(editContent.handbooks || []).map((handbook, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Handbook #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('handbooks', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this handbook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={handbook.title || ""}
                          onChange={(e) => handleContentChange('handbooks', index, e.target.value, 'title')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., Academic Handbook"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Description</label>
                        <textarea
                          value={handbook.description || ""}
                          onChange={(e) => handleContentChange('handbooks', index, e.target.value, 'description')}
                          className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="Brief description of the handbook..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">PDF File</label>
                        <div className="border rounded p-4 bg-gray-100">
                          {handbook.fileUrl ? (
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm truncate">{handbook.title || `Handbook ${index + 1}`}</span>
                              </div>
                              <div className="flex space-x-2">
                                <a 
                                  href={handbook.fileUrl} 
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
                                  onClick={() => handleContentChange('handbooks', index, '', 'fileUrl')}
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
                              sectionKey={`${selectedSection}-handbook-${index}`}
                              fieldKey="handbookFile"
                              currentUrl=""
                              onUploadSuccess={(sectionKey, field, url) => handleContentChange('handbooks', index, url, 'fileUrl')}
                              onUploadStart={() => handleUploadInitiation(selectedSection, 'handbooks', true, index, 'fileUrl')}
                              isUploading={fileUploading[`${selectedSection}-handbooks-${index}-fileUrl`]}
                              allowedTypes={['application/pdf']}
                              label="Upload Handbook PDF"
                              uploadPath="uploads/academics/handbooks"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('handbooks', { title: '', description: '', fileUrl: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Handbook
                </button>
              </div>
            </div>
          </div>
        );
        
      case "Academic_Calendar":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-2">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section allows you to manage academic calendar entries for different semesters and years.</p>
            </div>
            
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
                    placeholder="Academic Calendar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Section Description</label>
                  <textarea
                    value={editContent.description || ""}
                    onChange={(e) => handleContentChange('description', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="View and download academic calendars for the current and previous semesters."
                  />
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar Entries
              </h4>
              
              <div className="space-y-4">
                {(editContent.calendarEntries || []).map((entry, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Calendar Entry #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('calendarEntries', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this entry"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Year/Semester</label>
                        <input
                          type="text"
                          value={entry.year || ""}
                          onChange={(e) => handleContentChange('calendarEntries', index, e.target.value, 'year')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., FH-2025 (Autonomy Curriculum) FY and SY"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Issue Date</label>
                        <input
                          type="text"
                          value={entry.date || ""}
                          onChange={(e) => handleContentChange('calendarEntries', index, e.target.value, 'date')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., 04 Jan 2025"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Calendar PDF</label>
                      <div className="border rounded p-4 bg-gray-100">
                        {entry.fileUrl ? (
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm truncate">{entry.year || `Calendar ${index + 1}`}</span>
                            </div>
                            <div className="flex space-x-2">
                              <a 
                                href={entry.fileUrl} 
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
                                onClick={() => handleContentChange('calendarEntries', index, '', 'fileUrl')}
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
                            sectionKey={`${selectedSection}-calendar-${index}`}
                            fieldKey="calendarFile"
                            currentUrl=""
                            onUploadSuccess={(sectionKey, field, url) => handleContentChange('calendarEntries', index, url, 'fileUrl')}
                            onUploadStart={() => handleUploadInitiation(selectedSection, 'calendarEntries', true, index, 'fileUrl')}
                            isUploading={fileUploading[`${selectedSection}-calendarEntries-${index}-fileUrl`]}
                            allowedTypes={['application/pdf']}
                            label="Upload Calendar PDF"
                            uploadPath="uploads/academics/calendars"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('calendarEntries', { year: '', date: '', fileUrl: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Calendar
                </button>
              </div>
            </div>
          </div>
        );
        
      case "APMS":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-2">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section configures the APMS portal link and description.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">APMS Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="APMS Portal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editContent.description || ""}
                    onChange={(e) => handleContentChange('description', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Access the Academic Performance Monitoring System (APMS) for student performance tracking."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Portal URL</label>
                  <input
                    type="url"
                    value={editContent.portalUrl || ""}
                    onChange={(e) => handleContentChange('portalUrl', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="https://apms.fcrit.ac.in/apms/index.php"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the full URL including http:// or https://</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "LMS":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-2">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section configures the Learning Management System portal link and description.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">LMS Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Learning Management System (LMS)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editContent.description || ""}
                    onChange={(e) => handleContentChange('description', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Access our Learning Management System (LMS) for online courses, assignments, and resources."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Portal URL</label>
                  <input
                    type="url"
                    value={editContent.portalUrl || ""}
                    onChange={(e) => handleContentChange('portalUrl', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="https://lms.fcrit.ac.in/"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the full URL including http:// or https://</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Stakeholder_Feedback":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-2">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section configures the stakeholder feedback form link and description.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b">Stakeholder Feedback Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={editContent.heading || ""}
                    onChange={(e) => handleContentChange('heading', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Stakeholder Feedback on Syllabus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editContent.description || ""}
                    onChange={(e) => handleContentChange('description', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Provide your valuable feedback on our academic curriculum and syllabus."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Feedback Form URL</label>
                  <input
                    type="url"
                    value={editContent.feedbackUrl || ""}
                    onChange={(e) => handleContentChange('feedbackUrl', null, e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="https://forms.fcrit.ac.in/feedback/"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the full URL including http:// or https://</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Examinations":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h4 className="font-medium text-[#0C2340] mb-3">Preview Guidance</h4>
              <p className="text-sm text-gray-600">This section manages examination schedules, notifications, forms, and timetables.</p>
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
                    placeholder="Examinations"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Introduction Text</label>
                  <textarea
                    value={editContent.introduction || ""}
                    onChange={(e) => handleContentChange('introduction', null, e.target.value)}
                    className="w-full p-2 border rounded min-h-[120px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                    placeholder="Information about examinations, schedules, and related documents..."
                  />
                </div>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Examination Notifications
              </h4>
              
              <div className="space-y-4">
                {(editContent.notifications || []).map((notification, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Notification #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('notifications', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this notification"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Notification Title</label>
                        <input
                          type="text"
                          value={notification.title || ""}
                          onChange={(e) => handleContentChange('notifications', index, e.target.value, 'title')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., FH-2023 Exam Form for S.E. and T.E."
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notification.isNew || false}
                          onChange={(e) => handleContentChange('notifications', index, e.target.checked, 'isNew')}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-[#0C2340] focus:ring-[#0C2340]"
                        />
                        <label className="text-sm text-gray-700">Mark as NEW notification (will be highlighted)</label>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Notification Link (Optional)</label>
                        <input
                          type="url"
                          value={notification.link || ""}
                          onChange={(e) => handleContentChange('notifications', index, e.target.value, 'link')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="https://example.com/notification-details"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('notifications', { title: '', isNew: false, link: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Notification
                </button>
              </div>
            </div>
            
            {/* Forms Section */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Examination Forms
              </h4>
              
              <div className="space-y-4">
                {(editContent.forms || []).map((form, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Form #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('forms', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this form"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Form Name</label>
                        <input
                          type="text"
                          value={form.name || ""}
                          onChange={(e) => handleContentChange('forms', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., Application form for Photocopy of Answer book"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Description (Optional)</label>
                        <textarea
                          value={form.description || ""}
                          onChange={(e) => handleContentChange('forms', index, e.target.value, 'description')}
                          className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="Brief description of the form..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Form PDF</label>
                      <div className="border rounded p-4 bg-gray-100">
                        {form.fileUrl ? (
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm truncate">{form.name || `Form ${index + 1}`}</span>
                            </div>
                            <div className="flex space-x-2">
                              <a 
                                href={form.fileUrl} 
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
                                onClick={() => handleContentChange('forms', index, '', 'fileUrl')}
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
                            sectionKey={`${selectedSection}-form-${index}`}
                            fieldKey="formFile"
                            currentUrl=""
                            onUploadSuccess={(sectionKey, field, url) => handleContentChange('forms', index, url, 'fileUrl')}
                            onUploadStart={() => handleUploadInitiation(selectedSection, 'forms', true, index, 'fileUrl')}
                            isUploading={fileUploading[`${selectedSection}-forms-${index}-fileUrl`]}
                            allowedTypes={['application/pdf']}
                            label="Upload Form PDF"
                            uploadPath="uploads/academics/exams/forms"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('forms', { name: '', description: '', fileUrl: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Form
                </button>
              </div>
            </div>
            
            {/* Timetables Section will be added next */}
            
            {/* Timetables Section */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Examination Timetables
              </h4>
              
              <div className="space-y-4">
                {(editContent.timetables || []).map((timetable, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Timetable #{index + 1}</h5>
                      <button
                        onClick={() => handleRemoveItem('timetables', index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        title="Remove this timetable"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Exam Name</label>
                        <input
                          type="text"
                          value={timetable.name || ""}
                          onChange={(e) => handleContentChange('timetables', index, e.target.value, 'name')}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                          placeholder="e.g., Winter 2023 Examination Timetable"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Department/Course</label>
                          <input
                            type="text"
                            value={timetable.department || ""}
                            onChange={(e) => handleContentChange('timetables', index, e.target.value, 'department')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                            placeholder="e.g., Computer Engineering"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Semester/Year</label>
                          <input
                            type="text"
                            value={timetable.semester || ""}
                            onChange={(e) => handleContentChange('timetables', index, e.target.value, 'semester')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                            placeholder="e.g., Semester 5"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Timetable PDF</label>
                      <div className="border rounded p-4 bg-gray-100">
                        {timetable.fileUrl ? (
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm truncate">{timetable.name || `Timetable ${index + 1}`}</span>
                            </div>
                            <div className="flex space-x-2">
                              <a 
                                href={timetable.fileUrl} 
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
                                onClick={() => handleContentChange('timetables', index, '', 'fileUrl')}
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
                            sectionKey={`${selectedSection}-timetable-${index}`}
                            fieldKey="timetableFile"
                            currentUrl=""
                            onUploadSuccess={(sectionKey, field, url) => handleContentChange('timetables', index, url, 'fileUrl')}
                            onUploadStart={() => handleUploadInitiation(selectedSection, 'timetables', true, index, 'fileUrl')}
                            isUploading={fileUploading[`${selectedSection}-timetables-${index}-fileUrl`]}
                            allowedTypes={['application/pdf']}
                            label="Upload Timetable PDF"
                            uploadPath="uploads/academics/exams/timetables"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => handleAddItem('timetables', { name: '', department: '', semester: '', fileUrl: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Timetable
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        if (selectedSection === "Academic_Handbook") {
          return (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">{structure.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{structure.description}</p>
              
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
                <h4 className="font-medium text-[#0C2340] mb-2">Preview Guidance</h4>
                <p className="text-sm text-gray-600">This section allows you to manage the Academic Handbook PDFs and their descriptions.</p>
              </div>
              
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
                      placeholder="Academic Handbook"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Description</label>
                    <textarea
                      value={editContent.description || ""}
                      onChange={(e) => handleContentChange('description', null, e.target.value)}
                      className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="Access our comprehensive academic handbook to understand policies, regulations, and academic guidelines."
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                <h4 className="text-lg font-semibold text-[#0C2340] mb-4 pb-2 border-b flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Handbook Documents
                </h4>
                
                <div className="space-y-4">
                  {(editContent.handbooks || []).map((handbook, index) => (
                    <div key={index} className="p-4 border rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">Handbook #{index + 1}</h5>
                        <button
                          onClick={() => handleRemoveItem('handbooks', index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                          title="Remove this handbook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Title</label>
                          <input
                            type="text"
                            value={handbook.title || ""}
                            onChange={(e) => handleContentChange('handbooks', index, e.target.value, 'title')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                            placeholder="e.g., Academic Handbook 2023-24"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Description</label>
                          <textarea
                            value={handbook.description || ""}
                            onChange={(e) => handleContentChange('handbooks', index, e.target.value, 'description')}
                            className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                            placeholder="Short description about this handbook..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">PDF File</label>
                        <div className="border rounded p-4 bg-gray-100">
                          {handbook.fileUrl ? (
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm truncate">{handbook.title || `Handbook ${index + 1}`}</span>
                              </div>
                              <div className="flex space-x-2">
                                <a 
                                  href={handbook.fileUrl} 
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
                                  onClick={() => handleContentChange('handbooks', index, '', 'fileUrl')}
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
                              sectionKey={`${selectedSection}-handbook-${index}`}
                              fieldKey="handbookFile"
                              currentUrl=""
                              onUploadSuccess={(sectionKey, field, url) => handleContentChange('handbooks', index, url, 'fileUrl')}
                              onUploadStart={() => handleUploadInitiation(selectedSection, 'handbooks', true, index, 'fileUrl')}
                              isUploading={fileUploading[`${selectedSection}-handbooks-${index}-fileUrl`]}
                              allowedTypes={['application/pdf']}
                              label="Upload Handbook PDF"
                              uploadPath="uploads/academics/handbooks"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => handleAddItem('handbooks', { title: '', description: '', fileUrl: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-[#0C2340] hover:border-[#0C2340] transition-colors flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Handbook
                  </button>
                </div>
              </div>
            </div>
          );
        }
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
    return <div className="p-6">Please log in to manage the Academics section.</div>;
  }

  // Preview toggle button renderer
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

  // Main Component Render
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Header section */}
      <div className="bg-[#0C2340] text-white p-4 shadow-md mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Academics Management</h1>
          <p className="text-sm opacity-80">Edit and update content for the Academics section of the website</p>
        </div>
      </div>
      
      {/* Status message */}
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
      
      {/* Loading states */}
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
            // Edit Form View
            <div className="max-w-5xl mx-auto my-6">
              {/* Breadcrumb navigation */}
              <div className="text-sm mb-4 text-gray-600 flex items-center">
                <span className="cursor-pointer hover:text-[#0C2340]" onClick={() => setSelectedSection(null)}>
                  Academics
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-[#0C2340]">{selectedSection.replace(/_/g, ' ')}</span>
              </div>
              
              {/* Section header */}
              <div className="bg-white rounded-t-lg shadow-md p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-[#0C2340]">
                  {sectionStructures[selectedSection]?.title || selectedSection.replace(/_/g, ' ')}
                </h1>
                <p className="text-gray-600 mt-2">
                  {sectionStructures[selectedSection]?.description || `Edit the content for the ${selectedSection.replace(/_/g, ' ')} section.`}
                </p>
              </div>
              
              {/* Preview toggle */}
              {renderPreviewToggle()}
              
              {/* Form content or Preview content */}
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
            // Initial Welcome View
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AcademicsAdmin; 
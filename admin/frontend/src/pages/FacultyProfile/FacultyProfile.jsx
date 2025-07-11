import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const FacultyProfile = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (facultyId) {
      fetchFacultyDetails();
    }
  }, [facultyId]);

  const fetchFacultyDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/faculty/profile/${facultyId}`
      );
      if (response.data.success) {
        setFaculty(response.data.data);
      }
    } catch (err) {
      console.error("Error loading faculty details:", err);
      toast.error("Error fetching faculty details");
      navigate(-1); // Go back if faculty not found
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tabs = [
    { id: "basic", label: "Basic Information", icon: "👤" },
    { id: "online-profiles", label: "Online Profiles", icon: "🌐" },
    { id: "specializations", label: "Specializations", icon: "🎯" },
    { id: "subjects", label: "Subjects Taught", icon: "📚" },
    { id: "papers", label: "Papers Presented", icon: "📄" },
    { id: "research", label: "Research Projects", icon: "🔬" },
  ];

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading faculty profile...</p>
        </div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Faculty Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderBasicInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Faculty Image */}
        <div className="lg:w-1/3">
          <div className="text-center">
            <img
              src={
                faculty.image && faculty.image !== "/img/no_user.jpg"
                  ? `http://localhost:3663${faculty.image}`
                  : "/default-avatar.png"
              }
              alt={faculty.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 mx-auto mb-4"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                faculty.teaching_staff
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {faculty.teaching_staff ? "Teaching Staff" : "Supporting Staff"}
            </span>
          </div>
        </div>

        {/* Faculty Details */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{faculty.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Qualification</h3>
              <p className="text-gray-600">{faculty.qualification}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Designation</h3>
              <p className="text-gray-600">{faculty.designation}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Email Address</h3>
              <p className="text-blue-600 hover:text-blue-800">
                <a href={`mailto:${faculty.email_address}`}>{faculty.email_address}</a>
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Date of Joining</h3>
              <p className="text-gray-600">{formatDate(faculty.joining_date)}</p>
            </div>
          </div>

          {/* Resume and Publications */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {faculty.resumes && faculty.resumes.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Resume</h3>
                {faculty.resumes.map((resume, index) => (
                  <a
                    key={resume.id}
                    href={`http://localhost:3663${resume.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    Resume {index + 1}
                  </a>
                ))}
              </div>
            )}

            {faculty.publications && faculty.publications.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Publications</h3>
                {faculty.publications.map((publication, index) => (
                  <a
                    key={publication.id}
                    href={`http://localhost:3663${publication.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 underline block"
                  >
                    Publication {index + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOnlineProfiles = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Online Profiles</h2>
      {faculty.online_profiles && faculty.online_profiles.length > 0 ? (
        <div className="space-y-4">
          {faculty.online_profiles.map((profile) => (
            <div key={profile.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{profile.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Added on: {formatDate(profile.created_timestamp)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No online profiles available.</p>
      )}
    </div>
  );

  const renderSpecializations = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Areas of Specialization</h2>
      {faculty.specializations && faculty.specializations.length > 0 ? (
        <div className="space-y-4">
          {faculty.specializations.map((specialization) => (
            <div key={specialization.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{specialization.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Added on: {formatDate(specialization.created_timestamp)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No specializations available.</p>
      )}
    </div>
  );

  const renderSubjects = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Subjects Taught</h2>
      {faculty.subjects && faculty.subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculty.subjects.map((subject) => (
            <div key={subject.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
              <p className="text-sm text-gray-600">Type: {subject.type}</p>
              <p className="text-sm text-gray-600">Semester: {subject.semester}</p>
              <p className="text-xs text-gray-500 mt-2">
                Added on: {formatDate(subject.created_timestamp)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No subjects available.</p>
      )}
    </div>
  );

  const renderPapers = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Papers Presented</h2>
      {faculty.papers && faculty.papers.length > 0 ? (
        <div className="space-y-4">
          {faculty.papers.map((paper) => (
            <div key={paper.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{paper.title}</h3>
              <p className="text-gray-700 mb-2">{paper.description}</p>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View Paper
                </a>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Added on: {formatDate(paper.created_timestamp)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No papers available.</p>
      )}
    </div>
  );

  const renderResearch = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Research Projects</h2>
      {faculty.researches && faculty.researches.length > 0 ? (
        <div className="space-y-4">
          {faculty.researches.map((research) => (
            <div key={research.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{research.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Grant Type:</span> {research.grant_type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Funding Organization:</span> {research.funding_organization}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Amount:</span> {research.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Duration:</span> {research.duration}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Added on: {formatDate(research.created_timestamp)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No research projects available.</p>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo();
      case "online-profiles":
        return renderOnlineProfiles();
      case "specializations":
        return renderSpecializations();
      case "subjects":
        return renderSubjects();
      case "papers":
        return renderPapers();
      case "research":
        return renderResearch();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header with back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Faculty Profile</h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default FacultyProfile; 
import React, { useState, useEffect } from "react";
// import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    photo: null,
    name: "John Doe",
    qualification: "Ph.D. in Computer Science",
    designation: "Associate Professor",
    email: "johndoe@university.edu",
    dateOfJoining: "2010-08-15",
    bioData: null,
    publications: null,
    onlineProfiles: ["https://www.linkedin.com/in/johndoe"],
    specializations: ["Machine Learning", "Data Science"],
    subjects: [
      { subjectTaught: "Machine Learning", type: "Theory", semester: "5th" },
      { subjectTaught: "Data Structures", type: "Practical", semester: "3rd" },
    ],
    papers: [
      {
        title: "Deep Learning for Computer Vision",
        description: "An introduction to deep learning models",
        link: "https://example.com/paper1",
      },
    ],
    researches: [
      {
        title: "AI-based Educational Tools",
        grant_type: "Government",
        funding_organization: "AI Research Fund",
        amount: "500,000 USD",
        duration: "3 years",
      },
    ],
  });

  useEffect(() => {
    // Mocking the profile data. You can fetch the real data here if needed
    console.log("Fetched profile:", profile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start p-8 border-b border-gray-200">
          <img
            src={
              profile.photo
                ? typeof profile.photo === "string" &&
                  profile.photo.startsWith("http")
                  ? profile.photo
                  : `http://localhost:3663${profile.photo}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 mb-4 sm:mb-0 sm:mr-6 transition-transform duration-300 hover:scale-105"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-semibold text-gray-900">
              {profile.name}
            </h2>
            <p className="text-lg text-gray-600">{profile.designation}</p>
            <p className="text-md text-gray-500">{profile.qualification}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Date of Joining
              </p>
              <p className="text-gray-900">{profile.dateOfJoining}</p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Academic Details
          </h3>
          <div className="space-y-6">
            {/* Bio-Data */}
            <div>
              <p className="text-sm font-medium text-gray-500">Bio-Data</p>
              {profile.bioData ? (
                <a
                  href={`http://localhost:3663${profile.bioData}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View Bio-Data
                </a>
              ) : (
                <p className="text-gray-500 text-sm">No Bio-Data available</p>
              )}
            </div>

            {/* Publications */}
            <div>
              <p className="text-sm font-medium text-gray-500">Publications</p>
              {profile.publications ? (
                <a
                  href={`http://localhost:3663${profile.publications}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View Publications
                </a>
              ) : (
                <p className="text-gray-500 text-sm">
                  No Publications available
                </p>
              )}
            </div>

            {/* Online Profiles */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Online Profiles
              </p>
              {profile.onlineProfiles.length > 0 ? (
                profile.onlineProfiles.map((onlineProfile, index) => (
                  <a
                    key={index}
                    href={onlineProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 block text-sm"
                  >
                    {onlineProfile}
                  </a>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No profiles available</p>
              )}
            </div>

            {/* Specializations */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Areas of Specialization
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.specializations.length > 0 ? (
                  profile.specializations.map((specialization, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {specialization}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No specializations listed
                  </p>
                )}
              </div>
            </div>

            {/* Subjects Taught */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Subjects Taught
              </p>
              {profile.subjects.length > 0 ? (
                profile.subjects.map((subject, index) => (
                  <p key={index} className="text-gray-900 text-sm">
                    {subject.subjectTaught} ({subject.type}, Semester:{" "}
                    {subject.semester})
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No subjects listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Papers Presented Section */}
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Papers Presented
          </h3>
          {profile.papers.length > 0 ? (
            profile.papers.map((paper, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-50 rounded-lg transition-shadow duration-200 hover:shadow-md"
              >
                <p className="text-lg font-medium text-gray-900">
                  {paper.title}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {paper.description}
                </p>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block transition-colors duration-200"
                  >
                    View Paper
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No papers presented</p>
          )}
        </div>

        {/* Research Projects Section */}
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Research Projects
          </h3>
          {profile.researches.length > 0 ? (
            profile.researches.map((research, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-50 rounded-lg transition-shadow duration-200 hover:shadow-md"
              >
                <p className="text-lg font-medium text-gray-900">
                  {research.title}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {research.grant_type} Grant, {research.funding_organization},{" "}
                  {research.amount}, {research.duration}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No research projects listed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

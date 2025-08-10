import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    photo: null,
    name: "",
    qualification: "",
    designation: "",
    email: "",
    dateOfJoining: "",
    bioData: null,
    publications: null,
    onlineProfiles: [],
    specializations: [],
    subjects: [],
    papers: [],
    researches: [],
  });
  const [activeTab, setActiveTab] = useState("specializations"); // Default to first tab

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/profile/${id}`
      );
      console.log("Fetched profile:", response.data);
      setProfile(response.data);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  const tabs = [
    { id: "specializations", label: "Areas of Specialization" },
    { id: "subjects", label: "Subjects Taught" },
    { id: "papers", label: "Papers Presented" },
    { id: "researches", label: "Research Projects" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto border-2 border-gray-300 rounded-xl shadow-sm overflow-hidden">
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
              {profile.name || "Unknown Faculty"}
            </h2>
            <p className="text-lg text-gray-600">
              {profile.designation || "No Designation"}
            </p>
            <p className="text-md text-gray-500">
              {profile.qualification || "No Qualification"}
            </p>
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
              <p className="text-gray-900 text-sm">
                {profile.email || "No Email Provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Date of Joining
              </p>
              <p className="text-gray-900 text-sm">
                {profile.dateOfJoining
                  ? profile.dateOfJoining.split("T")[0]
                  : "Not Specified"}
              </p>
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
              <p className="text-sm">
                {profile.bioData ? (
                  <a
                    href={`${profile.bioData}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    View Bio-Data
                  </a>
                ) : (
                  <span className="text-gray-500">No Bio-Data available</span>
                )}
              </p>
            </div>

            {/* Publications */}
            <div>
              <p className="text-sm font-medium text-gray-500">Publications</p>
              <p className="text-sm">
                {profile.publications ? (
                  <a
                    href={`${profile.publications}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    View Publications
                  </a>
                ) : (
                  <span className="text-gray-500">
                    No Publications available
                  </span>
                )}
              </p>
            </div>

            {/* Online Profiles */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Online Profiles
              </p>
              {profile.onlineProfiles.length > 0 ? (
                profile.onlineProfiles.map((profile) => (
                  <a
                    key={profile.id}
                    href={profile.onlineProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm block transition-colors duration-200"
                  >
                    {profile.onlineProfile}
                  </a>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No profiles available</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs for Specializations, Subjects, Papers, Research */}
        <div className="p-8 border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-gray-50"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "specializations" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specializations
                </h3>

                {profile.specializations.length > 0 ? (
                  <div
                    className="overflow-x-auto"
                    dangerouslySetInnerHTML={{
                      __html: `
                  ${profile.specializations.map(
                    (spec, index) => `${spec.areasOfSpecialization}
                    `
                  )}
            `,
                    }}
                  ></div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No specializations listed
                  </p>
                )}
              </div>
            )}

            {activeTab === "subjects" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subjects Taught
                </h3>
                {profile.subjects.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Semester
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.subjects.map((subject) => (
                        <tr
                          key={subject.id}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.subjectTaught}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.type}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.semester}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">No subjects listed</p>
                )}
              </div>
            )}

            {activeTab === "papers" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Papers Presented
                </h3>
                {profile.papers.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Description
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.papers.map((paper) => (
                        <tr key={paper.id} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {paper.title}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {paper.papersPresented ||
                              paper.description ||
                              "No description"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {paper.link ? (
                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                View Paper
                              </a>
                            ) : (
                              <span className="text-gray-500">No link</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">No papers presented</p>
                )}
              </div>
            )}

            {activeTab === "researches" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Research Projects
                </h3>
                {profile.researches.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Grant Type
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Funding Organization
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Amount
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.researches.map((research) => (
                        <tr
                          key={research.id}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.title}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.grant_type}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.funding_organization}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.amount}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No research projects listed
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

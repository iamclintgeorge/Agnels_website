import React, { useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    photo: "",
    name: "John Doe",
    qualification: "",
    designation: "",
    email: "",
    dateOfJoining: "",
    bioData: "",
    publications: "",
    onlineProfile: "",
    areasOfSpecialization: "",
    subjectTaught: "",
    papersPresented: "",
    researchProjects: "",
  });

  const [isEditing, setIsEditing] = useState({
    qualification: false,
    designation: false,
    email: false,
    dateOfJoining: false,
    bioData: false,
    publications: false,
    onlineProfile: false,
    areasOfSpecialization: false,
    subjectTaught: false,
    papersPresented: false,
    researchProjects: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: file,
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSave = () => {
    alert("Profile saved!");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl">
      <div className="flex items-center justify-center mb-6">
        <img
          src={
            profile.photo
              ? URL.createObjectURL(profile.photo)
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
        />
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Qualification:</label>
            <div className="flex items-center">
              {isEditing.qualification ? (
                <input
                  type="text"
                  name="qualification"
                  value={profile.qualification}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.qualification || "Enter Qualification"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("qualification")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.qualification ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Designation:</label>
            <div className="flex items-center">
              {isEditing.designation ? (
                <input
                  type="text"
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.designation || "Enter Designation"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("designation")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.designation ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Email-Id:</label>
            <div className="flex items-center">
              {isEditing.email ? (
                <input
                  type="text"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.email || "Enter Email ID"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("email")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.email ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Date of Joining:</label>
            <div className="flex items-center">
              {isEditing.dateOfJoining ? (
                <input
                  type="date"
                  name="dateOfJoining"
                  value={profile.dateOfJoining}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.dateOfJoining || "Select Date"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("dateOfJoining")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.dateOfJoining ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Photo:</label>
            <div className="flex items-center">
              {isEditing.photo ? (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "photo")}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.photo ? "Change Photo" : "Upload Photo"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("photo")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.photo ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Academic Details
        </h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Bio-Data (PDF):</label>
            <div className="flex items-center">
              {isEditing.bioData ? (
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, "bioData")}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.bioData ? "Change Bio-Data" : "Upload Bio-Data"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("bioData")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.bioData ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Publications (PDF):</label>
            <div className="flex items-center">
              {isEditing.publications ? (
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, "publications")}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.publications
                    ? "Change Publications"
                    : "Upload Publications"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("publications")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.publications ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Online Profile (Link):</label>
            <div className="flex items-center">
              {isEditing.onlineProfile ? (
                <input
                  type="url"
                  name="onlineProfile"
                  value={profile.onlineProfile}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.onlineProfile || "Enter Link to Online Profile"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("onlineProfile")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.onlineProfile ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">
              Areas of Specialization:
            </label>
            <div className="flex items-center">
              {isEditing.areasOfSpecialization ? (
                <input
                  type="text"
                  name="areasOfSpecialization"
                  value={profile.areasOfSpecialization}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.areasOfSpecialization ||
                    "Enter Areas of Specialization"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("areasOfSpecialization")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.areasOfSpecialization ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Subject Taught:</label>
            <div className="flex items-center">
              {isEditing.subjectTaught ? (
                <input
                  type="text"
                  name="subjectTaught"
                  value={profile.subjectTaught}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.subjectTaught || "Enter Subject Taught"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("subjectTaught")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.subjectTaught ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Papers Presented:</label>
            <div className="flex items-center">
              {isEditing.papersPresented ? (
                <input
                  type="text"
                  name="papersPresented"
                  value={profile.papersPresented}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.papersPresented || "Enter Papers Presented"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("papersPresented")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.papersPresented ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-600 w-48">Research Projects:</label>
            <div className="flex items-center">
              {isEditing.researchProjects ? (
                <input
                  type="text"
                  name="researchProjects"
                  value={profile.researchProjects}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.researchProjects || "Enter Research Projects"}
                </p>
              )}
              <button
                onClick={() => toggleEdit("researchProjects")}
                className="ml-4 text-blue-600 hover:underline"
              >
                {isEditing.researchProjects ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

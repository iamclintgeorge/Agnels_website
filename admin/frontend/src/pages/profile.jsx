import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../services/useAuthCheck";

const ProfilePage = () => {
  const { user } = useAuth();
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

  const [isEditing, setIsEditing] = useState({
    qualification: false,
    designation: false,
    email: false,
    dateOfJoining: false,
    photo: false,
    bioData: false,
    publications: false,
  });

  const [newEntry, setNewEntry] = useState({
    onlineProfile: "",
    areasOfSpecialization: "",
    subjectTaught: { subject: "", type: "", semester: "" },
    papersPresented: { title: "", description: "", link: "" },
    researchProjects: {
      title: "",
      grant_type: "",
      funding_organization: "",
      amount: "",
      duration: "",
    },
  });

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/profile/${user.id}`
      );
      console.log("Fetched profile:", response.data);
      setProfile(response.data);
    } catch (error) {
      console.error("Fetch profile error:", error);
      toast.error("Error fetching profile");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name}: ${value}`); // Debug input changes
    setProfile((prev) => ({
      ...prev,
      [name]: name === "dateOfJoining" ? value : value, // Ensure date is stored as-is
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setProfile((prev) => ({ ...prev, [field]: file }));
  };

  const handleNewEntryChange = (e, field, subField = null) => {
    const { name, value } = e.target;
    if (subField) {
      setNewEntry((prev) => ({
        ...prev,
        [field]: { ...prev[field], [name]: value },
      }));
    } else {
      setNewEntry((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const saveField = async (field) => {
    const formData = new FormData();

    // Format dateOfJoining to YYYY-MM-DD
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toISOString().split("T")[0]; // e.g., '1997-07-01'
    };

    // Define all required fields
    const requiredFields = {
      name: profile.name || "",
      qualification: profile.qualification || "",
      designation: profile.designation || "",
      email: profile.email || "",
      dateOfJoining: formatDate(profile.dateOfJoining),
    };

    // If the updated field is a required field, use the new value
    if (Object.keys(requiredFields).includes(field)) {
      requiredFields[field] =
        field === "dateOfJoining"
          ? formatDate(profile[field])
          : profile[field] || "";
    }

    // Append all required fields
    Object.entries(requiredFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append file fields if updated
    if (
      ["photo", "bioData", "publications"].includes(field) &&
      profile[field]
    ) {
      formData.append(field, profile[field]);
    }

    // Debug FormData contents
    console.log("FormData entries:", [...formData.entries()]);

    try {
      await axios.put(
        `http://localhost:3663/api/profile/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(`${field} updated successfully`);
      toggleEdit(field);
      fetchProfile();
    } catch (error) {
      console.error(`Update ${field} error:`, error);
      toast.error(`Error updating ${field}`);
    }
  };

  const addEntry = async (field, endpoint, data) => {
    try {
      await axios.post(
        `http://localhost:3663/api/profile/${user.id}/${endpoint}`,
        data
      );
      toast.success(`${field} added successfully`);
      setNewEntry((prev) => ({
        ...prev,
        [field]:
          field === "subjectTaught" ||
          field === "papersPresented" ||
          field === "researchProjects"
            ? {
                subject: "",
                type: "",
                semester: "",
                title: "",
                description: "",
                link: "",
                grant_type: "",
                funding_organization: "",
                amount: "",
                duration: "",
              }
            : "",
      }));
      fetchProfile();
    } catch (error) {
      console.error(`Add ${field} error:`, error);
      toast.error(`Error adding ${field}`);
    }
  };

  const deleteEntry = async (field, entryId, endpoint) => {
    if (!window.confirm(`Are you sure you want to delete this ${field}?`))
      return;
    try {
      await axios.delete(
        `http://localhost:3663/api/profile/${user.id}/${endpoint}/${entryId}`
      );
      toast.success(`${field} deleted successfully`);
      fetchProfile();
    } catch (error) {
      console.error(`Delete ${field} error:`, error);
      toast.error(`Error deleting ${field}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center mb-6">
        <img
          src={
            profile.photo
              ? typeof profile.photo === "string" &&
                profile.photo.startsWith("http")
                ? profile.photo
                : `http://localhost:3663${profile.photo}`
              : undefined
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mr-6 bg-black"
        />

        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold">{profile.name}</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Qualification:</label>
          {isEditing.qualification ? (
            <input
              type="text"
              name="qualification"
              value={profile.qualification}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{profile.qualification || "Enter Qualification"}</p>
          )}
          <button
            onClick={() =>
              isEditing.qualification
                ? saveField("qualification")
                : toggleEdit("qualification")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.qualification ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Designation:</label>
          {isEditing.designation ? (
            <input
              type="text"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{profile.designation || "Enter Designation"}</p>
          )}
          <button
            onClick={() =>
              isEditing.designation
                ? saveField("designation")
                : toggleEdit("designation")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.designation ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email-Id:</label>
          {isEditing.email ? (
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{profile.email || "Enter Email ID"}</p>
          )}
          <button
            onClick={() =>
              isEditing.email ? saveField("email") : toggleEdit("email")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.email ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date of Joining:</label>
          {isEditing.dateOfJoining ? (
            <input
              type="date"
              name="dateOfJoining"
              value={
                profile.dateOfJoining ? profile.dateOfJoining.split("T")[0] : ""
              }
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{profile.dateOfJoining || "Select Date"}</p>
          )}
          <button
            onClick={() =>
              isEditing.dateOfJoining
                ? saveField("dateOfJoining")
                : toggleEdit("dateOfJoining")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.dateOfJoining ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Photo:</label>
          {isEditing.photo ? (
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => handleFileChange(e, "photo")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>{profile.photo ? "Change Photo" : "Upload Photo"}</p>
          )}
          <button
            onClick={() =>
              isEditing.photo ? saveField("photo") : toggleEdit("photo")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.photo ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Academic Details</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Bio-Data (PDF):</label>
          {isEditing.bioData ? (
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "bioData")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>
              {profile.bioData ? (
                <a
                  href={`http://localhost:3663${profile.bioData}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Bio-Data
                </a>
              ) : (
                "Upload Bio-Data"
              )}
            </p>
          )}
          <button
            onClick={() =>
              isEditing.bioData ? saveField("bioData") : toggleEdit("bioData")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.bioData ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Publications (PDF):</label>
          {isEditing.publications ? (
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "publications")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <p>
              {profile.publications ? (
                <a
                  href={`http://localhost:3663${profile.publications}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Publications
                </a>
              ) : (
                "Upload Publications"
              )}
            </p>
          )}
          <button
            onClick={() =>
              isEditing.publications
                ? saveField("publications")
                : toggleEdit("publications")
            }
            className="text-blue-500 mt-2"
          >
            {isEditing.publications ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Online Profiles:</label>
          {profile.onlineProfiles.map((profile) => (
            <div
              key={profile.id}
              className="flex justify-between items-center mb-2"
            >
              <a
                href={profile.onlineProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {profile.onlineProfile}
              </a>
              <button
                onClick={() =>
                  deleteEntry("Online Profile", profile.id, "online-profile")
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <input
            type="url"
            name="onlineProfile"
            value={newEntry.onlineProfile}
            onChange={(e) => handleNewEntryChange(e, "onlineProfile")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Online Profile Link"
          />
          <button
            onClick={() =>
              addEntry("Online Profile", "online-profile", {
                description: newEntry.onlineProfile,
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Online Profile
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Areas of Specialization:
          </label>
          {profile.specializations.map((spec) => (
            <div
              key={spec.id}
              className="flex justify-between items-center mb-2"
            >
              <p>{spec.areasOfSpecialization}</p>
              <button
                onClick={() =>
                  deleteEntry("Specialization", spec.id, "specialization")
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <input
            type="text"
            name="areasOfSpecialization"
            value={newEntry.areasOfSpecialization}
            onChange={(e) => handleNewEntryChange(e, "areasOfSpecialization")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Specialization"
          />
          <button
            onClick={() =>
              addEntry("Areas of Specialization", "specialization", {
                description: newEntry.areasOfSpecialization,
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Specialization
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Subjects Taught:</label>
          {profile.subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex justify-between items-center mb-2"
            >
              <p>
                {subject.subjectTaught} ({subject.type}, Semester:{" "}
                {subject.semester})
              </p>
              <button
                onClick={() => deleteEntry("Subject", subject.id, "subject")}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <input
            type="text"
            name="subject"
            value={newEntry.subjectTaught.subject}
            onChange={(e) =>
              handleNewEntryChange(e, "subjectTaught", "subject")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Subject"
          />
          <input
            type="text"
            name="type"
            value={newEntry.subjectTaught.type}
            onChange={(e) => handleNewEntryChange(e, "subjectTaught", "type")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Type (e.g., Theory, Practical)"
          />
          <input
            type="text"
            name="semester"
            value={newEntry.subjectTaught.semester}
            onChange={(e) =>
              handleNewEntryChange(e, "subjectTaught", "semester")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Semester"
          />
          <button
            onClick={() =>
              addEntry("Subject Taught", "subject", newEntry.subjectTaught)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Subject
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Papers Presented:</label>
          {profile.papers.map((paper) => (
            <div
              key={paper.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p>{paper.title}</p>
                <p className="text-sm text-gray-600">{paper.papersPresented}</p>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View Link
                  </a>
                )}
              </div>
              <button
                onClick={() => deleteEntry("Paper", paper.id, "paper")}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <input
            type="text"
            name="title"
            value={newEntry.papersPresented.title}
            onChange={(e) =>
              handleNewEntryChange(e, "papersPresented", "title")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Paper Title"
          />
          <input
            type="text"
            name="description"
            value={newEntry.papersPresented.description}
            onChange={(e) =>
              handleNewEntryChange(e, "papersPresented", "description")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Paper Description"
          />
          <input
            type="url"
            name="link"
            value={newEntry.papersPresented.link}
            onChange={(e) => handleNewEntryChange(e, "papersPresented", "link")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Paper Link (optional)"
          />
          <button
            onClick={() =>
              addEntry("Paper Presented", "paper", newEntry.papersPresented)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Paper
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Research Projects:</label>
          {profile.researches.map((research) => (
            <div
              key={research.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p>{research.title}</p>
                <p className="text-sm text-gray-600">
                  {research.grant_type}, {research.funding_organization},{" "}
                  {research.amount}, {research.duration}
                </p>
              </div>
              <button
                onClick={() =>
                  deleteEntry("Research Project", research.id, "research")
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <input
            type="text"
            name="title"
            value={newEntry.researchProjects.title}
            onChange={(e) =>
              handleNewEntryChange(e, "researchProjects", "title")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Project Title"
          />
          <input
            type="text"
            name="grant_type"
            value={newEntry.researchProjects.grant_type}
            onChange={(e) =>
              handleNewEntryChange(e, "researchProjects", "grant_type")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Grant Type"
          />
          <input
            type="text"
            name="funding_organization"
            value={newEntry.researchProjects.funding_organization}
            onChange={(e) =>
              handleNewEntryChange(
                e,
                "researchProjects",
                "funding_organization"
              )
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Funding Organization"
          />
          <input
            type="text"
            name="amount"
            value={newEntry.researchProjects.amount}
            onChange={(e) =>
              handleNewEntryChange(e, "researchProjects", "amount")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Amount"
          />
          <input
            type="text"
            name="duration"
            value={newEntry.researchProjects.duration}
            onChange={(e) =>
              handleNewEntryChange(e, "researchProjects", "duration")
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter Duration"
          />
          <button
            onClick={() =>
              addEntry(
                "Research Project",
                "research",
                newEntry.researchProjects
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Research Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

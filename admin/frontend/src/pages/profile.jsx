import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../services/useAuthCheck";
import { HiPencil, HiCheck, HiChevronDown, HiChevronUp } from "react-icons/hi";

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

  const [editingEntry, setEditingEntry] = useState({
    onlineProfile: null,
    areasOfSpecialization: null,
    subjectTaught: null,
    papersPresented: null,
    researchProjects: null,
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

  const [openSections, setOpenSections] = useState({
    onlineProfiles: false,
    specializations: false,
    subjects: false,
    papers: false,
    researches: false,
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
    setProfile((prev) => ({ ...prev, [name]: value }));
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

  const handleEditEntryChange = (e, field, subField = null) => {
    const { name, value } = e.target;
    if (subField) {
      setEditingEntry((prev) => ({
        ...prev,
        [field]: { ...prev[field], [name]: value },
      }));
    } else {
      setEditingEntry((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleEditEntry = (section, item) => {
    setEditingEntry((prev) => ({
      ...prev,
      [section]: prev[section]?.id === item.id ? null : item,
    }));
  };

  const saveField = async (field) => {
    const formData = new FormData();
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    };

    const requiredFields = {
      name: profile.name || "",
      qualification: profile.qualification || "",
      designation: profile.designation || "",
      email: profile.email || "",
      dateOfJoining: formatDate(profile.dateOfJoining),
    };

    if (Object.keys(requiredFields).includes(field)) {
      requiredFields[field] =
        field === "dateOfJoining"
          ? formatDate(profile[field])
          : profile[field] || "";
    }

    Object.entries(requiredFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (
      ["photo", "bioData", "publications"].includes(field) &&
      profile[field]
    ) {
      formData.append(field, profile[field]);
    }

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

  const updateEntry = async (field, endpoint, data, entryId) => {
    try {
      await axios.put(
        `http://localhost:3663/api/profile/${user.id}/${endpoint}/${entryId}`,
        data
      );
      toast.success(`${field} updated successfully`);
      setEditingEntry((prev) => ({ ...prev, [field]: null }));
      fetchProfile();
    } catch (error) {
      console.error(`Update ${field} error:`, error);
      toast.error(`Error updating ${field}`);
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
    <div className="min-h-screen py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto overflow-hidden font-inter">
        <div className="p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={
                    profile.photo
                      ? typeof profile.photo === "string" &&
                        profile.photo.startsWith("http")
                        ? profile.photo
                        : `http://localhost:3663${profile.photo}`
                      : "https://via.placeholder.com/144?text=Profile"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing.photo && (
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleFileChange(e, "photo")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2">
                <button
                  onClick={() =>
                    isEditing.photo ? saveField("photo") : toggleEdit("photo")
                  }
                  className={`rounded-full p-2 shadow-lg transition-colors duration-200 ${
                    isEditing.photo
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  aria-label={isEditing.photo ? "Save Photo" : "Edit Photo"}
                >
                  {isEditing.photo ? (
                    <HiCheck className="w-5 h-5" />
                  ) : (
                    <HiPencil className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl mt-5 font-inter font-semibold text-gray-900">
                {profile.name || "User Profile"}
              </h2>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8 border-2 border-gray-300 p-6 rounded-lg">
            <h3 className="text-2xl font-playfair font-medium text-gray-900 mb-6 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "qualification", label: "Qualification" },
                { field: "designation", label: "Designation" },
                { field: "email", label: "Email" },
                {
                  field: "dateOfJoining",
                  label: "Date of Joining",
                  type: "date",
                },
              ].map(({ field, label, type }) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  {isEditing[field] ? (
                    <input
                      type={type || "text"}
                      name={field}
                      value={
                        field === "dateOfJoining" && profile[field]
                          ? profile[field].split("T")[0]
                          : profile[field] || ""
                      }
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      placeholder={`Enter ${label}`}
                    />
                  ) : (
                    <p className="text-sm text-gray-700 p-3 bg-white rounded-md border border-gray-200">
                      {profile[field] || `No ${label.toLowerCase()} provided`}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      isEditing[field] ? saveField(field) : toggleEdit(field)
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 transition-colors duration-200 flex items-center"
                  >
                    {isEditing[field] ? (
                      <>
                        <HiCheck className="mr-1" /> Save
                      </>
                    ) : (
                      <>
                        <HiPencil className="mr-1" /> Edit
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Details */}
          <div className="mb-8 border-2 border-gray-300 p-6 rounded-lg">
            <h3 className="text-2xl font-playfair font-medium text-gray-900 mb-6 border-b pb-2">
              Academic Details
            </h3>
            <div className="space-y-6">
              {[
                {
                  field: "bioData",
                  label: "Bio-Data (PDF)",
                  type: "file",
                  accept: "application/pdf",
                  render: (data) =>
                    data ? (
                      <a
                        href={`${data}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        View Bio-Data
                      </a>
                    ) : (
                      "No bio-data uploaded"
                    ),
                },
                {
                  field: "publications",
                  label: "Publications (PDF)",
                  type: "file",
                  accept: "application/pdf",
                  render: (data) =>
                    data ? (
                      <a
                        href={`${data}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        View Publications
                      </a>
                    ) : (
                      "No publications uploaded"
                    ),
                },
              ].map(({ field, label, type, accept, render }) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  {isEditing[field] ? (
                    <input
                      type={type}
                      accept={accept}
                      onChange={(e) => handleFileChange(e, field)}
                      className="p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 p-3 bg-white rounded-md border border-gray-200">
                      {render(profile[field])}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      isEditing[field] ? saveField(field) : toggleEdit(field)
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 transition-colors duration-200 flex items-center"
                  >
                    {isEditing[field] ? (
                      <>
                        <HiCheck className="mr-1" /> Save
                      </>
                    ) : (
                      <>
                        <HiPencil className="mr-1" /> Edit
                      </>
                    )}
                  </button>
                </div>
              ))}

              {/* Accordion Sections */}
              {[
                {
                  section: "onlineProfiles",
                  label: "Online Profiles",
                  endpoint: "online-profile",
                  data: profile.onlineProfiles,
                  input: (item) => (
                    <input
                      type="url"
                      name="onlineProfile"
                      value={item ? item.onlineProfile : newEntry.onlineProfile}
                      onChange={(e) =>
                        item
                          ? handleEditEntryChange(e, "onlineProfile")
                          : handleNewEntryChange(e, "onlineProfile")
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      placeholder="Enter online profile link"
                    />
                  ),
                  addButton: (
                    <button
                      onClick={() =>
                        addEntry("Online Profile", "online-profile", {
                          description: newEntry.onlineProfile,
                        })
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Add Online Profile
                    </button>
                  ),
                  updateButton: (item) => (
                    <button
                      onClick={() =>
                        updateEntry(
                          "Online Profile",
                          "online-profile",
                          {
                            description:
                              editingEntry.onlineProfile.onlineProfile,
                          },
                          item.id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Save
                    </button>
                  ),
                  renderItem: (item) =>
                    editingEntry.onlineProfile?.id === item.id ? (
                      <div className="space-y-4 bg-white p-4 rounded-md">
                        {this.input(item)}
                        <div className="flex space-x-4">
                          {this.updateButton(item)}
                          <button
                            onClick={() =>
                              toggleEditEntry("onlineProfile", item)
                            }
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-white p-4 rounded-md">
                        <a
                          href={item.onlineProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {item.onlineProfile}
                        </a>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleEditEntry("onlineProfile", item)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                          >
                            <HiPencil className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteEntry(
                                "Online Profile",
                                item.id,
                                "online-profile"
                              )
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                },
                {
                  section: "specializations",
                  label: "Areas of Specialization",
                  endpoint: "specialization",
                  data: profile.specializations,
                  input: (item) => (
                    <input
                      type="text"
                      name="areasOfSpecialization"
                      value={
                        item
                          ? item.areasOfSpecialization
                          : newEntry.areasOfSpecialization
                      }
                      onChange={(e) =>
                        item
                          ? handleEditEntryChange(e, "areasOfSpecialization")
                          : handleNewEntryChange(e, "areasOfSpecialization")
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      placeholder="Enter specialization"
                    />
                  ),
                  addButton: (
                    <button
                      onClick={() =>
                        addEntry("Areas of Specialization", "specialization", {
                          description: newEntry.areasOfSpecialization,
                        })
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Add Specialization
                    </button>
                  ),
                  updateButton: (item) => (
                    <button
                      onClick={() =>
                        updateEntry(
                          "Areas of Specialization",
                          "specialization",
                          {
                            description:
                              editingEntry.areasOfSpecialization
                                .areasOfSpecialization,
                          },
                          item.id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Save
                    </button>
                  ),
                  renderItem: (item) =>
                    editingEntry.areasOfSpecialization?.id === item.id ? (
                      <div className="space-y-4 bg-white p-4 rounded-md">
                        {this.input(item)}
                        <div className="flex space-x-4">
                          {this.updateButton(item)}
                          <button
                            onClick={() =>
                              toggleEditEntry("areasOfSpecialization", item)
                            }
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-white p-4 rounded-md">
                        <p className="text-sm text-gray-700">
                          {item.areasOfSpecialization}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleEditEntry("areasOfSpecialization", item)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                          >
                            <HiPencil className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteEntry(
                                "Specialization",
                                item.id,
                                "specialization"
                              )
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                },
                {
                  section: "subjects",
                  label: "Subjects Taught",
                  endpoint: "subject",
                  data: profile.subjects,
                  input: (item) => (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="subject"
                        value={
                          item
                            ? item.subjectTaught
                            : newEntry.subjectTaught.subject
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "subjectTaught",
                                "subject"
                              )
                            : handleNewEntryChange(
                                e,
                                "subjectTaught",
                                "subject"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter subject"
                      />
                      <input
                        type="text"
                        name="type"
                        value={item ? item.type : newEntry.subjectTaught.type}
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(e, "subjectTaught", "type")
                            : handleNewEntryChange(e, "subjectTaught", "type")
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter type (e.g., Theory, Practical)"
                      />
                      <input
                        type="text"
                        name="semester"
                        value={
                          item ? item.semester : newEntry.subjectTaught.semester
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "subjectTaught",
                                "semester"
                              )
                            : handleNewEntryChange(
                                e,
                                "subjectTaught",
                                "semester"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter semester"
                      />
                    </div>
                  ),
                  addButton: (
                    <button
                      onClick={() =>
                        addEntry(
                          "Subject Taught",
                          "subject",
                          newEntry.subjectTaught
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Add Subject
                    </button>
                  ),
                  updateButton: (item) => (
                    <button
                      onClick={() =>
                        updateEntry(
                          "Subject Taught",
                          "subject",
                          editingEntry.subjectTaught,
                          item.id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Save
                    </button>
                  ),
                  renderItem: (item) =>
                    editingEntry.subjectTaught?.id === item.id ? (
                      <div className="space-y-4 bg-white p-4 rounded-md">
                        {this.input(item)}
                        <div className="flex space-x-4">
                          {this.updateButton(item)}
                          <button
                            onClick={() =>
                              toggleEditEntry("subjectTaught", item)
                            }
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-white p-4 rounded-md">
                        <p className="text-sm text-gray-700">
                          {item.subjectTaught} ({item.type}, Semester:{" "}
                          {item.semester})
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleEditEntry("subjectTaught", item)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                          >
                            <HiPencil className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteEntry("Subject", item.id, "subject")
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                },
                {
                  section: "papers",
                  label: "Papers Presented",
                  endpoint: "paper",
                  data: profile.papers,
                  input: (item) => (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={
                          item ? item.title : newEntry.papersPresented.title
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "papersPresented",
                                "title"
                              )
                            : handleNewEntryChange(
                                e,
                                "papersPresented",
                                "title"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter paper title"
                      />
                      <input
                        type="text"
                        name="description"
                        value={
                          item
                            ? item.papersPresented
                            : newEntry.papersPresented.description
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "papersPresented",
                                "description"
                              )
                            : handleNewEntryChange(
                                e,
                                "papersPresented",
                                "description"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter paper description"
                      />
                      <input
                        type="url"
                        name="link"
                        value={item ? item.link : newEntry.papersPresented.link}
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "papersPresented",
                                "link"
                              )
                            : handleNewEntryChange(e, "papersPresented", "link")
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter paper link (optional)"
                      />
                    </div>
                  ),
                  addButton: (
                    <button
                      onClick={() =>
                        addEntry(
                          "Paper Presented",
                          "paper",
                          newEntry.papersPresented
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Add Paper
                    </button>
                  ),
                  updateButton: (item) => (
                    <button
                      onClick={() =>
                        updateEntry(
                          "Paper Presented",
                          "paper",
                          editingEntry.papersPresented,
                          item.id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Save
                    </button>
                  ),
                  renderItem: (item) =>
                    editingEntry.papersPresented?.id === item.id ? (
                      <div className="space-y-4 bg-white p-4 rounded-md">
                        {this.input(item)}
                        <div className="flex space-x-4">
                          {this.updateButton(item)}
                          <button
                            onClick={() =>
                              toggleEditEntry("papersPresented", item)
                            }
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-white p-4 rounded-md">
                        <div>
                          <p className="text-sm text-gray-700">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.papersPresented}
                          </p>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm flex items-center"
                            >
                              <HiPencil className="mr-1" /> View Link
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleEditEntry("papersPresented", item)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                          >
                            <HiPencil className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteEntry("Paper", item.id, "paper")
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                },
                {
                  section: "researches",
                  label: "Research Projects",
                  endpoint: "research",
                  data: profile.researches,
                  input: (item) => (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={
                          item ? item.title : newEntry.researchProjects.title
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "researchProjects",
                                "title"
                              )
                            : handleNewEntryChange(
                                e,
                                "researchProjects",
                                "title"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter project title"
                      />
                      <input
                        type="text"
                        name="grant_type"
                        value={
                          item
                            ? item.grant_type
                            : newEntry.researchProjects.grant_type
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "researchProjects",
                                "grant_type"
                              )
                            : handleNewEntryChange(
                                e,
                                "researchProjects",
                                "grant_type"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter grant type"
                      />
                      <input
                        type="text"
                        name="funding_organization"
                        value={
                          item
                            ? item.funding_organization
                            : newEntry.researchProjects.funding_organization
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "researchProjects",
                                "funding_organization"
                              )
                            : handleNewEntryChange(
                                e,
                                "researchProjects",
                                "funding_organization"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter funding organization"
                      />
                      <input
                        type="text"
                        name="amount"
                        value={
                          item ? item.amount : newEntry.researchProjects.amount
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "researchProjects",
                                "amount"
                              )
                            : handleNewEntryChange(
                                e,
                                "researchProjects",
                                "amount"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter amount"
                      />
                      <input
                        type="text"
                        name="duration"
                        value={
                          item
                            ? item.duration
                            : newEntry.researchProjects.duration
                        }
                        onChange={(e) =>
                          item
                            ? handleEditEntryChange(
                                e,
                                "researchProjects",
                                "duration"
                              )
                            : handleNewEntryChange(
                                e,
                                "researchProjects",
                                "duration"
                              )
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter duration"
                      />
                    </div>
                  ),
                  addButton: (
                    <button
                      onClick={() =>
                        addEntry(
                          "Research Project",
                          "research",
                          newEntry.researchProjects
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Add Research Project
                    </button>
                  ),
                  updateButton: (item) => (
                    <button
                      onClick={() =>
                        updateEntry(
                          "Research Project",
                          "research",
                          editingEntry.researchProjects,
                          item.id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <HiCheck className="mr-2" /> Save
                    </button>
                  ),
                  renderItem: (item) =>
                    editingEntry.researchProjects?.id === item.id ? (
                      <div className="space-y-4 bg-white p-4 rounded-md">
                        {this.input(item)}
                        <div className="flex space-x-4">
                          {this.updateButton(item)}
                          <button
                            onClick={() =>
                              toggleEditEntry("researchProjects", item)
                            }
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-white p-4 rounded-md">
                        <div>
                          <p className="text-sm text-gray-700">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.grant_type}, {item.funding_organization},{" "}
                            {item.amount}, {item.duration}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              toggleEditEntry("researchProjects", item)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                          >
                            <HiPencil className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteEntry(
                                "Research Project",
                                item.id,
                                "research"
                              )
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                },
              ].map(
                ({
                  section,
                  label,
                  endpoint,
                  data,
                  input,
                  addButton,
                  updateButton,
                  renderItem,
                }) => (
                  <div
                    key={section}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <h4 className="text-lg font-medium text-gray-900">
                        {label}
                      </h4>
                      {openSections[section] ? (
                        <HiChevronUp className="w-5 h-5 text-gray-700" />
                      ) : (
                        <HiChevronDown className="w-5 h-5 text-gray-700" />
                      )}
                    </button>
                    <div
                      className={`transition-all duration-300 ${
                        openSections[section] ? "max-h-screen p-4" : "max-h-0"
                      }`}
                    >
                      {data.length > 0 ? (
                        <div className="space-y-4 mb-6">
                          {data.map((item) => (
                            <div
                              key={item.id}
                              className="border-b border-gray-200 pb-4"
                            >
                              {renderItem(item)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mb-4">
                          No {label.toLowerCase()} added.
                        </p>
                      )}
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        {input()}
                      </div>
                      <div className="flex justify-center">{addButton}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

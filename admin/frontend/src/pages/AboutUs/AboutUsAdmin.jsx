import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../services/useAuthCheck";

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3663";

const AboutUsAdmin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editContent, setEditContent] = useState({});
  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileUploading, setFileUploading] = useState({});
  const [imageUploading, setImageUploading] = useState({});
  const [authError, setAuthError] = useState(null);

  // Section definitions with their structure
  const sectionStructures = {
    History: {
      title: "Our History",
      subtitle: "Tracing the roots and evolution of our institution",
      headerImage: "",
      sections: {
        establishment: {
          heading: "Establishment",
          text: "",
          image: "src/assets/imgs/history_image.jpg",
        },
        endeavor: {
          heading: "An Endeavor called Fr. CRIT",
          text: "The Agnel Ashram Family Movement originated way back in 1957 in Mumbai. Starting with the preschool level, seeks to touch the lives of students and citizens of India, right up to graduation and post graduation level, in such a way that every student entrusted to the care of an Agnel Ashram Fathers' institution.",
          image: "",
        },
        history: {
          heading: "History",
          text: "The Agnel Ashram Fathers - a group of Catholic priests and brothers, along with some well educated, dedicated, zealous and patriotic co-workers have, during the last 45 years, built up a large well-knit family of committed individuals. This unique family, which is spread over different parts of the country, has been instrumental in propounding a powerful MOVEMENT in the realm of education.\n\nStarting with the preschool level, seeks to touch the lives of students and citizens of India, right up to graduation and post graduation level, in such a way that every student entrusted to the care of an Agnel Ashram Fathers' institution, grows into a balanced, versatile and courageous individual who has the physical, mental, emotional and spiritual strength to face the challenges of life. This Agnel Ashram Family Movement originated way back in 1957 in Mumbai.",
          image: "",
        },
      },
    },
    "Vision and Mission": {
      title: "Vision & Mission",
      subtitle: "Exploring our guiding principles and aspirations",
      headerImage: "src/assets/imgs/history_image.jpg",
      vision:
        "To evolve and flourish as a progressive centre for modern technical education, stirring creativity in every student leading to self-sustainable professionals, through holistic development; nurtured by strength and legitimate pride of Indian values and ethics.",
      mission: [
        "To provide industry oriented quality education.",
        "To provide holistic environment for overall personal development.",
        "To foster relationship with other institutes of repute, alumni, and industry.",
      ],
      message: {
        author: "Rev. Dr. Ivon Almeida",
        text: "Fr. C. Rodrigues Institute of Technology, Vashi, is one such exemplar of educational refinement as envisioned by our founder. We are known for our commitment towards building future citizens who are imbued in a strong sense of professionalism and ethical values. We take it upon ourselves to help the fresh entrants of engineering to develop into not only a well-rounded but also well-grounded citizens by providing them with a holistic environment. A student who enters the environs of this institute leaves this place a transformed individual, having learnt the ropes of cultivating academics and relationships.\n\nI understand that in the initial days students find the rules of the college a slightly strange and overwhelming; but stay assured that all this comes in good stead. As we realise that the world outside is not an easy place to",
        image: "",
      },
    },
    Trustees: {
      title: "List of Trustees",
      subtitle: "Guiding us with vision and leadership",
      headerImage: "",
      trustees: [
        { name: "Fr. Bento Rodrigues", position: "Chairman", image: "" },
        { name: "Fr. Alarico Carvalho", position: "Vice Chairman", image: "" },
        { name: "Fr. Peter D'Souza", position: "Treasurer", image: "" },
        { name: "Fr. Valerian D'Souza", position: "Secretary", image: "" },
        { name: "Fr. Agnelo Gomes", position: "Member", image: "" },
      ],
    },
    "Managing Director's Desk": {
      title: "Managing Director's Desk",
      subtitle: "A message from our Managing Director",
      director: {
        name: "Rev. Fr. Peter D'Souza",
        position: "Managing Director",
        message:
          "In its brief existence of thirty years, Fr. Conceicao Rodrigues Institute of Technology has established itself as an exemplary centre of quality education, leading to the holistic development of it's learners.\n\nIt's truly heartening to note that FCRIT, in all its educational initiatives and teaching-learning programmes, in conformity with New Education Policy-2020 insights and recommendations, is effectively moving towards multidisciplinary and holistic education, promotion of quality research and institutional autonomy.\n\nThe institute has taken care in consistently maintaining high academic standards, across all areas of teaching and learning. It has also been able to create and maintain a safe and equitable learning environment, while ensuring the mental well-being of all its students.\n\nIn its constant endeavour to equip the learners to the swiftly evolving demands of industries and their modern challenges, as well as to promote their industry readiness and their employability skills, the institution has sharply focused on developing the soft skills of its students, like communication skills, creative and critical thinking, initiatives and self-direction, leadership and responsibility; collaboration as well as social and cross-cultural interaction skills.\n\nBlissfully, FCRIT has embraced diversity, equity and inclusivity into it's culture with highest regard for all, and thus creating a sense of belongingness, values and meaningfulness in the life of all its students, faculty and staff.\n\nContentedly and with a joyful heart, I would like to mention here, that hundreds of our alumni today are talented and accomplished professionals and successful entrepreneurs in various fields of business activities. Our alumni in the truest sense are serving as powerful ambassadors for their alma mater.\n\nGiven the commitment of its faculty and their expertise in empowering all their students, and the consistent academic excellence achieved year after year, I'm sure that FCRIT shall continue to maintain its high standards and its effective and meaningful collaboration with communities and industries as well as face all future challenges with poise and courage.\n\nWishing you all Godspeed.",
        image: "src/assets/imgs/Father.jpg",
      },
      quotes: {
        text: "Any sound disciplinary policy should aim at education rather than punishment, constructive correction rather than reproof and 'what is wrong' rather than 'who is wrong'. Treat a man as he is and he will remain as he is. Treat a man as he can and should be and he will become as he can and should be.",
        author: "Goethe",
      },
    },
    "Principal's Desk": {
      title: "Principal's Desk",
      subtitle: "A message from our Principal",
      principal: {
        name: "",
        position: "Principal",
        message:
          "Welcome to Principal_DeskPage. Here is a brief message from our Principal...",
        image: "",
      },
    },
    Governance: {
      title: "Governance",
      subtitle: "Ensuring accountability and transparency",
      headerImage: "",
      content:
        "Welcome to the Governance Page, where we uphold the highest standards of institutional leadership...",
    },
    "Audit Report and Affiliations": {
      title: "Audit Report & Affiliations",
      subtitle: "Transparency in finances and partnerships",
      headerImage: "",
      auditReports: [],
      affiliations: [],
    },
    "Administrations and Committees": {
      title: "Administrations & Committees",
      subtitle: "Our leadership and organizational structure",
      headerImage: "",
      committees: [
        {
          name: "",
          image: "",
          members: [{ name: "", position: "", image: "" }],
        },
      ],
    },
    "Institute Roadmap": {
      title: "Institute Roadmap",
      subtitle: "Charting our course for the future",
      headerImage: "",
      vision2030:
        "Welcome to Institute_Roadmap Page, where we outline our vision for the years ahead...",
      strategicGoals: [{ title: "", description: "" }],
      implementationPlan: "",
    },
    "Service Regulation": {
      title: "Service Regulation",
      subtitle: "Guidelines and policies for our staff",
      headerImage: "",
      content: "Information on policies and standards",
      documentUrl: "src/assets/Documents/service.pdf",
    },
    "Qualification and Eligibility norms for Recruitment": {
      title: "Qualification & Eligibility Norms",
      subtitle: "Requirements for joining our institution",
      headerImage: "",
      content:
        "Welcome to Qualification_and_Eligiblity_Norms_for_RecruitmentPage. Learn about our hiring standards...",
      positions: [
        {
          title: "",
          qualifications: [],
          experience: "",
          responsibilities: [],
        },
      ],
    },
    "Best Practices": {
      title: "Best Practices",
      subtitle: "Excellence in education and administration",
      headerImage: "",
      content: "Committed to excellence in every endeavor",
      documentUrl: "src/assets/Documents/bestprac.pdf",
    },
    "Mandatory Disclosures": {
      title: "Mandatory Disclosures",
      subtitle: "Information required by regulatory bodies",
      headerImage: "",
      content: "Ensuring compliance and transparency",
      documentUrl: "src/assets/Documents/mandatory_disclosure.pdf",
    },
  };

  // Check for saved section on initial render and whenever localStorage changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSections();
      checkForSavedSection();
    }
  }, [isAuthenticated]);

  // Add an event listener for the custom section-selected event
  useEffect(() => {
    const handleSectionEvent = (event) => {
      console.log("Received section selection event:", event.detail.section);
      if (event.detail && event.detail.section) {
        handleSectionSelect(event.detail.section);
      }
    };

    window.addEventListener("section-selected", handleSectionEvent);

    // Check localStorage on initial mount
    checkForSavedSection();

    return () => {
      window.removeEventListener("section-selected", handleSectionEvent);
    };
  }, []);

  // Add a dedicated function to check localStorage
  const checkForSavedSection = () => {
    const savedSection = localStorage.getItem("aboutUsSection");
    if (savedSection && sectionStructures[savedSection]) {
      console.log("Loading section from localStorage:", savedSection);
      handleSectionSelect(savedSection);
      // Clear the selection so it doesn't persist unnecessarily
      localStorage.removeItem("aboutUsSection");
    }
  };

  // Update fetchSections to handle 401/403
  const fetchSections = async () => {
    try {
      const response = await axios.get("/api/aboutus");
      setSections(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        setAuthError("forbidden");
        setSections([]);
        setEditContent({});
        setSelectedSection(null);
      } else {
        setStatus("Error fetching sections: " + error.message);
      }
    }
  };

  // Update handleSectionSelect to handle 401/403
  const handleSectionSelect = async (sectionKey) => {
    setSelectedSection(sectionKey); // Set selected immediately for UI feedback
    try {
      const response = await axios.get(`/api/aboutus/${sectionKey}`);

      // Get the default structure for this section
      const defaultStructure =
        JSON.parse(JSON.stringify(sectionStructures[sectionKey])) || {};

      // Get content from response or empty object if none
      const receivedData = response.data || {};
      const receivedContent = receivedData.content || {};

      console.log("Default structure:", defaultStructure);
      console.log("Received content:", receivedContent);

      // Create a properly merged structure based on section type
      let mergedContent;

      if (sectionKey === "History") {
        // Special handling for History with nested sections
        mergedContent = {
          ...defaultStructure,
          sections: {
            ...defaultStructure.sections,
          },
        };

        // Merge each section if it exists in received content
        if (receivedContent.sections) {
          Object.keys(mergedContent.sections).forEach((key) => {
            if (receivedContent.sections[key]) {
              mergedContent.sections[key] = {
                ...mergedContent.sections[key],
                ...receivedContent.sections[key],
              };
            }
          });
        }
      } else if (sectionKey === "Vision and Mission") {
        // Special handling for Vision and Mission with array
        mergedContent = {
          ...defaultStructure,
          vision: receivedContent.vision || defaultStructure.vision,
          mission: receivedContent.mission || defaultStructure.mission,
          message: {
            ...defaultStructure.message,
            ...(receivedContent.message || {}),
          },
        };
      } else if (sectionKey === "Trustees") {
        // Special handling for trustees array
        mergedContent = {
          ...defaultStructure,
          trustees: defaultStructure.trustees.map((trustee, index) => {
            if (receivedContent.trustees && receivedContent.trustees[index]) {
              return {
                ...trustee,
                name: receivedContent.trustees[index].name || "",
              };
            }
            return trustee;
          }),
        };
      } else if (sectionKey === "Managing Director's Desk") {
        // Special handling for director object
        mergedContent = {
          ...defaultStructure,
          director: {
            ...defaultStructure.director,
            ...(receivedContent.director || {}),
          },
        };
      } else if (sectionKey === "Audit Report and Affiliations") {
        // Special handling for arrays
        mergedContent = {
          ...defaultStructure,
          auditReports:
            receivedContent.auditReports || defaultStructure.auditReports,
          affiliations:
            receivedContent.affiliations || defaultStructure.affiliations,
        };
      } else {
        // Default handling for simple content fields
        mergedContent = {
          ...defaultStructure,
          ...receivedContent,
        };
      }

      console.log("Merged content:", mergedContent);
      setEditContent(mergedContent);
      setStatus(""); // Clear any previous status messages
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        setAuthError("forbidden");
        setEditContent({});
      } else {
        setEditContent(
          JSON.parse(JSON.stringify(sectionStructures[sectionKey])) || {}
        );
        setStatus("Error fetching section: " + error.message);
      }
    }
  };

  // Redirect to error403 page if forbidden
  useEffect(() => {
    if (authError === "forbidden") {
      navigate("/error403");
    }
    console.log(authError);
  }, [authError, navigate]);

  // Handle changes to content data
  const handleContentChange = (field, key, value) => {
    setEditContent((prevContent) => {
      const updatedContent = { ...prevContent };

      // Handle nested objects and arrays
      if (key !== null) {
        // If the field doesn't exist, create it
        if (!updatedContent[field]) {
          updatedContent[field] = {};
        }

        // Handle nested objects (for sections like History)
        if (
          typeof updatedContent[field] === "object" &&
          !Array.isArray(updatedContent[field])
        ) {
          updatedContent[field][key] = value;
        } else if (Array.isArray(updatedContent[field])) {
          // Handle arrays (for lists like trustees)
          updatedContent[field][key] = value;
        }
      } else {
        // Direct field update
        updatedContent[field] = value;
      }

      return updatedContent;
    });
  };

  const handleArrayChange = (field, index, value) => {
    setEditContent((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle file upload
  const handleFileUpload = async (sectionKey, file) => {
    if (!file) return;

    // Update state to show uploading indicator
    setFileUploading((prev) => ({ ...prev, [sectionKey]: true }));
    setStatus(`Uploading file for ${sectionKey}...`);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("section", sectionKey);

      // Upload the file
      const response = await axios.post(
        "/api/about-us/upload-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Update document URL with the new file path
        handleContentChange("documentUrl", null, response.data.fileUrl);
        setUploadedFiles((prev) => ({
          ...prev,
          [sectionKey]: {
            name: file.name,
            url: response.data.fileUrl,
          },
        }));
        setStatus(`File uploaded successfully!`);
      } else {
        setStatus(`Error: ${response.data.message || "Failed to upload file"}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus(
        `Error: ${
          error.response?.data?.message ||
          error.message ||
          "Failed to upload file"
        }`
      );
    } finally {
      setFileUploading((prev) => ({ ...prev, [sectionKey]: false }));

      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };

  // Handle image upload
  const handleImageUpload = async (sectionKey, imageField, file) => {
    if (!file) return;

    // Update state to show uploading indicator
    setImageUploading((prev) => ({
      ...prev,
      [`${sectionKey}_${imageField}`]: true,
    }));
    setStatus(`Uploading image for ${sectionKey}...`);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", file);
      formData.append("section", sectionKey);
      formData.append("field", imageField);

      // Upload the image
      const response = await axios.post(
        "/api/about-us/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Update image URL in the content state
        if (imageField.includes(".")) {
          // Handle nested fields like 'director.image'
          const [parentField, childField] = imageField.split(".");
          const updatedParent = {
            ...(editContent[parentField] || {}),
            [childField]: response.data.imageUrl,
          };
          handleContentChange(parentField, null, updatedParent);
        } else {
          // Direct field update
          handleContentChange(imageField, null, response.data.imageUrl);
        }

        setUploadedImages((prev) => ({
          ...prev,
          [`${sectionKey}_${imageField}`]: {
            name: file.name,
            url: response.data.imageUrl,
          },
        }));
        setStatus(`Image uploaded successfully!`);
      } else {
        setStatus(
          `Error: ${response.data.message || "Failed to upload image"}`
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus(
        `Error: ${
          error.response?.data?.message ||
          error.message ||
          "Failed to upload image"
        }`
      );
    } finally {
      setImageUploading((prev) => ({
        ...prev,
        [`${sectionKey}_${imageField}`]: false,
      }));

      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedSection) return;

    setStatus("Saving changes...");

    try {
      // Ensure valid content structure before submitting
      let contentToSubmit = { ...editContent };

      // Make specific fixes for Managing Director's Desk
      if (selectedSection === "Managing Director's Desk") {
        // Make sure director and quotes objects exist
        contentToSubmit.director = contentToSubmit.director || {};
        contentToSubmit.quotes = contentToSubmit.quotes || {};

        // Ensure all required fields have at least empty strings
        contentToSubmit.director.name = contentToSubmit.director.name || "";
        contentToSubmit.director.position =
          contentToSubmit.director.position || "";
        contentToSubmit.director.message =
          contentToSubmit.director.message || "";
        contentToSubmit.director.image = contentToSubmit.director.image || "";
        contentToSubmit.quotes.text = contentToSubmit.quotes.text || "";
        contentToSubmit.quotes.author = contentToSubmit.quotes.author || "";
      }

      const payload = {
        section: selectedSection,
        content: contentToSubmit,
      };

      console.log(
        "Submitting updated content:",
        JSON.stringify(payload, null, 2)
      );

      // API call to save the content
      const response = await axios.post("/api/aboutus/update", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response.data);

      // Check for success explicitly
      if (response.data && response.data.success === true) {
        setStatus("Changes saved successfully!");
        // Refresh the content after saving
        fetchSections();

        // Clear status after 3 seconds
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      } else {
        // Handle unexpected response format
        console.error("Error response or invalid format:", response.data);

        // Try to extract error message or use default
        let errorMessage = "Failed to save changes";
        if (response.data && typeof response.data === "object") {
          if (response.data.message) {
            errorMessage = response.data.message;
          } else if (response.data.error) {
            errorMessage = response.data.error;
          }
        }

        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error saving content:", error);
      console.error("Error details:", error.response?.data || error.message);

      // Show detailed error info
      let errorMsg = "Failed to save changes";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setStatus(`Error: ${errorMsg}`);
    }
  };

  // Render the edit form based on the selected section
  const renderEditForm = () => {
    if (!selectedSection) return null;

    switch (selectedSection) {
      case "History":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-8 border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">{editContent.title}</h2>
              <h3 className="text-lg font-semibold mb-6">
                {editContent.subtitle}
              </h3>

              {/* Header image upload */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Header Image</h4>
                <div className="flex items-start gap-6">
                  {editContent.headerImage ? (
                    <div className="relative w-1/3">
                      <img
                        src={editContent.headerImage}
                        alt="Header"
                        className="w-full h-auto rounded-md border"
                      />
                      <button
                        onClick={() =>
                          handleContentChange("headerImage", null, "")
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        title="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-1/3 flex">
                      <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <input
                            type="file"
                            id="header-image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(
                                  "History",
                                  "headerImage",
                                  e.target.files[0]
                                );
                              }
                            }}
                          />

                          {imageUploading["History_headerImage"] ? (
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <p className="mt-2 text-gray-600">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor="header-image-upload"
                                className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90"
                              >
                                Upload Image
                              </label>
                              <p className="mt-2 text-sm text-gray-500">
                                Recommended: 1200 x 400px
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-2/3">
                    <p className="text-gray-700 mb-2">
                      This image will appear at the top of the History page.
                      Choose a high-quality image that represents the history
                      and heritage of our institution.
                    </p>
                    <p className="text-sm text-gray-500">
                      For best results, use an image with a 3:1 aspect ratio in
                      JPG or PNG format.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section content */}
            {Object.keys(editContent.sections || {}).map((sectionKey) => (
              <div key={sectionKey} className="mb-10 border-b pb-8">
                <div className="flex items-center mb-4">
                  <h4 className="text-xl font-semibold mr-4">
                    {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
                  </h4>
                  <input
                    type="text"
                    value={editContent.sections[sectionKey].heading || ""}
                    onChange={(e) => {
                      const updatedSection = {
                        ...editContent.sections[sectionKey],
                        heading: e.target.value,
                      };
                      handleContentChange(
                        "sections",
                        sectionKey,
                        updatedSection
                      );
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder="Section Heading"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Section Content
                    </label>
                    <textarea
                      value={editContent.sections[sectionKey].text || ""}
                      onChange={(e) => {
                        const updatedSection = {
                          ...editContent.sections[sectionKey],
                          text: e.target.value,
                        };
                        handleContentChange(
                          "sections",
                          sectionKey,
                          updatedSection
                        );
                      }}
                      className="w-full p-3 border rounded min-h-[250px]"
                      placeholder="Enter section content here..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Section Image
                    </label>
                    {editContent.sections[sectionKey].image ? (
                      <div className="relative">
                        <img
                          src={editContent.sections[sectionKey].image}
                          alt={`${sectionKey} section`}
                          className="w-full h-auto max-h-[250px] object-contain rounded-md border"
                        />
                        <button
                          onClick={() => {
                            const updatedSection = {
                              ...editContent.sections[sectionKey],
                              image: "",
                            };
                            handleContentChange(
                              "sections",
                              sectionKey,
                              updatedSection
                            );
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          title="Remove image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="h-[250px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <input
                            type="file"
                            id={`${sectionKey}-image-upload`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                // Create a field path for the nested image
                                const imageField = `sections.${sectionKey}.image`;
                                handleImageUpload(
                                  "History",
                                  imageField,
                                  e.target.files[0]
                                );

                                // Since our handleImageUpload might not directly update nested fields correctly,
                                // also manually update the state
                                const updatedSection = {
                                  ...editContent.sections[sectionKey],
                                  // We'll update this with the actual URL once upload completes,
                                  // but this ensures the UI shows we're processing it
                                  image: "uploading",
                                };
                                handleContentChange(
                                  "sections",
                                  sectionKey,
                                  updatedSection
                                );
                              }
                            }}
                          />

                          {imageUploading[
                            `History_sections.${sectionKey}.image`
                          ] ? (
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <p className="mt-2 text-gray-600">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor={`${sectionKey}-image-upload`}
                                className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90"
                              >
                                Upload Image
                              </label>
                              <p className="mt-2 text-sm text-gray-500">
                                Recommended: 800 x 600px
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Alternative URL input */}
                    <div className="mt-2">
                      <label className="block text-sm text-gray-500 mb-1">
                        Or enter image URL:
                      </label>
                      <input
                        type="text"
                        value={
                          editContent.sections[sectionKey].image === "uploading"
                            ? ""
                            : editContent.sections[sectionKey].image || ""
                        }
                        onChange={(e) => {
                          const updatedSection = {
                            ...editContent.sections[sectionKey],
                            image: e.target.value,
                          };
                          handleContentChange(
                            "sections",
                            sectionKey,
                            updatedSection
                          );
                        }}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "Vision and Mission":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{editContent.title}</h2>
            <h3 className="text-lg font-semibold mb-4">
              {editContent.subtitle}
            </h3>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Vision</h4>
              <textarea
                value={editContent.vision || ""}
                onChange={(e) =>
                  handleContentChange("vision", null, e.target.value)
                }
                className="w-full p-3 border rounded min-h-[100px]"
                placeholder="Enter your vision statement..."
              />
            </div>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Mission</h4>
              {(editContent.mission || []).map((item, index) => (
                <div key={index} className="mb-3 flex items-center">
                  <textarea
                    value={item || ""}
                    onChange={(e) => {
                      const updatedMission = [...(editContent.mission || [])];
                      updatedMission[index] = e.target.value;
                      handleContentChange("mission", null, updatedMission);
                    }}
                    className="w-full p-3 border rounded min-h-[80px]"
                    placeholder={`Mission point ${index + 1}...`}
                  />
                  {index === editContent.mission.length - 1 ? (
                    <button
                      onClick={() => {
                        const updatedMission = [
                          ...(editContent.mission || []),
                          "",
                        ];
                        handleContentChange("mission", null, updatedMission);
                      }}
                      className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const updatedMission = [...(editContent.mission || [])];
                        updatedMission.splice(index, 1);
                        handleContentChange("mission", null, updatedMission);
                      }}
                      className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Message</h4>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={
                    (editContent.message && editContent.message.author) || ""
                  }
                  onChange={(e) => {
                    const updatedMessage = {
                      ...(editContent.message || {}),
                      author: e.target.value,
                    };
                    handleContentChange("message", null, updatedMessage);
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Author name"
                />
              </div>
              <textarea
                value={(editContent.message && editContent.message.text) || ""}
                onChange={(e) => {
                  const updatedMessage = {
                    ...(editContent.message || {}),
                    text: e.target.value,
                  };
                  handleContentChange("message", null, updatedMessage);
                }}
                className="w-full p-3 border rounded min-h-[150px]"
                placeholder="Enter message content..."
              />
            </div>
          </div>
        );

      case "Trustees":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-8 border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">{editContent.title}</h2>
              <h3 className="text-lg font-semibold mb-6">
                {editContent.subtitle}
              </h3>

              {/* Header image upload */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Header Image</h4>
                <div className="flex items-start gap-6">
                  {editContent.headerImage ? (
                    <div className="relative w-1/3">
                      <img
                        src={editContent.headerImage}
                        alt="Header"
                        className="w-full h-auto rounded-md border"
                      />
                      <button
                        onClick={() =>
                          handleContentChange("headerImage", null, "")
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        title="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-1/3 flex">
                      <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <input
                            type="file"
                            id="trustees-header-image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(
                                  "Trustees",
                                  "headerImage",
                                  e.target.files[0]
                                );
                              }
                            }}
                          />

                          {imageUploading["Trustees_headerImage"] ? (
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <p className="mt-2 text-gray-600">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor="trustees-header-image-upload"
                                className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90"
                              >
                                Upload Image
                              </label>
                              <p className="mt-2 text-sm text-gray-500">
                                Recommended: 1200 x 400px
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-2/3">
                    <p className="text-gray-700 mb-2">
                      This image will appear at the top of the Trustees page.
                      Choose a high-quality image that represents our leadership
                      team.
                    </p>
                    <p className="text-sm text-gray-500">
                      For best results, use an image with a 3:1 aspect ratio in
                      JPG or PNG format.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold mb-6">Board of Trustees</h4>
            <p className="text-gray-600 mb-6">
              Add or edit details of the institutional trustees. Each trustee
              should have a name, position, and optionally a profile image.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(editContent.trustees || []).map((trustee, index) => (
                <div key={index} className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-semibold text-lg">
                      {trustee.position || "Trustee"}
                    </h5>
                    <button
                      onClick={() => {
                        const updatedTrustees = [
                          ...(editContent.trustees || []),
                        ];
                        updatedTrustees.splice(index, 1);
                        handleContentChange("trustees", null, updatedTrustees);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                      {/* Profile image */}
                      {trustee.image ? (
                        <div className="relative bg-white p-2 border rounded mb-3">
                          <img
                            src={trustee.image}
                            alt={trustee.name || "Trustee"}
                            className="w-full h-auto object-cover rounded aspect-square"
                          />
                          <button
                            onClick={() => {
                              const updatedTrustees = [
                                ...(editContent.trustees || []),
                              ];
                              updatedTrustees[index] = {
                                ...trustee,
                                image: "",
                              };
                              handleContentChange(
                                "trustees",
                                null,
                                updatedTrustees
                              );
                            }}
                            className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full"
                            title="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white">
                            <div className="text-center p-2">
                              <input
                                type="file"
                                id={`trustee-${index}-image-upload`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const imageField = `trustees[${index}].image`;
                                    handleImageUpload(
                                      "Trustees",
                                      imageField,
                                      e.target.files[0]
                                    );

                                    // Manual update for UI feedback
                                    const updatedTrustees = [
                                      ...(editContent.trustees || []),
                                    ];
                                    updatedTrustees[index] = {
                                      ...trustee,
                                      image: "uploading",
                                    };
                                    handleContentChange(
                                      "trustees",
                                      null,
                                      updatedTrustees
                                    );
                                  }
                                }}
                              />

                              {imageUploading[
                                `Trustees_trustees[${index}].image`
                              ] ? (
                                <div className="flex flex-col items-center">
                                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                  <p className="mt-1 text-xs text-gray-600">
                                    Uploading...
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <label
                                    htmlFor={`trustee-${index}-image-upload`}
                                    className="cursor-pointer bg-[#0C2340] text-white px-3 py-1 rounded-md inline-block hover:bg-opacity-90 text-sm"
                                  >
                                    Upload Photo
                                  </label>
                                </>
                              )}
                            </div>
                          </div>

                          {/* URL input for image */}
                          <input
                            type="text"
                            value={
                              trustee.image === "uploading"
                                ? ""
                                : trustee.image || ""
                            }
                            onChange={(e) => {
                              const updatedTrustees = [
                                ...(editContent.trustees || []),
                              ];
                              updatedTrustees[index] = {
                                ...trustee,
                                image: e.target.value,
                              };
                              handleContentChange(
                                "trustees",
                                null,
                                updatedTrustees
                              );
                            }}
                            className="w-full p-1 border rounded text-xs mt-1"
                            placeholder="Image URL (optional)"
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-span-7">
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={trustee.name || ""}
                          onChange={(e) => {
                            const updatedTrustees = [
                              ...(editContent.trustees || []),
                            ];
                            updatedTrustees[index] = {
                              ...trustee,
                              name: e.target.value,
                            };
                            handleContentChange(
                              "trustees",
                              null,
                              updatedTrustees
                            );
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Full name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={trustee.position || ""}
                          onChange={(e) => {
                            const updatedTrustees = [
                              ...(editContent.trustees || []),
                            ];
                            updatedTrustees[index] = {
                              ...trustee,
                              position: e.target.value,
                            };
                            handleContentChange(
                              "trustees",
                              null,
                              updatedTrustees
                            );
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Position/Title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  const updatedTrustees = [
                    ...(editContent.trustees || []),
                    { name: "", position: "", image: "" },
                  ];
                  handleContentChange("trustees", null, updatedTrustees);
                }}
                className="flex items-center justify-center gap-2 w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Trustee
              </button>
            </div>
          </div>
        );

      case "Managing Director's Desk":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-8 border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">
                {editContent.title || "Managing Director's Desk"}
              </h2>
              <h3 className="text-lg font-semibold mb-6">
                {editContent.subtitle ||
                  "Hear from our esteemed Managing Director"}
              </h3>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">
                Director Information
              </h4>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Director's Photo
                    </label>
                    {editContent.director && editContent.director.image ? (
                      <div className="relative">
                        <img
                          src={editContent.director.image}
                          alt={editContent.director.name || "Managing Director"}
                          className="w-full h-auto rounded-md border shadow-sm"
                        />
                        <button
                          onClick={() => {
                            const updatedDirector = {
                              ...(editContent.director || {}),
                              image: "",
                            };
                            handleContentChange(
                              "director",
                              null,
                              updatedDirector
                            );
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          title="Remove image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="text-center">
                          <input
                            type="file"
                            id="director-image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(
                                  "Managing Director's Desk",
                                  "director.image",
                                  e.target.files[0]
                                );

                                // Manual update for UI feedback
                                const updatedDirector = {
                                  ...(editContent.director || {}),
                                  image: "uploading",
                                };
                                handleContentChange(
                                  "director",
                                  null,
                                  updatedDirector
                                );
                              }
                            }}
                          />

                          {imageUploading[
                            "Managing Director's Desk_director.image"
                          ] ? (
                            <div className="flex flex-col items-center py-4">
                              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <p className="mt-2 text-sm text-gray-600">
                                Uploading...
                              </p>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor="director-image-upload"
                                className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90"
                              >
                                Upload Photo
                              </label>
                              <p className="mt-2 text-sm text-gray-500">
                                Recommended size: Square or 4:3 ratio
                              </p>
                            </>
                          )}
                        </div>

                        {/* Alternative URL input */}
                        <div className="mt-3">
                          <label className="block text-sm text-gray-600 mb-1">
                            Or enter image URL:
                          </label>
                          <input
                            type="text"
                            value={
                              editContent.director &&
                              editContent.director.image === "uploading"
                                ? ""
                                : (editContent.director &&
                                    editContent.director.image) ||
                                  ""
                            }
                            onChange={(e) => {
                              const updatedDirector = {
                                ...(editContent.director || {}),
                                image: e.target.value,
                              };
                              handleContentChange(
                                "director",
                                null,
                                updatedDirector
                              );
                            }}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="https://example.com/director.jpg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={
                          (editContent.director && editContent.director.name) ||
                          ""
                        }
                        onChange={(e) => {
                          // Ensure director object exists and is an object
                          const currentDirector =
                            editContent.director &&
                            typeof editContent.director === "object"
                              ? editContent.director
                              : {};

                          const updatedDirector = {
                            ...currentDirector,
                            name: e.target.value,
                          };
                          handleContentChange(
                            "director",
                            null,
                            updatedDirector
                          );
                        }}
                        className="w-full p-2 border rounded"
                        placeholder="Director's full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={
                          (editContent.director &&
                            editContent.director.position) ||
                          ""
                        }
                        onChange={(e) => {
                          // Ensure director object exists and is an object
                          const currentDirector =
                            editContent.director &&
                            typeof editContent.director === "object"
                              ? editContent.director
                              : {};

                          const updatedDirector = {
                            ...currentDirector,
                            position: e.target.value,
                          };
                          handleContentChange(
                            "director",
                            null,
                            updatedDirector
                          );
                        }}
                        className="w-full p-2 border rounded"
                        placeholder="Managing Director"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Caption/Title
                    </label>
                    <input
                      type="text"
                      value={
                        (editContent.director && editContent.director.title) ||
                        ""
                      }
                      onChange={(e) => {
                        // Make sure director object exists before updating
                        const updatedDirector = {
                          ...(editContent.director &&
                          typeof editContent.director === "object"
                            ? editContent.director
                            : {}),
                          title: e.target.value,
                        };
                        handleContentChange("director", null, updatedDirector);
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Rev. Fr. Peter D'Souza, Managing Director"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will appear beneath the photo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4">Director's Message</h4>
              <textarea
                value={
                  (editContent.director && editContent.director.message) || ""
                }
                onChange={(e) => {
                  // Ensure director object exists and is an object
                  const currentDirector =
                    editContent.director &&
                    typeof editContent.director === "object"
                      ? editContent.director
                      : {};

                  const updatedDirector = {
                    ...currentDirector,
                    message: e.target.value,
                  };
                  handleContentChange("director", null, updatedDirector);
                }}
                className="w-full p-3 border rounded min-h-[300px]"
                placeholder="Enter director's message..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Use a blank line to create a new paragraph. The message will be
                displayed with proper formatting.
              </p>
            </div>

            <div className="mb-6 border-t pt-6">
              <h4 className="text-xl font-semibold mb-4">Quote</h4>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Quote Text
                </label>
                <textarea
                  value={(editContent.quotes && editContent.quotes.text) || ""}
                  onChange={(e) => {
                    // Ensure quotes object exists and is an object
                    const currentQuotes =
                      editContent.quotes &&
                      typeof editContent.quotes === "object"
                        ? editContent.quotes
                        : {};

                    const updatedQuotes = {
                      ...currentQuotes,
                      text: e.target.value,
                    };
                    handleContentChange("quotes", null, updatedQuotes);
                  }}
                  className="w-full p-3 border rounded min-h-[100px]"
                  placeholder="Enter inspirational quote..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quote Author
                </label>
                <input
                  type="text"
                  value={
                    (editContent.quotes && editContent.quotes.author) || ""
                  }
                  onChange={(e) => {
                    // Ensure quotes object exists and is an object
                    const currentQuotes =
                      editContent.quotes &&
                      typeof editContent.quotes === "object"
                        ? editContent.quotes
                        : {};

                    const updatedQuotes = {
                      ...currentQuotes,
                      author: e.target.value,
                    };
                    handleContentChange("quotes", null, updatedQuotes);
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Author of the quote"
                />
              </div>
            </div>
          </div>
        );

      case "Principal's Desk":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{editContent.title}</h2>
            <h3 className="text-lg font-semibold mb-4">
              {editContent.subtitle}
            </h3>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">
                Principal Information
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={
                      (editContent.principal && editContent.principal.name) ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedPrincipal = {
                        ...(editContent.principal || {}),
                        name: e.target.value,
                      };
                      handleContentChange("principal", null, updatedPrincipal);
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Principal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={
                      (editContent.principal &&
                        editContent.principal.position) ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedPrincipal = {
                        ...(editContent.principal || {}),
                        position: e.target.value,
                      };
                      handleContentChange("principal", null, updatedPrincipal);
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Principal position"
                  />
                </div>
              </div>

              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={
                  (editContent.principal && editContent.principal.message) || ""
                }
                onChange={(e) => {
                  const updatedPrincipal = {
                    ...(editContent.principal || {}),
                    message: e.target.value,
                  };
                  handleContentChange("principal", null, updatedPrincipal);
                }}
                className="w-full p-3 border rounded min-h-[200px]"
                placeholder="Enter principal's message..."
              />
            </div>
          </div>
        );

      // For document upload sections like Service Regulation, Best Practices, etc.
      case "Service Regulation":
      case "Best Practices":
      case "Mandatory Disclosures":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{editContent.title}</h2>
            <h3 className="text-lg font-semibold mb-4">
              {editContent.subtitle}
            </h3>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Content</h4>
              <textarea
                value={editContent.content || ""}
                onChange={(e) =>
                  handleContentChange("content", null, e.target.value)
                }
                className="w-full p-3 border rounded min-h-[200px]"
                placeholder="Enter content here..."
              />
            </div>

            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Document PDF</h4>

              {/* Show current document link if it exists */}
              {editContent.documentUrl && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current document:</p>
                    <a
                      href={editContent.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {uploadedFiles[selectedSection]?.name ||
                        editContent.documentUrl}
                    </a>
                  </div>
                  <button
                    onClick={() => handleContentChange("documentUrl", null, "")}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* File upload section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id={`file-upload-${selectedSection}`}
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(selectedSection, e.target.files[0]);
                    }
                  }}
                />

                {fileUploading[selectedSection] ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-2 text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor={`file-upload-${selectedSection}`}
                      className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90"
                    >
                      Upload PDF Document
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      PDF documents only. Max size: 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Document URL input as fallback */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Or enter document URL directly:
                </label>
                <input
                  type="text"
                  value={editContent.documentUrl || ""}
                  onChange={(e) =>
                    handleContentChange("documentUrl", null, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/document.pdf"
                />
              </div>
            </div>
          </div>
        );

      // Default case for sections that haven't been specifically handled
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              {editContent.title || selectedSection}
            </h2>
            <h3 className="text-lg font-semibold mb-4">
              {editContent.subtitle || ""}
            </h3>

            <div className="mb-6">
              <textarea
                value={
                  typeof editContent.content === "string"
                    ? editContent.content
                    : JSON.stringify(editContent, null, 2)
                }
                onChange={(e) => {
                  try {
                    // Try to parse as JSON if it's complex content
                    if (e.target.value.trim().startsWith("{")) {
                      const parsed = JSON.parse(e.target.value);
                      setEditContent(parsed);
                    } else {
                      // Otherwise treat as simple content
                      handleContentChange("content", null, e.target.value);
                    }
                  } catch (err) {
                    // If parsing fails, just update as plain text
                    handleContentChange("content", null, e.target.value);
                  }
                }}
                className="w-full p-3 border rounded min-h-[300px]"
                placeholder="Enter content here or edit JSON structure for complex content..."
              />
            </div>
          </div>
        );
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading About Us admin panel...</div>
      </div>
    );
  }

  // If not authenticated, don't show anything and let AuthProvider handle redirect
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">You must be logged in to view this page</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading content...</p>
          </div>
        </div>
      ) : (
        <div className="h-full">
          {status && (
            <div
              className={`p-4 mb-6 rounded-md ${
                status.includes("Error") || status.includes("error")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              <p>{status}</p>
            </div>
          )}

          {selectedSection ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#0C2340]">
                  Edit {selectedSection}
                </h1>
                <p className="text-gray-600 mt-2">
                  Make changes to the {selectedSection} section content below.
                </p>
              </div>

              {renderEditForm()}

              <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                <button
                  className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setSelectedSection(null);
                    setEditContent({});
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-[#0C2340] text-white rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
                <h2 className="text-2xl font-bold text-[#0C2340] mb-4">
                  About Us Content Management
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a section from the sidebar to edit its content. All
                  changes will be reflected on the public-facing website.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(sectionStructures).map((section) => (
                    <button
                      key={section}
                      onClick={() => handleSectionSelect(section)}
                      className="p-3 text-left text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUsAdmin;

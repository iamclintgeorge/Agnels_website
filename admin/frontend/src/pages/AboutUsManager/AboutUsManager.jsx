import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../services/useAuthCheck";
import SectionSelector from "./components/SectionSelector";
import ContentEditor from "./components/ContentEditor";
import { aboutUsService } from "./services/aboutUsService";
import { sectionStructures } from "./constants/sectionStructures";

const AboutUsManager = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // State management
  const [sections, setSections] = useState(sectionStructures);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editContent, setEditContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState({});
  const [imageUploading, setImageUploading] = useState({});

  // Load sections and check for saved section on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadSections();
      checkForSavedSection();
    }
  }, [isAuthenticated]);

  // Listen for section selection events from sidebar
  useEffect(() => {
    const handleSectionEvent = (event) => {
      if (event.detail && event.detail.section) {
        handleSectionSelect(event.detail.section);
      }
    };

    window.addEventListener("section-selected", handleSectionEvent);
    return () => {
      window.removeEventListener("section-selected", handleSectionEvent);
    };
  }, []);

  const checkForSavedSection = () => {
    const savedSection = localStorage.getItem("selectedAboutUsSection");
    if (savedSection && sectionStructures[savedSection]) {
      handleSectionSelect(savedSection);
    }
  };

  const loadSections = async () => {
    try {
      setLoading(true);
      const sectionsData = await aboutUsService.getAllSections();
      
      // Merge with default structure, preferring saved data
      const mergedSections = { ...sectionStructures };
      sectionsData.forEach(section => {
        if (mergedSections[section.section_name]) {
          mergedSections[section.section_name] = {
            ...mergedSections[section.section_name],
            ...JSON.parse(section.content || "{}")
          };
        }
      });
      
      setSections(mergedSections);
    } catch (error) {
      console.error("Error loading sections:", error);
      toast.error("Failed to load About Us sections");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSelect = async (sectionKey) => {
    try {
      setLoading(true);
      localStorage.setItem("selectedAboutUsSection", sectionKey);
      
      // Load section data from API
      const sectionData = await aboutUsService.getSection(sectionKey);
      
      setSelectedSection(sectionKey);
      setEditContent(sectionData || sectionStructures[sectionKey] || {});
    } catch (error) {
      console.error("Error loading section:", error);
      // Fallback to default structure
      setEditContent(sectionStructures[sectionKey] || {});
      setSelectedSection(sectionKey);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (field, key, value) => {
    setEditContent(prev => {
      if (key !== null) {
        // Handle nested object updates (e.g., sections.establishment.text)
        const fieldParts = field.split('.');
        const newContent = { ...prev };
        let current = newContent;
        
        for (let i = 0; i < fieldParts.length - 1; i++) {
          if (!current[fieldParts[i]]) {
            current[fieldParts[i]] = {};
          }
          current = current[fieldParts[i]];
        }
        current[fieldParts[fieldParts.length - 1]] = value;
        
        return newContent;
      } else {
        // Handle direct field updates
        if (field.includes('.')) {
          const fieldParts = field.split('.');
          const newContent = { ...prev };
          let current = newContent;
          
          for (let i = 0; i < fieldParts.length - 1; i++) {
            if (!current[fieldParts[i]]) {
              current[fieldParts[i]] = {};
            }
            current = current[fieldParts[i]];
          }
          current[fieldParts[fieldParts.length - 1]] = value;
          
          return newContent;
        } else {
          return { ...prev, [field]: value };
        }
      }
    });
  };

  const handleArrayChange = (field, index, value) => {
    setEditContent(prev => {
      const array = [...(prev[field] || [])];
      array[index] = value;
      return { ...prev, [field]: array };
    });
  };

  const handleFileUpload = async (sectionKey, file) => {
    try {
      setFileUploading(prev => ({ ...prev, [sectionKey]: true }));
      
      const uploadedUrl = await aboutUsService.uploadFile(file);
      
      // Update the documentUrl field
      setEditContent(prev => ({ ...prev, documentUrl: uploadedUrl }));
      
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setFileUploading(prev => ({ ...prev, [sectionKey]: false }));
    }
  };

  const handleImageUpload = async (sectionKey, imageField, file) => {
    try {
      setImageUploading(prev => ({ ...prev, [sectionKey]: true }));
      
      const uploadedUrl = await aboutUsService.uploadImage(file);
      
      // Update the specific image field
      handleContentChange(imageField, null, uploadedUrl);
      
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(prev => ({ ...prev, [sectionKey]: false }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      await aboutUsService.updateSection(selectedSection, editContent);
      
      // Update local sections state
      setSections(prev => ({
        ...prev,
        [selectedSection]: { ...prev[selectedSection], ...editContent }
      }));
      
      toast.success("Section updated successfully");
    } catch (error) {
      console.error("Error saving section:", error);
      toast.error("Failed to save section");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedSection(null);
    setEditContent({});
    localStorage.removeItem("selectedAboutUsSection");
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading About Us content...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">You must be logged in to view this page</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0C2340] mb-2">
            About Us Content Management
          </h1>
          <p className="text-gray-600">
            Manage all About Us section content from this centralized dashboard
          </p>
        </div>

        {selectedSection ? (
          <ContentEditor
            section={sections[selectedSection]}
            sectionKey={selectedSection}
            editContent={editContent}
            onContentChange={handleContentChange}
            onArrayChange={handleArrayChange}
            onFileUpload={handleFileUpload}
            onImageUpload={handleImageUpload}
            onSave={handleSave}
            onCancel={handleCancel}
            fileUploading={fileUploading}
            imageUploading={imageUploading}
          />
        ) : (
          <SectionSelector
            sections={sections}
            selectedSection={selectedSection}
            onSectionSelect={handleSectionSelect}
          />
        )}
      </div>
    </div>
  );
};

export default AboutUsManager; 
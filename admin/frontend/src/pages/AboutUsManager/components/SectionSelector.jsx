import React from "react";
import { FileText, ChevronRight } from "lucide-react";

const SectionSelector = ({ 
  sections, 
  selectedSection, 
  onSectionSelect 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#0C2340] mb-4 flex items-center">
        <FileText className="mr-2" size={24} />
        About Us Sections
      </h2>
      
      <p className="text-gray-600 mb-6">
        Select a section from the list below to edit its content. All changes will be reflected on the public-facing website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(sections).map((sectionKey) => {
          const section = sections[sectionKey];
          const isSelected = selectedSection === sectionKey;
          
          return (
            <button
              key={sectionKey}
              onClick={() => onSectionSelect(sectionKey)}
              className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? "border-[#0C2340] bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {section.subtitle}
                  </p>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`text-gray-400 transition-transform ${
                    isSelected ? "rotate-90" : ""
                  }`} 
                />
              </div>
            </button>
          );
        })}
      </div>

      {Object.keys(sections).length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">No sections available</div>
          <p className="text-gray-400">Contact system administrator to configure sections.</p>
        </div>
      )}
    </div>
  );
};

export default SectionSelector; 
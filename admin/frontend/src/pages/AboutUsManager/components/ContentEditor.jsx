import React from "react";
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Type,
  Users,
  FileText,
  Calendar
} from "lucide-react";
import FileUploadManager from "./FileUploadManager";

const ContentEditor = ({
  section,
  sectionKey,
  editContent,
  onContentChange,
  onArrayChange,
  onFileUpload,
  onImageUpload,
  onSave,
  onCancel,
  fileUploading,
  imageUploading
}) => {
  const renderField = (field, label, type = "text", options = {}) => {
    const value = editContent[field] || "";
    
    switch (type) {
      case "textarea":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <textarea
              value={value}
              onChange={(e) => onContentChange(field, null, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={options.rows || 4}
              placeholder={options.placeholder}
            />
          </div>
        );
        
      case "array":
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            {(editContent[field] || []).map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => onArrayChange(field, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`${label} item ${index + 1}`}
                />
                <button
                  onClick={() => {
                    const newArray = [...(editContent[field] || [])];
                    newArray.splice(index, 1);
                    onContentChange(field, null, newArray);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newArray = [...(editContent[field] || []), ""];
                onContentChange(field, null, newArray);
              }}
              className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 p-2 rounded-md"
            >
              <Plus size={16} />
              <span>Add {label} Item</span>
            </button>
          </div>
        );
        
      case "image":
        return (
          <div className="mb-6">
            <FileUploadManager
              section={sectionKey}
              field={field}
              currentUrl={value}
              onFileUpload={onImageUpload}
              onUrlChange={onContentChange}
              onRemove={(section, field) => onContentChange(field, null, "")}
              isUploading={imageUploading[sectionKey]}
              allowedTypes={["image/*"]}
              maxSize={5}
              title={label}
            />
          </div>
        );
        
      case "file":
        return (
          <div className="mb-6">
            <FileUploadManager
              section={sectionKey}
              field={field}
              currentUrl={value}
              onFileUpload={onFileUpload}
              onUrlChange={onContentChange}
              onRemove={(section, field) => onContentChange(field, null, "")}
              isUploading={fileUploading[sectionKey]}
              allowedTypes={[".pdf", ".doc", ".docx"]}
              maxSize={10}
              title={label}
            />
          </div>
        );
        
      default:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => onContentChange(field, null, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={options.placeholder}
            />
          </div>
        );
    }
  };

  const renderSpecificEditor = () => {
    switch (sectionKey) {
      case "History":
        return (
          <div className="space-y-6">
            {renderField("title", "Section Title")}
            {renderField("subtitle", "Section Subtitle")}
            {renderField("headerImage", "Header Image", "image")}
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="mr-2" size={20} />
                History Sections
              </h3>
              
              {/* Establishment */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Establishment</h4>
                {renderField("sections.establishment.heading", "Heading")}
                {renderField("sections.establishment.text", "Content", "textarea", { rows: 4 })}
                {renderField("sections.establishment.image", "Image", "image")}
              </div>
              
              {/* Endeavor */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">An Endeavor called Fr. CRIT</h4>
                {renderField("sections.endeavor.heading", "Heading")}
                {renderField("sections.endeavor.text", "Content", "textarea", { rows: 6 })}
                {renderField("sections.endeavor.image", "Image", "image")}
              </div>
              
              {/* History */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">History</h4>
                {renderField("sections.history.heading", "Heading")}
                {renderField("sections.history.text", "Content", "textarea", { rows: 8 })}
                {renderField("sections.history.image", "Image", "image")}
              </div>
            </div>
          </div>
        );

      case "Vision and Mission":
        return (
          <div className="space-y-6">
            {renderField("title", "Section Title")}
            {renderField("subtitle", "Section Subtitle")}
            {renderField("headerImage", "Header Image", "image")}
            {renderField("vision", "Vision Statement", "textarea", { rows: 4 })}
            {renderField("mission", "Mission Points", "array")}
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Director's Message</h3>
              {renderField("message.author", "Author Name")}
              {renderField("message.text", "Message Content", "textarea", { rows: 10 })}
              {renderField("message.image", "Author Image", "image")}
            </div>
          </div>
        );

      case "Trustees":
        return (
          <div className="space-y-6">
            {renderField("title", "Section Title")}
            {renderField("subtitle", "Section Subtitle")}
            {renderField("headerImage", "Header Image", "image")}
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                Trustees List
              </h3>
              
              {(editContent.trustees || []).map((trustee, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Trustee {index + 1}</h4>
                    <button
                      onClick={() => {
                        const newTrustees = [...(editContent.trustees || [])];
                        newTrustees.splice(index, 1);
                        onContentChange("trustees", null, newTrustees);
                      }}
                      className="text-red-600 hover:bg-red-100 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={trustee.name || ""}
                      onChange={(e) => {
                        const newTrustees = [...(editContent.trustees || [])];
                        newTrustees[index] = { ...trustee, name: e.target.value };
                        onContentChange("trustees", null, newTrustees);
                      }}
                      placeholder="Name"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={trustee.position || ""}
                      onChange={(e) => {
                        const newTrustees = [...(editContent.trustees || [])];
                        newTrustees[index] = { ...trustee, position: e.target.value };
                        onContentChange("trustees", null, newTrustees);
                      }}
                      placeholder="Position"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="url"
                      value={trustee.image || ""}
                      onChange={(e) => {
                        const newTrustees = [...(editContent.trustees || [])];
                        newTrustees[index] = { ...trustee, image: e.target.value };
                        onContentChange("trustees", null, newTrustees);
                      }}
                      placeholder="Image URL"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newTrustees = [...(editContent.trustees || []), { name: "", position: "", image: "" }];
                  onContentChange("trustees", null, newTrustees);
                }}
                className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 p-2 rounded-md"
              >
                <Plus size={16} />
                <span>Add Trustee</span>
              </button>
            </div>
          </div>
        );

      case "Service Regulation":
      case "Best Practices":
      case "Mandatory Disclosures":
        return (
          <div className="space-y-6">
            {renderField("title", "Section Title")}
            {renderField("subtitle", "Section Subtitle")}
            {renderField("headerImage", "Header Image", "image")}
            {renderField("content", "Content", "textarea", { rows: 6 })}
            {renderField("documentUrl", "Document", "file")}
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {renderField("title", "Section Title")}
            {renderField("subtitle", "Section Subtitle")}
            {renderField("headerImage", "Header Image", "image")}
            {renderField("content", "Content", "textarea", { rows: 8 })}
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0C2340] flex items-center">
          <Type className="mr-2" size={24} />
          Edit {section.title}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 p-2"
          title="Close editor"
        >
          <X size={20} />
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Make changes to the {section.title} section content below.
      </p>

      <div className="max-h-96 overflow-y-auto">
        {renderSpecificEditor()}
      </div>

      <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2 bg-[#0C2340] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default ContentEditor; 
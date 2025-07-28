import React, { useState } from "react";
import { Upload, File, X, Check, AlertCircle } from "lucide-react";

const FileUploadManager = ({ 
  section,
  field,
  currentUrl,
  onFileUpload,
  onUrlChange,
  onRemove,
  isUploading = false,
  allowedTypes = ["image/*", ".pdf"],
  maxSize = 10, // MB
  title = "Upload File"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type if restrictions exist
    if (allowedTypes.length > 0) {
      const isAllowed = allowedTypes.some(type => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        } else if (type.includes("/*")) {
          const mainType = type.split("/")[0];
          return file.type.startsWith(mainType);
        } else {
          return file.type === type;
        }
      });

      if (!isAllowed) {
        return `File type not allowed. Accepted types: ${allowedTypes.join(", ")}`;
      }
    }

    return null;
  };

  const handleFileSelect = (file) => {
    setError("");
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileUpload(section, field, file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const getFileIcon = (url) => {
    if (!url) return <File size={20} />;
    
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <img src={url} alt="Preview" className="w-5 h-5 object-cover rounded" />;
    } else {
      return <File size={20} />;
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {title}
      </label>

      {/* Current File Display */}
      {currentUrl && (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            {getFileIcon(currentUrl)}
            <div>
              <p className="text-sm font-medium text-green-800">
                Current file uploaded
              </p>
              <p className="text-xs text-green-600 truncate max-w-xs">
                {currentUrl}
              </p>
            </div>
          </div>
          <button
            onClick={() => onRemove(section, field)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : isUploading
            ? "border-gray-300 bg-gray-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id={`file-upload-${section}-${field}`}
          accept={allowedTypes.join(",")}
          className="hidden"
          onChange={handleInputChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label
                htmlFor={`file-upload-${section}-${field}`}
                className="cursor-pointer bg-[#0C2340] text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90 transition-colors"
              >
                Choose File
              </label>
              <p className="mt-2 text-sm text-gray-500">
                or drag and drop here
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Max size: {maxSize}MB | Types: {allowedTypes.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={16} className="text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* URL Input as Alternative */}
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or enter file URL directly:
        </label>
        <input
          type="url"
          value={currentUrl || ""}
          onChange={(e) => onUrlChange(section, field, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/file.pdf"
        />
      </div>
    </div>
  );
};

export default FileUploadManager; 
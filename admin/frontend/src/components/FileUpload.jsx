import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaUpload, FaSpinner, FaFilePdf, FaImage, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Example icons

// Configure axios - might be redundant if globally configured, but safe to include
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663'; // Adjust if needed

const FileUpload = ({
  sectionKey,          // Unique identifier for the section/context
  fieldKey,            // The specific field this upload relates to (e.g., 'documentUrl', 'logo')
  currentUrl,          // The existing URL of the file/image, if any
  onUploadSuccess,     // Callback function: (sectionKey, fieldKey, url, fileName) => void
  onUploadStart,       // Callback function: (sectionKey, fieldKey) => void
  isUploading,         // Boolean indicating if an upload is currently in progress for this instance
  allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'], 
  label = "Upload File", // Default label for the button/input
  uploadPath = "uploads",
  className = ""
}) => {
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Function to validate file type
  const validateFileType = (file) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
  };

  // Function to handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!validateFileType(file)) {
      setError(`Invalid file type. Please upload one of: ${allowedTypes.join(', ')}`);
      return;
    }

    // Clear previous errors
    setError(null);
    
    // Signal upload start if callback provided
    if (onUploadStart) onUploadStart();
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Upload file to server
      const response = await axios.post(`/api/upload/${uploadPath}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Get file URL from response
      const fileUrl = response.data.fileUrl;
      const fileName = file.name;
      
      // Call success callback with file URL and name
      if (onUploadSuccess) {
        onUploadSuccess(sectionKey, fieldKey, fileUrl, fileName);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  // Handle drag events for drag-and-drop functionality
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    // Validate file type
    if (!validateFileType(file)) {
      setError(`Invalid file type. Please upload one of: ${allowedTypes.join(', ')}`);
      return;
    }
    
    // Update the file input reference with the dropped file
    // This is a workaround as there's no direct way to set the file input value
    // Instead we'll manually handle the upload
    
    // Clear previous errors
    setError(null);
    
    // Signal upload start if callback provided
    if (onUploadStart) onUploadStart();
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Upload the file
    axios.post(`/api/upload/${uploadPath}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // Get file URL from response
      const fileUrl = response.data.fileUrl;
      const fileName = file.name;
      
      // Call success callback with file URL and name
      if (onUploadSuccess) {
        onUploadSuccess(sectionKey, fieldKey, fileUrl, fileName);
      }
    })
    .catch(error => {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.response?.data?.error || error.message}`);
    });
  };

  // Get file extensions for display
  const getAllowedExtensions = () => {
    return allowedTypes.map(type => {
      const parts = type.split('/');
      return parts[1] === '*' ? parts[0] : parts[1];
    }).join(', ');
  };

  // Determine which icon to show based on allowed types
  const getFileIcon = () => {
    if (allowedTypes.includes('image/jpeg') || allowedTypes.includes('image/png') || allowedTypes.includes('image/gif')) {
      return (
        <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (allowedTypes.includes('application/pdf')) {
      return (
        <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };

  return (
    <div>
      {/* Main uploader component */}
      <div 
        className={`relative ${className} ${isDragging ? 'bg-blue-50 border-blue-300' : ''} ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={allowedTypes.join(',')}
          disabled={isUploading}
        />
        
        <div className="text-center py-4">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0C2340] mb-3"></div>
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          ) : (
            <>
              {getFileIcon()}
              <div className="mt-3">
                <p className="text-sm font-medium text-[#0C2340]">{label}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Allowed formats: {getAllowedExtensions()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload; 
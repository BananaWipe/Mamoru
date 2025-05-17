import React, { useState } from 'react';

const EvidenceUploader = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  
  // Maximum file size in bytes (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  // Allowed file types
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const validateFile = (file) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File ${file.name} is too large. Maximum size is 5MB.`);
      return false;
    }
    
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(`File ${file.name} is not supported. Please upload JPG, PNG, or PDF files.`);
      return false;
    }
    
    return true;
  };
  
  const processFiles = (fileList) => {
    const validFiles = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }
    
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onChange(newFiles);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
  };
  
  // Generate a preview URL for the file
  const getPreviewUrl = (file) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    } else if (file.type === 'application/pdf') {
      return '/assets/pdf-icon.png';
    }
    return null;
  };
  
  return (
    <div className="mb-4">
      {/* File Drop Area */}
      <div 
        className={`border-2 border-dashed p-6 rounded-lg text-center ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-700 mb-1">Drag and drop files here, or</p>
        <label className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg cursor-pointer transition">
          Browse Files
          <input 
            type="file" 
            multiple 
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden" 
            onChange={handleFileChange} 
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">
          JPG, PNG, or PDF (max 5MB each)
        </p>
      </div>
      
      {/* File Previews */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">
            Uploaded Evidence ({files.length} {files.length === 1 ? 'file' : 'files'})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {files.map((file, index) => (
              <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                {file.type.startsWith('image/') ? (
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={getPreviewUrl(file)} 
                      alt={`Evidence ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 aspect-w-4 aspect-h-3">
                    <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="p-2 bg-white border-t border-gray-200">
                  <div className="truncate text-xs text-gray-700">{file.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceUploader;
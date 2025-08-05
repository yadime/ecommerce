import React, { useState, useRef, useCallback } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, onImageUrlChange, currentImage, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Please select a valid image file (JPG, PNG, GIF, etc.)' };
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: 'Image file size must be less than 5MB' };
    }

    return { valid: true };
  };

  const handleFileSelect = useCallback((file) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    onImageSelect(file);
  }, [onImageSelect]);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter === 0) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUrlChange = (e) => {
    onImageUrlChange(e.target.value);
  };

  return (
    <div className="image-upload-container">
      <div className="image-upload-options">
        <div className="upload-option">
          <div
            className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
            <div className="upload-content">
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <span className="upload-title">Upload Image</span>
                <span className="upload-subtitle">Drag & drop or click to browse</span>
              </div>
            </div>
            <div className="upload-requirements">
              <small>Max 5MB • JPG, PNG, GIF</small>
            </div>
          </div>
        </div>

        <div className="upload-divider">
          <span>OR</span>
        </div>

        <div className="upload-option">
          <div className="url-input-container">
            <input
              type="url"
              placeholder="Enter image URL"
              onChange={handleUrlChange}
              className="image-url-input"
              disabled={isUploading}
            />
            <small>Paste image URL from the web</small>
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <small>Uploading image...</small>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
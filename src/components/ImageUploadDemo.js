import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import './ImageUploadDemo.css';

const ImageUploadDemo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    setImageUrl('');
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
    setPreview(url);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile && !imageUrl) {
      alert('Please select an image or enter an image URL');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      alert('Image uploaded successfully!');
    }, 2000);
  };

  const clearAll = () => {
    setSelectedFile(null);
    setImageUrl('');
    setPreview('');
  };

  return (
    <div className="image-upload-demo">
      <div className="demo-header">
        <h1>🖼️ Image Upload Demo</h1>
        <p>Test the new admin image upload functionality</p>
      </div>

      <div className="demo-content">
        <div className="upload-section">
          <h2>Upload Options</h2>
          <ImageUpload
            onImageSelect={handleImageSelect}
            onImageUrlChange={handleImageUrlChange}
            currentImage={preview}
            isUploading={isUploading}
          />
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <div className="preview-info">
                {selectedFile && (
                  <>
                    <p><strong>File:</strong> {selectedFile.name}</p>
                    <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p><strong>Type:</strong> {selectedFile.type}</p>
                  </>
                )}
                {imageUrl && (
                  <p><strong>URL:</strong> {imageUrl}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="no-preview">
              <p>No image selected</p>
              <small>Upload an image or enter a URL to see preview</small>
            </div>
          )}
        </div>

        <div className="demo-actions">
          <button 
            className="upload-btn" 
            onClick={handleUpload}
            disabled={isUploading || (!selectedFile && !imageUrl)}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <button 
            className="clear-btn" 
            onClick={clearAll}
            disabled={isUploading}
          >
            Clear All
          </button>
        </div>

        <div className="demo-features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <h3>Drag & Drop</h3>
              <p>Drag image files directly onto the upload area</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🔍</span>
              <h3>File Browser</h3>
              <p>Click to browse and select image files</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🌐</span>
              <h3>URL Input</h3>
              <p>Paste image URLs from the web</p>
            </div>
            <div className="feature">
              <span className="feature-icon">✅</span>
              <h3>Validation</h3>
              <p>File type, size, and dimension validation</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <h3>Responsive</h3>
              <p>Works seamlessly on all device sizes</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h3>Fast Preview</h3>
              <p>See uploaded images immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadDemo;
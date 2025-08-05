import React, { useState, useEffect, useRef } from 'react';
import ImageUpload from './ImageUpload';
import imageUploadService from '../services/imageUploadService';
import './ProductEditForm.css';

const ProductEditForm = ({ product, isAdding, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    rating: '',
    reviews: '',
    description: '',
    inStock: true,
    discount: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (product && !isAdding) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        image: product.image || '',
        category: product.category || '',
        rating: product.rating || '',
        reviews: product.reviews || '',
        description: product.description || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        discount: product.discount || ''
      });
      setImagePreview(product.image || '');
    }
  }, [product, isAdding]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageSelect = async (file) => {
    try {
      // Validate image dimensions
      const dimensionValidation = await imageUploadService.validateImageDimensions(file);
      if (!dimensionValidation.valid) {
        alert(dimensionValidation.message);
        return;
      }

      // Compress image if needed
      const compressedFile = await imageUploadService.compressImage(file);
      
      setImageFile(compressedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(compressedFile);
      
      // Clear the URL input when file is uploaded
      setFormData(prev => ({ ...prev, image: '' }));
    } catch (error) {
      alert('Error processing image: ' + error.message);
    }
  };

  const handleImageUrlChange = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
    setImageFile(null);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const uploadImageToServer = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await imageUploadService.uploadImage(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return result.url;
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalImageUrl = formData.image;
    
    // If there's a file to upload, upload it first
    if (imageFile) {
      try {
        finalImageUrl = await uploadImageToServer(imageFile);
      } catch (error) {
        alert('Failed to upload image: ' + error.message);
        return;
      }
    }
    
    const productData = {
      ...formData,
      image: finalImageUrl,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      discount: parseInt(formData.discount)
    };

    onSave(productData);
  };

  const calculateDiscount = () => {
    const price = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.originalPrice);
    if (price && originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="product-edit-overlay">
      <div className="product-edit-modal">
        <div className="modal-header">
          <h2>{isAdding ? 'Add New Product' : 'Edit Product'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-edit-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Current Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="originalPrice">Original Price</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount %</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="0"
              />
              {formData.originalPrice && formData.price && (
                <small className="calculated-discount">
                  Calculated: {calculateDiscount()}%
                </small>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviews">Number of Reviews</label>
              <input
                type="number"
                id="reviews"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="inStock" className="checkbox-label">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                />
                In Stock
              </label>
            </div>
          </div>

          <div className="form-group image-upload-section">
            <label>Product Image *</label>
            
            <ImageUpload
              onImageSelect={handleImageSelect}
              onImageUrlChange={handleImageUrlChange}
              currentImage={imagePreview}
              isUploading={isUploading}
            />

            {imagePreview && (
              <div className="image-preview-container">
                <div className="image-preview">
                  <img src={imagePreview} alt="Product preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    ×
                  </button>
                </div>
                {imageFile && (
                  <div className="image-info">
                    <small>File: {imageFile.name}</small>
                    <small>Size: {(imageFile.size / 1024 / 1024).toFixed(2)}MB</small>
                  </div>
                )}
              </div>
            )}

            {isUploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <small>Uploading image... {uploadProgress}%</small>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={isUploading}>
              {isUploading ? 'Uploading...' : (isAdding ? 'Add Product' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm; 
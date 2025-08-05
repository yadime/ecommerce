// Mock Image Upload Service
// In a real application, this would connect to your backend API

class ImageUploadService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'https://api.example.com';
    this.uploadEndpoint = '/api/upload/image';
  }

  // Simulate image upload to server
  async uploadImage(file) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        try {
          // Validate file
          if (!file || !file.type.startsWith('image/')) {
            throw new Error('Invalid file type. Please select an image file.');
          }

          if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size too large. Maximum size is 5MB.');
          }

          // Simulate successful upload
          // In a real application, you would:
          // 1. Create FormData
          // 2. Send POST request to server
          // 3. Handle response from server
          
          const fakeUploadUrl = this.generateFakeUploadUrl(file);
          resolve({
            success: true,
            url: fakeUploadUrl,
            filename: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString()
          });
        } catch (error) {
          reject(error);
        }
      }, 2000); // Simulate 2 second upload time
    });
  }

  // Generate a fake upload URL for demo purposes
  generateFakeUploadUrl(file) {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    
    // Use different image services for variety
    const services = [
      `https://images.unsplash.com/photo-${timestamp}?w=400&h=400&fit=crop`,
      `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?w=400&h=400&fit=crop`,
      `https://picsum.photos/400/400?random=${timestamp}`,
      `https://via.placeholder.com/400x400/3b82f6/ffffff?text=${encodeURIComponent(file.name)}`
    ];
    
    return services[Math.floor(Math.random() * services.length)];
  }

  // Delete uploaded image (for cleanup)
  async deleteImage(imageUrl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real application, you would send DELETE request to server
        console.log(`Deleting image: ${imageUrl}`);
        resolve({ success: true });
      }, 500);
    });
  }

  // Get upload progress (for real implementations)
  getUploadProgress(uploadId) {
    // In a real application, you would track upload progress
    return new Promise((resolve) => {
      const progress = Math.random() * 100;
      resolve(progress);
    });
  }

  // Validate image dimensions
  async validateImageDimensions(file) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        const isValid = img.width >= 200 && img.height >= 200;
        resolve({
          valid: isValid,
          width: img.width,
          height: img.height,
          message: isValid ? 'Image dimensions are valid' : 'Image should be at least 200x200 pixels'
        });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({
          valid: false,
          message: 'Could not load image for validation'
        });
      };
      
      img.src = url;
    });
  }

  // Compress image before upload (for large images)
  async compressImage(file, maxSize = 1024 * 1024) {
    return new Promise((resolve) => {
      if (file.size <= maxSize) {
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        
        // Calculate new dimensions
        let { width, height } = img;
        const ratio = Math.min(maxSize / file.size, 1);
        
        if (ratio < 1) {
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        }, file.type, 0.8);
      };

      img.src = url;
    });
  }
}

// Create singleton instance
const imageUploadService = new ImageUploadService();

export default imageUploadService;
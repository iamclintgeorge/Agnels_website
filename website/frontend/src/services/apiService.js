import axios from 'axios';

// Configure axios base settings
const API = axios.create({
  baseURL: 'http://localhost:3663',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// About Us API methods
export const aboutUsApi = {
  // NOTE: These methods are available but not currently used for the Managing Director's Desk section,
  // which uses static content defined in aboutusContent.jsx instead of fetching from the backend.
  
  // Get a specific section's content
  getSection: async (sectionKey) => {
    try {
      console.log(`API call: Getting section content for "${sectionKey}"`);
      
      // Use the dedicated endpoint with encoded key for special characters
      const encodedKey = encodeURIComponent(sectionKey);
      console.log(`Encoded section key: ${encodedKey}`);
      
      // Use the new endpoint that handles encoded section keys
      const response = await API.get(`/api/aboutus/section/${encodedKey}`);
      console.log(`API response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching section ${sectionKey}:`, error);
      // Return a default object structure in case of error
      return { 
        sectionKey,
        content: {}
      };
    }
  },
  
  // Get all sections
  getAllSections: async () => {
    try {
      const response = await API.get('/api/aboutus');
      return response.data;
    } catch (error) {
      console.error('Error fetching all sections:', error);
      return [];
    }
  },
  
  // Helper to format image URLs
  formatImageUrl: (imageUrl) => {
    if (!imageUrl) return '';
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative path from the uploads directory
    if (imageUrl.startsWith('uploads/')) {
      return `http://localhost:3663/${imageUrl}`;
    }
    
    // If it's a relative path with leading slash
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:3663${imageUrl}`;
    }
    
    // If it's a local asset path, return as is for webpack to handle
    if (imageUrl.startsWith('src/assets/')) {
      return imageUrl;
    }
    
    // Return as is if none of the above conditions are met
    return imageUrl;
  }
};

export default API; 
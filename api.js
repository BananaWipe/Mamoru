// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if provided
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Handle API errors
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } else {
      // Handle non-JSON responses (like image uploads)
      if (!response.ok) {
        throw new Error('An error occurred');
      }
      
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth endpoints
export const authenticateWithWallet = async (address, signature) => {
  return apiRequest('/auth/wallet', {
    method: 'POST',
    body: JSON.stringify({ address, signature }),
  });
};

export const fetchUserProfile = async (token) => {
  return apiRequest('/auth/profile', {
    token,
  });
};

// Website verification endpoints
export const checkWebsite = async (url) => {
  return apiRequest(`/websites/check?url=${encodeURIComponent(url)}`);
};

export const getRecentVerifications = async () => {
  return apiRequest('/websites/recent');
};

// Report endpoints
export const submitReport = async (reportData, token) => {
  return apiRequest('/reports', {
    method: 'POST',
    body: JSON.stringify(reportData),
    token,
  });
};

export const getUserReports = async (token) => {
  return apiRequest('/reports/user', {
    token,
  });
};

export const getRecentReports = async () => {
  return apiRequest('/reports/recent');
};

// Dashboard statistics
export const getDashboardStats = async (token) => {
  return apiRequest('/stats/dashboard', {
    token,
  });
};

// Blockchain verification
export const verifyOnchain = async (reportId, token) => {
  return apiRequest(`/blockchain/verify/${reportId}`, {
    method: 'POST',
    token,
  });
};

export const getTransactionStatus = async (txHash) => {
  return apiRequest(`/blockchain/tx/${txHash}`);
};

export default {
  authenticateWithWallet,
  fetchUserProfile,
  checkWebsite,
  getRecentVerifications,
  submitReport,
  getUserReports,
  getRecentReports,
  getDashboardStats,
  verifyOnchain,
  getTransactionStatus,
};
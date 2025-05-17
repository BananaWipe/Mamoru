import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkWebsite } from '../services/api';

const CheckForm = ({ className = '' }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (error) setError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }
    
    try {
      setLoading(true);
      
      // Add http:// if missing
      let urlToCheck = url;
      if (!/^https?:\/\//i.test(url)) {
        urlToCheck = 'https://' + url;
      }
      
      // Check the website
      const result = await checkWebsite(urlToCheck);
      
      // Redirect to verify page with the result
      navigate(`/verify?url=${encodeURIComponent(urlToCheck)}`);
    } catch (err) {
      setError(err.message || 'Failed to check website. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter website URL (e.g., example.com)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && (
              <p className="absolute -bottom-6 left-0 text-red-600 text-sm">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              'Check Website'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckForm;
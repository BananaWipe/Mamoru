import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkWebsite } from '../services/api';
import StatusIndicator from '../components/verification/StatusIndicator';
import ThreatDetails from '../components/verification/ThreatDetails';
import ReportButton from '../components/common/ReportButton';

const Verify = () => {
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Extract URL from query params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlParam = params.get('url');
    
    if (urlParam) {
      setUrl(urlParam);
      handleVerify(urlParam);
    }
  }, [location.search]);
  
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    // Reset results when input changes
    if (result) setResult(null);
    if (error) setError(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify(url);
  };
  
  const handleVerify = async (urlToVerify) => {
    if (!urlToVerify) {
      setError('Please enter a website URL');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Add https:// if missing
      let formattedUrl = urlToVerify;
      if (!/^https?:\/\//i.test(urlToVerify)) {
        formattedUrl = 'https://' + urlToVerify;
      }
      
      const data = await checkWebsite(formattedUrl);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to check website. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Verify Website Safety
          </h1>
          
          {/* Verification Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
                  Enter website URL to check
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="e.g., example.com"
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="loading-spinner mr-2"></span>
                        Verifying...
                      </span>
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </div>
            </form>
            
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>
          
          {/* Verification Results */}
          {result && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Status Header */}
              <div className={`p-6 ${
                result.status === 'safe' 
                  ? 'bg-green-50 border-b border-green-100' 
                  : result.status === 'danger' 
                    ? 'bg-red-50 border-b border-red-100' 
                    : 'bg-yellow-50 border-b border-yellow-100'
              }`}>
                <div className="flex items-center">
                  <StatusIndicator status={result.status} className="mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {result.url}
                    </h2>
                    <p className={`mt-1 ${
                      result.status === 'safe' 
                        ? 'text-green-700' 
                        : result.status === 'danger' 
                          ? 'text-red-700' 
                          : 'text-yellow-700'
                    }`}>
                      {result.status === 'safe' 
                        ? 'This website appears to be legitimate and has no reported issues.' 
                        : result.status === 'danger' 
                          ? 'Warning! This website has been reported as potentially fraudulent.' 
                          : 'This website has not been verified yet.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="p-6">
                <ThreatDetails result={result} />
                
                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">
                        Disagree with this assessment?
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Help keep our database accurate by submitting your feedback.
                      </p>
                    </div>
                    <ReportButton url={result.url} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Info Card */}
          {!result && !loading && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-800 mb-2">
                How our verification works
              </h3>
              <p className="text-blue-700 mb-4">
                Our system checks websites against a database of known fraudulent sites, analyzes 
                on-chain reports, and employs advanced detection techniques to determine if a 
                website may pose a risk.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <span>Community-powered fraud reports</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </span>
                  <span>Blockchain-verified data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </span>
                  <span>Pattern recognition technology</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
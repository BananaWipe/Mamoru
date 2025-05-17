import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount, useSignMessage } from 'wagmi';
import { useAuthContext } from '../hooks/useAuth';
import { submitReport } from '../services/api';
import ConnectWallet from './ConnectWallet';
import EvidenceUploader from './reports/EvidenceUploader';

const ReportForm = ({ initialUrl = '' }) => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { user, isLoggedIn, authToken } = useAuthContext();
  const { signMessageAsync } = useSignMessage();
  
  // Form state
  const [url, setUrl] = useState(initialUrl);
  const [category, setCategory] = useState('phishing');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (errors.url) {
      setErrors({
        ...errors,
        url: null
      });
    }
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors({
        ...errors,
        description: null
      });
    }
  };
  
  const handleEvidenceChange = (files) => {
    setEvidence(files);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!url.trim()) {
      newErrors.url = 'Please enter a website URL';
    } else if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i.test(url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please describe the fraudulent activity';
    } else if (description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!isConnected || !isLoggedIn) {
      toast.error('Please connect your wallet to submit a report');
      return;
    }
    
    try {
      setLoading(true);
      
      // Format the URL properly
      let formattedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        formattedUrl = 'https://' + url;
      }
      
      // Create the report data
      const reportData = {
        url: formattedUrl,
        category,
        description,
        evidence,
        reporterAddress: address
      };
      
      // Sign the report with wallet for authentication
      const message = `I am reporting ${formattedUrl} as a fraudulent website due to ${category} activity. Timestamp: ${Date.now()}`;
      const signature = await signMessageAsync({ message });
      
      // Submit the report to API
      const response = await submitReport(
        { ...reportData, signature, message },
        authToken
      );
      
      // Show success message and navigate to dashboard
      toast.success('Report submitted successfully');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error(error.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const categoryOptions = [
    { value: 'phishing', label: 'Phishing' },
    { value: 'scam', label: 'Scam' },
    { value: 'malware', label: 'Malware' },
    { value: 'fake_store', label: 'Fake Store' },
    { value: 'impersonation', label: 'Impersonation' },
    { value: 'crypto_scam', label: 'Cryptocurrency Scam' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!isConnected ? (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Wallet connection required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You need to connect your wallet to submit a report. This helps ensure the 
                  authenticity of reports and prevents spam.
                </p>
              </div>
              <div className="mt-4">
                <ConnectWallet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Website URL */}
          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
              Website URL *
            </label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="e.g., suspicious-website.com"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.url ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url}</p>
            )}
          </div>
          
          {/* Fraud Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Fraud Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe what makes this website fraudulent. Include specific details about your experience."
              rows={5}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.description ? (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                Minimum 20 characters. Be specific and factual.
              </p>
            )}
          </div>
          
          {/* Evidence */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Evidence (Optional)
            </label>
            <EvidenceUploader onChange={handleEvidenceChange} />
            <p className="mt-1 text-sm text-gray-500">
              Upload screenshots or other evidence to support your report. Accepted formats: JPG, PNG, PDF (max 5MB each).
            </p>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading || !isConnected}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Report...
                </span>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportForm;
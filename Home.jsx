import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkWebsite } from '../services/api';

const Home = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    // Reset results when input changes
    if (result) setResult(null);
    if (error) setError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!url) {
      setError('Please enter a website URL');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Add http:// if missing
      let urlToCheck = url;
      if (!/^https?:\/\//i.test(url)) {
        urlToCheck = 'https://' + url;
      }
      
      const data = await checkWebsite(urlToCheck);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to check website. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Safe from Fraudulent Websites
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Protect yourself with our blockchain-powered fraud detection platform. 
            Verify websites, report fraudulent sites, and help build a safer internet.
          </p>
          
          {/* Search Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mb-20 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Check if a Website is Safe
            </h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Enter website URL (e.g., example.com)"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading-spinner mr-2"></span>
                      Checking...
                    </span>
                  ) : (
                    'Check Website'
                  )}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            {result && (
              <div className={`mt-6 p-4 rounded-lg border ${
                result.status === 'safe' 
                  ? 'status-safe' 
                  : result.status === 'danger' 
                    ? 'status-danger' 
                    : 'status-unknown'
              }`}>
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {result.status === 'safe' ? (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : result.status === 'danger' ? (
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {result.url}
                    </h3>
                    <p>
                      {result.status === 'safe' 
                        ? 'This website appears to be legitimate and has no reported issues.' 
                        : result.status === 'danger' 
                          ? 'Warning! This website has been reported as potentially fraudulent.' 
                          : 'This website has not been verified yet.'}
                    </p>
                    
                    <div className="mt-2">
                      <Link 
                        to={`/verify?url=${encodeURIComponent(result.url)}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View detailed report →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-4">
              Want to report a fraudulent website? <Link to="/report" className="text-blue-600 hover:text-blue-800">Submit a report</Link>
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 mt-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How FraudGuard Protects You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages blockchain technology and community reports to 
              identify and flag fraudulent websites before they can harm you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 verification-card">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Real-time Website Verification
              </h3>
              <p className="text-gray-600 mb-4">
                Check any website instantly against our database of known fraudulent 
                sites to browse safely and protect your personal information.
              </p>
              <Link to="/verify" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Verify a website
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 verification-card">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community-Powered Reports
              </h3>
              <p className="text-gray-600 mb-4">
                Join our community of users who report and verify fraudulent websites, 
                creating a powerful network of protection for everyone.
              </p>
              <Link to="/report" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Report a website
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 verification-card">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Blockchain Verification
              </h3>
              <p className="text-gray-600 mb-4">
                All reports are secured on the Base blockchain, ensuring transparency, 
                immutability, and reliability of our fraud detection system.
              </p>
              <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Browser Extension */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="/assets/extension-mockup.png" 
                alt="Browser Extension" 
                className="max-w-md mx-auto shadow-xl rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/450x300?text=Browser+Extension';
                }}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Get Protected with Our Browser Extension
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Install our free browser extension for real-time protection as you browse. 
                Get instant alerts when you visit potentially dangerous websites.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time protection while browsing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visual alerts for dangerous sites</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy reporting of suspicious sites</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.214 8.69l6.715-1.679A1.5 1.5 0 0124 8.484v7.032a1.5 1.5 0 01-1.071 1.474l-6.715 1.679a1.5 1.5 0 01-1.818-1.474V10.163a1.5 1.5 0 011.818-1.474zm-8.428 0l-6.715-1.679A1.5 1.5 0 000 8.484v7.032a1.5 1.5 0 001.071 1.474l6.715 1.679a1.5 1.5 0 001.818-1.474V10.163a1.5 1.5 0 00-1.818-1.474zM10.071.332a1.5 1.5 0 011.858 0l3.535 2.646a1.5 1.5 0 010 2.334l-3.535 2.646a1.5 1.5 0 01-1.858 0L6.536 5.312a1.5 1.5 0 010-2.334L10.07.332z" />
                  </svg>
                  Get for Chrome
                </a>
                <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.998 0C5.366 0 0 5.367 0 12a11.992 11.992 0 007.703 11.217l8.33-14.916C17.027 6.197 14.643 5 11.998 5V0zm.006 0v5c2.646 0 5.03 1.197 6.025 3.301h5.267c-1.606-4.687-6.006-8.056-11.292-8.301zM23.3 12H13.005c0 2.645-1.198 5.029-3.302 6.025L7.703 23.217A11.992 11.992 0 0024 12h-.7zm-13.005 0h-3.302L4.7 18.025C6.303 21.205 9.675 23.277 13.6 23.975L16.998 18c-3.66-.27-6.697-3.307-6.967-6H10.3v.001l-.004-.001z" />
                  </svg>
                  Get for Firefox
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="gradient-bg py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community and Help Build a Safer Internet
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Start protecting yourself and others by reporting fraudulent websites. 
            Together, we can make the internet safer for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/verify" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition"
            >
              Verify a Website
            </Link>
            <Link 
              to="/report" 
              className="bg-blue-700 text-white hover:bg-blue-800 font-semibold py-3 px-8 rounded-lg transition"
            >
              Report Fraud
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
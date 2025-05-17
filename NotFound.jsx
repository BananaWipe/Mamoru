import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <svg 
              className="w-24 h-24 text-blue-600 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition inline-flex items-center"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Home
          </Link>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Looking for something specific?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/verify" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-200 transition text-sm"
              >
                Verify a Website
              </Link>
              <Link 
                to="/report" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-200 transition text-sm"
              >
                Report Fraud
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-200 transition text-sm"
              >
                Your Dashboard
              </Link>
              <Link 
                to="/about" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-200 transition text-sm"
              >
                About FraudGuard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';

const ThreatDetails = ({ result }) => {
  if (!result) return null;
  
  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Website Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Domain</div>
            <div className="font-medium">{result.domain || result.url}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Status</div>
            <div className={`font-medium ${
              result.status === 'safe' 
                ? 'text-green-600' 
                : result.status === 'danger' 
                  ? 'text-red-600' 
                  : 'text-yellow-600'
            }`}>
              {result.status === 'safe' 
                ? 'Safe' 
                : result.status === 'danger' 
                  ? 'Potentially Fraudulent' 
                  : 'Unverified'}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">First Reported</div>
            <div className="font-medium">{formatDate(result.firstReported)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Last Checked</div>
            <div className="font-medium">{formatDate(result.lastChecked || Date.now())}</div>
          </div>
        </div>
      </div>
      
      {/* Threat Info (if any) */}
      {result.status === 'danger' && result.threats && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Threat Information</h3>
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-medium text-red-800">Reported Issues:</h4>
                <ul className="mt-2 space-y-1 text-red-700">
                  {result.threats.map((threat, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{threat.type}: {threat.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Safe Website Info */}
      {result.status === 'safe' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Information</h3>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="font-medium text-green-800">No Issues Detected</h4>
                <p className="mt-1 text-green-700">
                  This website has been checked by our system and no fraudulent activity has been reported.
                  {result.verificationCount && result.verificationCount > 0 && (
                    ` It has been verified by ${result.verificationCount} community members.`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Unknown Website Info */}
      {result.status === 'unknown' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Verification Status</h3>
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-yellow-800">Not Yet Verified</h4>
                <p className="mt-1 text-yellow-700">
                  This website has not been reported or verified by our community yet. 
                  Exercise caution when providing personal information or making transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Blockchain Verification */}
      {result.blockchainVerification && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Blockchain Verification</h3>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-800">Verified On Chain</h4>
                <p className="mt-1 text-blue-700 mb-2">
                  This website's status has been verified and stored on the Base blockchain for transparency and immutability.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <a 
                    href={`https://basescan.org/tx/${result.blockchainVerification.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                  >
                    <span>View on BaseScan</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Community Reports */}
      {result.communityReports && result.communityReports.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Community Reports</h3>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            {result.communityReports.map((report, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-gray-800">
                    {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(report.timestamp)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {report.description}
                </p>
                <div className="text-sm text-gray-500">
                  Reported by: {report.reporter.substring(0, 6)}...{report.reporter.substring(report.reporter.length - 4)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tips for Users */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Stay Safe Online</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Check for HTTPS and a valid SSL certificate.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Verify the website URL carefully for typos or slight misspellings.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Be cautious with websites that offer deals that seem too good to be true.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Install the FraudGuard browser extension for real-time protection.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetails;
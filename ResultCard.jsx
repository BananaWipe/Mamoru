import React from 'react';
import { Link } from 'react-router-dom';

const ResultCard = ({ result }) => {
  if (!result) return null;
  
  // Status classes
  const getStatusClasses = (status) => {
    switch (status) {
      case 'safe':
        return 'bg-green-50 border-green-100 text-green-800';
      case 'danger':
        return 'bg-red-50 border-red-100 text-red-800';
      case 'unknown':
      default:
        return 'bg-yellow-50 border-yellow-100 text-yellow-800';
    }
  };
  
  // Status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'danger':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'unknown':
      default:
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  // Status messages
  const getStatusMessage = (status) => {
    switch (status) {
      case 'safe':
        return 'This website appears to be legitimate and has no reported issues.';
      case 'danger':
        return 'Warning! This website has been reported as potentially fraudulent.';
      case 'unknown':
      default:
        return 'This website has not been verified yet.';
    }
  };
  
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
    <div className={`border rounded-lg p-5 ${getStatusClasses(result.status)}`}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {getStatusIcon(result.status)}
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {result.url || result.domain}
          </h3>
          <p className="mt-1">
            {getStatusMessage(result.status)}
          </p>
          
          {/* Additional details */}
          <div className="mt-4 pt-4 border-t border-gray-200 border-opacity-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">Status</p>
                <p className="font-medium">{result.status === 'safe' ? 'Safe' : result.status === 'danger' ? 'Fraudulent' : 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Last Checked</p>
                <p className="font-medium">{formatDate(result.lastChecked || Date.now())}</p>
              </div>
            </div>
            
            {/* Threat information */}
            {result.status === 'danger' && result.threats && result.threats.length > 0 && (
              <div className="mt-4">
                <p className="text-sm opacity-75 mb-1">Reported Issues:</p>
                <ul className="list-disc list-inside">
                  {result.threats.map((threat, index) => (
                    <li key={index} className="text-sm">
                      {threat.type}: {threat.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Actions */}
            <div className="mt-4 flex justify-end space-x-3">
              <Link 
                to={`/verify?url=${encodeURIComponent(result.url || result.domain)}`} 
                className="text-sm font-medium hover:underline"
              >
                View Details
              </Link>
              {result.status !== 'safe' && (
                <Link 
                  to={`/report?url=${encodeURIComponent(result.url || result.domain)}`} 
                  className="text-sm font-medium hover:underline"
                >
                  Report Website
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
import React from 'react';
import { Link } from 'react-router-dom';

const ReportButton = ({ url, className = '' }) => {
  return (
    <Link
      to={`/report?url=${encodeURIComponent(url)}`}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center ${className}`}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Report this Website
    </Link>
  );
};

export default ReportButton;
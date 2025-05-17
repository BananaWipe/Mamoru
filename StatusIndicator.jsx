import React from 'react';

const StatusIndicator = ({ status, className = '' }) => {
  let iconColor, bgColor, icon;
  
  switch (status) {
    case 'safe':
      iconColor = 'text-green-600';
      bgColor = 'bg-green-100';
      icon = (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
      
    case 'danger':
      iconColor = 'text-red-600';
      bgColor = 'bg-red-100';
      icon = (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      break;
      
    case 'unknown':
    default:
      iconColor = 'text-yellow-600';
      bgColor = 'bg-yellow-100';
      icon = (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
  }
  
  return (
    <div className={`w-12 h-12 rounded-full ${bgColor} ${iconColor} flex items-center justify-center ${className}`}>
      {icon}
    </div>
  );
};

export default StatusIndicator;
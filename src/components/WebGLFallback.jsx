import React from 'react';

const WebGLFallback = ({ message = "3D content unavailable on this device" }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center p-6">
        <svg 
          className="w-16 h-16 mx-auto mb-4 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default WebGLFallback;

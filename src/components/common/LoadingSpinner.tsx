import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  size = 'md',
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]} border-t-4 border-b-4 border-blue-400 border-solid rounded-full shadow-md`}></div>
      {message && (
        <p className={`text-white mt-4 ${textSizeClasses[size]} animate-pulse`}>
          {message}
        </p>
      )}
    </div>
  );
} 
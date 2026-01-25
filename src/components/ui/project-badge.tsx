"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RotateCcw } from "./icons";

interface ProjectBadgeProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProjectBadge({ src, alt, className = "" }: ProjectBadgeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  const handleLoad = () => {
    console.log('Badge loaded:', src);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.log('Badge error:', src);
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setIsLoading(true);
      setHasError(false);
      setRetryCount(prev => prev + 1);
    }
  };

  const baseClassName = `h-6 transition-all duration-200 ${className}`;

  return (
    <div className="relative inline-block">
      {/* Always render the Image component */}
      <Image
        src={src}
        alt={alt}
        width={120}
        height={24}
        className={`${baseClassName} w-auto hover:scale-105 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        key={retryCount}
        unoptimized
      />

      {/* Loading overlay */}
      {isLoading && !hasError && (
        <div 
          className={`absolute inset-0 ${baseClassName} w-[120px] bg-gray-200 dark:bg-gray-700 rounded`}
          aria-label="Loading badge"
        />
      )}

      {/* Error overlay */}
      {hasError && (
        <div 
          className={`absolute inset-0 ${baseClassName} px-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center justify-center text-xs text-gray-600 dark:text-gray-400`}
          role="alert"
          aria-live="polite"
        >
          {retryCount < maxRetries ? (
            <button 
              onClick={handleRetry}
              className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              title="Click to retry loading badge"
              aria-label={`Retry loading ${alt}`}
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          ) : (
            <span>Badge unavailable</span>
          )}
        </div>
      )}
    </div>
  );
}
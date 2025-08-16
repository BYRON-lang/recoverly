'use client';

import { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  domain: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function CompanyLogo({ 
  name, 
  domain, 
  size = 'md',
  showName = false
}: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState(`https://logo.clearbit.com/${domain}?size=128&format=png`);
  const [errored, setErrored] = useState(false);

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  const handleError = () => {
    if (!errored) {
      setImgSrc(`https://via.placeholder.com/96x40?text=${encodeURIComponent(name)}`);
      setErrored(true);
    }
  };

  return (
    <div className={`flex flex-col items-center ${size === 'lg' ? 'w-24' : 'w-20'}`}>
      <div className={`${sizeClasses[size]} w-full flex items-center justify-center bg-white dark:bg-[#1f1f1f] rounded p-1`}>
        <img
          src={imgSrc}
          alt={name}
          className={`w-auto max-w-full object-contain ${errored ? 'p-1' : ''}`}
          onError={handleError}
        />
      </div>
      {showName && (
        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-1 text-center">
          {name}
        </span>
      )}
    </div>
  );
}

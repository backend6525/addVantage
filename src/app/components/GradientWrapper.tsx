// 'use client'

'use client'
import React, { ReactNode } from 'react';

interface GradientWrapperProps {
  children: ReactNode;
  className?: string;
  wrapperclassname?: string; // Renamed to lowercase
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children, className, wrapperclassname }) => (
  <div className={`relative ${className || ''}`}>
    <div
      className={`absolute m-auto blur-[160px] ${wrapperclassname || ''}`}
      style={{
        background:
          'linear-gradient(180deg, #34D399 0%, rgba(52, 211, 153, 0.9) 0.01%, rgba(59, 130, 246, 0.4) 100%)',
      }}
    />
    <div className="relative">{children}</div>
  </div>
);

export default GradientWrapper;


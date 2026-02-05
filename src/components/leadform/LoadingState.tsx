"use client"

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Spinner Animation */}
      <div className="relative">
        <div className="w-24 h-24 border-8 border-blue-100 rounded-full"></div>
        <div className="w-24 h-24 border-8 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-3 text-center">
        Connecting You With a Lender...
      </h3>
      
      <p className="text-slate-600 text-center max-w-md mb-8">
        We're reviewing your information and finding the best lending option for you.
      </p>
      
      <div className="space-y-3 w-full max-w-md">
        {[
          { text: 'Verifying your information', delay: 0 },
          { text: 'Matching with lenders', delay: 1000 },
          { text: 'Preparing your results', delay: 2000 }
        ].map((step, index) => (
          <LoadingStep key={index} text={step.text} delay={step.delay} />
        ))}
      </div>
    </div>
  );
}

// הגדרת טיפוסים עבור ה-Props
interface LoadingStepProps {
  text: string;
  delay: number;
}

function LoadingStep({ text, delay }: LoadingStepProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`flex items-center gap-3 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <div className={`flex-shrink-0 ${isActive ? 'text-green-500' : 'text-slate-300'}`}>
        {isActive ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
        ) : (
          <Loader2 className="w-6 h-6 animate-spin" />
        )}
      </div>
      <span className="text-slate-700 font-medium">{text}</span>
    </div>
  );
}
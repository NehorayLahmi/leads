"use client"
// הגדרת הטיפוסים של ה-Props
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // חישוב אחוז ההתקדמות
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-slate-700">
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* רקע פס ההתקדמות */}
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        {/* הפס המתמלא */}
        <div 
          className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
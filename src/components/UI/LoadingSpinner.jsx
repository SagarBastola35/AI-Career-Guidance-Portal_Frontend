// frontend/src/components/UI/LoadingSpinner.jsx
import React from "react";
import { Sparkles } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse mx-auto mb-2" />
        <p className="text-gray-500">Loading amazing career insights...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

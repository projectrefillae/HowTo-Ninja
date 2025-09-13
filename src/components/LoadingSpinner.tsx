import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="bg-cerulean p-4 rounded-2xl mb-6 mx-auto w-fit">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
          <div className="absolute -top-2 -right-2 bg-tea-green w-6 h-6 rounded-full animate-bounce"></div>
        </div>
        <h2 className="text-2xl font-bold text-licorice mb-2">
          AI Ninja at Work
        </h2>
        <p className="text-licorice-600 mb-4">
          Crafting your personalized skill guide...
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-cerulean rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cerulean rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-cerulean rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
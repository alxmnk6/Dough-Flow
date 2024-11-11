import React from 'react';
import { BarChart3, Bell, Settings } from 'lucide-react';
import { FileUpload } from './FileUpload';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FinanceFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <FileUpload />
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 
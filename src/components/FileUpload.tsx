import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { api } from '../services/api';

export function FileUpload() {
  const [uploading, setUploading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const result = await api.uploadStatement(file);
      setMessage({ text: result.message, type: 'success' });
    } catch (error) {
      setMessage({ text: (error as Error).message, type: 'error' });
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
          ${uploading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer'} 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? 'Processing...' : 'Upload Statement'}
      </label>
      
      {message && (
        <div className={`mt-2 text-sm ${
          message.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
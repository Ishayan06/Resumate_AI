'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { resume } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { DocumentArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function UploadResume() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await resume.upload(formData);
      setSkills(response.data.skills || []);
      setUploaded(true);
      toast.success('Resume uploaded and analyzed successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const startInterview = () => {
    router.push('/dashboard');
  };

  if (uploaded) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Resume Uploaded Successfully! 🎉</h2>
          
          {skills.length > 0 && (
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">Skills Detected:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-x-4">
            <button
              onClick={startInterview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                setUploaded(false);
                setFile(null);
                setSkills([]);
              }}
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition"
            >
              Upload Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Your Resume</h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
            ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          <DocumentArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-indigo-600">Drop your resume here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">Drag & drop your resume here, or click to select</p>
              <p className="text-sm text-gray-500">Supports: PDF only (Max 5MB)</p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-indigo-600 hover:underline">
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
}
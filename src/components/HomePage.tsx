import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '../utils/fileUtils';
import { demoExamples } from '../data/demoExamples';

interface HomePageProps {
  onTextSubmit: (text: string) => void;
  loading: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onTextSubmit, loading }) => {
  const [text, setText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const loadDemoExample = (exampleKey: keyof typeof demoExamples) => {
    const example = demoExamples[exampleKey];
    setText(example.text);
    setUploadError(null);
  };

  const handleTextSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const allowedTypes = ['text/plain', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a .txt or .pdf file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('File size must be less than 5MB');
      return;
    }

    try {
      setUploadError(null);
      const extractedText = await uploadFile(file);
      setText(extractedText);
    } catch (error) {
      setUploadError('Failed to extract text from file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CivicLens
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              AI Bias & Accessibility Checker
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Transform complex government notices, policies, and public information into accessible, 
              unbiased content that everyone can understand.
            </p>
          </div>

          {/* Main Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload or Paste Your Text
            </h2>

            {/* Demo Examples */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Try a Demo Example:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => loadDemoExample('governmentNotice')}
                  className="p-3 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
                >
                  Government Notice
                </button>
                <button
                  onClick={() => loadDemoExample('policyDocument')}
                  className="p-3 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg border border-green-200 transition-colors"
                >
                  Policy Document
                </button>
                <button
                  onClick={() => loadDemoExample('healthNotice')}
                  className="p-3 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 transition-colors"
                >
                  Health Advisory
                </button>
                <button
                  onClick={() => loadDemoExample('newsArticle')}
                  className="p-3 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg border border-orange-200 transition-colors"
                >
                  News Article
                </button>
              </div>
            </div>
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 mb-6 transition-all duration-300 ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports .txt and .pdf files up to 5MB
                </p>
                <input
                  type="file"
                  accept=".txt,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </div>
            </div>

            {uploadError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">{uploadError}</span>
              </div>
            )}

            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or paste your text directly:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste government notices, policy documents, news articles, or any public information you'd like to analyze..."
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleTextSubmit}
              disabled={!text.trim() || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Analyze Text
                </>
              )}
            </button>
          </div>

          {/* Features Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Language Simplification
              </h3>
              <p className="text-gray-600">
                AI rewrites complex text into clear, 8th-grade level language that everyone can understand.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <AlertCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bias Detection
              </h3>
              <p className="text-gray-600">
                Identifies biased, exclusionary, or unnecessarily complex language with suggestions for improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fact Verification
              </h3>
              <p className="text-gray-600">
                Cross-references claims with reliable sources to help verify information accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
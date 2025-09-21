import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { HomePage } from './components/HomePage';
import { ResultsPage } from './components/ResultsPage';
import { useTextProcessing } from './hooks/useTextProcessing';
import { ProcessedText } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'results'>('landing');
  const [results, setResults] = useState<ProcessedText | null>(null);
  const { processText, loading, error } = useTextProcessing();

  const handleTextSubmit = async (text: string) => {
    try {
      const processedResults = await processText(text);
      setResults(processedResults);
      setCurrentPage('results');
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to process text:', err);
    }
  };

  const handleBack = () => {
    setCurrentPage('home');
    setResults(null);
  };

  const handleGetStarted = () => {
    setCurrentPage('home');
  };
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-red-500 text-center mb-4">
            <div className="text-4xl mb-2">⚠️</div>
            <h2 className="text-xl font-semibold">Processing Error</h2>
          </div>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentPage === 'home' && (
        <HomePage onTextSubmit={handleTextSubmit} loading={loading} />
      )}
      {currentPage === 'results' && results && (
        <ResultsPage results={results} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
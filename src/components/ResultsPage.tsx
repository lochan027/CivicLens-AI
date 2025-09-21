import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, ExternalLink, Volume2 } from 'lucide-react';
import { ProcessedText } from '../types';
import { AccessibilityPanel } from './AccessibilityPanel';
import { useAccessibility } from '../hooks/useAccessibility';

interface ResultsPageProps {
  results: ProcessedText;
  onBack: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ results, onBack }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'bias' | 'facts'>('comparison');
  const {
    settings,
    updateSettings,
    speakText,
    stopSpeaking,
    isPlaying,
    getFontClass,
    getFontSizeClass,
    getLineSpacingClass,
  } = useAccessibility();

  const handlePlayText = (text: string) => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  const getBiasTypeColor = (type: string) => {
    switch (type) {
      case 'bias':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'complexity':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exclusion':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'verified':
        return 'text-green-600';
      case 'disputed':
        return 'text-red-600';
      case 'unverified':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Input
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <div></div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-white rounded-t-xl shadow-lg">
                <div className="flex border-b border-gray-200">
                  {[
                    { id: 'comparison', label: 'Text Comparison', icon: null },
                    { id: 'bias', label: 'Bias Analysis', icon: results.biasFlags.length },
                    { id: 'facts', label: 'Fact Check', icon: results.factChecks.length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                      {tab.icon !== null && tab.icon > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                          {tab.icon}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-b-xl shadow-lg p-8">
                {activeTab === 'comparison' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Original Text */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Original Text</h3>
                        {settings.ttsEnabled && (
                          <button
                            onClick={() => handlePlayText(results.original)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Volume2 className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                      <div 
                        className={`p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400 ${getFontClass()} ${getFontSizeClass()} ${getLineSpacingClass()}`}
                      >
                        {results.original}
                      </div>
                    </div>

                    {/* Simplified Text */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Simplified Version</h3>
                        {settings.ttsEnabled && (
                          <button
                            onClick={() => handlePlayText(results.simplified)}
                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                          >
                            <Volume2 className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                      </div>
                      <div 
                        className={`p-6 bg-green-50 rounded-lg border-l-4 border-green-400 ${getFontClass()} ${getFontSizeClass()} ${getLineSpacingClass()}`}
                      >
                        {results.simplified}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'bias' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Bias & Accessibility Issues</h3>
                    {results.biasFlags.length === 0 ? (
                      <div className="flex items-center justify-center py-12 text-gray-500">
                        <CheckCircle className="h-12 w-12 text-green-500 mr-4" />
                        <div>
                          <p className="text-lg font-medium">No issues detected!</p>
                          <p>The text appears to be free from obvious bias and accessibility concerns.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {results.biasFlags.map((flag, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center">
                                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                                <span className="font-medium text-gray-900">"{flag.text}"</span>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBiasTypeColor(flag.type)}`}>
                                {flag.type.charAt(0).toUpperCase() + flag.type.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{flag.explanation}</p>
                            {flag.suggestion && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <p className="text-sm text-blue-800">
                                  <strong>Suggestion:</strong> {flag.suggestion}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'facts' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Fact Verification</h3>
                    {results.factChecks.length === 0 ? (
                      <div className="flex items-center justify-center py-12 text-gray-500">
                        <div>
                          <p className="text-lg font-medium">No factual claims detected</p>
                          <p>The text doesn't contain specific claims that can be fact-checked.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {results.factChecks.map((check, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="font-medium text-gray-900 flex-1">"{check.claim}"</h4>
                              <span className={`text-sm font-medium ${getReliabilityColor(check.reliability)}`}>
                                {check.reliability.charAt(0).toUpperCase() + check.reliability.slice(1)}
                              </span>
                            </div>
                            
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-gray-700">Sources:</h5>
                              {check.sources.map((source, sourceIndex) => (
                                <div
                                  key={sourceIndex}
                                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-medium text-gray-900 text-sm">{source.title}</h6>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      {source.domain}
                                    </a>
                                  </div>
                                  <p className="text-gray-600 text-sm">{source.snippet}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Accessibility Panel */}
            <div className="lg:col-span-1">
              <AccessibilityPanel
                settings={settings}
                onSettingsChange={updateSettings}
                isPlaying={isPlaying}
                onPlayPause={() => {
                  if (isPlaying) {
                    stopSpeaking();
                  } else {
                    const currentText = activeTab === 'comparison' 
                      ? results.simplified 
                      : results.original;
                    speakText(currentText);
                  }
                }}
                className="sticky top-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
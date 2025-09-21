import React from 'react';
import { Settings, Volume2, VolumeX, Type, Eye } from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityPanelProps {
  settings: AccessibilitySettings;
  onSettingsChange: (updates: Partial<AccessibilitySettings>) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  className?: string;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  settings,
  onSettingsChange,
  isPlaying,
  onPlayPause,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Settings className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Accessibility Settings</h3>
      </div>

      <div className="space-y-4">
        {/* Dyslexia-Friendly Font */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-gray-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">
              Dyslexia-Friendly Font
            </label>
          </div>
          <button
            onClick={() => onSettingsChange({ dyslexiaFont: !settings.dyslexiaFont })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.dyslexiaFont ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.dyslexiaFont ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center mb-2">
            <Type className="h-4 w-4 text-gray-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Font Size</label>
          </div>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large', 'xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onSettingsChange({ fontSize: size })}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  settings.fontSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                }`}
              >
                {size === 'xl' ? 'XL' : size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Line Spacing
          </label>
          <div className="flex space-x-2">
            {(['normal', 'wide', 'extra-wide'] as const).map((spacing) => (
              <button
                key={spacing}
                onClick={() => onSettingsChange({ lineSpacing: spacing })}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  settings.lineSpacing === spacing
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                }`}
              >
                {spacing.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Text-to-Speech */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Volume2 className="h-4 w-4 text-gray-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">
              Text-to-Speech
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSettingsChange({ ttsEnabled: !settings.ttsEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ttsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.ttsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            {settings.ttsEnabled && (
              <button
                onClick={onPlayPause}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <VolumeX className="h-4 w-4 text-blue-600" />
                ) : (
                  <Volume2 className="h-4 w-4 text-blue-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
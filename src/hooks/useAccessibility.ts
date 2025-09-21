import { useState, useCallback } from 'react';
import { AccessibilitySettings } from '../types';

const defaultSettings: AccessibilitySettings = {
  dyslexiaFont: false,
  fontSize: 'medium',
  lineSpacing: 'normal',
  ttsEnabled: false,
};

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateSettings = useCallback((updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const speakText = useCallback((text: string) => {
    if (!window.speechSynthesis || !settings.ttsEnabled) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [settings.ttsEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const getFontClass = useCallback(() => {
    return settings.dyslexiaFont ? 'font-dyslexia' : 'font-sans';
  }, [settings.dyslexiaFont]);

  const getFontSizeClass = useCallback(() => {
    const sizeMap = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xl: 'text-xl',
    };
    return sizeMap[settings.fontSize];
  }, [settings.fontSize]);

  const getLineSpacingClass = useCallback(() => {
    const spacingMap = {
      normal: 'leading-normal',
      wide: 'leading-relaxed',
      'extra-wide': 'leading-loose',
    };
    return spacingMap[settings.lineSpacing];
  }, [settings.lineSpacing]);

  return {
    settings,
    updateSettings,
    speakText,
    stopSpeaking,
    isPlaying,
    getFontClass,
    getFontSizeClass,
    getLineSpacingClass,
  };
};
export interface ProcessedText {
  original: string;
  simplified: string;
  biasFlags: BiasFlag[];
  factChecks: FactCheck[];
}

export interface BiasFlag {
  text: string;
  type: 'bias' | 'complexity' | 'exclusion';
  explanation: string;
  suggestion?: string;
}

export interface FactCheck {
  claim: string;
  sources: Source[];
  reliability: 'verified' | 'disputed' | 'unverified';
}

export interface Source {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export interface AccessibilitySettings {
  dyslexiaFont: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  lineSpacing: 'normal' | 'wide' | 'extra-wide';
  ttsEnabled: boolean;
}
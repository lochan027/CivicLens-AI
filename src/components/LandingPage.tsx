import React from 'react';
import { 
  FileText, 
  Eye, 
  Shield, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  Volume2,
  Zap,
  Globe,
  Heart
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-2xl shadow-lg">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                CivicLens
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium">
              AI-Powered Bias & Accessibility Checker
            </p>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform complex government notices, policies, and public information into 
              accessible, unbiased content that every citizen can understand and trust.
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try CivicLens Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Problem Statement */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <div className="text-center mb-8">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Complex Language</h3>
                <p className="text-gray-600">
                  Government documents use jargon and complex terminology that excludes many citizens from understanding their rights and responsibilities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Eye className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hidden Bias</h3>
                <p className="text-gray-600">
                  Public communications often contain subtle biases and exclusionary language that can alienate or mislead different communities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility Barriers</h3>
                <p className="text-gray-600">
                  Many citizens with disabilities, learning differences, or limited English proficiency struggle to access vital public information.
                </p>
              </div>
            </div>
          </div>

          {/* Solution Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solution</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                CivicLens uses advanced AI to make public information accessible, unbiased, and trustworthy for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Language Simplification
                </h3>
                <p className="text-gray-600 text-sm">
                  AI rewrites complex text into clear, 8th-grade level language that everyone can understand.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-100 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bias Detection
                </h3>
                <p className="text-gray-600 text-sm">
                  Identifies biased, exclusionary, or unnecessarily complex language with improvement suggestions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fact Verification
                </h3>
                <p className="text-gray-600 text-sm">
                  Cross-references claims with reliable sources to help citizens verify information accuracy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                  <Volume2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Accessibility Tools
                </h3>
                <p className="text-gray-600 text-sm">
                  Dyslexia-friendly fonts, adjustable text size, and text-to-speech for inclusive access.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white mb-16">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Real-World Impact</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold mb-2">73%</div>
                  <p className="text-blue-100">of Americans struggle with government document complexity</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1 in 5</div>
                  <p className="text-blue-100">adults have a disability that affects information access</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">54M</div>
                  <p className="text-blue-100">Americans have limited English proficiency</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
              <p className="text-xl text-gray-600">
                Watch how CivicLens transforms complex government text into accessible information
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-600">❌ Before (Original)</h3>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 text-sm">
                  "Pursuant to Section 504 of the Rehabilitation Act of 1973, as amended, and the Americans with Disabilities Act of 1990, the Municipal Transportation Authority hereby provides notice of its intent to implement accessibility modifications to transit infrastructure..."
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-600">✅ After (Simplified)</h3>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 text-sm">
                  "The city bus system is making changes to help people with disabilities use public transportation more easily. This follows federal laws that require equal access for everyone..."
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300"
              >
                Try the Full Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect For</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Citizens</h3>
                <p className="text-gray-600">
                  Understand your rights, benefits, and civic responsibilities with clear, accessible information.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Government Agencies</h3>
                <p className="text-gray-600">
                  Ensure your communications are accessible, unbiased, and reach all community members effectively.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Journalists & Advocates</h3>
                <p className="text-gray-600">
                  Verify information accuracy and identify potential bias in public communications and policy documents.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Make Public Information Accessible?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the movement to make government communications clear, unbiased, and accessible to everyone.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Analyzing Text
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
# CivicLens - AI Bias & Accessibility Checker

A hackathon project that helps citizens understand and trust public information by making government notices, policies, and news articles more accessible and transparent.

![CivicLens Demo](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80)

## 🎬 Demo Examples Included

The application comes with pre-loaded demo examples perfect for showcasing to judges:

### 1. Government Transportation Notice
**Original**: Complex legal language about ADA compliance and transit modifications
**Demonstrates**: Language simplification, accessibility terminology detection

### 2. Zoning Variance Policy  
**Original**: Municipal planning jargon and bureaucratic procedures
**Demonstrates**: Bias detection in exclusionary language, complexity flagging

### 3. Public Health Advisory
**Original**: Technical health department notice about air quality
**Demonstrates**: Scientific jargon simplification, accessibility for vulnerable populations

### 4. News Article with Bias
**Original**: Article about city budget with loaded language and potential bias
**Demonstrates**: Bias detection, fact-checking capabilities, source verification

### Quick Demo Script for Judges:
1. **Start with Landing Page** - Shows problem statement and solution overview
2. **Click "Government Notice" demo** - Shows complex legal text transformation
3. **Toggle Accessibility Panel** - Demonstrate dyslexia font and text-to-speech
4. **Show Bias Detection** - Point out flagged terms with explanations
5. **Display Fact-Check Results** - Show source verification with clickable links

## 🎯 Features

### Core Functionality
- **Text Input/Upload**: Paste text directly or upload `.txt`/`.pdf` files
- **Language Simplification**: AI rewrites complex text to 8th-grade reading level
- **Bias Detection**: Identifies biased, exclusionary, or overly complex language
- **Fact Verification**: Cross-references claims with reliable sources
- **Side-by-Side Comparison**: Original vs simplified text display

### Accessibility Features
- **Dyslexia-Friendly Font**: Toggle to OpenDyslexic font
- **Adjustable Typography**: Font size and line spacing controls
- **Text-to-Speech**: Built-in audio playback
- **WCAG Compliance**: High contrast ratios and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Groq API key ([Get one here](https://console.groq.com/keys))
- Perplexity API key ([Get one here](https://www.perplexity.ai/settings/api))

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd civiclens-hackathon
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   PORT=3001
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **Multer** for file uploads
- **pdf-parse** for PDF text extraction
- **Axios** for API calls

### APIs
- **Groq API** - Text simplification and bias analysis
- **Perplexity API** - Fact-checking and source verification

## 📁 Project Structure

```
civiclens-hackathon/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx          # Main input interface
│   │   ├── ResultsPage.tsx       # Results display
│   │   └── AccessibilityPanel.tsx # Accessibility controls
│   ├── hooks/
│   │   ├── useTextProcessing.ts  # API integration
│   │   └── useAccessibility.ts   # Accessibility state
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   └── utils/
│       └── fileUtils.ts         # File handling utilities
├── server/
│   ├── index.js                 # Express server
│   └── utils/
│       ├── groq.js             # Groq API integration
│       ├── perplexity.js       # Perplexity API integration
│       └── fileParser.js       # File processing
└── README.md
```

## 🔧 API Configuration

### Groq API Setup
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create a new API key
3. Add it to your `.env` file as `GROQ_API_KEY`

### Perplexity API Setup
1. Visit [Perplexity Settings](https://www.perplexity.ai/settings/api)
2. Generate an API key
3. Add it to your `.env` file as `PERPLEXITY_API_KEY`

## 🧪 Testing the Application

### Built-in Demo Examples

The application includes four carefully crafted demo examples accessible via buttons on the main input page:

1. **Government Transportation Notice** - Complex ADA compliance language
2. **Zoning Variance Policy** - Municipal planning bureaucratic text  
3. **Public Health Advisory** - Technical health department communication
4. **News Article** - City budget article with potential bias

### Demo Flow for Presentations
1. **Landing Page** (30 seconds) - Explain the problem and solution
2. **Load Demo Example** (15 seconds) - Click any demo button to populate text
3. **Process Text** (30 seconds) - Show AI analysis in progress
4. **Results Overview** (60 seconds) - Navigate through all three tabs
5. **Accessibility Features** (30 seconds) - Toggle dyslexia font and TTS
6. **Fact-Check Sources** (30 seconds) - Show clickable source verification

**Total Demo Time: ~3 minutes** - Perfect for hackathon presentations!

## 🎨 Demo Tips for Judges

### Showcase Features
1. **Upload a PDF** - Show file processing capability
2. **Highlight Complex Text** - Use government or legal documents
3. **Toggle Accessibility Mode** - Demonstrate dyslexia font and TTS
4. **Show Bias Detection** - Use text with potentially problematic language
5. **Fact-Check Claims** - Include text with verifiable statements

### Key Selling Points
- **Real-world Impact**: Helps citizens understand government communications
- **Inclusive Design**: Built with accessibility as a core feature
- **AI-Powered**: Uses latest LLM technology for analysis
- **Production Ready**: Clean, responsive UI suitable for deployment
- **Comprehensive Solution**: Addresses language, bias, facts, and accessibility in one tool
- **Scalable Architecture**: Ready for integration with government systems

## 📊 API Usage & Limits

- **File Uploads**: 5MB maximum size
- **Text Input**: 50,000 character limit
- **Processing Time**: ~3-10 seconds depending on text length
- **Concurrent Requests**: Rate limited to prevent API abuse

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure these are set in your production environment:
- `GROQ_API_KEY`
- `PERPLEXITY_API_KEY`
- `PORT` (optional, defaults to 3001)

## 🤝 Contributing

This is a hackathon project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project as a foundation for your own applications.

## 🏆 Hackathon Submission

**Team**: [Your Team Name]  
**Challenge**: AI for Social Good  
**Demo URL**: [Your deployment URL]  
**Pitch Deck**: [Link to presentation]

---

Built with ❤️ for making public information accessible to everyone.
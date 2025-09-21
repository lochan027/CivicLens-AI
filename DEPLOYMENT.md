# CivicLens - Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Netlify will automatically detect the `netlify.toml` configuration

3. **Set Environment Variables**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add the following variables:
     - `GROQ_API_KEY`: Your Groq API key
     - `PERPLEXITY_API_KEY`: Your Perplexity API key

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your application

### Option 2: Manual Deploy

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=dist`

## 📁 Project Structure for Netlify

```
civiclens-hackathon/
├── netlify.toml              # Netlify configuration
├── netlify/
│   └── functions/            # Serverless functions
│       ├── process.js        # Text processing API
│       └── health.js         # Health check API
├── public/
│   └── favicon.svg           # Custom favicon
├── src/                      # React frontend
└── server/                   # Backend utilities (used by functions)
```

## 🔧 Configuration Details

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

### API Endpoints
- `/api/process` → Text processing and analysis
- `/api/health` → Health check endpoint

### Environment Variables Required
- `GROQ_API_KEY`: For AI text processing
- `PERPLEXITY_API_KEY`: For fact-checking

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 18)
   - Ensure all dependencies are in `package.json`
   - Check build logs in Netlify dashboard

2. **API Not Working**
   - Verify environment variables are set
   - Check function logs in Netlify dashboard
   - Ensure API keys are valid

3. **CORS Issues**
   - CORS headers are configured in the functions
   - Check browser console for specific errors

### Local Testing

Test the Netlify functions locally:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development
netlify dev
```

## 📊 Performance Optimization

- Static assets are cached for 1 year
- API responses are optimized for serverless
- Images and fonts are served from CDN

## 🔒 Security

- Security headers are configured
- CORS is properly set up
- API keys are stored as environment variables

## 📝 Notes

- The application uses Netlify Functions for the backend API
- File upload functionality is temporarily disabled for serverless deployment
- All text processing happens server-side for security

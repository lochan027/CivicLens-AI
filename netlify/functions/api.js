// Netlify Functions handler for CivicLens API
const { processTextWithGroq } = require('../../server/utils/groq');
const { factCheckWithPerplexity } = require('../../server/utils/perplexity');
const { extractTextFromFile } = require('../../server/utils/fileParser');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { path } = event;
    
    if (path === '/api/health') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'OK', 
          timestamp: new Date().toISOString() 
        }),
      };
    }

    if (path === '/api/process' && event.httpMethod === 'POST') {
      const { text } = JSON.parse(event.body);

      if (!text || text.trim().length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'No text provided' }),
        };
      }

      if (text.length > 50000) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Text too long. Please limit to 50,000 characters.' }),
        };
      }

      console.log('Processing text of length:', text.length);

      // Process text with Groq (simplified version + bias analysis)
      const groqResults = await processTextWithGroq(text);
      
      // Fact-check with Perplexity
      const factChecks = await factCheckWithPerplexity(text);

      const results = {
        original: text,
        simplified: groqResults.simplified,
        biasFlags: groqResults.biasFlags,
        factChecks: factChecks
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(results),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};

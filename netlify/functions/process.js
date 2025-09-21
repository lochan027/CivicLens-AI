// Netlify Function for text processing
const { processTextWithGroq } = require('../../server/utils/groq');
const { factCheckWithPerplexity } = require('../../server/utils/perplexity');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
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

  } catch (error) {
    console.error('Text processing error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process text',
        details: error.message 
      }),
    };
  }
};

// Netlify Function for text processing
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Perplexity API configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Groq API call function
async function callGroqAPI(messages, temperature = 0.7) {
  try {
    const response = await axios.post(GROQ_API_URL, {
      model: 'llama-3.1-8b-instant',
      messages,
      temperature,
      max_tokens: 4000,
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    throw new Error('Failed to call Groq API');
  }
}

// Perplexity API call function
async function callPerplexityAPI(messages) {
  try {
    const response = await axios.post(PERPLEXITY_API_URL, {
      model: 'llama-3.1-sonar-small-128k-chat',
      messages,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Perplexity API error:', error.response?.data || error.message);
    throw new Error('Failed to call Perplexity API');
  }
}

// Text simplification function
async function simplifyText(text) {
  const messages = [
    {
      role: 'system',
      content: `You are an expert at making complex text accessible to everyone. Rewrite the given text to:
- Use simple, clear language at an 8th-grade reading level
- Break down complex concepts into easy-to-understand terms
- Remove jargon and technical language
- Keep the original meaning intact
- Make it engaging and readable
- Use shorter sentences and paragraphs
- Define any necessary technical terms in simple language

IMPORTANT: Return ONLY the simplified text content. Do not add any introductory phrases, explanations, or formatting. Just provide the rewritten text directly.`
    },
    {
      role: 'user',
      content: `Please simplify this text: ${text}`
    }
  ];

  const result = await callGroqAPI(messages, 0.5);
  
  // Clean up any markdown formatting or extra text
  return result
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
    .replace(/^Here is a simplified version of the text:\s*/i, '') // Remove intro text
    .replace(/^Here's a simplified version:\s*/i, '') // Remove intro text
    .replace(/^Simplified text:\s*/i, '') // Remove intro text
    .trim();
}

// Bias analysis function
async function analyzeBias(text) {
  const messages = [
    {
      role: 'system',
      content: `You are an expert at identifying bias, exclusionary language, and accessibility issues in text. Analyze the given text and identify:

1. BIAS: Words or phrases that show unfair preference, stereotypes, or prejudice
2. COMPLEXITY: Unnecessarily complex terms that could exclude readers
3. EXCLUSION: Language that might exclude or alienate certain groups

IMPORTANT: You must respond with ONLY valid JSON. No additional text or explanation.

Return your response as a JSON array with this structure:
[
  {
    "text": "exact phrase from original text",
    "type": "bias|complexity|exclusion",
    "explanation": "why this is problematic",
    "suggestion": "suggested alternative (optional)"
  }
]

If no issues are found, return exactly: []`
    },
    {
      role: 'user',
      content: `Analyze this text for bias and accessibility issues. Respond with ONLY valid JSON: ${text}`
    }
  ];

  try {
    const result = await callGroqAPI(messages, 0.3);
    // Try to parse as JSON, if it fails return empty array
    try {
      return JSON.parse(result);
    } catch (parseError) {
      console.error('Failed to parse bias analysis JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Bias analysis error:', error);
    return [];
  }
}

// Fact-checking function
async function factCheckWithPerplexity(text) {
  try {
    // Extract potential claims from the text
    const claims = extractClaims(text);
    
    if (claims.length === 0) {
      return [];
    }

    const factChecks = [];
    
    for (const claim of claims.slice(0, 3)) { // Limit to 3 claims to avoid rate limits
      try {
        const factCheck = await factCheckClaim(claim);
        if (factCheck) {
          factChecks.push(factCheck);
        }
      } catch (error) {
        console.error('Fact-check error for claim:', claim, error.message);
        // Continue with other claims even if one fails
      }
    }

    return factChecks;
  } catch (error) {
    console.error('Fact-checking error:', error);
    return [];
  }
}

// Extract claims from text
function extractClaims(text) {
  // Simple claim extraction - look for statements that could be fact-checked
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Look for sentences with numbers, dates, or specific claims
  const claims = sentences.filter(sentence => {
    const hasNumbers = /\d/.test(sentence);
    const hasDates = /\b(19|20)\d{2}\b|\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(sentence);
    const hasSpecifics = /\b(according to|reports|studies|data|statistics|research)\b/i.test(sentence);
    
    return hasNumbers || hasDates || hasSpecifics;
  });

  return claims.slice(0, 5); // Limit to 5 claims
}

// Fact-check a single claim
async function factCheckClaim(claim) {
  const messages = [
    {
      role: 'system',
      content: `You are a fact-checker. Analyze the given claim and provide verification information. Return a JSON object with this structure:
{
  "claim": "the original claim",
  "verification": "verified|unverified|misleading|false",
  "explanation": "brief explanation of the verification",
  "sources": ["source1", "source2"],
  "confidence": "high|medium|low"
}

If you cannot verify the claim, return null.`
    },
    {
      role: 'user',
      content: `Fact-check this claim: ${claim}`
    }
  ];

  try {
    const result = await callPerplexityAPI(messages);
    
    // Try to parse JSON response
    try {
      const parsed = JSON.parse(result);
      return parsed;
    } catch (parseError) {
      // If not JSON, create a simple response
      return {
        claim: claim,
        verification: 'unverified',
        explanation: 'Unable to verify this claim',
        sources: [],
        confidence: 'low'
      };
    }
  } catch (error) {
    console.error('Fact-check API error:', error);
    return null;
  }
}

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
    // Check if API keys are available
    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
      };
    }

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
    const simplified = await simplifyText(text);
    const biasFlags = await analyzeBias(text);
    
    // Fact-check with Perplexity
    const factChecks = await factCheckWithPerplexity(text);

    const results = {
      original: text,
      simplified: simplified,
      biasFlags: biasFlags,
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

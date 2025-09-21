import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Insert your Perplexity API key here
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOUR_PERPLEXITY_API_KEY_HERE';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

async function callPerplexityAPI(messages) {
  try {
    const response = await axios.post(PERPLEXITY_API_URL, {
      model: 'llama-3.1-sonar-small-128k-online',
      messages,
      temperature: 0.2,
      max_tokens: 2000,
      return_citations: true,
    }, {
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Perplexity API error:', error.response?.data || error.message);
    throw new Error('Failed to call Perplexity API');
  }
}

function extractClaims(text) {
  // Simple claim extraction - look for factual statements
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Filter for sentences that likely contain factual claims
  const claims = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    // Look for patterns that suggest factual claims
    return (
      lowerSentence.includes('according to') ||
      lowerSentence.includes('studies show') ||
      lowerSentence.includes('research indicates') ||
      lowerSentence.includes('data shows') ||
      lowerSentence.includes('statistics') ||
      lowerSentence.includes('percent') ||
      lowerSentence.includes('%') ||
      /\b\d{4}\b/.test(lowerSentence) || // Contains years
      /\b\d+\s?(million|billion|thousand)\b/.test(lowerSentence) // Contains large numbers
    );
  });

  // Return first 3 claims to avoid hitting API limits
  return claims.slice(0, 3).map(claim => claim.trim());
}

async function factCheckClaim(claim) {
  const messages = [
    {
      role: 'system',
      content: `You are a fact-checking expert. For the given claim, search for recent, reliable sources and provide:
1. Whether the claim appears to be verified, disputed, or unverified
2. 2-3 most relevant and reliable sources with titles, URLs, and brief excerpts

Format your response as JSON:
{
  "reliability": "verified|disputed|unverified",
  "sources": [
    {
      "title": "Source title",
      "url": "https://example.com",
      "snippet": "Brief relevant excerpt",
      "domain": "example.com"
    }
  ]
}

Focus on authoritative sources like government websites, academic institutions, established news organizations, and research publications.`
    },
    {
      role: 'user',
      content: `Please fact-check this claim: "${claim}"`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages);
    const content = response.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      return {
        claim,
        reliability: parsed.reliability || 'unverified',
        sources: parsed.sources || []
      };
    } catch (parseError) {
      console.error('Failed to parse fact-check response:', parseError);
      return {
        claim,
        reliability: 'unverified',
        sources: []
      };
    }
  } catch (error) {
    console.error('Fact-check error for claim:', claim, error);
    return {
      claim,
      reliability: 'unverified',
      sources: []
    };
  }
}

async function factCheckWithPerplexity(text) {
  try {
    // Extract potential factual claims from the text
    const claims = extractClaims(text);
    
    if (claims.length === 0) {
      return [];
    }

    // Fact-check each claim (with some rate limiting)
    const factChecks = [];
    for (const claim of claims) {
      try {
        const result = await factCheckClaim(claim);
        if (result.sources.length > 0) {
          factChecks.push(result);
        }
        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error fact-checking individual claim:', error);
      }
    }

    return factChecks;
  } catch (error) {
    console.error('Perplexity fact-checking error:', error);
    return [];
  }
}

export {
  factCheckWithPerplexity,
  factCheckClaim,
  extractClaims
};
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Insert your Groq API key here
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callGroqAPI(messages, temperature = 0.7) {
  try {
    const response = await axios.post(GROQ_API_URL, {
      model: 'llama-3.1-8b-instant', // Using Llama model for better performance
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
      content: `Analyze this text for bias and accessibility issues: ${text}`
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

async function processTextWithGroq(text) {
  try {
    // Process both tasks in parallel for better performance
    const [simplified, biasFlags] = await Promise.all([
      simplifyText(text),
      analyzeBias(text)
    ]);

    return {
      simplified: simplified.trim(),
      biasFlags: biasFlags || []
    };
  } catch (error) {
    console.error('Groq processing error:', error);
    throw error;
  }
}

export {
  processTextWithGroq,
  simplifyText,
  analyzeBias
};
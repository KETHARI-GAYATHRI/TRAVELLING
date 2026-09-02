/**
 * ESCAPE — Gemini AI Service
 * Integrates with Google Gemini for travel chat and itinerary generation
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Send a chat message to Gemini with travel context
 * @param {Array} messages - Chat history [{role: 'user'|'assistant', content: string}]
 * @param {string} destinationContext - Optional destination name for context
 * @returns {Promise<string>} AI response text
 */
export async function chatWithAssistant(messages, destinationContext = '') {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemPrompt = destinationContext
    ? `You are ESCAPE AI, a knowledgeable and friendly travel assistant. The user is currently exploring ${destinationContext}. Give concise, useful, practical travel advice. Use short paragraphs. When listing items, use bullet points. Be enthusiastic but professional.`
    : `You are ESCAPE AI, a knowledgeable and friendly travel assistant. Give concise, useful, practical travel advice about any destination worldwide. Use short paragraphs. When listing items, use bullet points. Be enthusiastic but professional.`;

  const contents = [];

  // Add conversation history
  for (const msg of messages) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 400) {
        throw new Error('Invalid request. Please try rephrasing your question.');
      }
      if (response.status === 403 || response.status === 401) {
        throw new Error('Invalid Gemini API key. Please check your configuration.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw new Error(errorData.error?.message || 'Unable to get a response right now. Please try again.');
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No response generated. Please try again.');
    }

    return text;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

/**
 * Generate a structured travel itinerary using Gemini
 * @param {string} destination - Destination name
 * @param {number} days - Number of days
 * @returns {Promise<object>} Parsed itinerary
 */
export async function generateItinerary(destination, days) {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  const prompt = `Create a ${days}-day travel itinerary for ${destination}.

IMPORTANT: Respond ONLY with valid JSON, no markdown formatting, no code blocks, no extra text.

Use this exact JSON structure:
{
  "destination": "${destination}",
  "days": ${days},
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & City Exploration",
      "periods": [
        {
          "time": "Morning",
          "activity": "Activity name",
          "description": "Brief 1-2 sentence description of what to do"
        },
        {
          "time": "Afternoon",
          "activity": "Activity name",
          "description": "Brief description"
        },
        {
          "time": "Evening",
          "activity": "Activity name",
          "description": "Brief description"
        }
      ]
    }
  ]
}

Make it practical and interesting with real places and activities in ${destination}. Include famous landmarks, local food experiences, and cultural activities.`;

  const contents = [{ role: 'user', parts: [{ text: prompt }] }];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: 'You are a travel itinerary generator. You MUST respond with valid JSON only. No markdown, no code fences, no explanatory text.' }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        throw new Error('Invalid Gemini API key. Please check your configuration.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw new Error('Unable to generate itinerary right now. Please try again.');
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No itinerary generated. Please try again.');
    }

    return parseItineraryResponse(text, destination, days);
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

/**
 * Parse the Gemini itinerary response, handling both JSON and text formats
 */
function parseItineraryResponse(text, destination, days) {
  // Try to extract JSON from the response
  let cleanText = text.trim();

  // Remove markdown code fences if present
  cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

  try {
    const parsed = JSON.parse(cleanText);
    if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
      return parsed;
    }
  } catch {
    // JSON parsing failed — fall back to text parsing
  }

  // Text-based fallback parsing
  return parseTextItinerary(text, destination, days);
}

/**
 * Fallback parser for non-JSON itinerary responses
 */
function parseTextItinerary(text, destination, days) {
  const itinerary = [];
  const dayRegex = /day\s*(\d+)[:\s-]*(.*?)(?=day\s*\d+|$)/gis;
  let match;

  while ((match = dayRegex.exec(text)) !== null) {
    const dayNum = parseInt(match[1]);
    const dayContent = match[2].trim();
    const periods = [];

    const timeSlots = [
      { time: 'Morning', regex: /morning[:\s-]*(.*?)(?=afternoon|evening|$)/is },
      { time: 'Afternoon', regex: /afternoon[:\s-]*(.*?)(?=evening|$)/is },
      { time: 'Evening', regex: /evening[:\s-]*(.*?)$/is },
    ];

    for (const slot of timeSlots) {
      const slotMatch = slot.regex.exec(dayContent);
      if (slotMatch) {
        const content = slotMatch[1].trim();
        const lines = content.split('\n').filter(l => l.trim());
        periods.push({
          time: slot.time,
          activity: lines[0]?.replace(/^[-•*]\s*/, '').trim() || slot.time + ' activity',
          description: lines.slice(1).join(' ').replace(/^[-•*]\s*/, '').trim() || '',
        });
      }
    }

    if (periods.length === 0) {
      // If no time slots found, create generic ones from content
      const lines = dayContent.split('\n').filter(l => l.trim());
      const times = ['Morning', 'Afternoon', 'Evening'];
      for (let i = 0; i < times.length; i++) {
        periods.push({
          time: times[i],
          activity: lines[i]?.replace(/^[-•*]\s*/, '').trim() || `${times[i]} exploration`,
          description: '',
        });
      }
    }

    itinerary.push({
      day: dayNum,
      title: `Day ${dayNum}`,
      periods,
    });
  }

  // If regex parsing failed, create a basic structure
  if (itinerary.length === 0) {
    for (let d = 1; d <= days; d++) {
      itinerary.push({
        day: d,
        title: `Day ${d}`,
        periods: [
          { time: 'Morning', activity: `Explore ${destination}`, description: 'Start your day with local exploration.' },
          { time: 'Afternoon', activity: 'Cultural experience', description: 'Discover local culture and cuisine.' },
          { time: 'Evening', activity: 'Leisure time', description: 'Enjoy the evening atmosphere.' },
        ],
      });
    }
  }

  return { destination, days, itinerary };
}

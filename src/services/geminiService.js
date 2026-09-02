/**
 * ESCAPE — Gemini AI Service
 * Integrates with Google Gemini API with smart curated fallbacks for instant offline/demo support
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Curated offline responses for common travel chat queries
 */
const CHAT_FALLBACKS = {
  'paris': 'Here are top recommendations for Paris:\n- Visit the Eiffel Tower at sunset for breathtaking views.\n- Explore the Louvre Museum and Orsay Museum for world-class art.\n- Stroll through Montmartre and visit Sacré-Cœur Basilica.\n- Enjoy fresh croissants and café au lait at a Latin Quarter café.',
  'tokyo': 'Here are top recommendations for Tokyo:\n- Cross the iconic Shibuya Crossing.\n- Visit Sensō-ji Temple in historic Asakusa.\n- Take in panoramic skyline views from Tokyo Skytree.\n- Sample authentic ramen and fresh sushi at Tsukiji Outer Market.',
  'default': 'Here are essential travel tips:\n- Research local customs and transport before arriving.\n- Pack light with versatile clothing layers.\n- Keep digital and physical copies of key travel documents.\n- Try local street food recommended by residents.',
};

/**
 * Curated offline itineraries by city
 */
const ITINERARY_FALLBACKS = {
  'Paris': [
    {
      day: 1,
      title: 'Iconic Landmarks & Eiffel Tower Views',
      periods: [
        { time: 'Morning', activity: 'Eiffel Tower & Champ de Mars', description: 'Ascend to the top observation deck of the Eiffel Tower for panoramic views of Paris.' },
        { time: 'Afternoon', activity: 'Louvre Museum Art Tour', description: 'Explore world-famous masterpieces including the Mona Lisa and Venus de Milo.' },
        { time: 'Evening', activity: 'Seine River Sunset Cruise', description: 'Enjoy an evening boat cruise past illuminated bridges and historic monuments.' },
      ],
    },
    {
      day: 2,
      title: 'Bohemian Art & Historic Architecture',
      periods: [
        { time: 'Morning', activity: 'Montmartre & Sacré-Cœur', description: 'Wander cobblestone streets, visit Sacré-Cœur Basilica, and explore Place du Tertre.' },
        { time: 'Afternoon', activity: 'Musée d\'Orsay & Tuileries', description: 'Admire Impressionist masterpieces by Monet, Degas, and Van Gogh.' },
        { time: 'Evening', activity: 'Le Marais Bistro Dinner', description: 'Dine at an authentic French bistro in the vibrant Le Marais neighborhood.' },
      ],
    },
    {
      day: 3,
      title: 'Gardens, Palaces & French Gastronomy',
      periods: [
        { time: 'Morning', activity: 'Luxembourg Gardens & Latin Quarter', description: 'Stroll through lush royal gardens and historical student quarters.' },
        { time: 'Afternoon', activity: 'Notre-Dame & Sainte-Chapelle', description: 'Marvel at medieval Gothic architecture and stunning stained glass windows.' },
        { time: 'Evening', activity: 'Champs-Élysées & Arc de Triomphe', description: 'Walk down the famous avenue and view the city lights from Arc de Triomphe.' },
      ],
    },
  ],
  'Tokyo': [
    {
      day: 1,
      title: 'Modern Tokyo & Neon Culture',
      periods: [
        { time: 'Morning', activity: 'Shibuya Crossing & Hachiko Statue', description: 'Experience the world\'s busiest pedestrian intersection in Shibuya.' },
        { time: 'Afternoon', activity: 'Meiji Shrine & Harajuku', description: 'Walk through tranquil forest paths to Meiji Shrine and explore Takeshita Street.' },
        { time: 'Evening', activity: 'Shinjuku Skyscraper Skyline', description: 'View neon streetlights and enjoy panoramic views from Tokyo Metropolitan Building.' },
      ],
    },
    {
      day: 2,
      title: 'Ancient Temples & Culinary Delights',
      periods: [
        { time: 'Morning', activity: 'Sensō-ji Temple in Asakusa', description: 'Explore Tokyo\'s oldest Buddhist temple and Nakamise shopping street.' },
        { time: 'Afternoon', activity: 'Tokyo Skytree Observatory', description: 'Enjoy 360-degree views from Japan\'s tallest structure.' },
        { time: 'Evening', activity: 'Tsukiji Outer Market Food Tour', description: 'Sample fresh sushi, wagyu beef skewers, and authentic Japanese street snacks.' },
      ],
    },
    {
      day: 3,
      title: 'Waterfront & Digital Art',
      periods: [
        { time: 'Morning', activity: 'Imperial Palace Gardens', description: 'Tour the scenic outer gardens and historic moats of the Imperial Palace.' },
        { time: 'Afternoon', activity: 'teamLab Planets Digital Art', description: 'Immerse yourself in interactive futuristic digital art installations.' },
        { time: 'Evening', activity: 'Odaiba Bay Sunset Walk', description: 'Relax along Odaiba seafront with views of Rainbow Bridge and Tokyo Tower.' },
      ],
    },
  ],
};

/**
 * Send a chat message to Gemini with travel context
 * @param {Array} messages - Chat history [{role: 'user'|'assistant', content: string}]
 * @param {string} destinationContext - Optional destination name for context
 * @returns {Promise<string>} AI response text
 */
export async function chatWithAssistant(messages, destinationContext = '') {
  const lastUserMsg = messages[messages.length - 1]?.content || '';

  if (!API_KEY || API_KEY.trim() === '') {
    return getChatFallback(lastUserMsg, destinationContext);
  }

  const systemPrompt = destinationContext
    ? `You are ESCAPE AI, a knowledgeable and friendly travel assistant. The user is currently exploring ${destinationContext}. Give concise, useful, practical travel advice. Use short paragraphs. When listing items, use bullet points. Be enthusiastic but professional.`
    : `You are ESCAPE AI, a knowledgeable and friendly travel assistant. Give concise, useful, practical travel advice about any destination worldwide. Use short paragraphs. When listing items, use bullet points. Be enthusiastic but professional.`;

  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!response.ok) {
      return getChatFallback(lastUserMsg, destinationContext);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || getChatFallback(lastUserMsg, destinationContext);
  } catch {
    return getChatFallback(lastUserMsg, destinationContext);
  }
}

/**
 * Generate a structured travel itinerary using Gemini
 * @param {string} destination - Destination name
 * @param {number} days - Number of days
 * @returns {Promise<object>} Parsed itinerary
 */
export async function generateItinerary(destination, days) {
  if (!API_KEY || API_KEY.trim() === '') {
    return getItineraryFallback(destination, days);
  }

  const prompt = `Create a ${days}-day travel itinerary for ${destination}. Respond ONLY with valid JSON in this format: {"destination": "${destination}", "days": ${days}, "itinerary": [{"day": 1, "title": "Day 1 Title", "periods": [{"time": "Morning", "activity": "Activity Name", "description": "Brief description"}]}]}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: 'You are a travel itinerary generator. Respond ONLY with valid JSON.' }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 2048 },
        }),
      }
    );

    if (!response.ok) {
      return getItineraryFallback(destination, days);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return getItineraryFallback(destination, days);

    return parseItineraryResponse(text, destination, days);
  } catch {
    return getItineraryFallback(destination, days);
  }
}

/**
 * Fallback itinerary generator for smooth demo execution
 */
function getItineraryFallback(destination, days) {
  const predefined = ITINERARY_FALLBACKS[destination] || ITINERARY_FALLBACKS['Paris'];
  const generatedDays = [];

  for (let d = 1; d <= days; d++) {
    const baseDay = predefined[(d - 1) % predefined.length];
    generatedDays.push({
      day: d,
      title: baseDay ? baseDay.title : `Day ${d}: Exploring ${destination}`,
      periods: baseDay ? baseDay.periods : [
        { time: 'Morning', activity: `Morning exploration of ${destination}`, description: `Discover top historic landmarks and cultural sights in ${destination}.` },
        { time: 'Afternoon', activity: `Local gastronomy & sights`, description: `Enjoy local cuisine at top-rated neighborhood dining spots.` },
        { time: 'Evening', activity: `Leisure & sunset views`, description: `Unwind with scenic evening views and evening city atmosphere.` },
      ],
    });
  }

  return { destination, days, itinerary: generatedDays };
}

/**
 * Fallback chat assistant response
 */
function getChatFallback(query, destination) {
  const key = destination?.toLowerCase() || query?.toLowerCase() || '';
  if (key.includes('paris')) return CHAT_FALLBACKS['paris'];
  if (key.includes('tokyo')) return CHAT_FALLBACKS['tokyo'];
  return CHAT_FALLBACKS['default'];
}

function parseItineraryResponse(text, destination, days) {
  let cleanText = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try {
    const parsed = JSON.parse(cleanText);
    if (parsed.itinerary && Array.isArray(parsed.itinerary)) return parsed;
  } catch {
    // ignore
  }
  return getItineraryFallback(destination, days);
}

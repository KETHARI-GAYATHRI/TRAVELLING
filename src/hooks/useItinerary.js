import { useState, useCallback } from 'react';
import { generateItinerary as generateItineraryApi } from '../services/geminiService';

/**
 * Hook to manage itinerary generation state
 */
export function useItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (destination, days) => {
    if (!destination || !days) return;

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await generateItineraryApi(destination, days);
      setItinerary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setItinerary(null);
    setError(null);
  }, []);

  return { itinerary, generate, loading, error, clear };
}

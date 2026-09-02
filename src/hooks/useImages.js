import { useState, useEffect } from 'react';
import { getDestinationImage, getPlaceImage } from '../services/imageService';

/**
 * Hook to fetch a dynamic image from Unsplash
 * @param {string} query - Image search query
 * @param {string} type - 'destination' or 'place'
 * @param {string} context - Additional context (destination name for place images)
 */
export function useImage(query, type = 'destination', context = '') {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchImage() {
      setLoading(true);
      setError(null);

      try {
        let url;
        if (type === 'place') {
          url = await getPlaceImage(query, context);
        } else {
          url = await getDestinationImage(query);
        }

        if (!cancelled) {
          setImageUrl(url);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      cancelled = true;
    };
  }, [query, type, context]);

  return { imageUrl, loading, error };
}

/**
 * ESCAPE — Image Service
 * Integrates with Unsplash API for dynamic destination/place images
 */

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

// In-memory cache to avoid duplicate API requests
const imageCache = new Map();

// Curated fallback images when API is unavailable
const FALLBACK_IMAGES = {
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  'cape town': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  'santorini': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
};

/**
 * Search Unsplash for images
 * @param {string} query - Search query
 * @param {number} perPage - Number of results (default 1)
 * @returns {Promise<Array>} Array of image objects
 */
export async function searchImages(query, perPage = 1) {
  const cacheKey = `${query}:${perPage}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  if (!ACCESS_KEY) {
    return getFallbackResults(query, perPage);
  }

  try {
    const url = `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&content_filter=high`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.warn(`Unsplash API error (${response.status}): falling back to curated images`);
      return getFallbackResults(query, perPage);
    }

    const data = await response.json();
    const results = data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      smallUrl: photo.urls.small,
      thumbUrl: photo.urls.thumb,
      alt: photo.alt_description || query,
      credit: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
    }));

    imageCache.set(cacheKey, results);
    return results;
  } catch (error) {
    console.warn('Unsplash fetch failed:', error.message);
    return getFallbackResults(query, perPage);
  }
}

/**
 * Get a single destination hero image
 * @param {string} destinationName - e.g., "Paris"
 * @returns {Promise<string>} Image URL
 */
export async function getDestinationImage(destinationName) {
  const results = await searchImages(`${destinationName} city landmark travel`, 1);
  return results.length > 0 ? results[0].url : getFallbackUrl(destinationName);
}

/**
 * Get a single place image
 * @param {string} placeName - e.g., "Eiffel Tower"
 * @param {string} destinationName - e.g., "Paris"
 * @returns {Promise<string>} Image URL
 */
export async function getPlaceImage(placeName, destinationName) {
  const results = await searchImages(`${placeName} ${destinationName}`, 1);
  return results.length > 0 ? results[0].url : getFallbackUrl(destinationName);
}

/**
 * Get fallback URL for a destination
 */
function getFallbackUrl(name) {
  const key = name.toLowerCase();
  return FALLBACK_IMAGES[key] || FALLBACK_IMAGES['default'];
}

/**
 * Generate fallback results when API is unavailable
 */
function getFallbackResults(query, perPage) {
  const url = getFallbackUrl(query);
  const results = Array.from({ length: perPage }, (_, i) => ({
    id: `fallback-${i}`,
    url,
    smallUrl: url,
    thumbUrl: url,
    alt: query,
    credit: null,
  }));
  return results;
}

/**
 * Clear the image cache
 */
export function clearImageCache() {
  imageCache.clear();
}

/**
 * ESCAPE — Location Service
 * Browser geolocation + reverse geocoding
 */

/**
 * Get current position from browser geolocation
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('UNSUPPORTED'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('DENIED'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('UNAVAILABLE'));
            break;
          case error.TIMEOUT:
            reject(new Error('TIMEOUT'));
            break;
          default:
            reject(new Error('UNKNOWN'));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

/**
 * Reverse geocode coordinates to a city name using OpenWeather geocoding
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<string>} City name
 */
export async function reverseGeocode(lat, lng) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!API_KEY) {
    // Fallback to Nominatim (no API key required)
    return reverseGeocodeNominatim(lat, lng);
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return reverseGeocodeNominatim(lat, lng);
    }

    const data = await response.json();
    if (data.length > 0) {
      return data[0].name;
    }

    throw new Error('Unable to determine city name.');
  } catch {
    return reverseGeocodeNominatim(lat, lng);
  }
}

/**
 * Fallback reverse geocoding via Nominatim (OSM)
 */
async function reverseGeocodeNominatim(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ESCAPE-Travel-App' },
    });

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || data.display_name?.split(',')[0] || 'Unknown location';
  } catch {
    throw new Error('Unable to determine your city. Please search manually.');
  }
}

/**
 * Forward geocode: search a city name to get coordinates
 * @param {string} query - City name
 * @returns {Promise<{name: string, lat: number, lng: number}>}
 */
export async function searchCity(query) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!API_KEY) {
    return searchCityNominatim(query);
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return searchCityNominatim(query);
    }

    const data = await response.json();
    if (data.length > 0) {
      return {
        name: data[0].name,
        lat: data[0].lat,
        lng: data[0].lon,
      };
    }

    throw new Error(`No results found for "${query}". Please try another city.`);
  } catch (error) {
    if (error.message.includes('No results')) throw error;
    return searchCityNominatim(query);
  }
}

/**
 * Fallback city search via Nominatim
 */
async function searchCityNominatim(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ESCAPE-Travel-App' },
    });

    if (!response.ok) throw new Error('Search failed');

    const data = await response.json();
    if (data.length > 0) {
      return {
        name: data[0].display_name.split(',')[0],
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }

    throw new Error(`No results found for "${query}". Please try another city.`);
  } catch (error) {
    if (error.message.includes('No results')) throw error;
    throw new Error('Unable to search locations right now. Please try again.');
  }
}

/**
 * Get error message for location errors
 */
export function getLocationErrorMessage(errorMessage) {
  switch (errorMessage) {
    case 'DENIED':
      return 'Location access was denied. You can search for a city manually instead.';
    case 'UNAVAILABLE':
      return 'Your location could not be determined. Please try searching manually.';
    case 'TIMEOUT':
      return 'Location request timed out. Please try again or search manually.';
    case 'UNSUPPORTED':
      return 'Your browser does not support location services. Please search manually.';
    default:
      return 'Unable to determine your location. Please search for a city manually.';
  }
}

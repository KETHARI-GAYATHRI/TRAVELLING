/**
 * ESCAPE — Weather Service
 * Integrates with OpenWeather API with Open-Meteo live fallback
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Weather code mapping for Open-Meteo API fallback
 */
function getWeatherConditionFromCode(code) {
  if (code === 0) return { condition: 'Clear sky', icon: 'https://openweathermap.org/img/wn/01d@2x.png' };
  if (code === 1 || code === 2 || code === 3) return { condition: 'Partly cloudy', icon: 'https://openweathermap.org/img/wn/02d@2x.png' };
  if (code >= 45 && code <= 48) return { condition: 'Foggy', icon: 'https://openweathermap.org/img/wn/50d@2x.png' };
  if (code >= 51 && code <= 67) return { condition: 'Drizzle & Rain', icon: 'https://openweathermap.org/img/wn/10d@2x.png' };
  if (code >= 71 && code <= 77) return { condition: 'Snow', icon: 'https://openweathermap.org/img/wn/13d@2x.png' };
  if (code >= 80 && code <= 82) return { condition: 'Rain showers', icon: 'https://openweathermap.org/img/wn/09d@2x.png' };
  if (code >= 95) return { condition: 'Thunderstorm', icon: 'https://openweathermap.org/img/wn/11d@2x.png' };
  return { condition: 'Clear', icon: 'https://openweathermap.org/img/wn/01d@2x.png' };
}

/**
 * Destination coordinate lookup for fallback
 */
const DESTINATION_COORDS = {
  'paris': { lat: 48.8566, lng: 2.3522 },
  'tokyo': { lat: 35.6762, lng: 139.6503 },
  'cape town': { lat: -33.9249, lng: 18.4241 },
  'new york': { lat: 40.7128, lng: -74.0060 },
  'bali': { lat: -8.3405, lng: 115.0920 },
  'santorini': { lat: 36.3932, lng: 25.4615 },
  'rome': { lat: 41.9028, lng: 12.4964 },
  'dubai': { lat: 25.2048, lng: 55.2708 },
};

/**
 * Fetch current weather by city name
 * @param {string} city - City name
 * @returns {Promise<object>} Normalized weather data
 */
export async function getWeatherByCity(city) {
  // If OpenWeather API key exists, try OpenWeather first
  if (API_KEY && API_KEY.trim() !== '') {
    try {
      const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return normalizeWeatherData(data);
      }
    } catch {
      // OpenWeather failed or key pending — proceed to Open-Meteo fallback
    }
  }

  // Live Fallback via Open-Meteo (No API key required)
  const coords = DESTINATION_COORDS[city.toLowerCase()] || { lat: 48.8566, lng: 2.3522 };
  return getWeatherByCoordsOpenMeteo(coords.lat, coords.lng, city);
}

/**
 * Fetch current weather by coordinates
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<object>}
 */
export async function getWeatherByCoords(lat, lng) {
  if (API_KEY && API_KEY.trim() !== '') {
    try {
      const url = `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return normalizeWeatherData(data);
      }
    } catch {
      // Fallback to Open-Meteo
    }
  }

  return getWeatherByCoordsOpenMeteo(lat, lng, 'Current Location');
}

/**
 * Fetch real-time weather using Open-Meteo API
 */
async function getWeatherByCoordsOpenMeteo(lat, lng, cityName) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Live weather data unavailable right now.');
    }

    const data = await response.json();
    const current = data.current_weather;
    const weatherInfo = getWeatherConditionFromCode(current.weathercode);
    const humidity = data.hourly?.relativehumidity_2m?.[0] || 65;

    return {
      city: cityName,
      country: '',
      temp: Math.round(current.temperature),
      feelsLike: Math.round(current.temperature),
      humidity: Math.round(humidity),
      windSpeed: Math.round(current.windspeed),
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      iconCode: '',
    };
  } catch {
    throw new Error('Unable to load live weather data right now. Please try again later.');
  }
}

/**
 * Normalize OpenWeather API response
 */
function normalizeWeatherData(data) {
  return {
    city: data.name,
    country: data.sys?.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    condition: data.weather[0]?.description || 'Clear',
    icon: data.weather[0]?.icon
      ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      : null,
    iconCode: data.weather[0]?.icon || '',
  };
}

/**
 * ESCAPE — Weather Service
 * Integrates with OpenWeather API for real-time weather data
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather by city name
 * @param {string} city - City name
 * @returns {Promise<object>} Normalized weather data
 */
export async function getWeatherByCity(city) {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured. Add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid OpenWeather API key. Please check your configuration.');
    }
    if (response.status === 404) {
      throw new Error(`Weather data not found for "${city}".`);
    }
    throw new Error('Unable to load weather data right now. Please try again later.');
  }

  const data = await response.json();
  return normalizeWeatherData(data);
}

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<object>} Normalized weather data
 */
export async function getWeatherByCoords(lat, lng) {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured. Add VITE_OPENWEATHER_API_KEY to your .env file.');
  }

  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid OpenWeather API key. Please check your configuration.');
    }
    throw new Error('Unable to load weather data right now. Please try again later.');
  }

  const data = await response.json();
  return normalizeWeatherData(data);
}

/**
 * Normalize raw OpenWeather API response
 */
function normalizeWeatherData(data) {
  return {
    city: data.name,
    country: data.sys?.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    condition: data.weather[0]?.description || 'Unknown',
    icon: data.weather[0]?.icon
      ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      : null,
    iconCode: data.weather[0]?.icon || '',
  };
}

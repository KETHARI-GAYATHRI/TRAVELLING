import { useState, useEffect, useCallback } from 'react';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';

/**
 * Hook to fetch and manage weather data
 * @param {string} city - City name (optional)
 * @param {object} coords - {lat, lng} (optional)
 */
export function useWeather(city, coords) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (!city && !coords) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (coords) {
        data = await getWeatherByCoords(coords.lat, coords.lng);
      } else {
        data = await getWeatherByCity(city);
      }
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [city, coords?.lat, coords?.lng]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
}

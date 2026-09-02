import { useState, useCallback } from 'react';
import { getCurrentPosition, reverseGeocode, searchCity, getLocationErrorMessage } from '../services/locationService';

/**
 * Hook to manage browser geolocation state
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null); // { name, lat, lng }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // prompt | granted | denied

  const requestLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getCurrentPosition();
      setPermissionState('granted');

      const cityName = await reverseGeocode(coords.lat, coords.lng);
      setLocation({
        name: cityName,
        lat: coords.lat,
        lng: coords.lng,
      });
    } catch (err) {
      if (err.message === 'DENIED') {
        setPermissionState('denied');
      }
      setError(getLocationErrorMessage(err.message));
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchForCity = useCallback(async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await searchCity(query);
      setLocation({
        name: result.name,
        lat: result.lat,
        lng: result.lng,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    loading,
    error,
    permissionState,
    requestLocation,
    searchForCity,
    clearLocation,
  };
}

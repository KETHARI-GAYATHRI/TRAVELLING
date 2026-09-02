import { useState } from 'react';
import { MapPin, Navigation, Search, Loader2, ShieldAlert } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from './WeatherCard';

export default function LocationDetector() {
  const { location, loading, error, permissionState, requestLocation, searchForCity } = useGeolocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { weather, loading: weatherLoading, error: weatherError, refetch: weatherRefetch } = useWeather(
    location?.name || null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchForCity(searchQuery.trim());
    }
  };

  return (
    <div className="location-detector">
      <div className="location-detector__header">
        <div className="location-detector__icon">
          <MapPin size={20} />
        </div>
        <div>
          <h3 className="location-detector__title">Your Location</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Get weather and travel info for your area
          </p>
        </div>
      </div>

      {!location && (
        <div className="location-detector__actions">
          {/* Use My Location */}
          <button
            className="btn btn--primary"
            onClick={requestLocation}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
            type="button"
          >
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Finding your location...
              </>
            ) : (
              <>
                <Navigation size={16} />
                Use my location
              </>
            )}
          </button>

          {/* Permission Denied Message */}
          {permissionState === 'denied' && (
            <div className="location-detector__denied">
              <ShieldAlert size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Location access was denied. Search for a city manually instead.
            </div>
          )}

          {/* Error Message */}
          {error && permissionState !== 'denied' && (
            <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{error}</p>
          )}

          <div className="location-detector__divider">or</div>

          {/* Manual Search */}
          <form className="location-detector__search" onSubmit={handleSearch}>
            <label htmlFor="location-search" className="sr-only">Search for a city</label>
            <input
              id="location-search"
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn--secondary"
              type="submit"
              disabled={loading || !searchQuery.trim()}
              aria-label="Search city"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Location Result */}
      {location && (
        <>
          <div className="location-detector__result">
            <MapPin size={18} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
            <div>
              <span className="location-detector__result-text">{location.name}</span>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
              </p>
            </div>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => {
                searchForCity('');
                setSearchQuery('');
                window.location.reload();
              }}
              style={{ marginLeft: 'auto' }}
              type="button"
            >
              Change
            </button>
          </div>

          {/* Weather for detected location */}
          <div style={{ marginTop: 'var(--space-4)' }}>
            <WeatherCard
              weather={weather}
              loading={weatherLoading}
              error={weatherError}
              onRetry={weatherRefetch}
              cityName={location.name}
            />
          </div>
        </>
      )}
    </div>
  );
}

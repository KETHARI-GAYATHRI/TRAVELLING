import { Droplets, Wind, Thermometer, RefreshCw } from 'lucide-react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

export default function WeatherCard({ weather, loading, error, onRetry, cityName }) {
  if (loading) {
    return (
      <div className="weather-card">
        <LoadingState message="Loading weather..." size="small" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <ErrorState
          message={error}
          onRetry={onRetry}
          compact
        />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-card" role="region" aria-label={`Current weather in ${weather.city || cityName}`}>
      <div className="weather-card__header">
        <h3 className="weather-card__location">{weather.city || cityName}</h3>
        {onRetry && (
          <button onClick={onRetry} className="btn btn--ghost btn--sm" aria-label="Refresh weather">
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      <div className="weather-card__main">
        {weather.icon && (
          <img
            src={weather.icon}
            alt={weather.condition}
            className="weather-card__icon"
            width={72}
            height={72}
          />
        )}
        <div>
          <div className="weather-card__temp">{weather.temp}°C</div>
          <div className="weather-card__condition">{weather.condition}</div>
        </div>
      </div>

      <div className="weather-card__details">
        <div>
          <div className="weather-card__detail-label">
            <Thermometer size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Feels Like
          </div>
          <div className="weather-card__detail-value">{weather.feelsLike}°C</div>
        </div>
        <div>
          <div className="weather-card__detail-label">
            <Droplets size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Humidity
          </div>
          <div className="weather-card__detail-value">{weather.humidity}%</div>
        </div>
        <div>
          <div className="weather-card__detail-label">
            <Wind size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Wind
          </div>
          <div className="weather-card__detail-value">{weather.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
}

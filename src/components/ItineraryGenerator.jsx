import { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import { getAllDestinations } from '../data/destinations';
import { useItinerary } from '../hooks/useItinerary';
import ItineraryDisplay from './ItineraryDisplay';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const DAY_OPTIONS = [2, 3, 4, 5, 7];

export default function ItineraryGenerator({ preselectedDestination = '' }) {
  const destinations = getAllDestinations();
  const [selectedDest, setSelectedDest] = useState(preselectedDestination);
  const [selectedDays, setSelectedDays] = useState(3);
  const { itinerary, generate, loading, error, clear } = useItinerary();

  useEffect(() => {
    if (preselectedDestination) {
      setSelectedDest(preselectedDestination);
    }
  }, [preselectedDestination]);

  const handleGenerate = () => {
    if (!selectedDest) return;
    const dest = destinations.find(d => d.id === selectedDest || d.name === selectedDest);
    const destName = dest ? dest.name : selectedDest;
    generate(destName, selectedDays);
  };

  return (
    <div>
      <div className="itinerary-form">
        <div className="itinerary-form__fields">
          <div className="itinerary-form__field">
            <label htmlFor="itinerary-dest" className="itinerary-form__label">
              <MapPin size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Destination
            </label>
            <select
              id="itinerary-dest"
              className="itinerary-form__select"
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
            >
              <option value="">Select a destination</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
              ))}
            </select>
          </div>

          <div className="itinerary-form__field">
            <label htmlFor="itinerary-days" className="itinerary-form__label">
              <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Duration
            </label>
            <select
              id="itinerary-days"
              className="itinerary-form__select"
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
            >
              {DAY_OPTIONS.map(d => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn btn--accent btn--lg"
          onClick={handleGenerate}
          disabled={!selectedDest || loading}
          style={{ width: '100%', justifyContent: 'center' }}
          type="button"
        >
          <Sparkles size={18} />
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <LoadingState message="Crafting your perfect itinerary..." variant="dots" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <ErrorState
            message={error}
            onRetry={handleGenerate}
          />
        </div>
      )}

      {/* Result */}
      {itinerary && !loading && (
        <ItineraryDisplay itinerary={itinerary} onClear={clear} />
      )}
    </div>
  );
}

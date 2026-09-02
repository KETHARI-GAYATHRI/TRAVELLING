import { RotateCcw, Sun, Coffee, Moon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const TIME_ICONS = {
  Morning: Sun,
  Afternoon: Coffee,
  Evening: Moon,
};

export default function ItineraryDisplay({ itinerary, onClear }) {
  if (!itinerary || !itinerary.itinerary) return null;

  return (
    <div className="itinerary-display">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 600 }}>
            Your {itinerary.destination} Itinerary
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            {itinerary.days} days of curated experiences
          </p>
        </div>
        {onClear && (
          <button className="btn btn--ghost btn--sm" onClick={onClear} type="button">
            <RotateCcw size={14} />
            New itinerary
          </button>
        )}
      </div>

      {itinerary.itinerary.map((day, dayIndex) => (
        <ScrollReveal key={day.day} delay={dayIndex * 0.1}>
          <div className="itinerary-day">
            <div className="itinerary-day__marker">{day.day}</div>
            <h4 className="itinerary-day__title">{day.title || `Day ${day.day}`}</h4>

            {day.periods && day.periods.map((period, periodIndex) => {
              const TimeIcon = TIME_ICONS[period.time] || Sun;
              return (
                <div key={periodIndex} className="itinerary-period">
                  <div className="itinerary-period__label">
                    <TimeIcon size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                    {period.time}
                  </div>
                  <div className="itinerary-period__activity">{period.activity}</div>
                  {period.description && (
                    <p className="itinerary-period__desc">{period.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

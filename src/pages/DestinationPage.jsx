import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Cloud, Landmark, Sparkles } from 'lucide-react';
import { getDestinationById } from '../data/destinations';
import { useWeather } from '../hooks/useWeather';
import DynamicImage from '../components/DynamicImage';
import WeatherCard from '../components/WeatherCard';
import PlaceCard from '../components/PlaceCard';
import ItineraryGenerator from '../components/ItineraryGenerator';
import ChatAssistant from '../components/ChatAssistant';
import ScrollReveal from '../components/ScrollReveal';

export default function DestinationPage() {
  const { id } = useParams();
  const destination = getDestinationById(id);

  if (!destination) {
    return (
      <div className="not-found">
        <div>
          <p className="not-found__code">404</p>
          <h1 className="not-found__title">Destination not found</h1>
          <p className="not-found__desc">
            The destination you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/explore" className="btn btn--primary btn--lg">
            <ArrowLeft size={16} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const { weather, loading: weatherLoading, error: weatherError, refetch: weatherRefetch } = useWeather(destination.name);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="dest-hero" aria-label={`${destination.name} overview`}>
        <DynamicImage
          query={`${destination.name} ${destination.country} skyline`}
          alt={`${destination.name}, ${destination.country}`}
          className="dest-hero__image"
        />
        <div className="dest-hero__overlay" />
        <div className="dest-hero__content">
          <Link to="/explore" className="dest-hero__back">
            <ArrowLeft size={16} />
            Back to Explore
          </Link>
          <h1 className="dest-hero__name">{destination.name}</h1>
          <p className="dest-hero__country">
            <MapPin size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            {destination.country} · {destination.region}
          </p>
          <p className="dest-hero__desc">{destination.description}</p>
        </div>
      </section>

      {/* Weather */}
      <section className="dest-section" aria-labelledby="weather-heading">
        <div className="container">
          <ScrollReveal>
            <div className="section__header" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>
              <span className="section__label">
                <Cloud size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                Current Weather
              </span>
              <h2 id="weather-heading" style={{ fontSize: 'var(--text-2xl)' }}>
                Weather in {destination.name}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ maxWidth: 480 }}>
              <WeatherCard
                weather={weather}
                loading={weatherLoading}
                error={weatherError}
                onRetry={weatherRefetch}
                cityName={destination.name}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Famous Places */}
      <section className="dest-section" style={{ background: 'var(--color-bg-warm)' }} aria-labelledby="places-heading">
        <div className="container">
          <ScrollReveal>
            <div className="section__header" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
              <span className="section__label">
                <Landmark size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                Must Visit
              </span>
              <h2 id="places-heading" style={{ fontSize: 'var(--text-2xl)' }}>
                Famous Places in {destination.name}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                Iconic landmarks and experiences you cannot miss.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--2" style={{ maxWidth: 960 }}>
            {destination.famousPlaces.map((place, i) => (
              <ScrollReveal key={place.id} delay={i * 0.1}>
                <PlaceCard place={place} destinationName={destination.name} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="dest-section" aria-labelledby="itinerary-heading">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section__header" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
              <span className="section__label">
                <Sparkles size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                AI Itinerary
              </span>
              <h2 id="itinerary-heading" style={{ fontSize: 'var(--text-2xl)' }}>
                Plan Your {destination.name} Trip
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                Let AI generate a personalized day-by-day itinerary.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ItineraryGenerator preselectedDestination={destination.id} />
          </ScrollReveal>
        </div>
      </section>

      {/* Chat Assistant scoped to this destination */}
      <ChatAssistant destinationContext={destination.name} />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Compass, Sparkles, MapPin, Globe } from 'lucide-react';
import { getAllDestinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import LocationDetector from '../components/LocationDetector';
import ItineraryGenerator from '../components/ItineraryGenerator';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage() {
  const destinations = getAllDestinations();
  const featured = destinations.slice(0, 4);

  return (
    <div className="page-enter">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" aria-label="Welcome to ESCAPE">
        <div className="hero__video-container">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero__overlay" />

        <div className="hero__content">
          <span className="hero__label">Premium Travel Discovery</span>
          <h1 className="hero__title">
            Go somewhere<br />you'll <em>remember.</em>
          </h1>
          <p className="hero__subtitle">
            Discover extraordinary places, real-time conditions, and intelligent
            itineraries — all in one place.
          </p>
          <div className="hero__actions">
            <Link to="/explore" className="btn btn--white btn--lg">
              <Compass size={18} />
              Explore destinations
            </Link>
            <a href="#planner" className="btn btn--outline-white btn--lg">
              <Sparkles size={18} />
              Plan my trip
            </a>
          </div>
        </div>

        <div className="hero__scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS ===== */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Curated for You</span>
              <h2 className="section__title" id="featured-heading">Featured Destinations</h2>
              <p className="section__subtitle">
                Hand-picked destinations that offer extraordinary experiences, rich culture, and unforgettable memories.
              </p>
            </div>
          </ScrollReveal>

          <div className="featured-grid">
            {featured.map((dest, i) => (
              <ScrollReveal key={dest.id} delay={i * 0.1}>
                <DestinationCard destination={dest} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
              <Link to="/explore" className="btn btn--secondary btn--lg">
                View all destinations
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WHY ESCAPE ===== */}
      <section className="section" style={{ background: 'var(--color-bg-warm)' }} aria-labelledby="why-heading">
        <div className="container">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Why ESCAPE</span>
              <h2 className="section__title" id="why-heading">Travel, Reimagined</h2>
              <p className="section__subtitle">
                Everything you need to plan the perfect trip, powered by real-time data and AI intelligence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid--3" style={{ maxWidth: 960, margin: '0 auto' }}>
            {[
              {
                icon: Globe,
                title: 'Live Weather',
                desc: 'Real-time weather data for every destination, so you always know what to pack.',
              },
              {
                icon: MapPin,
                title: 'Famous Places',
                desc: 'Curated lists of must-visit landmarks, hidden gems, and local favorites.',
              },
              {
                icon: Sparkles,
                title: 'AI Itineraries',
                desc: 'Let our AI craft personalized day-by-day itineraries tailored to your trip.',
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.15}>
                <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-full)',
                    background: 'rgba(198, 123, 92, 0.1)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-5)',
                    color: 'var(--color-accent-primary)'
                  }}>
                    <feature.icon size={24} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATION & WEATHER ===== */}
      <section className="section location-weather-section" aria-labelledby="location-heading">
        <div className="container">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Location Aware</span>
              <h2 className="section__title" id="location-heading">Weather at Your Fingertips</h2>
              <p className="section__subtitle">
                Detect your location or search for any city to get real-time weather conditions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              <LocationDetector />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== AI TRIP PLANNER ===== */}
      <section className="section" id="planner" aria-labelledby="planner-heading">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">AI-Powered</span>
              <h2 className="section__title" id="planner-heading">Plan Your Perfect Trip</h2>
              <p className="section__subtitle">
                Select a destination and duration, and let our AI generate a structured day-by-day itinerary just for you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ItineraryGenerator />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section" aria-label="Get started">
        <div className="container">
          <ScrollReveal>
            <h2 className="cta-section__title">Ready to explore the world?</h2>
            <p className="cta-section__subtitle">
              Start your journey today. Discover destinations, check the weather, and plan your itinerary.
            </p>
            <div className="cta-section__actions">
              <Link to="/explore" className="btn btn--white btn--lg">
                <Compass size={18} />
                Browse Destinations
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

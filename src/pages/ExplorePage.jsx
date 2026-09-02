import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { getAllDestinations, getRegions, searchDestinations, filterDestinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import ScrollReveal from '../components/ScrollReveal';

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState(null);
  const regions = getRegions();

  const results = useMemo(() => {
    const searched = searchDestinations(query);
    return filterDestinations(searched, { region: activeRegion });
  }, [query, activeRegion]);

  const handleClearFilters = () => {
    setActiveRegion(null);
    setQuery('');
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="explore-header">
        <div className="container">
          <h1 className="explore-header__title">Explore Destinations</h1>
          <p className="explore-header__subtitle">
            Discover our curated collection of extraordinary places around the world.
          </p>

          <div className="explore-controls">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by name, country, or region..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FilterBar
              filters={regions}
              activeFilter={activeRegion}
              onFilter={setActiveRegion}
              onClear={() => setActiveRegion(null)}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container explore-results">
        {results.length > 0 ? (
          <>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-6)',
            }}>
              Showing {results.length} destination{results.length !== 1 ? 's' : ''}
              {activeRegion ? ` in ${activeRegion}` : ''}
              {query ? ` matching "${query}"` : ''}
            </p>
            <div className="featured-grid">
              {results.map((dest, i) => (
                <ScrollReveal key={dest.id} delay={i * 0.05}>
                  <DestinationCard destination={dest} />
                </ScrollReveal>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={MapPin}
            title="No destinations found"
            message={`No destinations match "${query}"${activeRegion ? ` in ${activeRegion}` : ''}. Try adjusting your search or filters.`}
            action={{ label: 'Clear all filters', onClick: handleClearFilters }}
          />
        )}
      </div>
    </div>
  );
}

export default function FilterBar({ filters, activeFilter, onFilter, onClear }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter destinations">
      <button
        className={`filter-bar__pill ${!activeFilter ? 'filter-bar__pill--active' : ''}`}
        onClick={() => onFilter(null)}
        aria-pressed={!activeFilter}
      >
        All
      </button>
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-bar__pill ${activeFilter === filter ? 'filter-bar__pill--active' : ''}`}
          onClick={() => onFilter(filter)}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
      {activeFilter && (
        <button
          className="filter-bar__clear"
          onClick={onClear}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
}

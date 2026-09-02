export default function LoadingState({ message = 'Loading...', size = 'default', variant = 'spinner' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      {variant === 'dots' ? (
        <div className="loading-state__dots">
          <span className="loading-state__dot" />
          <span className="loading-state__dot" />
          <span className="loading-state__dot" />
        </div>
      ) : (
        <div
          className="loading-state__spinner"
          style={size === 'small' ? { width: 24, height: 24, borderWidth: 2 } : {}}
        />
      )}
      <p className="loading-state__text">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}

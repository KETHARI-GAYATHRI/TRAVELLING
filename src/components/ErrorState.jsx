import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ title, message, onRetry, compact = false }) {
  return (
    <div className="error-state" role="alert" style={compact ? { padding: '1.5rem 1rem' } : {}}>
      <AlertTriangle className="error-state__icon" size={compact ? 32 : 48} />
      {title && <h3 className="error-state__title">{title}</h3>}
      <p className="error-state__message">{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn--secondary btn--sm" onClick={onRetry} type="button">
          Try Again
        </button>
      )}
    </div>
  );
}

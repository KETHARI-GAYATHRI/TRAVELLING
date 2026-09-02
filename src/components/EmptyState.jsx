import { Search } from 'lucide-react';

export default function EmptyState({ icon: Icon = Search, title = 'Nothing found', message, action }) {
  return (
    <div className="empty-state" role="status">
      <Icon className="empty-state__icon" size={56} />
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message">{message}</p>}
      {action && (
        <button className="btn btn--secondary btn--sm" onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
    </div>
  );
}

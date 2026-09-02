import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DynamicImage from './DynamicImage';

export default function DestinationCard({ destination }) {
  const { id, name, country, region, description, shortDescription } = destination;

  return (
    <Link to={`/destination/${id}`} className="dest-card" aria-label={`Explore ${name}, ${country}`}>
      <div className="dest-card__image-wrap">
        <DynamicImage
          query={name}
          alt={`${name}, ${country}`}
          className="dest-card__image"
        />
        <span className="badge badge--accent dest-card__badge">{region}</span>
      </div>
      <div className="dest-card__body">
        <h3 className="dest-card__name">{name}</h3>
        <p className="dest-card__country">{country}</p>
        <p className="dest-card__desc">{shortDescription || description}</p>
        <span className="dest-card__cta">
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

import DynamicImage from './DynamicImage';

export default function PlaceCard({ place, destinationName }) {
  const { name, description, category } = place;

  return (
    <article className="place-card" aria-label={name}>
      <div className="place-card__image-wrap">
        <DynamicImage
          query={name}
          type="place"
          context={destinationName}
          alt={`${name} in ${destinationName}`}
          className="place-card__image"
        />
      </div>
      <div className="place-card__body">
        <h4 className="place-card__name">{name}</h4>
        <p className="place-card__desc">{description}</p>
        {category && (
          <span className="badge place-card__category">{category}</span>
        )}
      </div>
    </article>
  );
}

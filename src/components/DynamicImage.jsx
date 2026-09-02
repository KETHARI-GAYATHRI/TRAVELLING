import { useState } from 'react';
import { useImage } from '../hooks/useImages';
import { ImageOff } from 'lucide-react';

export default function DynamicImage({ query, type = 'destination', context = '', alt, className = '', style = {} }) {
  const { imageUrl, loading } = useImage(query, type, context);
  const [imgError, setImgError] = useState(false);

  if (loading) {
    return (
      <div className={`skeleton ${className}`} style={{ width: '100%', height: '100%', ...style }} aria-hidden="true" />
    );
  }

  if (imgError || !imageUrl) {
    return (
      <div className={`image-fallback ${className}`} style={style} role="img" aria-label={alt}>
        <ImageOff size={32} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || query}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
}

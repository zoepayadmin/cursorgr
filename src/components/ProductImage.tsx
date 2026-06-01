import {
  getProxiedImageUrl,
  handleProductImageError,
  PRODUCT_IMAGE_PLACEHOLDER,
} from '../utils/productImage';

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  return (
    <img
      src={getProxiedImageUrl(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={handleProductImageError}
      data-original-src={src}
      data-fallback={PRODUCT_IMAGE_PLACEHOLDER}
    />
  );
}

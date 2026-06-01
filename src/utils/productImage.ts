import type { SyntheticEvent } from 'react';

const IMAGE_PROXY = 'https://wsrv.nl/?url=';
export const PRODUCT_IMAGE_PLACEHOLDER = '/placeholder-product.svg';

export function getProxiedImageUrl(originalUrl: string): string {
  if (!originalUrl?.trim()) {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }
  const trimmed = originalUrl.trim();
  if (trimmed.startsWith('https://wsrv.nl/')) {
    return trimmed;
  }
  return `${IMAGE_PROXY}${encodeURIComponent(trimmed)}`;
}

export function handleProductImageError(
  event: SyntheticEvent<HTMLImageElement>,
): void {
  const img = event.currentTarget;
  if (img.src.includes(PRODUCT_IMAGE_PLACEHOLDER)) return;
  img.onerror = null;
  img.src = PRODUCT_IMAGE_PLACEHOLDER;
}

export const company = {
  name: 'PowerFit Suplementos',
  legalName: 'PowerFit Comércio de Suplementos Ltda.',
  cnpj: '12.345.678/0001-90',
  address: {
    street: 'Av. Paulista, 1000 — Sala 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
  },
  email: 'contato@powerfit.com.br',
  privacyEmail: 'privacidade@powerfit.com.br',
  phone: '(11) 3000-0000',
  phoneLink: 'tel:+551130000000',
  whatsapp: '5511999999999',
  website: 'https://www.powerfit.com.br',
  businessHours: 'Segunda a sexta, das 9h às 18h | Sábado, das 9h às 13h',
  freeShippingThreshold: 199,
  social: {
    instagram: 'https://www.instagram.com/powerfit',
    facebook: 'https://www.facebook.com/powerfit',
    youtube: 'https://www.youtube.com/@powerfit',
    tiktok: 'https://www.tiktok.com/@powerfit',
  },
} as const;

export type Company = typeof company;

export function getFullAddress(c = company): string {
  const { street, neighborhood, city, state, zipCode } = c.address;
  return `${street}, ${neighborhood} — ${city}/${state} — CEP ${zipCode}`;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

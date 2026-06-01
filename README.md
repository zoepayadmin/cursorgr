# PowerFit Suplementos — E-commerce

Loja virtual de suplementos em React, Tailwind CSS e Lucide Icons, inspirada em referências do segmento (Growth Suplementos).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Lucide Icons

## Configuração central

Todos os dados institucionais ficam em `config/company.ts`. Altere CNPJ, endereço, e-mail ou redes sociais uma única vez — as páginas de políticas, footer e header refletem automaticamente.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Rotas

| Rota | Página |
|------|--------|
| `/` | Home com vitrine e filtros |
| `/quem-somos` | Quem Somos |
| `/politica-de-privacidade` | Privacidade (LGPD) |
| `/termos-de-uso` | Termos de Uso |
| `/trocas-e-devolucoes` | Trocas e Devoluções |
| `/frete-e-entregas` | Frete e Entregas |

## Imagens de produtos

URLs passam pelo proxy CORS `https://wsrv.nl/?url=` via `src/utils/productImage.ts`, com fallback para placeholder local em caso de erro.

## Mock de produtos

`src/data/products.json` — 6 produtos de teste com imagens Unsplash.

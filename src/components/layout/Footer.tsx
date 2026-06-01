import { Link } from 'react-router-dom';
import {
  CreditCard,
  Share2,
  Globe,
  Video,
  ShieldCheck,
  Lock,
  Truck,
} from 'lucide-react';
import { company, formatCurrency, getFullAddress } from '@config/company';

export function Footer() {
  const address = getFullAddress();
  const freeShipping = formatCurrency(company.freeShippingThreshold);

  return (
    <footer className="bg-navy-dark text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Atendimento
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={company.phoneLink}
                className="hover:text-accent-orange transition-colors"
              >
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="hover:text-accent-orange transition-colors"
              >
                {company.email}
              </a>
            </li>
            <li>{company.businessHours}</li>
            <li className="pt-2 text-white/80">
              Frete grátis acima de {freeShipping}
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 hover:bg-accent-orange transition-colors"
              aria-label="Share2"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 hover:bg-accent-orange transition-colors"
              aria-label="Globe"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href={company.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 hover:bg-accent-orange transition-colors"
              aria-label="YouTube"
            >
              <Video className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Institucional
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/quem-somos"
                className="hover:text-accent-orange transition-colors"
              >
                Quem Somos
              </Link>
            </li>
            <li>
              <Link
                to="/politica-de-privacidade"
                className="hover:text-accent-orange transition-colors"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                to="/termos-de-uso"
                className="hover:text-accent-orange transition-colors"
              >
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link
                to="/trocas-e-devolucoes"
                className="hover:text-accent-orange transition-colors"
              >
                Trocas e Devoluções
              </Link>
            </li>
            <li>
              <Link
                to="/frete-e-entregas"
                className="hover:text-accent-orange transition-colors"
              >
                Frete e Entregas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Formas de Pagamento
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-accent-orange" aria-hidden />
              Cartão de crédito em até 6x
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-accent-orange">PIX</span>
              — até 10% de desconto
            </li>
            <li>Boleto bancário</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Visa', 'Master', 'Elo', 'Pix'].map((brand) => (
              <span
                key={brand}
                className="rounded border border-white/20 px-2 py-1 text-xs font-medium text-white/70"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Selos de Segurança
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
              Site com certificado SSL
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
              Compra 100% segura
            </li>
            <li className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
              Entrega rastreada em todo o Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-gray-400 sm:px-6 sm:text-sm">
          <p>
            © {new Date().getFullYear()} {company.legalName} — CNPJ{' '}
            {company.cnpj}
          </p>
          <p className="mt-1">{address}</p>
        </div>
      </div>
    </footer>
  );
}

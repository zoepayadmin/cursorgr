import { company, getFullAddress } from '@config/company';
import { Share2, Globe, Video } from 'lucide-react';
import {
  InstitutionalLayout,
  PolicyParagraph,
  PolicySection,
} from '../../components/institutional/InstitutionalLayout';

export function AboutUsPage() {
  const address = getFullAddress();

  return (
    <InstitutionalLayout
      title="Quem Somos"
      subtitle={company.name}
    >
      <PolicySection title="Nossa história">
        <PolicyParagraph>
          A {company.name} nasceu da paixão por performance e saúde. Somos a{' '}
          {company.legalName}, registrada sob o CNPJ {company.cnpj}, e atuamos
          exclusivamente no comércio eletrônico de suplementos alimentares de
          alta qualidade, com curadoria rigorosa de marcas e lotes.
        </PolicyParagraph>
        <PolicyParagraph>
          Nossa missão é democratizar o acesso a proteínas, creatinas,
          aminoácidos e vitaminas com preços justos, entrega rápida e atendimento
          humanizado — porque acreditamos que cada treino merece o melhor
          combustível.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="Compromissos">
        <PolicyParagraph>
          Trabalhamos apenas com fornecedores homologados e produtos dentro da
          validade. Toda mercadoria é armazenada em ambiente climatizado em{' '}
          {company.address.city}, seguindo as normas da ANVISA. Transparência no
          rótulo, no preço e no pós-venda é o que nos diferencia.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="Onde estamos">
        <PolicyParagraph>
          <strong>{company.legalName}</strong>
          <br />
          CNPJ: {company.cnpj}
          <br />
          {address}
          <br />
          E-mail:{' '}
          <a
            href={`mailto:${company.email}`}
            className="text-accent-orange hover:underline"
          >
            {company.email}
          </a>
          <br />
          Telefone:{' '}
          <a
            href={company.phoneLink}
            className="text-accent-orange hover:underline"
          >
            {company.phone}
          </a>
          <br />
          Horário: {company.businessHours}
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="Redes sociais">
        <PolicyParagraph>
          Acompanhe lançamentos, dicas de treino e promoções exclusivas:
        </PolicyParagraph>
        <ul className="flex flex-wrap gap-4">
          <li>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy hover:text-accent-orange transition-colors"
            >
              <Share2 className="h-5 w-5" aria-hidden />
              Share2
            </a>
          </li>
          <li>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy hover:text-accent-orange transition-colors"
            >
              <Globe className="h-5 w-5" aria-hidden />
              Globe
            </a>
          </li>
          <li>
            <a
              href={company.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy hover:text-accent-orange transition-colors"
            >
              <Video className="h-5 w-5" aria-hidden />
              YouTube
            </a>
          </li>
        </ul>
      </PolicySection>
    </InstitutionalLayout>
  );
}

import { company, formatCurrency, getFullAddress } from '@config/company';
import {
  InstitutionalLayout,
  PolicyList,
  PolicyParagraph,
  PolicySection,
} from '../../components/institutional/InstitutionalLayout';

export function ShippingPolicyPage() {
  const address = getFullAddress();
  const freeShippingLabel = formatCurrency(company.freeShippingThreshold);

  return (
    <InstitutionalLayout
      title="Política de Frete e Entregas"
      subtitle={`Entregas em todo o Brasil — ${company.name}`}
    >
      <PolicySection title="1. Área de cobertura">
        <PolicyParagraph>
          A {company.legalName} (CNPJ {company.cnpj}), com centro de
          distribuição em {address}, realiza entregas para todo o território
          nacional através de transportadoras parceiras. O prazo e o valor do
          frete são calculados automaticamente no checkout com base no CEP de
          destino.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="2. Frete grátis">
        <PolicyParagraph>
          Pedidos a partir de {freeShippingLabel} em produtos elegíveis têm frete
          grátis para as regiões Sul, Sudeste e Centro-Oeste (capitais e
          regiões metropolitanas). Demais localidades podem receber subsídio
          parcial; o valor final é exibido antes da confirmação do pagamento.
          Promoções de frete podem ser divulgadas na topbar do site{' '}
          {company.website} e nas redes oficiais da {company.name}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="3. Prazos de entrega">
        <PolicyList
          items={[
            'Capitais e regiões metropolitanas: 2 a 5 dias úteis após confirmação do pagamento.',
            'Interior e demais regiões: 5 a 12 dias úteis, conforme a transportadora.',
            'O prazo começa a contar após a postagem; você receberá código de rastreio por e-mail.',
            'Finais de semana e feriados nacionais não são contabilizados.',
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Processamento do pedido">
        <PolicyParagraph>
          Pedidos aprovados até as 14h (horário de Brasília) em dias úteis são
          separados no mesmo dia. Pagamentos via boleto dependem da compensação
          bancária. Em caso de atraso, nossa equipe contatará você pelo e-mail
          cadastrado ou pelo telefone {company.phone} ({company.businessHours}).
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="5. Recebimento">
        <PolicyList
          items={[
            'Confira a embalagem na presença do entregador; recuse em caso de violação evidente.',
            'Ausência no endereço pode gerar nova tentativa ou devolução ao remetente.',
            'Endereço incorreto informado pelo cliente pode gerar custo adicional de reenvio.',
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Retirada e exceções">
        <PolicyParagraph>
          Atualmente não oferecemos retirada em loja física. Regiões com
          restrição logística temporária serão comunicadas no carrinho antes do
          pagamento. Suporte: {company.email} | {company.phone}.
        </PolicyParagraph>
      </PolicySection>
    </InstitutionalLayout>
  );
}

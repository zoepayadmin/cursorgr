import { company, getFullAddress } from '@config/company';
import {
  InstitutionalLayout,
  PolicyList,
  PolicyParagraph,
  PolicySection,
} from '../../components/institutional/InstitutionalLayout';

export function TermsOfUsePage() {
  const address = getFullAddress();

  return (
    <InstitutionalLayout
      title="Termos de Uso e Condições"
      subtitle={`Contrato de utilização do site ${company.name}`}
    >
      <PolicySection title="1. Aceitação dos termos">
        <PolicyParagraph>
          Ao acessar {company.website}, você declara ter lido, compreendido e
          concordado com estes Termos de Uso. O site é operado pela{' '}
          {company.legalName}, CNPJ {company.cnpj}, com endereço em {address}.
          Caso não concorde com qualquer disposição, interrompa o uso
          imediatamente.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="2. Cadastro e conta">
        <PolicyParagraph>
          Para finalizar compras, o usuário deve fornecer informações verdadeiras
          e atualizadas. A {company.name} reserva-se o direito de suspender
          contas com dados falsos, suspeita de fraude ou violação destes Termos.
          Dúvidas sobre cadastro: {company.email} ou {company.phone}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="3. Produtos e preços">
        <PolicyList
          items={[
            'Imagens e descrições têm caráter ilustrativo; eventuais variações de embalagem serão comunicadas.',
            'Preços exibidos podem incluir descontos para pagamento via PIX, conforme indicado em cada produto.',
            'Promoções possuem validade limitada e estoque sujeito à disponibilidade.',
            'Erros tipográficos de preço podem ser corrigidos antes da confirmação do pedido, com comunicação ao cliente.',
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Pedidos e pagamento">
        <PolicyParagraph>
          O pedido é confirmado após aprovação do pagamento pela operadora
          financeira. A {company.legalName} poderá cancelar pedidos em caso de
          indisponibilidade de estoque, inconsistência cadastral ou suspeita de
          uso indevido de cupons. Notificações serão enviadas para o e-mail
          cadastrado.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="5. Propriedade intelectual">
        <PolicyParagraph>
          Marcas, logotipos, textos, layout e fotografias exibidos no site são
          de propriedade da {company.name} ou de licenciadores. É proibida a
          reprodução sem autorização prévia por escrito da {company.legalName}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="6. Limitação de responsabilidade">
        <PolicyParagraph>
          A {company.name} não se responsabiliza por danos decorrentes de uso
          inadequado dos suplementos, interrupções temporárias do site por
          manutenção ou força maior, nem por links externos às redes sociais
          ({company.social.instagram}, {company.social.facebook}, entre outras)
          de terceiros.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="7. Legislação aplicável">
        <PolicyParagraph>
          Estes Termos são regidos pelas leis da República Federativa do
          Brasil. O foro da comarca de {company.address.city}/{company.address.state}{' '}
          é eleito para dirimir controvérsias, com renúncia a qualquer outro,
          por mais privilegiado que seja.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="8. Contato">
        <PolicyParagraph>
          {company.legalName} — CNPJ {company.cnpj}
          <br />
          {address}
          <br />
          E-mail: {company.email} | Telefone: {company.phone}
        </PolicyParagraph>
      </PolicySection>
    </InstitutionalLayout>
  );
}

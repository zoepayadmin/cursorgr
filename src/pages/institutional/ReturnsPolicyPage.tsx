import { company, getFullAddress } from '@config/company';
import {
  InstitutionalLayout,
  PolicyList,
  PolicyParagraph,
  PolicySection,
} from '../../components/institutional/InstitutionalLayout';

export function ReturnsPolicyPage() {
  const address = getFullAddress();

  return (
    <InstitutionalLayout
      title="Política de Trocas e Devoluções"
      subtitle="Garantia de satisfação conforme o Código de Defesa do Consumidor"
    >
      <PolicySection title="1. Direito de arrependimento">
        <PolicyParagraph>
          Compras realizadas em {company.website} podem ser desistidas em até 7
          (sete) dias corridos após o recebimento, conforme o art. 49 do CDC,
          desde que o produto esteja lacrado, sem sinais de uso e na embalagem
          original. A {company.legalName} (CNPJ {company.cnpj}) orientará o
          procedimento pelo e-mail {company.email} ou WhatsApp vinculado ao
          telefone {company.phone}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="2. Troca por defeito ou avaria">
        <PolicyParagraph>
          Se o suplemento apresentar defeito de fabricação, vício ou avaria no
          transporte, a {company.name} realizará a troca sem custo adicional.
          Solicite o atendimento em até 30 dias com fotos do produto e da
          embalagem. Envie a documentação para {company.email} informando número
          do pedido e CPF do titular.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="3. Condições para aceite">
        <PolicyList
          items={[
            'Produto com lacre original intacto (exceto em caso de defeito comprovado).',
            'Nota fiscal e número do pedido informados no chamado.',
            'Embalagem externa sem danos causados pelo cliente.',
            'Suplementos com validade vigente no momento da devolução.',
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Procedimento">
        <PolicyList
          items={[
            `Entre em contato com o SAC da ${company.name}: ${company.email} ou ${company.phone}.`,
            'Aguarde a autorização de postagem reversa ou coleta (conforme região).',
            'Embale o produto de forma segura e inclua cópia da nota fiscal.',
            'Após análise em até 5 dias úteis no nosso centro de distribuição em ' +
              company.address.city +
              ', procederemos com reembolso ou envio do novo item.',
          ]}
        />
      </PolicySection>

      <PolicySection title="5. Reembolso">
        <PolicyParagraph>
          O valor será estornado pelo mesmo meio de pagamento utilizado na
          compra, em até 10 dias úteis após confirmação do recebimento do
          produto em nosso estoque ({address}). Compras via PIX recebem
          estorno na conta de origem.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="6. Exceções">
        <PolicyParagraph>
          Não aceitamos devolução de produtos abertos por arrependimento quando
          o lacre de segurança foi violado, salvo defeito. Kits promocionais
          devem ser devolvidos integralmente. Dúvidas adicionais: {company.email}.
        </PolicyParagraph>
      </PolicySection>
    </InstitutionalLayout>
  );
}

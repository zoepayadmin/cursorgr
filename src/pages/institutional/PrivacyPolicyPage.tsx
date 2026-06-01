import { company, getFullAddress } from '@config/company';
import {
  InstitutionalLayout,
  PolicyList,
  PolicyParagraph,
  PolicySection,
} from '../../components/institutional/InstitutionalLayout';

export function PrivacyPolicyPage() {
  const address = getFullAddress();

  return (
    <InstitutionalLayout
      title="Política de Privacidade e Proteção de Dados"
      subtitle={`Última atualização: junho de 2026 — ${company.name}`}
    >
      <PolicySection title="1. Introdução">
        <PolicyParagraph>
          A {company.legalName}, inscrita no CNPJ sob o nº {company.cnpj},
          com sede em {address}, operadora do e-commerce {company.name}{' '}
          ({company.website}), está comprometida com a proteção dos dados
          pessoais de seus clientes, visitantes e parceiros, em conformidade
          com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e
          demais normas aplicáveis.
        </PolicyParagraph>
        <PolicyParagraph>
          Esta Política descreve como coletamos, utilizamos, armazenamos e
          compartilhamos suas informações quando você navega em nosso site,
          realiza compras ou entra em contato conosco pelos canais oficiais.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="2. Controlador dos dados">
        <PolicyParagraph>
          O controlador dos dados pessoais tratados neste ambiente digital é a{' '}
          {company.legalName} (CNPJ {company.cnpj}). Para exercer seus direitos
          ou esclarecer dúvidas sobre privacidade, entre em contato pelo e-mail{' '}
          <a
            href={`mailto:${company.privacyEmail}`}
            className="text-accent-orange hover:underline"
          >
            {company.privacyEmail}
          </a>{' '}
          ou pelo telefone {company.phone}, no horário {company.businessHours}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="3. Dados que coletamos">
        <PolicyList
          items={[
            'Dados de identificação: nome completo, CPF, data de nascimento (quando necessário para emissão fiscal).',
            'Dados de contato: e-mail, telefone, endereço de entrega e cobrança.',
            'Dados de navegação: endereço IP, cookies, páginas visitadas e preferências de produtos.',
            'Dados de pagamento: processados por gateways certificados; a ' +
              company.name +
              ' não armazena dados completos de cartão em seus servidores.',
            'Histórico de pedidos, trocas, devoluções e comunicações com o atendimento.',
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Finalidades do tratamento">
        <PolicyParagraph>
          Utilizamos seus dados para processar pedidos, emitir notas fiscais,
          realizar entregas, prestar suporte via {company.email} e{' '}
          {company.phone}, personalizar recomendações de suplementos, cumprir
          obrigações legais e, mediante consentimento, enviar ofertas e
          novidades pelos canais digitais da {company.name}, incluindo nossas
          redes sociais oficiais.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="5. Compartilhamento">
        <PolicyParagraph>
          Podemos compartilhar dados com transportadoras, operadores de
          pagamento, plataformas de e-mail marketing e autoridades públicas
          quando exigido por lei. Todos os parceiros são contratualmente
          obrigados a manter o mesmo nível de segurança e confidencialidade
          adotado pela {company.legalName}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="6. Seus direitos (LGPD)">
        <PolicyList
          items={[
            'Confirmar a existência de tratamento e acessar seus dados.',
            'Corrigir dados incompletos, inexatos ou desatualizados.',
            'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.',
            'Solicitar portabilidade a outro fornecedor de serviço.',
            'Revogar consentimento e obter informações sobre compartilhamentos.',
          ]}
        />
        <PolicyParagraph>
          Envie sua solicitação para {company.privacyEmail} informando nome
          completo e CPF. Responderemos em até 15 dias úteis.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="7. Retenção e segurança">
        <PolicyParagraph>
          Mantemos os dados pelo tempo necessário para cumprir as finalidades
          descritas e obrigações fiscais. Empregamos criptografia SSL, controle
          de acesso e monitoramento contínuo para proteger as informações
          armazenadas nos sistemas da {company.name}.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="8. Alterações">
        <PolicyParagraph>
          Esta política pode ser atualizada periodicamente. A versão vigente
          estará sempre disponível em {company.website}. Em caso de alterações
          relevantes, notificaremos clientes cadastrados pelo e-mail informado
          no cadastro.
        </PolicyParagraph>
      </PolicySection>
    </InstitutionalLayout>
  );
}

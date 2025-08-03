import React from "react";
import { ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Content,
  Title,
  Section,
  SectionTitle,
  Text,
  BulletPoint,
  BulletText,
  LastUpdateInfo,
  CompanyInfo,
  CompanyText,
  DownloadButton,
  DownloadButtonText,
  ButtonIcon,
} from "./styles";

const TermsContent = ({
  showFullContent = false,
  showDownloadButton = false,
}) => {
  const handleDownloadPDF = () => {
    Linking.openURL("https://indika-landing.vercel.app/termos-e-politica.pdf");
  };

  return (
    <Container>
      <Content>
        <Title>Termos e Condições Gerais de Uso</Title>
        <LastUpdateInfo>
          Última atualização: 01 de Agosto de 2025
        </LastUpdateInfo>

        {/* Informações da Empresa */}
        <CompanyInfo>
          <CompanyText>
            <Text style={{ fontWeight: "bold" }}>Razão Social:</Text> Indika
            Soluções Digitais Ltda
          </CompanyText>
          <CompanyText>
            <Text style={{ fontWeight: "bold" }}>Nome Fantasia:</Text> Indika
          </CompanyText>
          <CompanyText>
            <Text style={{ fontWeight: "bold" }}>CNPJ:</Text> 60.737.073/0001-92
          </CompanyText>
          <CompanyText>
            <Text style={{ fontWeight: "bold" }}>Sede:</Text> Rua Valdemar
            Martins, nº 2, Quadra 1 Lote 10
          </CompanyText>
          <CompanyText>Bairro Morada do Sol, CEP 64055-280</CompanyText>
          <CompanyText>Teresina – PI</CompanyText>
        </CompanyInfo>

        {/* ✅ RESUMO para o TermsStep */}
        {!showFullContent && (
          <Section>
            <SectionTitle>Resumo dos Termos</SectionTitle>
            <Text>Ao criar sua conta no Indika, você concorda com:</Text>
            <BulletPoint>
              <Ionicons name="chevron-forward" size={16} color="#666" />
              <BulletText>
                Coleta e uso de dados pessoais (telefone, e-mail, localização)
              </BulletText>
            </BulletPoint>
            <BulletPoint>
              <Ionicons name="chevron-forward" size={16} color="#666" />
              <BulletText>
                Compartilhamento com prestadores de serviço e operadores de
                pagamento
              </BulletText>
            </BulletPoint>
            <BulletPoint>
              <Ionicons name="chevron-forward" size={16} color="#666" />
              <BulletText>
                Direitos de acesso, correção e exclusão de dados conforme LGPD
              </BulletText>
            </BulletPoint>
            <BulletPoint>
              <Ionicons name="chevron-forward" size={16} color="#666" />
              <BulletText>
                Uso responsável da plataforma e respeito às regras da comunidade
              </BulletText>
            </BulletPoint>
          </Section>
        )}

        {/* ✅ CONTEÚDO COMPLETO quando necessário */}
        {showFullContent && (
          <>
            <Section>
              <SectionTitle>1. DO OBJETO</SectionTitle>
              <Text>
                O presente Termo regula o uso da plataforma Indika, que se
                caracteriza como uma aplicação de intermediação de serviços e
                negócios locais entre prestadores e clientes, disponível para
                dispositivos móveis.
              </Text>
              <Text>
                A plataforma licenciará o uso do software, website e demais
                ativos, permitindo a localização de prestadores de serviço
                conforme a localização do usuário, a realização de agendamentos
                e a interação via chat, bem como o pagamento opcional por meio
                do próprio aplicativo.
              </Text>
            </Section>

            <Section>
              <SectionTitle>2. DA ACEITAÇÃO</SectionTitle>
              <Text>
                Ao acessar o aplicativo, o usuário declara que leu e concorda
                com os presentes termos, de forma livre e espontânea, sendo o
                aceite condição indispensável para o uso da plataforma.
              </Text>
              <Text>
                O uso da plataforma implica o consentimento livre, informado e
                inequívoco do titular quanto à coleta e ao tratamento de dados
                descritos neste documento. O app também pode coletar
                automaticamente informações técnicas do dispositivo, como
                sistema operacional, tipo de navegador e identificadores únicos,
                para fins de segurança, diagnóstico e desempenho da aplicação.
              </Text>
            </Section>

            <Section>
              <SectionTitle>3. DO CADASTRO</SectionTitle>
              <Text>
                Para utilizar a plataforma, é necessário realizar cadastro com
                número de telefone, validado via SMS. Clientes podem fornecer
                e-mail e CPF opcionalmente. Prestadores de serviço devem
                fornecer e-mail obrigatoriamente, enquanto o CPF continua
                opcional.
              </Text>
              <Text>
                O usuário é responsável pela veracidade dos dados fornecidos,
                bem como pela guarda de seu login e senha, não sendo permitida a
                cessão ou compartilhamento.
              </Text>
            </Section>

            <Section>
              <SectionTitle>4. DOS SERVIÇOS E PAGAMENTOS</SectionTitle>
              <Text>O aplicativo permite:</Text>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Cadastro gratuito de clientes</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Cadastro de prestadores de serviço mediante pagamento mensal
                  via Mercado Pago
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Contratação de serviços diretamente entre usuários, com opção
                  de pagamento via app
                </BulletText>
              </BulletPoint>
              <Text>
                A Indika não se responsabiliza por transações realizadas fora da
                plataforma.
              </Text>
            </Section>

            <Section>
              <SectionTitle>5. DO CANCELAMENTO E ARREPENDIMENTO</SectionTitle>
              <Text>
                Prestadores de serviço poderão cancelar sua assinatura a
                qualquer momento, sendo o acesso garantido até o fim do período
                contratado. O cancelamento em até 7 (sete) dias contados da
                contratação garante reembolso integral, nos termos do CDC.
              </Text>
            </Section>

            <Section>
              <SectionTitle>
                6. DA PROTEÇÃO DE DADOS PESSOAIS (LGPD)
              </SectionTitle>
              <Text>
                Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
                13.709/2018), os dados coletados são:
              </Text>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Telefone, e-mail e CPF (opcional)</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Localização e interações na plataforma</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Dados de pagamento quando usados no app</BulletText>
              </BulletPoint>

              <Text style={{ marginTop: 16, fontWeight: "600" }}>
                As finalidades são:
              </Text>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Cadastro de conta e autenticação (execução contratual)
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Recomendação geolocalizada de prestadores (legítimo interesse)
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Processamento de pagamentos (execução contratual)
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Comunicação entre usuários (execução contratual)
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Segurança e melhoria de experiência (legítimo interesse)
                </BulletText>
              </BulletPoint>

              <Text style={{ marginTop: 16, fontWeight: "600" }}>
                Os dados são compartilhados com:
              </Text>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Operadores de pagamento (Mercado Pago)</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Prestadores e clientes envolvidos na contratação
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Autoridades judiciais, quando legalmente exigido
                </BulletText>
              </BulletPoint>

              <Text style={{ marginTop: 16 }}>
                Os dados pessoais poderão ser conservados após o encerramento do
                vínculo com o usuário para cumprimento de obrigações legais ou
                regulatórias, exercício regular de direitos em processo
                judicial, administrativo ou arbitral, nos termos do art. 16 da
                LGPD.
              </Text>
            </Section>

            <Section>
              <SectionTitle>7. DOS DIREITOS DO TITULAR</SectionTitle>
              <Text>
                Nos termos do art. 18 da LGPD, o titular pode, a qualquer
                momento:
              </Text>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Confirmar a existência de tratamento</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Acessar, corrigir, atualizar ou completar dados
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Solicitar anonimização, bloqueio ou exclusão
                </BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Requerer portabilidade</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>Revogar consentimentos</BulletText>
              </BulletPoint>
              <BulletPoint>
                <Ionicons name="chevron-forward" size={16} color="#666" />
                <BulletText>
                  Opor-se a tratamento realizado com base no legítimo interesse
                </BulletText>
              </BulletPoint>
            </Section>

            <Section>
              <SectionTitle>8. DAS INTERAÇÕES ENTRE USUÁRIOS</SectionTitle>
              <Text>
                O aplicativo oferece chat privado e sistema de avaliações. Os
                comentários são públicos, e a moderação se reserva o direito de
                remover conteúdo ofensivo, discriminatório ou falso.
              </Text>
            </Section>

            <Section>
              <SectionTitle>
                9. DOS COOKIES E TECNOLOGIAS DE NAVEGAÇÃO
              </SectionTitle>
              <Text>
                A plataforma pode usar cookies para melhorar a experiência de
                navegação, registrar preferências e otimizar serviços.
              </Text>
            </Section>

            <Section>
              <SectionTitle>10. ALTERAÇÕES NOS TERMOS E POLÍTICA</SectionTitle>
              <Text>
                Estes termos podem ser atualizados periodicamente. Alterações
                relevantes serão informadas no aplicativo. O uso continuado
                implica aceitação das novas condições.
              </Text>
            </Section>

            <Section>
              <SectionTitle>11. CONTATO DO ENCARREGADO (DPO)</SectionTitle>
              <Text>
                Dúvidas ou solicitações sobre privacidade devem ser enviadas
                para:
                <Text style={{ color: "#422680", fontWeight: "600" }}>
                  appindika.tech@gmail.com
                </Text>
              </Text>
            </Section>

            <Section>
              <SectionTitle>12. DO FORO</SectionTitle>
              <Text>
                Para dirimir controvérsias oriundas deste instrumento, fica
                eleito o foro da Comarca de Teresina, Estado do Piauí.
              </Text>
            </Section>

            <Section>
              <SectionTitle>13. LIMITAÇÃO DE RESPONSABILIDADE</SectionTitle>
              <Text>
                A Indika atua exclusivamente como plataforma de intermediação
                entre usuários, não sendo parte na relação de consumo firmada
                entre cliente e prestador. A empresa não se responsabiliza pela
                qualidade, execução, prazos ou consequências dos serviços
                contratados fora da plataforma, nem por danos causados por
                condutas dos usuários.
              </Text>
              <Text>
                A Indika envidará esforços razoáveis para manter o serviço
                disponível, mas não se responsabiliza por falhas de conexão,
                interrupções temporárias, ou quaisquer danos indiretos
                decorrentes do uso do aplicativo.
              </Text>
            </Section>
          </>
        )}

        {/* ✅ BOTÃO DE DOWNLOAD quando solicitado */}
        {showDownloadButton && (
          <DownloadButton onPress={handleDownloadPDF}>
            <ButtonIcon>
              <Ionicons name="download-outline" size={24} color="#fff" />
            </ButtonIcon>
            <DownloadButtonText>
              Baixar Termos de Uso Completos (PDF)
            </DownloadButtonText>
          </DownloadButton>
        )}
      </Content>
    </Container>
  );
};

export default TermsContent;

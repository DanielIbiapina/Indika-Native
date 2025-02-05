import React from "react";
import { Linking } from "react-native";
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
  DownloadButton,
  DownloadButtonText,
  ButtonIcon,
  Emphasis,
} from "./styles";

const PoliticaPrivacidade = () => {
  const handleDownloadPDF = () => {
    // URL do PDF da política de privacidade
    Linking.openURL("https://indika.com.br/politica-privacidade.pdf");
  };

  return (
    <Container>
      <Content>
        <Title>Política de Privacidade</Title>
        <LastUpdateInfo>
          Última atualização: 01 de Janeiro de 2024
        </LastUpdateInfo>

        <Section>
          <SectionTitle>1. Coleta de Dados</SectionTitle>
          <Text>
            Coletamos informações que você nos fornece diretamente ao usar o
            Indika:
          </Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Dados de cadastro (nome, e-mail, telefone)</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Informações de localização</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Histórico de serviços</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>2. Uso das Informações</SectionTitle>
          <Text>Utilizamos suas informações para:</Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Fornecer e melhorar nossos serviços</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Personalizar sua experiência</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Comunicar atualizações e ofertas</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>3. Compartilhamento</SectionTitle>
          <Text>Suas informações podem ser compartilhadas com:</Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>
              Prestadores de serviços (apenas informações necessárias)
            </BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Parceiros de processamento de pagamento</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>4. Seus Direitos</SectionTitle>
          <Text>Você tem direito a:</Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Acessar seus dados pessoais</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Solicitar correções</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Solicitar exclusão de dados</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>5. Segurança</SectionTitle>
          <Text>
            Implementamos medidas de segurança para proteger suas informações
            contra acesso não autorizado, alteração, divulgação ou destruição.
          </Text>
        </Section>

        <Section>
          <SectionTitle>6. Contato</SectionTitle>
          <Text>Para questões sobre privacidade, entre em contato:</Text>
          <Emphasis>privacidade@indika.com.br</Emphasis>
        </Section>

        <DownloadButton onPress={handleDownloadPDF}>
          <ButtonIcon>
            <Ionicons name="download-outline" size={24} color="#fff" />
          </ButtonIcon>
          <DownloadButtonText>
            Baixar Política de Privacidade Completa (PDF)
          </DownloadButtonText>
        </DownloadButton>
      </Content>
    </Container>
  );
};

export default PoliticaPrivacidade;

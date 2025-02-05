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
} from "./styles";

const TermosDeUso = () => {
  const handleDownloadPDF = () => {
    // URL do PDF dos termos de uso
    Linking.openURL("https://indika.com.br/termos-de-uso.pdf");
  };

  return (
    <Container>
      <Content>
        <Title>Termos de Uso</Title>
        <LastUpdateInfo>
          Última atualização: 01 de Janeiro de 2024
        </LastUpdateInfo>

        <Section>
          <SectionTitle>1. Aceitação dos Termos</SectionTitle>
          <Text>
            Ao acessar e usar o aplicativo Indika, você concorda em cumprir
            estes Termos de Uso e todas as leis e regulamentos aplicáveis.
          </Text>
        </Section>

        <Section>
          <SectionTitle>2. Uso do Serviço</SectionTitle>
          <Text>
            O Indika oferece uma plataforma para conectar prestadores de
            serviços e clientes. Ao usar nossos serviços, você concorda em:
          </Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Fornecer informações precisas e atualizadas</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Manter a confidencialidade de sua conta</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Usar o serviço de forma responsável</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>3. Responsabilidades</SectionTitle>
          <Text>
            O Indika atua como intermediário entre prestadores de serviços e
            clientes. Não nos responsabilizamos por:
          </Text>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Qualidade dos serviços prestados</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Disputas entre usuários</BulletText>
          </BulletPoint>
          <BulletPoint>
            <Ionicons name="chevron-forward" size={16} color="#666" />
            <BulletText>Danos indiretos</BulletText>
          </BulletPoint>
        </Section>

        <Section>
          <SectionTitle>4. Pagamentos</SectionTitle>
          <Text>
            Todas as transações são processadas de forma segura através de
            nossos parceiros de pagamento. Taxas de serviço podem ser aplicadas
            conforme descrito em nossa política de preços.
          </Text>
        </Section>

        <Section>
          <SectionTitle>5. Cancelamento</SectionTitle>
          <Text>
            Usuários podem cancelar sua conta a qualquer momento. O cancelamento
            de serviços está sujeito à nossa política de cancelamento.
          </Text>
        </Section>

        <DownloadButton onPress={handleDownloadPDF}>
          <ButtonIcon>
            <Ionicons name="download-outline" size={24} color="#fff" />
          </ButtonIcon>
          <DownloadButtonText>
            Baixar Termos de Uso Completos (PDF)
          </DownloadButtonText>
        </DownloadButton>
      </Content>
    </Container>
  );
};

export default TermosDeUso;

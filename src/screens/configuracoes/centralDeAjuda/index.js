import React, { useState } from "react";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Section,
  SectionTitle,
  HelpItem,
  ItemTitle,
  ItemDescription,
  Chevron,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  ContactButton,
  ContactButtonText,
  ContactContainer,
  ContactTitle,
  ContactInfo,
  Divider,
  VersionInfo,
  VersionText,
} from "./styles";

const FAQ_DATA = [
  {
    id: "1",
    question: "Como alterar minha senha?",
    answer:
      "Para alterar sua senha, vá em Configurações > Segurança > Alterar Senha. Você precisará informar sua senha atual e a nova senha desejada.",
  },
  {
    id: "2",
    question: "Como entrar em contato com o suporte?",
    answer:
      "Você pode entrar em contato conosco através do e-mail suporte@indika.com.br ou pelo WhatsApp disponível nesta tela.",
  },
  {
    id: "3",
    question: "Como cancelar um serviço?",
    answer:
      'Para cancelar um serviço, acesse o pedido específico e clique no botão "Cancelar Serviço". Lembre-se que existem prazos e políticas específicas para cancelamento.',
  },
  // Adicione mais FAQs conforme necessário
];

const CentralAjuda = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const filteredFAQs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactWhatsApp = () => {
    Linking.openURL("https://wa.me/5511999999999"); // Substitua pelo número correto
  };

  const handleContactEmail = () => {
    Linking.openURL("mailto:suporte@indika.com.br");
  };

  const handleOpenChat = () => {
    // Implementar abertura do chat in-app
  };

  return (
    <Container>
      <SearchContainer>
        <SearchIcon>
          <Ionicons name="search-outline" size={20} color="#666" />
        </SearchIcon>
        <SearchInput
          placeholder="Buscar ajuda..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </SearchContainer>

      <Section>
        <SectionTitle>Precisa de ajuda?</SectionTitle>

        <HelpItem onPress={handleOpenChat}>
          <Ionicons name="chatbubbles-outline" size={24} color="#666" />
          <ItemTitle>Chat com Suporte</ItemTitle>
          <Chevron>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Chevron>
        </HelpItem>

        <HelpItem onPress={handleContactWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="#666" />
          <ItemTitle>WhatsApp</ItemTitle>
          <Chevron>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Chevron>
        </HelpItem>

        <HelpItem onPress={handleContactEmail}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <ItemTitle>E-mail</ItemTitle>
          <Chevron>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Chevron>
        </HelpItem>
      </Section>

      <Section>
        <SectionTitle>Perguntas Frequentes</SectionTitle>
        {filteredFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            onPress={() =>
              setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
            }
          >
            <FAQQuestion>
              <ItemTitle>{faq.question}</ItemTitle>
              <Ionicons
                name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"}
                size={24}
                color="#666"
              />
            </FAQQuestion>
            {expandedFAQ === faq.id && <FAQAnswer>{faq.answer}</FAQAnswer>}
          </FAQItem>
        ))}
      </Section>

      <ContactContainer>
        <ContactTitle>Horário de Atendimento</ContactTitle>
        <ContactInfo>Segunda a Sexta: 9h às 18h</ContactInfo>
        <ContactInfo>Sábado: 9h às 13h</ContactInfo>
        <Divider />
        <ContactButton onPress={handleContactWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="#fff" />
          <ContactButtonText>Falar com Suporte</ContactButtonText>
        </ContactButton>
      </ContactContainer>

      <VersionInfo>
        <VersionText>Versão do App: 1.0.0</VersionText>
        <VersionText>© 2024 Indika. Todos os direitos reservados.</VersionText>
      </VersionInfo>
    </Container>
  );
};

export default CentralAjuda;

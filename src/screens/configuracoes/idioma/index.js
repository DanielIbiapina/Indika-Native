import React, { useState } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  LanguageItem,
  LanguageText,
  LanguageDescription,
  TextContainer,
  CheckIcon,
  InfoMessage,
  InfoContainer,
} from "./styles";

const Idioma = () => {
  const [selectedLanguage] = useState("pt-BR");

  const handleLanguageSelect = (language) => {
    if (language !== "pt-BR") {
      Alert.alert(
        "Em breve",
        "No momento, apenas Português (Brasil) está disponível. Mais idiomas serão adicionados em breve!"
      );
      return;
    }
  };

  return (
    <Container>
      <LanguageItem
        onPress={() => handleLanguageSelect("pt-BR")}
        active={selectedLanguage === "pt-BR"}
      >
        <Ionicons name="flag-outline" size={24} color="#666" />
        <TextContainer>
          <LanguageText>Português (Brasil)</LanguageText>
          <LanguageDescription>Idioma atual</LanguageDescription>
        </TextContainer>
        <CheckIcon>
          <Ionicons name="checkmark" size={24} color="#422680" />
        </CheckIcon>
      </LanguageItem>

      <LanguageItem onPress={() => handleLanguageSelect("en")} disabled>
        <Ionicons name="flag-outline" size={24} color="#999" />
        <TextContainer>
          <LanguageText disabled>English</LanguageText>
          <LanguageDescription>Em breve</LanguageDescription>
        </TextContainer>
      </LanguageItem>

      <LanguageItem onPress={() => handleLanguageSelect("es")} disabled>
        <Ionicons name="flag-outline" size={24} color="#999" />
        <TextContainer>
          <LanguageText disabled>Español</LanguageText>
          <LanguageDescription>Em breve</LanguageDescription>
        </TextContainer>
      </LanguageItem>

      <InfoContainer>
        <InfoMessage>
          Mais idiomas serão adicionados em atualizações futuras.
        </InfoMessage>
      </InfoContainer>
    </Container>
  );
};

export default Idioma;

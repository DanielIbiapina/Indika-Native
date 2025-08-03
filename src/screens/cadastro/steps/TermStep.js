import React, { useState } from "react";
import { Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StepContainer from "../components/StepContainer";
import TermsContent from "../../../components/termsContent";
import {
  TermsContainer,
  CheckboxContainer,
  CheckboxButton,
  CheckboxText,
  LinkText,
  Button,
  ButtonText,
  ViewFullTermsButton,
  ViewFullTermsText,
} from "../styles";

const TermsStep = ({ title, onNext, onBack, loading }) => {
  const navigation = useNavigation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  const handleContinue = () => {
    if (!acceptedTerms) {
      Alert.alert(
        "Aceitação Obrigatória",
        "Para continuar, você deve aceitar os Termos de Uso e Política de Privacidade."
      );
      return;
    }

    onNext({
      acceptedTerms: true,
      acceptedAt: new Date().toISOString(),
    });
  };

  const openTerms = () => {
    Linking.openURL("https://indika-landing.vercel.app/termos-e-politica.pdf");
  };

  if (showFullTerms) {
    return (
      <StepContainer
        title="Termos Completos"
        onBack={() => setShowFullTerms(false)}
      >
        <TermsContent showFullContent={true} showDownloadButton={true} />
        <Button onPress={() => setShowFullTerms(false)}>
          <ButtonText>Voltar ao Resumo</ButtonText>
        </Button>
      </StepContainer>
    );
  }

  return (
    <StepContainer title={title} onBack={onBack}>
      {/* Botão para abrir os termos completos */}
      <ViewFullTermsButton onPress={() => navigation.navigate("TermosUso")}>
        <ViewFullTermsText>📄 Ver Termos Completos</ViewFullTermsText>
      </ViewFullTermsButton>

      {/* Checkbox de aceitação */}
      <TermsContainer>
        <CheckboxContainer>
          <CheckboxButton
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            style={{
              backgroundColor: acceptedTerms ? "#422680" : "transparent",
            }}
          >
            {acceptedTerms && (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
          </CheckboxButton>
          <CheckboxText>
            Eu aceito os{" "}
            <LinkText onPress={openTerms}>
              Termos de Uso e Política de Privacidade
            </LinkText>
          </CheckboxText>
        </CheckboxContainer>
      </TermsContainer>

      {/* Botão de continuar */}
      <Button
        onPress={handleContinue}
        disabled={loading || !acceptedTerms}
        style={{ opacity: acceptedTerms ? 1 : 0.6 }}
      >
        <ButtonText>Criar Conta</ButtonText>
      </Button>
    </StepContainer>
  );
};

export default TermsStep;

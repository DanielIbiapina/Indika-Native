import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StepContainer from "../components/StepContainer";
import {
  Form,
  InputWrapper,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  ErrorText,
  SkipButton,
  SkipButtonText,
} from "../styles";

const EmailStep = ({ onNext, onSkip, onBack, title, loading }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setError("");
    onNext({ email: trimmedEmail.toLowerCase() });
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <StepContainer
      title={title}
      subtitle="Usaremos seu e-mail para recuperação de conta e novidades importantes."
      onBack={onBack}
    >
      <Form>
        <InputWrapper>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <Input
            placeholder="seu@email.com (opcional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            autoFocus
            maxLength={100}
          />
        </InputWrapper>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button onPress={handleNext} disabled={loading}>
          <ButtonText>{loading ? "Carregando..." : "Continuar"}</ButtonText>
        </Button>

        {onSkip && (
          <SkipButton onPress={handleSkip} disabled={loading}>
            <SkipButtonText>Pular por enquanto</SkipButtonText>
          </SkipButton>
        )}
      </Form>
    </StepContainer>
  );
};

export default EmailStep;

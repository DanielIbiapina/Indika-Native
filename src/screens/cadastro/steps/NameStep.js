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
} from "../styles";

const NameStep = ({ onNext, onBack, title, loading }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setError("Por favor, insira seu nome completo.");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Nome muito longo. Use no máximo 50 caracteres.");
      return;
    }

    setError("");
    onNext({ name: trimmedName });
  };

  return (
    <StepContainer
      title={title}
      subtitle="Como podemos te chamar?"
      onBack={onBack}
    >
      <Form>
        <InputWrapper>
          <Ionicons name="person-outline" size={20} color="#666" />
          <Input
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
            autoFocus
            maxLength={50}
          />
        </InputWrapper>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button
          onPress={handleNext}
          disabled={loading || name.trim().length < 2}
        >
          <ButtonText>{loading ? "Carregando..." : "Continuar"}</ButtonText>
        </Button>
      </Form>
    </StepContainer>
  );
};

export default NameStep;

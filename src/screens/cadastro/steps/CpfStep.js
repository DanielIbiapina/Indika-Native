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

// Formatação de CPF
const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 11) cpf = cpf.slice(0, 11);
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

// Validação de CPF
const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  // Validação do segundo dígito
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const CpfStep = ({ onNext, onSkip, onBack, title, loading, isLastStep }) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  const handleCpfChange = (text) => {
    setCpf(formatCPF(text));
    if (error) setError(""); // Limpar erro ao digitar
  };

  const handleNext = () => {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf && !validateCPF(cleanCpf)) {
      setError("CPF inválido. Verifique os dígitos.");
      return;
    }

    setError("");
    onNext({ cpf: cleanCpf });
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <StepContainer
      title={title}
      subtitle="Isso ajudará a verificar sua identidade e dar mais segurança à sua conta."
      onBack={onBack}
    >
      <Form>
        <InputWrapper>
          <Ionicons name="card-outline" size={20} color="#666" />
          <Input
            placeholder="000.000.000-00 (opcional)"
            value={cpf}
            onChangeText={handleCpfChange}
            keyboardType="number-pad"
            maxLength={14}
            autoFocus
          />
        </InputWrapper>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button onPress={handleNext} disabled={loading}>
          <ButtonText>
            {loading
              ? "Finalizando..."
              : isLastStep
              ? "Finalizar Cadastro"
              : "Continuar"}
          </ButtonText>
        </Button>

        {onSkip && (
          <SkipButton onPress={handleSkip} disabled={loading}>
            <SkipButtonText>Pular</SkipButtonText>
          </SkipButton>
        )}
      </Form>
    </StepContainer>
  );
};

export default CpfStep;

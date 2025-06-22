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

const PasswordStep = ({ onNext, onBack, title, loading }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return "Sua senha deve ter pelo menos 6 caracteres.";
    if (pwd.length > 50)
      return "Senha muito longa. Use no máximo 50 caracteres.";
    return null;
  };

  const handleNext = () => {
    const validationError = validatePassword(password);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onNext({ password });
  };

  return (
    <StepContainer
      title={title}
      subtitle="Escolha uma senha segura para proteger sua conta."
      onBack={onBack}
    >
      <Form>
        <InputWrapper>
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
          <Input
            placeholder="Mínimo de 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password-new"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            maxLength={50}
          />
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 8 }}
          />
        </InputWrapper>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button onPress={handleNext} disabled={loading || password.length < 6}>
          <ButtonText>{loading ? "Carregando..." : "Continuar"}</ButtonText>
        </Button>
      </Form>
    </StepContainer>
  );
};

export default PasswordStep;

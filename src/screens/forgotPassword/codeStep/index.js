import React, { useState } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { smsVerificationService } from "../../../services/smsVerification";
import { userService } from "../../../services/userService";
import {
  Container,
  Form,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  ErrorText,
  CodeInputContainer,
  CodeInput,
  Title,
  Subtitle,
  PasswordContainer,
  TogglePasswordButton,
} from "./styles";

const ForgotPasswordCode = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCodeChange = (text) => {
    const codeText = text.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(codeText);
  };

  const resetPassword = async () => {
    if (verificationCode.length !== 6) {
      setError("O código deve ter 6 dígitos");
      return;
    }

    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verificar código SMS
      const verificationResult = await smsVerificationService.verifyCode(
        verificationCode
      );

      if (!verificationResult.success) {
        setError(verificationResult.error);
        return;
      }

      // Reset da senha
      await userService.resetPassword({
        phoneNumber,
        verificationToken: verificationResult.verifiedPhoneToken,
        newPassword,
      });

      Alert.alert("Sucesso!", "Sua senha foi alterada com sucesso.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      setError("Erro ao alterar senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Nova senha</Title>
      <Subtitle>Digite o código e sua nova senha</Subtitle>

      <Form>
        <CodeInputContainer>
          <CodeInput
            value={verificationCode}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="000000"
          />
        </CodeInputContainer>

        <PasswordContainer>
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nova senha"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TogglePasswordButton onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TogglePasswordButton>
        </PasswordContainer>

        <PasswordContainer>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar nova senha"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </PasswordContainer>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button onPress={resetPassword} disabled={loading}>
          <ButtonText>{loading ? "Alterando..." : "Alterar senha"}</ButtonText>
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPasswordCode;

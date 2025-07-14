import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { smsVerificationService } from "../../../services/smsVerification";
import { userService } from "../../../services/userService";
import {
  Container,
  Form,
  InputWrapper,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  ErrorText,
  PhoneInputContainer,
  CountryCode,
  Title,
  Subtitle,
} from "./styles";

const formatPhoneNumber = (phone) => {
  let formattedPhone = phone.replace(/\D/g, "");
  if (formattedPhone.length > 11) formattedPhone = formattedPhone.slice(0, 11);

  if (formattedPhone.length >= 2) {
    formattedPhone = `(${formattedPhone.substring(
      0,
      2
    )}) ${formattedPhone.substring(2)}`;
  }
  if (formattedPhone.length >= 10) {
    formattedPhone = `${formattedPhone.substring(
      0,
      10
    )}-${formattedPhone.substring(10)}`;
  }
  return formattedPhone;
};

const ForgotPasswordPhone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (text) => {
    if (text.length <= 15) {
      setPhoneNumber(formatPhoneNumber(text));
    }
  };

  const sendResetCode = async () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Por favor, informe um número de telefone válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const formattedNumber = `+55${cleanNumber}`;

      // Verificar se o telefone existe no sistema
      const userExists = await userService.searchByPhone(cleanNumber);
      if (!userExists) {
        setError("Telefone não encontrado em nossa base de dados");
        return;
      }

      // Enviar código SMS (mesmo serviço do cadastro)
      const result = await smsVerificationService.sendVerificationCode(
        formattedNumber
      );

      if (result.success) {
        navigation.navigate("ForgotPasswordCode", {
          phoneNumber: formattedNumber,
          verificationId: result.verificationId,
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Não foi possível enviar o código. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Recuperar senha</Title>
      <Subtitle>
        Digite seu telefone para receber um código de verificação
      </Subtitle>

      <Form>
        <PhoneInputContainer>
          <CountryCode>+55</CountryCode>
          <InputWrapper style={{ flex: 1, margin: 0 }}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Input
              placeholder="(DDD) XXXXX-XXXX"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              autoFocus
              maxLength={15}
            />
          </InputWrapper>
        </PhoneInputContainer>

        {error ? (
          <ErrorMessage>
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button onPress={sendResetCode} disabled={loading}>
          <ButtonText>{loading ? "Enviando..." : "Enviar código"}</ButtonText>
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPasswordPhone;

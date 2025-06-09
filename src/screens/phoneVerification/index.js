import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  VerificationCard,
  Title,
  Subtitle,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  InputWrapper,
  BackButton,
  PhoneInputContainer,
  CountryCode,
} from "./styles";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const formatPhoneNumber = (phone) => {
    // Remove não dígitos
    let formattedPhone = phone.replace(/\D/g, "");

    // Formata para (XX) XXXXX-XXXX
    if (formattedPhone.length >= 2) {
      formattedPhone = `(${formattedPhone.substring(
        0,
        2
      )})${formattedPhone.substring(2)}`;
    }

    if (formattedPhone.length >= 9) {
      formattedPhone = `${formattedPhone.substring(
        0,
        9
      )}-${formattedPhone.substring(9)}`;
    }

    return formattedPhone;
  };

  const handlePhoneChange = (e) => {
    const text = e.nativeEvent.text;
    // Limita a 15 caracteres para acomodar o formato (XX) XXXXX-XXXX
    if (text.length <= 15) {
      setPhoneNumber(formatPhoneNumber(text));
    }
  };

  const sendVerificationCode = async () => {
    Keyboard.dismiss();

    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Por favor, informe um número de telefone válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Formatar para padrão internacional (Brasil +55)
      const formattedNumber = `+55${phoneNumber.replace(/\D/g, "")}`;

      // Em desenvolvimento, podemos simular o envio de código
      if (__DEV__) {
        // Simular envio para desenvolvimento
        setTimeout(() => {
          navigation.navigate("CodeVerification", {
            phoneNumber: formattedNumber,
            verificationId: "dev-verification-id",
          });
          setLoading(false);
        }, 1500);
      } else {
        // Código real para produção usando Firebase
        // const confirmation = await auth().signInWithPhoneNumber(formattedNumber);
        // navigation.navigate('CodeVerification', {
        //   phoneNumber: formattedNumber,
        //   verificationId: confirmation.verificationId,
        // });
        // setLoading(false);
      }
    } catch (err) {
      console.error("Erro ao enviar código:", err);
      setError("Não foi possível enviar o código. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </BackButton>

          <VerificationCard>
            <Title>Verificação de Telefone</Title>
            <Subtitle>
              Informe seu número de celular para receber um código de
              verificação por SMS
            </Subtitle>

            <PhoneInputContainer>
              <CountryCode>+55</CountryCode>
              <InputWrapper>
                <Ionicons name="call-outline" size={20} color="#666" />
                <Input
                  placeholder="(DDD) XXXXX-XXXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  keyboardType="phone-pad"
                  autoFocus
                />
              </InputWrapper>
            </PhoneInputContainer>

            {error ? (
              <ErrorMessage>
                <Text>{error}</Text>
              </ErrorMessage>
            ) : null}

            <Button onPress={sendVerificationCode} disabled={loading}>
              <ButtonText>
                {loading ? "Enviando..." : "Enviar código"}
              </ButtonText>
            </Button>
          </VerificationCard>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PhoneVerification;

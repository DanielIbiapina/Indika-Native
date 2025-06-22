import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StepContainer from "../components/StepContainer";
import { smsVerificationService } from "../../../services/smsVerification";
import {
  Form,
  InputWrapper,
  Input,
  Button,
  ButtonText,
  ErrorMessage,
  ErrorText,
  PhoneInputContainer,
  CountryCode,
} from "../styles";

// Formatação de telefone consistente
const formatPhoneNumber = (phone) => {
  let formattedPhone = phone.replace(/\D/g, "");

  if (formattedPhone.length > 11) {
    formattedPhone = formattedPhone.slice(0, 11);
  }

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

const PhoneStep = ({ onNext, onBack, title }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const text = e.nativeEvent ? e.nativeEvent.text : e;
    if (text.length <= 15) {
      setPhoneNumber(formatPhoneNumber(text));
    }
  };

  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Por favor, informe um número de telefone válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const formattedNumber = `+55${cleanNumber}`;

      console.log(`📱 Enviando para: ${formattedNumber}`);

      // Validar número antes de enviar
      if (cleanNumber.length !== 11) {
        setError("Número deve ter 11 dígitos (DDD + 9 dígitos)");
        return;
      }

      // ✅ UNIFICADO: Usar sempre o mesmo serviço
      const result = await smsVerificationService.sendVerificationCode(
        formattedNumber
      );

      if (result.success) {
        console.log("✅ SMS enviado com sucesso");
        if (result.isSimulated) {
          console.log("🎭 Usando simulação de produção");
        }
        onNext({
          phoneNumber: formattedNumber,
          verificationId: result.verificationId,
        });
      } else {
        console.log("❌ Erro ao enviar SMS:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("Erro ao enviar código:", err);
      setError("Não foi possível enviar o código. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer
      title={title}
      subtitle="Informe seu número de celular para receber um código de verificação por SMS"
      onBack={onBack}
    >
      <Form>
        <PhoneInputContainer>
          <CountryCode>+55</CountryCode>
          <InputWrapper style={{ flex: 1, margin: 0 }}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Input
              placeholder="(DDD) XXXXX-XXXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
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

        <Button onPress={sendVerificationCode} disabled={loading}>
          <ButtonText>{loading ? "Enviando..." : "Enviar código"}</ButtonText>
        </Button>
      </Form>
    </StepContainer>
  );
};

export default PhoneStep;

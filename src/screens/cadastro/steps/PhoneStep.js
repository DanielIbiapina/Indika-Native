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

// ✅ CORREÇÃO: Formatação que permite apagar normalmente
const formatPhoneNumber = (phone, previousPhone = "") => {
  // Remove todos os caracteres não numéricos
  let cleanPhone = phone.replace(/\D/g, "");

  // Limita a 11 dígitos
  if (cleanPhone.length > 11) {
    cleanPhone = cleanPhone.slice(0, 11);
  }

  // Se está apagando (telefone ficou menor), retorna apenas os números
  if (cleanPhone.length < previousPhone.replace(/\D/g, "").length) {
    return cleanPhone;
  }

  // Aplica formatação apenas se está digitando
  if (cleanPhone.length >= 2) {
    cleanPhone = `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2)}`;
  }

  if (cleanPhone.length >= 10) {
    cleanPhone = `${cleanPhone.substring(0, 10)}-${cleanPhone.substring(10)}`;
  }

  return cleanPhone;
};

const PhoneStep = ({ onNext, onBack, title }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [previousPhone, setPreviousPhone] = useState(""); // ✅ NOVO: Para comparar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const text = e.nativeEvent ? e.nativeEvent.text : e;

    // ✅ CORREÇÃO: Salva o telefone anterior para comparação
    setPreviousPhone(phoneNumber);

    if (text.length <= 15) {
      const formatted = formatPhoneNumber(text, phoneNumber);
      setPhoneNumber(formatted);
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

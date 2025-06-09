import React, { useState, useEffect } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  VerificationCard,
  Title,
  Subtitle,
  Button,
  ButtonText,
  ErrorMessage,
  CodeInputContainer,
  CodeInput,
  ResendText,
  BackButton,
  Timer,
} from "./styles";

const CodeVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, verificationId } = route.params;

  useEffect(() => {
    // Timer para permitir reenvio do código
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleCodeChange = (e) => {
    // Apenas números e limita a 6 dígitos
    const text = e.nativeEvent.text;
    const codeText = text.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(codeText);

    // Auto-submit quando o código tiver 6 dígitos
    if (codeText.length === 6) {
      verifyCode(codeText);
    }
  };

  const verifyCode = async (code = verificationCode) => {
    Keyboard.dismiss();

    if (code.length !== 6) {
      setError("O código deve ter 6 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Em desenvolvimento, simulamos a verificação
      if (__DEV__) {
        // Verifica se é um código de teste válido (ex: 123456)
        if (code === "123456") {
          setTimeout(() => {
            navigation.navigate("CompleteSignup", {
              phoneNumber,
              verifiedPhoneToken: "dev-token-123",
            });
            setLoading(false);
          }, 1500);
        } else {
          throw new Error("Código inválido");
        }
      } else {
        // Código real para produção usando Firebase
        // const credential = auth.PhoneAuthProvider.credential(
        //   verificationId,
        //   code
        // );
        //
        // // Verificar credencial
        // await auth().signInWithCredential(credential);
        //
        // // Navegar para completar o cadastro
        // navigation.navigate('CompleteSignup', {
        //   phoneNumber,
        //   verifiedPhoneToken: credential.token,
        // });
      }
    } catch (err) {
      console.error("Erro na verificação:", err);
      setError("Código inválido. Tente novamente.");
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!canResend) return;

    setLoading(true);
    setCanResend(false);
    setTimer(60);

    try {
      // Lógica similar à tela anterior
      if (__DEV__) {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // // Atualizar verificationId no state ou route params
        // route.params.verificationId = confirmation.verificationId;
        // setLoading(false);
      }
    } catch (err) {
      console.error("Erro ao reenviar:", err);
      setError("Não foi possível reenviar o código");
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
            <Title>Verificar Código</Title>
            <Subtitle>
              Digite o código de 6 dígitos enviado para {phoneNumber}
            </Subtitle>

            <CodeInputContainer>
              <CodeInput
                value={verificationCode}
                onChange={handleCodeChange}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </CodeInputContainer>

            {error ? (
              <ErrorMessage>
                <Text>{error}</Text>
              </ErrorMessage>
            ) : null}

            <Button onPress={() => verifyCode()} disabled={loading}>
              <ButtonText>
                {loading ? "Verificando..." : "Verificar Código"}
              </ButtonText>
            </Button>

            {!canResend ? (
              <Timer>Reenviar código em {timer}s</Timer>
            ) : (
              <ResendText onPress={resendCode}>
                Não recebeu o código? Reenviar
              </ResendText>
            )}
          </VerificationCard>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CodeVerification;

import React, { useState, useEffect } from "react";
import StepContainer from "../components/StepContainer";
import { smsVerificationService } from "../../../services/smsVerification";
import {
  Form,
  Button,
  ButtonText,
  ErrorMessage,
  ErrorText,
  CodeInputContainer,
  CodeInput,
  ResendText,
  TimerText,
} from "../styles";

const CodeStep = ({ formData, onNext, onBack, title }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Timer para reenvio
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
    const text = e.nativeEvent ? e.nativeEvent.text : e;
    const codeText = text.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(codeText);

    // Auto-submit quando o código tiver 6 dígitos
    if (codeText.length === 6) {
      verifyCode(codeText);
    }
  };

  const verifyCode = async (code = verificationCode) => {
    if (code.length !== 6) {
      setError("O código deve ter 6 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log(`🔍 Verificando código: ${code}`);

      // ✅ CORRIGIDO: Usar sempre o serviço unificado
      const result = await smsVerificationService.verifyCode(code);

      if (result.success) {
        console.log("✅ Código verificado com sucesso");
        if (result.isSimulated) {
          console.log("🎭 Usando simulação de produção");
        }
        onNext({
          verifiedPhoneToken: result.verifiedPhoneToken,
        });
      } else {
        console.log("❌ Erro na verificação:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("Erro na verificação:", err);
      setError("Código inválido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!canResend) return;

    setLoading(true);
    setCanResend(false);
    setTimer(60);

    try {
      console.log("🔄 Reenviando código SMS");

      // ✅ CORRIGIDO: Usar sempre o serviço unificado
      const result = await smsVerificationService.sendVerificationCode(
        formData.phoneNumber
      );

      if (result.success) {
        console.log("✅ SMS reenviado com sucesso");
        if (result.isSimulated) {
          console.log("🎭 Usando simulação de produção");
        }
      } else {
        console.log("❌ Erro ao reenviar:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("Erro ao reenviar:", err);
      setError("Não foi possível reenviar o código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer
      title={title}
      subtitle={`Digite o código de 6 dígitos enviado para ${formData.phoneNumber}`}
      onBack={onBack}
    >
      <Form>
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
            <ErrorText>{error}</ErrorText>
          </ErrorMessage>
        ) : null}

        <Button
          onPress={() => verifyCode()}
          disabled={loading || verificationCode.length < 6}
        >
          <ButtonText>
            {loading ? "Verificando..." : "Verificar código"}
          </ButtonText>
        </Button>

        {!canResend ? (
          <TimerText>Reenviar código em {timer}s</TimerText>
        ) : (
          <ResendText onPress={resendCode}>
            Não recebeu o código? Reenviar
          </ResendText>
        )}
      </Form>
    </StepContainer>
  );
};

export default CodeStep;

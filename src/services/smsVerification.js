import auth from "@react-native-firebase/auth";

// ✅ NOVO: Flag para simular produção em DEV
const SIMULATE_PRODUCTION = true; // ← MANTER TRUE para produção

class SMSVerificationService {
  constructor() {
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
  }

  // ✅ NOVO: Detectar modo de operação
  isProductionMode() {
    return !__DEV__ || SIMULATE_PRODUCTION;
  }

  // ✅ NOVO: Simulação mais realista de produção
  async simulateProductionSMS(phoneNumber) {
    console.log("🎭 SIMULANDO PRODUÇÃO: Enviando SMS");

    // Simular diferentes cenários que podem acontecer em prod
    const scenarios = [
      { success: true, delay: 2000 }, // Sucesso normal
      { success: false, error: "auth/too-many-requests", delay: 1000 }, // Muitas tentativas
      { success: false, error: "auth/invalid-phone-number", delay: 500 }, // Número inválido
    ];

    // Para números de teste, sempre sucesso
    const isTestNumber =
      phoneNumber.includes("11999999999") ||
      phoneNumber.includes("11987654321");

    if (isTestNumber) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        verificationId: "simulated-verification-id",
        isSimulated: true,
      };
    }

    // Para outros números, simular cenários variados
    const scenario = scenarios[0]; // Por enquanto sempre sucesso
    await new Promise((resolve) => setTimeout(resolve, scenario.delay));

    if (scenario.success) {
      return {
        success: true,
        verificationId: "simulated-verification-id",
        isSimulated: true,
      };
    } else {
      return {
        success: false,
        error: this.getErrorMessage(scenario.error),
        code: scenario.error,
        isSimulated: true,
      };
    }
  }

  // ✅ NOVO: Simulação de verificação de código
  async simulateCodeVerification(code) {
    console.log("🎭 SIMULANDO PRODUÇÃO: Verificando código");

    // Códigos de teste que sempre funcionam
    const validCodes = ["123456", "000000", "111111"];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (validCodes.includes(code)) {
      return {
        success: true,
        user: {
          uid: "simulated-user-id",
          phoneNumber: "+5511999999999",
        },
        verifiedPhoneToken: "simulated-firebase-token-" + Date.now(),
        phoneNumber: "+5511999999999",
        isSimulated: true,
      };
    } else {
      return {
        success: false,
        error: "Código de verificação inválido",
        code: "auth/invalid-verification-code",
        isSimulated: true,
      };
    }
  }

  getErrorMessage(errorCode) {
    const messages = {
      "auth/invalid-phone-number": "Número de telefone inválido",
      "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde",
      "auth/quota-exceeded":
        "Limite de SMS atingido. Tente novamente mais tarde",
      "auth/argument-error":
        "Erro na configuração. Verifique o número de telefone",
      "auth/captcha-check-failed":
        "Falha na verificação de segurança. Tente novamente",
      "auth/invalid-verification-code": "Código de verificação inválido",
      "auth/code-expired": "Código expirado. Solicite um novo código",
      "auth/session-expired": "Sessão expirada. Solicite um novo código",
    };
    return messages[errorCode] || "Erro desconhecido";
  }

  // Enviar código SMS REAL
  async sendVerificationCode(phoneNumber) {
    try {
      console.log(`📱 Enviando SMS REAL para: ${phoneNumber}`);

      // Validar formato
      if (!phoneNumber || !phoneNumber.startsWith("+55")) {
        throw new Error("Número deve estar no formato +55XXXXXXXXXXX");
      }

      const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");
      if (cleanNumber.length !== 14) {
        throw new Error("Número inválido. Deve ter 11 dígitos após +55");
      }

      // DEV: Simular
      if (__DEV__) {
        console.log("🧪 Modo DEV: Simulando SMS");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return {
          success: true,
          verificationId: "dev-verification-id",
          isSimulated: true,
        };
      }

      // PRODUÇÃO: Firebase REAL
      console.log("🚀 Enviando SMS REAL via Firebase");
      const confirmation = await auth().signInWithPhoneNumber(cleanNumber);
      this.confirmationResult = confirmation;

      return {
        success: true,
        verificationId: confirmation.verificationId,
        isSimulated: false,
      };
    } catch (error) {
      console.error("❌ Erro ao enviar SMS:", error);

      let errorMessage = "Erro ao enviar código SMS";
      switch (error.code) {
        case "auth/invalid-phone-number":
          errorMessage = "Número de telefone inválido";
          break;
        case "auth/too-many-requests":
          errorMessage = "Muitas tentativas. Tente novamente mais tarde";
          break;
        case "auth/quota-exceeded":
          errorMessage = "Limite de SMS atingido. Tente novamente mais tarde";
          break;
        default:
          errorMessage = error.message || "Erro desconhecido";
      }

      return {
        success: false,
        error: errorMessage,
        code: error.code,
      };
    }
  }

  // Verificar código SMS REAL
  async verifyCode(verificationCode) {
    try {
      console.log(`🔍 Verificando código: ${verificationCode}`);

      if (!verificationCode || verificationCode.length !== 6) {
        return {
          success: false,
          error: "Código deve ter 6 dígitos",
        };
      }

      // DEV: Simular
      if (__DEV__) {
        console.log("🧪 Modo DEV: Simulando verificação");
        if (verificationCode === "123456") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return {
            success: true,
            user: { uid: "dev-user" },
            verifiedPhoneToken: "dev-token-123",
            phoneNumber: "+5511999999999",
            isSimulated: true,
          };
        } else {
          return { success: false, error: "Código inválido" };
        }
      }

      // PRODUÇÃO: Firebase REAL
      if (!this.confirmationResult) {
        return {
          success: false,
          error: "Nenhuma verificação em andamento",
        };
      }

      console.log("🚀 Verificando código REAL via Firebase");
      const result = await this.confirmationResult.confirm(verificationCode);

      const verifiedPhoneToken = await result.user.getIdToken();

      return {
        success: true,
        user: result.user,
        verifiedPhoneToken,
        phoneNumber: result.user.phoneNumber,
        isSimulated: false,
      };
    } catch (error) {
      console.error("❌ Erro ao verificar código:", error);

      let errorMessage = "Código inválido";
      switch (error.code) {
        case "auth/invalid-verification-code":
          errorMessage = "Código de verificação inválido";
          break;
        case "auth/code-expired":
          errorMessage = "Código expirado. Solicite um novo código";
          break;
        case "auth/session-expired":
          errorMessage = "Sessão expirada. Solicite um novo código";
          break;
        default:
          errorMessage = error.message || "Erro na verificação";
      }

      return {
        success: false,
        error: errorMessage,
        code: error.code,
      };
    }
  }

  // Limpar estado
  clear() {
    this.confirmationResult = null;
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }
}

export const smsVerificationService = new SMSVerificationService();

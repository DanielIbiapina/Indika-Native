import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/authContext";
import { Container } from "./styles";

// Steps
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import NameStep from "./steps/NameStep";
import EmailStep from "./steps/EmailStep";
import PasswordStep from "./steps/PasswordStep";
import CpfStep from "./steps/CpfStep";

// Components
import StepIndicator from "./components/StepIndicator";

const STEPS = [
  { id: "phone", component: PhoneStep, title: "Telefone", required: true },
  { id: "code", component: CodeStep, title: "Verificação", required: true },
  { id: "name", component: NameStep, title: "Seu nome", required: true },
  { id: "email", component: EmailStep, title: "Seu e-mail", required: false },
  {
    id: "password",
    component: PasswordStep,
    title: "Crie uma senha",
    required: true,
  },
  { id: "cpf", component: CpfStep, title: "CPF (Opcional)", required: false },
];

const SignupFlow = () => {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    verificationId: "",
    verifiedPhoneToken: "",
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  const handleNextStep = (stepData) => {
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSignup(updatedFormData);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSkipStep = () => {
    const step = STEPS[currentStep];
    if (!step.required) {
      // Se é o último step (CPF), finaliza com CPF vazio
      if (currentStep === STEPS.length - 1) {
        const finalData = { ...formData, cpf: "" };
        completeSignup(finalData);
      } else {
        // Se não é o último step, avança normalmente
        handleNextStep({});
      }
    }
  };

  const completeSignup = async (finalData) => {
    setLoading(true);
    try {
      console.log("Iniciando cadastro com dados:", {
        name: finalData.name,
        email: finalData.email || "vazio",
        hasPassword: !!finalData.password,
        cpf: finalData.cpf || "vazio",
        phone: finalData.phoneNumber ? "***.***.***-**" : "não informado",
        hasToken: !!finalData.verifiedPhoneToken,
      });

      // Preparar dados para envio - tratando campos opcionais
      const registrationData = {
        name: finalData.name.trim(),
        email: finalData.email?.trim() || null, // null ao invés de string vazia
        password: finalData.password,
        cpf: finalData.cpf ? finalData.cpf.replace(/\D/g, "") : null, // null ao invés de string vazia
        phone: finalData.phoneNumber.replace(/\D/g, ""),
        verifiedPhoneToken: finalData.verifiedPhoneToken,
      };

      console.log("Dados preparados para registro:", registrationData);

      const result = await register(
        registrationData.name,
        registrationData.email,
        registrationData.password,
        registrationData.cpf,
        registrationData.phone,
        registrationData.verifiedPhoneToken
      );

      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        });
      } else {
        // Tratamento específico para erro de usuário já existente
        if (
          result.error?.includes("já existe") ||
          result.error?.includes("already exists")
        ) {
          Alert.alert(
            "Conta já existe",
            "Uma conta com este telefone já está cadastrada. Deseja fazer login?",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Fazer Login",
                onPress: () =>
                  navigation.navigate("AuthNavigator", { screen: "Entrar" }),
              },
            ]
          );
        } else {
          Alert.alert("Erro no Cadastro", result.error || "Erro desconhecido");
        }
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const currentStepInfo = STEPS[currentStep];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} />
        <CurrentStepComponent
          formData={formData}
          title={currentStepInfo.title}
          onNext={handleNextStep}
          onSkip={!currentStepInfo.required ? handleSkipStep : null}
          onBack={handlePrevStep}
          loading={loading}
          isLastStep={currentStep === STEPS.length - 1}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignupFlow;

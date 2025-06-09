import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import {
  Container,
  SignupCard,
  Title,
  Subtitle,
  Form,
  Input,
  InputWrapper,
  Button,
  ButtonText,
  ErrorMessage,
} from "./styles";

const CompleteSignup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { register } = useAuth();
  const { phoneNumber, verifiedPhoneToken } = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  // Funções de formatação e validação do CPF
  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove não dígitos
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleChange = (e, name) => {
    let value = e.nativeEvent.text;

    if (name === "email") {
      value = value.toLowerCase();
    } else if (name === "cpf") {
      // Apenas remove caracteres não numéricos
      value = value.replace(/\D/g, "");
      // Limita a 11 dígitos se necessário
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (name) => {
    if (name === "cpf" && formData.cpf) {
      // Só formata se tiver 11 dígitos
      if (formData.cpf.length === 11) {
        const formattedCPF = formatCPF(formData.cpf);
        setFormData((prevData) => ({
          ...prevData,
          cpf: formattedCPF,
        }));
      }
    }
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false;

    // Verifica CPFs com números iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setError("");

    // Validar CPF
    const cleanCPF = formData.cpf.replace(/\D/g, "");
    if (!validateCPF(cleanCPF)) {
      setError("CPF inválido");
      return;
    }

    // Validar outros campos
    if (!formData.name || !formData.email || !formData.password) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      // Registrar com o telefone já verificado
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.cpf.replace(/\D/g, ""),
        phoneNumber.replace(/\D/g, ""), // telefone limpo
        verifiedPhoneToken
      );

      if (result.success) {
        navigation.navigate("Home");
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Erro não tratado:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
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
          <SignupCard>
            <Title>Complete seu cadastro</Title>
            <Subtitle>
              Seu número {phoneNumber} foi verificado com sucesso!
            </Subtitle>

            <Form>
              <InputWrapper>
                <Ionicons name="person-outline" size={20} color="#666" />
                <Input
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => handleChange(e, "name")}
                  required
                />
              </InputWrapper>

              <InputWrapper>
                <Ionicons name="mail-outline" size={20} color="#666" />
                <Input
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  required
                />
              </InputWrapper>

              <InputWrapper>
                <Ionicons name="card-outline" size={20} color="#666" />
                <Input
                  placeholder="CPF (apenas números)"
                  value={formData.cpf}
                  onChange={(e) => handleChange(e, "cpf")}
                  onBlur={() => handleBlur("cpf")}
                  keyboardType="numeric"
                  maxLength={14}
                  required
                />
              </InputWrapper>

              <InputWrapper>
                <Ionicons name="lock-closed-outline" size={20} color="#666" />
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")}
                  required
                />
              </InputWrapper>

              {error ? (
                <ErrorMessage>
                  <Text>{error}</Text>
                </ErrorMessage>
              ) : null}

              <Button onPress={handleSubmit} disabled={loading}>
                <ButtonText>
                  {loading ? "Finalizando..." : "Criar Conta"}
                </ButtonText>
              </Button>
            </Form>
          </SignupCard>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CompleteSignup;

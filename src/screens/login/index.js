import React, { useState, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import {
  ScrollContainer,
  Container,
  LoginCard,
  Title,
  Subtitle,
  Form,
  Input,
  InputWrapper,
  Button,
  ButtonText,
  SocialButton,
  Divider,
  ToggleText,
  ForgotPassword,
  ErrorMessage,
} from "./styles";

const Login = () => {
  const navigation = useNavigation();
  const { login, register, signed } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (signed) {
      navigation.navigate("Perfil");
    }
  }, [signed, navigation]);

  const handleChange = (e, name) => {
    const value =
      name === "email" ? e.nativeEvent.text.toLowerCase() : e.nativeEvent.text;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setError("");
    setLoading(true);

    try {
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password
        );
      }

      if (result.success) {
        navigation.navigate("Home");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollContainer>
          <Container>
            <LoginCard>
              <Title>Bem-vindo(a)!</Title>
              <Subtitle>
                {isLogin
                  ? "Entre para encontrar os melhores serviços"
                  : "Crie sua conta e encontre os melhores serviços"}
              </Subtitle>

              <Form>
                {!isLogin && (
                  <InputWrapper>
                    <Ionicons name="person-outline" size={20} color="#666" />
                    <Input
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={(e) => handleChange(e, "name")}
                      required
                    />
                  </InputWrapper>
                )}
                <InputWrapper>
                  <Ionicons name="mail-outline" size={20} color="#666" />
                  <Input
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => handleChange(e, "email")}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
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

                {error && (
                  <ErrorMessage>
                    <Text>{error}</Text>
                  </ErrorMessage>
                )}

                {isLogin && (
                  <ForgotPassword>
                    <Text>Esqueceu sua senha?</Text>
                  </ForgotPassword>
                )}

                <Button onPress={handleSubmit} disabled={loading}>
                  <ButtonText>
                    {loading
                      ? "Carregando..."
                      : isLogin
                      ? "Entrar"
                      : "Criar conta"}
                  </ButtonText>
                </Button>

                <Divider>
                  <Text>ou continue com</Text>
                </Divider>

                <SocialButton>
                  <Ionicons name="logo-google" size={20} color="#666" />
                  <Text>Google</Text>
                </SocialButton>

                <SocialButton>
                  <Ionicons name="logo-facebook" size={20} color="#666" />
                  <Text>Facebook</Text>
                </SocialButton>

                <ToggleText onPress={() => setIsLogin(!isLogin)}>
                  <Text>
                    {isLogin
                      ? "Ainda não tem conta? Cadastre-se"
                      : "Já tem uma conta? Entre"}
                  </Text>
                </ToggleText>
              </Form>
            </LoginCard>
          </Container>
        </ScrollContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

/*import React, { useState, useEffect } from "react";
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
  DividerLine,
  DividerText,
  SocialButtonText,
} from "./styles";

// Importações condicionais
let GoogleSignin;
//let LoginManager;
//let AccessToken;

// Só importa se não estiver no Expo Go
if (!__DEV__) {
  GoogleSignin =
    require("@react-native-google-signin/google-signin").GoogleSignin;
  //const FB = require("react-native-fbsdk-next");
  //LoginManager = FB.LoginManager;
  //AccessToken = FB.AccessToken;
}

//const IS_DEV = EXPO_PUBLIC_IS_DEVELOPMENT === "true" || __DEV__;
const IS_DEV = __DEV__;

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
    cpf: "",
  });

  useEffect(() => {
    if (signed) {
      navigation.navigate("Perfil");
    }
  }, [signed, navigation]);

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

    if (!isLogin) {
      const cleanCPF = formData.cpf.replace(/\D/g, "");

      if (!validateCPF(cleanCPF)) {
        setError("CPF inválido");
        return;
      }
    }

    setLoading(true);

    try {
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.cpf.replace(/\D/g, "")
        );
      }

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

  const handleGoogleLogin = async () => {
    if (IS_DEV) {
      // Mock para desenvolvimento
      console.log("Login com Google simulado no modo DEV");
      const mockGoogleUser = {
        user: {
          id: "google_123456",
          name: "Usuário Teste Google",
          email: "teste@gmail.com",
          photo: "https://ui-avatars.com/api/?name=Usuario+Teste",
        },
      };

      try {
        // Usar a mesma função login do seu AuthContext
        const result = await login(
          mockGoogleUser.user.email,
          null,
          "google",
          mockGoogleUser.user
        );

        if (result.success) {
          navigation.navigate("Home");
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError("Erro ao fazer login com Google");
        console.log(error);
      }
    } else {
      // Código original do Google Sign-In para produção
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // Implementar lógica de autenticação com backend
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    if (__DEV__) {
      // Mock para desenvolvimento no Expo Go
      console.log("Login com Facebook simulado no modo DEV");
      const mockFacebookUser = {
        user: {
          id: "fb_123456",
          name: "Usuário Teste Facebook",
          email: "teste@facebook.com",
          photo: "https://ui-avatars.com/api/?name=Usuario+Teste",
        },
      };

      try {
        // Usar a mesma função login do seu AuthContext
        const result = await login(
          mockFacebookUser.user.email,
          null,
          "facebook",
          mockFacebookUser.user
        );

        if (result.success) {
          navigation.navigate("Home");
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError("Erro ao fazer login com Facebook");
        console.log(error);
      }
    } else {
      // Código original do Facebook Login para produção
      try {
        const result = await LoginManager.logInWithPermissions([
          "public_profile",
          "email",
        ]);
        if (result.isCancelled) {
          throw "User cancelled the login process";
        }
        const data = await AccessToken.getCurrentAccessToken();
        // Implementar lógica de autenticação com backend
        console.log(data);
      } catch (error) {
        console.log(error);
      }
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
                  <>
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
                  </>
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
                  <DividerLine />
                  <DividerText>ou continue com</DividerText>
                  <DividerLine />
                </Divider>

                <SocialButton provider="google" onPress={handleGoogleLogin}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                  <SocialButtonText provider="google">
                    Continuar com Google
                  </SocialButtonText>
                </SocialButton>

                <SocialButton provider="facebook" onPress={handleFacebookLogin}>
                  <Ionicons name="logo-facebook" size={24} color="#ffffff" />
                  <SocialButtonText provider="facebook">
                    Continuar com Facebook
                  </SocialButtonText>
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
*/

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
  Divider,
  ToggleText,
  ForgotPassword,
  ErrorMessage,
  DividerLine,
  DividerText,
  SocialButtonText,
  SocialButton,
} from "./styles";

// Importações condicionais
//let GoogleSignin;

// Só importa se não estiver no Expo Go
/*if (!__DEV__) {
  GoogleSignin =
    require("@react-native-google-signin/google-signin").GoogleSignin;
}*/

//const IS_DEV = EXPO_PUBLIC_IS_DEVELOPMENT === "true" || __DEV__;
const IS_DEV = __DEV__;

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
    cpf: "",
  });

  useEffect(() => {
    if (signed) {
      navigation.navigate("Perfil");
    }
  }, [signed, navigation]);

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

    if (!isLogin) {
      const cleanCPF = formData.cpf.replace(/\D/g, "");

      if (!validateCPF(cleanCPF)) {
        setError("CPF inválido");
        return;
      }
    }

    setLoading(true);

    try {
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.cpf.replace(/\D/g, "")
        );
      }

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

  const handleGoogleLogin = async () => {
    //if (IS_DEV) {
    // Mock para desenvolvimento
    console.log("Login com Google simulado no modo DEV");
    const mockGoogleUser = {
      user: {
        id: "google_123456",
        name: "Usuário Teste Google",
        email: "teste@gmail.com",
        photo: "https://ui-avatars.com/api/?name=Usuario+Teste",
      },
    };

    try {
      // Usar a mesma função login do seu AuthContext
      const result = await login(
        mockGoogleUser.user.email,
        null,
        "google",
        mockGoogleUser.user
      );

      if (result.success) {
        navigation.navigate("Home");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Erro ao fazer login com Google");
      console.log(error);
    }
    /* } else {
      // Código original do Google Sign-In para produção
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // Implementar lógica de autenticação com backend
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    }*/
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
                  <>
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
                  </>
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
                  <DividerLine />
                  <DividerText>ou continue com</DividerText>
                  <DividerLine />
                </Divider>

                <SocialButton provider="google" onPress={handleGoogleLogin}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                  <SocialButtonText provider="google">
                    Continuar com Google
                  </SocialButtonText>
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

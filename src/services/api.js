import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Criação da instância do Axios
console.log("API URL:", process.env.EXPO_API_URL);
const api = axios.create({
  baseURL: process.env.EXPO_API_URL, // Ajuste conforme sua configuração de ambiente
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("@App:token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao recuperar o token do AsyncStorage:", error);
  }
  return config;
});

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log("Token expirado, limpando dados...");
        await AsyncStorage.removeItem("@App:token");
        await AsyncStorage.removeItem("@App:user");

        // Não podemos usar useNavigation aqui, então vamos apenas logar
        // A navegação será tratada pelo contexto de auth
        console.log("Usuário deslogado por token inválido");
      } catch (err) {
        console.error("Erro ao limpar dados do AsyncStorage:", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

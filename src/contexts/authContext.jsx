import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Substitui o localStorage

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@App:user");
        const storedToken = await AsyncStorage.getItem("@App:token");

        if (storedUser && storedToken) {
          try {
            setUser(JSON.parse(storedUser));
            api.defaults.headers.Authorization = `Bearer ${storedToken}`;
          } catch (error) {
            console.error("Erro ao analisar os dados do usuário:", error);
            await AsyncStorage.removeItem("@App:user");
            await AsyncStorage.removeItem("@App:token");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await api.post("/auth/login", {
        identifier,
        password,
      });

      const { user, token } = response.data;

      await AsyncStorage.setItem("@App:user", JSON.stringify(user));
      await AsyncStorage.setItem("@App:token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao fazer login",
      };
    }
  };

  // Função para criar comunidade de amigos
  const createFriendsCommunity = async (userName) => {
    try {
      const formData = new FormData();

      formData.append("name", `Amigos de ${userName.split(" ")[0]}`); // Usar só o primeiro nome
      formData.append(
        "description",
        `Comunidade de amigos pessoais do ${
          userName.split(" ")[0]
        }. Aqui estão as pessoas que você conhece e confia.`
      );
      formData.append("isPrivate", "true"); // Comunidade privada
      formData.append("categories", JSON.stringify(["friends"])); // Categoria especial

      const response = await api.post("/communities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Comunidade de amigos criada:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar comunidade de amigos:", error);
      // Não vamos falhar o registro por causa disso
      return null;
    }
  };

  const register = async (
    name,
    email,
    password,
    cpf,
    phone,
    verifiedPhoneToken
  ) => {
    try {
      console.log("Dados enviados para registro:", {
        name,
        email,
        password,
        cpf,
        phone,
        verifiedPhoneToken,
      });

      if (!verifiedPhoneToken && !__DEV__) {
        return { success: false, error: "Telefone não verificado" };
      }

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        cpf,
        phone,
        verifiedPhoneToken,
      });

      console.log("Resposta completa do registro:", response.data);

      if (!response.data.user || !response.data.token) {
        console.log("Estrutura da resposta inválida:", response.data);
        throw new Error("Resposta do servidor inválida");
      }

      const { user, token } = response.data;

      console.log("Dados extraídos:", { user, token });

      await AsyncStorage.setItem("@App:user", JSON.stringify(user));
      await AsyncStorage.setItem("@App:token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);

      // Criar comunidade de amigos automaticamente
      console.log("Criando comunidade de amigos para:", user.name);
      await createFriendsCommunity(user.name);

      return { success: true };
    } catch (error) {
      console.error("Erro completo no registro:", error);
      console.error("Resposta de erro:", error.response?.data);

      return {
        success: false,
        error: error.response?.data?.message || "Erro ao criar conta",
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@App:user");
    await AsyncStorage.removeItem("@App:token");
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

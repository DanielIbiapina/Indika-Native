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

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

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

  const register = async (name, email, password, cpf) => {
    try {
      console.log("Dados enviados para registro:", {
        name,
        email,
        password,
        cpf,
      });

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        cpf,
      });

      console.log("Resposta completa do registro:", response.data);

      // Verificando a estrutura da resposta
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

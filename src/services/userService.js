import api from "./api";

export const userService = {
  // Obter o perfil do usuário autenticado
  getProfile: async () => {
    try {
      const response = await api.get("/users/me");
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao obter perfil do usuário");
    }
  },

  // Atualizar o perfil do usuário
  updateProfile: async (userData) => {
    try {
      const response = await api.put("/users/me", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Atualizar o avatar do usuário
  updateAvatar: async (formData) => {
    try {
      const response = await api.put("/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obter os pedidos do usuário autenticado
  getMyOrders: async () => {
    try {
      const response = await api.get("/users/me/orders");
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao obter pedidos do usuário");
    }
  },

  // Verificar se CPF já existe
  checkCPF: async (cpf) => {
    try {
      const response = await api.post("/users/check-cpf", { cpf });
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao verificar CPF");
    }
  },

  // Obter o perfil público de um usuário
  getPublicProfile: async (userId) => {
    try {
      console.log("Iniciando getPublicProfile para userId:", userId);
      const response = await api.get(`/users/${userId}/public`);
      console.log("Resposta do getPublicProfile:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erro detalhado no getPublicProfile:",
        error.response || error
      );
      throw new Error("Erro ao obter perfil do usuário");
    }
  },

  // Obter serviços de um usuário específico
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};

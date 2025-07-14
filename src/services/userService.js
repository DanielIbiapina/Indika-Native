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

  // Atualizar senha do usuário
  updatePassword: async (passwordData) => {
    try {
      const response = await api.put("/users/me/password", passwordData);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao atualizar senha");
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

  // Buscar usuário por telefone
  searchByPhone: async (phone) => {
    try {
      // Remove caracteres não numéricos do telefone
      const cleanPhone = phone.replace(/\D/g, "");

      console.log("Buscando usuário por telefone:", cleanPhone);
      const response = await api.get(`/users/search/phone/${cleanPhone}`);
      console.log("Resposta da busca por telefone:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro na busca por telefone:", error.response || error);

      // Se for 404, não encontrou o usuário
      if (error.response?.status === 404) {
        return null;
      }

      throw handleError(error, "Erro ao buscar usuário por telefone");
    }
  },

  // Reset de senha via SMS
  resetPassword: async (resetData) => {
    try {
      const response = await api.post("/auth/reset-password", resetData);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao resetar senha");
    }
  },

  // Obter serviços de um usuário específico

  // Obter preferências de notificação
  getNotificationPreferences: async () => {
    try {
      const response = await api.get("/users/me/notification-preferences");
      return response.data;
    } catch (error) {
      // Retornar configurações padrão se não houver no backend
      return {
        pushNotifications: true,
        emailNotifications: true,
        newOrders: true,
        orderUpdates: true,
        messages: true,
        marketing: false,
      };
    }
  },

  // Atualizar preferências de notificação
  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await api.put(
        "/users/me/notification-preferences",
        preferences
      );
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao atualizar preferências de notificação");
    }
  },

  // ✅ NOVO: Obter configurações de localização
  getLocationSettings: async () => {
    try {
      const response = await api.get("/users/me/location-settings");
      return response.data;
    } catch (error) {
      // Retornar configurações padrão se não houver no backend
      return {
        autoDetectLocation: true,
        shareLocation: true,
        preciseLocation: false,
        locationHistory: false,
        showInProfile: true,
      };
    }
  },

  // ✅ NOVO: Atualizar configurações de localização
  updateLocationSettings: async (settings) => {
    try {
      const response = await api.put("/users/me/location-settings", settings);
      return response.data;
    } catch (error) {
      throw handleError(
        error,
        "Erro ao atualizar configurações de localização"
      );
    }
  },
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};

import api from "./api";

export const friendshipService = {
  // Enviar solicitação de amizade
  sendFriendRequest: async (userId, message = "") => {
    try {
      const response = await api.post("/friendships/request", {
        targetUserId: userId,
        message: message.trim(),
      });
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao enviar solicitação de amizade");
    }
  },

  // Aceitar solicitação de amizade
  acceptFriendRequest: async (requestId) => {
    try {
      const response = await api.put(`/friendships/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao aceitar solicitação");
    }
  },

  // Rejeitar solicitação de amizade
  rejectFriendRequest: async (requestId) => {
    try {
      const response = await api.put(`/friendships/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao rejeitar solicitação");
    }
  },

  // Verificar status da amizade com um usuário
  getFriendshipStatus: async (userId) => {
    try {
      const response = await api.get(`/friendships/status/${userId}`);
      return response.data;
    } catch (error) {
      // Se der 404, significa que não há relação de amizade
      if (error.response?.status === 404) {
        return { status: "none" };
      }
      throw handleError(error, "Erro ao verificar status da amizade");
    }
  },

  // Listar solicitações pendentes
  getPendingRequests: async () => {
    try {
      const response = await api.get("/friendships/pending");
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao carregar solicitações pendentes");
    }
  },

  // Remover amizade
  removeFriend: async (userId) => {
    try {
      const response = await api.delete(`/friendships/${userId}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao remover amizade");
    }
  },
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};

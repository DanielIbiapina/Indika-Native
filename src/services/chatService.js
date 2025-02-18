import api from "./api";

export const chatService = {
  // Busca todos os chats do usuário
  getChats: async () => {
    try {
      const response = await api.get("/chats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cria um novo chat
  createChat: async (providerId) => {
    try {
      const response = await api.post("/chats/create", { providerId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Busca um chat específico
  getChat: async (chatId) => {
    try {
      const response = await api.get(`/chats/${chatId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

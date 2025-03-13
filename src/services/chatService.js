import api from "./api";

class ChatService {
  // Busca todos os chats do usuário
  async getChats() {
    try {
      const response = await api.get("/chats");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar chats:", error);
      throw error;
    }
  }

  // Cria um novo chat ou obtém um existente
  async createChat(providerId) {
    try {
      const response = await api.post("/chats/create", { providerId });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar/obter chat:", error);
      throw error;
    }
  }

  // Busca um chat específico
  async getChatDetails(chatId) {
    try {
      const response = await api.get(`/chats/${chatId}/details`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar detalhes do chat:", error);
      // Retorna um objeto vazio em caso de erro para evitar undefined
      return {
        orders: [],
        participants: [],
        lastMessage: null,
      };
    }
  }
}

export const chatService = new ChatService();

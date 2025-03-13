import api from "./api";

export const messageService = {
  // Busca mensagens de um chat específico com paginação
  getMessages: async (chatId, page = 1, limit = 30) => {
    try {
      const response = await api.get(`/chats/${chatId}/messages`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Envia uma nova mensagem
  sendMessage: async (chatId, message) => {
    try {
      // Se for uma mensagem de orçamento
      if (message.type === "quotation") {
        // Garantir que o content seja uma string
        const content =
          typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content);

        const response = await api.post(`/chats/${chatId}/messages`, {
          type: "quotation",
          content,
        });
        return response.data;
      }

      // Se for uma mensagem de texto
      const response = await api.post(`/chats/${chatId}/messages`, {
        type: "text",
        content:
          typeof message === "string"
            ? message.substring(0, 1000)
            : message.content.substring(0, 1000),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data); // Debug
      }
      throw error;
    }
  },

  // Marca mensagens como lidas
  markAsRead: async (chatId) => {
    try {
      const response = await api.post(`/chats/${chatId}/read`);

      return response.data;
    } catch (error) {
      console.error("Erro na API de marcar como lido:", error);
      throw error;
    }
  },

  // Busca mensagens não lidas
  getUnreadMessages: async () => {
    try {
      const response = await api.get("/chats/messages/unread");

      // Garante que a resposta é um array
      const unreadMessages = Array.isArray(response.data) ? response.data : [];

      // Filtra apenas mensagens com status 'sent' (não lidas)
      return unreadMessages.filter((msg) => msg.status === "sent");
    } catch (error) {
      console.error("Erro na API de mensagens não lidas:", error);
      throw error;
    }
  },

  // Envia uma mensagem com mídia (imagem, áudio, etc)
  sendMediaMessage: async (chatId, file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
      formData.append("type", type);

      const response = await api.post(
        `/chats/${chatId}/messages/media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar status da mensagem
  updateMessageStatus: async (messageId, status) => {
    try {
      const response = await api.patch(`/chats/messages/${messageId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

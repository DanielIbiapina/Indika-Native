import api from "./api"; // Importe sua instância de API

export const recommendService = {
  // Método para recomendar um serviço para múltiplas comunidades
  recommend: async (providerId, communityIds) => {
    try {
      console.log("providerId", providerId);
      console.log("communityIds", communityIds);
      const response = await api.post(
        `/recommendations/${providerId}/recommend/`,
        {
          communityIds, // Enviando o array de communityIds
        }
      );
      console.log(response);
      return response.data; // Retorna a resposta, se necessário
    } catch (error) {
      throw handleError(error, "Erro ao recomendar o serviço");
    }
  },

  // Método para remover uma recomendação
  remove: async (providerId, communityId) => {
    try {
      await api.delete(
        `/recommendations/${providerId}/recommend/${communityId}`
      );
    } catch (error) {
      throw handleError(error, "Erro ao remover a recomendação");
    }
  },

  // Método para obter recomendações por comunidade
  getRecommendationsByCommunity: async (providerId) => {
    try {
      const response = await api.get(`/recommendations/${providerId}`);
      return response.data; // Retorna as recomendações
    } catch (error) {
      throw handleError(error, "Erro ao obter recomendações");
    }
  },
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};

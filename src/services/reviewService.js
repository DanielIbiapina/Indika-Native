import api from "./api";

export const reviewService = {
  // Listar avaliações por serviço
  listByService: async (serviceId) => {
    try {
      const response = await api.get(`/reviews/services/${serviceId}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao listar avaliações por serviço");
    }
  },

  // Listar avaliações por usuário
  listByUser: async (userId) => {
    try {
      const response = await api.get(`/reviews/users/${userId}`);

      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao listar avaliações por usuário");
    }
  },

  // Criar uma nova avaliação
  create: async (reviewData) => {
    try {
      const response = await api.post("/reviews", reviewData);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao criar avaliação");
    }
  },

  // Nova função para listar avaliações recebidas
  listReceivedReviews: async (userId) => {
    try {
      const response = await api.get(`/reviews/received-by/${userId}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "Erro ao listar avaliações recebidas");
    }
  },
};

// Função auxiliar para tratar erros
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error("Erro na API:", message);
  throw new Error(message);
};

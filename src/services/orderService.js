import api from "./api";

export const orderService = {
  list: async (params = {}) => {
    try {
      const response = await api.get("/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      throw error;
    }
  },

  create: async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    }
  },

  updateStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw error;
    }
  },

  getOrder: async (orderId) => {
    try {
      console.log("Chamando API para obter pedido:", orderId);
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter pedido ${orderId}:`, error);
      throw error;
    }
  },

  cancelOrder: async (orderId, reason) => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  createQuotation: async (orderId, quotationData) => {
    try {
      console.log("Enviando dados para criação de orçamento:", {
        orderId,
        quotationData,
      });

      const response = await api.post(`/orders/${orderId}/quotations`, {
        price: quotationData.price,
        scheduledDate: quotationData.scheduledDate,
        period: quotationData.period,
        specificTime: quotationData.specificTime,
        message: quotationData.message || quotationData.description || "",
        messageType: quotationData.messageType || "QUOTE",
      });

      console.log("Resposta da criação de orçamento:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      if (error.response?.data) {
        console.error("Resposta do servidor:", error.response.data);
      }
      throw error;
    }
  },

  acceptQuotation: async (orderId) => {
    try {
      const response = await api.post(`/orders/${orderId}/accept`);
      return response.data;
    } catch (error) {
      console.error("Erro ao aceitar orçamento:", error);
      throw error;
    }
  },

  rejectQuotation: async (orderId) => {
    try {
      const response = await api.post(`/orders/${orderId}/reject`);
      return response.data;
    } catch (error) {
      console.error("Erro ao rejeitar orçamento:", error);
      throw error;
    }
  },

  getQuotations: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/quotations`);
      console.log("Resposta getQuotations:", response.data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Função auxiliar para criar query strings
const createQueryString = (params) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

// Função auxiliar para tratar erros
const handleError = (error) => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw error;
};

export default orderService;

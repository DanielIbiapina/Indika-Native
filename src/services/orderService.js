import api from "./api";

export const orderService = {
  list: async (params = {}) => {
    try {
      const queryParams = createQueryString({
        role: params.role || "client",
        ...(params.status && { status: params.status }),
        ...(params.serviceId && { serviceId: params.serviceId }),
      });

      const response = await api.get(`/orders?${queryParams}`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  create: async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw handleError(error);
    }
  },

  updateStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
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
  if (error.response?.data) {
    console.error("Erro na API:", error.response.data);
    return error.response.data;
  } else {
    console.error("Erro desconhecido:", error);
    return error;
  }
};

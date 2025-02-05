import api from "./api";

export const paymentService = {
  setupPaymentMethod: async (data) => {
    console.log(data);
    console.log("oii");
    return api.post("/payments/payment-methods", data);
  },

  getPaymentMethod: async () => {
    try {
      console.log("Chamando API - getPaymentMethod");
      const response = await api.get("/payments/payment-methods");
      console.log("Resposta getPaymentMethod:", response.data);
      return response;
    } catch (error) {
      console.error("Erro em getPaymentMethod:", error);
      throw error;
    }
  },

  getPaymentHistory: async () => {
    return api.get("/payments/history");
  },

  getBalance: async () => {
    try {
      console.log("Chamando API - getBalance");
      const response = await api.get("/payments//balance");
      console.log("Resposta getBalance:", response.data);
      return response;
    } catch (error) {
      console.error("Erro em getBalance:", error);
      throw error;
    }
  },

  requestWithdraw: async (amount) => {
    return api.post("/payments/withdrawals", { amount });
  },

  createPaymentRequest: async (data) => {
    return api.post("/payments/request", data);
  },

  processPayment: async (orderId) => {
    return api.post(`/payments/process/${orderId}`);
  },

  getPaymentStatus: async (orderId) => {
    try {
      console.log("orderId:", orderId);
      const response = await api.get(`/payments/status/${orderId}`);
      console.log("response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar status do pagamento:", error);
      throw error;
    }
  },

  getAdminPayments: async () => {
    try {
      console.log("Chamando API - getAdminPayments");
      const response = await api.get(
        "/payments/status?status=AWAITING_CONFIRMATION"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pagamentos pendentes:", error);
      throw error;
    }
  },

  confirmPayment: async (orderId, confirmed) => {
    try {
      const response = await api.post(`/payments/confirm/${orderId}`, {
        confirmed,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      throw error;
    }
  },
};

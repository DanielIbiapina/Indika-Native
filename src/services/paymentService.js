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
};

import api from "./api";

export const paymentService = {
  createMercadoPagoPreference: async (data) => {
    try {
      const response = await api.post("/payments/mercadopago/preference", {
        orderId: data.orderId,
        amount: data.amount,
        description: data.description,
        providerId: data.providerId,
      });

      if (!response.data.init_point) {
        throw new Error("URL do checkout não encontrada na resposta");
      }

      return response;
    } catch (error) {
      console.error("Erro detalhado ao criar preferência:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      });

      if (error.response) {
        // Erro com resposta do servidor
        throw new Error(
          `Erro do servidor: ${error.response.status} - ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // Erro sem resposta do servidor
        throw new Error(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        );
      } else {
        // Erro na configuração da requisição
        throw new Error(`Erro ao criar preferência: ${error.message}`);
      }
    }
  },

  // Métodos para histórico e status
  getPaymentHistory: async () => {
    return api.get("/payments/history");
  },

  getPaymentStatus: async (orderId) => {
    try {
      const response = await api.get(`/payments/status/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar status do pagamento:", error);
      throw error;
    }
  },

  // Métodos para prestadores de serviço
  createPaymentRequest: async (data) => {
    return api.post("/payments/request", {
      orderId: data.orderId,
      amount: data.amount,
      providerId: data.receiverId,
      clientId: data.senderId,
    });
  },

  /* // Métodos administrativos
  getAdminPayments: async () => {
    try {
      const response = await api.get("/payments/status?status=AWAITING_CONFIRMATION");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pagamentos pendentes:", error);
      throw error;
    }
  },*/

  /*confirmPayment: async (orderId, confirmed) => {
    try {
      const response = await api.post(`/payments/confirm/${orderId}`, {
        confirmed
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      throw error;
    }
  }*/

  /*  setupPaymentMethod: async (data) => {
    console.log(data);
    console.log("oii");
    return api.post("/payments/payment-methods", data);
  },

  getPaymentMethod: async () => {
    const response = await api.get("/payments/payment-methods");*/
  // Métodos relacionados ao Mercado Pago

  /* getBalance: async () => {
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
  },*/
};

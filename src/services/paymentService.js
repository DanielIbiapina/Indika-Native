import api from "./api";

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
};

export const paymentService = {
  // Criar preferência de pagamento no Mercado Pago
  createMercadoPagoPreference: async (data) => {
    try {
      // Validar dados obrigatórios
      if (
        !data.orderId ||
        !data.amount ||
        !data.description ||
        !data.providerId
      ) {
        throw new Error("Dados incompletos: todos os campos são obrigatórios");
      }

      const response = await api.post("/payments/mercadopago/preference", {
        orderId: data.orderId,
        amount: Number(data.amount),
        description: data.description,
        providerId: data.providerId,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar preferência:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: data, // Log dos dados enviados
      });

      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || "Dados incompletos");
      }
      throw error;
    }
  },

  // Buscar histórico de pagamentos
  getPaymentHistory: async () => {
    try {
      const response = await api.get("/payments/history");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      throw new Error("Não foi possível carregar o histórico de pagamentos");
    }
  },

  // Buscar status de um pagamento específico
  getPaymentStatus: async (orderId) => {
    try {
      const response = await api.get(`/payments/status/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar status:", error);
      throw new Error("Não foi possível verificar o status do pagamento");
    }
  },

  // Monitorar status do pagamento
  monitorPaymentStatus: async (orderId, onStatusChange) => {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = 3000; // 3 segundos

    const checkStatus = async () => {
      try {
        const status = await paymentService.getPaymentStatus(orderId);

        if (status.paymentStatus === PAYMENT_STATUS.COMPLETED) {
          onStatusChange(status);
          return true;
        }

        if (
          status.paymentStatus === PAYMENT_STATUS.FAILED ||
          status.paymentStatus === PAYMENT_STATUS.CANCELLED
        ) {
          onStatusChange(status);
          return true;
        }

        return false;
      } catch (error) {
        console.error("Erro ao monitorar status:", error);
        return false;
      }
    };

    return new Promise((resolve) => {
      const intervalId = setInterval(async () => {
        attempts++;

        const shouldStop = await checkStatus();
        if (shouldStop || attempts >= maxAttempts) {
          clearInterval(intervalId);
          resolve();
        }
      }, interval);
    });
  },

  // Métodos para prestadores de serviço
  /* createPaymentRequest: async (data) => {
    return api.post("/payments/request", {
      orderId: data.orderId,
      amount: data.amount,
      providerId: data.receiverId,
      clientId: data.senderId,
    });
  },*/

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

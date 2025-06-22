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

  // Novo método para pagamentos diretos
  createDirectPayment: async (data) => {
    try {
      const response = await api.post("/payments/direct", {
        orderId: data.orderId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        providerId: data.providerId,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Método para cliente confirmar que realizou pagamento
  clientConfirmPayment: async (paymentId) => {
    try {
      const response = await api.post(`/payments/${paymentId}/client-confirm`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Prestador confirma recebimento do pagamento direto
  confirmDirectPayment: async (paymentId) => {
    try {
      const response = await api.post(
        `/payments/${paymentId}/provider-confirm`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao confirmar recebimento:", error);
      throw error;
    }
  },

  // Método para buscar assinatura ativa
  getSubscription: async () => {
    try {
      const response = await api.get("/payments/subscription");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Método para criar uma nova assinatura
  createSubscription: async (planData) => {
    try {
      const response = await api.post("/payments/subscription", planData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Criar preferência para assinatura no Mercado Pago
  createSubscriptionPreference: async (data) => {
    try {
      // Validar dados obrigatórios
      if (!data.planType || !data.price || !data.description) {
        throw new Error("Dados incompletos: todos os campos são obrigatórios");
      }

      const response = await api.post("/payments/subscription/preference", {
        planType: data.planType,
        price: Number(data.price),
        description: data.description,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar preferência de assinatura:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: data,
      });

      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || "Dados incompletos");
      }
      throw error;
    }
  },

  // Monitorar status da assinatura com polling melhorado
  monitorSubscriptionStatus: async (onStatusChange) => {
    let attempts = 0;
    const maxAttempts = 20; // Aumentar tentativas para 1 minuto
    const interval = 3000; // 3 segundos

    const checkStatus = async () => {
      try {
        const subscription = await paymentService.getSubscription();

        console.log("Status da assinatura:", subscription);

        if (subscription && subscription.status === "ACTIVE") {
          onStatusChange({
            ...subscription,
            success: true,
            message: "Assinatura ativada com sucesso!",
          });
          return true;
        }

        if (
          subscription &&
          (subscription.status === "CANCELLED" ||
            subscription.status === "REJECTED")
        ) {
          onStatusChange({
            ...subscription,
            success: false,
            message: "Assinatura cancelada ou rejeitada",
          });
          return true;
        }

        // Verificar se ainda está pendente
        if (subscription && subscription.status === "PENDING") {
          onStatusChange({
            ...subscription,
            success: null,
            message: "Processando pagamento...",
          });
        }

        return false;
      } catch (error) {
        console.error("Erro ao monitorar status da assinatura:", error);

        // Se erro 404, significa que não há assinatura ainda
        if (error.response?.status === 404) {
          return false;
        }

        // Outro erro, reportar
        onStatusChange({
          success: false,
          message: "Erro ao verificar status da assinatura",
        });
        return true;
      }
    };

    return new Promise((resolve) => {
      const intervalId = setInterval(async () => {
        attempts++;
        console.log(
          `Tentativa ${attempts}/${maxAttempts} de verificar assinatura`
        );

        const shouldStop = await checkStatus();

        if (shouldStop || attempts >= maxAttempts) {
          clearInterval(intervalId);

          if (attempts >= maxAttempts) {
            // Timeout - não conseguiu verificar
            onStatusChange({
              success: null,
              message:
                "Tempo limite atingido. Verifique sua assinatura na tela principal.",
            });
          }

          resolve();
        }
      }, interval);
    });
  },

  // Buscar método de pagamento configurado
  getPaymentMethod: async () => {
    try {
      const response = await api.get("/payments/payment-methods");
      return response;
    } catch (error) {
      console.error("Erro ao buscar método de pagamento:", error);
      throw error;
    }
  },

  // Adicionar novo método para buscar do prestador
  getProviderPaymentMethods: async (providerId) => {
    try {
      const response = await api.get(`/payments/payment-methods/${providerId}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar métodos do prestador:", error);
      throw error;
    }
  },

  // Configurar método de pagamento
  setupPaymentMethod: async (paymentMethods) => {
    try {
      console.log(paymentMethods);
      const response = await api.post("/payments/payment-methods", {
        paymentMethods,
      });
      return response;
    } catch (error) {
      console.error("Erro ao configurar método de pagamento:", error);
      throw error;
    }
  },
};

const handleApiError = (error) => {
  console.error("Erro na API:", error);
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw error;
};

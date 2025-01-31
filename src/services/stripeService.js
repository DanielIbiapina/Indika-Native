import api from "./api";

export const stripeService = {
  // Pagamentos (para clientes)
  createPayment: async ({ orderId, amount }) => {
    try {
      const response = await api.post("/stripe/create", {
        orderId,
        amount,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      throw error;
    }
  },

  // Connect (para prestadores)
  createConnectAccount: async () => {
    try {
      const response = await api.post("/stripe/connect/account");
      return response.data.accountLink;
    } catch (error) {
      console.error("Erro ao criar conta Connect:", error);
      throw error;
    }
  },

  getConnectAccountStatus: async () => {
    try {
      const response = await api.get("/stripe/connect/status");
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar status Connect:", error);
      throw error;
    }
  },

  // Carteira e Saques
  getStripeBalance: async () => {
    try {
      const response = await api.get("/stripe/balance");
      return response.data;
    } catch (error) {
      console.error("Erro ao obter saldo Stripe:", error);
      throw error;
    }
  },

  createPayout: async (amount) => {
    try {
      const response = await api.post("/stripe/payouts", { amount });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar saque:", error);
      throw error;
    }
  },
};

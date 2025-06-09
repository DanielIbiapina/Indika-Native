export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  WAITING_CONFIRMATION: "WAITING_CONFIRMATION",
  CLIENT_CONFIRMED: "CLIENT_CONFIRMED",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
};

export const PAYMENT_METHOD = {
  PIX: "PIX",
  CASH: "CASH",
  MERCADOPAGO: "MERCADOPAGO",
};

export const PAYMENT_STATUS_LABELS = {
  PENDING: "Aguardando pagamento",
  WAITING_CONFIRMATION: "Aguardando confirmação",
  CLIENT_CONFIRMED: "Aguardando confirmação do prestador",
  COMPLETED: "Pagamento confirmado",
  FAILED: "Pagamento falhou",
  CANCELLED: "Pagamento cancelado",
  REFUNDED: "Pagamento reembolsado",
};

// Mapeamento de status de pagamento para status de pedido
export const PAYMENT_TO_ORDER_STATUS = {
  PENDING: "PAYMENT_PENDING",
  WAITING_CONFIRMATION: "PAYMENT_PENDING",
  CLIENT_CONFIRMED: "PAYMENT_PENDING",
  COMPLETED: "PAID",
  FAILED: "PAYMENT_PENDING",
  CANCELLED: "CANCELLED",
  REFUNDED: "CANCELLED",
};

// Validações de método de pagamento
export const PAYMENT_METHOD_CONFIG = {
  [PAYMENT_METHOD.PIX]: {
    requiresConfirmation: true,
    allowsInstallments: false,
    requiresProviderConfirmation: true,
  },
  [PAYMENT_METHOD.CASH]: {
    requiresConfirmation: true,
    allowsInstallments: false,
    requiresProviderConfirmation: true,
  },
  [PAYMENT_METHOD.MERCADOPAGO]: {
    requiresConfirmation: false,
    allowsInstallments: true,
    requiresProviderConfirmation: false,
  },
};

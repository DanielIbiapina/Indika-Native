export const ORDER_STATUS = {
  WAITING_QUOTE: "WAITING_QUOTE",
  QUOTE_SENT: "QUOTE_SENT",
  QUOTE_REJECTED: "QUOTE_REJECTED",
  QUOTE_ACCEPTED: "QUOTE_ACCEPTED",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  PAID: "PAID",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_LABELS = {
  WAITING_QUOTE: "Aguardando orçamento",
  QUOTE_SENT: "Orçamento enviado",
  QUOTE_REJECTED: "Orçamento recusado",
  QUOTE_ACCEPTED: "Orçamento aceito",
  PAYMENT_PENDING: "Aguardando pagamento",
  PAID: "Pago",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

// Útil para validações e UI
export const ORDER_STATUS_FLOW = {
  QUOTE_PHASE: ["WAITING_QUOTE", "QUOTE_SENT", "QUOTE_REJECTED"],
  PAYMENT_PHASE: ["QUOTE_ACCEPTED", "PAYMENT_PENDING"],
  SERVICE_PHASE: ["PAID"],
  FINAL_PHASE: ["COMPLETED", "CANCELLED"],
};

export const MESSAGE_TYPES = {
  REQUEST: "REQUEST", // Solicitação inicial do cliente
  QUOTE: "QUOTE", // Orçamento do prestador
};

export const getStatusColor = (status) => {
  switch (status) {
    case ORDER_STATUS.WAITING_QUOTE:
      return "#FFA500"; // Laranja
    case ORDER_STATUS.QUOTE_SENT:
      return "#3498db"; // Azul
    case ORDER_STATUS.QUOTE_REJECTED:
      return "#e74c3c"; // Vermelho
    case ORDER_STATUS.QUOTE_ACCEPTED:
      return "#2ecc71"; // Verde
    case ORDER_STATUS.PAYMENT_PENDING:
      return "#f1c40f"; // Amarelo
    case ORDER_STATUS.PAID:
      return "#27ae60"; // Verde - Serviço realizado
    case ORDER_STATUS.COMPLETED:
      return "#34495e"; // Cinza escuro - Concluído
    case ORDER_STATUS.CANCELLED:
      return "#e74c3c"; // Vermelho
    default:
      return "#95a5a6"; // Cinza
  }
};

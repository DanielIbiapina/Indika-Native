export const ORDER_STATUS = {
  WAITING_QUOTE: "WAITING_QUOTE", // Cliente fez solicitação inicial
  QUOTE_SENT: "QUOTE_SENT", // Prestador enviou orçamento
  QUOTE_ACCEPTED: "QUOTE_ACCEPTED", // Cliente aceitou orçamento
  QUOTE_REJECTED: "QUOTE_REJECTED", // Orçamento foi recusado
};

export const ORDER_STATUS_LABELS = {
  WAITING_QUOTE: "Aguardando orçamento",
  QUOTE_SENT: "Orçamento enviado",
  QUOTE_ACCEPTED: "Orçamento aceito",
  QUOTE_REJECTED: "Orçamento recusado",
};

export const MESSAGE_TYPES = {
  REQUEST: "REQUEST", // Solicitação inicial do cliente
  QUOTE: "QUOTE", // Orçamento do prestador
};

export const getStatusColor = (status) => {
  switch (status) {
    case "WAITING_QUOTE":
      return "#FFA500"; // Laranja
    case "QUOTE_SENT":
      return "#0000FF"; // Azul
    case "QUOTE_REJECTED":
      return "#FF0000"; // Vermelho
    case "QUOTE_ACCEPTED":
      return "#008000"; // Verde
    default:
      return "#808080"; // Cinza padrão
  }
};

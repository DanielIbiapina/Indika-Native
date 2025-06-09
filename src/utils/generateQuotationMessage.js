import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MESSAGE_TYPES } from "../constants/orderStatus";
import { ORDER_STATUS } from "../constants/orderStatus";

export const generateWelcomeMessage = (providerName, clientId) => {
  return {
    type: "system",
    senderId: null, // Mensagem neutra do sistema
    content: {
      messageType: "welcome",
      text: `Olá! Você iniciou uma conversa com ${providerName}. 
      \nAguarde enquanto o prestador analisa sua solicitação e envia um orçamento. 
      \nVocê pode aproveitar para detalhar melhor sua necessidade ou fazer perguntas.`,
    },
    createdAt: new Date().toISOString(), // Garantir timestamp atual
  };
};

export const generateQuotationMessage = (
  orderData,
  service,
  type = MESSAGE_TYPES.REQUEST,
  senderId = null
) => {
  console.log("generateQuotationMessage - orderData:", orderData); // Debug

  const formattedDate = format(
    new Date(orderData.scheduledDate),
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );
  const formattedTime = orderData.specificTime
    ? format(new Date(orderData.scheduledDate), "HH:mm", { locale: ptBR })
    : null;

  const getPeriodText = (period) =>
    ({
      morning: "Manhã",
      afternoon: "Tarde",
      night: "Noite",
    }[period] || "");

  // Dados básicos que aparecem em ambos os tipos de mensagem
  const baseContent = {
    orderId: orderData.orderId || orderData.id,
    serviceId: service.id,
    serviceName: service.title,
    scheduledDate: orderData.scheduledDate,
    formattedDate,
    period: orderData.period,
    formattedPeriod: getPeriodText(orderData.period),
    specificTime: orderData.specificTime,
    formattedTime,
    description: orderData.description || "",
    messageType: type,
    status: orderData.status || ORDER_STATUS.WAITING_QUOTE,
  };

  // Adiciona o preço apenas se for uma mensagem de orçamento do prestador
  if (type === MESSAGE_TYPES.QUOTE) {
    return {
      type: "quotation",
      senderId: orderData.providerId, // Orçamento vem do prestador
      content: JSON.stringify({
        ...baseContent,
        price: orderData.price,
        id: orderData.id,
      }),
      createdAt: new Date().toISOString(),
    };
  }

  // Mensagem inicial de solicitação (sem preço) - vem do cliente
  return {
    type: "quotation",
    senderId: senderId || orderData.clientId, // Solicitação vem do cliente
    content: JSON.stringify(baseContent),
    createdAt: new Date().toISOString(),
  };
};

export default generateWelcomeMessage;

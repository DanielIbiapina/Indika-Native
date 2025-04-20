import React, { useState, useEffect } from "react";
import {
  QuotationContainer,
  QuotationHeader,
  QuotationTitle,
  QuotationStatus,
  StatusText,
  QuotationDetails,
  DetailRow,
  DetailLabel,
  DetailValue,
  Description,
  ButtonsContainer,
  ActionButton,
  ButtonText,
  StatusIcon,
  ButtonIcon,
} from "./styles";
import {
  MESSAGE_TYPES,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from "../../constants/orderStatus";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { useOrder } from "../../contexts/orderContext";

const getStatusIcon = (status) => {
  switch (status) {
    case ORDER_STATUS.WAITING_QUOTE:
      return "time-outline";
    case ORDER_STATUS.QUOTE_SENT:
      return "document-text-outline";
    case ORDER_STATUS.QUOTE_ACCEPTED:
      return "checkmark-circle-outline";
    case ORDER_STATUS.QUOTE_REJECTED:
      return "close-circle-outline";
    default:
      return "help-circle-outline";
  }
};

const QuotationMessage = ({
  message,
  isProvider,
  setIsProvider,
  onAccept,
  onReject,
  orderId,
  userId,
}) => {
  const navigation = useNavigation();
  const { activeOrder, getOrderDetails } = useOrder();
  const [loading, setLoading] = useState(false);

  console.log("message", message);
  console.log("isProvider", isProvider);
  console.log("orderId", orderId);
  console.log("activeOrder", activeOrder);

  const quotationData =
    typeof message.content === "string"
      ? JSON.parse(message.content)
      : message.content;

  useEffect(() => {
    if (orderId && !activeOrder) {
      getOrderDetails(orderId);
    }
    setIsProvider(activeOrder?.providerId === userId);
    console.log("oi");
  }, [orderId]);

  // Mostrar botão de enviar orçamento se:
  // - É uma solicitação inicial E
  // - É o prestador E
  // - O pedido está aguardando orçamento OU foi rejeitado
  const shouldShowQuoteButton =
    quotationData.messageType === MESSAGE_TYPES.REQUEST &&
    isProvider &&
    (activeOrder?.status === ORDER_STATUS.WAITING_QUOTE ||
      activeOrder?.status === ORDER_STATUS.QUOTE_REJECTED);

  // Mostrar botões de aceitar/rejeitar se:
  // - É uma mensagem de orçamento E
  // - É o cliente E
  // - O orçamento está enviado (não foi aceito/rejeitado ainda)
  const shouldShowActionButtons =
    quotationData.messageType === MESSAGE_TYPES.QUOTE &&
    !isProvider &&
    activeOrder?.status === ORDER_STATUS.QUOTE_SENT;

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Se não temos activeOrder, buscar os dados
      const orderData =
        activeOrder || (await getOrderDetails(quotationData.orderId));

      if (!orderData) {
        throw new Error("Não foi possível obter os dados do pedido");
      }

      navigation.navigate("ProcessarPagamento", {
        orderId: quotationData.orderId,
        amount: quotationData.price,
        serviceTitle: quotationData.serviceName,
        providerId: orderData.providerId,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível iniciar o pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuotationContainer
      status={
        quotationData.messageType === MESSAGE_TYPES.REQUEST
          ? ORDER_STATUS.WAITING_QUOTE
          : activeOrder?.status
      }
      messageType={quotationData.messageType}
      testID="quotation-message"
    >
      <QuotationHeader>
        <QuotationTitle>
          {quotationData.messageType === MESSAGE_TYPES.REQUEST
            ? "Solicitação de Agendamento"
            : "Orçamento do Serviço"}
        </QuotationTitle>
        {quotationData.messageType === MESSAGE_TYPES.QUOTE && (
          <QuotationStatus status={activeOrder?.status}>
            <StatusIcon
              name={getStatusIcon(activeOrder?.status)}
              size={16}
              status={activeOrder?.status}
            />
            <StatusText status={activeOrder?.status}>
              {ORDER_STATUS_LABELS[activeOrder?.status]}
            </StatusText>
          </QuotationStatus>
        )}
      </QuotationHeader>

      <QuotationDetails>
        <DetailRow>
          <DetailLabel>Serviço</DetailLabel>
          <DetailValue>{quotationData.serviceName}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Data</DetailLabel>
          <DetailValue>{quotationData.formattedDate}</DetailValue>
        </DetailRow>

        {!quotationData.specificTime && (
          <DetailRow>
            <DetailLabel>Período</DetailLabel>
            <DetailValue>{quotationData.formattedPeriod}</DetailValue>
          </DetailRow>
        )}

        {quotationData.specificTime && quotationData.formattedTime && (
          <DetailRow>
            <DetailLabel>Horário</DetailLabel>
            <DetailValue>{quotationData.formattedTime}</DetailValue>
          </DetailRow>
        )}

        {quotationData.messageType === MESSAGE_TYPES.QUOTE && (
          <DetailRow>
            <DetailLabel>Valor</DetailLabel>
            <DetailValue>
              R${" "}
              {quotationData.price?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </DetailValue>
          </DetailRow>
        )}

        {/*{quotationData.description && (
          <Description>{quotationData.description}</Description>
        )}*/}
      </QuotationDetails>

      {shouldShowQuoteButton && (
        <ButtonsContainer>
          <ActionButton
            variant="accept"
            onPress={() => onAccept(message)}
            testID="accept-button"
          >
            <ButtonIcon name="create-outline" size={18} />
            <ButtonText>Enviar Orçamento</ButtonText>
          </ActionButton>
        </ButtonsContainer>
      )}

      {shouldShowActionButtons && (
        <ButtonsContainer>
          <ActionButton
            variant="accept"
            onPress={() => onAccept(message)}
            testID="accept-button"
          >
            <ButtonIcon name="checkmark-outline" size={18} />
            <ButtonText>Aceitar</ButtonText>
          </ActionButton>
          <ActionButton
            variant="reject"
            onPress={() => onReject(message)}
            testID="reject-button"
          >
            <ButtonIcon name="close-outline" size={18} />
            <ButtonText>Rejeitar</ButtonText>
          </ActionButton>
        </ButtonsContainer>
      )}

      {activeOrder?.status === ORDER_STATUS.QUOTE_ACCEPTED &&
        quotationData.messageType === MESSAGE_TYPES.QUOTE &&
        !isProvider && (
          <ActionButton
            variant="accept"
            onPress={handlePayment}
            disabled={!activeOrder?.providerId} // Desabilitar se não tiver providerId
          >
            <ButtonIcon name="card-outline" size={18} />
            <ButtonText>Ir para pagamento</ButtonText>
          </ActionButton>
        )}
    </QuotationContainer>
  );
};

export default React.memo(QuotationMessage);

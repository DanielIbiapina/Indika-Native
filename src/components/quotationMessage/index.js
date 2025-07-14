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
import { Alert, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useOrder } from "../../contexts/orderContext";
import { paymentService } from "../../services/paymentService";
import { emitOrderStatusUpdated } from "../../utils/eventEmitter";

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
  isOwn,
  orderData,
  onRefresh,
}) => {
  const navigation = useNavigation();
  const { activeOrder, getOrderDetails } = useOrder();
  const [loading, setLoading] = useState(false);

  const quotationData =
    typeof message.content === "string"
      ? JSON.parse(message.content)
      : message.content;

  // Usar orderData se disponível, senão usar activeOrder
  const currentOrder = orderData || activeOrder;

  useEffect(() => {
    if (orderId && !activeOrder) {
      getOrderDetails(orderId);
    }
    setIsProvider(activeOrder?.providerId === userId);
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

      const orderData =
        activeOrder || (await getOrderDetails(quotationData.orderId));

      if (!orderData) {
        throw new Error("Não foi possível obter os dados do pedido");
      }

      // Ir diretamente para a tela de confirmação de pagamento
      navigation.navigate("ConfirmarPagamento", {
        orderId: quotationData.orderId,
        amount: quotationData.price,
        serviceTitle: quotationData.serviceName,
        providerId: orderData.providerId,
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível iniciar o pagamento"
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para navegar para detalhes do pedido
  const handleNavigateToDetails = () => {
    const orderIdToUse = quotationData.orderId || orderId;
    if (orderIdToUse) {
      navigation.navigate("PedidoDetalhes", {
        orderId: orderIdToUse,
      });
    } else {
      Alert.alert("Aviso", "Não foi possível encontrar os detalhes do pedido");
    }
  };

  // ADICIONAR: função para confirmar recebimento
  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      console.log("=== CONFIRMAR PAGAMENTO NO CHAT ===");

      // ✅ NOVO: Usar a mesma lógica que funciona no pedidoDetalhes
      const allPayments = await paymentService.getPaymentHistory();
      console.log("Todos os pagamentos:", allPayments);

      // Encontrar o pagamento deste pedido
      const orderIdToUse = quotationData.orderId || orderId;
      const orderPayment = allPayments.find(
        (payment) => payment.orderId === orderIdToUse
      );

      if (!orderPayment) {
        Alert.alert("Erro", "Nenhum pagamento encontrado para este pedido");
        return;
      }

      console.log("Payment encontrado:", orderPayment);

      // Confirmar recebimento
      await paymentService.confirmDirectPayment(orderPayment.id);
      Alert.alert("Sucesso", "Pagamento confirmado com sucesso!");

      // ✅ NOVO: Atualizar dados como no pedidoDetalhes
      if (onRefresh) {
        await onRefresh();
      }

      // ✅ NOVO: Emitir evento para atualizar outras telas
      if (currentOrder) {
        emitOrderStatusUpdated(currentOrder);
      }
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      Alert.alert(
        "Erro",
        error.message || "Não foi possível confirmar o pagamento"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        alignItems: isOwn ? "flex-end" : "flex-start",
        marginHorizontal: 8,
        width: "100%",
      }}
    >
      <QuotationContainer
        status={
          quotationData.messageType === MESSAGE_TYPES.REQUEST
            ? ORDER_STATUS.WAITING_QUOTE
            : activeOrder?.status
        }
        messageType={quotationData.messageType}
        isOwn={isOwn}
        testID="quotation-message"
      >
        <QuotationHeader>
          <QuotationTitle>
            {quotationData.messageType === MESSAGE_TYPES.REQUEST
              ? "Solicitação de Agendamento"
              : "Orçamento do Serviço"}
          </QuotationTitle>

          {/* Adicionar setinha para ir aos detalhes */}
          <TouchableOpacity
            onPress={handleNavigateToDetails}
            style={{
              padding: 4,
              marginLeft: 8,
              borderRadius: 12,
              backgroundColor: "rgba(66, 38, 128, 0.1)",
            }}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#422680"
            />
          </TouchableOpacity>

          {/*{quotationData.messageType === MESSAGE_TYPES.QUOTE && (
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
          )}*/}
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
              disabled={!activeOrder?.providerId}
            >
              <ButtonIcon name="card-outline" size={18} />
              <ButtonText>Realizar Pagamento</ButtonText>
            </ActionButton>
          )}

        {/* NOVO: Botão "Confirmar Recebimento" para prestador */}
        {(activeOrder?.status === "PAYMENT_PENDING" ||
          activeOrder?.status === "CLIENT_CONFIRMED") &&
          quotationData.messageType === MESSAGE_TYPES.QUOTE &&
          isProvider && (
            <ActionButton
              variant="accept"
              onPress={handleConfirmPayment}
              disabled={loading}
            >
              <ButtonIcon name="checkmark-circle-outline" size={18} />
              <ButtonText>
                {loading ? "Confirmando..." : "Confirmar Recebimento"}
              </ButtonText>
            </ActionButton>
          )}
      </QuotationContainer>
    </View>
  );
};

export default React.memo(QuotationMessage);

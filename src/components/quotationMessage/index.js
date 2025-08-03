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
import { useToast } from "../../hooks/useToast";
import { orderService } from "../../services/orderService";

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
  orderId,
  userId,
  isOwn,
  orderData, // ✅ Usar este que já vem atualizado
  onRefresh,
  onAccept, // ✅ ADICIONAR esta prop
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const quotationData =
    typeof message.content === "string"
      ? JSON.parse(message.content)
      : message.content;

  // ✅ SIMPLES: Usar orderData diretamente
  const currentOrder = orderData;

  // Lógica dos botões (manter como está)
  const shouldShowQuoteButton =
    quotationData.messageType === MESSAGE_TYPES.REQUEST &&
    isProvider &&
    currentOrder &&
    (currentOrder.status === ORDER_STATUS.WAITING_QUOTE ||
      currentOrder.status === ORDER_STATUS.QUOTE_REJECTED);

  const shouldShowActionButtons =
    quotationData.messageType === MESSAGE_TYPES.QUOTE &&
    !isProvider &&
    currentOrder &&
    currentOrder.status === ORDER_STATUS.QUOTE_SENT;

  // Função original - apenas adicionar refresh no final
  const handleConfirmPayment = async () => {
    try {
      setLoading(true);

      const allPayments = await paymentService.getPaymentHistory();
      const orderPayment = allPayments.find(
        (payment) => payment.orderId === quotationData.orderId
      );

      if (!orderPayment) {
        showError(
          "Pagamento não encontrado! ❌",
          "Nenhum pagamento localizado"
        );
        return;
      }

      await paymentService.confirmDirectPayment(orderPayment.id);
      showSuccess("Pagamento confirmado! 💰", "Recebimento foi confirmado");

      // ✅ ÚNICA MUDANÇA: Atualizar dados
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      showError(
        "Erro no pagamento! ❌",
        "Não foi possível confirmar o recebimento"
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

  // ✅ CORREÇÃO: Aceitar orçamento com refresh
  const handleAcceptQuotation = async () => {
    try {
      setLoading(true);
      await orderService.acceptQuotation(quotationData.orderId);

      emitOrderStatusUpdated(currentOrder);

      // ✅ IMPORTANTE: Atualizar dados imediatamente
      if (onRefresh) {
        await onRefresh();
      }

      showSuccess("Orçamento aceito!", "Proposta foi aprovada com sucesso");
    } catch (error) {
      showError("Erro ao aceitar!", "Não foi possível aceitar o orçamento");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORREÇÃO: Rejeitar orçamento com refresh
  const handleRejectQuotation = async () => {
    try {
      setLoading(true);
      await orderService.rejectQuotation(quotationData.orderId);

      emitOrderStatusUpdated(currentOrder);

      // ✅ IMPORTANTE: Atualizar dados imediatamente
      if (onRefresh) {
        await onRefresh();
      }

      showSuccess("Orçamento rejeitado!", "Proposta foi recusada");
    } catch (error) {
      showError("Erro ao rejeitar!", "Não foi possível rejeitar o orçamento");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NOVA FUNÇÃO: Para cliente realizar pagamento
  const handlePayment = () => {
    console.log(currentOrder.quotations);
    const latestQuotation = currentOrder?.quotations?.[0];

    if (!latestQuotation) {
      showError("Erro", "Nenhum orçamento disponível para pagamento.");
      return;
    }

    navigation.navigate("ConfirmarPagamento", {
      orderId: quotationData.orderId,
      amount: latestQuotation.price,
      serviceTitle: currentOrder.service.title,
      providerId: currentOrder.providerId,
    });
  };

  // ✅ RENOMEAR: Função existente só para prestador
  const handleConfirmReceipt = async () => {
    try {
      setLoading(true);

      const allPayments = await paymentService.getPaymentHistory();
      const orderPayment = allPayments.find(
        (payment) => payment.orderId === quotationData.orderId
      );

      if (!orderPayment) {
        showError(
          "Pagamento não encontrado! ❌",
          "Nenhum pagamento localizado"
        );
        return;
      }

      await paymentService.confirmDirectPayment(orderPayment.id);
      showSuccess("Pagamento confirmado! 💰", "Recebimento foi confirmado");

      // ✅ IMPORTANTE: Emitir evento
      emitOrderStatusUpdated(currentOrder);

      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      showError(
        "Erro no pagamento! ❌",
        "Não foi possível confirmar o recebimento"
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
            : currentOrder?.status
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
              onPress={handleAcceptQuotation}
              disabled={loading}
            >
              <ButtonIcon name="checkmark-outline" size={18} />
              <ButtonText>Aceitar</ButtonText>
            </ActionButton>
            <ActionButton
              variant="reject"
              onPress={handleRejectQuotation}
              disabled={loading}
            >
              <ButtonIcon name="close-outline" size={18} />
              <ButtonText>Rejeitar</ButtonText>
            </ActionButton>
          </ButtonsContainer>
        )}

        {/* Botão para CLIENTE realizar pagamento */}
        {currentOrder?.status === ORDER_STATUS.QUOTE_ACCEPTED &&
          quotationData.messageType === MESSAGE_TYPES.QUOTE &&
          !isProvider && (
            <ActionButton
              variant="accept"
              onPress={handlePayment} // ✅ MUDANÇA: usar handlePayment
              disabled={loading}
            >
              <ButtonIcon name="card-outline" size={18} />
              <ButtonText>Realizar Pagamento</ButtonText>
            </ActionButton>
          )}

        {/* Botão para PRESTADOR confirmar recebimento */}
        {(currentOrder?.status === "PAYMENT_PENDING" ||
          currentOrder?.status === "CLIENT_CONFIRMED") &&
          quotationData.messageType === MESSAGE_TYPES.QUOTE &&
          isProvider && (
            <ActionButton
              variant="accept"
              onPress={handleConfirmReceipt} // ✅ MUDANÇA: usar handleConfirmReceipt
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

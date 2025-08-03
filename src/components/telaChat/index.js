import React, { useState, useEffect, useCallback, useRef } from "react";
import { Platform, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MessageItem from "../messageItem";
import {
  Container,
  MessageList,
  InputContainer,
  Input,
  SendButton,
  EmptyMessage,
  KeyboardAvoidingView,
  OrderButton,
  OrderButtonText,
  ChatHeader,
  ChatHeaderInfo,
  ChatHeaderName,
  ChatHeaderStatus,
  DateSeparator,
  DateSeparatorText,
  Avatar,
} from "./styles";
import QuotationMessage from "../quotationMessage";
import { useNavigation } from "@react-navigation/native";
import { orderService } from "../../services/orderService";
import { Alert } from "react-native";
import { serviceService } from "../../services/serviceService";
import { messageService } from "../../services/messageService";
import { generateQuotationMessage } from "../../utils/generateQuotationMessage";
import { MESSAGE_TYPES, ORDER_STATUS } from "../../constants/orderStatus";
import QuotationModal from "../quotationModal";
import OrderDetailsTooltip from "../orderDetailsTooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "../../hooks/useToast";
import { eventEmitter } from "../../utils/eventEmitter";
import { EVENTS } from "../../utils/eventEmitter";
import { paymentService } from "../../services/paymentService";

const TelaChat = ({
  messages,
  loading,
  newMessage,
  onChangeMessage,
  onSendMessage,
  onLoadMore,
  userId,
  flatListRef,
  orderId,
  onStatusUpdate,
  chatId,
  onRefresh,
  selectedChat,
}) => {
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isProvider, setIsProvider] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [quotationLoading, setQuotationLoading] = useState(false); // ✅ ADICIONAR esta linha
  const navigation = useNavigation();
  const { showSuccess, showError } = useToast();

  //console.log("messages", messages);
  //console.log("selectedChat", selectedChat);
  //console.log("orderId", orderId);
  //console.log("isProvider", isProvider);

  // Função para identificar o pedido atual baseado nas mensagens
  const identifyCurrentOrder = useCallback(() => {
    if (!messages || !selectedChat?.orders) return null;

    // Procura a mensagem mais recente do tipo quotation
    const quotationMessage = messages.find((msg) => msg.type === "quotation");
    if (quotationMessage) {
      try {
        const content =
          typeof quotationMessage.content === "string"
            ? JSON.parse(quotationMessage.content)
            : quotationMessage.content;
        return content.orderId;
      } catch (error) {
        console.error("Erro ao extrair orderId da mensagem:", error);
      }
    }

    // Se não encontrou nas mensagens, usa o pedido mais recente
    return selectedChat.orders[0]?.id || selectedChat.currentOrderId;
  }, [messages, selectedChat]);

  // useEffect para identificar e carregar o pedido atual
  useEffect(() => {
    let orderIdToUse = null;

    // Prioridade: orderId prop > currentOrderId do chat > identificado nas mensagens
    if (orderId) {
      orderIdToUse = orderId;
    } else if (selectedChat?.currentOrderId) {
      orderIdToUse = selectedChat.currentOrderId;
    } else {
      // Identificar nas mensagens
      const quotationMessage = messages?.find(
        (msg) => msg.type === "quotation"
      );
      if (quotationMessage) {
        try {
          const content =
            typeof quotationMessage.content === "string"
              ? JSON.parse(quotationMessage.content)
              : quotationMessage.content;
          orderIdToUse = content.orderId;
        } catch (error) {
          console.error("Erro ao extrair orderId:", error);
        }
      }
    }

    // Se encontrou um orderId diferente do atual, atualiza
    if (orderIdToUse && orderIdToUse !== currentOrderId) {
      console.log("Atualizando orderId para:", orderIdToUse);
      setCurrentOrderId(orderIdToUse);
      loadOrderData(orderIdToUse);
    }
  }, [orderId, selectedChat?.currentOrderId, messages, currentOrderId]);

  // Verifica se deve mostrar o tooltip
  useEffect(() => {
    const checkTooltipStatus = async () => {
      try {
        const hasSeenTooltip = await AsyncStorage.getItem("hasSeenChatTooltip");
        if (!hasSeenTooltip) {
          setShowTooltip(true);
          await AsyncStorage.setItem("hasSeenChatTooltip", "true");
        }
      } catch (error) {
        console.error("Erro ao verificar status do tooltip:", error);
      }
    };

    checkTooltipStatus();
  }, []);

  // ✅ ADICIONAR: Listener para mudanças de status
  useEffect(() => {
    const handleOrderUpdate = (updatedOrder) => {
      if (updatedOrder.id === currentOrderId) {
        setOrderData(updatedOrder);
      }
    };

    eventEmitter.on(EVENTS.ORDER_STATUS_UPDATED, handleOrderUpdate);

    return () => {
      eventEmitter.removeListener(
        EVENTS.ORDER_STATUS_UPDATED,
        handleOrderUpdate
      );
    };
  }, [currentOrderId]);

  const handleQuotationAction = async (action, quotationMessage) => {
    try {
      const quotationData =
        typeof quotationMessage.content === "string"
          ? JSON.parse(quotationMessage.content)
          : quotationMessage.content;

      switch (action) {
        case "accept":
          if (
            isProvider &&
            quotationData.messageType === MESSAGE_TYPES.REQUEST
          ) {
            setSelectedQuotation({
              ...quotationData,
              orderId: quotationData.orderId, // Garantir que orderId está presente
            });
            setShowQuotationModal(true);
          } else if (
            !isProvider &&
            quotationData.messageType === MESSAGE_TYPES.QUOTE
          ) {
            await orderService.acceptQuotation(quotationData.orderId);
            if (onRefresh) {
              await onRefresh(1);
            }
            showSuccess("Orçamento aceito!", "Orçamento aceito com sucesso!");
          }
          break;

        case "reject":
          await orderService.rejectQuotation(quotationData.orderId);
          showSuccess(
            "Orçamento rejeitado!",
            "Orçamento rejeitado com sucesso!"
          );
          break;

        default:
          console.error("Ação não reconhecida:", action);
          break;
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
      showError(
        "Erro ao processar solicitação!",
        "Não foi possível processar sua solicitação"
      );
    }
  };

  const handleQuotationConfirm = async (quotationData) => {
    try {
      setQuotationLoading(true); // ✅ MUDANÇA: usar setQuotationLoading

      const quotationPayload = {
        ...quotationData,
        messageType: "QUOTE",
        message: quotationData.description,
      };

      // Primeiro, criar a cotação
      const newQuotation = await orderService.createQuotation(
        selectedQuotation.orderId,
        quotationPayload
      );

      // Aguardar um momento para garantir que a cotação foi salva
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Gerar mensagem com os dados corretos
      const quoteMessage = generateQuotationMessage(
        {
          ...newQuotation,
          description: quotationData.description,
          orderId: selectedQuotation.orderId, // Garantir que orderId está presente
          serviceId: selectedQuotation.serviceId,
          serviceName: selectedQuotation.serviceName,
        },
        {
          id: selectedQuotation.serviceId,
          title: selectedQuotation.serviceName,
        },
        "QUOTE"
      );

      // Enviar mensagem
      await messageService.sendMessage(chatId, quoteMessage);

      setShowQuotationModal(false);
      setSelectedQuotation(null);

      if (onRefresh) {
        await onRefresh(1);
      }

      showSuccess("Orçamento enviado!", "Orçamento enviado com sucesso!");
    } catch (error) {
      console.error("Erro detalhado:", error);
      if (error.response?.data?.message) {
        console.error("Resposta do servidor:", error.response.data);
      }
      showError(
        "Erro ao enviar orçamento!",
        "Não foi possível enviar o orçamento. Tente novamente."
      );
    } finally {
      setQuotationLoading(false); // ✅ MUDANÇA: usar setQuotationLoading
    }
  };

  const handleCloseModal = () => {
    setShowQuotationModal(false);
    setSelectedQuotation(null);
  };

  // ✅ ADICIONAR: Função para atualizar todas as quotations
  const refreshAllQuotations = useCallback(async () => {
    if (currentOrderId) {
      try {
        const updatedOrderData = await orderService.getOrder(currentOrderId);

        // 🔑 CORREÇÃO: Buscar quotations também no refresh
        try {
          const quotations = await orderService.getQuotations(currentOrderId);
          updatedOrderData.quotations = quotations;
        } catch (quotationError) {
          console.error(
            "Erro ao carregar cotações no refresh:",
            quotationError
          );
          updatedOrderData.quotations = [];
        }

        setOrderData(updatedOrderData);

        // Forçar re-render das mensagens
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error("Erro ao atualizar quotations:", error);
      }
    }
  }, [currentOrderId, onRefresh]);

  // ✅ CORREÇÃO: Atualizar renderMessage para passar refresh
  const renderMessage = ({ item, index }) => {
    const showDateSeparator =
      index === messages.length - 1 ||
      !isSameDay(
        new Date(item.createdAt),
        new Date(messages[index + 1]?.createdAt)
      );

    // Renderização especial para mensagem de sistema
    if (item.type === "system") {
      return (
        <>
          {showDateSeparator && (
            <DateSeparator>
              <DateSeparatorText>
                {format(new Date(item.createdAt), "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </DateSeparatorText>
            </DateSeparator>
          )}
          <View
            style={{
              alignItems: "center",
              marginVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "#e8f4fd",
                borderRadius: 16,
                padding: 16,
                maxWidth: "85%",
                borderWidth: 1,
                borderColor: "#b3d9f7",
                elevation: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }}
            >
              <Text
                style={{
                  color: "#2c5282",
                  textAlign: "center",
                  fontSize: 14,
                  lineHeight: 22,
                  fontStyle: "italic",
                }}
              >
                {typeof item.content === "string"
                  ? item.content
                  : item.content.text}
              </Text>
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        {showDateSeparator && (
          <DateSeparator>
            <DateSeparatorText>
              {format(new Date(item.createdAt), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </DateSeparatorText>
          </DateSeparator>
        )}
        {item.type === "quotation" ? (
          <QuotationMessage
            message={item}
            isProvider={isProvider}
            orderId={currentOrderId}
            userId={userId}
            isOwn={item.senderId === userId}
            orderData={orderData}
            onRefresh={refreshAllQuotations}
            onAccept={(message) => handleQuotationAction("accept", message)}
          />
        ) : (
          <MessageItem
            isOwn={item.senderId === userId}
            message={item}
            showTail={
              index === 0 || messages[index - 1]?.senderId !== item.senderId
            }
          />
        )}
      </>
    );
  };

  // ✅ ADICIONAR: Debounce para loadOrderData
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const loadOrderData = useCallback(
    async (orderIdToLoad) => {
      if (!orderIdToLoad || loadingOrderId === orderIdToLoad) return;

      try {
        setLoadingOrderId(orderIdToLoad);
        console.log("Carregando dados do pedido:", orderIdToLoad);

        const orderDetails = await orderService.getOrder(orderIdToLoad);

        // 🔑 CORREÇÃO: Buscar as quotations separadamente (igual ao pedidoDetalhes)
        try {
          const quotations = await orderService.getQuotations(orderIdToLoad);
          orderDetails.quotations = quotations; // ✅ Adiciona as cotações
        } catch (quotationError) {
          console.error("Erro ao carregar cotações:", quotationError);
          orderDetails.quotations = []; // ✅ Garante array vazio
        }

        console.log("Dados do pedido carregados:", orderDetails);

        setOrderData(orderDetails);
        setIsProvider(orderDetails.providerId === userId);
      } catch (error) {
        console.error("Erro ao carregar dados do pedido:", error);
      } finally {
        setLoadingOrderId(null);
      }
    },
    [userId, loadingOrderId]
  );

  // ✅ DEBUG: Limite para console.log
  const logCount = useRef(0);
  const MAX_LOGS = 100;

  const debugLog = (message, data) => {
    if (logCount.current < MAX_LOGS) {
      console.log(message, data);
      logCount.current++;
    } else if (logCount.current === MAX_LOGS) {
      console.warn("🚨 LIMITE DE LOGS ATINGIDO - POSSÍVEL LOOP INFINITO!");
      logCount.current++;
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MessageList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          renderItem={renderMessage}
          inverted={true}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <EmptyMessage>
              {loading ? "Carregando mensagens..." : "Nenhuma mensagem"}
            </EmptyMessage>
          }
        />

        <InputContainer>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChangeText={onChangeMessage}
            multiline
            testID="message-input"
          />
          <SendButton onPress={onSendMessage} testID="send-button">
            <Ionicons name="send" size={24} color="#fff" />
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>

      {showTooltip && (
        <OrderDetailsTooltip
          onClose={() => {
            setShowTooltip(false);
          }}
        />
      )}

      <QuotationModal
        isVisible={showQuotationModal}
        onClose={handleCloseModal}
        onConfirm={handleQuotationConfirm}
        initialData={selectedQuotation}
        loading={quotationLoading} // ✅ OPCIONAL: passar loading para o modal
      />
    </Container>
  );
};

export default TelaChat;

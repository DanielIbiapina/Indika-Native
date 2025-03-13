import React, { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";
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

const TelaChat = ({
  messages,
  loading,
  newMessage,
  onChangeMessage,
  onSendMessage,
  onLoadMore,
  userId,
  flatListRef,
  isProvider,
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
  const navigation = useNavigation();

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
    return selectedChat.orders[0]?.id;
  }, [messages, selectedChat]);

  // Atualiza o orderId atual quando as mensagens mudarem
  useEffect(() => {
    const newOrderId = identifyCurrentOrder();
    if (newOrderId) {
      setCurrentOrderId(newOrderId);
    }
  }, [messages, identifyCurrentOrder]);

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
            Alert.alert("Sucesso", "Orçamento aceito com sucesso!");
          }
          break;

        case "reject":
          await orderService.rejectQuotation(quotationData.orderId);
          Alert.alert("Aviso", "Orçamento rejeitado");
          break;

        default:
          console.error("Ação não reconhecida:", action);
          break;
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
      Alert.alert("Erro", "Não foi possível processar sua solicitação");
    }
  };

  const handleQuotationConfirm = async (quotationData) => {
    try {
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

      Alert.alert("Sucesso", "Orçamento enviado com sucesso!");
    } catch (error) {
      console.error("Erro detalhado:", error);
      if (error.response?.data?.message) {
        console.error("Resposta do servidor:", error.response.data);
      }
      Alert.alert(
        "Erro",
        "Não foi possível enviar o orçamento. Tente novamente."
      );
    }
  };

  const handleCloseModal = () => {
    setShowQuotationModal(false);
    setSelectedQuotation(null);
  };

  const renderMessage = ({ item, index }) => {
    const showDateSeparator =
      index === messages.length - 1 ||
      !isSameDay(
        new Date(item.createdAt),
        new Date(messages[index + 1]?.createdAt)
      );

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
            onAccept={() => handleQuotationAction("accept", item)}
            onReject={() => handleQuotationAction("reject", item)}
            orderId={currentOrderId}
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

  return (
    <Container>
      {showTooltip && (
        <OrderDetailsTooltip
          onClose={() => {
            setShowTooltip(false);
          }}
        />
      )}

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

      <QuotationModal
        isVisible={showQuotationModal}
        onClose={handleCloseModal}
        onConfirm={handleQuotationConfirm}
        initialData={selectedQuotation}
      />
    </Container>
  );
};

export default TelaChat;

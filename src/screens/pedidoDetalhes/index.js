import React, { useState, useEffect } from "react";
import { ScrollView, Alert, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/authContext";
import { useOrder } from "../../contexts/orderContext";
import { orderService } from "../../services/orderService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ORDER_STATUS_LABELS,
  getStatusColor,
} from "../../constants/orderStatus";
import {
  Container,
  Header,
  Section,
  SectionTitle,
  StatusBadge,
  StatusIcon,
  StatusText,
  InfoRow,
  Label,
  Value,
  UserInfo,
  Avatar,
  UserName,
  UserRole,
  ActionButton,
  ButtonText,
  ChatButton,
  ChatButtonText,
  QuotationCard,
  Price,
  Description,
  TimelineContainer,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineDate,
  TimelineText,
  ServiceTitle,
  StatusContainer,
  ActionsContainer,
  ActionIconButton,
  MainContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DetailRow,
  DetailLabel,
  DetailValue,
  UserCard,
  QuotationAmount,
  QuotationDate,
  QuotationDescription,
  QuotationActions,
  ActionButtonText,
} from "./styles";
import QuotationModal from "../../components/quotationModal";
import ErrorView from "../../components/errorView";
import EmptyView from "../../components/emptyView";
import QuotationHistoryModal from "../../components/quotationHistoryModal";
import { useTheme } from "@react-navigation/native";
import { messageService } from "../../services/messageService";
import { generateQuotationMessage } from "../../utils/generateQuotationMessage";

const PedidoDetalhes = ({ route }) => {
  const { orderId } = route.params;
  const { user } = useAuth();
  const navigation = useNavigation();
  const { activeOrder, setActiveOrder, orderUpdates, refreshOrder } =
    useOrder();
  const [loading, setLoading] = useState(true);
  const [isQuotationModalVisible, setIsQuotationModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [showQuotationHistory, setShowQuotationHistory] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (orderUpdates[orderId]) {
      refreshOrder(orderId);
    }
  }, [orderUpdates, orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await orderService.getOrder(orderId);
      setActiveOrder(orderData);
    } catch (error) {
      setError(
        "Não foi possível carregar os detalhes do pedido. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const isProvider = user?.id === activeOrder?.providerId;

  const handleChat = () => {
    navigation.navigate("Chat", {
      orderId: orderId,
      otherUser: isProvider ? activeOrder.client : activeOrder.provider,
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    try {
      return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return date.toString();
    }
  };

  const handleAcceptQuotation = async () => {
    try {
      await orderService.acceptQuotation(orderId);
      Alert.alert("Sucesso", "Orçamento aceito com sucesso!");
      loadOrderDetails();
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível aceitar o orçamento. Tente novamente."
      );
    }
  };

  const handleRejectQuotation = async () => {
    Alert.alert(
      "Rejeitar Orçamento",
      "Tem certeza que deseja rejeitar este orçamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: async () => {
            try {
              await orderService.rejectQuotation(orderId);
              Alert.alert("Sucesso", "Orçamento rejeitado com sucesso!");
              loadOrderDetails();
            } catch (error) {
              Alert.alert(
                "Erro",
                "Não foi possível rejeitar o orçamento. Tente novamente."
              );
            }
          },
        },
      ]
    );
  };

  const handleSendQuotation = async (quotationData) => {
    try {
      const quotationPayload = {
        ...quotationData,
        messageType: "QUOTE",
        message: quotationData.description,
      };

      const quotation = await orderService.createQuotation(
        orderId,
        quotationPayload
      );

      const chatMessage = generateQuotationMessage(
        { ...quotation, description: quotationData.description },
        activeOrder.service,
        "QUOTE"
      );

      await messageService.sendMessage(activeOrder.chatId, chatMessage);

      setIsQuotationModalVisible(false);
      Alert.alert("Sucesso", "Orçamento enviado com sucesso!");
      loadOrderDetails();
    } catch (error) {
      console.error("Erro ao enviar orçamento:", error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o orçamento. Tente novamente."
      );
    }
  };

  const handlePayment = () => {
    const latestQuotation = activeOrder.quotations[0];

    navigation.navigate("ProcessarPagamento", {
      orderId: activeOrder.id,
      amount: latestQuotation.price,
      serviceTitle: activeOrder.service.title,
      providerId: activeOrder.providerId,
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "WAITING_QUOTE":
        return "time-outline";
      case "QUOTE_SENT":
        return "document-text-outline";
      case "QUOTE_ACCEPTED":
        return "checkmark-circle-outline";
      case "QUOTE_REJECTED":
        return "close-circle-outline";
      default:
        return "help-circle-outline";
    }
  };

  const renderCurrentQuotation = () => {
    if (!activeOrder.quotations?.length) return null;

    const latestQuotation = activeOrder.quotations[0];

    return (
      <QuotationCard status={activeOrder.status}>
        <CardHeader>
          <CardTitle>Orçamento Atual</CardTitle>
          <StatusBadge status={activeOrder.status}>
            <Ionicons
              name={getStatusIcon(activeOrder.status)}
              size={16}
              color={getStatusColor(activeOrder.status)}
            />
            <StatusText status={activeOrder.status}>
              {ORDER_STATUS_LABELS[activeOrder.status]}
            </StatusText>
          </StatusBadge>
        </CardHeader>
        <CardContent>
          <QuotationAmount>
            R$ {latestQuotation.price.toFixed(2)}
          </QuotationAmount>
          <QuotationDate>
            Enviado em{" "}
            {format(
              new Date(latestQuotation.createdAt),
              "dd 'de' MMMM 'às' HH:mm",
              {
                locale: ptBR,
              }
            )}
          </QuotationDate>
          {latestQuotation.message && (
            <QuotationDescription>
              {latestQuotation.message}
            </QuotationDescription>
          )}

          {!isProvider && activeOrder.status === "QUOTE_SENT" && (
            <QuotationActions>
              <ActionButton variant="primary" onPress={handleAcceptQuotation}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <ActionButtonText hasIcon>Aceitar</ActionButtonText>
              </ActionButton>
              <ActionButton variant="secondary" onPress={handleRejectQuotation}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <ActionButtonText variant="secondary" hasIcon>
                  Rejeitar
                </ActionButtonText>
              </ActionButton>
            </QuotationActions>
          )}

          {!isProvider && activeOrder.status === "QUOTE_ACCEPTED" && (
            <ActionButton variant="primary" onPress={handlePayment}>
              <Ionicons name="card" size={20} color="#fff" />
              <ActionButtonText hasIcon>Realizar Pagamento</ActionButtonText>
            </ActionButton>
          )}
        </CardContent>
      </QuotationCard>
    );
  };

  const renderTimeline = () => {
    const events = [
      {
        status: activeOrder.status,
        date: new Date(),
        text: ORDER_STATUS_LABELS[activeOrder.status],
      },
      ...(activeOrder.quotations?.map((quote) => ({
        status: "QUOTE_SENT",
        date: new Date(quote.createdAt),
        text: `Orçamento enviado: R$ ${quote.price.toFixed(2)}`,
      })) || []),
      {
        status: "WAITING_QUOTE",
        date: new Date(activeOrder.createdAt),
        text: "Pedido criado",
      },
    ].sort((a, b) => b.date - a.date);

    return (
      <TimelineContainer>
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineDot status={event.status} />
            <TimelineContent>
              <TimelineDate>
                {format(event.date, "dd 'de' MMMM 'às' HH:mm", {
                  locale: ptBR,
                })}
              </TimelineDate>
              <TimelineText>{event.text}</TimelineText>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    );
  };

  const hasMultipleQuotations = activeOrder?.quotations?.length > 1;

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#422680" />
      </Container>
    );
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadOrderDetails} />;
  }

  if (!activeOrder) {
    return (
      <EmptyView
        message="Pedido não encontrado"
        onBack={() => navigation.goBack()}
      />
    );
  }

  return (
    <Container>
      <Header>
        <ServiceTitle>{activeOrder.service.title}</ServiceTitle>
        <StatusContainer>
          <StatusBadge status={activeOrder.status}>
            <Ionicons
              name={getStatusIcon(activeOrder.status)}
              size={18}
              color={getStatusColor(activeOrder.status)}
            />
            <StatusText status={activeOrder.status}>
              {ORDER_STATUS_LABELS[activeOrder.status]}
            </StatusText>
          </StatusBadge>
          <ActionsContainer>
            <ActionIconButton onPress={handleChat}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={theme.colors.primary}
              />
            </ActionIconButton>
            {hasMultipleQuotations && (
              <ActionIconButton onPress={() => setShowQuotationHistory(true)}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              </ActionIconButton>
            )}
          </ActionsContainer>
        </StatusContainer>
      </Header>

      <MainContent>
        {renderCurrentQuotation()}

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailRow>
              <DetailLabel>Data</DetailLabel>
              <DetailValue>{formatDate(activeOrder.scheduledDate)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Período</DetailLabel>
              <DetailValue>
                {activeOrder.period === "morning"
                  ? "Manhã"
                  : activeOrder.period === "afternoon"
                  ? "Tarde"
                  : "Noite"}
              </DetailValue>
            </DetailRow>
            {activeOrder.description && (
              <DetailRow last>
                <DetailLabel>Observações</DetailLabel>
                <DetailValue>{activeOrder.description}</DetailValue>
              </DetailRow>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <UserCard
              onPress={() =>
                navigation.navigate("PerfilVisitante", {
                  profileId: activeOrder.provider.id,
                })
              }
            >
              <Avatar source={{ uri: activeOrder.provider.avatar }} />
              <UserInfo>
                <UserName>{activeOrder.provider.name}</UserName>
                <UserRole>Prestador</UserRole>
              </UserInfo>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.text.secondary}
              />
            </UserCard>
            <UserCard
              onPress={() =>
                navigation.navigate("PerfilVisitante", {
                  profileId: activeOrder.client.id,
                })
              }
            >
              <Avatar source={{ uri: activeOrder.client.avatar }} />
              <UserInfo>
                <UserName>{activeOrder.client.name}</UserName>
                <UserRole>Cliente</UserRole>
              </UserInfo>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.text.secondary}
              />
            </UserCard>
          </CardContent>
        </Card>

        {isProvider &&
          (activeOrder.status === "WAITING_QUOTE" ||
            activeOrder.status === "QUOTE_REJECTED") && (
            <ActionButton
              variant="primary"
              onPress={() => setIsQuotationModalVisible(true)}
            >
              <Ionicons name="create" size={20} color="#fff" />
              <ActionButtonText hasIcon>Enviar Orçamento</ActionButtonText>
            </ActionButton>
          )}
      </MainContent>

      <QuotationModal
        isVisible={isQuotationModalVisible}
        onClose={() => setIsQuotationModalVisible(false)}
        onConfirm={handleSendQuotation}
        initialData={activeOrder}
      />

      <QuotationHistoryModal
        isVisible={showQuotationHistory}
        onClose={() => setShowQuotationHistory(false)}
        quotations={activeOrder?.quotations || []}
      />
    </Container>
  );
};

export default PedidoDetalhes;

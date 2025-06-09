import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator, View } from "react-native";
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
  StatusBadge,
  StatusText,
  ServiceInfoContainer,
  ServiceTitle,
  Avatar,
  UserName,
  UserRole,
  ActionButton,
  QuotationCard,
  ServiceInfo,
  MainContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DetailRow,
  DetailLabel,
  DetailLabelText,
  DetailValue,
  UserCard,
  QuotationAmount,
  QuotationDate,
  QuotationDescription,
  QuotationActions,
  ActionButtonText,
  HeaderContainer,
  ActionIconButton,
  IconWithText,
  IconLabel,
  TabHeader,
  TabButton,
  TabButtonText,
  HighlightedInfo,
  HighlightedValue,
  HighlightedLabel,
  SubActionButton,
  SubActionButtonText,
  ServiceImage,
  ServiceImageContainer,
  AddressContainer,
  AddressText,
  LocationIcon,
  StickyFooter,
  CategoryBadge,
  CategoryText,
  ProgressWrapper,
  ProgressContainer,
  ProgressLine,
  ProgressStage,
  ProgressStageCircle,
  ProgressStageText,
  HistoryItem,
  HistoryItemHeader,
  HistoryItemStatus,
  HistoryItemDate,
  HistoryItemContent,
  HistoryItemAmount,
  HistoryItemDetail,
  NoHistoryText,
  UserInfoContainer,
  UserInfoTitle,
  UserInfoRow,
  ReviewSummary,
  RatingContainer,
  RatingText,
  RatingCount,
  UserInfoIcon,
  UserInfoText,
  ActionQuotationButton,
  ActionQuotationButtonText,
  ServiceInfoSection,
  ScheduleHighlight,
  ScheduleIcon,
  ScheduleInfo,
  ScheduleDate,
  SchedulePeriod,
  DetailsSection,
  ObservationsCard,
  ObservationsTitle,
  ObservationsTitleText,
  ObservationsText,
  CancelledContainer,
  CancelledText,
  CancelledReason,
  QuotationDetailsSection,
  QuotationPrice,
  QuotationDescriptionCard,
  QuotationDescriptionTitle,
  QuotationDescriptionTitleText,
  QuotationValueContainer,
  QuotationValueMain,
  QuotationValueLabel,
  QuotationDetailsGrid,
  QuotationDetailItem,
  QuotationDetailIcon,
  QuotationDetailContent,
  QuotationDetailLabel,
  QuotationDetailValue,
  QuotationMessageCard,
  QuotationMessageTitle,
  QuotationMessageText,
  QuotationButtonsContainer,
  QuotationAcceptButton,
  QuotationRejectButton,
  QuotationButtonText,
  ServiceHeaderSection,
  ServiceHeaderInfo,
  ServiceDetailsGrid,
  ServiceDetailItem,
  ServiceDetailIcon,
  ServiceDetailContent,
  ServiceDetailLabel,
  ServiceDetailValue,
  ClientObservationsCard,
  ClientObservationsHeader,
  ClientObservationsTitle,
  ClientObservationsText,
  QuotationRejectButtonText,
  ClientRequestBadge,
  ClientRequestBadgeText,
  ClientRequestGrid,
  ClientRequestItem,
  ClientRequestIcon,
  ClientRequestContent,
  ClientRequestLabel,
  ClientRequestValue,
  ClientRequestNote,
  ClientRequestNoteHeader,
  ClientRequestNoteTitle,
  ClientRequestNoteText,
  ClientRequestFooter,
  ClientRequestDate,
} from "./styles";
import QuotationModal from "../../components/quotationModal";
import ErrorView from "../../components/errorView";
import EmptyView from "../../components/emptyView";
import { useTheme } from "@react-navigation/native";
import { generateQuotationMessage } from "../../utils/generateQuotationMessage";
import { messageService } from "../../services/messageService";
import { chatService } from "../../services/chatService";
import { paymentService } from "../../services/paymentService";

const PedidoDetalhes = ({ route }) => {
  const { orderId } = route.params;
  const { user } = useAuth();
  const navigation = useNavigation();
  const { activeOrder, setActiveOrder, orderUpdates, refreshOrder } =
    useOrder();
  const [loading, setLoading] = useState(true);
  const [isQuotationModalVisible, setIsQuotationModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [quotationHistory, setQuotationHistory] = useState([]);
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (activeTab === "history") {
      loadQuotationHistory();
    }
  }, [activeTab]);

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

      // Buscar as cotações e adicionar ao orderData
      try {
        const quotations = await orderService.getQuotations(orderId);
        orderData.quotations = quotations; // Adiciona as cotações ao objeto do pedido
      } catch (quotationError) {
        console.error("Erro ao carregar cotações:", quotationError);
        orderData.quotations = []; // Garante que sempre exista um array vazio de cotações
      }

      setActiveOrder(orderData);
      console.log(orderData);
    } catch (error) {
      setError(
        "Não foi possível carregar os detalhes do pedido. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadQuotationHistory = async () => {
    try {
      setHistoryLoading(true);
      const history = await orderService.getQuotations(orderId);

      setQuotationHistory(history);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const isProvider = user?.id === activeOrder?.providerId;

  const handleChat = () => {
    if (isProvider) {
      navigation.navigate("Mensagens", {
        clientId: activeOrder?.clientId,
        orderId: activeOrder?.id,
        order: activeOrder,
      });
    } else {
      navigation.navigate("Mensagens", {
        providerId: activeOrder?.providerId,
        orderId: activeOrder?.id,
        order: activeOrder,
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    try {
      return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return date.toString();
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "";
    try {
      return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
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

      const chat = await chatService.createChat(activeOrder.clientId);
      await messageService.sendMessage(chat.id, chatMessage);

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
    const latestQuotation = activeOrder?.quotations?.[0];

    if (!latestQuotation) {
      Alert.alert("Erro", "Nenhum orçamento disponível para pagamento.");
      return;
    }

    navigation.navigate("ConfirmarPagamento", {
      orderId: activeOrder.id,
      amount: latestQuotation.price,
      serviceTitle: activeOrder.service.title,
      providerId: activeOrder.providerId,
    });
  };

  const handleConfirmPayment = async () => {
    try {
      console.log("=== BUSCAR PAYMENT SEPARADAMENTE ===");

      // Buscar todos os pagamentos do usuário
      const allPayments = await paymentService.getPaymentHistory();
      console.log("Todos os pagamentos:", allPayments);

      // Encontrar o pagamento deste pedido
      const orderPayment = allPayments.find(
        (payment) => payment.orderId === activeOrder.id
      );

      if (!orderPayment) {
        Alert.alert("Erro", "Nenhum pagamento encontrado para este pedido");
        return;
      }

      console.log("Payment encontrado:", orderPayment);

      // Confirmar recebimento
      await paymentService.confirmDirectPayment(orderPayment.id);
      Alert.alert("Sucesso", "Pagamento confirmado com sucesso!");
      loadOrderDetails();
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível confirmar o pagamento");
    }
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
      case "COMPLETED":
        return "checkmark-done-circle-outline";
      case "CANCELLED":
        return "close-circle-outline";
      case "PAID":
        return "card-outline";
      default:
        return "help-circle-outline";
    }
  };

  const renderCurrentQuotation = () => {
    if (!activeOrder?.quotations?.length) return null;

    const latestQuotation = activeOrder.quotations[0];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Orçamento</CardTitle>
        </CardHeader>
        <CardContent>
          <QuotationValueContainer>
            <QuotationValueMain>
              R${" "}
              {latestQuotation.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </QuotationValueMain>
            <QuotationValueLabel>Valor proposto</QuotationValueLabel>
          </QuotationValueContainer>

          <QuotationDetailsGrid>
            <QuotationDetailItem>
              <QuotationDetailIcon>
                <Ionicons name="calendar-outline" size={18} color="#666" />
              </QuotationDetailIcon>
              <QuotationDetailContent>
                <QuotationDetailLabel>Data do serviço</QuotationDetailLabel>
                <QuotationDetailValue>
                  {formatDate(activeOrder?.scheduledDate)}
                </QuotationDetailValue>
              </QuotationDetailContent>
            </QuotationDetailItem>

            <QuotationDetailItem>
              <QuotationDetailIcon>
                <Ionicons name="time-outline" size={18} color="#666" />
              </QuotationDetailIcon>
              <QuotationDetailContent>
                <QuotationDetailLabel>Período</QuotationDetailLabel>
                <QuotationDetailValue>
                  {activeOrder?.period === "morning"
                    ? "Manhã"
                    : activeOrder?.period === "afternoon"
                    ? "Tarde"
                    : "Noite"}
                </QuotationDetailValue>
              </QuotationDetailContent>
            </QuotationDetailItem>

            <QuotationDetailItem>
              <QuotationDetailIcon>
                <Ionicons name="document-text-outline" size={18} color="#666" />
              </QuotationDetailIcon>
              <QuotationDetailContent>
                <QuotationDetailLabel>Enviado em</QuotationDetailLabel>
                <QuotationDetailValue>
                  {formatDateTime(latestQuotation.createdAt)}
                </QuotationDetailValue>
              </QuotationDetailContent>
            </QuotationDetailItem>
          </QuotationDetailsGrid>

          {latestQuotation.message && (
            <QuotationMessageCard>
              <QuotationMessageTitle>
                Observações do prestador
              </QuotationMessageTitle>
              <QuotationMessageText>
                {latestQuotation.message}
              </QuotationMessageText>
            </QuotationMessageCard>
          )}

          {!isProvider && activeOrder.status === "QUOTE_SENT" && (
            <QuotationButtonsContainer>
              <QuotationAcceptButton onPress={handleAcceptQuotation}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <QuotationButtonText>Aceitar Orçamento</QuotationButtonText>
              </QuotationAcceptButton>
              <QuotationRejectButton onPress={handleRejectQuotation}>
                <Ionicons name="close-circle" size={20} color="#dc3545" />
                <QuotationRejectButtonText>Recusar</QuotationRejectButtonText>
              </QuotationRejectButton>
            </QuotationButtonsContainer>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderProgressTracker = () => {
    // Simplificar os estágios removendo PENDING_CONFIRMATION
    const stages = [
      { id: "WAITING_QUOTE", label: "Aguardando", icon: "time-outline" },
      { id: "QUOTE_SENT", label: "Orçamento", icon: "document-text-outline" },
      {
        id: "QUOTE_ACCEPTED",
        label: "Aprovado",
        icon: "checkmark-circle-outline",
      },
      { id: "PAID", label: "Pago", icon: "checkmark-done-outline" },
      { id: "COMPLETED", label: "Concluído", icon: "flag-outline" },
    ];

    // Helper function to determine if a stage is completed
    const isStageCompleted = (stageId) => {
      const stageOrder = {
        WAITING_QUOTE: 1,
        QUOTE_SENT: 2,
        QUOTE_REJECTED: 1, // Rejected goes back to waiting
        QUOTE_ACCEPTED: 3,
        PAYMENT_PENDING: 3, // Mapear para approved
        PAID: 4,
        COMPLETED: 5,
        CANCELLED: 0,
      };

      const currentStageValue = stageOrder[activeOrder.status] || 0;
      const stageValue = stageOrder[stageId] || 0;

      return currentStageValue >= stageValue;
    };

    // Handle special case for QUOTE_REJECTED
    const isRejected = activeOrder.status === "QUOTE_REJECTED";
    const isCancelled = activeOrder.status === "CANCELLED";

    return (
      <Card>
        <CardHeader>
          <CardTitle>Status do Pedido</CardTitle>
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
          {isCancelled ? (
            <CancelledContainer>
              <Ionicons
                name="close-circle"
                size={64}
                color={getStatusColor("CANCELLED")}
              />
              <CancelledText>Este pedido foi cancelado</CancelledText>
              {activeOrder.cancellationReason && (
                <CancelledReason>
                  {activeOrder.cancellationReason}
                </CancelledReason>
              )}
            </CancelledContainer>
          ) : (
            <ProgressWrapper>
              <ProgressContainer>
                {stages.map((stage, index) => {
                  const isCompleted = isStageCompleted(stage.id);
                  const isCurrent =
                    activeOrder.status === stage.id ||
                    (stage.id === "QUOTE_ACCEPTED" &&
                      activeOrder.status === "PAYMENT_PENDING");
                  const isRejectedStage =
                    isRejected && stage.id === "QUOTE_SENT";

                  return (
                    <ProgressStage key={index}>
                      <ProgressStageCircle
                        completed={isCompleted}
                        isRejected={isRejectedStage}
                        current={isCurrent}
                      >
                        <Ionicons
                          name={isRejectedStage ? "close-outline" : stage.icon}
                          size={18}
                          color={
                            isCompleted || isCurrent
                              ? "#fff"
                              : theme.colors.text.secondary
                          }
                        />
                      </ProgressStageCircle>
                      <ProgressStageText
                        completed={isCompleted}
                        current={isCurrent}
                      >
                        {stage.label}
                      </ProgressStageText>

                      {/* Linha conectora */}
                      {index < stages.length - 1 && (
                        <ProgressLine
                          completed={isCompleted}
                          style={{
                            position: "absolute",
                            top: 16,
                            left: 32,
                            width: 60,
                            height: 2,
                          }}
                        />
                      )}
                    </ProgressStage>
                  );
                })}
              </ProgressContainer>
            </ProgressWrapper>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderHistoryTab = () => {
    if (historyLoading) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (!quotationHistory || quotationHistory.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Orçamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <NoHistoryText>
              Nenhum orçamento foi enviado para este pedido ainda.
            </NoHistoryText>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {quotationHistory.map((item, index) => (
            <HistoryItem
              key={index}
              isLast={index === quotationHistory.length - 1}
            >
              <HistoryItemHeader>
                <HistoryItemStatus status={item.status}>
                  <Ionicons
                    name={getStatusIcon(item.status)}
                    size={14}
                    color={getStatusColor(item.status)}
                  />
                  <StatusText status={item.status} style={{ fontSize: 12 }}>
                    {ORDER_STATUS_LABELS[item.status]}
                  </StatusText>
                </HistoryItemStatus>
                <HistoryItemDate>
                  {formatDateTime(item.createdAt)}
                </HistoryItemDate>
              </HistoryItemHeader>
              <HistoryItemContent>
                <HistoryItemAmount>
                  R$ {item.price.toFixed(2)}
                </HistoryItemAmount>
                {item.message && (
                  <HistoryItemDetail>{item.message}</HistoryItemDetail>
                )}
              </HistoryItemContent>
            </HistoryItem>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderParticipantsTab = () => {
    const providerUser = activeOrder?.provider;
    const clientUser = activeOrder?.client;

    return (
      <>
        {providerUser && (
          <Card>
            <CardHeader>
              <CardTitle>Prestador de Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <UserCard
                onPress={() =>
                  navigation.navigate("PerfilVisitante", {
                    profileId: providerUser.id,
                  })
                }
              >
                <Avatar
                  source={{
                    uri:
                      providerUser.avatar || "https://via.placeholder.com/60",
                  }}
                />
                <UserInfoContainer>
                  <UserName>{providerUser.name}</UserName>
                  <UserRole>Prestador</UserRole>

                  <ReviewSummary>
                    <RatingContainer>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <RatingText>
                        {providerUser.rating?.toFixed(1) || "Novo"}
                      </RatingText>
                      <RatingCount>
                        ({providerUser.reviewCount || 0} avaliações)
                      </RatingCount>
                    </RatingContainer>
                  </ReviewSummary>
                </UserInfoContainer>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.text.secondary}
                />
              </UserCard>

              {!isProvider && (
                <ActionQuotationButton onPress={handleChat}>
                  <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
                  <ActionQuotationButtonText>
                    Conversar
                  </ActionQuotationButtonText>
                </ActionQuotationButton>
              )}
            </CardContent>
          </Card>
        )}

        {clientUser && (
          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <UserCard
                onPress={() =>
                  navigation.navigate("PerfilVisitante", {
                    profileId: clientUser.id,
                  })
                }
              >
                <Avatar
                  source={{
                    uri: clientUser.avatar || "https://via.placeholder.com/60",
                  }}
                />
                <UserInfoContainer>
                  <UserName>{clientUser.name}</UserName>
                  <UserRole>Cliente</UserRole>
                </UserInfoContainer>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.text.secondary}
                />
              </UserCard>

              {isProvider && (
                <ActionQuotationButton onPress={handleChat}>
                  <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
                  <ActionQuotationButtonText>
                    Conversar
                  </ActionQuotationButtonText>
                </ActionQuotationButton>
              )}
            </CardContent>
          </Card>
        )}
      </>
    );
  };

  const renderDetailsTab = () => (
    <>
      {/* 1. Status do Pedido */}
      {renderProgressTracker()}

      {/* 2. Solicitação do Cliente - só para prestadores e SEM orçamento */}
      {isProvider && !activeOrder?.quotations?.length && renderClientRequest()}

      {/* 3. Orçamento - quando existe */}
      {activeOrder?.quotations?.length > 0 && renderCurrentQuotation()}

      {/* 4. Informações do Serviço */}
      {renderServiceInfo()}
    </>
  );

  const renderClientRequest = () => (
    <Card>
      <CardHeader>
        <CardTitle>Solicitação do Cliente</CardTitle>
        <ClientRequestBadge>
          <Ionicons name="person-outline" size={16} color="#2563eb" />
          <ClientRequestBadgeText>
            {activeOrder?.client?.name || "Cliente"}
          </ClientRequestBadgeText>
        </ClientRequestBadge>
      </CardHeader>
      <CardContent>
        <ClientRequestGrid>
          <ClientRequestItem>
            <ClientRequestIcon>
              <Ionicons name="calendar-outline" size={18} color="#2563eb" />
            </ClientRequestIcon>
            <ClientRequestContent>
              <ClientRequestLabel>Data solicitada</ClientRequestLabel>
              <ClientRequestValue>
                {formatDate(activeOrder?.scheduledDate)}
              </ClientRequestValue>
            </ClientRequestContent>
          </ClientRequestItem>

          <ClientRequestItem>
            <ClientRequestIcon>
              <Ionicons name="time-outline" size={18} color="#2563eb" />
            </ClientRequestIcon>
            <ClientRequestContent>
              <ClientRequestLabel>Período</ClientRequestLabel>
              <ClientRequestValue>
                {activeOrder?.period === "morning"
                  ? "Manhã"
                  : activeOrder?.period === "afternoon"
                  ? "Tarde"
                  : "Noite"}
              </ClientRequestValue>
            </ClientRequestContent>
          </ClientRequestItem>

          {activeOrder?.address && (
            <ClientRequestItem>
              <ClientRequestIcon>
                <Ionicons name="location-outline" size={18} color="#2563eb" />
              </ClientRequestIcon>
              <ClientRequestContent>
                <ClientRequestLabel>Local do serviço</ClientRequestLabel>
                <ClientRequestValue>{activeOrder?.address}</ClientRequestValue>
              </ClientRequestContent>
            </ClientRequestItem>
          )}

          {/*<ClientRequestItem>
            <ClientRequestIcon>
              <Ionicons name="cash-outline" size={18} color="#2563eb" />
            </ClientRequestIcon>
            <ClientRequestContent>
              {/*<ClientRequestLabel>Orçamento inicial</ClientRequestLabel>
              <ClientRequestValue>
                R$ {activeOrder?.initialPrice?.toFixed(2) || "Não informado"}
              </ClientRequestValue>
            </ClientRequestContent>
          </ClientRequestItem>*/}
        </ClientRequestGrid>

        {activeOrder?.description && (
          <ClientRequestNote>
            <ClientRequestNoteHeader>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={16}
                color="#2563eb"
              />
              <ClientRequestNoteTitle>
                Observações do cliente
              </ClientRequestNoteTitle>
            </ClientRequestNoteHeader>
            <ClientRequestNoteText>
              {activeOrder?.description}
            </ClientRequestNoteText>
          </ClientRequestNote>
        )}

        <ClientRequestFooter>
          <ClientRequestDate>
            Solicitado em {formatDateTime(activeOrder?.createdAt)}
          </ClientRequestDate>
        </ClientRequestFooter>
      </CardContent>
    </Card>
  );

  const renderServiceInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <ServiceHeaderSection>
          <ServiceImageContainer>
            <ServiceImage
              source={{
                uri:
                  activeOrder?.service?.images?.[0] ||
                  "https://via.placeholder.com/300x150",
              }}
            />
          </ServiceImageContainer>
          <ServiceHeaderInfo>
            <ServiceTitle>{activeOrder?.service?.title}</ServiceTitle>
            <CategoryBadge>
              <CategoryText>{activeOrder?.service?.category}</CategoryText>
            </CategoryBadge>
          </ServiceHeaderInfo>
        </ServiceHeaderSection>

        <ServiceDetailsGrid>
          {activeOrder?.address && (
            <ServiceDetailItem>
              <ServiceDetailIcon>
                <Ionicons
                  name="location"
                  size={20}
                  color={theme.colors.primary}
                />
              </ServiceDetailIcon>
              <ServiceDetailContent>
                <ServiceDetailLabel>Local</ServiceDetailLabel>
                <ServiceDetailValue>{activeOrder?.address}</ServiceDetailValue>
              </ServiceDetailContent>
            </ServiceDetailItem>
          )}

          <ServiceDetailItem>
            <ServiceDetailIcon>
              <Ionicons name="person" size={20} color={theme.colors.primary} />
            </ServiceDetailIcon>
            <ServiceDetailContent>
              <ServiceDetailLabel>Solicitado por</ServiceDetailLabel>
              <ServiceDetailValue>
                {activeOrder?.client?.name || "Cliente"}
              </ServiceDetailValue>
            </ServiceDetailContent>
          </ServiceDetailItem>

          <ServiceDetailItem>
            <ServiceDetailIcon>
              <Ionicons
                name="calendar-clear"
                size={20}
                color={theme.colors.primary}
              />
            </ServiceDetailIcon>
            <ServiceDetailContent>
              <ServiceDetailLabel>Data da solicitação</ServiceDetailLabel>
              <ServiceDetailValue>
                {formatDateTime(activeOrder?.createdAt)}
              </ServiceDetailValue>
            </ServiceDetailContent>
          </ServiceDetailItem>
        </ServiceDetailsGrid>

        {activeOrder?.description && (
          <ClientObservationsCard>
            <ClientObservationsHeader>
              <Ionicons
                name="chatbubble-ellipses"
                size={18}
                color={theme.colors.primary}
              />
              <ClientObservationsTitle>
                Observações do Cliente
              </ClientObservationsTitle>
            </ClientObservationsHeader>
            <ClientObservationsText>
              {activeOrder?.description}
            </ClientObservationsText>
          </ClientObservationsCard>
        )}
      </CardContent>
    </Card>
  );

  const renderHeader = () => (
    <></>
    /*<HeaderContainer>
      <StatusBadge status={activeOrder.status} style={{ marginBottom: 12 }}>
        <Ionicons
          name={getStatusIcon(activeOrder.status)}
          size={16}
          color={getStatusColor(activeOrder.status)}
        />
        <StatusText status={activeOrder.status}>
          {ORDER_STATUS_LABELS[activeOrder.status]}
        </StatusText>
      </StatusBadge>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <IconWithText onPress={handleChat}>
          <ActionIconButton>
            <Ionicons
              name="chatbubbles-outline"
              size={20}
              color={theme.colors.primary}
            />
          </ActionIconButton>
          <IconLabel>Chat</IconLabel>
        </IconWithText>

        <IconWithText onPress={() => setActiveTab("history")}>
          <ActionIconButton>
            <Ionicons
              name="time-outline"
              size={20}
              color={theme.colors.primary}
            />
          </ActionIconButton>
          <IconLabel>Histórico</IconLabel>
        </IconWithText>

        <IconWithText onPress={() => setActiveTab("participants")}>
          <ActionIconButton>
            <Ionicons
              name="people-outline"
              size={20}
              color={theme.colors.primary}
            />
          </ActionIconButton>
          <IconLabel>Participantes</IconLabel>
        </IconWithText>
      </View>
    </HeaderContainer>*/
  );

  const renderFooterActions = () => {
    if (
      isProvider &&
      (activeOrder?.status === "WAITING_QUOTE" ||
        activeOrder?.status === "QUOTE_REJECTED")
    ) {
      return (
        <StickyFooter>
          <ActionButton
            variant="primary"
            onPress={() => setIsQuotationModalVisible(true)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <ActionButtonText hasIcon style={{ minWidth: 100, minHeight: 20 }}>
              Enviar Orçamento
            </ActionButtonText>
          </ActionButton>
        </StickyFooter>
      );
    }

    if (
      isProvider &&
      (activeOrder?.status === "PAYMENT_PENDING" ||
        activeOrder?.status === "CLIENT_CONFIRMED")
    ) {
      return (
        <StickyFooter>
          <ActionButton variant="primary" onPress={handleConfirmPayment}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <ActionButtonText hasIcon style={{ minWidth: 100, minHeight: 20 }}>
              Confirmar Recebimento
            </ActionButtonText>
          </ActionButton>
        </StickyFooter>
      );
    }

    if (!isProvider && activeOrder?.status === "QUOTE_ACCEPTED") {
      return (
        <StickyFooter>
          <ActionButton variant="primary" onPress={handlePayment}>
            <Ionicons name="card-outline" size={20} color="#fff" />
            <ActionButtonText hasIcon style={{ minWidth: 100, minHeight: 20 }}>
              Realizar Pagamento
            </ActionButtonText>
          </ActionButton>
        </StickyFooter>
      );
    }

    if (!isProvider && activeOrder?.status === "PAID") {
      return (
        <StickyFooter>
          <ActionButton
            variant="primary"
            onPress={() =>
              navigation.navigate("ServicoDetalhes", {
                id: activeOrder.service.id,
                orderId: activeOrder.id, // Para saber que vem de um pedido concluído
              })
            }
          >
            <Ionicons name="star-outline" size={20} color="#fff" />
            <ActionButtonText hasIcon style={{ minWidth: 100, minHeight: 20 }}>
              ⭐ Avaliar Serviço
            </ActionButtonText>
          </ActionButton>
        </StickyFooter>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
      {renderHeader()}

      <TabHeader>
        <TabButton
          active={activeTab === "details"}
          onPress={() => setActiveTab("details")}
        >
          <TabButtonText active={activeTab === "details"}>
            Detalhes
          </TabButtonText>
        </TabButton>
        <TabButton
          active={activeTab === "history"}
          onPress={() => setActiveTab("history")}
        >
          <TabButtonText active={activeTab === "history"}>
            Orçamentos
          </TabButtonText>
        </TabButton>
        <TabButton
          active={activeTab === "participants"}
          onPress={() => setActiveTab("participants")}
        >
          <TabButtonText active={activeTab === "participants"}>
            Participantes
          </TabButtonText>
        </TabButton>
      </TabHeader>

      <MainContent>
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "history" && renderHistoryTab()}
        {activeTab === "participants" && renderParticipantsTab()}
      </MainContent>

      {renderFooterActions()}

      <QuotationModal
        isVisible={isQuotationModalVisible}
        onClose={() => setIsQuotationModalVisible(false)}
        onConfirm={handleSendQuotation}
        initialData={activeOrder}
      />
    </Container>
  );
};

export default PedidoDetalhes;

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
} from "./styles";
import QuotationModal from "../../components/quotationModal";
import ErrorView from "../../components/errorView";
import EmptyView from "../../components/emptyView";
import { useTheme } from "@react-navigation/native";
import { generateQuotationMessage } from "../../utils/generateQuotationMessage";
import { messageService } from "../../services/messageService";
import { chatService } from "../../services/chatService";

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
          <HighlightedInfo>
            <HighlightedValue>
              R$ {latestQuotation.price.toFixed(2)}
            </HighlightedValue>
            <HighlightedLabel>Valor do orçamento</HighlightedLabel>
          </HighlightedInfo>

          <QuotationDate>
            Enviado em {formatDateTime(latestQuotation.createdAt)}
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
        </CardContent>
      </QuotationCard>
    );
  };

  const renderProgressTracker = () => {
    // Define the progress stages
    const stages = [
      { id: "WAITING_QUOTE", label: "Aguardando", icon: "time-outline" },
      { id: "QUOTE_SENT", label: "Orçamento", icon: "document-text-outline" },
      {
        id: "QUOTE_ACCEPTED",
        label: "Aprovado",
        icon: "checkmark-circle-outline",
      },
      { id: "PAID", label: "Pago", icon: "card-outline" },
      {
        id: "COMPLETED",
        label: "Concluído",
        icon: "checkmark-done-circle-outline",
      },
    ];

    // Helper function to determine if a stage is completed
    const isStageCompleted = (stageId) => {
      const stageOrder = {
        WAITING_QUOTE: 1,
        QUOTE_SENT: 2,
        QUOTE_REJECTED: 1, // Rejected goes back to waiting
        QUOTE_ACCEPTED: 3,
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
          {/*<StatusBadge status={activeOrder.status}>
            <Ionicons
              name={getStatusIcon(activeOrder.status)}
              size={16}
              color={getStatusColor(activeOrder.status)}
            />
            <StatusText status={activeOrder.status}>
              {ORDER_STATUS_LABELS[activeOrder.status]}
            </StatusText>
          </StatusBadge>*/}
        </CardHeader>
        <CardContent>
          {isCancelled ? (
            <View style={{ alignItems: "center", padding: 12 }}>
              <Ionicons
                name="close-circle"
                size={48}
                color={getStatusColor("CANCELLED")}
              />
              <HighlightedLabel style={{ marginTop: 12, fontSize: 16 }}>
                Este pedido foi cancelado
              </HighlightedLabel>
            </View>
          ) : (
            <ProgressWrapper>
              <ProgressContainer>
                <ProgressLine />
                {stages.map((stage, index) => (
                  <ProgressStage
                    key={index}
                    isFirst={index === 0}
                    isLast={index === stages.length - 1}
                  >
                    <ProgressStageCircle
                      completed={isStageCompleted(stage.id)}
                      isRejected={isRejected && stage.id === "QUOTE_SENT"}
                      current={activeOrder.status === stage.id}
                    >
                      <Ionicons
                        name={
                          isRejected && stage.id === "QUOTE_SENT"
                            ? "close-outline"
                            : stage.icon
                        }
                        size={16}
                        color={
                          isStageCompleted(stage.id)
                            ? "#fff"
                            : theme.colors.text.secondary
                        }
                      />
                    </ProgressStageCircle>
                    <ProgressStageText
                      completed={isStageCompleted(stage.id)}
                      current={activeOrder.status === stage.id}
                    >
                      {stage.label}
                    </ProgressStageText>
                  </ProgressStage>
                ))}
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

              {/*<UserInfoRow>
                <UserInfoIcon>
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color={theme.colors.primary}
                  />
                </UserInfoIcon>
                <UserInfoText>
                  {providerUser.phone || "Telefone não disponível"}
                </UserInfoText>
              </UserInfoRow>

              <UserInfoRow>
                <UserInfoIcon>
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={theme.colors.primary}
                  />
                </UserInfoIcon>
                <UserInfoText>
                  {providerUser.email || "Email não disponível"}
                </UserInfoText>
              </UserInfoRow>*/}

              <ActionQuotationButton onPress={handleChat}>
                <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
                <ActionQuotationButtonText>Conversar</ActionQuotationButtonText>
              </ActionQuotationButton>
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

              {/*<UserInfoRow>
                <UserInfoIcon>
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color={theme.colors.primary}
                  />
                </UserInfoIcon>
                <UserInfoText>
                  {clientUser.phone || "Telefone não disponível"}
                </UserInfoText>
              </UserInfoRow>

              <UserInfoRow>
                <UserInfoIcon>
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={theme.colors.primary}
                  />
                </UserInfoIcon>
                <UserInfoText>
                  {clientUser.email || "Email não disponível"}
                </UserInfoText>
              </UserInfoRow>*/}

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
      {renderProgressTracker()}

      {activeOrder?.quotations?.length > 0 && renderCurrentQuotation()}

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceImageContainer>
            <ServiceImage
              source={{
                uri:
                  activeOrder?.service?.images?.[0] ||
                  "https://via.placeholder.com/300x150",
              }}
            />
          </ServiceImageContainer>

          <ServiceInfo>
            <ServiceTitle>{activeOrder?.service?.title}</ServiceTitle>
            <CategoryBadge>
              <CategoryText>{activeOrder?.service?.category}</CategoryText>
            </CategoryBadge>
          </ServiceInfo>

          <DetailRow>
            <DetailLabel>Data Agendada</DetailLabel>
            <DetailValue>{formatDate(activeOrder?.scheduledDate)}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Período</DetailLabel>
            <DetailValue>
              {activeOrder?.period === "morning"
                ? "Manhã"
                : activeOrder?.period === "afternoon"
                ? "Tarde"
                : "Noite"}
            </DetailValue>
          </DetailRow>

          {activeOrder?.address && (
            <DetailRow>
              <DetailLabel>Endereço</DetailLabel>
              <AddressContainer>
                <LocationIcon>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={theme.colors.primary}
                  />
                </LocationIcon>
                <AddressText>{activeOrder?.address}</AddressText>
              </AddressContainer>
            </DetailRow>
          )}

          <DetailRow last>
            <DetailLabel>Data da Solicitação</DetailLabel>
            <DetailValue>{formatDateTime(activeOrder?.createdAt)}</DetailValue>
          </DetailRow>

          {activeOrder?.description && (
            <QuotationDescription>
              <DetailLabel style={{ marginBottom: 8 }}>
                Observações do Cliente
              </DetailLabel>
              {activeOrder?.description}
            </QuotationDescription>
          )}
        </CardContent>
      </Card>
    </>
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

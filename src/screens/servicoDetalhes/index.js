import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/authContext";
import { reviewService } from "../../services/reviewService";
import { serviceService } from "../../services/serviceService";
import { orderService } from "../../services/orderService";
import { recommendService } from "../../services/recommendationService";
import ReviewList from "../../components/reviewList";
import ReviewForm from "../../components/reviewForm";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  LoadingSpinner,
  ServiceInfo,
  ServiceImage,
  ServiceDetails,
  Price,
  Description,
  BookingButton,
  BookingButtonText,
  ReviewsSection,
  SectionTitle,
  ErrorMessage,
  BookingForm,
  BackButton,
  BackButtonText,
  RecommendationsSection,
  RecommendationCard,
  CommunityImage,
  ContentContainer,
  CommunityName,
  RecommendationCount,
  CountText,
  EmptyText,
  RecommendationHeader,
  RecommendationCards,
  ServiceTitle,
  Button,
  ButtonText,
  TextInput,
  LoaderContainer,
  InputContainer,
  InputLabel,
  DateTimeButton,
  DateTimeText,
  ProviderInfo,
  ProviderAvatar,
  ProviderName,
  Rating,
  Separator,
  PeriodSelector,
  PeriodOption,
  PeriodText,
  TimeOptionContainer,
  TimeOptionText,
} from "./styles";
import { communityService } from "../../services/communityService";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { chatService } from "../../services/chatService";
import { messageService } from "../../services/messageService";
import { generateQuotationMessage } from "../../utils/generateQuotationMessage";
import generateWelcomeMessage from "../../utils/generateWelcomeMessage";
import { MESSAGE_TYPES } from "../../constants/orderStatus";

const PERIODS = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  NIGHT: "night",
};

const PERIOD_LABELS = {
  [PERIODS.MORNING]: "Manhã",
  [PERIODS.AFTERNOON]: "Tarde",
  [PERIODS.NIGHT]: "Noite",
};

const PeriodSelectorComponent = ({ selectedPeriod, onPeriodChange }) => (
  <PeriodSelector>
    {Object.entries(PERIODS).map(([key, value]) => (
      <PeriodOption
        key={value}
        selected={selectedPeriod === value}
        onPress={() => onPeriodChange(value)}
        testID={`period-option-${value}`}
      >
        <PeriodText selected={selectedPeriod === value}>
          {PERIOD_LABELS[value]}
        </PeriodText>
      </PeriodOption>
    ))}
  </PeriodSelector>
);

const ServiceHeader = ({ service, navigation, signed, onBookingPress }) => (
  <ServiceInfo>
    <ServiceImage source={{ uri: service.images[0] }} testID="service-image" />
    <ServiceDetails>
      <ServiceTitle>{service.title}</ServiceTitle>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PerfilVisitante", {
            profileId: service.provider.id,
          })
        }
        testID="provider-profile-button"
      >
        <ProviderInfo>
          <ProviderAvatar source={{ uri: service.provider.avatar }} />
          <ProviderName>{service.provider.name}</ProviderName>
          <Separator>•</Separator>
          <Rating>{service.provider.rating?.toFixed(1)}⭐</Rating>
        </ProviderInfo>
      </TouchableOpacity>
      <Price>
        R$ {service.priceStartingAt} / {service.priceUnit}
      </Price>
      <Description>{service.description}</Description>

      {signed ? (
        <BookingButton onPress={onBookingPress} testID="booking-button">
          <BookingButtonText>Agendar Serviço</BookingButtonText>
        </BookingButton>
      ) : (
        <BookingButton
          onPress={() => navigation.navigate("Entrar")}
          testID="login-button"
        >
          <BookingButtonText>Entre para agendar</BookingButtonText>
        </BookingButton>
      )}
    </ServiceDetails>
  </ServiceInfo>
);

const ServicoDetalhes = () => {
  const { id } = useRoute().params;
  const { signed, user } = useAuth();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: new Date(),
    time: new Date(),
    period: "",
    specificTime: false,
    description: "",
  });
  const [recommendationStatus, setRecommendationStatus] = useState(null);
  const [communityIds, setCommunityIds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigation = useNavigation();
  const [submitting, setSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const loadInitialData = async () => {
    try {
      const [serviceData, reviewsData] = await Promise.all([
        serviceService.getById(id),
        reviewService.listByService(id),
      ]);

      setService(serviceData);
      setReviews(reviewsData);

      if (signed && user) {
        await loadUserSpecificData(serviceData);
      }
    } catch (err) {
      setError("Erro ao carregar dados do serviço");
    } finally {
      setLoading(false);
    }
  };

  const loadUserSpecificData = async (serviceData) => {
    try {
      const [orders, userCommunities, recommendations] = await Promise.all([
        orderService.list({ role: "client", serviceId: id }),
        communityService.getUserCommunities(),
        recommendService.getRecommendationsByCommunity(serviceData.providerId),
      ]);

      const completedOrder = orders.find((o) => o.status === "PAID");
      setOrder(completedOrder || null);

      setCommunityIds(userCommunities.communities.map((c) => c.id));
      setRecommendations(recommendations);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [id, signed, user]);

  const getInitialMessage = (serviceName) => {
    return `Quer entrar em contato com o prestador para tirar alguma dúvida? Deixe uma mensagem aqui e abrirá um chat automaticamente`;
  };

  // Validação do formulário de agendamento
  const validateBookingData = () => {
    const errors = [];
    const today = new Date();
    //const tomorrow = new Date();
    //tomorrow.setDate(tomorrow.getDate() + 1);

    if (!bookingData.date) {
      errors.push("Selecione uma data");
    } else if (bookingData.date < today) {
      errors.push("A data deve ser a partir de amanhã");
    }

    if (bookingData.specificTime) {
      if (!bookingData.time) {
        errors.push("Selecione um horário");
      }
    } else if (!bookingData.period) {
      errors.push("Selecione um período");
    }

    return errors;
  };

  // Função para tentar novamente com retry
  const retryOperation = async (operation, errorMessage) => {
    let lastError;
    for (let i = 0; i <= retryCount; i++) {
      try {
        const result = await operation();
        setRetryCount(0);
        return result;
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error(errorMessage || lastError?.message);
  };

  const handleBookingSubmit = async () => {
    try {
      const validationErrors = validateBookingData();
      if (validationErrors.length > 0) {
        Alert.alert("Atenção", validationErrors.join("\n"));
        return;
      }

      Alert.alert(
        "Confirmar agendamento",
        "Deseja confirmar o agendamento deste serviço?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: async () => {
              setSubmitting(true);
              try {
                await createBooking();
              } finally {
                setSubmitting(false);
              }
            },
          },
        ]
      );
    } catch (err) {
      handleError(err, "agendamento");
    }
  };

  const createBooking = async () => {
    try {
      if (!service?.providerId) {
        throw new Error("Dados do prestador não encontrados");
      }

      const orderData = {
        serviceId: id,
        scheduledDate: bookingData.date.toISOString(),
        period: bookingData.specificTime ? null : bookingData.period,
        specificTime: bookingData.specificTime,
        description: bookingData.description?.trim() || "",
        status: "WAITING_QUOTE",
        initialPrice: service.priceStartingAt,
        providerId: service.providerId,
        clientId: user.id,
      };

      const newOrder = await retryOperation(
        () => orderService.create(orderData),
        "Erro ao criar pedido"
      );

      const chat = await retryOperation(
        () => chatService.createChat(service.providerId),
        "Erro ao criar chat"
      );

      await sendInitialMessages(chat.id, newOrder);

      navigation.navigate("Mensagens", {
        providerId: service.providerId,
        chatId: chat.id,
        orderId: newOrder.id,
        showOrderDetails: true,
        order: {
          ...newOrder,
          service: {
            ...service,
            title: service.title,
          },
        },
      });

      navigation.getParent()?.setParams({ ordersUpdated: true });

      Alert.alert("Sucesso", "Agendamento realizado com sucesso!");
    } catch (err) {
      handleError(err, "criação do agendamento");
    }
  };

  const sendInitialMessages = async (chatId, order) => {
    try {
      const welcomeMessage = generateWelcomeMessage(
        service.provider.name,
        user.id
      );
      const quotationMessage = generateQuotationMessage(
        order,
        service,
        MESSAGE_TYPES.REQUEST,
        user.id
      );

      // Enviar mensagens em sequência para garantir ordem correta
      await messageService.sendMessage(chatId, welcomeMessage);

      // Pequeno delay para garantir ordem
      await new Promise((resolve) => setTimeout(resolve, 100));

      await messageService.sendMessage(chatId, quotationMessage);

      // Se houver descrição adicional, enviar como mensagem de texto do cliente
      if (bookingData.description?.trim()) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await messageService.sendMessage(chatId, {
          type: "text",
          content: bookingData.description,
          senderId: user.id,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagens iniciais:", error);
      // Não bloqueia o fluxo principal se falhar
    }
  };

  const handleError = (error, context) => {
    console.error(`Erro durante ${context}:`, error);

    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      Alert.alert(
        "Erro",
        `Falha durante ${context}. Deseja tentar novamente?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Tentar novamente", onPress: handleBookingSubmit },
        ]
      );
    } else {
      Alert.alert(
        "Erro",
        `Não foi possível completar o ${context}. Por favor, tente novamente mais tarde.`
      );
      setRetryCount(0);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await reviewService.create({
        orderId: order.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      const updatedReviews = await reviewService.listByService(id);
      setReviews(updatedReviews);

      if (reviewData.recommendation === "indica") {
        await recommendService.recommend(service.providerId, communityIds);
        setRecommendationStatus(
          "Você recomendou este serviço para suas comunidades!"
        );
      }
    } catch (error) {
      alert("Erro ao enviar avaliação. Tente novamente.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingData((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setBookingData((prev) => ({
        ...prev,
        time: selectedTime,
      }));
    }
  };

  const formatDate = (date) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const formatTime = (time) => {
    return format(time, "HH:mm", { locale: ptBR });
  };

  if (loading)
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!service) return <ErrorMessage>Serviço não encontrado</ErrorMessage>;

  return (
    <Container testID="servico-detalhes-container">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        testID="servico-detalhes-scroll"
      >
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
        <ServiceHeader
          service={service}
          navigation={navigation}
          signed={signed}
          onBookingPress={() => setShowBookingForm(true)}
        />

        {showBookingForm && (
          <BookingForm>
            <InputContainer>
              <InputLabel>Data</InputLabel>
              <DateTimeButton onPress={() => setShowDatePicker(true)}>
                <DateTimeText>
                  {bookingData.date
                    ? format(bookingData.date, "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })
                    : "Selecionar data"}
                </DateTimeText>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </DateTimeButton>
            </InputContainer>

            <InputContainer>
              <TimeOptionContainer>
                <Switch
                  value={bookingData.specificTime}
                  onValueChange={(value) => {
                    setBookingData((prev) => ({
                      ...prev,
                      specificTime: value,
                      period: value ? "" : prev.period,
                    }));
                  }}
                  trackColor={{ false: "#767577", true: "#422680" }}
                  thumbColor={bookingData.specificTime ? "#fff" : "#f4f3f4"}
                />
                <TimeOptionText>Definir horário específico</TimeOptionText>
              </TimeOptionContainer>

              {bookingData.specificTime ? (
                <DateTimeButton onPress={() => setShowTimePicker(true)}>
                  <DateTimeText>
                    {bookingData.time
                      ? format(bookingData.time, "HH:mm")
                      : "Selecionar horário"}
                  </DateTimeText>
                  <Ionicons name="time-outline" size={20} color="#666" />
                </DateTimeButton>
              ) : (
                <>
                  <InputLabel>Período</InputLabel>
                  <PeriodSelectorComponent
                    selectedPeriod={bookingData.period}
                    onPeriodChange={(period) =>
                      setBookingData((prev) => ({ ...prev, period }))
                    }
                  />
                </>
              )}
            </InputContainer>

            {showDatePicker && (
              <DateTimePicker
                value={bookingData.date || new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={bookingData.time || new Date()}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}

            <TextInput
              placeholder={getInitialMessage(service.title)}
              placeholderTextColor="#280659"
              value={bookingData.description}
              onChangeText={(description) =>
                setBookingData({ ...bookingData, description })
              }
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Button
              onPress={handleBookingSubmit}
              disabled={submitting}
              testID="submit-booking-button"
            >
              <ButtonText>
                {submitting ? "Processando..." : "Confirmar e Iniciar Conversa"}
              </ButtonText>
            </Button>

            <Button secondary onPress={() => setShowBookingForm(false)}>
              <ButtonText secondary>Cancelar</ButtonText>
            </Button>
          </BookingForm>
        )}

        <RecommendationsSection>
          {signed ? (
            recommendations.length > 0 ? (
              <>
                <RecommendationHeader>
                  Suas comunidades que indikam:
                </RecommendationHeader>
                <RecommendationCards>
                  {recommendations.map((rec) => (
                    <RecommendationCard key={rec.communityId}>
                      <CommunityImage
                        source={{ uri: rec.communityImage }}
                        resizeMode="cover"
                      />
                      <ContentContainer>
                        <CommunityName>{rec.communityName}</CommunityName>
                      </ContentContainer>
                      <RecommendationCount>
                        <CountText>
                          {rec.count}{" "}
                          {rec.count === 1 ? "indicação" : "indicações"}
                        </CountText>
                      </RecommendationCount>
                    </RecommendationCard>
                  ))}
                </RecommendationCards>
              </>
            ) : (
              <EmptyText>
                Não há indicações disponíveis para este serviço.
              </EmptyText>
            )
          ) : (
            <EmptyText>
              Entre para ver as indicações de suas comunidades
            </EmptyText>
          )}
        </RecommendationsSection>

        <ReviewsSection>
          <SectionTitle>
            <Text>Avaliações</Text>
          </SectionTitle>

          {order &&
            order.status === "PAID" &&
            !reviews.some(
              (r) => r.orderId === order.id && r.reviewerId === user?.id
            ) && (
              <ReviewForm
                orderId={order.id}
                onSubmit={handleReviewSubmit}
                setRecommendationStatus={setRecommendationStatus}
              />
            )}

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage>
              <Text>{error}</Text>
            </ErrorMessage>
          ) : (
            <ReviewList
              reviews={reviews}
              emptyMessage="Seja o primeiro a avaliar este serviço!"
            />
          )}
        </ReviewsSection>
      </ScrollView>
    </Container>
  );
};

export default ServicoDetalhes;

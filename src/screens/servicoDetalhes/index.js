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
} from "./styles";
import { communityService } from "../../services/communityService";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    description: "",
  });
  const [recommendationStatus, setRecommendationStatus] = useState(null);
  const [communityIds, setCommunityIds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [serviceData, reviewsData] = await Promise.all([
          serviceService.getById(id),
          reviewService.listByService(id),
        ]);

        setService(serviceData);
        setReviews(reviewsData);

        if (signed && user) {
          const orders = await orderService.list({
            role: "client",
            serviceId: id,
          });

          const completedOrder = orders.find((o) => o.status === "completed");
          setOrder(completedOrder || null);

          const { communities } = await communityService.getUserCommunities();
          setCommunityIds(communities.map((community) => community.id));

          const recommendationsData =
            await recommendService.getRecommendationsByCommunity(
              serviceData.providerId
            );
          setRecommendations(recommendationsData);
        }
      } catch (err) {
        setError("Erro ao carregar dados do serviço");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, signed, user]);

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const scheduledDate = new Date(
        `${bookingData.date.toISOString().split("T")[0]}T${
          bookingData.time.toISOString().split("T")[1]
        }`
      ).toISOString();

      const orderData = {
        serviceId: id,
        scheduledDate,
        description: bookingData.description,
      };

      await orderService.create(orderData);
      navigation.navigate("TabNavigator", {
        screen: "Pedidos",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao agendar serviço");
    } finally {
      setLoading(false);
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

      if (recommendationStatus === "indica") {
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
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
        <ServiceInfo>
          <ServiceImage source={{ uri: service.images[0] }} />
          <ServiceDetails>
            <ServiceTitle>{service.title}</ServiceTitle>
            <Price>
              R$ {service.priceStartingAt} / {service.priceUnit}
            </Price>
            <Description>{service.description}</Description>

            {signed ? (
              <BookingButton onPress={() => setShowBookingForm(true)}>
                <BookingButtonText>Agendar Serviço</BookingButtonText>
              </BookingButton>
            ) : (
              <BookingButton onPress={() => navigation.navigate("Entrar")}>
                <BookingButtonText>Entre para agendar</BookingButtonText>
              </BookingButton>
            )}
          </ServiceDetails>
        </ServiceInfo>

        {showBookingForm && (
          <BookingForm>
            <InputContainer>
              <InputLabel>Data</InputLabel>
              <DateTimeButton onPress={() => setShowDatePicker(true)}>
                <DateTimeText>
                  {bookingData.date
                    ? formatDate(bookingData.date)
                    : "Selecionar data"}
                </DateTimeText>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </DateTimeButton>
            </InputContainer>

            {showDatePicker && (
              <DateTimePicker
                value={bookingData.date}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
                locale="pt-BR"
              />
            )}

            <InputContainer>
              <InputLabel>Horário</InputLabel>
              <DateTimeButton onPress={() => setShowTimePicker(true)}>
                <DateTimeText>
                  {bookingData.time
                    ? formatTime(bookingData.time)
                    : "Selecionar horário"}
                </DateTimeText>
                <Ionicons name="time-outline" size={20} color="#666" />
              </DateTimeButton>
            </InputContainer>

            {showTimePicker && (
              <DateTimePicker
                value={bookingData.time}
                mode="time"
                display="default"
                onChange={onTimeChange}
                locale="pt-BR"
              />
            )}

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#280659"
              value={bookingData.description}
              onChangeText={(description) =>
                setBookingData({ ...bookingData, description })
              }
              multiline
            />

            <Button onPress={handleBookingSubmit}>
              <ButtonText>
                {loading ? "Carregando..." : "Confirmar Agendamento"}
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
            order.status === "completed" &&
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

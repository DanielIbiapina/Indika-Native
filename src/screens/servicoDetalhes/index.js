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
} from "./styles";
import { communityService } from "../../services/communityService";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

const ServicoDetalhes = () => {
  const { id } = useRoute().params;
  const { signed, user } = useAuth();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
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
        `${bookingData.date}T${bookingData.time}`
      ).toISOString();

      const orderData = {
        serviceId: id,
        scheduledDate,
        description: bookingData.description,
      };

      await orderService.create(orderData);
      navigation.navigate("Pedidos"); // ou para onde quiser redirecionar após sucesso
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

      if (recommendationStatus === "Você recomendou esta pessoa.") {
        await recommendService.recommend(service.providerId, communityIds);
        setRecommendationStatus(
          "Você recomendou este serviço para suas comunidades!"
        );
      }
    } catch (error) {
      alert("Erro ao enviar avaliação. Tente novamente.");
    }
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

        {showBookingForm && (
          <BookingForm>
            <TextInput
              placeholder="Data"
              placeholderTextColor={theme.colors.text.secondary}
              value={bookingData.date}
              onChangeText={(date) => setBookingData({ ...bookingData, date })}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Hora"
              placeholderTextColor={theme.colors.text.secondary}
              value={bookingData.time}
              onChangeText={(time) => setBookingData({ ...bookingData, time })}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Descrição"
              placeholderTextColor={theme.colors.text.secondary}
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

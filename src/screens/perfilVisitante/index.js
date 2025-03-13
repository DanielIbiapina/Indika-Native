import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { userService } from "../../services/userService";
import { serviceService } from "../../services/serviceService";
import { reviewService } from "../../services/reviewService";

import ReviewCard from "../../components/reviewCard";
import {
  Container,
  ProfileHeader,
  AvatarContainer,
  UserInfo,
  UserName,
  Stats,
  StatItem,
  StatValue,
  StatLabel,
  TabsContainer,
  Tab,
  TabText,
  ContentSection,
  LoadingSpinner,
  ErrorMessage,
  EmptyMessage,
  LoadMoreButton,
  LoadMoreButtonText,
  MessageButton,
  MessageButtonText,
  Avatar,
} from "./styles";

import ServiceListItem from "../../components/serviceListItem";

const PerfilVisitante = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { profileId } = route.params;
  const [activeTab, setActiveTab] = useState("services");
  const [profileData, setProfileData] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, [profileId]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profile, servicesData, reviewsData] = await Promise.all([
        userService.getPublicProfile(profileId),
        serviceService.list({ profileId }),
        reviewService.listReceivedReviews(profileId),
      ]);

      setProfileData(profile);

      setServices(
        Array.isArray(servicesData) ? servicesData : servicesData.services || []
      );
      setReviews(
        Array.isArray(reviewsData) ? reviewsData : reviewsData.reviews || []
      );
    } catch (err) {
      console.error("Erro detalhado:", err);
      setError("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!profileData?.id) {
      setError("Não foi possível iniciar a conversa");
      return;
    }

    navigation.navigate("Mensagens", {
      providerId: profileId,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!profileData) return <ErrorMessage>Perfil não encontrado</ErrorMessage>;

  return (
    <Container>
      <ScrollView>
        <ProfileHeader>
          <AvatarContainer>
            <Avatar source={{ uri: profileData.avatar }} />
          </AvatarContainer>
          <UserInfo>
            <UserName>{profileData.name}</UserName>
            {/*<MessageButton onPress={handleSendMessage}>
              <MessageButtonText>Enviar Mensagem</MessageButtonText>
            </MessageButton>*/}
          </UserInfo>
        </ProfileHeader>

        <Stats>
          <StatItem>
            <StatValue>{profileData._count.providedServices}</StatValue>
            <StatLabel>Serviços</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profileData.rating?.toFixed(1)}⭐</StatValue>
            <StatLabel>Avaliação</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profileData._count.receivedReviews}</StatValue>
            <StatLabel>Avaliações</StatLabel>
          </StatItem>
        </Stats>

        <TabsContainer>
          <Tab
            active={activeTab === "services"}
            onPress={() => setActiveTab("services")}
          >
            <TabText active={activeTab === "services"}>Serviços</TabText>
          </Tab>
          <Tab
            active={activeTab === "reviews"}
            onPress={() => setActiveTab("reviews")}
          >
            <TabText active={activeTab === "reviews"}>Avaliações</TabText>
          </Tab>
        </TabsContainer>

        <ContentSection>
          {activeTab === "services" && (
            <>
              {services.length === 0 ? (
                <EmptyMessage>Nenhum serviço disponível.</EmptyMessage>
              ) : (
                services.map((service) => (
                  <ServiceListItem key={service.id} service={service} />
                ))
              )}
            </>
          )}

          {activeTab === "reviews" && (
            <>
              {reviews.length === 0 ? (
                <EmptyMessage>Nenhuma avaliação disponível.</EmptyMessage>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </>
          )}
        </ContentSection>
      </ScrollView>
    </Container>
  );
};

export default PerfilVisitante;

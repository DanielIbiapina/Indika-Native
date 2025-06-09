import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import { userService } from "../../services/userService";
import { serviceService } from "../../services/serviceService";
import { reviewService } from "../../services/reviewService";
import { friendshipService } from "../../services/friendshipService";

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
  ActionButtonsContainer,
  ConnectButton,
  ConnectButtonText,
} from "./styles";

import ServiceListItem from "../../components/serviceListItem";

const PerfilVisitante = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user: currentUser } = useAuth();
  const { userId } = route.params; // Mudando de profileId para userId
  const [activeTab, setActiveTab] = useState("services");
  const [profileData, setProfileData] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState("none");
  const [loadingFriendship, setLoadingFriendship] = useState(false);

  useEffect(() => {
    loadProfileData();
    if (currentUser) {
      loadFriendshipStatus();
    }
  }, [userId]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profile, servicesData, reviewsData] = await Promise.all([
        userService.getPublicProfile(userId),
        serviceService.list({ profileId: userId }),
        reviewService.listReceivedReviews(userId),
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

  const loadFriendshipStatus = async () => {
    try {
      const status = await friendshipService.getFriendshipStatus(userId);
      setFriendshipStatus(status.status);
    } catch (err) {
      console.error("Erro ao carregar status da amizade:", err);
    }
  };

  const handleSendMessage = () => {
    if (!profileData?.id) {
      setError("Não foi possível iniciar a conversa");
      return;
    }

    navigation.navigate("Mensagens", {
      providerId: userId,
    });
  };

  const handleConnectPress = async () => {
    console.log("🔧 Debug handleConnectPress:");
    console.log("- currentUser:", currentUser?.id);
    console.log("- friendshipStatus:", friendshipStatus);
    console.log("- profileData:", profileData?.name);

    if (!currentUser) {
      Alert.alert(
        "Erro",
        "Você precisa estar logado para conectar com outros usuários"
      );
      return;
    }

    if (friendshipStatus === "none") {
      // Usar Alert.alert em vez de Alert.prompt para compatibilidade
      Alert.alert(
        "Conectar com " + profileData.name,
        "Deseja enviar uma solicitação de conexão?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Conectar",
            onPress: async () => {
              try {
                console.log("🚀 Enviando solicitação...");
                setLoadingFriendship(true);

                await friendshipService.sendFriendRequest(userId, "");

                console.log("✅ Solicitação enviada com sucesso");
                setFriendshipStatus("pending_sent");
                Alert.alert("Sucesso", "Solicitação de conexão enviada!");
              } catch (error) {
                console.error("❌ Erro ao enviar solicitação:", error);
                Alert.alert(
                  "Erro",
                  error.message || "Erro ao enviar solicitação"
                );
              } finally {
                setLoadingFriendship(false);
              }
            },
          },
        ]
      );
    } else if (friendshipStatus === "pending_received") {
      // Aceitar solicitação
      Alert.alert(
        "Aceitar conexão?",
        profileData.name + " quer se conectar com você. Aceitar?",
        [
          { text: "Rejeitar", style: "destructive", onPress: rejectConnection },
          { text: "Aceitar", onPress: acceptConnection },
        ]
      );
    } else if (friendshipStatus === "friends") {
      // Opções para amigos
      Alert.alert("Conexão", "Vocês já são conectados", [
        { text: "OK" },
        {
          text: "Desfazer conexão",
          style: "destructive",
          onPress: removeFriend,
        },
      ]);
    } else {
      console.log("⚠️ Status de amizade não reconhecido:", friendshipStatus);
      Alert.alert(
        "Erro",
        "Status de conexão não reconhecido. Tente novamente."
      );
    }
  };

  const acceptConnection = async () => {
    try {
      setLoadingFriendship(true);
      // Aqui precisaríamos do ID da solicitação, mas vamos simplificar
      await friendshipService.acceptFriendRequest(userId);
      setFriendshipStatus("friends");
      Alert.alert("Sucesso", "Conexão aceita! Agora vocês são amigos.");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoadingFriendship(false);
    }
  };

  const rejectConnection = async () => {
    try {
      setLoadingFriendship(true);
      await friendshipService.rejectFriendRequest(userId);
      setFriendshipStatus("none");
      Alert.alert("Solicitação rejeitada");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoadingFriendship(false);
    }
  };

  const removeFriend = async () => {
    try {
      setLoadingFriendship(true);
      await friendshipService.removeFriend(userId);
      setFriendshipStatus("none");
      Alert.alert("Conexão desfeita");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoadingFriendship(false);
    }
  };

  const getConnectButtonConfig = () => {
    switch (friendshipStatus) {
      case "none":
        return {
          text: "Conectar",
          icon: "person-add",
          disabled: false,
          style: "primary",
        };
      case "pending_sent":
        return {
          text: "Solicitação enviada",
          icon: "hourglass",
          disabled: true,
          style: "secondary",
        };
      case "pending_received":
        return {
          text: "Aceitar conexão",
          icon: "checkmark-circle",
          disabled: false,
          style: "success",
        };
      case "friends":
        return {
          text: "Conectados",
          icon: "people",
          disabled: false,
          style: "success",
        };
      default:
        return {
          text: "Conectar",
          icon: "person-add",
          disabled: false,
          style: "primary",
        };
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!profileData) return <ErrorMessage>Perfil não encontrado</ErrorMessage>;

  const buttonConfig = getConnectButtonConfig();

  return (
    <Container>
      <ScrollView>
        <ProfileHeader>
          <AvatarContainer>
            <Avatar source={{ uri: profileData.avatar }} />
          </AvatarContainer>
          <UserInfo>
            <UserName>{profileData.name}</UserName>
            {currentUser && currentUser.id !== userId && (
              <ActionButtonsContainer>
                <ConnectButton
                  onPress={handleConnectPress}
                  disabled={buttonConfig.disabled || loadingFriendship}
                  style={buttonConfig.style}
                >
                  {loadingFriendship ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Ionicons name={buttonConfig.icon} size={16} color="#fff" />
                  )}
                  <ConnectButtonText>{buttonConfig.text}</ConnectButtonText>
                </ConnectButton>
                {/*<MessageButton onPress={handleSendMessage}>
                  <Ionicons name="chatbubble" size={16} color="#fff" />
                  <MessageButtonText>Mensagem</MessageButtonText>
                </MessageButton>*/}
              </ActionButtonsContainer>
            )}
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

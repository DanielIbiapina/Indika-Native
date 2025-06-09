import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import { userService } from "../../services/userService";
import OrderCard from "../../components/orderCard";
import {
  Container,
  ProfileHeader,
  AvatarContainer,
  UserInfo,
  UserName,
  UserEmail,
  EditButton,
  EditButtonText,
  Stats,
  StatItem,
  StatValue,
  StatLabel,
  MenuSection,
  MenuItem,
  MenuItemText,
  Divider,
  TabsContainer,
  Tab,
  TabText,
  ContentSection,
  LoadingSpinner,
  ErrorMessage,
  Button,
  ButtonText,
  EmptyMessage,
  LoadMoreButton,
  LoadMoreButtonText,
  LoaderContainer,
  FriendRequestsSection,
  SectionHeader,
  SectionTitle,
  Badge,
  BadgeText,
  RequestCard,
  RequestAvatar,
  RequestInfo,
  RequestName,
  RequestMessage,
  RequestActions,
  AcceptButton,
  RejectButton,
  ActionButtonText,
} from "./styles";
import EditProfileModal from "../../components/editProfileModal";
import ServiceManageCard from "../../components/serviceManageCard";
import { serviceService } from "../../services/serviceService";
import { orderService } from "../../services/orderService";
import { reviewService } from "../../services/reviewService";
import ReviewCard from "../../components/reviewCard";
import { ORDER_STATUS_LABELS } from "../../constants/orderStatus";
import { useOrder } from "../../contexts/orderContext";
import { paymentService } from "../../services/paymentService";
import { useTutorial } from "../../contexts/tutorialContext";
import { friendshipService } from "../../services/friendshipService";

const ITEMS_PER_PAGE = 10;

const TABS = {
  RECEIVED_ORDERS: "receivedOrders",
  SERVICES: "services",
  REVIEWS: "reviews",
};

const TAB_LABELS = {
  [TABS.RECEIVED_ORDERS]: "Solicitações Recebidas",
  [TABS.SERVICES]: "Meus Serviços",
  [TABS.REVIEWS]: "Avaliações",
};

const { width: screenWidth } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { orderList, loadOrders } = useOrder();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.RECEIVED_ORDERS);
  const [profileData, setProfileData] = useState(null);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    services: { page: 1, hasMore: true, loading: false },
    orders: { page: 1, hasMore: true, loading: false },
    reviews: { page: 1, hasMore: true, loading: false },
  });

  // Tutorial state
  const [tutorialStep, setTutorialStep] = useState(0);
  const { startTutorial, endTutorial, shouldShowTutorial, resetTutorials } =
    useTutorial();

  // Adicionar apenas estes 2 estados após os existentes
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(false);

  useEffect(() => {
    loadProfileData();
    loadFriendRequests();
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case TABS.SERVICES:
        loadMyServices();
        break;
      case TABS.RECEIVED_ORDERS:
        loadReceivedOrders();
        break;
      case TABS.REVIEWS:
        loadReviews();
        break;
    }
  }, [activeTab]);

  useEffect(() => {
    if (user?.isProvider) {
      loadOrders({ providerId: user.id });
    }
  }, [user]);

  // Iniciar tutorial quando a tela for carregada (apenas para usuários logados)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        startTutorial("profile");
      }, 1000);
    }
  }, []);

  // ADICIONAR: Navigation listener para atualizar quando voltar de outras telas
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Atualizar apenas se for a aba de solicitações recebidas
      if (activeTab === TABS.RECEIVED_ORDERS) {
        loadReceivedOrders();
      }
    });

    return unsubscribe;
  }, [navigation, activeTab]);

  // ADICIONAR: Pull to refresh function
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadProfileData();
      await loadFriendRequests();

      switch (activeTab) {
        case TABS.SERVICES:
          await loadMyServices();
          break;
        case TABS.RECEIVED_ORDERS:
          await loadReceivedOrders();
          break;
        case TABS.REVIEWS:
          await loadReviews();
          break;
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const profile = await userService.getProfile();
      setProfileData(profile);
    } catch (err) {
      setError("Erro ao carregar dados do perfil");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMyServices = async (page = 1) => {
    try {
      setLoading(true);
      setPagination((prev) => ({
        ...prev,
        services: { ...prev.services, loading: true },
      }));

      const response = await serviceService.getMyServices({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setServices((prev) => (page === 1 ? response : [...prev, ...response]));

      setPagination((prev) => ({
        ...prev,
        services: {
          page,
          hasMore: response.length === ITEMS_PER_PAGE,
          loading: false,
        },
      }));
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
      setError("Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  };

  const loadReceivedOrders = async (page = 1) => {
    try {
      setLoading(true);
      setPagination((prev) => ({
        ...prev,
        orders: { ...prev.orders, loading: true },
      }));

      const orders = await orderService.list({
        role: "provider",
        page,
        limit: ITEMS_PER_PAGE,
      });

      setReceivedOrders((prev) => (page === 1 ? orders : [...prev, ...orders]));

      setPagination((prev) => ({
        ...prev,
        orders: {
          page,
          hasMore: orders.length === ITEMS_PER_PAGE,
          loading: false,
        },
      }));
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setError("Erro ao carregar pedidos recebidos");
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (page = 1) => {
    try {
      setLoading(true);
      setPagination((prev) => ({
        ...prev,
        reviews: { ...prev.reviews, loading: true },
      }));

      const response = await reviewService.listReceivedReviews(user.id);

      if (!response?.reviews) {
        throw new Error("Formato de resposta inválido");
      }

      setReviews((prev) =>
        page === 1 ? response.reviews : [...prev, ...response.reviews]
      );

      setPagination((prev) => ({
        ...prev,
        reviews: {
          page,
          hasMore: response.pagination?.total > reviews.length,
          loading: false,
        },
      }));
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
      setError("Erro ao carregar avaliações");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleEditService = (service) => {
    navigation.navigate("EditarServico", { serviceId: service.id });
  };

  const handleDeleteService = async (serviceId) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este serviço?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await serviceService.delete(serviceId);
              loadMyServices();
            } catch (error) {
              console.error("Erro ao deletar serviço:", error);
              Alert.alert("Erro", "Não foi possível excluir o serviço");
            }
          },
        },
      ]
    );
  };

  const handleLoadMore = async () => {
    const currentTab = {
      [TABS.SERVICES]: {
        loader: loadMyServices,
        pagination: pagination.services,
      },
      [TABS.RECEIVED_ORDERS]: {
        loader: loadReceivedOrders,
        pagination: pagination.orders,
      },
      [TABS.REVIEWS]: {
        loader: loadReviews,
        pagination: pagination.reviews,
      },
    }[activeTab];

    if (
      currentTab &&
      !currentTab.pagination.loading &&
      currentTab.pagination.hasMore
    ) {
      await currentTab.loader(currentTab.pagination.page + 1);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      await loadReceivedOrders(1);
      Alert.alert("Sucesso", "Status atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status do pedido");
    }
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      setLoading(true);
      await userService.updateProfile(updatedProfile);
      await loadProfileData();
      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceAction = async (serviceId, action) => {
    const actions = {
      edit: () => navigation.navigate("EditarServico", { serviceId }),
      delete: () => {
        Alert.alert(
          "Confirmar exclusão",
          "Tem certeza que deseja excluir este serviço?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Excluir",
              style: "destructive",
              onPress: async () => {
                try {
                  await serviceService.delete(serviceId);
                  await loadMyServices(1);
                } catch (error) {
                  console.error("Erro ao deletar serviço:", error);
                  Alert.alert("Erro", "Não foi possível excluir o serviço");
                }
              },
            },
          ]
        );
      },
    };

    actions[action]?.();
  };

  const handleCreateService = async () => {
    try {
      // Buscar informações de assinatura diretamente do serviço de pagamento
      const subscription = await paymentService.getSubscription();

      // Verificar se tem assinatura ativa
      if (!subscription || subscription.status !== "ACTIVE") {
        Alert.alert(
          "Assinatura necessária",
          "Para criar serviços, você precisa ter uma assinatura ativa.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Ver planos",
              onPress: () => navigation.navigate("Assinaturas"),
            },
          ]
        );
      } else {
        navigation.navigate("CriarServico");
      }
    } catch (error) {
      console.error("Erro ao verificar assinatura:", error);

      // Se der erro, presumimos que não tem assinatura e oferecemos a opção de ver planos
      Alert.alert(
        "Verificação de assinatura",
        "Não foi possível verificar sua assinatura. Você precisa de uma assinatura ativa para criar serviços.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Ver planos",
            onPress: () => navigation.navigate("Assinaturas"),
          },
        ]
      );
    }
  };

  // Tutorial content
  const tutorialContent = [
    {
      title: "Edite seu perfil",
      message:
        "Clique aqui para atualizar suas informações pessoais, foto de perfil e dados de contato",
      icon: "person-circle",
      targetArea: "edit-profile",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
    },
    {
      title: "Solicitações recebidas",
      message:
        "Visualize e gerencie as solicitações de serviços que você recebeu dos clientes",
      icon: "mail-outline",
      targetArea: "received-orders",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2645/2645728.png",
    },
    {
      title: "Meus serviços",
      message:
        "Gerencie seus serviços cadastrados e adicione novos serviços a sua oferta",
      icon: "construct-outline",
      targetArea: "my-services",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2897/2897785.png",
    },
    {
      title: "Avaliações",
      message:
        "Veja as avaliações e comentários que você recebeu dos seus clientes",
      icon: "star-outline",
      targetArea: "reviews",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1484/1484560.png",
    },
  ];

  // Função para avançar para o próximo passo do tutorial
  const handleNextTutorialStep = () => {
    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      // Se for o último passo, finalizar o tutorial
      endTutorial("profile");
      setTutorialStep(0);
    }
  };

  // Função para pular o tutorial
  const handleSkipTutorial = () => {
    endTutorial("profile");
    setTutorialStep(0);
  };

  // Botão de desenvolvimento para resetar o tutorial (remover em produção)
  const handleDevResetTutorial = () => {
    resetTutorials("profile");
    setTimeout(() => {
      startTutorial("profile");
    }, 500);
  };

  // Renderizar o tutorial
  const renderTutorial = () => {
    if (!shouldShowTutorial("profile")) return null;

    const currentStep = tutorialContent[tutorialStep];

    return (
      <Modal
        transparent={true}
        visible={true}
        animationType="fade"
        onRequestClose={handleSkipTutorial}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              width: screenWidth * 0.85,
              padding: 20,
              alignItems: "center",
              maxHeight: "80%",
            }}
          >
            {/* Número do passo */}
            <View
              style={{
                backgroundColor: "#422680",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {tutorialStep + 1}/{tutorialContent.length}
              </Text>
            </View>

            {/* Título */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#422680",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              {currentStep.title}
            </Text>

            {/* Imagem sem seta indicativa */}
            <View
              style={{
                width: "100%",
                height: 180,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                marginVertical: 16,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {/* Ícone de fallback */}
              <Ionicons name={currentStep.icon} size={60} color="#422680" />

              {/* Imagem de URL */}
              {currentStep.imageUrl && (
                <Image
                  source={{ uri: currentStep.imageUrl }}
                  style={{
                    position: "absolute",
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                />
              )}
            </View>

            {/* Mensagem */}
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                marginBottom: 24,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              {currentStep.message}
            </Text>

            {/* Botões */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={handleSkipTutorial}
                style={{
                  padding: 12,
                }}
              >
                <Text style={{ color: "#999" }}>Pular</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNextTutorialStep}
                style={{
                  backgroundColor: "#422680",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {tutorialStep === tutorialContent.length - 1
                    ? "Concluir"
                    : "Próximo"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAvatar = () => (
    <AvatarContainer>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
        source={profileData?.avatar ? { uri: profileData.avatar } : null}
        resizeMode="cover"
      />
    </AvatarContainer>
  );

  const renderStats = () => (
    <Stats>
      <StatItem>
        <StatValue>{profileData?._count?.providedServices || 0}</StatValue>
        <StatLabel>Serviços</StatLabel>
      </StatItem>
      <StatItem>
        <StatValue>
          {receivedOrders.filter((o) => o.status === "pending").length}
        </StatValue>
        <StatLabel>Pendentes</StatLabel>
      </StatItem>
      <StatItem>
        <StatValue>{profileData?.rating?.toFixed(1) || 0}</StatValue>
        <StatLabel>Avaliação</StatLabel>
      </StatItem>
    </Stats>
  );

  const renderFriendRequestsSection = () => {
    if (friendRequests.length === 0) return null;

    return (
      <FriendRequestsSection>
        <SectionHeader>
          <SectionTitle>Solicitações de Amizade</SectionTitle>
          <Badge>
            <BadgeText>{friendRequests.length}</BadgeText>
          </Badge>
        </SectionHeader>

        {friendRequests.map((request) => (
          <RequestCard key={request.id}>
            <RequestAvatar source={{ uri: request.requester.avatar }} />
            <RequestInfo>
              <RequestName>{request.requester.name}</RequestName>
              {request.message && (
                <RequestMessage>"{request.message}"</RequestMessage>
              )}
            </RequestInfo>
            <RequestActions>
              <AcceptButton
                onPress={() => handleAcceptFriendRequest(request.id)}
              >
                <Ionicons name="checkmark" size={16} color="#fff" />
                <ActionButtonText>Aceitar</ActionButtonText>
              </AcceptButton>
              <RejectButton
                onPress={() => handleRejectFriendRequest(request.id)}
              >
                <Ionicons name="close" size={16} color="#fff" />
                <ActionButtonText>Rejeitar</ActionButtonText>
              </RejectButton>
            </RequestActions>
          </RequestCard>
        ))}
      </FriendRequestsSection>
    );
  };

  const renderTabContent = () => {
    const content = {
      [TABS.RECEIVED_ORDERS]: (
        <>
          {receivedOrders.length === 0 ? (
            <EmptyMessage>Você não tem solicitações recebidas.</EmptyMessage>
          ) : (
            receivedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                statusLabels={ORDER_STATUS_LABELS}
                onPress={() =>
                  navigation.navigate("PedidoDetalhes", { orderId: order.id })
                }
                onStatusUpdate={handleStatusUpdate}
                showOrderDetails={false}
                isProvider={true}
                user={user}
                navigation={navigation}
                testID={`order-${order.id}`}
              />
            ))
          )}

          {pagination.orders.loading && <LoadingSpinner />}

          {pagination.orders.hasMore && !pagination.orders.loading && (
            <LoadMoreButton
              onPress={() => handleLoadMore()}
              testID="load-more-orders"
            >
              <LoadMoreButtonText>
                Carregar mais solicitações
              </LoadMoreButtonText>
            </LoadMoreButton>
          )}
        </>
      ),
      [TABS.SERVICES]: (
        <>
          <Button onPress={handleCreateService} testID="create-service-button">
            <Ionicons name="add" size={20} color="#fff" />
            <ButtonText>Criar Novo Serviço</ButtonText>
          </Button>

          {services.length === 0 ? (
            <EmptyMessage>
              Você ainda não tem serviços cadastrados.
            </EmptyMessage>
          ) : (
            <>
              {services.map((service) => (
                <ServiceManageCard
                  key={service.id}
                  service={service}
                  onEdit={() => handleServiceAction(service.id, "edit")}
                  onDelete={() => handleServiceAction(service.id, "delete")}
                  testID={`service-${service.id}`}
                />
              ))}

              {pagination.services.loading && <LoadingSpinner />}

              {pagination.services.hasMore && !pagination.services.loading && (
                <LoadMoreButton
                  onPress={() => handleLoadMore()}
                  testID="load-more-services"
                >
                  <LoadMoreButtonText>
                    Carregar mais serviços
                  </LoadMoreButtonText>
                </LoadMoreButton>
              )}
            </>
          )}
        </>
      ),
      [TABS.REVIEWS]: (
        <>
          {reviews.length === 0 ? (
            <EmptyMessage>Você ainda não tem avaliações.</EmptyMessage>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  testID={`review-${review.id}`}
                />
              ))}

              {pagination.reviews.hasMore && (
                <LoadMoreButton
                  onPress={() =>
                    navigation.navigate("TodasAvaliacoes", { userId: user.id })
                  }
                  testID="view-all-reviews"
                >
                  <LoadMoreButtonText>
                    Ver todas as avaliações
                  </LoadMoreButtonText>
                </LoadMoreButton>
              )}
            </>
          )}
        </>
      ),
    };

    return content[activeTab] || null;
  };

  const renderMenuItems = () => (
    <MenuSection>
      <MenuItem
        onPress={() => navigation.navigate("Configuracoes")}
        testID="settings-button"
      >
        <Ionicons name="settings-outline" size={24} color="#666" />
        <MenuItemText>Configurações</MenuItemText>
      </MenuItem>

      <MenuItem
        onPress={() => navigation.navigate("Mensagens")}
        testID="messages-button"
      >
        <Ionicons name="chatbubble-outline" size={24} color="#666" />
        <MenuItemText>Mensagens</MenuItemText>
      </MenuItem>

      <MenuItem
        onPress={() => navigation.navigate("Favoritos")}
        testID="favorites-button"
      >
        <Ionicons name="star-outline" size={24} color="#666" />
        <MenuItemText>Favoritos</MenuItemText>
      </MenuItem>

      <MenuItem
        onPress={() => navigation.navigate("Pagamentos")}
        testID="payments-button"
      >
        <Ionicons name="wallet-outline" size={24} color="#666" />
        <MenuItemText>Pagamentos</MenuItemText>
      </MenuItem>

      <MenuItem
        onPress={() => navigation.navigate("Assinaturas")}
        testID="subscriptions-button"
      >
        <Ionicons name="card-outline" size={24} color="#666" />
        <MenuItemText>Minha Assinatura</MenuItemText>
      </MenuItem>

      <Divider />

      <MenuItem onPress={logout} testID="logout-button">
        <Ionicons name="log-out-outline" size={24} color="#dc3545" />
        <MenuItemText style={{ color: "#dc3545" }}>Sair</MenuItemText>
      </MenuItem>
    </MenuSection>
  );

  const loadFriendRequests = async () => {
    try {
      setLoadingFriendRequests(true);
      const requests = await friendshipService.getPendingRequests();
      setFriendRequests(requests.received || []);
    } catch (err) {
      console.error("Erro ao carregar solicitações de amizade:", err);
    } finally {
      setLoadingFriendRequests(false);
    }
  };

  const handleAcceptFriendRequest = async (requestId) => {
    try {
      await friendshipService.acceptFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
      Alert.alert("Sucesso", "Solicitação aceita! Agora vocês são amigos.");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleRejectFriendRequest = async (requestId) => {
    Alert.alert(
      "Rejeitar solicitação",
      "Tem certeza que deseja rejeitar esta solicitação?",
      [
        { text: "Cancelar" },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: async () => {
            try {
              await friendshipService.rejectFriendRequest(requestId);
              setFriendRequests((prev) =>
                prev.filter((req) => req.id !== requestId)
              );
              Alert.alert("Solicitação rejeitada");
            } catch (error) {
              Alert.alert("Erro", error.message);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        testID="profile-scroll-view"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeader>
          {renderAvatar()}
          <UserInfo>
            <UserName>{profileData?.name}</UserName>
            <UserEmail>{profileData?.email}</UserEmail>
            <EditButton
              onPress={() => setIsEditing(true)}
              testID="edit-profile-button"
            >
              <Ionicons name="pencil" size={18} color="#666" />
              <EditButtonText>Editar perfil</EditButtonText>
            </EditButton>
          </UserInfo>
        </ProfileHeader>

        {renderStats()}

        {renderFriendRequestsSection()}

        <TabsContainer>
          {Object.entries(TAB_LABELS).map(([key, label]) => (
            <Tab
              key={key}
              active={activeTab === key}
              onPress={() => setActiveTab(key)}
              testID={`tab-${key}`}
            >
              <TabText active={activeTab === key}>{label}</TabText>
            </Tab>
          ))}
        </TabsContainer>

        <ContentSection>{renderTabContent()}</ContentSection>

        {renderMenuItems()}

        {isEditing && (
          <EditProfileModal
            profile={profileData}
            onUpdate={handleUpdateProfile}
            onClose={() => setIsEditing(false)}
          />
        )}

        {/* Botão DEV para resetar tutorial - Remover em produção */}
        {__DEV__ && (
          <TouchableOpacity
            onPress={handleDevResetTutorial}
            style={{
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
              backgroundColor: "#eee",
              borderRadius: 8,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#666" }}>Reset Tutorial (DEV)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Renderizar o tutorial */}
      {renderTutorial()}
    </Container>
  );
};

export default Profile;

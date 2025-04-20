import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Image,
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
} from "./styles";
import EditProfileModal from "../../components/editProfileModal";
import ServiceManageCard from "../../components/serviceManageCard";
import { serviceService } from "../../services/serviceService";
import { orderService } from "../../services/orderService";
import { reviewService } from "../../services/reviewService";
import ReviewCard from "../../components/reviewCard";
import { ORDER_STATUS_LABELS } from "../../constants/orderStatus";
import { useOrder } from "../../contexts/orderContext";

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

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { orderList, loadOrders } = useOrder();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    loadProfileData();
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
          <Button
            onPress={() => navigation.navigate("CriarServico")}
            testID="create-service-button"
          >
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

      <Divider />

      <MenuItem onPress={logout} testID="logout-button">
        <Ionicons name="log-out-outline" size={24} color="#dc3545" />
        <MenuItemText style={{ color: "#dc3545" }}>Sair</MenuItemText>
      </MenuItem>
    </MenuSection>
  );

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
      </ScrollView>
    </Container>
  );
};

export default Profile;

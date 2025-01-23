import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator, Alert } from "react-native";
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
  Avatar,
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

const STATUS_LABELS = {
  pending: "Pendente",
  accepted: "Aceito",
  in_progress: "Em andamento",
  completed: "Concluído",
  cancelled: "Cancelado",
};

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("receivedOrders");
  const [profileData, setProfileData] = useState(null);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesPage, setServicesPage] = useState(1);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [hasMoreServices, setHasMoreServices] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    if (activeTab === "services") {
      loadMyServices();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "receivedOrders") {
      loadReceivedOrders();
    }
  }, [activeTab]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const profile = await userService.getProfile();
      setProfileData(profile);
    } catch (err) {
      setError("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  };

  const loadMyServices = async (page = 1) => {
    try {
      setServicesLoading(true);
      const response = await serviceService.getMyServices({ page, limit: 10 });
      setServices(page === 1 ? response : [...services, ...response]);
      setHasMoreServices(response.length === 10);
      setServicesPage(page);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    } finally {
      setServicesLoading(false);
    }
  };

  const loadReceivedOrders = async () => {
    try {
      const orders = await orderService.list({ role: "provider" });
      setReceivedOrders(orders);
    } catch (error) {
      console.error("Erro ao carregar pedidos recebidos:", error);
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

  const loadMoreServices = () => {
    if (!servicesLoading && hasMoreServices) {
      loadMyServices(servicesPage + 1);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      loadReceivedOrders();
      Alert.alert("Sucesso", "Status atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status do pedido");
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <Avatar
            source={{ uri: profileData?.avatar }}
            //defaultSource={require("../../assets/default-avatar.png")}
          />
          <UserInfo>
            <UserName>{profileData?.name}</UserName>
            <UserEmail>{profileData?.email}</UserEmail>
            <EditButton onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={18} color="#666" />
              <EditButtonText>Editar perfil</EditButtonText>
            </EditButton>
          </UserInfo>
        </ProfileHeader>

        <Stats>
          <StatItem>
            <StatValue>{profileData?.servicesCount || 0}</StatValue>
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

        <TabsContainer>
          <Tab
            active={activeTab === "receivedOrders"}
            onPress={() => setActiveTab("receivedOrders")}
          >
            <TabText active={activeTab === "receivedOrders"}>
              Solicitações Recebidas
            </TabText>
          </Tab>
          <Tab
            active={activeTab === "services"}
            onPress={() => setActiveTab("services")}
          >
            <TabText active={activeTab === "services"}>Meus Serviços</TabText>
          </Tab>
          <Tab
            active={activeTab === "reviews"}
            onPress={() => setActiveTab("reviews")}
          >
            <TabText active={activeTab === "reviews"}>Avaliações</TabText>
          </Tab>
        </TabsContainer>

        <ContentSection>
          {activeTab === "receivedOrders" && (
            <>
              {receivedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusLabels={STATUS_LABELS}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </>
          )}

          {activeTab === "services" && (
            <>
              <Button onPress={() => navigation.navigate("CriarServico")}>
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
                      onEdit={handleEditService}
                      onDelete={handleDeleteService}
                    />
                  ))}

                  {servicesLoading && <LoadingSpinner />}

                  {hasMoreServices && !servicesLoading && (
                    <LoadMoreButton onPress={loadMoreServices}>
                      <LoadMoreButtonText>
                        Carregar mais serviços
                      </LoadMoreButtonText>
                    </LoadMoreButton>
                  )}
                </>
              )}
            </>
          )}
        </ContentSection>

        <MenuSection>
          <MenuItem onPress={() => navigation.navigate("Configuracoes")}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <MenuItemText>Configurações</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate("Mensagens")}>
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
            <MenuItemText>Mensagens</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate("Favoritos")}>
            <Ionicons name="star-outline" size={24} color="#666" />
            <MenuItemText>Favoritos</MenuItemText>
          </MenuItem>

          <Divider />

          <MenuItem
            onPress={() => {
              try {
                logout();
              } catch (error) {
                console.error("Erro ao fazer logout:", error);
              }
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#dc3545" />
            <MenuItemText style={{ color: "#dc3545" }}>Sair</MenuItemText>
          </MenuItem>
        </MenuSection>

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

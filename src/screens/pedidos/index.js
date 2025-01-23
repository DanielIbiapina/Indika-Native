import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { orderService } from "../../services/orderService";
import { reviewService } from "../../services/reviewService";
import { useAuth } from "../../contexts/authContext";
import {
  Container,
  Header,
  Title,
  HeaderActions,
  FilterButton,
  FilterButtonText,
  TabsContainer,
  Tab,
  OrdersGrid,
  LoginPrompt,
  PromptText,
  LoginButton,
  IllustrationWrapper,
  ErrorMessage,
  TabText,
  LoaderContainer,
} from "./styles";
import OrderCard from "../../components/orderCard";
import SearchBar from "../../components/searchBar";

const STATUS_LABELS = {
  pending: "Pendente",
  accepted: "Aceito",
  in_progress: "Em andamento",
  completed: "Concluído",
  cancelled: "Cancelado",
};

const Pedidos = () => {
  const navigation = useNavigation();
  const { signed: isLoggedIn, user } = useAuth();
  const [activeTab, setActiveTab] = useState("active");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadOrdersAndReviews = async () => {
      if (isLoggedIn) {
        await loadOrders();
        const userReviews = await reviewService.listByUser(user.id);
        setReviews(userReviews);
      } else {
        setLoading(false);
      }
    };

    loadOrdersAndReviews();
  }, [isLoggedIn]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.list();

      const activeOrders = data.filter((order) =>
        ["pending", "accepted", "in_progress"].includes(order.status)
      );
      const completedOrders = data.filter((order) =>
        ["completed", "cancelled"].includes(order.status)
      );

      setOrders({
        active: activeOrders,
        completed: completedOrders,
      });
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <LoginPrompt>
          <IllustrationWrapper>
            <Ionicons name="person-circle" size={80} color="#422680" />
          </IllustrationWrapper>
          <PromptText>
            <Title>Faça login para ver seus pedidos</Title>
            <Text>
              Acompanhe seus serviços e mantenha contato com os prestadores
            </Text>
          </PromptText>
          <LoginButton onPress={() => navigation.navigate("Entrar")}>
            <Text>Entrar ou criar conta</Text>
          </LoginButton>
        </LoginPrompt>
      </Container>
    );
  }

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
      <Header>
        <Title>Seus Pedidos</Title>
        <HeaderActions>
          <FilterButton
            onPress={() => {
              /* adicionar função de filtro aqui */
            }}
          >
            <Ionicons name="filter-outline" size={24} color="#666" />
            <FilterButtonText>Filtrar</FilterButtonText>
          </FilterButton>
          <SearchBar placeholder="Buscar pedidos..." />
        </HeaderActions>
      </Header>

      <TabsContainer>
        <Tab
          active={activeTab === "active"}
          onPress={() => setActiveTab("active")}
        >
          <TabText active={activeTab === "active"}>Em Andamento</TabText>
        </Tab>
        <Tab
          active={activeTab === "completed"}
          onPress={() => setActiveTab("completed")}
        >
          <TabText active={activeTab === "completed"}>Concluídos</TabText>
        </Tab>
      </TabsContainer>

      <FlatList
        data={orders[activeTab]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            statusLabels={STATUS_LABELS}
            onStatusUpdate={loadOrders}
          />
        )}
        ListEmptyComponent={
          <ErrorMessage>
            Nenhum pedido{" "}
            {activeTab === "active" ? "em andamento" : "concluído"}.
          </ErrorMessage>
        }
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </Container>
  );
};

export default Pedidos;

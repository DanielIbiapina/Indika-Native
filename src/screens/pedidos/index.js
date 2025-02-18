import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, View, Text, Alert } from "react-native";
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
  paid: "Pago",
  PAID: "Pago",
  cancelled: "Cancelado",
};

const Pedidos = () => {
  const navigation = useNavigation();
  const route = useRoute();
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
        try {
          const response = await reviewService.listByUser(user.id);
          console.log("Reviews carregadas:", response);
          // Extraindo o array de reviews do objeto de resposta
          setReviews(response.reviews || []);
        } catch (error) {
          console.error("Erro ao carregar reviews:", error);
          setReviews([]);
        }
      } else {
        setLoading(false);
      }
    };

    loadOrdersAndReviews();
  }, [isLoggedIn]);

  useEffect(() => {
    if (route.params?.status) {
      handlePaymentStatus(route.params.status);
    }
  }, [route.params?.status]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.list();

      const activeOrders = data.filter((order) =>
        ["pending", "accepted", "in_progress"].includes(order.status)
      );
      const completedOrders = data.filter((order) =>
        ["completed", "cancelled", "paid", "PAID"].includes(order.status)
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

  const handlePaymentStatus = (status) => {
    switch (status) {
      case "success":
        Alert.alert("Sucesso", "Pagamento realizado com sucesso!");
        loadOrders(); // Recarrega os pedidos
        break;
      case "failure":
        Alert.alert("Erro", "Não foi possível processar o pagamento");
        break;
      case "pending":
        Alert.alert("Pendente", "Seu pagamento está em processamento");
        break;
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
            isOrderPage={true}
            reviews={reviews}
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

import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../contexts/authContext";
import { useOrder } from "../../contexts/orderContext";
import OrderCard from "../../components/orderCard";
import SearchBar from "../../components/searchBar";

import {
  Container,
  Title,
  HeaderActions,
  FilterButton,
  FilterButtonText,
  TabsContainer,
  Tab,
  LoginPrompt,
  IllustrationWrapper,
  ErrorMessage,
  TabText,
  LoaderContainer,
  SectionTitleText,
  ViewAllText,
  LoginButton,
  LoginButtonText,
} from "./styles";

const ACTIVE_STATUS = [
  "WAITING_QUOTE",
  "QUOTE_SENT",
  "QUOTE_ACCEPTED",
  "PAYMENT_PENDING",
  "PENDING_CONFIRMATION",
  "PAID",
];

const COMPLETED_STATUS = ["COMPLETED", "CANCELLED", "QUOTE_REJECTED"];

const Pedidos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { signed: isLoggedIn } = useAuth();
  const { orderList, loadOrders, loading } = useOrder();

  const [activeTab, setActiveTab] = useState("active");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (orderList.length > 0) {
      const activeOrders = orderList.filter((order) =>
        ACTIVE_STATUS.includes(order.status)
      );
      const completedOrders = orderList.filter((order) =>
        COMPLETED_STATUS.includes(order.status)
      );
      setFilteredOrders(
        activeTab === "active" ? activeOrders : completedOrders
      );
    } else {
      setFilteredOrders([]);
    }
  }, [orderList, activeTab]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.shouldRefresh) {
        loadOrders();
        navigation.setParams({ shouldRefresh: false });
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadOrders();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <LoginPrompt>
          <IllustrationWrapper>
            <Ionicons name="person-circle" size={80} color="#422680" />
          </IllustrationWrapper>
          <SectionTitleText>Faça login para ver seus pedidos</SectionTitleText>
          <ViewAllText>
            Acompanhe seus serviços e mantenha contato com os prestadores
          </ViewAllText>
          <LoginButton onPress={() => navigation.navigate("Entrar")}>
            <LoginButtonText>Entrar ou criar conta</LoginButtonText>
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

  return (
    <Container>
      <Title>Pedidos</Title>
      <HeaderActions>
        <FilterButton>
          <Ionicons name="filter-outline" size={24} color="#422680" />
          <FilterButtonText>Filtrar</FilterButtonText>
        </FilterButton>
        <SearchBar
          placeholder="Buscar pedidos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </HeaderActions>

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
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            isOrderPage={true}
            onPress={() =>
              navigation.navigate("PedidoDetalhes", { orderId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <ErrorMessage>Nenhum pedido encontrado.</ErrorMessage>
        }
        contentContainerStyle={{ paddingBottom: 60 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#422680"]}
            tintColor="#422680"
          />
        }
      />
    </Container>
  );
};

export default Pedidos;

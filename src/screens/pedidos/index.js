/*import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { orderService } from "../../services/orderService";
import { ORDER_STATUS_LABELS } from "../../constants/orderStatus";
import { useAuth } from "../../contexts/authContext";
import OrderCard from "../../components/orderCard";
import SearchBar from "../../components/searchBar";
import { useOrder } from "../../contexts/orderContext";

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
  "WAITING_PAYMENT",
  "IN_PROGRESS",
];

const COMPLETED_STATUS = ["COMPLETED", "CANCELLED", "PAID", "QUOTE_REJECTED"];

const Pedidos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { signed: isLoggedIn } = useAuth();
  const { orderList, loadOrders, loading } = useOrder();

  const [activeTab, setActiveTab] = useState("active");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Carrega os pedidos inicialmente
    loadOrders();
    console.log("orderList", orderList["active"]);

    // Configura um intervalo para atualizar os pedidos a cada 30 segundos
    const intervalId = setInterval(() => {
      loadOrders();
    }, 30000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (route.params?.status) {
      const messages = {
        success: "Pagamento realizado com sucesso!",
        failure: "Não foi possível processar o pagamento",
        pending: "Seu pagamento está em processamento",
      };

      Alert.alert(
        route.params.status === "success" ? "Sucesso" : "Aviso",
        messages[route.params.status]
      );

      if (route.params.status === "success") {
        loadOrders();
      }
    }
  }, [route.params?.status]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (isLoggedIn && (route.params?.ordersUpdated || route.params?.status)) {
        loadOrders();
        navigation.setParams({ ordersUpdated: false });
      }
    });

    return unsubscribe;
  }, [navigation, isLoggedIn, route.params]);

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
          <LoginButton
            onPress={() => navigation.navigate("Entrar")}
            testID="login-button"
          >
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

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Seus Pedidos</Title>

      <HeaderActions>
        <FilterButton>
          <Ionicons name="filter-outline" size={24} color="#422680" />
          <FilterButtonText>Filtrar</FilterButtonText>
        </FilterButton>
        <SearchBar
          placeholder="Buscar pedidos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="orders-search"
        />
      </HeaderActions>

      <TabsContainer>
        <Tab
          active={activeTab === "active"}
          onPress={() => setActiveTab("active")}
          testID="active-tab"
        >
          <TabText active={activeTab === "active"}>Em Andamento</TabText>
        </Tab>
        <Tab
          active={activeTab === "completed"}
          onPress={() => setActiveTab("completed")}
          testID="completed-tab"
        >
          <TabText active={activeTab === "completed"}>Concluídos</TabText>
        </Tab>
      </TabsContainer>

      <FlatList
        data={orderList[activeTab]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            statusLabels={ORDER_STATUS_LABELS}
            onPress={() =>
              navigation.navigate("PedidoDetalhes", { orderId: item.id })
            }
            showOrderDetails={false}
          />
        )}
        ListEmptyComponent={
          <ErrorMessage>
            Nenhum pedido{" "}
            {activeTab === "active" ? "em andamento" : "concluído"}.
          </ErrorMessage>
        }
        contentContainerStyle={{ paddingBottom: 60 }}
        testID="orders-list"
      />
    </Container>
  );
};

export default Pedidos;
*/

import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Alert } from "react-native";
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
  "WAITING_PAYMENT",
  "IN_PROGRESS",
];

const COMPLETED_STATUS = ["COMPLETED", "CANCELLED", "PAID", "QUOTE_REJECTED"];

const Pedidos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { signed: isLoggedIn } = useAuth();
  const { orderList, loadOrders, loading } = useOrder();

  const [activeTab, setActiveTab] = useState("active");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadOrders();
    const intervalId = setInterval(() => {
      loadOrders();
    }, 30000);
    return () => clearInterval(intervalId);
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
      <Title>Seus Pedidos</Title>
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
            onPress={() =>
              navigation.navigate("PedidoDetalhes", { orderId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <ErrorMessage>Nenhum pedido encontrado.</ErrorMessage>
        }
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </Container>
  );
};

export default Pedidos;

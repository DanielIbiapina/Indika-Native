import React, { useState, useEffect } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/authContext";
import { paymentService } from "../../../services/paymentService";
import {
  Container,
  Header,
  Title,
  FilterContainer,
  FilterButton,
  FilterText,
  TransactionList,
  TransactionCard,
  TransactionHeader,
  ServiceName,
  Amount,
  TransactionInfo,
  UserInfo,
  UserName,
  DateText,
  EmptyState,
  EmptyStateText,
  LoaderContainer,
  ListContainer,
} from "./styles";
import PaymentStatusBadge from "../../../components/payment/paymentStatusBadge";

const STATUS_MAP = {
  completed: "Concluído",
  pending: "Pendente",
  failed: "Falhou",
};

const HistoricoPagamento = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all"); // all, received, sent
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getPaymentHistory();

      // Filtrar transações baseado no tipo selecionado
      let filteredTransactions = response.data;
      if (filter === "received") {
        filteredTransactions = response.data.filter(
          (transaction) => transaction.receiverId === user.id
        );
      } else if (filter === "sent") {
        filteredTransactions = response.data.filter(
          (transaction) => transaction.senderId === user.id
        );
      }

      setTransactions(filteredTransactions);
    } catch (error) {
      setError("Erro ao carregar histórico de pagamentos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTransactions();
  }, [filter]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const renderTransaction = ({ item }) => (
    <TransactionCard>
      <TransactionHeader>
        <ServiceName>Serviço</ServiceName>
        <Amount income={item.receiverId === user.id}>
          {formatAmount(item.amount)}
        </Amount>
      </TransactionHeader>
      <TransactionInfo>
        <UserInfo>
          <UserName>
            {item.receiverId === user.id
              ? `De: ${item.sender.name}`
              : `Para: ${item.receiver.name}`}
          </UserName>
          <DateText>{formatDate(item.createdAt)}</DateText>
        </UserInfo>
        <PaymentStatusBadge status={item.status} />
      </TransactionInfo>
    </TransactionCard>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <LoaderContainer>
          <ActivityIndicator size="large" color="#422680" />
        </LoaderContainer>
      );
    }

    return (
      <TransactionList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="receipt-outline" size={48} color="#666" />
            <EmptyStateText>
              Nenhuma transação encontrada para o filtro selecionado
            </EmptyStateText>
          </EmptyState>
        }
      />
    );
  };

  return (
    <Container>
      <Header>
        <Title>Histórico de Pagamentos</Title>
      </Header>

      <FilterContainer>
        <FilterButton
          active={filter === "all"}
          onPress={() => setFilter("all")}
        >
          <FilterText active={filter === "all"}>Todos</FilterText>
        </FilterButton>
        <FilterButton
          active={filter === "received"}
          onPress={() => setFilter("received")}
        >
          <FilterText active={filter === "received"}>Recebidos</FilterText>
        </FilterButton>
        <FilterButton
          active={filter === "sent"}
          onPress={() => setFilter("sent")}
        >
          <FilterText active={filter === "sent"}>Enviados</FilterText>
        </FilterButton>
      </FilterContainer>

      <ListContainer>{renderContent()}</ListContainer>
    </Container>
  );
};

export default HistoricoPagamento;

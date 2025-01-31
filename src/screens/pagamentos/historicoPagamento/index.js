import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  DateText,
  StatusBadge,
  StatusText,
  EmptyState,
  EmptyStateText,
  LoaderContainer,
} from "./styles";
import PaymentStatusBadge from "../../../components/payment/paymentStatusBadge";

const STATUS_MAP = {
  completed: "Concluído",
  pending: "Pendente",
  failed: "Falhou",
};

const HistoricoPagamento = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, received, sent
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, [filter]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getPaymentHistory();
      setTransactions(response.data);
    } catch (error) {
      setError("Erro ao carregar histórico de pagamentos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

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

      <TransactionList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard>
            <TransactionHeader>
              <ServiceName>{item.serviceName}</ServiceName>
              <Amount income={item.type === "received"}>
                {formatAmount(item.amount)}
              </Amount>
            </TransactionHeader>
            <TransactionInfo>
              <DateText>{formatDate(item.date)}</DateText>
              <PaymentStatusBadge status={item.status} />
            </TransactionInfo>
          </TransactionCard>
        )}
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="receipt-outline" size={48} color="#666" />
            <EmptyStateText>
              Nenhuma transação encontrada para o filtro selecionado
            </EmptyStateText>
          </EmptyState>
        }
      />
    </Container>
  );
};

export default HistoricoPagamento;

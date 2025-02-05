import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { paymentService } from "../../../services/paymentService";
import {
  Container,
  Header,
  Title,
  PaymentList,
  PaymentCard,
  PaymentHeader,
  ServiceName,
  Amount,
  PaymentInfo,
  ClientName,
  ProviderName,
  DateText,
  ActionButtons,
  ConfirmButton,
  RejectButton,
  ButtonText,
  EmptyState,
  EmptyStateText,
  LoaderContainer,
  StatusBadge,
  StatusText,
} from "./styles";
import PaymentStatusBadge from "../../../components/payment/paymentStatusBadge";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getAdminPayments();

      setPayments(response);
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar pagamentos");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (orderId) => {
    try {
      await paymentService.confirmPayment(orderId, true);
      Alert.alert("Sucesso", "Pagamento confirmado com sucesso");
      loadPayments();
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao confirmar pagamento"
      );
    }
  };

  const handleRejectPayment = async (orderId) => {
    try {
      await paymentService.confirmPayment(orderId, false);
      Alert.alert("Sucesso", "Pagamento rejeitado");
      loadPayments();
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao rejeitar pagamento"
      );
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPayments();
    setRefreshing(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      {/*<Header>
        <Title>Gerenciar Pagamentos</Title>
      </Header>*/}

      <PaymentList
        data={payments}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PaymentCard>
            <PaymentHeader>
              <ServiceName>{item.order.service.title}</ServiceName>
              <Amount>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.amount)}
              </Amount>
            </PaymentHeader>

            <PaymentInfo>
              <ClientName>Cliente: {item.sender.name}</ClientName>
              <ProviderName>Prestador: {item.receiver.name}</ProviderName>
              <DateText>
                Data: {new Date(item.createdAt).toLocaleDateString("pt-BR")}
              </DateText>
              <PaymentStatusBadge status={item.status} />
            </PaymentInfo>

            {item.status === "AWAITING_CONFIRMATION" && (
              <ActionButtons>
                <ConfirmButton
                  onPress={() => {
                    Alert.alert(
                      "Confirmar Pagamento",
                      "Tem certeza que deseja confirmar este pagamento?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Confirmar",
                          onPress: () => handleConfirmPayment(item.orderId),
                        },
                      ]
                    );
                  }}
                >
                  <ButtonText>Confirmar</ButtonText>
                </ConfirmButton>

                <RejectButton
                  onPress={() => {
                    Alert.alert(
                      "Rejeitar Pagamento",
                      "Tem certeza que deseja rejeitar este pagamento?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Rejeitar",
                          onPress: () => handleRejectPayment(item.orderId),
                        },
                      ]
                    );
                  }}
                >
                  <ButtonText>Rejeitar</ButtonText>
                </RejectButton>
              </ActionButtons>
            )}
          </PaymentCard>
        )}
        ListEmptyComponent={
          <EmptyState>
            <Ionicons name="receipt-outline" size={48} color="#666" />
            <EmptyStateText>Nenhum pagamento pendente</EmptyStateText>
          </EmptyState>
        }
      />
    </Container>
  );
};

export default AdminPayments;

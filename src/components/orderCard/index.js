import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  ServiceInfo,
  ServiceImage,
  ServiceDetails,
  StatusBadge,
  Price,
  ActionsContainer,
  ActionButton,
  RateButton,
} from "./styles";
import StarRating from "../starRating";
import { paymentService } from "../../services/paymentService";

const OrderCard = ({
  order,
  statusLabels,
  onStatusUpdate,
  isOrderPage,
  reviews = [],
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const isProvider = user?.id === order.providerId;
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    console.log(isOrderPage);

    const loadPaymentStatus = async () => {
      try {
        if (order.status === "completed") {
          const response = await paymentService.getPaymentStatus(order.id);

          setPaymentStatus(response.paymentStatus);
        }
      } catch (error) {
        console.error("Erro ao carregar status do pagamento:", error);
      }
    };

    loadPaymentStatus();
  }, [order.id, order.status]);

  const handleRateOrder = () => {
    navigation.navigate("ServicoDetalhes", { id: order.service.id });
  };

  const handlePaymentRequest = async () => {
    try {
      await paymentService.createPaymentRequest({
        orderId: order.id,
        amount: order.price,
        receiverId: order.providerId,
        senderId: order.clientId,
      });

      Alert.alert("Sucesso", "Solicitação de pagamento enviada ao cliente");
    } catch (error) {
      console.error("Erro detalhado:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Erro ao solicitar pagamento. Por favor, tente novamente."
      );
    }
  };

  const handlePayment = () => {
    navigation.navigate("ProcessarPagamento", {
      orderId: order.id,
      amount: order.price,
      providerId: order.providerId,
      serviceTitle: order.service.title,
    });
  };

  const userReview = Array.isArray(reviews)
    ? reviews.find((r) => r.orderId === order.id && r.reviewerId === user?.id)
    : null;

  return (
    <Card>
      <ServiceInfo>
        <ServiceImage source={{ uri: order.service.images[0] }} />
        <ServiceDetails>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
            {order.service.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            {order.provider.name}
          </Text>
          <StatusBadge status={order.status}>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              {statusLabels[order.status]}
            </Text>
          </StatusBadge>
        </ServiceDetails>
      </ServiceInfo>
      <Price>R$ {Number(order.price).toFixed(2)}</Price>
      {order.description && <Text>{order.description}</Text>}
      {isProvider && order.status === "pending" && (
        <ActionsContainer>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "accepted")}
            variant="primary"
          >
            <Text style={{ color: "white" }}>Aceitar</Text>
          </ActionButton>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "cancelled")}
            variant="secondary"
          >
            <Text style={{ color: "#dc3545" }}>Recusar</Text>
          </ActionButton>
        </ActionsContainer>
      )}
      {isProvider && order.status === "accepted" && (
        <ActionsContainer>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "in_progress")}
            variant="primary"
          >
            <Text style={{ color: "white" }}>Iniciar</Text>
          </ActionButton>
        </ActionsContainer>
      )}
      {isProvider && order.status === "in_progress" && (
        <ActionsContainer>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "completed")}
            variant="primary"
          >
            <Text style={{ color: "white" }}>Concluir</Text>
          </ActionButton>
        </ActionsContainer>
      )}
      {/* Botão de solicitar pagamento (prestador) */}
      {/*
      isProvider &&
        order.status === "completed" &&
        (!paymentStatus || paymentStatus === "CANCELLED") && (
          <ActionsContainer>
            <ActionButton onPress={handlePaymentRequest} variant="primary">
              <Text style={{ color: "white" }}>Solicitar Pagamento</Text>
            </ActionButton>
          </ActionsContainer>
        )
      */}
      {/* Botão de realizar pagamento (cliente) */}
      {console.log(paymentStatus)}
      {!isProvider &&
        order.status === "completed" &&
        (!paymentStatus || paymentStatus === "CANCELLED") && (
          <ActionsContainer>
            <ActionButton onPress={handlePayment} variant="primary">
              <Text style={{ color: "white" }}>Realizar Pagamento</Text>
            </ActionButton>
          </ActionsContainer>
        )}
      {console.log(
        (order.status === "completed" || order.status === "PAID") && isOrderPage
      )}
      {(order.status === "completed" || order.status === "PAID") &&
        isOrderPage && (
          <>
            {userReview ? (
              <View>
                <StarRating rating={userReview.rating} />
              </View>
            ) : (
              <RateButton onPress={handleRateOrder}>
                <Text style={{ color: "white", marginRight: 8 }}>⭐</Text>
                <Text style={{ color: "white" }}>Avaliar Pedido</Text>
              </RateButton>
            )}
          </>
        )}
    </Card>
  );
};

export default OrderCard;

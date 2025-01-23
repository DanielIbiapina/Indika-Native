import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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

const OrderCard = ({
  order,
  statusLabels,
  onStatusUpdate,
  isOrderPage,
  reviews,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const isProvider = user?.id === order.providerId;

  const handleRateOrder = () => {
    navigation.navigate("ServicoDetalhes", { id: order.service.id });
  };

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

      {order.status === "completed" && isOrderPage ? (
        reviews.some(
          (r) => r.orderId === order.id && r.reviewerId === user?.id
        ) ? (
          <View>
            <StarRating
              rating={
                reviews.find(
                  (r) => r.orderId === order.id && r.reviewerId === user?.id
                ).rating
              }
            />
          </View>
        ) : (
          <RateButton onPress={handleRateOrder}>
            <Text style={{ color: "white", marginRight: 8 }}>⭐</Text>
            <Text style={{ color: "white" }}>Avaliar Pedido</Text>
          </RateButton>
        )
      ) : null}
    </Card>
  );
};

export default OrderCard;

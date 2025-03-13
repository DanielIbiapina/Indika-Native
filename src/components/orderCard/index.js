import React from "react";
import { View } from "react-native";
import { useAuth } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import StarRating from "../starRating";
import { ORDER_STATUS_LABELS } from "../../constants/orderStatus";
import { paymentService } from "../../services/paymentService";
import {
  Container,
  ServiceInfo,
  ServiceImage,
  ServiceDetails,
  ServiceTitle,
  ProviderName,
  StatusBadge,
  StatusText,
  DateText,
  Price,
  ButtonsContainer,
  ActionButton,
  ButtonText,
  ActionsContainer,
  RateButton,
  OrderDetailsButton,
  OrderDetailsText,
} from "./styles";

const OrderCard = ({
  order,
  onStatusUpdate,
  isOrderPage,
  reviews = [],
  onPress,
  showOrderDetails,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const isProvider = user?.id === order.providerId;

  const formatDate = (date) => {
    try {
      return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return "Data não definida";
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

  const handleViewDetails = () => {
    navigation.navigate("PedidoDetalhes", { orderId: order.id });
  };

  const handleOpenChat = () => {
    navigation.navigate("Mensagens", {
      providerId: order.providerId,
      orderId: order.id,
    });
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    handleViewDetails();
  };

  const userReview = reviews.find(
    (r) => r.orderId === order.id && r.reviewerId === user?.id
  );

  return (
    <Container onPress={handlePress} testID={`order-card-${order.id}`}>
      <ServiceInfo>
        <ServiceImage
          source={{ uri: order.service.images[0] }}
          testID={`order-image-${order.id}`}
        />
        <ServiceDetails>
          <ServiceTitle>{order.service.title}</ServiceTitle>
          <ProviderName>{order.provider.name}</ProviderName>
          <StatusBadge status={order.status}>
            <StatusText status={order.status}>
              {ORDER_STATUS_LABELS[order.status]}
            </StatusText>
          </StatusBadge>
        </ServiceDetails>
      </ServiceInfo>

      <DateText>{formatDate(order.scheduledDate)}</DateText>

      {order.price && <Price>R$ {Number(order.price).toFixed(2)}</Price>}

      <ButtonsContainer>
        <ActionButton
          onPress={handleViewDetails}
          variant="secondary"
          testID={`view-details-${order.id}`}
        >
          <ButtonText variant="secondary">Ver Detalhes</ButtonText>
        </ActionButton>

        <ActionButton onPress={handleOpenChat} testID={`open-chat-${order.id}`}>
          <ButtonText>Abrir Chat</ButtonText>
        </ActionButton>
      </ButtonsContainer>

      {isProvider && order.status === "pending" && (
        <ActionsContainer>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "accepted")}
            testID={`accept-order-${order.id}`}
          >
            <ButtonText>Aceitar</ButtonText>
          </ActionButton>
          <ActionButton
            onPress={() => onStatusUpdate(order.id, "cancelled")}
            variant="secondary"
            testID={`reject-order-${order.id}`}
          >
            <ButtonText variant="secondary">Recusar</ButtonText>
          </ActionButton>
        </ActionsContainer>
      )}

      {isProvider && order.status === "accepted" && (
        <ActionsContainer>
          <ActionButton onPress={() => onStatusUpdate(order.id, "in_progress")}>
            <ButtonText>Iniciar</ButtonText>
          </ActionButton>
        </ActionsContainer>
      )}

      {isProvider && order.status === "in_progress" && (
        <ActionsContainer>
          <ActionButton onPress={() => onStatusUpdate(order.id, "completed")}>
            <ButtonText>Concluir</ButtonText>
          </ActionButton>
        </ActionsContainer>
      )}

      {!isProvider && order.status === "completed" && (
        <ActionsContainer>
          <ActionButton onPress={handlePayment}>
            <ButtonText>Realizar Pagamento</ButtonText>
          </ActionButton>
        </ActionsContainer>
      )}

      {(order.status === "completed" || order.status === "PAID") &&
        isOrderPage && (
          <>
            {userReview ? (
              <View>
                <StarRating rating={userReview.rating} />
              </View>
            ) : (
              <RateButton
                onPress={() =>
                  navigation.navigate("ServicoDetalhes", {
                    id: order.service.id,
                  })
                }
              >
                <ButtonText>⭐ Avaliar Pedido</ButtonText>
              </RateButton>
            )}
          </>
        )}

      {showOrderDetails && (
        <OrderDetailsButton
          onPress={handleViewDetails}
          testID={`order-details-${order.id}`}
        >
          <Ionicons name="document-text-outline" size={20} color="#422680" />
          <OrderDetailsText>Ver Detalhes do Pedido</OrderDetailsText>
        </OrderDetailsButton>
      )}
    </Container>
  );
};

export default OrderCard;

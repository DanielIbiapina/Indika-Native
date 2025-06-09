import React from "react";
import { View } from "react-native";
import { useAuth } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Alert } from "react-native";

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
import QuotationModal from "../quotationModal";
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_CONFIG,
} from "../../constants/paymentStatus";

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
  const [showQuotationModal, setShowQuotationModal] = React.useState(false);

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
    try {
      // SOLUÇÃO SIMPLES: sempre usar providerId, mas passar quem é o outro participante
      const otherUserId = isProvider ? order.clientId : order.providerId;

      navigation.navigate("Mensagens", {
        providerId: otherUserId, // O ID da pessoa com quem quer conversar
        orderId: order.id,
        order: order,
      });

      console.log("Navegando para conversar com:", otherUserId);
    } catch (error) {
      console.error("Erro ao navegar para o chat:", error);
      Alert.alert("Erro", "Não foi possível abrir o chat. Tente novamente.");
    }
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

  const handleQuotation = () => {
    setShowQuotationModal(true);
  };

  const handleQuotationConfirm = () => {
    // Implemente a lógica para confirmar o envio do orçamento
  };

  const paymentConfig = PAYMENT_METHOD_CONFIG[order.payment?.paymentMethod];
  if (paymentConfig?.requiresProviderConfirmation) {
    // lógica de confirmação
  }

  // Renderizar ações baseadas no status atual
  const renderActions = () => {
    console.log("order.status", order.status);
    if (isProvider) {
      switch (order.status) {
        case "WAITING_QUOTE":
          return null;

        default:
          return null;
      }
    } else {
      // Ações do cliente - REMOVER todos os botões
      switch (order.status) {
        // REMOVIDO: botões "Aceitar/Recusar Orçamento"
        // case "QUOTE_SENT":

        // REMOVIDO: botão "Realizar Pagamento"
        // case "QUOTE_ACCEPTED":
        //   return (
        //     <ActionsContainer>
        //       <ActionButton
        //         onPress={handlePayment}
        //         testID={`make-payment-${order.id}`}
        //       >
        //         <ButtonText>Realizar Pagamento</ButtonText>
        //       </ActionButton>
        //     </ActionsContainer>
        //   );

        case "PAID":
          console.log("userReview", !userReview);
          console.log("isOrderPage", isOrderPage);
          if (!userReview && isOrderPage) {
            console.log("userReview", !userReview);
            console.log("isOrderPage", isOrderPage);
            return (
              <RateButton
                onPress={() =>
                  navigation.navigate("ServicoDetalhes", {
                    id: order.service.id,
                  })
                }
                testID={`rate-service-${order.id}`}
              >
                <ButtonText>⭐ Avaliar Serviço</ButtonText>
              </RateButton>
            );
          }
          return null;

        default:
          return null;
      }
    }
  };

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

      {renderActions()}

      {showOrderDetails && (
        <OrderDetailsButton
          onPress={handleViewDetails}
          testID={`order-details-${order.id}`}
        >
          <Ionicons name="document-text-outline" size={20} color="#422680" />
          <OrderDetailsText>Ver Detalhes do Pedido</OrderDetailsText>
        </OrderDetailsButton>
      )}

      <QuotationModal
        isVisible={showQuotationModal}
        onClose={() => setShowQuotationModal(false)}
        onConfirm={handleQuotationConfirm}
        initialData={{
          orderId: order.id,
          serviceName: order.service?.title,
        }}
      />
    </Container>
  );
};

export default OrderCard;

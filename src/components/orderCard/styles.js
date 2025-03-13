import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const ServiceImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const ServiceDetails = styled.View`
  flex: 1;
`;

export const ServiceTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const ProviderName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const StatusBadge = styled.View`
  background-color: ${({ status, theme }) => {
    const opacity = "20"; // 20% de opacidade
    switch (status) {
      case "WAITING_QUOTE":
        return "#FFA50020"; // Laranja com opacidade
      case "QUOTE_SENT":
        return "#0000FF20"; // Azul com opacidade
      case "QUOTE_REJECTED":
        return "#FF000020"; // Vermelho com opacidade
      case "QUOTE_ACCEPTED":
        return "#00800020"; // Verde com opacidade
      case "WAITING_PAYMENT":
        return `${theme.colors.primary}${opacity}`;
      case "PAID":
        return "#00800020"; // Verde com opacidade
      case "IN_PROGRESS":
        return "#0000FF20"; // Azul com opacidade
      case "COMPLETED":
        return "#00800020"; // Verde com opacidade
      case "CANCELLED":
        return "#FF000020"; // Vermelho com opacidade
      default:
        return `${theme.colors.text.secondary}${opacity}`;
    }
  }};
  padding: 6px 12px;
  border-radius: 16px;
  align-self: flex-start;
`;

export const StatusText = styled.Text`
  color: ${({ status }) => {
    switch (status) {
      case "WAITING_QUOTE":
        return "#FFA500"; // Laranja
      case "QUOTE_SENT":
        return "#0000FF"; // Azul
      case "QUOTE_REJECTED":
        return "#FF0000"; // Vermelho
      case "QUOTE_ACCEPTED":
        return "#008000"; // Verde
      case "WAITING_PAYMENT":
        return "#422680"; // Cor primária
      case "PAID":
        return "#008000"; // Verde
      case "IN_PROGRESS":
        return "#0000FF"; // Azul
      case "COMPLETED":
        return "#008000"; // Verde
      case "CANCELLED":
        return "#FF0000"; // Vermelho
      default:
        return "#666666";
    }
  }};
  font-size: 13px;
  font-weight: 500;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 12px;
`;

export const Price = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${({ variant, theme }) =>
    variant === "secondary" ? "white" : theme.colors.primary};
  padding: 12px 16px;
  border-radius: 24px;
  flex: 1;
  align-items: center;
  elevation: ${({ variant }) => (variant === "secondary" ? 0 : 2)};
  border-width: ${({ variant }) => (variant === "secondary" ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
  color: ${({ variant, theme }) =>
    variant === "secondary" ? theme.colors.primary : "white"};
  font-weight: 600;
  font-size: 14px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

export const RateButton = styled(ActionButton)`
  margin-top: 16px;
`;

export const OrderDetailsButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 8px 16px;
  border-radius: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const OrderDetailsText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
`;

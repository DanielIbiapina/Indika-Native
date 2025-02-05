import styled from "styled-components/native";

export const Card = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  elevation: 3;
  margin-bottom: 12px;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const ServiceImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;

export const ServiceDetails = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const StatusBadge = styled.View`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status }) => {
    switch (status) {
      case "pending":
        return "#fff3dc";
      case "accepted":
        return "#e3f5ff";
      case "in_progress":
        return "#e8f5e9";
      case "completed":
        return "#e6f4ea";
      case "paid":
        return "#e6f4ea";
      case "cancelled":
        return "#ffebee";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "pending":
        return "#b25e09";
      case "accepted":
        return "#0066ff";
      case "in_progress":
        return "#1b5e20";
      case "completed":
        return "#1e8e3e";
      case "paid":
        return "#1e8e3e";
      case "cancelled":
        return "#c62828";
      default:
        return "#666";
    }
  }};
`;

export const Price = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  ${({ variant }) =>
    variant === "secondary"
      ? `
        background-color: #fff;
        border: 1px solid #dc3545;
      `
      : `
        background-color: #422680;
      `}
`;

export const RateButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

import styled from "styled-components/native";
import { getStatusColor, MESSAGE_TYPES } from "../../constants/orderStatus";
import { theme } from "../../styles/theme";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const QuotationContainer = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  margin: 8px 0;
  border-left-width: 4px;
  border-left-color: ${({ status, messageType }) =>
    messageType === MESSAGE_TYPES.REQUEST
      ? theme.colors.text.secondary // Cor neutra para solicitação
      : getStatusColor(status)};
  elevation: 2;
  //transform: scaleY(-1);
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const QuotationHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const QuotationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

export const QuotationStatus = styled.View`
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${({ status }) => `${getStatusColor(status)}15`};
  flex-direction: row;
  align-items: center;
`;

export const StatusIcon = styled(Ionicons)`
  margin-right: 4px;
  color: ${({ status }) => getStatusColor(status)};
`;

export const StatusText = styled.Text`
  font-size: 12px;
  color: ${({ status }) => getStatusColor(status)};
  font-weight: 500;
`;

export const QuotationDetails = styled.View`
  margin-bottom: 16px;
`;

export const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const DetailLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 80px;
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 8px;
  font-style: italic;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ variant, theme }) =>
    variant === "accept"
      ? theme.colors.primary
      : variant === "reject"
      ? theme.colors.secondary
      : theme.colors.primary};
  elevation: 2;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const ButtonIcon = styled(Ionicons)`
  margin-right: 8px;
  color: #fff;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

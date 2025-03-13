import styled from "styled-components/native";
import { getStatusColor } from "../../constants/orderStatus";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ServiceTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StatusBadge = styled.View`
  background-color: ${({ status }) => `${getStatusColor(status)}15`};
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

export const StatusText = styled.Text`
  color: ${({ status }) => getStatusColor(status)};
  font-weight: 600;
  font-size: 14px;
  margin-left: 6px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const ActionIconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
`;

export const MainContent = styled.ScrollView`
  flex: 1;
`;

export const Card = styled.View`
  background-color: #fff;
  margin: 12px 16px;
  border-radius: 12px;
  elevation: 2;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const CardHeader = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardContent = styled.View`
  padding: 16px;
`;

export const UserCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const UserInfo = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const UserRole = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

export const QuotationCard = styled(Card)`
  border-left-width: 4px;
  border-left-color: ${({ status }) => getStatusColor(status)};
`;

export const QuotationAmount = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

export const QuotationDate = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 12px;
`;

export const QuotationDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
`;

export const DetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const DetailLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${({ variant, theme }) =>
    variant === "secondary"
      ? `${theme.colors.primary}15`
      : theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 8px 16px;
`;

export const ActionButtonText = styled.Text`
  color: ${({ variant, theme }) =>
    variant === "secondary" ? theme.colors.primary : "#fff"};
  font-weight: 600;
  font-size: 15px;
  margin-left: ${({ hasIcon }) => (hasIcon ? "8px" : "0")};
`;

export const QuotationActions = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 16px;
`;

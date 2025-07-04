import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  padding: 16px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-vertical: 8px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 12px;
  margin: 16px;
  padding: 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const PlanCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  margin: 16px;
  padding: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const PlanTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const PlanPrice = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

export const PlanDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 20px;
  line-height: 20px;
`;

export const SubscriptionInfo = styled.View`
  margin-top: 12px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InfoValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SubscribeButton = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled ? "#ccc" : theme.colors.primary};
  border-radius: 8px;
  padding: 14px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
`;

export const SubscribeButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const StatusBadge = styled.View`
  align-self: flex-start;
  background-color: ${({ active, theme }) =>
    active ? `${theme.colors.primary}15` : "#f0f0f0"};
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
`;

export const StatusText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.text.secondary};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const BenefitsList = styled.View`
  margin-top: 16px;
`;

export const BenefitItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const BenefitText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: 8px;
`;

export const RenewButton = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const RenewButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const ExpirationWarning = styled.View`
  background-color: #fff3cd;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ExpirationText = styled.Text`
  color: #856404;
  font-size: 14px;
  margin-left: 8px;
  flex: 1;
`;

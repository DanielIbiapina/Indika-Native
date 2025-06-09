import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ProfileHeader = styled.View`
  flex-direction: row;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  padding-top: 32px;
`;

export const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
`;

export const ActionButtonsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const ConnectButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: ${({ style, theme }) => {
    switch (style) {
      case "success":
        return theme.colors.success || "#28a745";
      case "secondary":
        return "#6c757d";
      case "primary":
      default:
        return theme.colors.primary;
    }
  }};
  border-radius: 8px;
  ${({ disabled }) => disabled && `opacity: 0.6;`}
`;

export const ConnectButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

export const MessageButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.secondary || "#6c757d"};
  border-radius: 8px;
`;

export const MessageButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

export const Stats = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-horizontal: 16px;
`;

export const StatItem = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  elevation: 2;
  flex: 1;
  margin-horizontal: 4px;
`;

export const StatValue = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const StatLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  margin-horizontal: 16px;
  padding: 4px;
  background-color: #fff;
  border-radius: 12px;
  elevation: 2;
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  align-items: center;
  justify-content: center;
`;

export const TabText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.active ? "#fff" : props.theme.colors.text.secondary};
`;

export const ContentSection = styled.View`
  padding: 16px;
  margin-bottom: 16px;
`;

export const LoadingSpinner = styled(ActivityIndicator).attrs(({ theme }) => ({
  size: "large",
  color: theme.colors.primary,
}))`
  margin: 20px 0;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  padding: 20px;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 32px 0;
  font-size: 16px;
`;

export const LoadMoreButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const LoadMoreButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

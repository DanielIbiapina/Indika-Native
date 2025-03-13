import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
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
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

export const EditButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: #fff;
`;

export const EditButtonText = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 8px;
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
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  flex: 1;
  margin-horizontal: 4px;
`;

export const StatValue = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const StatLabel = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const MenuSection = styled.View`
  background-color: #fff;
  border-radius: 12px;
  margin: 16px;
  margin-bottom: 32px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

export const MenuItemText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 12px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #eee;
  margin-vertical: 8px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  margin-horizontal: 16px;
  padding: 4px;
  background-color: #fff;
  border-radius: 12px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
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
  color: ${(props) => (props.active ? "#fff" : "#666")};
`;

export const ContentSection = styled.View`
  padding: 16px;
  margin-bottom: 16px;
`;

export const LoadingSpinner = styled(ActivityIndicator).attrs({
  size: "small",
  color: ({ theme }) => theme.colors.primary,
})`
  margin: 16px 0;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #dc3545;
  padding: 20px;
  margin: 20px 0;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  color: #666;
  margin: 32px 0;
  font-size: 16px;
`;

export const LoadMoreButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

export const LoadMoreButtonText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`;

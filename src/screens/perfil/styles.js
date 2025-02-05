import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { Platform } from "react-native";

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
  border-color: #ddd;
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
  elevation: 2;
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
  elevation: 2;
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
  background-color: #f5f5f5;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const LoadMoreButtonText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`;

export const PaymentOptionsModal = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  padding-bottom: ${Platform.OS === "ios" ? "40px" : "20px"};
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  text-align: center;
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}20`};
`;

export const OptionIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1;
`;

export const CloseIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  align-items: center;
  justify-content: center;
`;

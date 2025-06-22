import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

// 🔧 WRAPPER COM DIMENSÕES FIXAS
export const CommunityCardWrapper = styled.View`
  width: 160px;
  height: 180px;
  margin-bottom: 16px;
`;

export const CommunityList = styled.FlatList`
  flex: 1;
  padding-horizontal: 4px;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-top: 32px;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #e74c3c;
  font-size: 16px;
  margin-top: 32px;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 32px;
`;

// Estilos para o resultado de usuário
export const UserResultCard = styled.TouchableOpacity`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const UserAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

export const UserPhone = styled.Text`
  font-size: 14px;
  color: #666;
`;

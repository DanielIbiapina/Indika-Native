import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

export const ChatList = styled.FlatList`
  flex: 1;
`;

export const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  elevation: 2;
`;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-right: 16px;
  background-color: #f0f0f0;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 6px;
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: auto;
`;

export const UnreadBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  min-width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const UnreadCount = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 0 8px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 12px;
  margin: 16px;
  elevation: 2;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 16px;
  text-align: center;
`;

import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MessageList = styled.FlatList`
  flex: 1;
  padding: 16px;
  transform: scaleY(-1);
`;

export const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fff;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: 8px;
`;

export const UnreadBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  min-width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const UnreadCount = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 0 6px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #f0f0f0;
  margin-left: 78px;
`;

export const MessageContainer = styled.View`
  flex-direction: row;
  justify-content: ${({ isOwn }) => (isOwn ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
  transform: scaleY(-1);
`;

export const MessageBubble = styled.View`
  background-color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.primary : theme.colors.surface};
  padding: 12px;
  border-radius: 16px;
  max-width: 80%;
`;

export const MessageText = styled.Text`
  color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.text.onPrimary : theme.colors.text.primary};
  font-size: 16px;
`;

export const MessageTime = styled.Text`
  font-size: 12px;
  color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.text.onPrimary : theme.colors.text.secondary};
  margin-top: 4px;
  opacity: 0.8;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  max-height: 100px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
  transform: scaleY(-1);
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 16px;
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: #ff0000;
  text-align: center;
  margin: 8px 16px;
  font-size: 14px;
`;

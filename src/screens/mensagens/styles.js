import styled from "styled-components/native";
import { FlatList } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
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
  margin-bottom: 12px;
  transform: scaleY(-1);
`;

export const MessageBubble = styled.View`
  background-color: ${({ theme, isOwn }) =>
    isOwn ? `${theme.colors.primary}` : "#fff"};
  padding: 12px 16px;
  border-radius: 20px;
  border-bottom-right-radius: ${({ isOwn }) => (isOwn ? "4px" : "20px")};
  border-bottom-left-radius: ${({ isOwn }) => (isOwn ? "20px" : "4px")};
  max-width: 80%;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const MessageText = styled.Text`
  color: ${({ theme, isOwn }) => (isOwn ? "#fff" : theme.colors.text.primary)};
  font-size: 15px;
  line-height: 20px;
`;

export const MessageTime = styled.Text`
  font-size: 11px;
  color: ${({ theme, isOwn }) =>
    isOwn ? "rgba(255, 255, 255, 0.8)" : theme.colors.text.secondary};
  margin-top: 4px;
  text-align: right;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 12px 16px;
  border-radius: 24px;
  margin-right: 12px;
  max-height: 100px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
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

export const Header = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #422680;
`;

export const DateSeparator = styled.View`
  align-items: center;
  margin-vertical: 16px;
  transform: scaleY(-1);
`;

export const DateSeparatorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px 12px;
  border-radius: 12px;
`;

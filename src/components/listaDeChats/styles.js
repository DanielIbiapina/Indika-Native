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
  margin: 8px 16px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
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
  color: #422680;
  margin-bottom: 4px;
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
`;

export const UnreadBadge = styled.View`
  background-color: #422680;
  border-radius: 12px;
  min-width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 0 8px;
`;

export const UnreadCount = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-vertical: 8px;
`;

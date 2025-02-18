import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ChatList,
  ChatItem,
  Avatar,
  UserInfo,
  UserName,
  LastMessage,
  TimeText,
  UnreadBadge,
  UnreadCount,
  Divider,
  EmptyContainer,
  EmptyText,
} from "./styles";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ListaDeChats = ({ chats, loading, onSelectChat, onRefresh }) => {
  const renderChatItem = ({ item }) => {
    return (
      <ChatItem onPress={() => onSelectChat(item)}>
        <Avatar source={{ uri: item.participants[0].avatar }} />
        <UserInfo>
          <UserName>{item.participants[0].name}</UserName>
          <LastMessage numberOfLines={1}>
            {item.lastMessage?.content || "Nenhuma mensagem"}
          </LastMessage>
        </UserInfo>
        <TimeText>
          {item.lastMessage?.createdAt
            ? format(new Date(item.lastMessage.createdAt), "dd/MM/yyyy", {
                locale: ptBR,
              })
            : ""}
        </TimeText>
        {item.unreadCount > 0 && (
          <UnreadBadge>
            <UnreadCount>{item.unreadCount}</UnreadCount>
          </UnreadBadge>
        )}
      </ChatItem>
    );
  };

  return (
    <Container>
      {chats.length > 0 ? (
        <ChatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          onRefresh={onRefresh}
          refreshing={loading}
        />
      ) : (
        <EmptyContainer>
          <Ionicons name="chatbubbles-outline" size={48} color="#666" />
          <EmptyText>Nenhuma conversa ainda</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
};

export default ListaDeChats;

import React from "react";
import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChatItem,
  Avatar,
  UserInfo,
  UserName,
  LastMessage,
  TimeText,
  UnreadBadge,
  UnreadCount,
  EmptyContainer,
  EmptyText,
  LoaderContainer,
} from "./styles";

const ListaDeChats = ({ chats, loading, onSelectChat, onRefresh }) => {
  const renderChatItem = ({ item }) => (
    <ChatItem onPress={() => onSelectChat(item)}>
      <Avatar
        source={{
          uri: item.participants[0].avatar || "https://via.placeholder.com/50",
        }}
      />
      <UserInfo>
        <UserName>{item.participants[0].name}</UserName>
        <LastMessage numberOfLines={1}>
          {item.lastMessage?.content || "Nenhuma mensagem"}
        </LastMessage>
      </UserInfo>
      <TimeText>
        {item.lastMessage?.createdAt
          ? format(new Date(item.lastMessage.createdAt), "dd/MM", {
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

  if (loading && !chats.length) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 8 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <EmptyContainer>
          <EmptyText>Nenhuma conversa encontrada</EmptyText>
        </EmptyContainer>
      }
    />
  );
};

export default ListaDeChats;

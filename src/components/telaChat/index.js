import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MessageItem from "../messageItem";
import {
  Container,
  MessageList,
  InputContainer,
  Input,
  SendButton,
  EmptyMessage,
  KeyboardAvoidingView,
} from "./styles";

const TelaChat = ({
  messages,
  loading,
  newMessage,
  onChangeMessage,
  onSendMessage,
  onLoadMore,
  userId,
  flatListRef,
}) => {
  // Memoriza a lista de mensagens para evitar re-renders desnecessários
  const memoizedMessages = React.useMemo(() => messages, [messages]);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MessageList
          ref={flatListRef}
          data={memoizedMessages}
          keyExtractor={(item) => item.id}
          inverted={true}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true} // Melhora a performance
          maxToRenderPerBatch={10} // Limita o número de itens renderizados por vez
          windowSize={10} // Reduz a janela de renderização
          ListEmptyComponent={
            <EmptyMessage>
              {loading ? "Carregando mensagens..." : "Nenhuma mensagem"}
            </EmptyMessage>
          }
          renderItem={({ item }) => (
            <MessageItem isOwn={item.senderId === userId} message={item} />
          )}
        />

        <InputContainer>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChangeText={onChangeMessage}
            multiline
          />
          <SendButton onPress={onSendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

// Memoriza o componente para evitar re-renders desnecessários
export default React.memo(TelaChat);

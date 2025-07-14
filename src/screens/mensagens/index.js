import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import { messageService } from "../../services/messageService";
import { chatService } from "../../services/chatService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  BackButtonText,
  ChatList,
  MessageContainer,
  MessageBubble,
  MessageText,
  MessageTime,
  InputContainer,
  Input,
  SendButton,
  EmptyContainer,
  EmptyText,
  LoaderContainer,
  Avatar,
  UserName,
  UserInfo,
  ChatItem,
  LastMessage,
  UnreadBadge,
  UnreadCount,
  TimeText,
  Divider,
  TypingIndicator,
  ErrorText,
  MessageList,
  EmptyMessage,
  MessageItem,
} from "./styles";
import ListaDeChats from "../../components/listaDeChats";
import TelaChat from "../../components/telaChat";
import { useNavigation, useRoute } from "@react-navigation/native";
import { orderService } from "../../services/orderService";
import { ORDER_STATUS } from "../../constants/orderStatus";
import generateWelcomeMessage from "../../utils/generateWelcomeMessage";

const MESSAGES_PER_PAGE = 30;

const Mensagens = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [nameChat, setNameChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const flatListRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const [unreadMessages, setUnreadMessages] = useState([]);

  // Carrega lista de chats
  const loadChats = async (showLoader = true) => {
    console.log("loadChats");
    try {
      if (showLoader) setLoading(true);
      const response = await chatService.getChats();

      // Se tiver um chat selecionado, preserva seus dados
      if (selectedChat) {
        const updatedChats = response.map((chat) => {
          if (chat.id === selectedChat.id) {
            return {
              ...chat,
              orders: selectedChat.orders || chat.orders || [],
              currentOrderId:
                selectedChat.currentOrderId || chat.orders?.[0]?.id || null,
            };
          }
          return chat;
        });
        setChats(updatedChats);
      } else {
        setChats(response);
      }

      setError(null);
    } catch (error) {
      console.error("Erro ao carregar chats:", error);
      setError("Não foi possível carregar as conversas");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Função para carregar mensagens
  const loadMessages = async (chatId, pageNumber = 1) => {
    console.log("loadMessages");
    try {
      setLoading(true);

      if (!chatId) {
        console.error("ChatId não fornecido para loadMessages");
        return;
      }

      const response = await messageService.getMessages(chatId, pageNumber);

      // Preparar as mensagens antes de atualizar o estado
      const sortedMessages = [...response].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      if (pageNumber === 1) {
        setMessages(sortedMessages);
      } else {
        setMessages((prev) => [...prev, ...sortedMessages]);
      }

      setHasMore(response.length === MESSAGES_PER_PAGE);
      setPage(pageNumber);
    } catch (error) {
      console.error("Erro detalhado ao carregar mensagens:", {
        error,
        chatId,
        pageNumber,
        stack: error.stack,
      });
      Alert.alert("Erro", "Não foi possível carregar as mensagens");
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar mensagens não lidas
  const loadUnreadMessages = async () => {
    try {
      const unreadMessages = await messageService.getUnreadMessages();

      if (!unreadMessages || !Array.isArray(unreadMessages)) {
        console.warn(
          "Resposta inválida de mensagens não lidas:",
          unreadMessages
        );
        return;
      }

      // Agrupa mensagens por chatId e conta quantas existem
      const unreadCounts = unreadMessages.reduce((acc, message) => {
        const chatId = message.chatId;
        if (!acc[chatId]) {
          acc[chatId] = 0;
        }
        acc[chatId]++;
        return acc;
      }, {});

      setUnreadMessages(unreadMessages);

      // Atualiza os chats com as contagens não lidas
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          const unreadCount = unreadCounts[chat.id] || 0;

          return {
            ...chat,
            unreadCount,
          };
        });

        return updatedChats;
      });
    } catch (error) {
      console.error("Erro detalhado ao carregar mensagens não lidas:", error);
    }
  };

  // Função para marcar mensagens como lidas
  const markMessagesAsRead = async (chatId) => {
    try {
      await messageService.markAsRead(chatId);

      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        );

        return updatedChats;
      });

      setUnreadMessages((prev) => {
        const updated = prev.filter((msg) => msg.chatId !== chatId);

        return updated;
      });
    } catch (error) {
      console.error("Erro ao marcar mensagens como lidas:", error);
    }
  };

  // Função para selecionar um chat
  const handleSelectChat = async (chat) => {
    console.log("handleSelectChat");
    console.log("Chat recebido:", chat);
    console.log("Participantes:", chat.participants);

    try {
      if (!chat || !chat.id) {
        console.error("Chat inválido para seleção");
        return;
      }

      const chatWithDefaults = {
        ...chat,
        orders: chat.orders || [],
        participants: chat.participants || [],
        lastMessage: chat.lastMessage || null,
        currentOrderId: chat.currentOrderId || chat.orders?.[0]?.id || null,
      };

      setSelectedChat(chatWithDefaults);

      // ✅ MELHORADO: Melhor tratamento do nome
      const participant = chatWithDefaults.participants[0];
      const participantName =
        participant?.name || participant?.username || "Usuário";

      console.log("Nome definido:", participantName); // ✅ NOVO: Log para debug
      setNameChat(participantName);

      setMessages([]); // Limpa as mensagens antes de carregar novas
      setPage(1);
      setHasMore(true);

      // Carrega as mensagens
      await loadMessages(chat.id, 1);

      // Marca mensagens como lidas quando seleciona o chat
      if (chat.unreadCount > 0) {
        await markMessagesAsRead(chat.id);
      }

      // Atualiza a lista de chats para preservar os dados deste chat
      setChats((prevChats) =>
        prevChats.map((c) => (c.id === chat.id ? chatWithDefaults : c))
      );
    } catch (error) {
      console.error("Erro ao selecionar chat:", error);
    }
  };

  // Efeito para carregar chats e iniciar polling de mensagens não lidas
  useEffect(() => {
    loadChats();
    loadUnreadMessages();

    // Polling para mensagens não lidas (a cada 30 segundos)
    const unreadInterval = setInterval(() => {
      if (!selectedChat) {
        // Só atualiza se não estiver em um chat
        loadUnreadMessages();
      }
    }, 30000);

    return () => clearInterval(unreadInterval);
  }, [selectedChat]);

  // Adicione este useEffect para recarregar dados quando a tela é focada
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // Recarrega a lista de chats
      await loadChats();

      // Se tiver um chat selecionado, recarrega seus dados
      if (selectedChat?.id) {
        const params = navigation
          .getState()
          .routes.find((r) => r.name === "Mensagens")?.params;

        // Preserva os dados do pedido se existirem
        const updatedChat = {
          ...selectedChat,
          orders: params?.order ? [params.order] : selectedChat.orders || [],
          currentOrderId: params?.order?.id || selectedChat.currentOrderId,
        };

        // Recarrega as mensagens
        await loadMessages(selectedChat.id, 1);

        // Atualiza o chat selecionado
        setSelectedChat(updatedChat);

        // Atualiza a lista de chats
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === selectedChat.id ? updatedChat : chat
          )
        );
      }
    });

    return unsubscribe;
  }, [navigation, selectedChat]);

  // Adicione este useEffect para lidar com parâmetros de rota
  useEffect(() => {
    console.log("useEffectParams");
    const params = navigation
      .getState()
      .routes.find((r) => r.name === "Mensagens")?.params;

    if (params?.providerId && !selectedChat) {
      handleCreateChat(params.providerId);
    } else if (params?.order) {
      // Se tiver um pedido nos parâmetros, atualiza o chat selecionado
      if (selectedChat) {
        const updatedChat = {
          ...selectedChat,
          orders: [params.order],
          currentOrderId: params.order.id,
        };
        setSelectedChat(updatedChat);

        // Atualiza a lista de chats
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === selectedChat.id ? updatedChat : chat
          )
        );
      }
    }
  }, [navigation]);

  // Adicione este useEffect para atualizar o título e as opções do header
  useEffect(() => {
    if (selectedChat) {
      console.log("selectedChat");
      console.log(selectedChat);
      console.log("selectedChat");
      const participantName =
        selectedChat.participants[0]?.name ||
        selectedChat.participants[0]?.username ||
        nameChat ||
        "Usuário";

      navigation.setOptions({
        headerTitle: participantName,
        headerRight: null,
      });
    } else {
      navigation.setOptions({
        headerTitle: "Mensagens",
        headerRight: null,
      });
    }
  }, [selectedChat, navigation, nameChat]);

  // Adicione esta função para criar/obter chat
  const handleCreateChat = async (providerId) => {
    console.log("handleCreateChat");
    try {
      if (!providerId) {
        console.error("ProviderId não fornecido para criar chat");
        return;
      }

      setLoading(true);

      const params = navigation
        .getState()
        .routes.find((r) => r.name === "Mensagens")?.params;

      const chat = await chatService.createChat(providerId);

      if (!chat || !chat.id) {
        throw new Error("Chat inválido retornado do servidor");
      }

      // ✅ NOVO: Detectar quem é o usuário logado para mostrar o participante correto
      let participants = chat.participants || [];

      if (!participants.length || !participants[0]?.name) {
        if (params?.order) {
          // ✅ LÓGICA CORRIGIDA: Verificar se é prestador ou cliente
          const isProvider = user.id === params.order.providerId;

          if (isProvider) {
            // Se for prestador, mostrar dados do CLIENTE
            if (params.order.client) {
              participants = [
                {
                  id: params.order.client.id,
                  name: params.order.client.name,
                  username: params.order.client.username,
                  avatar: params.order.client.avatar,
                },
              ];
            }
          } else {
            // Se for cliente, mostrar dados do PRESTADOR
            if (params.order.service?.provider) {
              participants = [
                {
                  id: params.order.service.provider.id,
                  name: params.order.service.provider.name,
                  username: params.order.service.provider.username,
                  avatar: params.order.service.provider.avatar,
                },
              ];
            } else if (params.order.provider) {
              participants = [
                {
                  id: params.order.provider.id,
                  name: params.order.provider.name,
                  username: params.order.provider.username,
                  avatar: params.order.provider.avatar,
                },
              ];
            }
          }
        }
      }

      const chatWithDefaults = {
        ...chat,
        orders: params?.order ? [params.order] : chat.orders || [],
        participants: participants,
        lastMessage: chat.lastMessage || null,
        currentOrderId: params?.order?.id || chat.orders?.[0]?.id || null,
      };

      console.log("✅ Participantes definidos:", participants); // Debug

      await loadMessages(chat.id, 1);
      handleSelectChat(chatWithDefaults);
    } catch (error) {
      console.error("Erro ao criar/obter chat:", error);
      Alert.alert("Erro", "Não foi possível iniciar a conversa");
    } finally {
      setLoading(false);
    }
  };

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const tempMessage = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: user.id,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    try {
      // Adiciona mensagem temporária no início
      setMessages((prev) => [tempMessage, ...prev]);
      setNewMessage("");

      const sentMessage = await messageService.sendMessage(
        selectedChat.id,
        newMessage
      );

      // Atualiza a mensagem temporária com a resposta do servidor
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempMessage.id ? sentMessage : msg))
      );

      loadChats(false);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      Alert.alert("Erro", "Não foi possível enviar a mensagem");
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  };

  // Função para carregar mais mensagens (paginação)
  const handleLoadMore = async () => {
    if (!hasMore || loading || !selectedChat) return;

    try {
      setLoading(true);
      await loadMessages(selectedChat.id, page + 1);
    } catch (error) {
      console.error("Erro ao carregar mais mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com ações do orçamento
  const handleQuotationAction = async (action, quotationMessage) => {
    try {
      const quotationData =
        typeof quotationMessage.content === "string"
          ? JSON.parse(quotationMessage.content)
          : quotationMessage.content;

      switch (action) {
        case "accept":
          Alert.alert("Confirmar", "Deseja aceitar este orçamento?", [
            {
              text: "Não",
              style: "cancel",
            },
            {
              text: "Sim",
              onPress: async () => {
                try {
                  setLoading(true);

                  // Aceitar o orçamento
                  await orderService.acceptQuotation(quotationData.orderId);

                  // Atualizar o status da mensagem atual
                  const updatedContent = {
                    ...quotationData,
                    status: ORDER_STATUS.QUOTE_ACCEPTED,
                  };

                  // Enviar uma nova mensagem com o status atualizado
                  await messageService.sendMessage(selectedChat.id, {
                    type: "quotation",
                    content: JSON.stringify(updatedContent),
                  });

                  // Recarregar as mensagens para atualizar a UI
                  await loadMessages(selectedChat.id, 1);

                  Alert.alert("Sucesso", "Orçamento aceito com sucesso!");
                } catch (error) {
                  console.error("Erro ao aceitar orçamento:", error);
                  Alert.alert(
                    "Erro",
                    error.message || "Não foi possível aceitar o orçamento"
                  );
                } finally {
                  setLoading(false);
                }
              },
            },
          ]);
          break;
        case "reject":
          Alert.alert("Confirmar", "Deseja recusar este orçamento?", [
            {
              text: "Não",
              style: "cancel",
            },
            {
              text: "Sim",
              onPress: async () => {
                try {
                  setLoading(true);
                  await orderService.rejectQuotation(quotationData.orderId);
                  await loadMessages(selectedChat.id, 1);
                  Alert.alert("Sucesso", "Orçamento recusado com sucesso!");
                } catch (error) {
                  console.error("Erro ao recusar orçamento:", error);
                  Alert.alert(
                    "Erro",
                    error.message || "Não foi possível recusar o orçamento"
                  );
                } finally {
                  setLoading(false);
                }
              },
            },
          ]);
          break;
        default:
          console.error("Ação não reconhecida:", action);
          break;
      }
    } catch (error) {
      console.error("Erro ao processar ação do orçamento:", error);
      Alert.alert("Erro", "Não foi possível processar sua solicitação");
    }
  };

  // Renderiza item da lista de chats
  const renderChatItem = useCallback(({ item }) => {
    return (
      <ChatItem onPress={() => handleSelectChat(item)}>
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
  }, []);

  // Renderiza mensagem individual
  const renderMessage = useCallback(
    ({ item }) => {
      const isOwn = item.senderId === user.id;

      return (
        <MessageContainer isOwn={isOwn}>
          <MessageBubble isOwn={isOwn}>
            <MessageText isOwn={isOwn}>{item.content}</MessageText>
            <MessageTime>
              {format(new Date(item.createdAt), "HH:mm")}
              {item.status === "pending" && " ⌛"}
              {item.status === "delivered" && " ✓"}
              {item.status === "read" && " ✓✓"}
            </MessageTime>
          </MessageBubble>
        </MessageContainer>
      );
    },
    [user.id]
  );

  const handleStatusUpdate = async () => {
    // Recarregar as mensagens
    await loadMessages();
  };

  // Adicionar useEffect para lidar com parâmetros de navegação
  useEffect(() => {
    const handleNavigationParams = async () => {
      const { chatId, providerId, orderId, showOrderDetails, order } =
        route.params || {};

      if (chatId) {
        try {
          await loadChats(false);

          let targetChat = chats.find((chat) => chat.id === chatId);

          if (!targetChat) {
            // ✅ LÓGICA CORRIGIDA: Verificar quem é o usuário logado
            let participantData = null;

            if (order) {
              const isProvider = user.id === order.providerId;

              if (isProvider) {
                // Prestador vê dados do cliente
                participantData = order.client;
              } else {
                // Cliente vê dados do prestador
                participantData = order.service?.provider || order.provider;
              }
            }

            targetChat = {
              id: chatId,
              participants: participantData
                ? [
                    {
                      id: participantData.id,
                      name: participantData.name,
                      username: participantData.username,
                      avatar: participantData.avatar,
                    },
                  ]
                : [
                    {
                      name: "Usuário", // Fallback
                      username: "usuario",
                      avatar: null,
                    },
                  ],
              orders: order ? [order] : [],
              currentOrderId: orderId,
              lastMessage: null,
              unreadCount: 0,
            };
          } else if (
            targetChat.participants.length === 0 ||
            !targetChat.participants[0]?.name
          ) {
            // ✅ CORRIGIR participantes incompletos
            if (order) {
              const isProvider = user.id === order.providerId;
              const participantData = isProvider
                ? order.client
                : order.service?.provider || order.provider;

              if (participantData) {
                targetChat = {
                  ...targetChat,
                  participants: [
                    {
                      id: participantData.id,
                      name: participantData.name,
                      username: participantData.username,
                      avatar: participantData.avatar,
                    },
                  ],
                };
              }
            }
          }

          console.log("✅ Chat final:", targetChat); // Debug
          await handleSelectChat(targetChat);
        } catch (error) {
          console.error("Erro ao processar parâmetros de navegação:", error);
        }
      }
    };

    if (route.params) {
      handleNavigationParams();
    }
  }, [route.params, user.id]);

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      {selectedChat ? (
        <TelaChat
          messages={messages}
          loading={loading}
          newMessage={newMessage}
          onChangeMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          onLoadMore={handleLoadMore}
          userId={user?.id}
          flatListRef={flatListRef}
          orderId={selectedChat.orderId}
          onStatusUpdate={handleStatusUpdate}
          chatId={selectedChat.id}
          onRefresh={(page = 1) => loadMessages(selectedChat.id, page)}
          selectedChat={selectedChat}
        />
      ) : (
        <ListaDeChats
          chats={chats}
          loading={loading}
          onSelectChat={handleSelectChat}
          onRefresh={() => loadChats(true)}
        />
      )}
    </Container>
  );
};

export default Mensagens;

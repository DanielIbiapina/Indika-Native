import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/authContext";
import { communityService } from "../../services/communityService";
import { Ionicons } from "@expo/vector-icons"; // Para os ícones
import { Text, View, ActivityIndicator, Alert } from "react-native";
import {
  Container,
  CommunityCard,
  CommunityImage,
  Content,
  Title,
  Description,
  Row,
  InfoItem,
  InfoText,
  CategoryTag,
  CategoryText,
  ActionButton,
  ActionButtonText,
  MemberList,
  MemberItem,
  MemberAvatar,
  MemberName,
  AdminText,
  RemoveButton,
  RemoveButtonText,
  LoaderContainer,
  SectionTitle,
  SectionSubtitle,
  MemberInfo,
} from "./styles"; // Importando os estilos

const ComunidadeDetalhes = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Usando params do React Navigation
  const { user } = useAuth();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadCommunityData();
  }, [id]);

  const loadCommunityData = async () => {
    try {
      setLoading(true);
      const data = await communityService.getById(id);
      setCommunity(data);

      if (user) {
        setIsMember(data.members.some((member) => member.id === user.id));
        setIsAdmin(data.admins.some((admin) => admin.id === user.id));
      }
    } catch (err) {
      setError("Erro ao carregar dados da comunidade");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      await communityService.join(id);
      setIsMember(true);
      loadCommunityData(); // Recarrega para atualizar contadores
    } catch (error) {
      console.error("Erro ao entrar na comunidade:", error);
    }
  };

  const handleLeave = async () => {
    Alert.alert(
      "Sair da comunidade",
      "Tem certeza que deseja sair desta comunidade?",
      [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: async () => {
            await communityService.leave(id);
            setIsMember(false);
            loadCommunityData();
          },
        },
      ]
    );
  };

  const handleRemoveMember = async (userId) => {
    Alert.alert(
      "Remover membro",
      "Tem certeza que deseja remover este membro?",
      [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: async () => {
            await communityService.removeMember(id, userId);
            loadCommunityData();
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }
  if (error) return <Text>{error}</Text>;
  if (!community) return <Text>Comunidade não encontrada</Text>;

  return (
    <Container>
      <CommunityCard>
        <CommunityImage source={{ uri: community.image }} />
        <Content>
          <Title>{community.name}</Title>
          <Description>{community.description}</Description>

          <Row>
            <InfoItem>
              <Ionicons name="people" size={20} color="#666" />
              <InfoText>{community._count.members} membros</InfoText>
            </InfoItem>
            <InfoItem>
              <Ionicons name="shield" size={20} color="#666" />
              <InfoText>{community._count.admins} admins</InfoText>
            </InfoItem>
            <InfoItem>
              <Ionicons name="calendar" size={20} color="#666" />
              <InfoText>
                Criada em {new Date(community.createdAt).toLocaleDateString()}
              </InfoText>
            </InfoItem>
          </Row>

          <Row>
            {community.categories.map((category) => (
              <CategoryTag key={category}>
                <CategoryText>{category}</CategoryText>
              </CategoryTag>
            ))}
          </Row>

          {user && (
            <Row>
              {!isMember ? (
                <ActionButton onPress={handleJoin}>
                  <Ionicons name="person-add" size={20} color="white" />
                  <ActionButtonText>Participar</ActionButtonText>
                </ActionButton>
              ) : (
                <ActionButton onPress={handleLeave} bgColor="#f44336">
                  <Ionicons name="exit" size={20} color="white" />
                  <ActionButtonText>Sair</ActionButtonText>
                </ActionButton>
              )}
              {isAdmin && (
                <ActionButton
                  onPress={() =>
                    navigation.navigate("ComunidadSettings", { id })
                  }
                >
                  <Ionicons name="settings" size={20} color="white" />
                  <ActionButtonText>Gerenciar</ActionButtonText>
                </ActionButton>
              )}
            </Row>
          )}
        </Content>
      </CommunityCard>

      <MemberList>
        <SectionTitle>Membros</SectionTitle>
        <SectionSubtitle>
          {community._count.members} participantes
        </SectionSubtitle>

        <SectionTitle>Administradores</SectionTitle>
        {community.admins.map((admin) => (
          <MemberItem key={admin.id}>
            <MemberAvatar source={{ uri: admin.avatar }} />
            <MemberInfo>
              <MemberName>{admin.name}</MemberName>
              <AdminText>Admin</AdminText>
            </MemberInfo>
          </MemberItem>
        ))}

        <SectionTitle style={{ marginTop: 24 }}>Participantes</SectionTitle>
        {community.members.map((member) => (
          <MemberItem key={member.id}>
            <MemberAvatar source={{ uri: member.avatar }} />
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
            </MemberInfo>
            {isAdmin &&
              !community.admins.some((admin) => admin.id === member.id) && (
                <RemoveButton onPress={() => handleRemoveMember(member.id)}>
                  <RemoveButtonText>Remover</RemoveButtonText>
                </RemoveButton>
              )}
          </MemberItem>
        ))}
      </MemberList>
    </Container>
  );
};

export default ComunidadeDetalhes;

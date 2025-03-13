import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../components/searchBar";
import CommunityCard from "../../components/communityCard";
import { useAuth } from "../../contexts/authContext";
import { communityService } from "../../services/communityService";
import {
  Container,
  Title,
  Section,
  SectionTitle,
  SectionTitleText,
  ViewAllText,
  AddButton,
  AddButtonText,
  LoginPrompt,
  LoginButton,
  LoginButtonText,
  ErrorMessage,
  AddButtonContainer,
  LoaderContainer,
  EmptyMessage,
  CommunityList,
} from "./styles";

const { width: viewportWidth } = Dimensions.get("window");

const Comunidades = () => {
  const navigation = useNavigation();
  const { signed: isLoggedIn } = useAuth();
  const [communities, setCommunities] = useState({
    public: [],
    private: [],
    userCommunities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCommunities();
  }, [isLoggedIn]);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allCommunities, userComms] = await Promise.all([
        communityService.list(),
        isLoggedIn
          ? communityService.getUserCommunities()
          : { communities: [] },
      ]);

      setCommunities({
        public: allCommunities.filter((comm) => !comm.isPrivate),
        private: allCommunities.filter((comm) => comm.isPrivate),
        userCommunities: userComms.communities || [],
      });
    } catch (err) {
      setError("Erro ao carregar comunidades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // TODO: Implementar lógica de busca
  };

  const handleCreateCommunity = () => {
    navigation.navigate("CriarComunidade");
  };

  const handleLogin = () => {
    navigation.navigate("Entrar");
  };

  const renderCommunityItem = ({ item }) => (
    <CommunityCard {...item} testID={`community-${item.id}`} />
  );

  const renderCommunitySection = (data, title, subtitle) => {
    if (!data?.length) return null;

    return (
      <Section>
        <SectionTitle>
          <SectionTitleText>{title}</SectionTitleText>
          <ViewAllText>{subtitle}</ViewAllText>
        </SectionTitle>
        <CommunityList
          data={data}
          renderItem={renderCommunityItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
          snapToInterval={viewportWidth * 0.85}
          decelerationRate="fast"
          snapToAlignment="center"
          testID={`community-list-${title}`}
        />
      </Section>
    );
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Suas Comunidades</Title>
      <SearchBar
        placeholder="Buscar comunidades..."
        value={searchQuery}
        onChangeText={handleSearch}
        testID="community-search"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {isLoggedIn && (
          <AddButtonContainer>
            <AddButton
              onPress={handleCreateCommunity}
              testID="create-community-button"
            >
              <Ionicons name="add" size={24} color="#422680" />
              <AddButtonText>Criar nova comunidade</AddButtonText>
            </AddButton>
          </AddButtonContainer>
        )}

        {isLoggedIn &&
          (communities.userCommunities?.length === 0 ? (
            <Section>
              <SectionTitle>
                <SectionTitleText>Minhas Comunidades</SectionTitleText>
              </SectionTitle>
              <EmptyMessage>
                <Ionicons
                  name="people-outline"
                  size={48}
                  color="#422680"
                  style={{ marginBottom: 16 }}
                />
                <SectionTitleText
                  style={{ textAlign: "center", marginBottom: 8 }}
                >
                  Você ainda não participa de nenhuma comunidade
                </SectionTitleText>
                <ViewAllText>Explore as comunidades disponíveis</ViewAllText>
              </EmptyMessage>
            </Section>
          ) : (
            renderCommunitySection(
              communities.userCommunities,
              "Minhas Comunidades",
              "Ver todas"
            )
          ))}

        {renderCommunitySection(
          communities.public,
          "Comunidades populares",
          "Ver todas"
        )}

        {isLoggedIn &&
          renderCommunitySection(
            communities.private,
            "Suas comunidades",
            "Ver todas"
          )}

        {!isLoggedIn && (
          <LoginPrompt>
            <SectionTitleText>
              Entre para ver mais comunidades e criar as suas próprias
            </SectionTitleText>
            <LoginButton onPress={handleLogin} testID="login-button">
              <LoginButtonText>Entrar</LoginButtonText>
            </LoginButton>
          </LoginPrompt>
        )}
      </ScrollView>
    </Container>
  );
};

export default Comunidades;

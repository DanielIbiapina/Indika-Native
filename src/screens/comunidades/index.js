import React, { useState, useEffect, useMemo } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../components/searchBar";
import CommunityCard from "../../components/communityCard";
import { useAuth } from "../../contexts/authContext";
import { communityService } from "../../services/communityService";
import { userService } from "../../services/userService";
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
import { eventEmitter, EVENTS } from "../../utils/eventEmitter";

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
  const [searchResults, setSearchResults] = useState({
    communities: { public: [], private: [], userCommunities: [] },
    user: null,
    isSearching: false,
  });
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
    }
  };

  // Função para detectar se é um número de telefone
  const isPhoneNumber = (query) => {
    // Remove espaços e caracteres especiais
    const cleanQuery = query.replace(/\D/g, "");
    // Verifica se tem pelo menos 10 dígitos (telefone brasileiro)
    return cleanQuery.length >= 10;
  };

  // Função para filtrar comunidades baseada na busca
  const filterCommunities = (communitiesList, query) => {
    if (!query.trim()) return communitiesList;

    const normalizedQuery = query.toLowerCase().trim();
    return communitiesList.filter(
      (community) =>
        community.name.toLowerCase().includes(normalizedQuery) ||
        community.description.toLowerCase().includes(normalizedQuery)
    );
  };

  // Função de busca híbrida
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({
        communities: { public: [], private: [], userCommunities: [] },
        user: null,
        isSearching: false,
      });
      return;
    }

    try {
      setSearchResults((prev) => ({ ...prev, isSearching: true }));

      // Sempre buscar comunidades
      const filteredCommunities = {
        public: filterCommunities(communities.public, query),
        private: filterCommunities(communities.private, query),
        userCommunities: filterCommunities(communities.userCommunities, query),
      };

      let foundUser = null;

      // Se parecer um telefone, buscar usuário
      if (isPhoneNumber(query)) {
        try {
          foundUser = await userService.searchByPhone(query);
        } catch (error) {
          console.log("Usuário não encontrado por telefone:", error.message);
        }
      }

      setSearchResults({
        communities: filteredCommunities,
        user: foundUser,
        isSearching: false,
      });
    } catch (error) {
      console.error("Erro na busca:", error);
      setSearchResults((prev) => ({ ...prev, isSearching: false }));
    }
  };

  // Debounce da busca para não fazer muitas requisições
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 500); // 500ms de delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, communities]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCreateCommunity = () => {
    navigation.navigate("CriarComunidade");
  };

  const handleLogin = () => {
    navigation.navigate("Entrar");
  };

  const handleUserPress = (user) => {
    navigation.navigate("PerfilVisitante", { userId: user.id });
  };

  const renderCommunityItem = ({ item }) => {
    console.log(item);
    return <CommunityCard {...item} testID={`community-${item.id}`} />;
  };

  const renderCommunitySection = (data, title, subtitle) => {
    if (!data?.length) return null;

    const isPopular = title.includes("populares");

    return (
      <Section>
        <SectionTitle>
          <SectionTitleText>{title}</SectionTitleText>
          {isPopular ? (
            <ViewAllText
              onPress={() => navigation.navigate("TodasComunidades")}
            >
              Ver todas
            </ViewAllText>
          ) : (
            <ViewAllText>{subtitle}</ViewAllText>
          )}
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

  // Verificar se há resultados de busca
  const hasSearchResults =
    searchQuery.trim() &&
    (searchResults.communities.public.length > 0 ||
      searchResults.communities.private.length > 0 ||
      searchResults.communities.userCommunities.length > 0 ||
      searchResults.user !== null);

  // ✨ NOVO: Pull to refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCommunities();
  };

  // ✨ NOVO: Event listeners
  useEffect(() => {
    const handleCommunityCreated = (community) => {
      console.log("🏘️ Nova comunidade criada - atualizando lista");
      loadCommunities();
    };

    const handleCommunityJoined = ({ community, user: joinedUser }) => {
      console.log("🎉 Usuário entrou em comunidade - atualizando lista");
      loadCommunities();
    };

    // Registrar listeners
    eventEmitter.on(EVENTS.COMMUNITY_CREATED, handleCommunityCreated);
    eventEmitter.on(EVENTS.COMMUNITY_JOINED, handleCommunityJoined);

    // 🧹 CLEANUP
    return () => {
      eventEmitter.removeListener(
        EVENTS.COMMUNITY_CREATED,
        handleCommunityCreated
      );
      eventEmitter.removeListener(
        EVENTS.COMMUNITY_JOINED,
        handleCommunityJoined
      );
    };
  }, []);

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
      <Title>Comunidades</Title>
      <SearchBar
        placeholder="Buscar comunidades ou telefone..."
        value={searchQuery}
        onChangeText={handleSearch}
        testID="community-search"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#422680"]}
            tintColor="#422680"
          />
        }
      >
        {isLoggedIn && !searchQuery.trim() && (
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

        {/* Mostrar resultados da busca */}
        {searchQuery.trim() ? (
          <>
            {searchResults.isSearching ? (
              <LoaderContainer>
                <ActivityIndicator size="small" color="#422680" />
              </LoaderContainer>
            ) : hasSearchResults ? (
              <>
                {/* Resultado de usuário por telefone */}
                {searchResults.user && (
                  <Section>
                    <SectionTitle>
                      <SectionTitleText>Usuário encontrado</SectionTitleText>
                      <ViewAllText>Por telefone</ViewAllText>
                    </SectionTitle>
                    <AddButton
                      onPress={() => handleUserPress(searchResults.user)}
                    >
                      <Ionicons name="person" size={24} color="#422680" />
                      <AddButtonText>
                        {searchResults.user.name} • {searchResults.user.phone}
                      </AddButtonText>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#422680"
                      />
                    </AddButton>
                  </Section>
                )}

                {/* Resultados de comunidades */}
                <Section>
                  <SectionTitle>
                    <SectionTitleText>Comunidades encontradas</SectionTitleText>
                    <ViewAllText>
                      {searchResults.communities.public.length +
                        searchResults.communities.private.length +
                        searchResults.communities.userCommunities.length}{" "}
                      resultado(s)
                    </ViewAllText>
                  </SectionTitle>
                </Section>

                {renderCommunitySection(
                  searchResults.communities.userCommunities,
                  "Suas Comunidades",
                  `${searchResults.communities.userCommunities.length} encontrada(s)`
                )}

                {renderCommunitySection(
                  searchResults.communities.public,
                  "Comunidades Públicas",
                  `${searchResults.communities.public.length} encontrada(s)`
                )}

                {isLoggedIn &&
                  renderCommunitySection(
                    searchResults.communities.private,
                    "Comunidades Privadas",
                    `${searchResults.communities.private.length} encontrada(s)`
                  )}
              </>
            ) : (
              <Section>
                <EmptyMessage>
                  <Ionicons
                    name="search-outline"
                    size={48}
                    color="#422680"
                    style={{ marginBottom: 16 }}
                  />
                  <SectionTitleText
                    style={{ textAlign: "center", marginBottom: 8 }}
                  >
                    {isPhoneNumber(searchQuery)
                      ? "Nenhum usuário ou comunidade encontrada"
                      : "Nenhuma comunidade encontrada"}
                  </SectionTitleText>
                  <ViewAllText>
                    {isPhoneNumber(searchQuery)
                      ? "Verifique se o número está correto"
                      : "Tente buscar com outras palavras-chave"}
                  </ViewAllText>
                </EmptyMessage>
              </Section>
            )}
          </>
        ) : (
          /* Mostrar lista normal quando não há busca */
          <>
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
                    <ViewAllText>
                      Explore as comunidades disponíveis
                    </ViewAllText>
                  </EmptyMessage>
                </Section>
              ) : (
                renderCommunitySection(
                  communities.userCommunities,
                  "Minhas Comunidades",
                  ""
                )
              ))}

            {renderCommunitySection(
              communities.public,
              "Comunidades populares",
              "Ver todas"
            )}

            {/* {isLoggedIn &&
              renderCommunitySection(
                communities.private,
                "Suas comunidades",
                "Ver todas"
              )} */}

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
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default Comunidades;

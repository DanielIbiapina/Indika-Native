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
  const { signed: isLoggedIn, user } = useAuth(); // ✅ Obter dados do usuário
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
  // ✅ NOVOS ESTADOS para controle de paginação e filtros
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadCommunities();
  }, [isLoggedIn]);

  // ✅ FUNÇÃO MELHORADA: Carregamento inteligente
  const loadCommunities = async (reset = true) => {
    try {
      if (reset) {
        setLoading(true);
        setPage(1);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const currentPage = reset ? 1 : page;

      // ✅ USAR NOVO MÉTODO com contexto do usuário
      const [allCommunities, userComms] = await Promise.all([
        isLoggedIn
          ? communityService.listWithUserContext({
              page: currentPage,
              limit: 30,
            })
          : communityService.list({
              page: currentPage,
              limit: 30,
              includeFriends: false,
            }),
        isLoggedIn
          ? communityService.getUserCommunities()
          : { communities: [] },
      ]);

      // ✅ VERIFICAR se há mais dados para carregar
      const newHasMoreData = allCommunities.length === 30;
      setHasMoreData(newHasMoreData);

      if (reset) {
        setCommunities({
          public: allCommunities.filter((comm) => !comm.isPrivate),
          private: allCommunities.filter((comm) => comm.isPrivate),
          userCommunities: userComms.communities || [],
        });
      } else {
        // ✅ ADICIONAR às comunidades existentes (paginação)
        setCommunities((prev) => ({
          public: [
            ...prev.public,
            ...allCommunities.filter((comm) => !comm.isPrivate),
          ],
          private: [
            ...prev.private,
            ...allCommunities.filter((comm) => comm.isPrivate),
          ],
          userCommunities: userComms.communities || prev.userCommunities,
        }));
        setPage(currentPage + 1);
      }
    } catch (err) {
      setError("Erro ao carregar comunidades");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // ✅ NOVA FUNÇÃO: Carregar mais comunidades (infinite scroll)
  const loadMoreCommunities = () => {
    if (!loadingMore && hasMoreData) {
      loadCommunities(false);
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

  // ✅ FUNÇÃO MELHORADA: Busca com filtros
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

      // Buscar comunidades com contexto do usuário
      const communitiesPromise = isLoggedIn
        ? communityService.listWithUserContext({
            page: 1,
            limit: 50, // Mais resultados na busca
          })
        : communityService.list({
            page: 1,
            limit: 50,
            includeFriends: false,
          });

      // Buscar usuários se parece com telefone
      const userPromise = isPhoneNumber(query)
        ? userService.searchByPhone(query).catch(() => null)
        : Promise.resolve(null);

      const [allCommunities, foundUser] = await Promise.all([
        communitiesPromise,
        userPromise,
      ]);

      // Filtrar comunidades localmente por nome/descrição
      const filteredCommunities = filterCommunities(allCommunities, query);

      setSearchResults({
        communities: {
          public: filteredCommunities.filter((comm) => !comm.isPrivate),
          private: filteredCommunities.filter((comm) => comm.isPrivate),
          userCommunities: [], // Não mostrar na busca
        },
        user: foundUser,
        isSearching: false,
      });
    } catch (err) {
      console.error("Erro na busca:", err);
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

  // ✅ FUNÇÃO MELHORADA: Refresh com reset
  const onRefresh = () => {
    setRefreshing(true);
    loadCommunities(true);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // ✅ ADICIONAR: Infinite scroll
        onMomentumScrollEnd={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 200;

          if (isCloseToBottom && !searchQuery.trim()) {
            loadMoreCommunities();
          }
        }}
        scrollEventThrottle={400}
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

        {/* ✅ ADICIONAR: Indicador de loading para mais dados */}
        {loadingMore && (
          <LoaderContainer style={{ marginVertical: 20 }}>
            <ActivityIndicator size="small" color="#422680" />
          </LoaderContainer>
        )}
      </ScrollView>
    </Container>
  );
};

export default Comunidades;

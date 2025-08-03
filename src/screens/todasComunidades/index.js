import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../contexts/authContext";
import { communityService } from "../../services/communityService";
import { userService } from "../../services/userService";
import SearchBar from "../../components/searchBar";
import CommunityCard from "../../components/communityCard";

import {
  Container,
  Title,
  EmptyMessage,
  LoadingSpinner,
  ErrorMessage,
  CommunityList,
  UserResultCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserPhone,
  CommunityCardWrapper,
} from "./styles";

const TodasComunidades = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { signed: isLoggedIn } = useAuth();

  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    communities: [],
    user: null,
    isSearching: false,
  });
  // ✅ NOVOS ESTADOS
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadCommunities();
  }, []);

  // ✅ FUNÇÃO MELHORADA
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

      // ✅ USAR MÉTODO MELHORADO
      const allCommunities = isLoggedIn
        ? await communityService.listWithUserContext({
            page: currentPage,
            limit: 30,
          })
        : await communityService.list({
            page: currentPage,
            limit: 30,
            includeFriends: false,
          });

      // Só comunidades públicas
      const publicCommunities = allCommunities.filter(
        (comm) => !comm.isPrivate
      );

      // ✅ VERIFICAR se há mais dados
      const newHasMoreData = allCommunities.length === 30;
      setHasMoreData(newHasMoreData);

      if (reset) {
        setCommunities(publicCommunities);
      } else {
        // ✅ ADICIONAR às comunidades existentes
        setCommunities((prev) => [...prev, ...publicCommunities]);
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

  // ✅ NOVA FUNÇÃO: Carregar mais comunidades
  const loadMoreCommunities = () => {
    if (!loadingMore && hasMoreData) {
      loadCommunities(false);
    }
  };

  // Função para detectar se é um número de telefone
  const isPhoneNumber = (query) => {
    const cleanQuery = query.replace(/\D/g, "");
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

  // Busca híbrida (comunidades + usuários)
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({
        communities: [],
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
        communities: filteredCommunities,
        user: foundUser,
        isSearching: false,
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      setSearchResults((prev) => ({ ...prev, isSearching: false }));
    }
  };

  // Debounce da busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, communities]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleUserPress = (user) => {
    navigation.navigate("PerfilVisitante", { userId: user.id });
  };

  // ✅ FUNÇÃO MELHORADA: Refresh com reset
  const onRefresh = () => {
    setRefreshing(true);
    loadCommunities(true);
  };

  const getDataToShow = () => {
    if (searchQuery.trim()) {
      return searchResults.communities;
    }
    return communities;
  };

  const renderCommunityItem = ({ item }) => (
    <CommunityCard {...item} width={165} height={200} />
  );

  const renderUserResult = () => {
    if (!searchResults.user) return null;

    return (
      <UserResultCard onPress={() => handleUserPress(searchResults.user)}>
        <UserAvatar source={{ uri: searchResults.user.avatar }} />
        <UserInfo>
          <UserName>{searchResults.user.name}</UserName>
          <UserPhone>{searchResults.user.phone}</UserPhone>
        </UserInfo>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </UserResultCard>
    );
  };

  const renderEmptyState = () => {
    if (searchQuery.trim()) {
      return (
        <EmptyMessage>
          <Ionicons
            name="search-outline"
            size={48}
            color="#422680"
            style={{ marginBottom: 16 }}
          />
          {isPhoneNumber(searchQuery)
            ? "Nenhum usuário ou comunidade encontrada"
            : "Nenhuma comunidade encontrada"}
        </EmptyMessage>
      );
    }

    return (
      <EmptyMessage>
        <Ionicons
          name="people-outline"
          size={48}
          color="#422680"
          style={{ marginBottom: 16 }}
        />
        Nenhuma comunidade disponível
      </EmptyMessage>
    );
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner size="large" color="#422680" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  const dataToShow = getDataToShow();
  const hasResults = dataToShow.length > 0 || searchResults.user;

  return (
    <Container>
      <Title>Comunidades Populares</Title>

      <SearchBar
        placeholder="Buscar comunidades ou telefone..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {searchResults.isSearching ? (
        <LoadingSpinner size="small" color="#422680" />
      ) : hasResults ? (
        <CommunityList
          data={dataToShow}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 24,
            paddingHorizontal: 4,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 12,
            paddingHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#422680"]} // Android
              tintColor="#422680" // iOS
            />
          }
          ListHeaderComponent={renderUserResult}
          renderItem={renderCommunityItem}
          // ✅ ADICIONAR: Infinite scroll
          onEndReached={loadMoreCommunities}
          onEndReachedThreshold={0.5}
        />
      ) : (
        renderEmptyState()
      )}
    </Container>
  );
};

export default TodasComunidades;

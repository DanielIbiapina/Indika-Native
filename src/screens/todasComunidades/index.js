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

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const allCommunities = await communityService.list();

      // Só comunidades públicas (ignorando privadas por enquanto)
      const publicCommunities = allCommunities.filter(
        (comm) => !comm.isPrivate
      );

      setCommunities(publicCommunities);
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

      // Filtrar comunidades
      const filteredCommunities = filterCommunities(communities, query);

      let foundUser = null;

      // Se parecer um telefone, buscar usuário
      if (isPhoneNumber(query)) {
        try {
          foundUser = await userService.searchByPhone(query);
        } catch (error) {
          console.log("Usuário não encontrado por telefone");
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

  const onRefresh = () => {
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={renderUserResult}
          renderItem={renderCommunityItem}
        />
      ) : (
        renderEmptyState()
      )}
    </Container>
  );
};

export default TodasComunidades;

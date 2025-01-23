import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import SearchBar from "../../components/searchBar";
import CommunityCard from "../../components/communityCard";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/authContext";
import { communityService } from "../../services/communityService";
import {
  Container,
  Header,
  Title,
  Section,
  SectionTitle,
  AddButton,
  LoginPrompt,
  LoginButton,
  LoginButtonText,
  ErrorMessage,
  AddButtonContainer,
  LoaderContainer,
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

  useEffect(() => {
    loadCommunities();
  }, [isLoggedIn]);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await communityService.list();

      let userComms = [];
      if (isLoggedIn) {
        userComms = await communityService.getUserCommunities();
      }

      setCommunities({
        public: data.filter((comm) => !comm.isPrivate),
        private: data.filter((comm) => comm.isPrivate),
        userCommunities: userComms.communities,
      });
    } catch (err) {
      setError("Erro ao carregar comunidades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => <CommunityCard {...item} />;

  const renderHorizontalList = (data, title, subtitle) => {
    if (!data || data.length === 0) return null;

    return (
      <Section>
        <SectionTitle>
          <Text>{title}</Text>
          <Text>{subtitle}</Text>
        </SectionTitle>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          snapToInterval={viewportWidth * 0.85}
          decelerationRate="fast"
          snapToAlignment="center"
        />
      </Section>
    );
  };

  const handleCreateCommunity = () => {
    navigation.navigate("CriarComunidade");
  };

  const handleLogin = () => {
    navigation.navigate("Entrar");
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  if (isLoggedIn && communities.userCommunities.length === 0) {
    return (
      <Container>
        <Text>Você ainda não participa de nenhuma comunidade</Text>
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

  return (
    <Container>
      <Title>Suas Comunidades</Title>
      <SearchBar placeholder="Buscar comunidades..." />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {isLoggedIn && (
          <AddButtonContainer>
            <AddButton onPress={handleCreateCommunity}>
              <Ionicons name="add" size={24} color="black" />
              <Text>Criar nova comunidade</Text>
            </AddButton>
          </AddButtonContainer>
        )}

        {isLoggedIn &&
          renderHorizontalList(
            communities.userCommunities,
            "Minhas Comunidades",
            "Ver todas"
          )}

        {renderHorizontalList(
          communities.public,
          "Comunidades populares",
          "Ver todas"
        )}

        {isLoggedIn &&
          renderHorizontalList(
            communities.private,
            "Suas comunidades",
            "Ver todas"
          )}

        {!isLoggedIn && (
          <LoginPrompt>
            <Text>
              Entre para ver mais comunidades e criar as suas próprias
            </Text>
            <LoginButton onPress={handleLogin}>
              <LoginButtonText>Entrar</LoginButtonText>
            </LoginButton>
          </LoginPrompt>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Comunidades;

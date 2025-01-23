import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBar from "../../components/searchBar";
import ServiceCard from "../../components/serviceCard";
import ServiceHighlight from "../../components/serviceHighlight";
import { useAuth } from "../../contexts/authContext";
import api from "../../services/api";
import { serviceService } from "../../services/serviceService";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  LoaderContainer,
  Title,
  LoginBanner,
  LoginText,
  LoginButton,
  LoginButtonText,
  CategoryList,
  ServicesSection,
  SectionTitle,
  SectionTitleText,
  ViewAllText,
  ServiceList,
} from "./styles";

const Home = () => {
  const { signed, user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Auth status:", { signed, user });
  }, [signed, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await serviceService.list({
          limit: 100,
        });
        const uniqueCategories = [
          ...new Set(servicesData.map((service) => service.category)),
        ].map((category) => ({
          id: category,
          name: category,
          icon: getCategoryIcon(category),
        }));

        setCategories(uniqueCategories);

        const servicesByCategory = servicesData.reduce((acc, service) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push(service);
          return acc;
        }, {});

        setServices(servicesByCategory);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      "Assistência Técnica": "build",
      "Reformas e Reparos": "home-repair-service",
      Eventos: "event",
      "Serviços Domésticos": "home",
      Aulas: "school",
    };
    return icons[category] || "list";
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  const renderCategoryItem = ({ item }) => (
    <ServiceCard
      icon={
        <MaterialIcons
          name={getCategoryIcon(item.name)}
          size={24}
          color="#422680"
        />
      }
      title={item.name}
    />
  );

  return (
    <ScrollView>
      <Container>
        {!signed && (
          <LoginBanner>
            <LoginText>
              Entre para ter acesso a mais serviços e comunidades
            </LoginText>
            <LoginButton onPress={() => navigation.navigate("Entrar")}>
              <LoginButtonText>Entrar</LoginButtonText>
            </LoginButton>
          </LoginBanner>
        )}

        <Title onPress={logout}>Boas-vindas</Title>
        <SearchBar placeholder="O que você precisa?" />

        <CategoryList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          showsHorizontalScrollIndicator={false}
        />

        {Object.entries(services).map(([categoryId, categoryServices]) => {
          const category = categories.find((cat) => cat.id === categoryId);
          return (
            <ServicesSection key={categoryId}>
              <SectionTitle>
                <SectionTitleText>{category?.name}</SectionTitleText>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ServicosPorCategoria", {
                      category: category.name,
                    })
                  }
                >
                  <ViewAllText>Ver tudo</ViewAllText>
                </TouchableOpacity>
              </SectionTitle>
              <ServiceList
                horizontal
                data={categoryServices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ServiceHighlight
                    id={item.id}
                    title={item.title}
                    image={item.images[0]}
                    provider={item.provider}
                    stats={{
                      averageRating: item.rating || 0,
                      totalReviews: item.totalRatings || 0,
                    }}
                    price={`A partir de R$ ${item.priceStartingAt}`}
                    description={item.description}
                  />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </ServicesSection>
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default Home;

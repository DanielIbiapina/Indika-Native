import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../components/searchBar";
import ServiceCard from "../../components/serviceCard";
import ServiceHighlight from "../../components/serviceHighlight";
import { useAuth } from "../../contexts/authContext";
import { serviceService } from "../../services/serviceService";
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
import { useTutorial } from "../../contexts/tutorialContext";

const { width: screenWidth } = Dimensions.get("window");

const CATEGORY_ICONS = {
  "Assistência Técnica": "build",
  "Reformas e Reparos": "home-repair-service",
  Eventos: "event",
  "Serviços Domésticos": "home",
  Aulas: "school",
};

const Home = () => {
  const { signed, user, logout } = useAuth();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Tutorial state
  const [tutorialStep, setTutorialStep] = useState(0);
  const { startTutorial, endTutorial, shouldShowTutorial, resetTutorials } =
    useTutorial();

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const servicesData = await serviceService.list({ limit: 100 });
      processServicesData(servicesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const processServicesData = (servicesData) => {
    const uniqueCategories = [
      ...new Set(servicesData.map((service) => service.category)),
    ].map((category) => ({
      id: category,
      name: category,
      icon: CATEGORY_ICONS[category] || "list",
    }));

    const servicesByCategory = servicesData.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {});

    setCategories(uniqueCategories);
    setServices(servicesByCategory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Iniciar tutorial quando a tela for montada (em produção, só mostrará para novos usuários)
  useEffect(() => {
    if (signed) {
      // Se o usuário estiver logado, iniciar o tutorial
      setTimeout(() => {
        startTutorial("home");
      }, 1000);
    }
  }, [signed]);

  // Tutorial content
  const tutorialContent = [
    {
      title: "Busque serviços",
      message:
        "Use a barra de pesquisa para encontrar os serviços que você precisa",
      icon: "search",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/149/149852.png",
    },
    {
      title: "Explore categorias",
      message: "Navegue pelas diferentes categorias para descobrir serviços",
      icon: "apps",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1246/1246332.png",
    },
    {
      title: "Contrate serviços",
      message:
        "Selecione um serviço para ver detalhes e entrar em contato com o prestador",
      icon: "handshake",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3281/3281307.png",
    },
  ];

  // Função para avançar para o próximo passo do tutorial
  const handleNextTutorialStep = () => {
    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      // Se for o último passo, finalizar o tutorial
      endTutorial("home");
      setTutorialStep(0);
    }
  };

  // Função para pular o tutorial
  const handleSkipTutorial = () => {
    endTutorial("home");
    setTutorialStep(0);
  };

  // Botão de desenvolvimento para resetar o tutorial (remover em produção)
  const handleDevResetTutorial = () => {
    resetTutorials("home");
    setTimeout(() => {
      startTutorial("home");
    }, 500);
  };

  // Renderizar o tutorial
  const renderTutorial = () => {
    if (!shouldShowTutorial("home")) return null;

    const currentStep = tutorialContent[tutorialStep];

    return (
      <Modal
        transparent={true}
        visible={true}
        animationType="fade"
        onRequestClose={handleSkipTutorial}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              width: screenWidth * 0.85,
              padding: 20,
              alignItems: "center",
              maxHeight: "80%",
            }}
          >
            {/* Número do passo */}
            <View
              style={{
                backgroundColor: "#422680",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {tutorialStep + 1}/{tutorialContent.length}
              </Text>
            </View>

            {/* Título */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#422680",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              {currentStep.title}
            </Text>

            {/* Imagem de URL externa */}
            <View
              style={{
                width: "100%",
                height: 180,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                marginVertical: 16,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {/* Fallback para ícone */}
              <MaterialIcons
                name={currentStep.icon}
                size={60}
                color="#422680"
              />

              {/* Imagem de URL */}
              {currentStep.imageUrl && (
                <Image
                  source={{ uri: currentStep.imageUrl }}
                  style={{
                    position: "absolute",
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                />
              )}
            </View>

            {/* Mensagem */}
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                marginBottom: 24,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              {currentStep.message}
            </Text>

            {/* Botões */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={handleSkipTutorial}
                style={{
                  padding: 12,
                }}
              >
                <Text style={{ color: "#999" }}>Pular</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNextTutorialStep}
                style={{
                  backgroundColor: "#422680",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {tutorialStep === tutorialContent.length - 1
                    ? "Concluir"
                    : "Próximo"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
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
          name={CATEGORY_ICONS[item.name] || "list"}
          size={24}
          color="#422680"
        />
      }
      title={item.name}
    />
  );

  const renderServiceSection = ([categoryId, categoryServices]) => {
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
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
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

          <Title onPress={logout}>
            Boas-vindas{user ? `, ${user.name}` : ""}
          </Title>

          <SearchBar placeholder="O que você precisa?" />

          <CategoryList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            showsHorizontalScrollIndicator={false}
          />

          {Object.entries(services).map(renderServiceSection)}

          {/* Botão DEV para resetar tutorial - Remover em produção */}
          {__DEV__ && (
            <TouchableOpacity
              onPress={handleDevResetTutorial}
              style={{
                marginTop: 20,
                marginBottom: 20,
                padding: 10,
                backgroundColor: "#eee",
                borderRadius: 8,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "#666" }}>Reset Tutorial (DEV)</Text>
            </TouchableOpacity>
          )}
        </Container>
      </ScrollView>

      {renderTutorial()}
    </>
  );
};

export default Home;

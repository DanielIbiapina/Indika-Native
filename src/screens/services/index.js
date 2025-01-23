import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"; // Para navegação no React Native
import { serviceService } from "../../services/serviceService"; // Ajuste o caminho conforme necessário
import {
  Container,
  Title,
  ServicesList,
  ErrorMessage,
  LoadingSpinner,
  BackButton,
  BackButtonText,
  LoaderContainer,
} from "./styles";
import ServiceCategoryCard from "../../components/serviceCategoryCard"; // Importando o componente
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones para React Native
import { ActivityIndicator } from "react-native";

const ServicesByCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params; // Obtém a categoria da rota
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Chama o método list com a categoria como parâmetro
        const data = await serviceService.list({ category }); // Passa a categoria diretamente
        setServices(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar serviços");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} />
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>
      <Title>Serviços em {category}</Title>
      <ServicesList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 24,
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <ServiceCategoryCard
            id={item.id}
            title={item.title}
            image={item.images[0]} // Supondo que você tenha um array de imagens
            provider={item.provider} // Se necessário
            stats={
              {
                averageRating: item.rating,
                totalReviews: item.totalRatings,
              } || { averageRating: 0, totalReviews: 0 }
            } // Supondo que você tenha estatísticas de avaliação
            price={`R$ ${item.priceStartingAt}`}
            description={item.description}
          />
        )}
      />
    </Container>
  );
};

export default ServicesByCategory;

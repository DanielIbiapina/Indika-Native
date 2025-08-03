import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { serviceService } from "../../services/serviceService";
import { CATEGORIES } from "../../constants/categories";
import {
  Container,
  Header,
  BackButton,
  Title,
  FilterContainer,
  FilterChip,
  FilterChipText,
  ClearFiltersButton,
  ClearFiltersText,
  ServicesList,
  ErrorMessage,
  LoadingSpinner,
  LoaderContainer,
} from "./styles";
import ServiceCategoryCard from "../../components/serviceCategoryCard";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView } from "react-native";
import { useUserLocation } from "../../hooks/useUserLocation";

const ServicesByCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, initialSubcategory } = route.params; // ✅ NOVO: Pode receber subcategoria inicial

  const [allServices, setAllServices] = useState([]); // ✅ NOVO: Todos os serviços da categoria
  const [filteredServices, setFilteredServices] = useState([]); // ✅ NOVO: Serviços filtrados
  const [selectedSubcategories, setSelectedSubcategories] = useState(
    initialSubcategory ? [initialSubcategory] : [] // ✅ NOVO: Filtros selecionados
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ NOVO: Obter subcategorias disponíveis da categoria
  const availableSubcategories = CATEGORIES[category]?.subcategories || [];

  // ✅ NOVO: Hook de localização
  const { userLocation } = useUserLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        // ✅ SEGURO: Adicionar filtro apenas se tem localização
        const params = { category };
        if (userLocation?.city) {
          params.userLocation = userLocation;
          params.filterByLocation = true;
          console.log(
            "🔍 Filtrando serviços de",
            category,
            "por:",
            userLocation.city
          );
        }

        const data = await serviceService.list(params);
        setAllServices(data);

        // Aplicar filtros iniciais se houver
        if (initialSubcategory) {
          const filtered = data.filter(
            (service) =>
              service.subcategories &&
              service.subcategories.includes(initialSubcategory)
          );
          setFilteredServices(filtered);
        } else {
          setFilteredServices(data);
        }
      } catch (err) {
        setError(err.message || "Erro ao carregar serviços");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category, initialSubcategory, userLocation]); // ✅ ADICIONAR userLocation

  // ✅ NOVO: Filtrar serviços baseado nas subcategorias selecionadas
  useEffect(() => {
    if (selectedSubcategories.length === 0) {
      // Se nenhum filtro selecionado, mostrar todos
      setFilteredServices(allServices);
    } else {
      // Filtrar serviços que contenham pelo menos uma subcategoria selecionada
      const filtered = allServices.filter(
        (service) =>
          service.subcategories &&
          service.subcategories.some((sub) =>
            selectedSubcategories.includes(sub)
          )
      );
      setFilteredServices(filtered);
    }
  }, [selectedSubcategories, allServices]);

  // ✅ NOVO: Toggle filtro de subcategoria
  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategory)) {
        // Remove se já estiver selecionado
        return prev.filter((sub) => sub !== subcategory);
      } else {
        // Adiciona se não estiver selecionado
        return [...prev, subcategory];
      }
    });
  };

  // ✅ NOVO: Limpar todos os filtros
  const clearFilters = () => {
    setSelectedSubcategories([]);
  };

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
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </BackButton>
        <Title>{category}</Title>
      </Header>

      {/* ✅ NOVO: Filtros de Subcategoria */}
      {availableSubcategories.length > 0 && (
        <FilterContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {availableSubcategories.map((subcategory) => (
              <FilterChip
                key={subcategory}
                selected={selectedSubcategories.includes(subcategory)}
                onPress={() => toggleSubcategory(subcategory)}
              >
                <FilterChipText
                  selected={selectedSubcategories.includes(subcategory)}
                >
                  {subcategory}
                </FilterChipText>
              </FilterChip>
            ))}

            {/* ✅ NOVO: Botão limpar filtros */}
            {selectedSubcategories.length > 0 && (
              <ClearFiltersButton onPress={clearFilters}>
                <ClearFiltersText>Limpar</ClearFiltersText>
              </ClearFiltersButton>
            )}
          </ScrollView>
        </FilterContainer>
      )}

      <ServicesList
        data={filteredServices}
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
            image={item.images[0]}
            provider={item.provider}
            stats={
              {
                averageRating: item.rating,
                totalReviews: item.totalRatings,
              } || { averageRating: 0, totalReviews: 0 }
            }
            price={`R$ ${item.priceStartingAt}`}
            description={item.description}
            subcategories={item.subcategories} // ✅ NOVO: Mostrar subcategorias no card
          />
        )}
        ListEmptyComponent={() => (
          <ErrorMessage>
            {selectedSubcategories.length > 0
              ? "Nenhum serviço encontrado para os filtros selecionados"
              : "Nenhum serviço encontrado nesta categoria"}
          </ErrorMessage>
        )}
      />
    </Container>
  );
};

export default ServicesByCategory;

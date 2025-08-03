import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { serviceService } from "../../../services/serviceService";
import ImageUpload from "../../../components/imageUpload";
import {
  Container,
  Form,
  Title,
  Input,
  TextArea,
  PriceInput,
  CategoryButton,
  CategoryButtonText,
  CategoryButtonIcon,
  SubcategoriesContainer,
  SubcategoryTag,
  SubcategoryTagText,
  ErrorMessage,
  ButtonStyled,
  ButtonStyledText,
  ScrollContainer,
} from "./styles";
import { Picker } from "@react-native-picker/picker";
import {
  CATEGORIES,
  DEFAULT_CATEGORY_IMAGES,
} from "../../../constants/categories";
import CategorySelectionModal from "../../../components/categorySelectionModal";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Text, View, Alert, Linking } from "react-native";
import {
  emitServiceCreated,
  emitServiceUpdated,
} from "../../../utils/eventEmitter";
import * as Location from "expo-location";
import ServiceAreaSelector from "../../../components/serviceAreaSelector";

const CriarServico = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ NOVO: Verificar se é edição
  const { serviceId } = route.params || {};
  const isEditing = !!serviceId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(isEditing);

  // ✅ ADICIONAR ao formData:
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategories: [],
    image: null,
    // 🔥 NOVOS CAMPOS DE LOCALIZAÇÃO:
    serviceArea: {
      type: "city", // 'city', 'region', 'custom'
      city: "",
      state: "",
      radius: 10, // km para áreas metropolitanas
      customAreas: [], // bairros específicos
    },
    coverageDescription: "", // ex: "Atendo toda Grande São Paulo"
  });

  // ✅ ADICIONAR: Hook para detectar localização atual
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // ✅ NOVO: Carregar dados do serviço para edição
  useEffect(() => {
    if (isEditing) {
      loadServiceData();
    }
  }, [serviceId]);

  const loadServiceData = async () => {
    try {
      setLoadingService(true);
      const service = await serviceService.getById(serviceId);

      setFormData({
        title: service.title,
        description: service.description,
        category: service.category,
        subcategories: service.subcategories || [], // ✅ NOVO
        //priceStartingAt: service.priceStartingAt.toString(),
        //priceUnit: service.priceUnit,
        image: service.images?.[0] ? { uri: service.images[0] } : null,
        // 🔥 PREENCHER campos de localização
        serviceArea: {
          city: service.serviceCity || "",
          state: service.serviceState || "",
          type: "city",
        },
        coverageDescription: service.coverageDescription || "",
      });
    } catch (err) {
      console.error("Erro ao carregar serviço:", err);
      setError("Erro ao carregar dados do serviço");
    } finally {
      setLoadingService(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  // ✅ NOVO: Handler para categoria + subcategorias
  const handleCategorySelect = (data) => {
    setFormData((prev) => ({
      ...prev,
      category: data.category,
      subcategories: data.subcategories,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Validações existentes
      if (!formData.title.trim()) {
        setError("Título é obrigatório");
        return;
      }

      if (!formData.description.trim()) {
        setError("Descrição é obrigatória");
        return;
      }

      if (!formData.category) {
        setError("Categoria é obrigatória");
        return;
      }

      // ✅ NOVA: Validação de localização
      if (!formData.serviceArea.city) {
        setError("Defina sua área de atuação");
        return;
      }

      console.log("Dados do serviço a serem enviados:", formData);

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append(
        "subcategories",
        JSON.stringify(formData.subcategories)
      );

      // ✅ NOVO: Adicionar localização
      submitData.append("serviceCity", formData.serviceArea.city);
      submitData.append("serviceState", formData.serviceArea.state);

      // ✅ CORRIGIR: Restaurar funcionalidade completa de imagem
      if (formData.image && formData.image.uri) {
        // Tem imagem própria
        const imageUri = formData.image.uri;
        const filename = imageUri.split("/").pop();
        const fileType = filename.split(".").pop();

        submitData.append("image", {
          uri: imageUri,
          name: filename,
          type: `image/${fileType}`,
        });
      } else {
        // ✅ RESTAURADO: SEM IMAGEM - Usar padrão da categoria
        if (formData.category && DEFAULT_CATEGORY_IMAGES[formData.category]) {
          console.log(`🖼️ Usando imagem padrão para: ${formData.category}`);
          submitData.append(
            "defaultImage",
            DEFAULT_CATEGORY_IMAGES[formData.category]
          );
        }
      }

      const result = await serviceService.create(submitData, serviceId);

      if (isEditing) {
        emitServiceUpdated(result);
      } else {
        emitServiceCreated(result);
      }

      Alert.alert("Sucesso!", "Serviço salvo com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      setError(err.message || "Erro ao salvar serviço");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOADING: Enquanto carrega dados do serviço
  if (loadingService) {
    return (
      <Container>
        <ScrollContainer>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <ActivityIndicator size="large" color="#422680" />
            <Text style={{ marginTop: 16, color: "#666" }}>
              Carregando serviço...
            </Text>
          </View>
        </ScrollContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer>
        {/* ✅ TÍTULO: Dinâmico */}
        <Title>{isEditing ? "Editar Serviço" : "Criar Novo Serviço"}</Title>

        <Form>
          <ImageUpload
            value={formData.image}
            onChange={handleImageChange}
            maxSize={2}
            label="Foto de capa do serviço"
            placeholder={
              formData.category
                ? DEFAULT_CATEGORY_IMAGES[formData.category]
                : undefined
            }
          />

          <Input
            placeholder="Título do serviço"
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
            required
          />

          <TextArea
            placeholder="Descreva seu serviço em detalhes..."
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            required
          />

          {/* ✅ NOVO: Área de atuação */}
          <ServiceAreaSelector
            serviceArea={formData.serviceArea}
            onAreaChange={(newArea) => {
              console.log("Nova área selecionada:", newArea);
              setFormData((prev) => ({
                ...prev,
                serviceArea: newArea,
              }));
            }}
            userLocation={userLocation}
          />

          {/* ✅ MODIFICADO: Mostrar categoria + subcategorias */}
          <CategoryButton onPress={() => setShowCategoryModal(true)}>
            <View style={{ flex: 1 }}>
              <CategoryButtonText hasCategory={!!formData.category}>
                {formData.category || "Selecionar Categoria"}
              </CategoryButtonText>

              {/* ✅ NOVO: Mostrar subcategorias selecionadas */}
              {formData.subcategories.length > 0 && (
                <SubcategoriesContainer>
                  {formData.subcategories.map((subcategory, index) => (
                    <SubcategoryTag key={index}>
                      <SubcategoryTagText>{subcategory}</SubcategoryTagText>
                    </SubcategoryTag>
                  ))}
                </SubcategoriesContainer>
              )}
            </View>

            <CategoryButtonIcon>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#666"
              />
            </CategoryButtonIcon>
          </CategoryButton>

          {/*<PriceInput>
            <Input
              placeholder="Preço inicial"
              value={formData.priceStartingAt}
              onChangeText={(text) => handleChange("priceStartingAt", text)}
              required
            />
            <Picker
              selectedValue={formData.priceUnit}
              onValueChange={(itemValue) =>
                handleChange("priceUnit", itemValue)
              }
            >
              <Picker.Item label="por serviço" value="servico" />
              <Picker.Item label="por hora" value="hora" />
              <Picker.Item label="por pessoa" value="pessoa" />
            </Picker>
          </PriceInput>*/}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonStyled onPress={handleSubmit} disabled={loading}>
            <ButtonStyledText>
              {loading
                ? isEditing
                  ? "Atualizando..."
                  : "Criando..."
                : isEditing
                ? "Atualizar Serviço"
                : "Criar Serviço"}
            </ButtonStyledText>
          </ButtonStyled>
        </Form>
      </ScrollContainer>

      <CategorySelectionModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategory={formData.category}
        selectedSubcategories={formData.subcategories}
        onSelect={handleCategorySelect}
      />
    </Container>
  );
};

export default CriarServico;

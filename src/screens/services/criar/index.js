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
import { ActivityIndicator, Text, View } from "react-native";
import {
  emitServiceCreated,
  emitServiceUpdated,
} from "../../../utils/eventEmitter";

const CriarServico = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ NOVO: Verificar se é edição
  const { serviceId } = route.params || {};
  const isEditing = !!serviceId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(isEditing);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategories: [], // ✅ NOVO
    priceStartingAt: "",
    priceUnit: "servico",
    image: null,
  });
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
        priceStartingAt: service.priceStartingAt.toString(),
        priceUnit: service.priceUnit,
        image: service.images?.[0] ? { uri: service.images[0] } : null,
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
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // ✅ NOVO: Se não tem imagem própria, usar a padrão da categoria
      if (formData.image?.uri) {
        // Tem imagem própria
        formDataToSend.append("image", {
          uri: formData.image.uri,
          type: formData.image.type || "image/jpeg",
          name: formData.image.fileName || "service-image.jpg",
        });
      } else {
        // ✅ SEM IMAGEM: Usar padrão da categoria (sempre)
        if (formData.category && DEFAULT_CATEGORY_IMAGES[formData.category]) {
          console.log(`��️ Usando imagem padrão para: ${formData.category}`);
          formDataToSend.append(
            "defaultImage",
            DEFAULT_CATEGORY_IMAGES[formData.category]
          );
        }
      }

      // Adiciona os outros dados do serviço
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append(
        "subcategories",
        JSON.stringify(formData.subcategories)
      ); // ✅ NOVO
      formDataToSend.append("priceStartingAt", formData.priceStartingAt);
      formDataToSend.append("priceUnit", formData.priceUnit);

      // ✅ UPSERT: Um método só para ambos os casos
      const response = await serviceService.create(formDataToSend, serviceId);

      // 🎯 EMITIR EVENTO: Notificar outras telas
      if (isEditing) {
        emitServiceUpdated(response);
      } else {
        emitServiceCreated(response);
      }

      // Navegar para detalhes
      navigation.replace("ServicoDetalhes", { id: response.id || serviceId });
    } catch (err) {
      console.error(`Erro ao ${isEditing ? "atualizar" : "criar"}:`, err);
      setError(
        err.message || `Erro ao ${isEditing ? "atualizar" : "criar"} serviço`
      );
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

          <PriceInput>
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
          </PriceInput>

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

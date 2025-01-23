import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Text, View, Button, Picker, Platform } from "react-native";
import { serviceService } from "../../../services/serviceService";
import ImageUpload from "../../../components/imageUpload";
import {
  Container,
  Form,
  Title,
  Input,
  TextArea,
  PriceInput,
  CategorySelect,
  ErrorMessage,
  ButtonStyled,
} from "./styles";

const CriarServico = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priceStartingAt: "",
    priceUnit: "servico",
    image: null,
  });

  const DEFAULT_IMAGES = {
    "Assistência Técnica":
      "https://images.unsplash.com/photo-1523655223303-4e9ef5234587?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXNzaXN0JUMzJUFBbmNpYSUyMHRlY25pY2F8ZW58MHx8MHx8fDA%3D",
    "Reformas e Reparos":
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJlZm9ybWFzJTIwZSUyMHJlcGFyb3N8ZW58MHx8MHx8fDA%3D",
    Eventos:
      "https://images.unsplash.com/photo-1671036089231-a56464fdaadd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGV2ZW50b3N8ZW58MHx8MHx8fDA%3D",
    "Serviços Domésticos":
      "https://plus.unsplash.com/premium_photo-1684407616442-87bf0d69e8b4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmF4aW5hfGVufDB8fDB8fHww",
    Aulas:
      "https://plus.unsplash.com/premium_photo-1713908832340-e733093a869e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGF1bGElMjBkZSUyMHlvZ2F8ZW58MHx8MHx8fDA%3D",
  };

  const handleChange = (e, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e,
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("priceStartingAt", formData.priceStartingAt);
      formDataToSend.append("priceUnit", formData.priceUnit);

      if (formData.image?.file) {
        formDataToSend.append("images", formData.image.file);
      } else if (formData.category && DEFAULT_IMAGES[formData.category]) {
        const defaultImage = DEFAULT_IMAGES[formData.category];
        formDataToSend.append("defaultImage", defaultImage);
      } else {
        const defaultImage =
          "https://plus.unsplash.com/premium_photo-1680303134459-912abf8efe2f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JTNGfGVufDB8fDB8fHww";
        formDataToSend.append("defaultImage", defaultImage);
      }

      await serviceService.create(formDataToSend);
      navigation.navigate("Perfil");
    } catch (err) {
      setError(err.message || "Erro ao criar serviço");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Criar Novo Serviço</Title>

      <Form>
        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          maxSize={2} // 2MB
          label="Foto de capa do serviço"
        />

        <Input
          placeholder="Título do serviço"
          value={formData.title}
          onChangeText={(text) => handleChange(text, "title")}
          required
        />

        <TextArea
          placeholder="Descreva seu serviço em detalhes..."
          value={formData.description}
          onChangeText={(text) => handleChange(text, "description")}
          required
        />

        <CategorySelect
          selectedValue={formData.category}
          onValueChange={(itemValue) => handleChange(itemValue, "category")}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          <Picker.Item
            label="Assistência Técnica"
            value="Assistência Técnica"
          />
          <Picker.Item label="Reformas e Reparos" value="Reformas e Reparos" />
          <Picker.Item label="Eventos" value="Eventos" />
          <Picker.Item
            label="Serviços Domésticos"
            value="Serviços Domésticos"
          />
          <Picker.Item label="Aulas" value="Aulas" />
        </CategorySelect>

        <PriceInput>
          <Input
            placeholder="Preço inicial"
            value={formData.priceStartingAt}
            onChangeText={(text) => handleChange(text, "priceStartingAt")}
            required
          />
          <Picker
            selectedValue={formData.priceUnit}
            onValueChange={(itemValue) => handleChange(itemValue, "priceUnit")}
          >
            <Picker.Item label="por serviço" value="servico" />
            <Picker.Item label="por hora" value="hora" />
            <Picker.Item label="por pessoa" value="pessoa" />
          </Picker>
        </PriceInput>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonStyled
          title={loading ? "Criando..." : "Criar Serviço"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </Form>
    </Container>
  );
};

export default CriarServico;

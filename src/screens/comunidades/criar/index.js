import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // React Navigation para navegação
import { communityService } from "../../../services/communityService";
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones do Expo
import {
  Container,
  Header,
  BackButton,
  Title,
  Form,
  Input,
  TextArea,
  Switch,
  Button,
  ErrorMessage,
} from "./styles";
import ImageUpload from "../../../components/imageUpload"; // Componente de upload de imagem

const CriarComunidade = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    isPrivate: false,
    categories: [],
  });

  const handleChange = (e, name) => {
    const { value, checked, type } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPrivate", formData.isPrivate);
      formDataToSend.append("categories", JSON.stringify(formData.categories));

      if (formData.image?.file) {
        formDataToSend.append("image", formData.image.file);
      }

      await communityService.create(formDataToSend);
      navigation.navigate("Comunidades"); // Navegação para a tela de comunidades
    } catch (err) {
      setError(err.message || "Erro ao criar comunidade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#666" />
          Voltar
        </BackButton>
        <Title>Criar Comunidade</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          maxSize={5} // 5MB
          label="Capa da Comunidade"
        />

        <Input
          placeholder="Nome da comunidade"
          value={formData.name}
          onChangeText={(text) => handleChange({ value: text }, "name")}
          required
        />

        <TextArea
          placeholder="Descrição da comunidade"
          value={formData.description}
          onChangeText={(text) => handleChange({ value: text }, "description")}
          required
        />

        <Switch>
          <input
            type="checkbox"
            checked={formData.isPrivate}
            onChange={(e) => handleChange(e, "isPrivate")}
          />
          <span>Comunidade privada</span>
        </Switch>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button onPress={handleSubmit} disabled={loading}>
          {loading ? "Criando..." : "Criar Comunidade"}
        </Button>
      </Form>
    </Container>
  );
};

export default CriarComunidade;

import React, { useState } from "react";
import { Switch as RNSwitch, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { communityService } from "../../../services/communityService";
import {
  Container,
  ScrollContainer,
  Form,
  Input,
  TextArea,
  SwitchContainer,
  SwitchLabel,
  Button,
  ErrorMessage,
} from "./styles";
import ImageUpload from "../../../components/imageUpload";
import { emitCommunityCreated } from "../../../utils/eventEmitter";

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

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // Adiciona a imagem se houver uma nova
      if (formData.image?.uri) {
        formDataToSend.append("image", {
          uri: formData.image.uri,
          type: formData.image.type || "image/jpeg",
          name: formData.image.fileName || "community-image.jpg",
        });
      }

      // Adiciona os outros dados da comunidade
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPrivate", formData.isPrivate);
      formDataToSend.append("categories", JSON.stringify(formData.categories));

      const response = await communityService.create(formDataToSend);

      // 🎯 EMITIR EVENTO
      emitCommunityCreated(response);

      navigation.replace("ComunidadeDetalhes", { id: response.id });
    } catch (err) {
      console.error("Erro ao criar:", err);
      setError(err.message || "Erro ao criar comunidade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollContainer>
        <Form>
          <ImageUpload
            value={formData.image}
            onChange={handleImageChange}
            maxSize={5}
            label="Capa da Comunidade"
          />

          <Input
            placeholder="Nome da comunidade"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <TextArea
            placeholder="Descrição da comunidade"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            numberOfLines={4}
          />

          <SwitchContainer>
            <RNSwitch
              value={formData.isPrivate}
              onValueChange={(value) => handleChange("isPrivate", value)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={formData.isPrivate ? "#422680" : "#f4f3f4"}
            />
            <SwitchLabel>Comunidade privada</SwitchLabel>
          </SwitchContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button onPress={handleSubmit} disabled={loading}>
            <Text style={{ color: "white" }}>
              {loading ? "Criando..." : "Criar Comunidade"}
            </Text>
          </Button>
        </Form>
      </ScrollContainer>
    </Container>
  );
};

export default CriarComunidade;

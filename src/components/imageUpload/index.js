import React from "react";
import { Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Label,
  ImagePreview,
  UploadButtons,
  UploadButton,
  RemoveButton,
  Text,
} from "./styles";

const ImageUpload = ({ value, onChange, maxSize = 2, label, currentImage }) => {
  const pickImage = async () => {
    try {
      // Solicita permissão para acessar a galeria
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à sua galeria para selecionar uma foto."
        );
        return;
      }

      // Abre o seletor de imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];

        // Verifica o tamanho do arquivo (em MB)
        const fileSize = selectedImage.fileSize / (1024 * 1024);
        if (fileSize > maxSize) {
          Alert.alert(
            "Arquivo muito grande",
            `Por favor, selecione uma imagem menor que ${maxSize}MB`
          );
          return;
        }

        // Prepara o objeto de imagem para upload
        onChange({
          uri: selectedImage.uri,
          type: "image/jpeg",
          fileName: `avatar_${Date.now()}.jpg`,
        });
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}

      {(value?.uri || currentImage) && (
        <ImagePreview>
          <Image
            source={{ uri: value?.uri || currentImage }}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
          <RemoveButton onPress={handleRemove}>
            <Text style={{ color: "white" }}>Remover</Text>
          </RemoveButton>
        </ImagePreview>
      )}

      <UploadButtons>
        <UploadButton onPress={pickImage}>
          <Ionicons name="camera-outline" size={24} color="#422680" />
          <Text>{value?.uri ? "Trocar foto" : "Adicionar foto"}</Text>
        </UploadButton>
      </UploadButtons>
    </Container>
  );
};

export default ImageUpload;

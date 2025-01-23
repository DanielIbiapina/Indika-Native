import React, { useRef } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ImagePreview,
  UploadButtons,
  UploadButton,
  RemoveButton,
  Label,
} from "./styles";

const ImageUpload = ({
  value,
  onChange,
  maxSize = 2,
  label = "Selecione uma imagem",
}) => {
  const handleSelectImage = async (useCamera = false) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Erro",
        "Desculpe, precisamos de permissões para acessar a galeria!"
      );
      return;
    }

    try {
      const pickerMethod = useCamera
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

      const result = await pickerMethod({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        if (file.fileSize > maxSize * 1024 * 1024) {
          Alert.alert("Erro", `A imagem deve ter no máximo ${maxSize}MB`);
          return;
        }

        onChange({
          preview: file.uri,
          file,
        });
      }
    } catch (err) {
      console.error("Erro ao selecionar imagem", err);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {value?.preview ? (
        <ImagePreview>
          <Image
            source={{ uri: value.preview }}
            style={{ width: "100%", height: 200 }}
          />
          <RemoveButton onPress={handleRemove}>
            <Text>Remover</Text>
          </RemoveButton>
        </ImagePreview>
      ) : (
        <UploadButtons>
          <UploadButton onPress={() => handleSelectImage(true)}>
            <Ionicons name="camera" size={24} color={theme.colors.primary} />
            <Text>Tirar foto</Text>
          </UploadButton>

          <UploadButton onPress={() => handleSelectImage(false)}>
            <Ionicons name="image" size={24} color={theme.colors.primary} />
            <Text>Galeria</Text>
          </UploadButton>
        </UploadButtons>
      )}
    </Container>
  );
};

export default ImageUpload;

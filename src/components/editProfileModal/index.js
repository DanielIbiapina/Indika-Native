import React, { useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones do React Native
import { userService } from "../../services/userService";
import ImageUpload from "../imageUpload";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Form,
  Input,
  Button,
  ErrorMessage,
  ButtonText,
} from "./styles";

const EditProfileModal = ({ profile, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    avatar: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      avatar: imageData,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      let updatedProfile = { ...profile };

      // Primeiro, atualiza o avatar se houver uma nova imagem
      if (formData.avatar?.uri) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", {
          uri: formData.avatar.uri,
          type: formData.avatar.type || "image/jpeg", // Garante que sempre tenha um tipo
          name: formData.avatar.fileName || "avatar.jpg", // Garante que sempre tenha um nome
        });

        const avatarResponse = await userService.updateAvatar(avatarFormData);
        if (avatarResponse?.avatar) {
          updatedProfile.avatar = avatarResponse.avatar;
        }
      }

      // Depois, atualiza os outros dados do perfil se foram modificados
      if (formData.name !== profile.name) {
        const profileResponse = await userService.updateProfile({
          name: formData.name,
          isServiceProvider: profile.isServiceProvider,
        });
        if (profileResponse) {
          updatedProfile = {
            ...updatedProfile,
            ...profileResponse,
          };
        }
      }

      // Atualiza o perfil no contexto/estado pai
      onUpdate(updatedProfile);
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      setError(err.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Ionicons name="close" size={24} color="#666" onPress={onClose} />
          </ModalHeader>

          <Form>
            <ImageUpload
              value={formData.avatar}
              onChange={handleAvatarChange}
              maxSize={2}
              label="Foto de perfil"
              currentImage={profile.avatar} // Passa a imagem atual como referência
            />

            <Input
              placeholder="Nome completo"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />

            <Input
              placeholder="E-mail"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
              editable={false} // Email não pode ser editado
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button onPress={handleSubmit} disabled={loading}>
              <ButtonText>
                {loading ? "Salvando..." : "Salvar alterações"}
              </ButtonText>
            </Button>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EditProfileModal;

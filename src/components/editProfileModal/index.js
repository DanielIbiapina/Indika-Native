import React, { useState } from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    name: profile?.name || "",
    email: profile?.email || "",
    avatar: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const updatedProfile = { ...profile };

      // Atualiza avatar se houver uma nova imagem
      if (formData.avatar?.uri) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", {
          uri: formData.avatar.uri,
          type: formData.avatar.type || "image/jpeg",
          name: formData.avatar.fileName || "avatar.jpg",
        });

        const avatarResponse = await userService.updateAvatar(avatarFormData);
        updatedProfile.avatar = avatarResponse?.avatar || updatedProfile.avatar;
      }

      // Atualiza nome se foi modificado
      if (formData.name !== profile.name) {
        const profileResponse = await userService.updateProfile({
          name: formData.name,
          isServiceProvider: profile.isServiceProvider,
        });
        Object.assign(updatedProfile, profileResponse);
      }

      onUpdate(updatedProfile);
      onClose();
    } catch (err) {
      setError(err.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible transparent animationType="fade">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Ionicons
              name="close"
              size={24}
              color="#666"
              onPress={onClose}
              testID="close-modal-button"
            />
          </ModalHeader>

          <Form>
            <ImageUpload
              value={formData.avatar}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, avatar: value }))
              }
              maxSize={2}
              label="Foto de perfil"
              currentImage={profile.avatar}
              testID="avatar-upload"
            />

            <Input
              placeholder="Nome completo"
              value={formData.name}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, name: value }))
              }
              testID="name-input"
            />

            <Input
              placeholder="E-mail"
              value={formData.email}
              editable={false}
              testID="email-input"
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button
              onPress={handleSubmit}
              disabled={loading}
              testID="save-button"
            >
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

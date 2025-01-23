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
    setLoading(true);
    setError("");

    try {
      let updatedProfile = profile;

      if (formData.avatar?.file) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", formData.avatar.file);

        updatedProfile = await userService.updateAvatar(avatarFormData);
      }

      if (formData.name !== profile.name || formData.email !== profile.email) {
        updatedProfile = await userService.updateProfile({
          name: formData.name,
          email: formData.email,
        });
      }

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
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EditProfileModal;

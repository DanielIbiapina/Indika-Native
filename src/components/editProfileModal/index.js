import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { userService } from "../../services/userService";
import ImageUpload from "../imageUpload";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ScrollContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
  ButtonText,
  InfoText,
} from "./styles";

const EditProfileModal = ({ profile, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    avatar: profile?.avatar ? { uri: profile.avatar } : null, // ✅ INICIALIZAR COM AVATAR ATUAL
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Validações básicas
      if (!formData.name.trim()) {
        setError("Nome é obrigatório");
        return;
      }

      // ✅ NOVO: Email opcional, mas se preenchido deve ser válido
      if (formData.email.trim() && !formData.email.includes("@")) {
        setError("Se informado, o email deve ser válido");
        return;
      }

      const updatedProfile = { ...profile };

      // ✅ CORREÇÃO: Processar avatar mesmo quando é null (removido)
      if (formData.avatar === null) {
        // Se o usuário removeu a imagem, vamos limpar o avatar
        updatedProfile.avatar = null;
      } else if (formData.avatar?.uri) {
        // Usuário adicionou nova imagem
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", {
          uri: formData.avatar.uri,
          type: formData.avatar.type || "image/jpeg",
          name: formData.avatar.fileName || "avatar.jpg",
        });

        const avatarResponse = await userService.updateAvatar(avatarFormData);
        updatedProfile.avatar = avatarResponse?.avatar || updatedProfile.avatar;
      }

      // ✅ Atualiza nome E email se foram modificados
      const profileChanges = {};
      if (formData.name !== profile.name) {
        profileChanges.name = formData.name;
      }
      if (formData.email !== profile.email) {
        profileChanges.email = formData.email;
      }

      if (Object.keys(profileChanges).length > 0) {
        const profileResponse = await userService.updateProfile(profileChanges);
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
    <Modal visible transparent animationType="slide">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Editar Perfil</ModalTitle>
            <Ionicons
              name="close"
              size={24}
              color="#666"
              onPress={onClose}
              testID="close-modal-button"
            />
          </ModalHeader>

          <ScrollContainer
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Form>
              <ImageUpload
                value={formData.avatar}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, avatar: value }));
                }}
                maxSize={2}
                label="Foto de perfil"
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

              {/* ✅ NOVO: Email editável */}
              <Input
                placeholder="E-mail"
                value={formData.email}
                onChangeText={(value) =>
                  setFormData((prev) => ({ ...prev, email: value }))
                }
                keyboardType="email-address"
                autoCapitalize="none"
                testID="email-input"
              />

              <InfoText>
                💡 Email é opcional. Se informado, pode exigir verificação
                adicional
              </InfoText>

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
          </ScrollContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EditProfileModal;

import React, { useState } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/authContext";
import { userService } from "../../../services/userService";
import {
  Container,
  Form,
  Input,
  Label,
  SaveButton,
  SaveButtonText,
  LoadingSpinner,
  PasswordContainer,
  TogglePasswordButton,
} from "./styles";

const Seguranca = () => {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      if (formData.newPassword.length < 6) {
        Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres");
        return;
      }

      setLoading(true);
      await userService.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form>
        <Label>Senha atual</Label>
        <PasswordContainer>
          <Input
            value={formData.currentPassword}
            onChangeText={(value) => handleChange("currentPassword", value)}
            placeholder="Digite sua senha atual"
            secureTextEntry={!showCurrentPassword}
            autoCapitalize="none"
          />
          <TogglePasswordButton
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Ionicons
              name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TogglePasswordButton>
        </PasswordContainer>

        <Label>Nova senha</Label>
        <PasswordContainer>
          <Input
            value={formData.newPassword}
            onChangeText={(value) => handleChange("newPassword", value)}
            placeholder="Digite a nova senha"
            secureTextEntry={!showNewPassword}
            autoCapitalize="none"
          />
          <TogglePasswordButton
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons
              name={showNewPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TogglePasswordButton>
        </PasswordContainer>

        <Label>Confirmar nova senha</Label>
        <PasswordContainer>
          <Input
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            placeholder="Confirme a nova senha"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TogglePasswordButton
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TogglePasswordButton>
        </PasswordContainer>

        <SaveButton
          onPress={handleSubmit}
          disabled={
            loading ||
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
          }
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SaveButtonText>Alterar senha</SaveButtonText>
          )}
        </SaveButton>
      </Form>
    </Container>
  );
};

export default Seguranca;

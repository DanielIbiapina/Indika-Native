import React, { useState } from "react";
import { Alert } from "react-native";

import {
  Container,
  Form,
  Input,
  Label,
  SaveButton,
  SaveButtonText,
  LoadingSpinner,
} from "./styles";
import { useAuth } from "../../../contexts/authContext";
import { userService } from "../../../services/userService";

const DadosPessoais = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    cpf: user.cpf || "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateProfile(formData);
      updateUser(updatedUser);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao atualizar dados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form>
        <Label>Nome completo</Label>
        <Input
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Seu nome completo"
        />

        <Label>E-mail</Label>
        <Input
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Label>Telefone</Label>
        <Input
          value={formData.phone}
          onChangeText={(value) => handleChange("phone", value)}
          placeholder="Seu telefone"
          keyboardType="phone-pad"
        />

        <Label>CPF</Label>
        <Input
          value={formData.cpf}
          onChangeText={(value) => handleChange("cpf", value)}
          placeholder="Seu CPF"
          keyboardType="numeric"
        />

        <SaveButton onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SaveButtonText>Salvar alterações</SaveButtonText>
          )}
        </SaveButton>
      </Form>
    </Container>
  );
};

export default DadosPessoais;

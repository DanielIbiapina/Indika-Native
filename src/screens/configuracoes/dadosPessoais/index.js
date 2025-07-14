import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Form,
  Input,
  Label,
  SaveButton,
  SaveButtonText,
  LoadingSpinner,
  ErrorText,
  FieldContainer,
  HelperText,
} from "./styles";
import { useAuth } from "../../../contexts/authContext";
import { userService } from "../../../services/userService";
import {
  formatCPF,
  formatPhone,
  validateEmail,
} from "../../../utils/validators";

const DadosPessoais = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    cpf: user.cpf || "",
  });

  const handleChange = (name, value) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));

    let formattedValue = value;
    if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const validateCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, "");

    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    // EMAIL OPCIONAL - remover validação obrigatória
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    // TELEFONE OBRIGATÓRIO - adicionar validação
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (formData.phone.length < 14) {
      newErrors.phone = "Telefone inválido";
    }

    // Validar CPF apenas se foi preenchido
    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const updatedUser = await userService.updateProfile(formData);
      updateUser(updatedUser);

      Alert.alert("Sucesso", "Dados atualizados com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message ||
          "Não foi possível atualizar seus dados. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView>
        <Form>
          <FieldContainer>
            <Label>Nome completo *</Label>
            <Input
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Seu nome completo"
              error={errors.name}
              editable={!loading}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FieldContainer>

          <FieldContainer>
            <Label>E-mail</Label>
            <Input
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              editable={!loading}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FieldContainer>

          <FieldContainer>
            <Label>Telefone *</Label>
            <Input
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="(00) 00000-0000"
              keyboardType="numeric"
              maxLength={15}
              error={errors.phone}
              editable={!loading}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FieldContainer>

          <FieldContainer>
            <Label>CPF</Label>
            <Input
              value={formData.cpf}
              onChangeText={(value) => handleChange("cpf", value)}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              maxLength={14}
              error={errors.cpf}
              editable={!loading && !user.cpf}
              style={
                user.cpf ? { backgroundColor: "#f5f5f5", color: "#666" } : null
              }
            />
            {errors.cpf && <ErrorText>{errors.cpf}</ErrorText>}
            {user.cpf && (
              <HelperText>CPF já cadastrado e não pode ser alterado</HelperText>
            )}
          </FieldContainer>

          <SaveButton onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <SaveButtonText>Salvar alterações</SaveButtonText>
            )}
          </SaveButton>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default DadosPessoais;

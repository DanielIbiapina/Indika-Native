import React, { useState, useEffect } from "react";
import { ActivityIndicator, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Title,
  InputContainer,
  InputLabel,
  Input,
  Select,
  SelectText,
  ErrorText,
  SaveButton,
  ButtonText,
  InfoText,
} from "./styles";

const PIX_TYPES = {
  cpf: {
    label: "CPF",
    mask: "999.999.999-99",
    keyboardType: "numeric",
  },
  email: {
    label: "E-mail",
    keyboardType: "email-address",
  },
  phone: {
    label: "Telefone",
    mask: "(99) 99999-9999",
    keyboardType: "numeric",
  },
  random: {
    label: "Chave Aleatória",
    keyboardType: "default",
  },
};

const PixForm = ({ onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState({
    keyType: "cpf",
    key: "",
    holderName: "",
  });

  useEffect(() => {
    if (initialData?.details) {
      setFormData({
        keyType: initialData.details.keyType || "cpf",
        key: initialData.details.key || "",
        holderName: initialData.details.holderName || "",
      });
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.key) {
      newErrors.key = "Chave PIX é obrigatória";
    } else {
      // Validações específicas por tipo de chave
      switch (formData.keyType) {
        case "cpf":
          if (!/^\d{11}$/.test(formData.key.replace(/\D/g, ""))) {
            newErrors.key = "CPF inválido";
          }
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.key)) {
            newErrors.key = "E-mail inválido";
          }
          break;
        case "phone":
          if (!/^\d{11}$/.test(formData.key.replace(/\D/g, ""))) {
            newErrors.key = "Telefone inválido";
          }
          break;
      }
    }

    if (!formData.holderName) {
      newErrors.holderName = "Nome do titular é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  return (
    <Container>
      <Title>Dados PIX</Title>

      <InputContainer>
        <InputLabel>Tipo de Chave</InputLabel>
        <Select
          onPress={() => {
            // Aqui você pode implementar um modal/picker para seleção
            const types = Object.keys(PIX_TYPES);
            const currentIndex = types.indexOf(formData.keyType);
            const nextIndex = (currentIndex + 1) % types.length;
            handleChange("keyType", types[nextIndex]);
          }}
        >
          <SelectText>{PIX_TYPES[formData.keyType].label}</SelectText>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Select>
      </InputContainer>

      <InputContainer>
        <InputLabel>Chave PIX</InputLabel>
        <Input
          placeholder={`Digite sua chave ${PIX_TYPES[formData.keyType].label}`}
          value={formData.key}
          onChangeText={(text) => handleChange("key", text)}
          keyboardType={PIX_TYPES[formData.keyType].keyboardType}
        />
        {errors.key && <ErrorText>{errors.key}</ErrorText>}
      </InputContainer>

      <InputContainer>
        <InputLabel>Nome do Titular</InputLabel>
        <Input
          placeholder="Nome completo do titular"
          value={formData.holderName}
          onChangeText={(text) => handleChange("holderName", text)}
        />
        {errors.holderName && <ErrorText>{errors.holderName}</ErrorText>}
      </InputContainer>

      <SaveButton onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>Salvar</ButtonText>
        )}
      </SaveButton>

      <InfoText>A chave PIX será usada para receber seus pagamentos</InfoText>
    </Container>
  );
};

export default PixForm;

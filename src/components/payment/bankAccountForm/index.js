import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
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
} from "./styles";

const BANK_TYPES = {
  checking: "Conta Corrente",
  savings: "Conta Poupança",
};

const BankAccountForm = ({ onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState({
    bank: initialData?.details.bank || "",
    agency: initialData?.details.agency || "",
    account: initialData?.details.account || "",
    accountType: initialData?.details.accountType || "checking",
    holderName: initialData?.details.holderName || "",
    document: initialData?.details.document || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.bank) newErrors.bank = "Banco é obrigatório";
    if (!formData.agency) newErrors.agency = "Agência é obrigatória";
    if (!formData.account) newErrors.account = "Conta é obrigatória";
    if (!formData.holderName)
      newErrors.holderName = "Nome do titular é obrigatório";
    if (!formData.document) newErrors.document = "CPF/CNPJ é obrigatório";

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
      <Title>Dados Bancários</Title>

      <InputContainer>
        <InputLabel>Banco</InputLabel>
        <Input
          placeholder="Nome do banco"
          value={formData.bank}
          onChangeText={(text) => handleChange("bank", text)}
        />
        {errors.bank && <ErrorText>{errors.bank}</ErrorText>}
      </InputContainer>

      <InputContainer>
        <InputLabel>Agência</InputLabel>
        <Input
          placeholder="Número da agência"
          value={formData.agency}
          onChangeText={(text) => handleChange("agency", text)}
          keyboardType="numeric"
        />
        {errors.agency && <ErrorText>{errors.agency}</ErrorText>}
      </InputContainer>

      <InputContainer>
        <InputLabel>Conta</InputLabel>
        <Input
          placeholder="Número da conta"
          value={formData.account}
          onChangeText={(text) => handleChange("account", text)}
          keyboardType="numeric"
        />
        {errors.account && <ErrorText>{errors.account}</ErrorText>}
      </InputContainer>

      <InputContainer>
        <InputLabel>Tipo de Conta</InputLabel>
        <Select
          onPress={() => {
            // Aqui você pode implementar um modal/picker para seleção
            handleChange(
              "accountType",
              formData.accountType === "checking" ? "savings" : "checking"
            );
          }}
        >
          <SelectText>{BANK_TYPES[formData.accountType]}</SelectText>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Select>
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

      <InputContainer>
        <InputLabel>CPF/CNPJ do Titular</InputLabel>
        <Input
          placeholder="CPF ou CNPJ do titular"
          value={formData.document}
          onChangeText={(text) => handleChange("document", text)}
          keyboardType="numeric"
        />
        {errors.document && <ErrorText>{errors.document}</ErrorText>}
      </InputContainer>

      <SaveButton onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>Salvar</ButtonText>
        )}
      </SaveButton>
    </Container>
  );
};

export default BankAccountForm;

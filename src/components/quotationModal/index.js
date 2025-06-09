import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ModalContainer,
  ModalContent,
  Title,
  InputContainer,
  Label,
  Input,
  PeriodSelector,
  PeriodOption,
  PeriodText,
  DateButton,
  DateText,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
  ButtonText,
} from "./styles";

const QuotationModal = ({ isVisible, onClose, onConfirm, initialData }) => {
  const [quotationData, setQuotationData] = useState({
    price: initialData?.price || "",
    scheduledDate: initialData?.scheduledDate
      ? new Date(initialData.scheduledDate)
      : new Date(),
    period: initialData?.period || "morning",
    specificTime: initialData?.specificTime || false,
    description: initialData?.description || "",
  });

  // Resetar o estado quando o modal abrir com novos dados
  useEffect(() => {
    if (isVisible && initialData) {
      setQuotationData({
        price: initialData.price || "",
        scheduledDate: initialData.scheduledDate
          ? new Date(initialData.scheduledDate)
          : new Date(),
        period: initialData.period || "morning",
        specificTime: initialData.specificTime || false,
        description: initialData.description || "",
      });
    }
  }, [isVisible, initialData]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = () => {
    try {
      // Validar se o pedido está em estado que permite cotação
      if (
        initialData?.status &&
        !["WAITING_QUOTE", "QUOTE_REJECTED"].includes(initialData.status)
      ) {
        Alert.alert("Erro", "Não é possível enviar orçamento neste momento");
        return;
      }

      // Validar preço
      if (!quotationData.price || parseFloat(quotationData.price) <= 0) {
        Alert.alert("Erro", "Por favor, insira um preço válido");
        return;
      }

      // Validar data
      if (
        !quotationData.scheduledDate ||
        isNaN(quotationData.scheduledDate.getTime())
      ) {
        Alert.alert("Erro", "Por favor, selecione uma data válida");
        return;
      }

      // Validar período
      if (!quotationData.period) {
        Alert.alert("Erro", "Por favor, selecione um período");
        return;
      }

      // Formatar dados antes de enviar
      const formattedData = {
        price: parseFloat(quotationData.price),
        scheduledDate: quotationData.scheduledDate.toISOString(),
        period: quotationData.period,
        specificTime: quotationData.specificTime || false,
        description: quotationData.description || "",
      };

      onConfirm(formattedData);
    } catch (error) {
      console.error("Erro ao processar dados do orçamento:", error);
      Alert.alert("Erro", "Não foi possível processar os dados do orçamento");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      setQuotationData((prev) => ({
        ...prev,
        scheduledDate: selectedDate,
      }));
    }
  };

  const formatDate = (date) => {
    try {
      if (!date || isNaN(date.getTime())) {
        return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      }
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <Title>Gerar Orçamento</Title>

          <InputContainer>
            <Label>Preço (R$)</Label>
            <Input
              keyboardType="decimal-pad"
              value={quotationData.price}
              onChangeText={(value) =>
                setQuotationData((prev) => ({
                  ...prev,
                  price: value.replace(",", "."),
                }))
              }
              placeholder="0,00"
            />
          </InputContainer>

          <InputContainer>
            <Label>Data</Label>
            <DateButton onPress={() => setShowDatePicker(true)}>
              <DateText>{formatDate(quotationData.scheduledDate)}</DateText>
            </DateButton>
          </InputContainer>

          <InputContainer>
            <Label>Período</Label>
            <PeriodSelector>
              <PeriodOption
                selected={quotationData.period === "morning"}
                onPress={() =>
                  setQuotationData((prev) => ({
                    ...prev,
                    period: "morning",
                  }))
                }
              >
                <PeriodText selected={quotationData.period === "morning"}>
                  Manhã
                </PeriodText>
              </PeriodOption>
              <PeriodOption
                selected={quotationData.period === "afternoon"}
                onPress={() =>
                  setQuotationData((prev) => ({
                    ...prev,
                    period: "afternoon",
                  }))
                }
              >
                <PeriodText selected={quotationData.period === "afternoon"}>
                  Tarde
                </PeriodText>
              </PeriodOption>
              <PeriodOption
                selected={quotationData.period === "night"}
                onPress={() =>
                  setQuotationData((prev) => ({
                    ...prev,
                    period: "night",
                  }))
                }
              >
                <PeriodText selected={quotationData.period === "night"}>
                  Noite
                </PeriodText>
              </PeriodOption>
            </PeriodSelector>
          </InputContainer>

          <InputContainer>
            <Label>Observações (opcional)</Label>
            <Input
              multiline
              numberOfLines={4}
              value={quotationData.description}
              onChangeText={(value) =>
                setQuotationData((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
              textAlignVertical="top"
            />
          </InputContainer>

          <ButtonsContainer>
            <ConfirmButton onPress={handleConfirm}>
              <ButtonText>Enviar Orçamento</ButtonText>
            </ConfirmButton>
            <CancelButton onPress={onClose}>
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
          </ButtonsContainer>
        </ModalContent>

        {showDatePicker && (
          <DateTimePicker
            value={quotationData.scheduledDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </ModalContainer>
    </Modal>
  );
};

export default QuotationModal;

import React, { useState, useEffect } from "react";
import { Modal, Alert, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ModalOverlay,
  ModalContent,
  Header,
  Title,
  CloseButton,
  Form,
  Field,
  Label,
  PriceContainer,
  CurrencySymbol,
  PriceInput,
  DateButton,
  DateText,
  TimeToggle,
  ToggleText,
  PeriodButtons,
  PeriodButton,
  PeriodButtonText,
  TextArea,
  Actions,
  SendButton,
  CancelButton,
  ButtonText,
} from "./styles";

const QuotationModal = ({ isVisible, onClose, onConfirm, initialData }) => {
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [useSpecificTime, setUseSpecificTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [period, setPeriod] = useState("morning");
  const [notes, setNotes] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isVisible && initialData) {
      setDate(
        initialData.scheduledDate
          ? new Date(initialData.scheduledDate)
          : new Date()
      );
      setUseSpecificTime(initialData.specificTime || false);
      setPeriod(initialData.period || "morning");
      if (initialData.scheduledTime) {
        setTime(new Date(initialData.scheduledTime));
      }
    }
  }, [isVisible, initialData]);

  const handleSend = () => {
    if (!price || parseFloat(price) <= 0) {
      Alert.alert("Erro", "Informe um preço válido");
      return;
    }

    const data = {
      price: parseFloat(price),
      scheduledDate: date.toISOString(),
      specificTime: useSpecificTime,
      scheduledTime: useSpecificTime ? time.toISOString() : null,
      period: useSpecificTime ? null : period,
      description: notes,
    };

    onConfirm(data);
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ModalOverlay>
        <ModalContent>
          <Header>
            <Title>Enviar Orçamento</Title>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={20} color="#666" />
            </CloseButton>
          </Header>

          <Form>
            {/* Preço */}
            <Field>
              <Label>Preço do serviço</Label>
              <PriceContainer>
                <CurrencySymbol>R$</CurrencySymbol>
                <PriceInput
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                  placeholder="0,00"
                />
              </PriceContainer>
            </Field>

            {/* Data */}
            <Field>
              <Label>Data</Label>
              <DateButton onPress={() => setShowDatePicker(true)}>
                <DateText>
                  {format(date, "dd/MM/yyyy", { locale: ptBR })}
                </DateText>
                <Ionicons name="calendar-outline" size={16} color="#666" />
              </DateButton>
            </Field>

            {/* Horário */}
            <Field>
              <TimeToggle>
                <Switch
                  value={useSpecificTime}
                  onValueChange={setUseSpecificTime}
                  trackColor={{ false: "#ccc", true: "#422680" }}
                  thumbColor="#fff"
                />
                <ToggleText>Horário específico</ToggleText>
              </TimeToggle>

              {useSpecificTime ? (
                <DateButton onPress={() => setShowTimePicker(true)}>
                  <DateText>{format(time, "HH:mm")}</DateText>
                  <Ionicons name="time-outline" size={16} color="#666" />
                </DateButton>
              ) : (
                <PeriodButtons>
                  {[
                    { key: "morning", label: "Manhã" },
                    { key: "afternoon", label: "Tarde" },
                    { key: "night", label: "Noite" },
                  ].map(({ key, label }) => (
                    <PeriodButton
                      key={key}
                      active={period === key}
                      onPress={() => setPeriod(key)}
                    >
                      <PeriodButtonText active={period === key}>
                        {label}
                      </PeriodButtonText>
                    </PeriodButton>
                  ))}
                </PeriodButtons>
              )}
            </Field>

            {/* Observações */}
            <Field>
              <Label>Observações (opcional)</Label>
              <TextArea
                value={notes}
                onChangeText={setNotes}
                placeholder="Detalhes do serviço..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </Field>
          </Form>

          <Actions>
            <CancelButton onPress={onClose}>
              <ButtonText secondary>Cancelar</ButtonText>
            </CancelButton>
            <SendButton onPress={handleSend}>
              <ButtonText>Enviar</ButtonText>
            </SendButton>
          </Actions>

          {/* Pickers */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default QuotationModal;

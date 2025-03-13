import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  EmptyIcon,
  EmptyText,
  BackButton,
  ButtonText,
} from "./styles";

const EmptyView = ({ message, onBack }) => (
  <Container testID="empty-view">
    <EmptyIcon>
      <Ionicons name="document-text-outline" size={64} color="#ccc" />
    </EmptyIcon>
    <EmptyText>{message || "Nenhum item encontrado"}</EmptyText>
    <BackButton onPress={onBack} testID="back-button">
      <Ionicons name="arrow-back" size={20} color="#fff" />
      <ButtonText>Voltar</ButtonText>
    </BackButton>
  </Container>
);

export default EmptyView;

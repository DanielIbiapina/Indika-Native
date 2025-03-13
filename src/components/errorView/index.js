import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ErrorIcon,
  ErrorText,
  RetryButton,
  ButtonText,
} from "./styles";

const ErrorView = ({ message, onRetry }) => (
  <Container testID="error-view">
    <ErrorIcon>
      <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
    </ErrorIcon>
    <ErrorText>{message || "Ocorreu um erro inesperado"}</ErrorText>
    <RetryButton onPress={onRetry} testID="retry-button">
      <Ionicons name="refresh" size={20} color="#fff" />
      <ButtonText>Tentar Novamente</ButtonText>
    </RetryButton>
  </Container>
);

export default ErrorView;

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container, StatusIcon, StatusText, StatusDescription } from "./styles";

const PaymentStatus = ({ status, amount }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "COMPLETED":
        return {
          icon: "checkmark-circle",
          color: "#4CAF50",
          text: "Pagamento Concluído",
          description: "O pagamento foi processado com sucesso",
        };
      case "PENDING":
        return {
          icon: "time",
          color: "#FFA000",
          text: "Pagamento Pendente",
          description: "Aguardando confirmação do pagamento",
        };
      case "FAILED":
        return {
          icon: "close-circle",
          color: "#F44336",
          text: "Pagamento Falhou",
          description: "Não foi possível processar o pagamento",
        };
      default:
        return {
          icon: "help-circle",
          color: "#9E9E9E",
          text: "Status Desconhecido",
          description: "Não foi possível determinar o status do pagamento",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Container status={status}>
      <StatusIcon>
        <Ionicons name={config.icon} size={48} color={config.color} />
      </StatusIcon>
      <StatusText color={config.color}>{config.text}</StatusText>
      <StatusDescription>{config.description}</StatusDescription>
      {amount && (
        <StatusDescription>
          Valor:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </StatusDescription>
      )}
    </Container>
  );
};

export default PaymentStatus;

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container, StatusIcon, StatusText } from "./styles";

const STATUS_CONFIG = {
  completed: {
    label: "Concluído",
    icon: "checkmark-circle",
    color: "success",
  },
  COMPLETED: {
    label: "Concluído",
    icon: "checkmark-circle",
    color: "success",
  },
  pending: {
    label: "Pendente",
    icon: "time",
    color: "warning",
  },
  PENDING: {
    label: "Pendente",
    icon: "time",
    color: "warning",
  },
  processing: {
    label: "Processando",
    icon: "refresh",
    color: "info",
  },
  failed: {
    label: "Falhou",
    icon: "close-circle",
    color: "error",
  },
  refunded: {
    label: "Reembolsado",
    icon: "return-up-back",
    color: "secondary",
  },
  cancelled: {
    label: "Cancelado",
    icon: "close",
    color: "disabled",
  },
  AWAITING_CONFIRMATION: {
    label: "Aguardando Confirmação",
    icon: "hourglass",
    color: "warning",
  },
  REJECTED: {
    label: "Rejeitado",
    icon: "close-circle",
    color: "error",
  },
};

const PaymentStatusBadge = ({ status, customLabel }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <Container status={status}>
      <StatusIcon>
        <Ionicons
          name={config.icon}
          size={12}
          color={`var(--${config.color})`}
        />
      </StatusIcon>
      <StatusText status={status}>{customLabel || config.label}</StatusText>
    </Container>
  );
};

export default PaymentStatusBadge;

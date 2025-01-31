import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  MethodOption,
  MethodIcon,
  MethodInfo,
  MethodTitle,
  MethodDescription,
  SelectedIndicator,
  SelectedDot,
  CompactContainer,
  CompactMethodIcon,
  CompactMethodInfo,
  CompactMethodTitle,
  CompactMethodDescription,
} from "./styles";
import { PAYMENT_METHODS } from "../../../constants/paymentMethods";

const PaymentMethodIcon = ({ type }) => {
  const method = PAYMENT_METHODS[type];
  return (
    <CompactMethodIcon>
      <Ionicons
        name={method?.icon || "help-outline"}
        size={24}
        color="#422680"
      />
    </CompactMethodIcon>
  );
};

const getMethodDetails = (method) => {
  if (!method) return "";

  switch (method.type) {
    case "pix":
      // Verifica se key existe antes de usar slice
      return method.details.key
        ? `Chave: ${method.details.key.slice(
            0,
            3
          )}******${method.details.key.slice(-10)}`
        : "Chave PIX configurada";

    case "bank_account":
      // Verifica se todas as propriedades existem
      if (
        !method.details.bank_name ||
        !method.details.agency ||
        !method.details.account
      ) {
        return "Conta bancária configurada";
      }
      return `${method.details.bank_name} - Ag: ${
        method.details.agency
      } Conta: ****${method.details.account.slice(-4)}`;

    case "stripe":
      if (method.email) {
        return method.email;
      }
      return method.account_id
        ? `Conta: ****${method.account_id.slice(-4)}`
        : "Conta Stripe configurada";

    default:
      return "Método configurado";
  }
};

const PaymentMethodSelector = ({
  selectedMethod,
  onSelect,
  showDisabled = true,
  compact = false,
  paymentMethodData = null,
}) => {
  const methods = Object.values(PAYMENT_METHODS).filter(
    (method) => showDisabled || method.enabled
  );

  const getMethodTitle = (type) =>
    PAYMENT_METHODS[type]?.title || "Método Desconhecido";

  if (compact && paymentMethodData) {
    return (
      <CompactContainer>
        <PaymentMethodIcon type={paymentMethodData.type} />
        <CompactMethodInfo>
          <CompactMethodTitle>
            {PAYMENT_METHODS[paymentMethodData.type]?.title ||
              "Método de Pagamento"}
          </CompactMethodTitle>
          <CompactMethodDescription>
            {getMethodDetails(paymentMethodData)}
          </CompactMethodDescription>
        </CompactMethodInfo>
      </CompactContainer>
    );
  }

  return (
    <Container>
      {methods.map((method, index) => (
        <MethodOption
          key={method.id}
          onPress={() => method.enabled && onSelect(method.id)}
          disabled={!method.enabled}
          selected={selectedMethod === method.id}
          isLast={index === methods.length - 1}
        >
          <MethodIcon>
            <Ionicons name={method.icon} size={24} color="#422680" />
          </MethodIcon>
          <MethodInfo>
            <MethodTitle>{method.title}</MethodTitle>
            <MethodDescription>{method.description}</MethodDescription>
          </MethodInfo>
          {selectedMethod === method.id && (
            <SelectedIndicator>
              <SelectedDot />
            </SelectedIndicator>
          )}
        </MethodOption>
      ))}
    </Container>
  );
};

export default PaymentMethodSelector;

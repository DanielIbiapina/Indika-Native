import React, { useState } from "react";
import { Alert } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { stripeService } from "../../../services/stripeService";
import {
  Container,
  Title,
  CardContainer,
  Button,
  ButtonText,
  AmountInput,
  ErrorText,
} from "./styles";

const formatCurrency = (value) => {
  // Remove tudo que não é número
  const numbers = value.replace(/[^\d]/g, "");

  // Converte para decimal (divide por 100 para ter os centavos)
  const decimal = (parseFloat(numbers) / 100).toFixed(2);

  // Retorna se for um número válido, senão retorna vazio
  return isNaN(decimal) ? "" : decimal;
};

const TestePagamento = () => {
  const { createPaymentMethod, handleCardAction } = useStripe();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // Para mostrar o status do processo

  const handleAmountChange = (text) => {
    // Formata o valor enquanto digita
    const formatted = formatCurrency(text);
    setAmount(formatted);
  };

  const handlePayment = async () => {
    try {
      if (!amount || parseFloat(amount) <= 0) {
        throw new Error("Por favor, insira um valor válido");
      }

      setLoading(true);
      setError(null);
      setStatus("Criando método de pagamento...");

      // 1. Criar PaymentMethod com os dados do cartão
      const { paymentMethod, error: paymentMethodError } =
        await createPaymentMethod({
          paymentMethodType: "Card",
          type: "Card",
          billingDetails: {
            email: "teste@email.com",
          },
        });

      if (paymentMethodError) {
        throw new Error(`Erro no cartão: ${paymentMethodError.message}`);
      }

      setStatus("Processando pagamento...");

      // 2. Enviar para seu backend
      const response = await stripeService.createPayment({
        amount: Math.round(parseFloat(amount)), // Stripe usa centavos
        paymentMethodId: paymentMethod.id,
      });

      // 3. Se precisar de autenticação adicional
      if (response.requiresAction) {
        setStatus("Requerindo autenticação adicional...");
        const { error: actionError } = await handleCardAction(
          response.clientSecret
        );
        if (actionError) {
          throw new Error(`Erro na autenticação: ${actionError.message}`);
        }
      }

      setStatus("Finalizando...");
      Alert.alert("Sucesso", "Pagamento realizado com sucesso!");
      setAmount("");
      setStatus("");
    } catch (error) {
      console.error("Erro no pagamento:", error);
      setError(error.message || "Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Teste de Pagamento</Title>

      <AmountInput
        placeholder="Valor (R$)"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleAmountChange}
      />

      <CardContainer>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 10,
          }}
        />
      </CardContainer>

      <Button onPress={handlePayment} disabled={loading}>
        <ButtonText>
          {loading ? status || "Processando..." : "Pagar"}
        </ButtonText>
      </Button>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default TestePagamento;

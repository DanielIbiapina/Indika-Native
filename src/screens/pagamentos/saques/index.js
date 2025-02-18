import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { paymentService } from "../../../services/paymentService";
import { stripeService } from "../../../services/stripeService";
import {
  Container,
  Header,
  Title,
  BalanceCard,
  BalanceLabel,
  BalanceAmount,
  WithdrawSection,
  SectionTitle,
  InputContainer,
  InputLabel,
  Input,
  WithdrawButton,
  ButtonText,
  ErrorText,
  LoaderContainer,
  PaymentMethodSection,
  PaymentMethodCard,
  PaymentMethodInfo,
  PaymentMethodTitle,
  PaymentMethodDetails,
  NoPaymentMethodContainer,
  NoPaymentMethodIcon,
  NoPaymentMethodText,
  ScrollContent,
} from "./styles";
import PaymentMethodSelector from "../../../components/payment/paymentMethodSelector";

const Saques = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const loadPaymentMethod = async () => {
    try {
      const response = await paymentService.getPaymentMethod();

      setPaymentMethod(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        setPaymentMethod(null);
      } else {
        console.error("Erro ao carregar método de pagamento:", error);
        setError("Erro ao carregar método de pagamento");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadBalance = async () => {
    try {
      if (!paymentMethod) {
        setBalance(0);
        return;
      }

      if (paymentMethod?.type === "stripe") {
        const response = await stripeService.getStripeBalance();
        setBalance(response.available);
      } else {
        const response = await paymentService.getBalance();
        setBalance(response.data.available);
      }
    } catch (error) {
      setError("Erro ao carregar saldo");
    }
  };

  useEffect(() => {
    loadPaymentMethod();
    loadBalance();
  }, []);

  const handleWithdraw = async () => {
    if (!paymentMethod) {
      Alert.alert(
        "Método de pagamento necessário",
        "Configure um método de pagamento antes de realizar saques",
        [
          {
            text: "Configurar",
            onPress: () => navigation.navigate("ConfigurarPagamento"),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Valor inválido");
      return;
    }

    if (amount > balance) {
      setError("Saldo insuficiente");
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      if (paymentMethod?.type === "stripe") {
        await stripeService.createPayout(amount);
      } else {
        await paymentService.requestWithdraw(amount);
      }

      Alert.alert("Sucesso", "Solicitação de saque realizada com sucesso");
      setWithdrawAmount("");
      loadBalance();
    } catch (error) {
      setError("Erro ao processar saque");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Saques</Title>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {!paymentMethod ? (
          <NoPaymentMethodContainer>
            <NoPaymentMethodIcon>
              <Ionicons name="card-outline" size={48} color="#422680" />
            </NoPaymentMethodIcon>
            <NoPaymentMethodText>
              Configure um método de recebimento para visualizar seu saldo e
              realizar saques
            </NoPaymentMethodText>
            <WithdrawButton
              onPress={() => navigation.navigate("ConfigurarPagamento")}
            >
              <ButtonText>Configurar Método de Recebimento</ButtonText>
            </WithdrawButton>
          </NoPaymentMethodContainer>
        ) : (
          <ScrollContent>
            <BalanceCard>
              <BalanceLabel>Saldo disponível</BalanceLabel>
              <BalanceAmount>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(balance)}
              </BalanceAmount>
            </BalanceCard>

            <WithdrawSection>
              <SectionTitle>Realizar Saque</SectionTitle>

              <PaymentMethodCard>
                <PaymentMethodSelector
                  selectedMethod={paymentMethod.type}
                  paymentMethodData={paymentMethod}
                  onSelect={() => navigation.navigate("ConfigurarPagamento")}
                  showDisabled={false}
                  compact={true}
                />
              </PaymentMethodCard>

              <InputContainer>
                <InputLabel>Valor do saque</InputLabel>
                <Input
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                />
              </InputContainer>

              {error && <ErrorText>{error}</ErrorText>}

              <WithdrawButton
                onPress={handleWithdraw}
                disabled={processing || !withdrawAmount}
              >
                {processing ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ButtonText>Solicitar Saque</ButtonText>
                )}
              </WithdrawButton>
            </WithdrawSection>
          </ScrollContent>
        )}
      </ScrollView>
    </Container>
  );
};

export default Saques;

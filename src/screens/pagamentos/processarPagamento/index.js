import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { paymentService } from "../../../services/paymentService";
import {
  COMPANY_PAYMENT_INFO,
  PAYMENT_METHODS,
  PIX_INSTRUCTIONS,
  BANK_TRANSFER_INSTRUCTIONS,
} from "../../../constants/payment";
import {
  ScrollContainer,
  Container,
  Header,
  Title,
  Amount,
  CardContainer,
  Button,
  ButtonText,
  ErrorText,
  LoaderContainer,
  AmountLabel,
  ServiceInfo,
  ServiceTitle,
  ProviderInfo,
  InfoLabel,
  InfoText,
  InstructionsContainer,
  InstructionText,
  PixContainer,
  PixKey,
  CopyButton,
  ConfirmButton,
  PaymentMethodSelector,
  MethodOption,
  MethodIcon,
  MethodInfo,
  MethodTitle,
  MethodDescription,
  BankInfo,
  BankInfoRow,
  BankInfoLabel,
  BankInfoValue,
} from "./styles";
import * as Clipboard from "expo-clipboard";

const ProcessarPagamento = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { createPaymentMethod } = useStripe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("pix");

  const { orderId, amount, providerId, serviceTitle } = route.params;

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Criar PaymentMethod com os dados do cartão
      const { paymentMethod, error: paymentMethodError } =
        await createPaymentMethod({
          paymentMethodType: "Card",
        });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // 2. Processar pagamento no backend
      await paymentService.processPayment({
        orderId,
        amount,
        providerId,
        paymentMethodId: paymentMethod.id,
      });

      Alert.alert("Sucesso", "Pagamento realizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Erro no pagamento:", error);
      setError(error.message || "Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      await paymentService.processPayment(orderId);
      Alert.alert(
        "Pagamento Enviado",
        "Seu pagamento será confirmado em até 24h úteis",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao confirmar pagamento"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = async () => {
    await Clipboard.setStringAsync(COMPANY_PAYMENT_INFO.pix.key);
    Alert.alert("Copiado!", "Chave PIX copiada com sucesso");
  };

  const renderPaymentMethods = () => (
    <PaymentMethodSelector>
      {Object.values(PAYMENT_METHODS).map((method) => (
        <MethodOption
          key={method.id}
          onPress={() => setSelectedMethod(method.id)}
          selected={selectedMethod === method.id}
        >
          <MethodIcon>
            <Ionicons name={method.icon} size={24} color="#422680" />
          </MethodIcon>
          <MethodInfo>
            <MethodTitle>{method.title}</MethodTitle>
            <MethodDescription>{method.description}</MethodDescription>
          </MethodInfo>
        </MethodOption>
      ))}
    </PaymentMethodSelector>
  );

  const renderPaymentInstructions = () => {
    const instructions =
      selectedMethod === "pix" ? PIX_INSTRUCTIONS : BANK_TRANSFER_INSTRUCTIONS;

    return (
      <InstructionsContainer>
        {instructions.map((instruction, index) => (
          <InstructionText key={index}>{instruction}</InstructionText>
        ))}
      </InstructionsContainer>
    );
  };

  const renderPaymentDetails = () => {
    if (selectedMethod === "pix") {
      return (
        <PixContainer>
          <PixKey>{COMPANY_PAYMENT_INFO.pix.key}</PixKey>
          <CopyButton onPress={handleCopyPix}>
            <ButtonText>Copiar Chave PIX</ButtonText>
          </CopyButton>
        </PixContainer>
      );
    }

    return (
      <BankInfo>
        <BankInfoRow>
          <BankInfoLabel>Banco:</BankInfoLabel>
          <BankInfoValue>{COMPANY_PAYMENT_INFO.bankAccount.bank}</BankInfoValue>
        </BankInfoRow>
        <BankInfoRow>
          <BankInfoLabel>Agência:</BankInfoLabel>
          <BankInfoValue>
            {COMPANY_PAYMENT_INFO.bankAccount.agency}
          </BankInfoValue>
        </BankInfoRow>
        <BankInfoRow>
          <BankInfoLabel>Conta:</BankInfoLabel>
          <BankInfoValue>
            {COMPANY_PAYMENT_INFO.bankAccount.account}
          </BankInfoValue>
        </BankInfoRow>
        <BankInfoRow>
          <BankInfoLabel>Tipo:</BankInfoLabel>
          <BankInfoValue>{COMPANY_PAYMENT_INFO.bankAccount.type}</BankInfoValue>
        </BankInfoRow>
        <BankInfoRow>
          <BankInfoLabel>CNPJ:</BankInfoLabel>
          <BankInfoValue>{COMPANY_PAYMENT_INFO.document}</BankInfoValue>
        </BankInfoRow>
      </BankInfo>
    );
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  }

  return (
    <>
      <Header>
        <Title>Realizar Pagamento</Title>
      </Header>
      <ScrollContainer>
        <Container>
          <ServiceInfo>
            <ServiceTitle>{serviceTitle}</ServiceTitle>
            <AmountLabel>Valor a pagar:</AmountLabel>
            <Amount>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount)}
            </Amount>
          </ServiceInfo>

          {renderPaymentMethods()}
          {renderPaymentInstructions()}
          {renderPaymentDetails()}

          <ConfirmButton onPress={handleConfirmPayment} disabled={loading}>
            <ButtonText>
              {loading ? "Processando..." : "Confirmar Pagamento"}
            </ButtonText>
          </ConfirmButton>

          {error && <ErrorText>{error}</ErrorText>}
        </Container>
      </ScrollContainer>
    </>
  );
};

export default ProcessarPagamento;

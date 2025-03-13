import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { paymentService } from "../../../services/paymentService";
import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  Title,
  ServiceCard,
  ServiceTitle,
  PriceContainer,
  PriceLabel,
  Price,
  WebViewContainer,
  LoaderContainer,
  ErrorContainer,
  ErrorText,
  RetryButton,
  RetryButtonText,
} from "./styles";
import PaymentStatus from "../../../components/paymentStatus";

const ProcessarPagamento = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const { orderId, amount, serviceTitle, providerId } = route.params;

  useEffect(() => {
    if (!orderId || !amount || !serviceTitle || !providerId) {
      setError("Dados incompletos para realizar o pagamento");
      setLoading(false);
      return;
    }
    createPreference();
  }, []);

  const createPreference = async () => {
    try {
      setLoading(true);
      setError(null);

      const paymentData = {
        orderId,
        amount: Number(amount),
        description: serviceTitle,
        providerId,
      };

      console.log("Enviando dados para criação de preferência:", paymentData);

      const response = await paymentService.createMercadoPagoPreference(
        paymentData
      );

      if (!response?.data?.init_point) {
        throw new Error("URL do checkout não encontrada na resposta");
      }

      setCheckoutUrl(response.data.init_point);
    } catch (error) {
      console.error("Erro detalhado ao criar preferência:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Não foi possível iniciar o pagamento: ${errorMessage}`);

      Alert.alert(
        "Erro no Pagamento",
        "Não foi possível iniciar o pagamento. Deseja tentar novamente?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
          { text: "Tentar Novamente", onPress: createPreference },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatus = async (status) => {
    setPaymentStatus(status);

    if (status.paymentStatus === PAYMENT_STATUS.COMPLETED) {
      Alert.alert(
        "Pagamento Concluído",
        "O pagamento foi processado com sucesso!",
        [{ text: "OK", onPress: () => navigation.navigate("Pedidos") }]
      );
    } else if (status.paymentStatus === PAYMENT_STATUS.FAILED) {
      Alert.alert(
        "Falha no Pagamento",
        "Não foi possível processar o pagamento",
        [
          { text: "Tentar Novamente", onPress: createPreference },
          { text: "Voltar", onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes("/payment/")) {
      // Iniciar monitoramento do status
      paymentService.monitorPaymentStatus(orderId, handlePaymentStatus);
    }
  };

  const LoadingIndicator = () => (
    <LoaderContainer>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoaderContainer>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Realizar Pagamento</Title>
        </Header>
        <ErrorContainer>
          <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
          <ErrorText>{error}</ErrorText>
          <RetryButton onPress={createPreference}>
            <RetryButtonText>Tentar Novamente</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  if (!orderId || !amount || !serviceTitle || !providerId) {
    return (
      <Container>
        <Header>
          <Title>Realizar Pagamento</Title>
        </Header>
        <ErrorContainer>
          <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
          <ErrorText>Dados incompletos para realizar o pagamento</ErrorText>
          <RetryButton onPress={() => navigation.goBack()}>
            <RetryButtonText>Voltar</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Realizar Pagamento</Title>
      </Header>

      <ServiceCard>
        <ServiceTitle>{serviceTitle}</ServiceTitle>
        <PriceContainer>
          <PriceLabel>Valor a pagar</PriceLabel>
          <Price>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </Price>
        </PriceContainer>
      </ServiceCard>

      {paymentStatus && (
        <PaymentStatus status={paymentStatus.paymentStatus} amount={amount} />
      )}

      {checkoutUrl && !paymentStatus && (
        <WebViewContainer>
          <WebView
            source={{
              uri: checkoutUrl,
              headers: {
                Accept: "*/*",
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
              },
            }}
            onNavigationStateChange={handleNavigationStateChange}
            renderLoading={LoadingIndicator}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
            cacheEnabled={false}
            style={{ flex: 1 }}
            injectedJavaScript={`
              const meta = document.createElement('meta');
              meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
              meta.setAttribute('name', 'viewport');
              document.getElementsByTagName('head')[0].appendChild(meta);
              true;
            `}
          />
        </WebViewContainer>
      )}
    </Container>
  );
};

export default ProcessarPagamento;

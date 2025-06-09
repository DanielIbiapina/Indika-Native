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
  RecurrenceInfo,
  RecurrenceText,
} from "./styles"; // Você pode estender os estilos existentes
import PaymentStatus from "../../../components/paymentStatus";

const ProcessarPagamentoAssinatura = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const { plan } = route.params;

  useEffect(() => {
    if (!plan || !plan.type || !plan.price) {
      setError("Dados incompletos para realizar a assinatura");
      setLoading(false);
      return;
    }
    createSubscriptionPreference();
  }, []);

  const createSubscriptionPreference = async () => {
    try {
      setLoading(true);
      setError(null);

      const subscriptionData = {
        planType: plan.type,
        price: plan.price,
        description: `Assinatura ${plan.title}`,
      };

      console.log(
        "Enviando dados para criação de assinatura:",
        subscriptionData
      );

      // Nova função no paymentService para assinaturas
      const response = await paymentService.createSubscriptionPreference(
        subscriptionData
      );

      if (!response?.data?.init_point) {
        throw new Error("URL do checkout não encontrada na resposta");
      }

      setCheckoutUrl(response.data.init_point);
    } catch (error) {
      console.error("Erro ao criar preferência de assinatura:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Não foi possível iniciar a assinatura: ${errorMessage}`);

      Alert.alert(
        "Erro na Assinatura",
        "Não foi possível iniciar o processo de assinatura. Deseja tentar novamente?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
          { text: "Tentar Novamente", onPress: createSubscriptionPreference },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionStatus = async (status) => {
    setPaymentStatus(status);

    if (status.status === "approved" || status.status === "active") {
      Alert.alert(
        "Assinatura Ativada",
        "Sua assinatura foi ativada com sucesso!",
        [{ text: "OK", onPress: () => navigation.navigate("Assinaturas") }]
      );
    } else if (status.status === "rejected" || status.status === "cancelled") {
      Alert.alert(
        "Falha na Assinatura",
        "Não foi possível processar sua assinatura",
        [
          { text: "Tentar Novamente", onPress: createSubscriptionPreference },
          { text: "Voltar", onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  const handleNavigationStateChange = (navState) => {
    // Verificar URLs de redirecionamento que indicam sucesso/falha
    if (navState.url.includes("/subscription/success")) {
      // Iniciar monitoramento do status da assinatura
      paymentService.monitorSubscriptionStatus(
        plan.id,
        handleSubscriptionStatus
      );
    }
  };

  const LoadingIndicator = () => (
    <LoaderContainer>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoaderContainer>
  );

  // Resto da implementação similar à tela ProcessarPagamento...

  return (
    <Container>
      <ServiceCard>
        <ServiceTitle>Assinatura {plan.title}</ServiceTitle>
        <PriceContainer>
          <PriceLabel>Valor da assinatura</PriceLabel>
          <Price>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(plan.price)}
          </Price>
          <RecurrenceInfo>
            <RecurrenceText>
              {plan.type === "MONTHLY"
                ? "Cobrado mensalmente"
                : plan.type === "QUARTERLY"
                ? "Cobrado a cada 3 meses"
                : "Cobrado anualmente"}
            </RecurrenceText>
          </RecurrenceInfo>
        </PriceContainer>
      </ServiceCard>

      {paymentStatus && (
        <PaymentStatus
          status={paymentStatus.status}
          amount={plan.price}
          isSubscription={true}
        />
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
            // Código JavaScript injetado
          />
        </WebViewContainer>
      )}
    </Container>
  );
};

export default ProcessarPagamentoAssinatura;

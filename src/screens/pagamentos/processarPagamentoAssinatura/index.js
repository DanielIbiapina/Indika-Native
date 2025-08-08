import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
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
  const [isMonitoring, setIsMonitoring] = useState(false);
  // ✅ NOVO: Estado para informações do trial
  const [trialInfo, setTrialInfo] = useState(null);

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

      console.log("Criando preferência de assinatura:", subscriptionData);

      const response = await paymentService.createSubscriptionPreference(
        subscriptionData
      );

      if (!response?.data?.init_point) {
        throw new Error("URL do checkout não encontrada na resposta");
      }

      console.log("Preferência criada com sucesso:", response.data.id);

      // ✅ NOVO: Capturar informações do trial
      if (response.data.trial) {
        const { trial } = response.data;
        setTrialInfo(trial);

        // Mostrar mensagem do trial para o usuário
        if (trial.message) {
          Alert.alert("🎁 Período Gratuito Disponível!", trial.message, [
            { text: "Continuar", style: "default" },
          ]);
        }
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

  const startMonitoring = () => {
    if (isMonitoring) return;

    setIsMonitoring(true);
    console.log("Iniciando monitoramento da assinatura...");

    paymentService.monitorSubscriptionStatus((status) => {
      console.log("Status recebido:", status);
      setPaymentStatus(status);

      if (status.success === true) {
        Alert.alert(
          "Assinatura Ativada!",
          "Sua assinatura foi ativada com sucesso!",
          [
            {
              text: "Continuar",
              onPress: () => {
                navigation.navigate("Assinaturas");
              },
            },
          ]
        );
      } else if (status.success === false) {
        Alert.alert(
          "Falha na Assinatura",
          status.message || "Não foi possível processar sua assinatura",
          [
            { text: "Tentar Novamente", onPress: createSubscriptionPreference },
            { text: "Voltar", onPress: () => navigation.goBack() },
          ]
        );
      }

      setIsMonitoring(false);
    });
  };

  const handleNavigationStateChange = (navState) => {
    console.log("Navegação mudou:", navState.url);

    // Verificar URLs que indicam que o usuário foi redirecionado
    if (
      navState.url.includes("mercadopago.com") &&
      (navState.url.includes("/checkout/") || navState.url.includes("/v1/"))
    ) {
      console.log("Usuário está no checkout do MercadoPago");

      if (!isMonitoring) {
        // Aguardar um pouco antes de começar o monitoramento
        setTimeout(() => {
          startMonitoring();
        }, 2000);
      }
    }

    // URLs de retorno (se configuradas)
    if (
      navState.url.includes("/subscription/success") ||
      navState.url.includes("/subscription/approved")
    ) {
      console.log("Pagamento aparentemente aprovado, iniciando monitoramento");
      startMonitoring();
    }
  };

  const LoadingIndicator = () => (
    <LoaderContainer>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoaderContainer>
  );

  if (loading) {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
          <RetryButton onPress={createSubscriptionPreference}>
            <RetryButtonText>Tentar Novamente</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      {/* ✅ NOVO: Mostrar informações do trial se disponível */}
      {trialInfo && (
        <ServiceCard
          style={{
            backgroundColor: "#e8f5e8",
            borderColor: "#4caf50",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons name="gift" size={20} color="#4caf50" />
            <ServiceTitle style={{ marginLeft: 8, color: "#2e7d32" }}>
              🎁 Período Gratuito
            </ServiceTitle>
          </View>
          {trialInfo.message && (
            <Text style={{ color: "#388e3c", fontSize: 14, lineHeight: 20 }}>
              {trialInfo.message}
            </Text>
          )}
        </ServiceCard>
      )}

      {/*<ServiceCard>
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
      </ServiceCard>*/}

      {paymentStatus && (
        <PaymentStatus
          status={
            paymentStatus.success === true
              ? "approved"
              : paymentStatus.success === false
              ? "rejected"
              : "pending"
          }
          amount={plan.price}
          isSubscription={true}
          message={paymentStatus.message}
        />
      )}

      {checkoutUrl && (
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
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log("WebView error: ", nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log("WebView HTTP error: ", nativeEvent);
            }}
            injectedJavaScript={`
              setTimeout(() => {
                window.ReactNativeWebView.postMessage('timeout');
              }, 30000);
            `}
            onMessage={(event) => {
              if (event.nativeEvent.data === "timeout") {
                console.log("WebView timeout - recarregando...");
                // Pode implementar reload se necessário
              }
            }}
            style={{ flex: 1 }}
          />
        </WebViewContainer>
      )}
    </Container>
  );
};

export default ProcessarPagamentoAssinatura;

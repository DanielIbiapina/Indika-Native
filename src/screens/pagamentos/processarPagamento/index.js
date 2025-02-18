import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";
import { paymentService } from "../../../services/paymentService";
import {
  ScrollContainer,
  Container,
  Header,
  Title,
  ServiceInfo,
  ServiceTitle,
  AmountLabel,
  Amount,
  ErrorText,
  LoaderContainer,
  WebViewContainer,
} from "./styles";

const ProcessarPagamento = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  const { orderId, amount, serviceTitle, providerId } = route.params;

  const LoadingIndicatorView = () => {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoaderContainer>
    );
  };

  useEffect(() => {
    createPreference();
  }, []);

  const createPreference = async () => {
    try {
      setLoading(true);
      const response = await paymentService.createMercadoPagoPreference({
        orderId,
        amount,
        description: serviceTitle,
        providerId,
      });

      const checkoutUrl = response.data.init_point;

      if (!checkoutUrl) {
        throw new Error("URL do checkout não encontrada na resposta");
      }

      setCheckoutUrl(checkoutUrl);
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      setError("Não foi possível iniciar o pagamento");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes("exp://") && navState.url.includes("/payment/")) {
      const status = navState.url.split("/").pop();
      navigation.navigate("Pedidos", { status });
    }
  };

  if (loading) {
    return <LoadingIndicatorView />;
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

          {checkoutUrl ? (
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
                renderLoading={LoadingIndicatorView}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                thirdPartyCookiesEnabled={true}
                sharedCookiesEnabled={true}
                cacheEnabled={false}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                scalesPageToFit={true}
                injectedJavaScript={`
                  const meta = document.createElement('meta');
                  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                  meta.setAttribute('name', 'viewport');
                  document.getElementsByTagName('head')[0].appendChild(meta);
                  true;
                `}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn("WebView error: ", nativeEvent);
                  setError(
                    `Erro ao carregar página: ${nativeEvent.description}`
                  );
                }}
                onHttpError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn(
                    "WebView HTTP error: ",
                    nativeEvent.statusCode,
                    nativeEvent.description
                  );
                  setError(
                    `Erro ${nativeEvent.statusCode}: ${nativeEvent.description}`
                  );
                }}
                style={{ flex: 1 }}
              />
            </WebViewContainer>
          ) : (
            <ErrorText>
              {error || "Não foi possível carregar o checkout"}
            </ErrorText>
          )}
        </Container>
      </ScrollContainer>
    </>
  );
};

export default ProcessarPagamento;

import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Card,
  InfoRow,
  Label,
  Value,
  PaymentMethodsSection,
  MethodOption,
  MethodOptionText,
  ConfirmButton,
  ConfirmButtonText,
  BackButton,
  BackButtonText,
  LoadingContainer,
  ErrorText,
  PixDetailsContainer,
  PixKeyRow,
  CopyButton,
  InstructionsContainer,
  InstructionText,
  PixKeyContainer,
  PixKeyType,
  PixKeyValue,
} from "./styles";
import { userService } from "../../../services/userService";
import { paymentService } from "../../../services/paymentService";
import * as Clipboard from "expo-clipboard";

const ConfirmarPagamento = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId, amount, serviceTitle, providerId } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState({
    CASH: true,
    PIX: false,
    MERCADOPAGO: true,
  });
  const [pixInfo, setPixInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProviderPaymentMethods();
  }, []);

  const loadProviderPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getProviderPaymentMethods(
        providerId
      );

      if (response?.data?.details?.methods) {
        const methods = response.data.details.methods;
        console.log("Métodos de pagamento do prestador:", methods);

        setPaymentMethods((prev) => ({
          ...prev,
          PIX: methods.some((m) => m.type === "pix"),
          CASH: true,
          MERCADOPAGO: methods.some((m) => m.type === "mercadopago"),
        }));

        // Guardar informações do PIX se disponível
        const pixMethod = methods.find((m) => m.type === "pix");
        if (pixMethod?.details) {
          setPixInfo(pixMethod.details);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar métodos de pagamento:", error);
      setError("Não foi possível carregar os métodos de pagamento");
    } finally {
      setLoading(false);
    }
  };

  const getPixKeyTypeLabel = (keyType) => {
    switch (keyType) {
      case "PHONE":
        return "📱 Telefone";
      case "CPF":
        return "🆔 CPF";
      case "EMAIL":
        return "📧 Email";
      case "RANDOM":
        return "🔑 Chave Aleatória";
      default:
        return "🔑 Chave PIX";
    }
  };

  const copyPixKey = async () => {
    if (pixInfo?.key) {
      await Clipboard.setStringAsync(pixInfo.key);
      Alert.alert("Copiado!", "Chave PIX copiada para a área de transferência");
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!selectedMethod) {
      Alert.alert("Atenção", "Por favor, selecione um método de pagamento");
      return;
    }

    try {
      setSubmitting(true);

      if (selectedMethod === "MERCADOPAGO") {
        navigation.navigate("ProcessarPagamento", {
          orderId,
          amount,
          serviceTitle,
          providerId,
        });
        return;
      }

      // Para outros métodos (PIX, dinheiro), criar pagamento direto
      const response = await paymentService.createDirectPayment({
        orderId,
        amount: parseFloat(amount),
        paymentMethod: selectedMethod,
        providerId,
      });

      await paymentService.clientConfirmPayment(response.id);

      // Mensagem de sucesso simples
      const message =
        selectedMethod === "PIX"
          ? "Pagamento PIX registrado! O prestador confirmará o recebimento quando você transferir o valor."
          : "Pagamento em dinheiro registrado! O prestador confirmará o recebimento.";

      Alert.alert("Sucesso!", message, [
        {
          text: "OK",
          onPress: () => {
            // CORRIGIR: navegar para TabNavigator e depois Pedidos
            navigation.navigate("TabNavigator", { screen: "Pedidos" });
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      Alert.alert(
        "Erro",
        error.message ||
          "Não foi possível confirmar o pagamento. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>{error}</ErrorText>
        <ConfirmButton onPress={() => navigation.goBack()}>
          <ConfirmButtonText>Voltar</ConfirmButtonText>
        </ConfirmButton>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <Card>
          <InfoRow>
            <Label>Serviço:</Label>
            <Value>{serviceTitle}</Value>
          </InfoRow>

          <InfoRow>
            <Label>Valor:</Label>
            <Value
              style={{ fontSize: 20, fontWeight: "bold", color: "#422680" }}
            >
              R$ {parseFloat(amount).toFixed(2)}
            </Value>
          </InfoRow>
        </Card>

        <PaymentMethodsSection>
          <Label style={{ marginBottom: 16 }}>
            Escolha o método de pagamento:
          </Label>

          {paymentMethods?.CASH && (
            <MethodOption
              selected={selectedMethod === "CASH"}
              onPress={() => setSelectedMethod("CASH")}
            >
              <Ionicons
                name="cash-outline"
                size={24}
                color={selectedMethod === "CASH" ? "#fff" : "#422680"}
              />
              <MethodOptionText selected={selectedMethod === "CASH"}>
                Dinheiro
              </MethodOptionText>
            </MethodOption>
          )}

          {paymentMethods?.PIX && (
            <MethodOption
              selected={selectedMethod === "PIX"}
              onPress={() => setSelectedMethod("PIX")}
            >
              <Ionicons
                name="qr-code-outline"
                size={24}
                color={selectedMethod === "PIX" ? "#fff" : "#422680"}
              />
              <MethodOptionText selected={selectedMethod === "PIX"}>
                PIX
              </MethodOptionText>
            </MethodOption>
          )}

          {paymentMethods?.MERCADOPAGO && (
            <MethodOption
              selected={selectedMethod === "MERCADOPAGO"}
              onPress={() => setSelectedMethod("MERCADOPAGO")}
            >
              <Ionicons
                name="card-outline"
                size={24}
                color={selectedMethod === "MERCADOPAGO" ? "#fff" : "#422680"}
              />
              <MethodOptionText selected={selectedMethod === "MERCADOPAGO"}>
                Cartão (Mercado Pago)
              </MethodOptionText>
            </MethodOption>
          )}
        </PaymentMethodsSection>

        {selectedMethod === "PIX" && pixInfo && (
          <Card>
            <InfoRow>
              <Label
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}
              >
                💰 Informações para o PIX
              </Label>
            </InfoRow>

            <PixKeyContainer>
              <View style={{ flex: 1 }}>
                <PixKeyType>{getPixKeyTypeLabel(pixInfo.keyType)}</PixKeyType>
                <PixKeyValue>
                  {pixInfo.key || "Chave não disponível"}
                </PixKeyValue>
                {pixInfo.holderName && (
                  <Label style={{ marginTop: 4, fontSize: 12, color: "#666" }}>
                    Titular: {pixInfo.holderName}
                  </Label>
                )}
              </View>
              <CopyButton onPress={copyPixKey}>
                <Ionicons name="copy-outline" size={20} color="#422680" />
              </CopyButton>
            </PixKeyContainer>

            <InstructionsContainer>
              <InstructionText>
                • Abra seu aplicativo bancário{"\n"}• Selecione a opção PIX
                {"\n"}• Cole ou digite a chave acima{"\n"}• Transfira R${" "}
                {parseFloat(amount).toFixed(2)}
                {"\n"}• O prestador confirmará o recebimento
              </InstructionText>
            </InstructionsContainer>
          </Card>
        )}

        <ConfirmButton
          onPress={handlePaymentConfirmation}
          disabled={submitting || !selectedMethod}
        >
          <ConfirmButtonText>
            {submitting ? "Processando..." : "Confirmar Pagamento"}
          </ConfirmButtonText>
        </ConfirmButton>
      </ScrollView>
    </Container>
  );
};

export default ConfirmarPagamento;

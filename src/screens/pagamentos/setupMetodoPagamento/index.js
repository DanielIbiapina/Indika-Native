import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Linking, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paymentService } from "../../../services/paymentService";
import { stripeService } from "../../../services/stripeService";
import PaymentMethodSelector from "../../../components/payment/paymentMethodSelector";
import PixForm from "../../../components/payment/pixForm";
import BankAccountForm from "../../../components/payment/bankAccountForm";
import StripeForm from "../../../components/payment/stripeForm";
import {
  Container,
  Header,
  Title,
  FormContainer,
  ErrorText,
  ScrollContent,
  SubTitle,
} from "./styles";
import { PAYMENT_METHODS } from "../../../constants/paymentMethods";

const SetupMetodoPagamento = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState("pix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const loadCurrentMethod = async () => {
    try {
      const response = await paymentService.getPaymentMethod();
      if (response.data) {
        setInitialData(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar método atual:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const data = {
        type: selectedMethod,
        ...formData,
      };

      await paymentService.setupPaymentMethod(data);
      Alert.alert("Sucesso", "Método de pagamento configurado com sucesso");
      navigation.goBack();
    } catch (error) {
      setError("Erro ao salvar método de pagamento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStripeConnect = async () => {
    try {
      setLoading(true);
      const accountLink = await stripeService.createConnectAccount();
      await Linking.openURL(accountLink);
    } catch (error) {
      setError("Erro ao conectar com Stripe");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (selectedMethod) {
      case "pix":
        return (
          <PixForm
            onSubmit={handleSubmit}
            initialData={initialData}
            loading={loading}
          />
        );
      case "bank_account":
        return (
          <BankAccountForm
            onSubmit={handleSubmit}
            initialData={initialData}
            loading={loading}
          />
        );
      case "stripe":
        return (
          <StripeForm
            onConnect={handleStripeConnect}
            onDisconnect={async () => {
              try {
                await stripeService.disconnectStripeAccount();
                setInitialData(null);
              } catch (error) {
                setError("Erro ao desconectar conta Stripe");
              }
            }}
            loading={loading}
            connected={initialData?.stripeAccountId != null}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    loadCurrentMethod();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Configurar Recebimentos</Title>
        {initialData && (
          <SubTitle>
            Método atual:{" "}
            {PAYMENT_METHODS[initialData.type]?.title || "Não definido"}
          </SubTitle>
        )}
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollContent>
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            showDisabled={false}
          />

          {selectedMethod && (
            <FormContainer>
              {renderForm()}
              {error && <ErrorText>{error}</ErrorText>}
            </FormContainer>
          )}
        </ScrollContent>
      </ScrollView>
    </Container>
  );
};

export default SetupMetodoPagamento;

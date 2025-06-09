import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { paymentService } from "../../services/paymentService";
import {
  Container,
  Header,
  Title,
  Card,
  PlanCard,
  PlanTitle,
  PlanPrice,
  PlanDescription,
  SubscriptionInfo,
  InfoRow,
  InfoLabel,
  InfoValue,
  SubscribeButton,
  SubscribeButtonText,
  StatusBadge,
  StatusText,
  LoadingContainer,
} from "./styles";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PLANS = [
  {
    id: "monthly",
    type: "MONTHLY",
    title: "Mensal",
    price: 29.9,
    description: "Acesso a todas as funcionalidades por 1 mês",
  },
  {
    id: "quarterly",
    type: "QUARTERLY",
    title: "Trimestral",
    price: 79.9,
    description: "Acesso a todas as funcionalidades por 3 meses",
  },
  {
    id: "annual",
    type: "ANNUAL",
    title: "Anual",
    price: 299.9,
    description: "Acesso a todas as funcionalidades por 12 meses",
  },
];

const Assinaturas = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getSubscription();
      setSubscription(data);
    } catch (error) {
      console.error("Erro ao carregar assinatura:", error);
      // Se não há assinatura, não mostrar erro
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan) => {
    try {
      setSubscribing(true);

      // Confirmar a assinatura
      Alert.alert(
        "Confirmar Assinatura",
        `Deseja assinar o plano ${plan.title} por R$ ${plan.price.toFixed(2)}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            /*text: "Continuar",
            onPress: () => {
              // Navegar para tela de pagamento com os dados do plano
              navigation.navigate("ProcessarPagamentoAssinatura", {
                plan: {
                  ...plan,
                  isSubscription: true,
                },
              });*/
            text: "Confirmar",
            onPress: async () => {
              try {
                // Usar o método de teste em vez do fluxo completo
                const result = await paymentService.createTestSubscription({
                  planType: plan.type,
                  price: plan.price,
                });

                Alert.alert("Sucesso", "Assinatura realizada com sucesso!", [
                  {
                    text: "OK",
                    onPress: () => loadSubscription(),
                  },
                ]);
              } catch (error) {
                Alert.alert(
                  "Erro",
                  error.message || "Não foi possível realizar a assinatura"
                );
              } finally {
                setSubscribing(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível iniciar a assinatura"
      );
      //} finally {
      setSubscribing(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#422680" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subscription ? (
          <Card>
            <StatusBadge active={subscription.status === "ACTIVE"}>
              <StatusText active={subscription.status === "ACTIVE"}>
                {subscription.status === "ACTIVE" ? "Ativa" : "Inativa"}
              </StatusText>
            </StatusBadge>

            <SubscriptionInfo>
              <InfoRow>
                <InfoLabel>Plano</InfoLabel>
                <InfoValue>
                  {subscription.planType === "MONTHLY"
                    ? "Mensal"
                    : subscription.planType === "QUARTERLY"
                    ? "Trimestral"
                    : subscription.planType === "ANNUAL"
                    ? "Anual"
                    : subscription.planType}
                </InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Valor</InfoLabel>
                <InfoValue>R$ {subscription.price.toFixed(2)}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Início</InfoLabel>
                <InfoValue>{formatDate(subscription.startDate)}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Término</InfoLabel>
                <InfoValue>{formatDate(subscription.endDate)}</InfoValue>
              </InfoRow>
            </SubscriptionInfo>
          </Card>
        ) : (
          <View>
            <Title style={{ fontSize: 18, marginTop: 20 }}>
              Escolha um plano
            </Title>

            {PLANS.map((plan) => (
              <PlanCard key={plan.id}>
                <PlanTitle>{plan.title}</PlanTitle>
                <PlanPrice>R$ {plan.price.toFixed(2)}</PlanPrice>
                <PlanDescription>{plan.description}</PlanDescription>

                <SubscribeButton
                  onPress={() => handleSubscribe(plan)}
                  disabled={subscribing}
                >
                  <SubscribeButtonText>
                    {subscribing ? "Processando..." : "Assinar"}
                  </SubscribeButtonText>
                </SubscribeButton>
              </PlanCard>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Assinaturas;

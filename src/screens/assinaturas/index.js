import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
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
  AlertCard,
  AlertText,
  AlertIcon,
  CancelButton,
  CancelButtonText,
  // ✅ APENAS OS QUE ESTÃO SENDO USADOS
  TrialSection,
  TrialSectionTitle,
} from "./styles";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PLANS = [
  {
    id: "monthly",
    type: "MONTHLY",
    title: "Mensal",
    price: 9.9,
    description: "Acesso a todas as funcionalidades por 1 mês",
  },
  {
    id: "quarterly",
    type: "QUARTERLY",
    title: "Trimestral",
    price: 26.9,
    description: "Acesso a todas as funcionalidades por 3 meses",
  },
  {
    id: "semesterly",
    type: "SEMESTERLY",
    title: "Semestral",
    price: 47.9,
    description: "Acesso a todas as funcionalidades por 6 meses",
  },
];

const Assinaturas = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [cancelling, setCancelling] = useState(false);
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

  // ✅ NOVA FUNÇÃO: Cancelar assinatura
  const handleCancelSubscription = () => {
    Alert.alert(
      "Cancelar Assinatura",
      "Tem certeza que deseja cancelar sua assinatura? Você poderá continuar usando até o fim do ciclo já pago.",
      [
        { text: "Não cancelar", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: confirmCancellation,
        },
      ]
    );
  };

  const confirmCancellation = async () => {
    try {
      setCancelling(true);

      const response = await paymentService.cancelSubscription({
        planType: subscription.planType,
      });

      Alert.alert(
        "Assinatura Cancelada",
        response.message ||
          "Assinatura cancelada com sucesso. Você pode continuar usando até o fim do ciclo já pago.",
        [{ text: "OK", onPress: loadSubscription }]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível cancelar a assinatura"
      );
    } finally {
      setCancelling(false);
    }
  };

  const handleSubscribe = async (plan) => {
    try {
      setSubscribing(true);

      Alert.alert(
        "Confirmar Assinatura",
        `Deseja assinar o plano ${plan.title} por R$ ${plan.price.toFixed(2)}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Continuar",
            onPress: () => {
              navigation.navigate("ProcessarPagamentoAssinatura", {
                plan: {
                  ...plan,
                  isSubscription: true,
                },
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível iniciar a assinatura"
      );
    } finally {
      setSubscribing(false);
    }
  };

  // ✅ NOVA FUNÇÃO: Renderizar alertas baseado no status
  const renderStatusAlert = () => {
    if (!subscription) return null;

    switch (subscription.status) {
      case "PENDING":
        return (
          <AlertCard type="warning">
            <AlertIcon name="hourglass-outline" size={20} color="#FF8C00" />
            <AlertText type="warning">
              Aguardando primeiro pagamento...
            </AlertText>
          </AlertCard>
        );

      case "PENDING_PAYMENT":
        if (subscription.lastPaymentAt) {
          // Pagamento em atraso - mas já pagou antes
          return (
            <AlertCard type="warning">
              <AlertIcon name="warning" size={20} color="#FF8C00" />
              <AlertText type="warning">
                Pagamento em atraso - regularize em até 14 dias
              </AlertText>
            </AlertCard>
          );
        } else {
          // Primeiro pagamento falhou
          return (
            <AlertCard type="error">
              <AlertIcon name="close-circle" size={20} color="#DC3545" />
              <AlertText type="error">Primeiro pagamento falhou</AlertText>
            </AlertCard>
          );
        }

      case "CANCELLED":
        return (
          <AlertCard type="info">
            <AlertIcon name="information-circle" size={20} color="#2196F3" />
            <AlertText type="info">
              Cancelada - válida até {formatDate(subscription.endDate)}
            </AlertText>
          </AlertCard>
        );

      case "EXPIRED":
        return (
          <AlertCard type="error">
            <AlertIcon name="close-circle" size={20} color="#DC3545" />
            <AlertText type="error">Assinatura expirada</AlertText>
          </AlertCard>
        );

      default:
        return null;
    }
  };

  // ✅ FUNÇÃO ATUALIZADA: Obter texto do status
  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "ACTIVE":
        return "Ativa";
      case "PENDING_PAYMENT":
        return "Pagamento Pendente";
      case "CANCELLED":
        return "Cancelada";
      case "EXPIRED":
        return "Expirada";
      default:
        return "Desconhecido";
    }
  };

  // ✅ NOVA FUNÇÃO: Verificar se pode cancelar
  const canCancel = () => {
    return (
      subscription &&
      subscription.status === "ACTIVE" &&
      !subscription.cancelledAt
    );
  };

  // ✅ NOVA FUNÇÃO: Renderizar informações do trial
  const renderTrialInfo = () => {
    if (!subscription || !subscription.trial) return null;

    const { trial } = subscription;

    return (
      <TrialSection>
        <TrialSectionTitle>
          📅 Informações do Período Gratuito
        </TrialSectionTitle>

        {trial.isActive && (
          <InfoRow>
            <InfoLabel>Status do Trial</InfoLabel>
            <InfoValue style={{ color: "#4caf50" }}>✅ Ativo</InfoValue>
          </InfoRow>
        )}

        {trial.startDate && (
          <InfoRow>
            <InfoLabel>Início do Trial</InfoLabel>
            <InfoValue>{formatDate(trial.startDate)}</InfoValue>
          </InfoRow>
        )}

        {trial.endDate && (
          <InfoRow>
            <InfoLabel>Fim do Trial</InfoLabel>
            <InfoValue>{formatDate(trial.endDate)}</InfoValue>
          </InfoRow>
        )}

        {trial.daysRemaining !== undefined && (
          <InfoRow>
            <InfoLabel>Dias Restantes</InfoLabel>
            <InfoValue
              style={{
                color: trial.daysRemaining <= 3 ? "#ff9800" : "#4caf50",
                fontWeight: "bold",
              }}
            >
              {trial.daysRemaining} dias
            </InfoValue>
          </InfoRow>
        )}

        {trial.nextChargeDate && (
          <InfoRow>
            <InfoLabel>Primeira Cobrança</InfoLabel>
            <InfoValue>{formatDate(trial.nextChargeDate)}</InfoValue>
          </InfoRow>
        )}
      </TrialSection>
    );
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
          <View>
            {/* ✅ NOVO: Alertas de status */}
            {renderStatusAlert()}

            <Card>
              <StatusBadge active={subscription.status === "ACTIVE"}>
                <StatusText active={subscription.status === "ACTIVE"}>
                  {getStatusText(subscription.status)}
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
                      : subscription.planType === "SEMESTERLY"
                      ? "Semestral"
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

                {/* ✅ NOVOS CAMPOS */}
                {subscription.lastPaymentAt && (
                  <InfoRow>
                    <InfoLabel>Último Pagamento</InfoLabel>
                    <InfoValue>
                      {formatDate(subscription.lastPaymentAt)}
                    </InfoValue>
                  </InfoRow>
                )}

                {subscription.cancelledAt && (
                  <InfoRow>
                    <InfoLabel>Cancelada em</InfoLabel>
                    <InfoValue>
                      {formatDate(subscription.cancelledAt)}
                    </InfoValue>
                  </InfoRow>
                )}

                {subscription.pendingSince && (
                  <InfoRow>
                    <InfoLabel>Pendente desde</InfoLabel>
                    <InfoValue>
                      {formatDate(subscription.pendingSince)}
                    </InfoValue>
                  </InfoRow>
                )}
              </SubscriptionInfo>

              {/* ✅ NOVO: Seção de informações do trial */}
              {renderTrialInfo()}

              {/* ✅ NOVO: Botão de cancelamento */}
              {canCancel() && (
                <CancelButton
                  onPress={handleCancelSubscription}
                  disabled={cancelling}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={20}
                    color="#DC3545"
                  />
                  <CancelButtonText>
                    {cancelling ? "Cancelando..." : "Cancelar Assinatura"}
                  </CancelButtonText>
                </CancelButton>
              )}
            </Card>
          </View>
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

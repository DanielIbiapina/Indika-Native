import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { userService } from "../../../services/userService";
import { notificationService } from "../../../services/notificationService";
import {
  Container,
  Section,
  SectionTitle,
  NotificationItem,
  NotificationText,
  NotificationDescription,
  Switch,
  LoadingSpinner,
  SaveButton,
  SaveButtonText,
  TextContainer,
  TestButton,
  TestButtonText,
} from "./styles";

const Notificacoes = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
    newOrders: true,
    orderUpdates: true,
    messages: true,
    marketing: false,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPreferences();
    checkNotificationPermission();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const userPreferences = await userService.getNotificationPreferences();
      setPreferences(userPreferences);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar suas preferências");
    } finally {
      setLoading(false);
    }
  };

  const checkNotificationPermission = async () => {
    try {
      const permission = await notificationService.hasPermission();
      setHasPermission(permission);
    } catch (error) {
      console.log("Erro ao verificar permissão:", error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      await notificationService.registerForPushNotifications();
      setHasPermission(true);
      Alert.alert(
        "Sucesso",
        "Permissão concedida! Você receberá notificações."
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível obter permissão para notificações. Verifique as configurações do seu dispositivo."
      );
    }
  };

  const testNotification = async () => {
    try {
      await notificationService.scheduleLocalNotification(
        "Teste Indika",
        "Esta é uma notificação de teste! 🎉",
        { type: "test" },
        2
      );
      Alert.alert(
        "Teste Enviado",
        "Você receberá uma notificação em 2 segundos!"
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar notificação de teste");
    }
  };

  const handleToggle = (key) => {
    if (key === "pushNotifications" && !preferences[key] && !hasPermission) {
      Alert.alert(
        "Permissão Necessária",
        "Para receber notificações push, você precisa conceder permissão.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Conceder", onPress: requestNotificationPermission },
        ]
      );
      return;
    }

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await userService.updateNotificationPreferences(preferences);
      Alert.alert("Sucesso", "Preferências atualizadas com sucesso!");
      setHasChanges(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar suas preferências");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <SectionTitle>Canais de Notificação</SectionTitle>

        <NotificationItem>
          <Ionicons name="phone-portrait-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>Notificações push</NotificationText>
            <NotificationDescription>
              {hasPermission
                ? "Receba notificações no seu celular"
                : "Permissão necessária para receber notificações"}
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.pushNotifications && hasPermission}
            onValueChange={() => handleToggle("pushNotifications")}
            disabled={!hasPermission}
          />
        </NotificationItem>

        {hasPermission && (
          <TestButton onPress={testNotification}>
            <Ionicons name="send-outline" size={20} color="#422680" />
            <TestButtonText>Testar Notificação</TestButtonText>
          </TestButton>
        )}

        <NotificationItem>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>E-mails</NotificationText>
            <NotificationDescription>
              Receba atualizações por e-mail
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.emailNotifications}
            onValueChange={() => handleToggle("emailNotifications")}
          />
        </NotificationItem>
      </Section>

      <Section>
        <SectionTitle>Tipos de Notificação</SectionTitle>

        <NotificationItem>
          <Ionicons name="cart-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>Novos pedidos</NotificationText>
            <NotificationDescription>
              Quando receber uma nova solicitação de serviço
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.newOrders}
            onValueChange={() => handleToggle("newOrders")}
          />
        </NotificationItem>

        <NotificationItem>
          <Ionicons name="refresh-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>Atualizações de pedidos</NotificationText>
            <NotificationDescription>
              Mudanças de status e confirmações
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.orderUpdates}
            onValueChange={() => handleToggle("orderUpdates")}
          />
        </NotificationItem>

        <NotificationItem>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>Mensagens</NotificationText>
            <NotificationDescription>
              Novas mensagens de clientes
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.messages}
            onValueChange={() => handleToggle("messages")}
          />
        </NotificationItem>

        <NotificationItem last>
          <Ionicons name="megaphone-outline" size={24} color="#666" />
          <TextContainer>
            <NotificationText>Marketing</NotificationText>
            <NotificationDescription>
              Novidades, promoções e dicas
            </NotificationDescription>
          </TextContainer>
          <Switch
            value={preferences.marketing}
            onValueChange={() => handleToggle("marketing")}
          />
        </NotificationItem>
      </Section>

      {hasChanges && (
        <SaveButton onPress={handleSave} disabled={saving}>
          {saving ? (
            <LoadingSpinner />
          ) : (
            <SaveButtonText>Salvar alterações</SaveButtonText>
          )}
        </SaveButton>
      )}
    </Container>
  );
};

export default Notificacoes;

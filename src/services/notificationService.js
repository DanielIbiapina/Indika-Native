import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

// Configurar como as notificações devem aparecer
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
    this.navigationRef = null; // ✅ NOVO: Referência para navegação
    this.callbacks = {}; // ✅ NOVO: Callbacks para diferentes eventos
  }

  // ✅ NOVO: Configurar referência de navegação
  setNavigationRef(navigationRef) {
    this.navigationRef = navigationRef;
  }

  // ✅ NOVO: Registrar callbacks para eventos
  registerCallback(eventType, callback) {
    if (!this.callbacks[eventType]) {
      this.callbacks[eventType] = [];
    }
    this.callbacks[eventType].push(callback);
  }

  // ✅ NOVO: Executar callbacks
  executeCallbacks(eventType, data) {
    if (this.callbacks[eventType]) {
      this.callbacks[eventType].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Erro ao executar callback ${eventType}:`, error);
        }
      });
    }
  }

  // ✅ Registrar para notificações push
  async registerForPushNotifications() {
    try {
      let token;

      // Verificar se é dispositivo físico
      if (Device.isDevice) {
        // Verificar permissões existentes
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Solicitar permissão se não tiver
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("❌ Permissão de notificação negada");
          throw new Error("Permissão de notificação negada");
        }

        // Configurar canal para Android
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Indika",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#422680",
            sound: "default",
          });
        }

        // Obter token push
        token = await Notifications.getExpoPushTokenAsync({
          projectId: "0cebe227-ea81-4706-9cb8-7884a86a3077", // Seu project ID
        });

        console.log("✅ Push token obtido:", token.data);
        this.expoPushToken = token.data;

        // Salvar token localmente
        await AsyncStorage.setItem("@App:pushToken", token.data);

        // Enviar token para o backend
        await this.sendTokenToBackend(token.data);

        return token.data;
      } else {
        console.log("❌ Deve usar dispositivo físico para notificações push");
        throw new Error("Deve usar dispositivo físico para notificações push");
      }
    } catch (error) {
      console.error("❌ Erro ao registrar notificações:", error);
      throw error;
    }
  }

  // ✅ Enviar token para o backend
  async sendTokenToBackend(token) {
    try {
      await api.post("/users/me/push-token", {
        pushToken: token,
        platform: Platform.OS,
      });
      console.log("✅ Token enviado para o backend");
    } catch (error) {
      console.error("❌ Erro ao enviar token para backend:", error);
    }
  }

  // ✅ Configurar listeners de notificação
  setupNotificationListeners() {
    // Listener para notificações recebidas quando app está aberto
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📱 Notificação recebida:", notification);

        // ✅ IMPLEMENTADO: Lógica adicional quando recebe notificação
        const notificationData = notification.request.content.data;

        // Executar callbacks registrados
        this.executeCallbacks("notificationReceived", notification);

        // Atualizar badges baseado no tipo
        this.updateBadgeForNotification(notificationData);

        // Mostrar notificação personalizada se necessário
        this.handleInAppNotification(notification);
      }
    );

    // Listener para quando usuário interage com notificação
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Usuário interagiu com notificação:", response);

        // ✅ IMPLEMENTADO: Navegar para tela específica
        this.handleNotificationResponse(response);
      });
  }

  // ✅ NOVO: Atualizar badges baseado no tipo de notificação
  updateBadgeForNotification(notificationData) {
    // Aqui você pode implementar lógica para atualizar contextos/badges
    switch (notificationData.type) {
      case "new_order":
        // Incrementar badge de pedidos
        this.executeCallbacks("newOrderReceived", notificationData);
        break;
      case "message":
        // Incrementar badge de mensagens
        this.executeCallbacks("newMessageReceived", notificationData);
        break;
      case "payment":
        // Notificar sobre pagamento
        this.executeCallbacks("paymentReceived", notificationData);
        break;
    }
  }

  // ✅ NOVO: Mostrar notificação personalizada dentro do app
  handleInAppNotification(notification) {
    // Você pode implementar um toast ou banner customizado aqui
    const { title, body } = notification.request.content;

    // Exemplo: usar um contexto de toast
    this.executeCallbacks("showInAppNotification", {
      title,
      body,
      type: "info",
    });
  }

  // ✅ IMPLEMENTADO: Lidar com resposta à notificação
  handleNotificationResponse(response) {
    const notificationData = response.notification.request.content.data;

    // ✅ IMPLEMENTADO: Navegar baseado no tipo de notificação
    if (this.navigationRef) {
      switch (notificationData.type) {
        case "new_order":
          this.navigationRef.navigate("Pedidos");
          break;
        case "message":
          this.navigationRef.navigate("Mensagens", {
            id: notificationData.messageId,
          });
          break;
        case "payment":
          this.navigationRef.navigate("Pagamentos");
          break;
        case "order_update":
          this.navigationRef.navigate("PedidoDetalhes", {
            id: notificationData.orderId,
          });
          break;
        default:
          this.navigationRef.navigate("Home");
          break;
      }
    } else {
      console.warn("⚠️ NavigationRef não configurado");
    }

    // Executar callbacks para resposta
    this.executeCallbacks("notificationResponse", response);
  }

  // ✅ Agendar notificação local (para teste)
  async scheduleLocalNotification(title, body, data = {}, seconds = 2) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: "default",
        },
        trigger: {
          seconds,
        },
      });

      console.log("📅 Notificação local agendada:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Erro ao agendar notificação local:", error);
    }
  }

  // ✅ Cancelar todas as notificações
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("🗑️ Todas as notificações canceladas");
  }

  // ✅ Limpar listeners
  removeNotificationListeners() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }

  // ✅ Obter token salvo
  async getSavedToken() {
    try {
      const token = await AsyncStorage.getItem("@App:pushToken");
      return token;
    } catch (error) {
      console.error("❌ Erro ao obter token salvo:", error);
      return null;
    }
  }

  // ✅ Verificar se tem permissão
  async hasPermission() {
    const { status } = await Notifications.getPermissionsAsync();
    return status === "granted";
  }
}

export const notificationService = new NotificationService();

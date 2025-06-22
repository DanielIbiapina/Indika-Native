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
      await api.post("/user/push-token", {
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
        // Aqui você pode implementar lógica adicional
        // como atualizar estado da aplicação
      }
    );

    // Listener para quando usuário interage com notificação
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Usuário interagiu com notificação:", response);

        // Navegar para tela específica baseado no tipo de notificação
        this.handleNotificationResponse(response);
      });
  }

  // ✅ Lidar com resposta à notificação
  handleNotificationResponse(response) {
    const notificationData = response.notification.request.content.data;

    // Navegar baseado no tipo de notificação
    switch (notificationData.type) {
      case "new_order":
        // Navegar para pedidos
        // navigation.navigate('Pedidos');
        break;
      case "message":
        // Navegar para mensagens
        // navigation.navigate('Messages', { id: notificationData.messageId });
        break;
      case "payment":
        // Navegar para pagamentos
        // navigation.navigate('Payments');
        break;
      default:
        // Navegar para home
        // navigation.navigate('Home');
        break;
    }
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

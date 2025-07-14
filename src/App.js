import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./contexts/authContext";
import { BadgeProvider } from "./contexts/badgeContext";

import { theme } from "./styles/theme";
import AppNavigator from "./navigation/appNavigator"; // Importe o AppNavigator que você criou
import { StatusBar } from "expo-status-bar"; // Importar o StatusBar do Expo
import { OrderProvider } from "./contexts/orderContext";
import { TutorialProvider } from "./contexts/tutorialContext";

console.warn("O app carregou!"); // Essa mensagem aparecerá no logcat

export default function App() {
  console.warn("O App está rodando!");

  useEffect(() => {
    // ✅ Inicializar notificações em DEV e PROD
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    try {
      console.log("🔔 Inicializando serviço de notificações...");

      // ✅ Import dinâmico funciona melhor que require
      const { notificationService } = await import(
        "./services/notificationService"
      );

      // Configurar listeners
      notificationService.setupNotificationListeners();

      // Tentar registrar para notificações
      if (__DEV__) {
        console.log(
          "🧪 DEV: Tentando registrar notificações (pode dar warning)"
        );
      }

      await notificationService.registerForPushNotifications();

      console.log("✅ Notificações inicializadas com sucesso");
    } catch (error) {
      console.log("⚠️ Erro ao inicializar notificações:", error.message);
      // Não é crítico - app pode funcionar sem notificações

      if (__DEV__) {
        console.log("🧪 DEV: Normal ter erro de notificações no Expo Go");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BadgeProvider>
          <OrderProvider>
            <TutorialProvider>
              <AppNavigator />
              <StatusBar style="auto" />
            </TutorialProvider>
          </OrderProvider>
        </BadgeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

/* "googleSignIn": {
  "apiKey": "86807468256-khufgr65rjpdhsa5hvooesnm07shfulk.apps.googleusercontent.com"
}*/

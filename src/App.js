import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./contexts/authContext";
import { BadgeProvider } from "./contexts/badgeContext";

import { theme } from "./styles/theme";
import AppNavigator from "./navigation/appNavigator";
import { StatusBar } from "expo-status-bar";
import { OrderProvider } from "./contexts/orderContext";
import { TutorialProvider } from "./contexts/tutorialContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "./config/toastConfig";

// ✅ CORREÇÃO: Importação condicional do App Check
let appCheck;
if (!__DEV__) {
  try {
    appCheck = require("@react-native-firebase/app-check").default;
  } catch (error) {
    console.log("⚠️ App Check não disponível:", error.message);
    appCheck = null;
  }
}

import * as Sentry from "@sentry/react-native";

if (!__DEV__) {
  Sentry.init({
    dsn: "https://ebd40b0e224b7a503b44c57f8a72f85b@o4509788504719360.ingest.de.sentry.io/4509788507471952",
    sendDefaultPii: true, // Envia dados adicionais como IP, device, etc.
    environment: "production",
    enableAutoSessionTracking: true,
    enableNative: true, // Garante que erros nativos também são rastreados
    tracesSampleRate: 1.0, // Para performance monitoring, pode ajustar depois
  });
}

console.warn("O app carregou!");

function App() {
  console.warn("O App está rodando!");

  useEffect(() => {
    // ✅ INICIALIZAR APP CHECK
    initializeAppCheck();

    // ✅ Inicializar notificações em DEV e PROD
    initializeNotifications();
  }, []);

  // ✅ FUNÇÃO SIMPLES PARA INICIALIZAR APP CHECK
  const initializeAppCheck = async () => {
    try {
      if (!__DEV__ && appCheck) {
        // ✅ SÓ EM PRODUÇÃO E SE APP CHECK ESTIVER DISPONÍVEL
        console.log("🔒 Inicializando App Check...");

        // ✅ USAR O MÉTODO DEPRECADO MAS FUNCIONAL (por enquanto)
        if (!appCheck().isTokenAutoRefreshEnabled) {
          await appCheck().activate(
            null, // Play Integrity automático
            true // Força refresh
          );
          console.log("✅ App Check ativado com sucesso");
        }
      } else {
        console.log("🧪 DEV: App Check desabilitado em desenvolvimento");
      }
    } catch (error) {
      console.log("⚠️ Erro ao inicializar App Check:", error.message);
    }
  };

  const initializeNotifications = async () => {
    try {
      console.log("🔔 Inicializando serviço de notificações...");

      const { notificationService } = await import(
        "./services/notificationService"
      );

      notificationService.setupNotificationListeners();

      if (__DEV__) {
        console.log(
          "🧪 DEV: Tentando registrar notificações (pode dar warning)"
        );
      }

      await notificationService.registerForPushNotifications();

      console.log("✅ Notificações inicializadas com sucesso");
    } catch (error) {
      console.log("⚠️ Erro ao inicializar notificações:", error.message);

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
              <Toast config={toastConfig} />
            </TutorialProvider>
          </OrderProvider>
        </BadgeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default !__DEV__ ? Sentry.wrap(App) : App;

/* "googleSignIn": {
  "apiKey": "86807468256-khufgr65rjpdhsa5hvooesnm07shfulk.apps.googleusercontent.com"
}*/

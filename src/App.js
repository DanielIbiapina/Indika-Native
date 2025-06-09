import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./contexts/authContext";

import { theme } from "./styles/theme";
import AppNavigator from "./navigation/appNavigator"; // Importe o AppNavigator que você criou
import { StatusBar } from "expo-status-bar"; // Importar o StatusBar do Expo
import { OrderProvider } from "./contexts/orderContext";
import { TutorialProvider } from "./contexts/tutorialContext";

console.warn("O app carregou!"); // Essa mensagem aparecerá no logcat
export default function App() {
  console.warn("O App está rodando!");

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <OrderProvider>
          <TutorialProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </TutorialProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

/* "googleSignIn": {
  "apiKey": "86807468256-khufgr65rjpdhsa5hvooesnm07shfulk.apps.googleusercontent.com"
}*/

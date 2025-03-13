import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./contexts/authContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import { theme } from "./styles/theme";
import AppNavigator from "./navigation/appNavigator"; // Importe o AppNavigator que você criou
import { StatusBar } from "expo-status-bar"; // Importar o StatusBar do Expo
import { STRIPE_CONFIG } from "./config/stripe.config";
import { OrderProvider } from "./contexts/orderContext";

export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_CONFIG.publishableKey}
      merchantIdentifier="merchant.com.seuapp" // Para Apple Pay (opcional)
    >
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <OrderProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </StripeProvider>
  );
}

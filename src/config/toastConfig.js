// src/config/toastConfig.js
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#4CAF50",
        backgroundColor: "#E8F5E8",
        borderLeftWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#2E7D32",
      }}
      text2Style={{
        fontSize: 14,
        color: "#4CAF50",
        marginTop: 2,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#F44336",
        backgroundColor: "#FFEBEE",
        borderLeftWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#C62828",
      }}
      text2Style={{
        fontSize: 14,
        color: "#F44336",
        marginTop: 2,
      }}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#422680", // Cor principal do seu app
        backgroundColor: "#F3E5F5",
        borderLeftWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#422680",
      }}
      text2Style={{
        fontSize: 14,
        color: "#6A1B9A",
        marginTop: 2,
      }}
    />
  ),

  warning: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#FF9800",
        backgroundColor: "#FFF3E0",
        borderLeftWidth: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#E65100",
      }}
      text2Style={{
        fontSize: 14,
        color: "#FF9800",
        marginTop: 2,
      }}
    />
  ),
};

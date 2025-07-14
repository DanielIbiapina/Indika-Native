// ✅ PRODUÇÃO: Firebase nativo (APK) - NÃO MEXER!
// ✅ DEV: Firebase web (Expo Go) - APENAS PARA DESENVOLVIMENTO

let auth;

if (__DEV__) {
  // 🧪 DESENVOLVIMENTO: Firebase web para Expo Go
  try {
    const { initializeApp } = require("firebase/app");
    const { getAuth } = require("firebase/auth");

    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("🧪 DEV: Firebase web inicializado");
  } catch (error) {
    console.log("⚠️ DEV: Erro ao inicializar Firebase web:", error.message);
    // Fallback para simulação total
    auth = null;
  }
} else {
  // 🚀 PRODUÇÃO: Firebase nativo (APK) - MANTÉM IGUAL!
  auth = require("@react-native-firebase/auth").default;
  console.log("🚀 PROD: Firebase nativo inicializado");
}

export { auth };

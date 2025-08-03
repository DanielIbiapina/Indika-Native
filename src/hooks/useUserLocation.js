import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  // ✅ MELHORADO: Verificar permissão primeiro
  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
      return status;
    } catch (error) {
      console.error("📍 Erro ao verificar permissão:", error);
      return "denied";
    }
  };

  // ✅ MELHORADO: Solicitar permissão quando necessário
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        Alert.alert(
          "Permissão de Localização",
          "Para mostrar serviços da sua região, permita o acesso à localização.",
          [
            { text: "Agora não", style: "cancel" },
            {
              text: "Permitir",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }

      return status;
    } catch (error) {
      console.error("📍 Erro ao solicitar permissão:", error);
      setPermissionStatus("denied");
      return "denied";
    }
  };

  // ✅ MELHORADO: Detecção robusta de localização
  const detectLocation = async (requestPermissionIfNeeded = false) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar permissão
      let status = await checkLocationPermission();

      // Solicitar permissão se necessário e permitido
      if (status !== "granted" && requestPermissionIfNeeded) {
        status = await requestLocationPermission();
      }

      if (status !== "granted") {
        console.log("📍 Permissão de localização não concedida");
        setUserLocation(null);
        return null;
      }

      // ✅ MELHORADO: Timeout para evitar travamento (como na configuração)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      );

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 20000, // ✅ AUMENTADO: timeout interno
        mayShowUserSettingsDialog: true, // ✅ NOVO: permitir dialog de configurações
      });

      // ✅ MELHORADO: Race entre localização e timeout
      const { coords } = await Promise.race([locationPromise, timeoutPromise]);

      // ✅ MELHORADO: Reverse geocoding com timeout
      const reverseGeocodePromise = Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const reverseTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Reverse geocode timeout")), 15000)
      );

      const [address] = await Promise.race([
        reverseGeocodePromise,
        reverseTimeoutPromise,
      ]);

      if (address && address.city) {
        const locationData = {
          city: address.city,
          state: address.region || address.subregion,
          latitude: coords.latitude,
          longitude: coords.longitude,
          street: address.street,
          district: address.district,
        };

        setUserLocation(locationData);
        console.log("📍 Localização detectada:", locationData);
        return locationData;
      } else {
        throw new Error("Não foi possível obter endereço");
      }
    } catch (err) {
      console.log("📍 Erro ao detectar localização:", err.message);

      if (err.message === "Timeout") {
        setError("Tempo limite para obter localização");
      } else if (err.message === "Reverse geocode timeout") {
        setError("Tempo limite para obter endereço");
      } else {
        setError(err.message);
      }

      setUserLocation(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ MELHORADO: Auto-detectar localização no primeiro carregamento
  useEffect(() => {
    detectLocation(false); // Não solicitar permissão automaticamente
  }, []);

  return {
    userLocation,
    loading,
    error,
    permissionStatus,
    detectLocation, // para retentar manualmente
    requestPermission: () => detectLocation(true), // para solicitar permissão e detectar
  };
};

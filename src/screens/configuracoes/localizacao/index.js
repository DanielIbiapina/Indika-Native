import React, { useState, useEffect } from "react";
import { Alert, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { userService } from "../../../services/userService";
import {
  Container,
  Section,
  SectionTitle,
  LocationItem,
  TextContainer,
  ItemTitle,
  ItemDescription,
  Switch,
  LoadingSpinner,
  SaveButton,
  SaveButtonText,
  InfoMessage,
  PermissionButton,
  PermissionButtonText,
  AddressContainer,
  AddressText,
  RefreshButton,
} from "./styles";

const Localizacao = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [settings, setSettings] = useState({
    autoDetectLocation: true,
    shareLocation: true,
    preciseLocation: false,
    locationHistory: false,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadLocationSettings();
    checkLocationPermission();
  }, []);

  const loadLocationSettings = async () => {
    try {
      setLoading(true);
      const userSettings = await userService.getLocationSettings();
      setSettings(userSettings);
      if (userSettings.autoDetectLocation) {
        await updateCurrentLocation();
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar suas configurações de localização"
      );
    } finally {
      setLoading(false);
    }
  };

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationPermission(status);
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Para usar a localização automática, você precisa permitir o acesso à localização nas configurações do dispositivo.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Abrir Configurações",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      } else {
        await updateCurrentLocation();
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível solicitar permissão de localização"
      );
    }
  };

  const updateCurrentLocation = async () => {
    try {
      setRefreshing(true);
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: settings.preciseLocation
          ? Location.Accuracy.Highest
          : Location.Accuracy.Balanced,
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (address) {
        setCurrentAddress({
          street: address.street,
          district: address.district,
          city: address.city,
          region: address.region,
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar sua localização");
    } finally {
      setRefreshing(false);
    }
  };

  const handleToggle = async (key) => {
    if (key === "autoDetectLocation" && !settings[key]) {
      const permission = await Location.getForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        await requestLocationPermission();
        return;
      }
    }

    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await userService.updateLocationSettings(settings);
      Alert.alert("Sucesso", "Configurações de localização atualizadas!");
      setHasChanges(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar suas configurações");
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
        <SectionTitle>Configurações de Localização</SectionTitle>

        <LocationItem>
          <Ionicons name="locate-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Detectar automaticamente</ItemTitle>
            <ItemDescription>
              Atualizar localização automaticamente
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.autoDetectLocation}
            onValueChange={() => handleToggle("autoDetectLocation")}
          />
        </LocationItem>

        <LocationItem>
          <Ionicons name="map-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Compartilhar localização</ItemTitle>
            <ItemDescription>
              Mostrar sua localização para outros usuários
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.shareLocation}
            onValueChange={() => handleToggle("shareLocation")}
          />
        </LocationItem>

        <LocationItem>
          <Ionicons name="navigate-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Localização precisa</ItemTitle>
            <ItemDescription>Usar GPS para maior precisão</ItemDescription>
          </TextContainer>
          <Switch
            value={settings.preciseLocation}
            onValueChange={() => handleToggle("preciseLocation")}
          />
        </LocationItem>

        <LocationItem>
          <Ionicons name="time-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Histórico de localização</ItemTitle>
            <ItemDescription>Salvar histórico de localizações</ItemDescription>
          </TextContainer>
          <Switch
            value={settings.locationHistory}
            onValueChange={() => handleToggle("locationHistory")}
          />
        </LocationItem>
      </Section>

      {locationPermission !== "granted" && (
        <Section>
          <SectionTitle>Permissão de Localização</SectionTitle>
          <InfoMessage>
            Para usar todos os recursos de localização, é necessário permitir o
            acesso à sua localização.
          </InfoMessage>
          <PermissionButton onPress={requestLocationPermission}>
            <PermissionButtonText>
              Permitir Acesso à Localização
            </PermissionButtonText>
          </PermissionButton>
        </Section>
      )}

      {currentAddress && (
        <Section>
          <SectionTitle>Localização Atual</SectionTitle>
          <AddressContainer>
            <AddressText>
              {currentAddress.street}
              {currentAddress.district ? `, ${currentAddress.district}` : ""}
              {"\n"}
              {currentAddress.city}, {currentAddress.region}
            </AddressText>
            <RefreshButton
              onPress={updateCurrentLocation}
              disabled={refreshing}
            >
              <Ionicons
                name="refresh-outline"
                size={24}
                color={refreshing ? "#999" : "#422680"}
              />
            </RefreshButton>
          </AddressContainer>
        </Section>
      )}

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

export default Localizacao;

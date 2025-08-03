import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import {
  BRAZILIAN_STATES,
  getStateByName,
} from "../../constants/brazilianStates";
import {
  AreaButton,
  AreaButtonText,
  ModalContent,
  ModalHeader,
  ModalTitle,
  OptionButton,
  OptionContent,
  OptionTitle,
  OptionDescription,
  SectionTitle,
  SaveButton,
  SaveButtonText,
  CurrentLocation,
  CurrentLocationText,
  PickerContainer,
  LoadingContainer,
  LoadingText,
} from "./styles";

const ServiceAreaSelector = ({ serviceArea, onAreaChange, userLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState(serviceArea?.state || "");
  const [selectedCity, setSelectedCity] = useState(serviceArea?.city || "");
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Carregar cidades quando estado muda
  useEffect(() => {
    if (selectedState) {
      loadCitiesByState(selectedState);
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  const loadCitiesByState = async (stateCode) => {
    try {
      setLoadingCities(true);
      console.log(`🏙️ Carregando cidades de: ${stateCode}`);

      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar cidades");
      }

      const citiesData = await response.json();
      const cityNames = citiesData.map((city) => city.nome).sort();
      setCities(cityNames);

      console.log(`✅ ${cityNames.length} cidades carregadas`);
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar as cidades. Tente novamente."
      );
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  // ✅ MELHORADA: Versão robusta da detecção de localização
  const detectCurrentLocation = async () => {
    try {
      setDetectingLocation(true);

      // ✅ MELHORADO: Verificar permissão primeiro
      let { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        status = await Location.requestForegroundPermissionsAsync();
      }

      if (status !== "granted") {
        Alert.alert(
          "Permissão de Localização",
          "Para detectar automaticamente sua área de atuação, permita o acesso à localização.",
          [
            { text: "Agora não", style: "cancel" },
            {
              text: "Permitir",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }

      // ✅ MELHORADO: Timeout para evitar travamento
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      );

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 20000, // ✅ AUMENTADO: timeout interno
        mayShowUserSettingsDialog: true, // ✅ NOVO: permitir dialog de configurações
      });

      // ✅ MELHORADO: Race entre localização e timeout
      const location = await Promise.race([locationPromise, timeoutPromise]);

      // ✅ MELHORADO: Reverse geocoding com timeout
      const reverseGeocodePromise = Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const reverseTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Reverse geocode timeout")), 15000)
      );

      const [address] = await Promise.race([
        reverseGeocodePromise,
        reverseTimeoutPromise,
      ]);

      if (address?.region && address?.city) {
        const detectedState = getStateByName(address.region);

        if (detectedState) {
          setSelectedState(detectedState.code);
          setSelectedCity(address.city);

          Alert.alert(
            "Localização Detectada! 📍",
            `Área de atuação definida como: ${address.city}, ${detectedState.code}`,
            [{ text: "Ok" }]
          );
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível determinar o estado da sua localização"
          );
        }
      } else {
        throw new Error("Não foi possível obter endereço");
      }
    } catch (error) {
      console.error("Erro ao detectar localização:", error);

      let errorMessage = "Não foi possível detectar sua localização";

      if (error.message === "Timeout") {
        errorMessage = "Tempo limite para obter localização. Tente novamente.";
      } else if (error.message === "Reverse geocode timeout") {
        errorMessage = "Tempo limite para obter endereço. Tente novamente.";
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleSave = () => {
    if (!selectedState) {
      Alert.alert("Erro", "Selecione um estado");
      return;
    }

    if (!selectedCity) {
      Alert.alert("Erro", "Selecione uma cidade");
      return;
    }

    const newArea = {
      city: selectedCity,
      state: selectedState,
    };

    onAreaChange(newArea);
    setShowModal(false);
  };

  const getDisplayText = () => {
    if (serviceArea?.city && serviceArea?.state) {
      return `${serviceArea.city}, ${serviceArea.state}`;
    }
    return "Selecionar área de atuação";
  };

  return (
    <>
      <AreaButton onPress={() => setShowModal(true)}>
        <AreaButtonText>{getDisplayText()}</AreaButtonText>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </AreaButton>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Área de Atuação</ModalTitle>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </ModalHeader>

          <ScrollView style={{ flex: 1, padding: 20 }}>
            {/* Localização atual (se disponível) */}
            {userLocation?.city && (
              <CurrentLocation>
                <CurrentLocationText>
                  📍 Localização atual: {userLocation.city},{" "}
                  {userLocation.state}
                </CurrentLocationText>
              </CurrentLocation>
            )}

            {/* Botão detectar automaticamente */}
            <OptionButton
              onPress={detectCurrentLocation}
              disabled={detectingLocation}
            >
              <OptionContent>
                <Ionicons
                  name="location"
                  size={24}
                  color={detectingLocation ? "#ccc" : "#422680"}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <OptionTitle>
                    {detectingLocation
                      ? "Detectando..."
                      : "Detectar automaticamente"}
                  </OptionTitle>
                  <OptionDescription>
                    Usar GPS para detectar sua localização atual
                  </OptionDescription>
                </View>
                {detectingLocation && <ActivityIndicator color="#422680" />}
              </OptionContent>
            </OptionButton>

            {/* Seleção manual */}
            <SectionTitle>Ou selecione manualmente:</SectionTitle>

            {/* Picker de Estado */}
            <SectionTitle>Estado:</SectionTitle>
            <PickerContainer>
              <Picker
                selectedValue={selectedState}
                onValueChange={setSelectedState}
                style={{ height: 50, color: "#333" }}
              >
                <Picker.Item label="Selecione um estado" value="" />
                {BRAZILIAN_STATES.map((state) => (
                  <Picker.Item
                    key={state.code}
                    label={state.name}
                    value={state.code}
                  />
                ))}
              </Picker>
            </PickerContainer>

            {/* Picker de Cidade */}
            <SectionTitle>Cidade:</SectionTitle>
            <PickerContainer>
              {loadingCities ? (
                <LoadingContainer>
                  <ActivityIndicator color="#422680" />
                  <LoadingText>Carregando cidades...</LoadingText>
                </LoadingContainer>
              ) : (
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={setSelectedCity}
                  enabled={cities.length > 0}
                  style={{
                    height: 50,
                    color: cities.length > 0 ? "#333" : "#ccc",
                  }}
                >
                  <Picker.Item
                    label={
                      selectedState
                        ? "Selecione uma cidade"
                        : "Primeiro selecione um estado"
                    }
                    value=""
                  />
                  {cities.map((city) => (
                    <Picker.Item key={city} label={city} value={city} />
                  ))}
                </Picker>
              )}
            </PickerContainer>

            <SaveButton onPress={handleSave}>
              <SaveButtonText>Salvar Área</SaveButtonText>
            </SaveButton>
          </ScrollView>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServiceAreaSelector;

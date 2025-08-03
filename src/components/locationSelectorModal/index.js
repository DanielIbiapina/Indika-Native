import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import {
  BRAZILIAN_STATES,
  getStateByName,
} from "../../constants/brazilianStates";
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  SectionTitle,
  PickerContainer,
  LoadingContainer,
  LoadingText,
  CurrentLocationCard,
  CurrentLocationTitle,
  CurrentLocationText,
  ButtonsContainer,
  ApplyButton,
  ApplyButtonText,
  CancelButton,
  CancelButtonText,
  DetectButton,
  DetectButtonText,
} from "./styles";

const LocationSelectorModal = ({
  visible,
  currentLocation,
  onLocationChange,
  onClose,
}) => {
  const [selectedState, setSelectedState] = useState(
    currentLocation?.state || ""
  );
  const [selectedCity, setSelectedCity] = useState(currentLocation?.city || "");
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

  const detectCurrentLocation = async () => {
    try {
      setDetectingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos do GPS para detectar sua localização automaticamente"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address && address.city && address.region) {
        // Encontrar código do estado
        const stateData = getStateByName(address.region);
        const stateCode = stateData?.code || address.region;

        setSelectedState(stateCode);
        setSelectedCity(address.city);

        Alert.alert(
          "Localização detectada!",
          `${address.city}, ${address.region}`
        );
      } else {
        Alert.alert(
          "Ops!",
          "Não conseguimos detectar sua cidade. Selecione manualmente."
        );
      }
    } catch (error) {
      console.error("Erro ao detectar localização:", error);
      Alert.alert(
        "Erro",
        "Não foi possível detectar sua localização. Selecione manualmente."
      );
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleApply = () => {
    if (!selectedState) {
      Alert.alert("Atenção", "Selecione pelo menos um estado");
      return;
    }

    const stateData = BRAZILIAN_STATES.find((s) => s.code === selectedState);

    const newLocation = {
      state: selectedState,
      stateName: stateData?.name || selectedState,
      city: selectedCity || null,
      latitude: null,
      longitude: null,
    };

    console.log("📍 Nova localização selecionada:", newLocation);
    onLocationChange(newLocation);
  };

  const getSelectedStateName = () => {
    const stateData = BRAZILIAN_STATES.find((s) => s.code === selectedState);
    return stateData?.name || selectedState;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Escolher Localização</ModalTitle>
          <CloseButton onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {/* Localização atual */}
          {currentLocation?.city && (
            <CurrentLocationCard>
              <CurrentLocationTitle>Localização atual:</CurrentLocationTitle>
              <CurrentLocationText>
                {currentLocation.city},{" "}
                {currentLocation.stateName || currentLocation.state}
              </CurrentLocationText>
            </CurrentLocationCard>
          )}

          {/* Detectar automaticamente */}
          <DetectButton
            onPress={detectCurrentLocation}
            disabled={detectingLocation}
          >
            <Ionicons
              name={detectingLocation ? "sync" : "location"}
              size={20}
              color="#422680"
            />
            <DetectButtonText>
              {detectingLocation ? "Detectando..." : "Detectar automaticamente"}
            </DetectButtonText>
          </DetectButton>

          {/* Seletor de Estado */}
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

          {/* Seletor de Cidade */}
          {selectedState && (
            <>
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
                    enabled={!loadingCities}
                  >
                    <Picker.Item
                      label={`Todas as cidades de ${getSelectedStateName()}`}
                      value=""
                    />
                    {cities.map((city) => (
                      <Picker.Item key={city} label={city} value={city} />
                    ))}
                  </Picker>
                )}
              </PickerContainer>
            </>
          )}
        </ModalContent>

        <ButtonsContainer>
          <ApplyButton
            onPress={handleApply}
            disabled={!selectedState || detectingLocation}
          >
            <ApplyButtonText>
              {selectedCity
                ? `Ver serviços em ${selectedCity}`
                : selectedState
                ? `Ver serviços em ${getSelectedStateName()}`
                : "Aplicar Filtro"}
            </ApplyButtonText>
          </ApplyButton>

          <CancelButton onPress={onClose}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CancelButton>
        </ButtonsContainer>
      </ModalContainer>
    </Modal>
  );
};

export default LocationSelectorModal;

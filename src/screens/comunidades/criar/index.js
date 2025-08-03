import React, { useState } from "react";
import {
  Switch as RNSwitch,
  Text,
  Alert,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Linking } from "react-native";
import { communityService } from "../../../services/communityService";
import {
  Container,
  ScrollContainer,
  Form,
  Input,
  TextArea,
  SwitchContainer,
  SwitchLabel,
  Button,
  ErrorMessage,
} from "./styles";
import ImageUpload from "../../../components/imageUpload";
import ServiceAreaSelector from "../../../components/serviceAreaSelector";
import { emitCommunityCreated } from "../../../utils/eventEmitter";

const CriarComunidade = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    isPrivate: false,
    categories: [],
    // ✅ NOVO: Campos de localização
    city: "",
    state: "",
  });

  // ✅ NOVA FUNÇÃO: Detectar localização do usuário
  const detectUserLocation = async () => {
    try {
      setLocationLoading(true);

      // Verificar permissão primeiro
      let { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        status = await Location.requestForegroundPermissionsAsync();
      }

      if (status !== "granted") {
        Alert.alert(
          "Permissão de Localização",
          "Para definir automaticamente a localização da comunidade, permita o acesso à localização.",
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

      // Timeout para evitar travamento
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      );

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 20000,
        mayShowUserSettingsDialog: true,
      });

      const location = await Promise.race([locationPromise, timeoutPromise]);

      // Reverse geocoding com timeout
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

      if (address) {
        setFormData((prev) => ({
          ...prev,
          city: address.city,
          state: address.region || address.subregion,
        }));

        Alert.alert(
          "Localização Detectada! 📍",
          `Localização da comunidade definida como: ${address.city}, ${
            address.region || address.subregion
          }`,
          [{ text: "Ok" }]
        );
      } else {
        throw new Error("Não foi possível obter endereço");
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);

      let errorMessage = "Não foi possível obter sua localização";

      if (error.message === "Timeout") {
        errorMessage = "Tempo limite para obter localização. Tente novamente.";
      } else if (error.message === "Reverse geocode timeout") {
        errorMessage = "Tempo limite para obter endereço. Tente novamente.";
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  // ✅ NOVA FUNÇÃO: Lidar com mudança de área de serviço
  const handleLocationChange = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      city: locationData.city,
      state: locationData.state,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // Adiciona a imagem se houver uma nova
      if (formData.image?.uri) {
        formDataToSend.append("image", {
          uri: formData.image.uri,
          type: formData.image.type || "image/jpeg",
          name: formData.image.fileName || "community-image.jpg",
        });
      }

      // Adiciona os outros dados da comunidade
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPrivate", formData.isPrivate);
      formDataToSend.append("categories", JSON.stringify(formData.categories));

      // ✅ NOVO: Adicionar localização
      if (formData.city && formData.state) {
        formDataToSend.append("city", formData.city);
        formDataToSend.append("state", formData.state);
      }

      const response = await communityService.create(formDataToSend);

      // 🎯 EMITIR EVENTO
      emitCommunityCreated(response);

      navigation.replace("ComunidadeDetalhes", { id: response.id });
    } catch (err) {
      console.error("Erro ao criar:", err);
      setError(err.message || "Erro ao criar comunidade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollContainer>
        <Form>
          <ImageUpload
            value={formData.image}
            onChange={handleImageChange}
            maxSize={5}
            label="Capa da Comunidade"
          />

          <Input
            placeholder="Nome da comunidade"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <TextArea
            placeholder="Descrição da comunidade"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
            numberOfLines={4}
          />

          {/* ✅ NOVO: Seção de Localização */}
          <View style={{ marginVertical: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Localização da Comunidade
              </Text>

              <TouchableOpacity
                onPress={detectUserLocation}
                disabled={locationLoading}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#422680",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                {locationLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons name="locate" size={16} color="#fff" />
                )}
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    marginLeft: 4,
                  }}
                >
                  {locationLoading ? "Detectando..." : "Detectar"}
                </Text>
              </TouchableOpacity>
            </View>

            <ServiceAreaSelector
              selectedArea={{
                city: formData.city,
                state: formData.state,
              }}
              onAreaChange={handleLocationChange}
              placeholder="Selecione a cidade da comunidade"
            />

            {formData.city && formData.state && (
              <View
                style={{
                  backgroundColor: "#e8f5e8",
                  padding: 8,
                  borderRadius: 6,
                  marginTop: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="location" size={16} color="#4caf50" />
                <Text
                  style={{
                    color: "#2e7d32",
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  Comunidade de {formData.city}, {formData.state}
                </Text>
              </View>
            )}
          </View>

          {/*<SwitchContainer>
            <RNSwitch
              value={formData.isPrivate}
              onValueChange={(value) => handleChange("isPrivate", value)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={formData.isPrivate ? "#422680" : "#f4f3f4"}
            />
            <SwitchLabel>Comunidade privada</SwitchLabel>
          </SwitchContainer>*/}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button onPress={handleSubmit} disabled={loading}>
            <Text style={{ color: "white" }}>
              {loading ? "Criando..." : "Criar Comunidade"}
            </Text>
          </Button>
        </Form>
      </ScrollContainer>
    </Container>
  );
};

export default CriarComunidade;

import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { userService } from "../../../services/userService";
import {
  Container,
  Section,
  SectionTitle,
  PrivacyItem,
  TextContainer,
  ItemTitle,
  ItemDescription,
  Switch,
  LoadingSpinner,
  SaveButton,
  SaveButtonText,
  InfoMessage,
} from "./styles";

const VisibilidadePerfil = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showRatings: true,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPrivacySettings();
  }, []);

  const loadPrivacySettings = async () => {
    try {
      setLoading(true);
      const userSettings = await userService.getPrivacySettings();
      setSettings(userSettings);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar suas configurações de privacidade"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await userService.updatePrivacySettings(settings);
      Alert.alert("Sucesso", "Configurações de privacidade atualizadas!");
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
        <SectionTitle>Visibilidade do Perfil</SectionTitle>

        <PrivacyItem>
          <Ionicons name="globe-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Perfil público</ItemTitle>
            <ItemDescription>
              Seu perfil pode ser encontrado por outros usuários
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.profilePublic}
            onValueChange={() => handleToggle("profilePublic")}
          />
        </PrivacyItem>

        <PrivacyItem>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Mostrar e-mail</ItemTitle>
            <ItemDescription>
              Seu e-mail ficará visível no seu perfil
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.showEmail}
            onValueChange={() => handleToggle("showEmail")}
          />
        </PrivacyItem>

        <PrivacyItem>
          <Ionicons name="call-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Mostrar telefone</ItemTitle>
            <ItemDescription>
              Seu telefone ficará visível no seu perfil
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.showPhone}
            onValueChange={() => handleToggle("showPhone")}
          />
        </PrivacyItem>

        <PrivacyItem>
          <Ionicons name="location-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Mostrar localização</ItemTitle>
            <ItemDescription>
              Sua cidade/estado ficará visível no seu perfil
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.showLocation}
            onValueChange={() => handleToggle("showLocation")}
          />
        </PrivacyItem>

        <PrivacyItem>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Permitir mensagens</ItemTitle>
            <ItemDescription>
              Outros usuários podem enviar mensagens para você
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.allowMessages}
            onValueChange={() => handleToggle("allowMessages")}
          />
        </PrivacyItem>

        <PrivacyItem>
          <Ionicons name="star-outline" size={24} color="#666" />
          <TextContainer>
            <ItemTitle>Mostrar avaliações</ItemTitle>
            <ItemDescription>
              Suas avaliações ficarão visíveis no seu perfil
            </ItemDescription>
          </TextContainer>
          <Switch
            value={settings.showRatings}
            onValueChange={() => handleToggle("showRatings")}
          />
        </PrivacyItem>
      </Section>

      <InfoMessage>
        Estas configurações ajudam a controlar quais informações são visíveis
        para outros usuários do aplicativo.
      </InfoMessage>

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

export default VisibilidadePerfil;

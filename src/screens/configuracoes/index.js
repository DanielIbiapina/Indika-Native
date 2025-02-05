import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/authContext";
import {
  Container,
  ScrollView,
  Section,
  SectionTitle,
  MenuItem,
  MenuItemText,
  VersionInfo,
  VersionText,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

const Configuracoes = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <Container>
      <ScrollView>
        {/* Conta */}
        <Section>
          <SectionTitle>Conta</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("DadosPessoais")}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <MenuItemText>Dados Pessoais</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("Seguranca")}>
            <Ionicons name="shield-outline" size={24} color="#666" />
            <MenuItemText>Segurança</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
        </Section>

        {/* Preferências */}
        <Section>
          <SectionTitle>Preferências</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("Notificacoes")}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <MenuItemText>Notificações</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("Idioma")}>
            <Ionicons name="language-outline" size={24} color="#666" />
            <MenuItemText>Idioma</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
        </Section>

        {/* Privacidade */}
        <Section>
          <SectionTitle>Privacidade</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("VisibilidadePerfil")}>
            <Ionicons name="eye-outline" size={24} color="#666" />
            <MenuItemText>Visibilidade do Perfil</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("Localizacao")}>
            <Ionicons name="location-outline" size={24} color="#666" />
            <MenuItemText>Localização</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
        </Section>

        {/* Suporte */}
        <Section>
          <SectionTitle>Suporte</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("CentralAjuda")}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <MenuItemText>Central de Ajuda</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("TermosUso")}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <MenuItemText>Termos de Uso</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate("PoliticaPrivacidade")}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <MenuItemText>Política de Privacidade</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
        </Section>

        {/* Versão do App */}
        <VersionInfo>
          <VersionText>Versão 1.0.0</VersionText>
        </VersionInfo>
      </ScrollView>
    </Container>
  );
};

export default Configuracoes;

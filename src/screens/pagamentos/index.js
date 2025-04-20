import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ScrollView,
  Section,
  SectionTitle,
  MenuItem,
  MenuItemText,
} from "./styles";

const Pagamentos = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ScrollView>
        <Section>
          <SectionTitle>Histórico e Movimentações</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("HistoricoPagamento")}>
            <Ionicons name="time-outline" size={24} color="#666" />
            <MenuItemText>Histórico de Pagamentos</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
          {/*<MenuItem onPress={() => navigation.navigate("Saques")}>
            <Ionicons name="cash-outline" size={24} color="#666" />
            <MenuItemText>Realizar Saque</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>*/}
        </Section>

        <Section>
          <SectionTitle>Configurações de Pagamento</SectionTitle>
          <MenuItem onPress={() => navigation.navigate("ConfigurarPagamento")}>
            <Ionicons name="card-outline" size={24} color="#666" />
            <MenuItemText>Configurar Recebimentos</MenuItemText>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </MenuItem>
        </Section>
      </ScrollView>
    </Container>
  );
};

export default Pagamentos;

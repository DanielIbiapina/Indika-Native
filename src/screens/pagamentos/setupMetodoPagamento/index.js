import React from "react";
import { Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ScrollContent,
  ContentCard,
  InstructionItem,
  InstructionNumber,
  InstructionText,
  MPButton,
  MPButtonText,
  TipCard,
  TipText,
  InfoSection,
  InfoText,
} from "./styles";

const MP_URL = "https://www.mercadopago.com.br/home";

const SetupMetodoPagamento = () => {
  const handleOpenMP = () => {
    Linking.openURL(MP_URL);
  };

  return (
    <Container>
      <ScrollView>
        <ScrollContent>
          <ContentCard>
            <InstructionItem>
              <InstructionNumber>1</InstructionNumber>
              <InstructionText>
                Acesse sua conta no Mercado Pago
              </InstructionText>
            </InstructionItem>

            <InstructionItem>
              <InstructionNumber>2</InstructionNumber>
              <InstructionText>
                Configure sua conta bancária para recebimentos
              </InstructionText>
            </InstructionItem>

            <InstructionItem>
              <InstructionNumber>3</InstructionNumber>
              <InstructionText>
                Defina suas preferências de transferência automática
              </InstructionText>
            </InstructionItem>

            <MPButton onPress={handleOpenMP}>
              <Ionicons name="open-outline" size={24} color="#FFF" />
              <MPButtonText>Abrir Mercado Pago</MPButtonText>
            </MPButton>
          </ContentCard>

          <TipCard>
            <Ionicons name="bulb-outline" size={24} color="#422680" />
            <TipText>
              Dica: Ative as transferências automáticas para receber seu
              dinheiro assim que estiver disponível
            </TipText>
          </TipCard>

          <InfoSection>
            <InfoText>
              Todos os pagamentos são processados de forma segura através do
              Mercado Pago. O dinheiro fica disponível na sua conta em até 14
              dias após a conclusão do serviço.
            </InfoText>
          </InfoSection>
        </ScrollContent>
      </ScrollView>
    </Container>
  );
};

export default SetupMetodoPagamento;

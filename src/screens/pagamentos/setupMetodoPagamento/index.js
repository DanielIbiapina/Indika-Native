import React, { useState, useEffect } from "react";
import { Linking, ScrollView, Switch, Alert } from "react-native";
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
  MethodSection,
  MethodHeader,
  MethodTitle,
  MethodInput,
  MethodInputLabel,
  SaveButton,
  SaveButtonText,
  PixTypeSelector,
  PixTypeSelectorText,
  PixTypeLabel,
} from "./styles";
import { paymentService } from "../../../services/paymentService";

const MP_URL = "https://www.mercadopago.com.br/home";

const PIX_KEY_TYPES = [
  { value: "CPF", label: "CPF" },
  { value: "CNPJ", label: "CNPJ" },
  { value: "EMAIL", label: "E-mail" },
  { value: "PHONE", label: "Telefone" },
  { value: "RANDOM", label: "Chave Aleatória" },
];

const SetupMetodoPagamento = () => {
  const [methods, setMethods] = useState({
    pix: false,
    cash: true,
    mercadopago: false,
  });
  const [pixConfig, setPixConfig] = useState({
    key: "",
    keyType: "CPF",
    holderName: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const response = await paymentService.getPaymentMethod();
      if (response?.data) {
        const pixMethod = response.data.details?.methods?.find(
          (m) => m.type === "pix"
        );
        const mpMethod = response.data.details?.methods?.find(
          (m) => m.type === "mercadopago"
        );

        setMethods((prev) => ({
          ...prev,
          pix: !!pixMethod,
          mercadopago: !!mpMethod,
        }));

        if (pixMethod?.details) {
          setPixConfig(pixMethod.details);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar métodos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMP = () => {
    Linking.openURL(MP_URL);
  };

  const handleSaveSettings = async () => {
    try {
      if (methods.pix) {
        if (!pixConfig.key || !pixConfig.keyType || !pixConfig.holderName) {
          Alert.alert("Erro", "Por favor, preencha todos os dados do PIX");
          return;
        }
      }

      const paymentMethods = [];

      if (methods.pix) {
        paymentMethods.push({
          type: "pix",
          details: pixConfig,
        });
      }

      if (methods.mercadopago) {
        paymentMethods.push({
          type: "mercadopago",
        });
      }

      if (methods.cash) {
        paymentMethods.push({
          type: "cash",
        });
      }

      await paymentService.setupPaymentMethod(paymentMethods);
      Alert.alert("Sucesso", "Configurações de pagamento atualizadas!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as configurações");
    }
  };

  return (
    <Container>
      <ScrollView>
        <ScrollContent>
          <ContentCard>
            <InstructionItem>
              <InstructionNumber>1</InstructionNumber>
              <InstructionText>
                Selecione os métodos de pagamento que deseja aceitar
              </InstructionText>
            </InstructionItem>

            <MethodSection>
              <MethodHeader>
                <MethodTitle>PIX</MethodTitle>
                <Switch
                  value={methods.pix}
                  onValueChange={(value) =>
                    setMethods((prev) => ({ ...prev, pix: value }))
                  }
                />
              </MethodHeader>
              {methods.pix && (
                <>
                  <MethodInputLabel>Tipo de Chave PIX</MethodInputLabel>
                  <PixTypeSelector>
                    {PIX_KEY_TYPES.map((type) => (
                      <PixTypeSelectorText
                        key={type.value}
                        selected={pixConfig.keyType === type.value}
                        onPress={() =>
                          setPixConfig((prev) => ({
                            ...prev,
                            keyType: type.value,
                          }))
                        }
                      >
                        <PixTypeLabel
                          selected={pixConfig.keyType === type.value}
                        >
                          {type.label}
                        </PixTypeLabel>
                      </PixTypeSelectorText>
                    ))}
                  </PixTypeSelector>

                  <MethodInputLabel>Chave PIX</MethodInputLabel>
                  <MethodInput
                    value={pixConfig.key}
                    onChangeText={(text) =>
                      setPixConfig((prev) => ({ ...prev, key: text }))
                    }
                    placeholder={`Digite sua chave PIX (${pixConfig.keyType})`}
                  />

                  <MethodInputLabel>Nome do Titular</MethodInputLabel>
                  <MethodInput
                    value={pixConfig.holderName}
                    onChangeText={(text) =>
                      setPixConfig((prev) => ({ ...prev, holderName: text }))
                    }
                    placeholder="Digite o nome do titular da chave"
                  />
                </>
              )}
            </MethodSection>

            <MethodSection>
              <MethodHeader>
                <MethodTitle>Dinheiro</MethodTitle>
                <Switch value={true} disabled={true} />
              </MethodHeader>
            </MethodSection>

            <MethodSection>
              <MethodHeader>
                <MethodTitle>Mercado Pago (Parcelado)</MethodTitle>
                <Switch
                  value={methods.mercadopago}
                  onValueChange={(value) =>
                    setMethods((prev) => ({ ...prev, mercadopago: value }))
                  }
                />
              </MethodHeader>
              {methods.mercadopago && (
                <MPButton onPress={handleOpenMP}>
                  <Ionicons name="open-outline" size={24} color="#FFF" />
                  <MPButtonText>Configurar no Mercado Pago</MPButtonText>
                </MPButton>
              )}
            </MethodSection>

            <SaveButton onPress={handleSaveSettings}>
              <SaveButtonText>Salvar Configurações</SaveButtonText>
            </SaveButton>
          </ContentCard>

          <TipCard>
            <Ionicons name="bulb-outline" size={24} color="#422680" />
            <TipText>
              Dica: Ofereça múltiplas opções de pagamento para atender
              diferentes preferências dos clientes
            </TipText>
          </TipCard>

          <InfoSection>
            <InfoText>
              Você pode alterar suas configurações de pagamento a qualquer
              momento. Pagamentos via Mercado Pago têm uma taxa de
              processamento.
            </InfoText>
          </InfoSection>
        </ScrollContent>
      </ScrollView>
    </Container>
  );
};

export default SetupMetodoPagamento;

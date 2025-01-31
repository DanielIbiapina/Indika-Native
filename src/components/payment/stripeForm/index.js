import React from "react";
import { ActivityIndicator, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Title,
  InfoContainer,
  InfoText,
  BulletPoint,
  Bullet,
  BulletText,
  ConnectButton,
  ButtonText,
  DisconnectButton,
  DisconnectText,
} from "./styles";

const StripeForm = ({
  onConnect,
  onDisconnect,
  loading,
  connected,
  stripeUrl,
}) => {
  const handleConnect = async () => {
    if (connected) {
      return;
    }

    if (stripeUrl) {
      await Linking.openURL(stripeUrl);
      onConnect();
    }
  };

  return (
    <Container>
      <Title>Stripe Connect</Title>

      <InfoContainer>
        <InfoText>Com o Stripe Connect, você pode:</InfoText>
        <BulletPoint>
          <Bullet />
          <BulletText>Receber pagamentos internacionais</BulletText>
        </BulletPoint>
        <BulletPoint>
          <Bullet />
          <BulletText>Aceitar principais cartões de crédito</BulletText>
        </BulletPoint>
        <BulletPoint>
          <Bullet />
          <BulletText>
            Transferir para sua conta bancária em 2 dias úteis
          </BulletText>
        </BulletPoint>
      </InfoContainer>

      {connected ? (
        <>
          <ConnectButton disabled>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <ButtonText>Conectado ao Stripe</ButtonText>
          </ConnectButton>
          <DisconnectButton onPress={onDisconnect} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.colors.error} />
            ) : (
              <DisconnectText>Desconectar conta</DisconnectText>
            )}
          </DisconnectButton>
        </>
      ) : (
        <ConnectButton onPress={handleConnect} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="logo-stripe" size={24} color="#fff" />
              <ButtonText>Conectar com Stripe</ButtonText>
            </>
          )}
        </ConnectButton>
      )}
    </Container>
  );
};

export default StripeForm;

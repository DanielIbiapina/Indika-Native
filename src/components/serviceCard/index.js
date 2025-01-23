import React from "react";
import { Card, Icon, Title } from "./styles";
import { useNavigation } from "@react-navigation/native"; // React Navigation em vez de useNavigate

const ServiceCard = ({ icon, title }) => {
  const navigation = useNavigation();

  return (
    <Card onPress={() => navigation.navigate("ServicoDetalhes", { title })}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Card>
  );
};

export default ServiceCard;

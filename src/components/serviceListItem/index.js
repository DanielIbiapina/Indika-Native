import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  ServiceImage,
  ServiceInfo,
  Title,
  Rating,
  Price,
  Description,
} from "./styles";

const ServiceListItem = ({ service }) => {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => navigation.navigate("ServicoDetalhes", { id: service.id })}
    >
      <ServiceImage source={{ uri: service.images[0] }} resizeMode="cover" />
      <ServiceInfo>
        <Title numberOfLines={1}>{service.title}</Title>
        <Rating>
          <Feather name="star" size={12} color="#FFB800" />
          <Rating.Text>
            {service.rating?.toFixed(1) || "0.0"} ({service.totalRatings || 0})
          </Rating.Text>
        </Rating>
        {/* ❌ REMOVIDO: <Price>A partir de R$ {service.priceStartingAt}</Price> */}
        <Description numberOfLines={2}>{service.description}</Description>
      </ServiceInfo>
    </Container>
  );
};

export default ServiceListItem;

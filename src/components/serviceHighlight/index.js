import React from "react";
import { Text } from "react-native"; // Adicionar importação do Text
import { useNavigation } from "@react-navigation/native"; // React Navigation para navegação em React Native
import {
  Card,
  ServiceImage,
  ServiceInfo,
  Title,
  Rating,
  Price,
  Description,
} from "./styles";
import { Feather } from "@expo/vector-icons"; // Utilizando ícones do Expo

const ServiceHighlight = ({
  id,
  title,
  image,
  provider,
  stats,
  price,
  description,
}) => {
  const navigation = useNavigation();
  console.log(stats);
  return (
    <Card onPress={() => navigation.navigate("ServicoDetalhes", { id })}>
      <ServiceImage source={{ uri: image }} resizeMode="cover" />
      <ServiceInfo>
        <Title numberOfLines={2}>{title}</Title>
        <Rating>
          <Feather name="star" size={12} color="#FFB800" />
          <Text style={{ fontSize: 12, color: "#666" }}>
            {stats.averageRating.toFixed(1)} ({stats.totalReviews} avaliações)
          </Text>
        </Rating>
        <Price>{price}</Price>
        <Description numberOfLines={1}>{description}</Description>
      </ServiceInfo>
    </Card>
  );
};

export default ServiceHighlight;

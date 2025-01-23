import React from "react";
import { useNavigation } from "@react-navigation/native"; // React Navigation para navegação em React Native
import { Text } from "react-native";
import {
  Card,
  ServiceImage,
  ServiceInfo,
  Title,
  Rating,
  RatingText,
  Price,
  Description,
} from "./styles";
import { Feather } from "@expo/vector-icons"; // Utilizando ícones do Expo

const ServiceCategoryCard = ({
  id,
  title,
  image,
  provider,
  stats,
  price,
  description,
}) => {
  const navigation = useNavigation();

  return (
    <Card onPress={() => navigation.navigate("ServicoDetalhes", { id })}>
      <ServiceImage source={{ uri: image }} resizeMode="cover" />
      <ServiceInfo>
        <Title numberOfLines={2}>{title}</Title>
        <Rating>
          <Feather name="star" size={12} color="#FFB800" />
          <RatingText>
            {stats.averageRating.toFixed(1)} ({stats.totalReviews})
          </RatingText>
        </Rating>
        <Price>{price}</Price>
        <Description numberOfLines={1}>{description}</Description>
      </ServiceInfo>
    </Card>
  );
};

export default ServiceCategoryCard;

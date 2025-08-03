import React from "react";
import { useNavigation } from "@react-navigation/native";
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
import { Feather } from "@expo/vector-icons";

const ServiceHighlight = ({
  id,
  title,
  image,
  provider,
  stats = { averageRating: 0, totalReviews: 0 },
  // price, // ❌ REMOVIDO
  description,
  onPress,
  testID,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    navigation.navigate("ServicoDetalhes", { id });
  };

  const formatRating = (rating) => {
    return Number(rating).toFixed(1);
  };

  return (
    <Card onPress={handlePress} testID={testID}>
      <ServiceImage
        source={{ uri: image }}
        resizeMode="cover"
        testID={`${testID}-image`}
      />
      <ServiceInfo>
        <Title numberOfLines={2}>{title}</Title>
        <Rating>
          <Feather name="star" size={12} color="#FFB800" />
          <RatingText>
            {formatRating(stats.averageRating)} ({stats.totalReviews}{" "}
            avaliações)
          </RatingText>
        </Rating>
        {/* ❌ REMOVIDO: <Price>{price}</Price> */}
        <Description numberOfLines={1}>{description}</Description>
      </ServiceInfo>
    </Card>
  );
};

export default ServiceHighlight;

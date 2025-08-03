import React from "react";
import { useNavigation } from "@react-navigation/native"; // React Navigation para navegação em React Native
import { Text, View } from "react-native";
import {
  Card,
  ServiceImage,
  ServiceInfo,
  Title,
  Rating,
  RatingText,
  Price,
  Description,
  SubcategoriesContainer,
  SubcategoryTag,
  SubcategoryTagText,
} from "./styles";
import { Feather } from "@expo/vector-icons"; // Utilizando ícones do Expo

const ServiceCategoryCard = ({
  id,
  title,
  image,
  provider,
  stats,
  // price, // ❌ REMOVIDO
  description,
  subcategories = [],
}) => {
  const navigation = useNavigation();

  return (
    <Card onPress={() => navigation.navigate("ServicoDetalhes", { id })}>
      <ServiceImage source={{ uri: image }} resizeMode="cover" />
      <ServiceInfo>
        <Title numberOfLines={2}>{title}</Title>

        {subcategories && subcategories.length > 0 && (
          <SubcategoriesContainer>
            {subcategories.slice(0, 2).map((subcategory, index) => (
              <SubcategoryTag key={index}>
                <SubcategoryTagText>{subcategory}</SubcategoryTagText>
              </SubcategoryTag>
            ))}
            {subcategories.length > 2 && (
              <SubcategoryTag>
                <SubcategoryTagText>
                  +{subcategories.length - 2}
                </SubcategoryTagText>
              </SubcategoryTag>
            )}
          </SubcategoriesContainer>
        )}

        <Rating>
          <Feather name="star" size={12} color="#FFB800" />
          <RatingText>
            {stats.averageRating.toFixed(1)} ({stats.totalReviews})
          </RatingText>
        </Rating>
        {/* ❌ REMOVIDO: <Price>{price}</Price> */}
        <Description numberOfLines={1}>{description}</Description>
      </ServiceInfo>
    </Card>
  );
};

export default ServiceCategoryCard;

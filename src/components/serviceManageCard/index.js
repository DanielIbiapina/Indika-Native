import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Usando ícones do Expo
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  CardPressable,
  ServiceImage,
  ServiceInfo,
  ServiceHeader,
  Title,
  CategoryBadge,
  CategoryText,
  ServiceStats,
  Price,
  StatsRow,
  Rating,
  RatingText,
  StatusBadge,
  StatusText,
  Actions,
  ActionButton,
  ActionButtonText,
  ImagePlaceholder,
  ServiceFooter,
  QuickActions,
  QuickActionButton,
} from "./styles";

const ServiceManageCard = ({ service, onEdit, onDelete, testID }) => {
  const navigation = useNavigation();
  const {
    id,
    images,
    title,
    category,
    // priceStartingAt, // ❌ REMOVIDO
    // priceUnit, // ❌ REMOVIDO
    rating = 0,
    totalRatings = 0,
    isActive = true,
  } = service;

  const handlePress = () => {
    navigation.navigate("ServicoDetalhes", { id });
  };

  return (
    <Card testID={testID}>
      <CardPressable onPress={handlePress}>
        {/* Imagem menor */}
        {images?.[0] ? (
          <ServiceImage source={{ uri: images[0] }} />
        ) : (
          <ImagePlaceholder>
            <Ionicons name="image-outline" size={24} color="#ccc" />
          </ImagePlaceholder>
        )}

        <ServiceInfo>
          <ServiceHeader>
            <Title numberOfLines={1}>{title}</Title>
            {/* <StatusBadge isActive={isActive}>
              <StatusText isActive={isActive}>
                { isActive ? "●" : "○" }
              </StatusText>
            </StatusBadge> */}
          </ServiceHeader>

          <CategoryText>{category}</CategoryText>

          <ServiceFooter>
            {/* ❌ REMOVIDO: <Price>R$ {priceStartingAt?.toFixed(2)?.replace(".", ",")}</Price> */}
            <Rating>
              <Ionicons name="star" size={12} color="#FFC107" />
              <RatingText>{rating > 0 ? rating.toFixed(1) : "0.0"}</RatingText>
            </Rating>
          </ServiceFooter>
        </ServiceInfo>

        {/* Ações inline e discretas */}
        <QuickActions>
          <QuickActionButton onPress={() => onEdit(service)}>
            <Ionicons name="pencil" size={18} color="#666" />
          </QuickActionButton>
          <QuickActionButton onPress={() => onDelete(service.id)}>
            <Ionicons name="trash" size={18} color="#dc3545" />
          </QuickActionButton>
        </QuickActions>
      </CardPressable>
    </Card>
  );
};

export default ServiceManageCard;

import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Usando ícones do Expo
import { Text } from "react-native";
import {
  Card,
  ServiceImage,
  ServiceInfo,
  Title,
  Price,
  Category,
  Actions,
  ActionButton,
  Rating,
  RatingText,
} from "./styles";

const ServiceManageCard = ({ service, onEdit, onDelete, testID }) => {
  const {
    images,
    title,
    category,
    priceStartingAt,
    priceUnit,
    rating = 0,
  } = service;

  return (
    <Card testID={testID}>
      <ServiceImage source={{ uri: images[0] }} testID={`${testID}-image`} />
      <ServiceInfo>
        <Title>{title}</Title>
        <Category>{category}</Category>
        <Price>
          R$ {priceStartingAt} / {priceUnit}
        </Price>
        <Rating>
          <Ionicons name="star" size={16} color="#FFC107" />
          <RatingText>{rating.toFixed(1)}</RatingText>
        </Rating>
      </ServiceInfo>
      <Actions>
        <ActionButton onPress={() => onEdit(service)} testID={`${testID}-edit`}>
          <Ionicons name="pencil" size={16} color="#333" />
        </ActionButton>
        <ActionButton
          onPress={() => onDelete(service.id)}
          danger
          testID={`${testID}-delete`}
        >
          <Ionicons name="trash" size={16} color="#D32F2F" />
        </ActionButton>
      </Actions>
    </Card>
  );
};

export default ServiceManageCard;

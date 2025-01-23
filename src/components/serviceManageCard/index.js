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
} from "./styles";

const ServiceManageCard = ({ service, onEdit, onDelete }) => {
  return (
    <Card>
      <ServiceImage source={{ uri: service.images[0] }} />
      <ServiceInfo>
        <Title>{service.title}</Title>
        <Category>{service.category}</Category>
        <Price>
          R$ {service.priceStartingAt} / {service.priceUnit}
        </Price>
        <Rating>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text>{service.rating.toFixed(1) || 0}</Text>
        </Rating>
      </ServiceInfo>
      <Actions>
        <ActionButton onPress={() => onEdit(service)}>
          <Ionicons name="pencil" size={16} color="#333" />
        </ActionButton>
        <ActionButton onPress={() => onDelete(service.id)} danger>
          <Ionicons name="trash" size={16} color="#D32F2F" />
        </ActionButton>
      </Actions>
    </Card>
  );
};

export default ServiceManageCard;

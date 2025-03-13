import React from "react";
import { Card, Icon, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ServiceCard = ({ icon, title, onPress, disabled = false, testID }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    navigation.navigate("ServicosPorCategoria", {
      category: title,
    });
  };

  return (
    <Card onPress={handlePress} disabled={disabled} testID={testID}>
      <Icon>{icon}</Icon>
      <Title numberOfLines={2}>{title}</Title>
    </Card>
  );
};

export default ServiceCard;

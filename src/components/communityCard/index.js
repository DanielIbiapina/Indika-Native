import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Biblioteca para ícones
import {
  Card,
  CommunityImage,
  Content,
  Name,
  Description,
  Stats,
  StatsText,
  Categories,
  CategoryTag,
} from "./styles";

const CommunityCard = ({
  id,
  name,
  members,
  image,
  description,
  categories,
  width = 280, // ← Valor padrão
  height = 280, // ← Valor padrão
}) => {
  const navigation = useNavigation();

  return (
    <Card
      width={width}
      height={height}
      onPress={() => navigation.navigate("ComunidadeDetalhes", { id })}
    >
      <CommunityImage source={{ uri: image }} />
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>

        <Stats>
          <Icon name="users" size={14} color="#422680" />
          <StatsText>{members} membros</StatsText>
        </Stats>

        <Categories>
          {categories.slice(0, 3).map((category, index) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
        </Categories>
      </Content>
    </Card>
  );
};

export default CommunityCard;

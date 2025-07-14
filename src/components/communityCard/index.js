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
import estreloamigos from "../../assets/estreloamigos.jpg";

// ✅ NOVO: Imagem padrão para comunidade de amigos
const DEFAULT_FRIENDS_IMAGE = estreloamigos;

// ✅ NOVO: Função para determinar a imagem a usar
const getImageSource = (image, name, categories) => {
  // Se tem imagem, usar ela
  if (image) {
    return { uri: image };
  }

  // Se é comunidade de amigos, usar imagem padrão específica
  if (
    name?.toLowerCase().includes("amigos") ||
    categories?.includes("friends")
  ) {
    return DEFAULT_FRIENDS_IMAGE;
  }

  // Fallback para outras comunidades sem imagem
  return {
    uri: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  };
};

const CommunityCard = ({
  id,
  name,
  _count,
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
      <CommunityImage
        source={getImageSource(image, name, categories)}
        // ✅ NOVO: Fallback caso a imagem não carregue
        defaultSource={DEFAULT_FRIENDS_IMAGE}
      />
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>

        <Stats>
          <Icon name="users" size={14} color="#422680" />
          <StatsText>{_count.members} membros</StatsText>
        </Stats>

        <Categories>
          {categories?.slice(0, 3).map((category, index) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
        </Categories>
      </Content>
    </Card>
  );
};

export default CommunityCard;

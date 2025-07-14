import styled from "styled-components/native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const Card = styled.TouchableOpacity`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${(screenWidth - 48) / 2}px;
  height: 300px; /* ✅ AUMENTADO: para acomodar subcategorias */
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 160px;
`;

export const ServiceInfo = styled.View`
  padding: 8px;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  height: 40px;
`;

// ✅ NOVO: Estilos para subcategorias
export const SubcategoriesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 2px 0;
`;

export const SubcategoryTag = styled.View`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 2px 6px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

export const SubcategoryTagText = styled.Text`
  font-size: 10px;
  color: #666;
  font-weight: 500;
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const RatingText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Price = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const Description = styled.Text`
  font-size: 11px;
  color: #666;
  margin-top: 4px;
`;

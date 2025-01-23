import styled from "styled-components/native";

export const StarContainer = styled.View`
  flex-direction: row;
`;

export const Star = styled.Text`
  font-size: 24px; /* Tamanho da estrela */
  color: ${({ filled }) =>
    filled ? "gold" : "lightgray"}; /* Cor da estrela */
  margin-right: 4px;
`;

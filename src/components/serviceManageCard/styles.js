import styled from "styled-components/native";

export const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  flex-direction: row;
  gap: 16px;
`;

export const ServiceImage = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: cover;
  border-radius: 4px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
`;

export const Category = styled.Text`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Price = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: #ffc107;
`;

export const Actions = styled.View`
  flex-direction: column;
  gap: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${({ theme, danger }) =>
    danger ? "#fee" : theme.colors.background};
  color: ${({ theme, danger }) => (danger ? "#D32F2F" : "#333")};
  justify-content: center;

  &:active {
    opacity: 0.7;
  }
`;

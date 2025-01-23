import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
  flex-direction: column;
  margin-right: 12px;
  width: 160px;
  height: 260px;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 130px;
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
  number-of-lines: 2;
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const Price = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const Description = styled.Text`
  font-size: 11px;
  color: #666;
  number-of-lines: 1;
  margin-top: 4px;
`;

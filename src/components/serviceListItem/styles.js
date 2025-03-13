import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px;
  elevation: 2;
`;

export const ServiceImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 4px;
`;

Rating.Text = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: 4px;
`;

export const Price = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

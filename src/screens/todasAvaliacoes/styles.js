import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

export const LoadMoreButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const LoadMoreButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

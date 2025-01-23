import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

export const ServicesList = styled.FlatList`
  flex: 1;
`;

export const ErrorMessage = styled.Text`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const LoadingSpinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.primary,
  size: "large",
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 8px;
  background-color: #eee;
`;

export const BackButtonText = styled.Text`
  font-size: 14px;
  color: #666;
`;

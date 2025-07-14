import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  background-color: #f5f5f5;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: rgba(255, 255, 255, 0.8);

  &:active {
    opacity: 0.7;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

// ✅ NOVO: Estilos para filtros
export const FilterContainer = styled.View`
  background-color: #fff;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

export const FilterChip = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? "#422680" : "#f0f0f0")};
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? "#422680" : "#e0e0e0")};
`;

export const FilterChipText = styled.Text`
  color: ${({ selected }) => (selected ? "#fff" : "#666")};
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
`;

export const ClearFiltersButton = styled.TouchableOpacity`
  background-color: #ff4444;
  padding: 8px 16px;
  border-radius: 20px;
  margin-left: 8px;
`;

export const ClearFiltersText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const ServicesList = styled.FlatList`
  flex: 1;
  padding: 0 20px;
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
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

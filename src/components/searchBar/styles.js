import styled from "styled-components/native";

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e0e0e0;
  margin-vertical: 8px;
`;

export const SearchIcon = styled.View`
  margin-right: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding: 0;
`;

// ✅ NOVO: Estilos para sugestões
export const SuggestionsList = styled.View`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 4px;
  border-width: 1px;
  border-color: #e0e0e0;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const SuggestionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const SuggestionText = styled.View`
  flex: 1;
  flex-direction: row;
`;

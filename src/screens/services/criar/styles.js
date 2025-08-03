import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 24px;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 4,
  textAlignVertical: "top",
  returnKeyType: "default",
  blurOnSubmit: false,
})`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  max-height: 150px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategorySelect = styled(Picker)`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
`;

// ❌ REMOVIDO: export const PriceInput = styled.View`
//   flex-direction: row;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 16px;
// `;

export const ButtonStyled = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  align-items: center;
`;

export const ButtonStyledText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

export const CategoryButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 16px;
  min-height: 56px;
`;

export const CategoryButtonText = styled.Text`
  font-size: 16px;
  color: ${({ hasCategory, theme }) =>
    hasCategory ? theme.colors.text.primary : "#999"};
`;

export const CategoryButtonIcon = styled.View`
  margin-left: 8px;
`;

// ✅ NOVOS: Estilos para subcategorias
export const SubcategoriesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 8px;
`;

export const SubcategoryTag = styled.View`
  background-color: ${({ theme }) => theme.colors.primary}20;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 4px 12px;
`;

export const SubcategoryTagText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

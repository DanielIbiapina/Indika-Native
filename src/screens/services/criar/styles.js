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

export const TextArea = styled.TextInput`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  background-color: white;
  text-align-vertical: top;

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

export const PriceInput = styled.View`
  flex-direction: row;
  gap: 12px;
`;

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

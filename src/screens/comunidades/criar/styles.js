import styled from "styled-components/native";

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
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SwitchLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #ccc;
  `}
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

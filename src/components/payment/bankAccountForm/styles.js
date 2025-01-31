import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Select = styled.TouchableOpacity`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SelectText = styled.Text`
  font-size: 16px;
  color: ${({ placeholder, theme }) =>
    placeholder ? theme.colors.text.secondary : theme.colors.text.primary};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled : theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

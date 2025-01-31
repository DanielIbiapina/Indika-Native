import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardContainer = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin-vertical: 10px;
`;

export const AmountInput = styled.TextInput`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 10px;
  text-align: center;
`;

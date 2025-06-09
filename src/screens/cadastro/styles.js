import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const SignupCard = styled.View`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
`;

export const Form = styled.View`
  flex-direction: column;
  gap: 16px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  gap: 12px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #666;
  }
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  elevation: 2;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

export const ErrorMessage = styled.View`
  padding: 8px;
  margin-top: 8px;
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

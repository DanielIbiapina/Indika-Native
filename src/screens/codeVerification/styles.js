import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const VerificationCard = styled.View`
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

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
  zindex: 10;
`;

export const CodeInputContainer = styled.View`
  margin: 24px 0;
  align-items: center;
`;

export const CodeInput = styled.TextInput`
  font-size: 24px;
  letter-spacing: 8px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 200px;
  text-align: center;
`;

export const ResendText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  margin-top: 16px;
`;

export const Timer = styled.Text`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 16px;
`;

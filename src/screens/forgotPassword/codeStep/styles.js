import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;
  margin-top: 40px;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 32px;
  line-height: 24px;
`;

export const Form = styled.View`
  width: 100%;
`;

export const CodeInputContainer = styled.View`
  margin-bottom: 24px;
`;

export const CodeInput = styled.TextInput`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  font-size: 24px;
  letter-spacing: 8px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 16px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const TogglePasswordButton = styled.TouchableOpacity`
  padding: 16px 12px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 24px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const ErrorMessage = styled.View`
  background-color: #ffe6e6;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left-width: 4px;
  border-left-color: ${(props) => props.theme.colors.error};
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  font-size: 14px;
`;

export const LoadingSpinner = styled(ActivityIndicator).attrs({
  color: "#fff",
  size: "small",
})``;

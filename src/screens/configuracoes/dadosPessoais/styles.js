import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Form = styled.View`
  padding: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  margin-top: 16px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  font-size: 16px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 32px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const LoadingSpinner = styled(ActivityIndicator).attrs({
  color: "#fff",
  size: "small",
})``;

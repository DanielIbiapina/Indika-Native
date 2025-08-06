import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    paddingBottom: 32,
  },
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
`;

export const LoginCard = styled.View`
  background: white;
  padding: 32px;
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
    color: #333;
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

export const SocialButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  margin-top: 8px;
  elevation: 1;
  background-color: ${({ provider }) =>
    provider === "google"
      ? "#ffffff"
      : provider === "facebook"
      ? "#1877F2"
      : "#ffffff"};
`;

export const SocialButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ provider }) =>
    provider === "google"
      ? "#333333"
      : provider === "facebook"
      ? "#ffffff"
      : "#333333"};
`;

export const Divider = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 24px 0 16px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #ddd;
`;

export const DividerText = styled.Text`
  color: #666;
  font-size: 14px;
  margin: 0 16px;
`;

export const ToggleText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
`;

export const ForgotPassword = styled.Text`
  text-align: right;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  cursor: pointer;
  margin-top: -8px;
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

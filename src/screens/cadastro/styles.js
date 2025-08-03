import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  width: 100%;
`;

export const SignupCard = styled.View`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  elevation: 4;
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
  margin-top: 16px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding-left: 8px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled ? "#cccccc" : theme.colors.primary};
  border-radius: 8px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  elevation: 2;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

export const ErrorMessage = styled.View`
  padding: 8px;
  margin-top: 8px;
`;

export const ErrorText = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

// Estilos específicos para steps
export const PhoneInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: 16px;
`;

export const CountryCode = styled.Text`
  padding: 12px 16px;
  font-size: 16px;
  color: #333;
  border-right-width: 1px;
  border-color: #e0e0e0;
  background-color: #f5f5f5;
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
  color: #333;
`;

export const ResendText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const TimerText = styled.Text`
  color: #666;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
`;

export const SkipButton = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const SkipButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

export const TermsContainer = styled.View`
  margin: 32px 0;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

export const TermsText = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const CheckboxButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border: 2px solid #422680;
  border-radius: 4px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

export const CheckboxText = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

export const LinkText = styled.Text`
  color: #422680;
  font-weight: 600;
  text-decoration-line: underline;
`;

export const ViewFullTermsButton = styled.TouchableOpacity`
  padding: 0px;
  align-items: center;
  margin-top: 16px;
`;

export const ViewFullTermsText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
  text-decoration-line: underline;
`;

export const LastUpdateInfo = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  font-style: italic;
  text-align: center;
`;

export const CompanyInfo = styled.View`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  border-left: 4px solid #422680;
`;

export const CompanyText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  line-height: 18px;
`;

export const Section = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #422680;
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
  margin-bottom: 12px;
`;

export const BulletPoint = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  padding-left: 8px;
`;

export const BulletText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-left: 8px;
  flex: 1;
`;

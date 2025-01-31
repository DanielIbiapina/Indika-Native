import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const BalanceCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  elevation: 2;
  margin-bottom: 16px;
`;

export const BalanceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const BalanceAmount = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const WithdrawSection = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
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

export const WithdrawButton = styled.TouchableOpacity`
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

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 8px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PaymentMethodSection = styled.View`
  margin-top: 16px;
`;

export const PaymentMethodCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 60px;
`;

export const PaymentMethodInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const PaymentMethodTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PaymentMethodDetails = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

export const NoPaymentMethodContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const NoPaymentMethodIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const NoPaymentMethodText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 20px;
  line-height: 24px;
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding: 16px;
`;

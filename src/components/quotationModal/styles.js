import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
  },
})`
  width: 90%;
  max-height: 80%;
  background-color: white;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const InputContainer = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
`;

export const PeriodSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const PeriodOption = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "transparent"};
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const PeriodText = styled.Text`
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.primary};
  text-align: center;
`;

export const DateButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  padding: 10px;
`;

export const DateText = styled.Text`
  font-size: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const PaymentMethodsContainer = styled.View`
  margin-top: 8px;
`;

export const PaymentMethodOption = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "transparent"};
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const PaymentOptionText = styled.Text`
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.primary};
  text-align: center;
  font-weight: 500;
`;

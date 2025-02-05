import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Container = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  padding-top: 40px;
  padding-left: 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #422680;
  margin-bottom: 10px;
`;

export const ServiceInfo = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

export const AmountLabel = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

export const Amount = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #422680;
  margin-bottom: 20px;
`;

export const CardContainer = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#422680")};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ProviderInfo = styled.View`
  margin-top: 10px;
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const InstructionsContainer = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const InstructionText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 20px;
`;

export const PixContainer = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const PixKey = styled.Text`
  font-size: 18px;
  color: #422680;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

export const CopyButton = styled.TouchableOpacity`
  background-color: #422680;
  padding: 12px 20px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
`;

export const ConfirmButton = styled(Button)`
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#28a745")};
  margin-top: 10px;
`;

export const PaymentMethodSelector = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const MethodOption = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: ${(props) => (props.isLast ? "0" : "1px")};
  border-bottom-color: #eee;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#fff")};
`;

export const MethodIcon = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const MethodInfo = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const MethodTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const MethodDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const BankInfo = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const BankInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const BankInfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const BankInfoValue = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

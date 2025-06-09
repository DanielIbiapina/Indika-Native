import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-top: 16px;
`;

export const BackButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  margin-left: 8px;
`;

export const Header = styled.View`
  padding: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #422680;
`;

export const Card = styled.View`
  background-color: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin-right: 8px;
`;

export const Value = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

export const PaymentMethodsSection = styled.View`
  margin: 16px;
`;

export const MethodOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#422680" : "#fff")};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #422680;
  elevation: 2;
`;

export const MethodOptionText = styled.Text`
  font-size: 16px;
  margin-left: 12px;
  color: ${({ selected }) => (selected ? "#fff" : "#422680")};
  font-weight: 500;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? "#999" : "#422680")};
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  align-items: center;
`;

export const ConfirmButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  margin-top: 16px;
`;

export const PixDetailsContainer = styled.View`
  margin-top: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const PixKeyContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
`;

export const PixKeyType = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #422680;
  margin-bottom: 4px;
`;

export const PixKeyValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

export const PixKeyRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CopyButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #422680;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
`;

export const InstructionsContainer = styled.View`
  background-color: #e8f4f8;
  padding: 16px;
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: #422680;
`;

export const InstructionText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 22px;
  text-align: left;
`;

import styled from "styled-components/native";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  padding: 20px;
`;

export const ModalContent = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 0;
  min-height: 85%;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20, gap: 20 },
})`
  flex: 1;
`;

export const Field = styled.View`
  gap: 8px;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;

// Preço
export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
`;

export const CurrencySymbol = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #422680;
  margin-right: 8px;
`;

export const PriceInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding: 12px 0;
`;

// Data
export const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
`;

export const DateText = styled.Text`
  font-size: 16px;
  color: #333;
`;

// Toggle
export const TimeToggle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const ToggleText = styled.Text`
  font-size: 15px;
  color: #666;
`;

// Períodos
export const PeriodButtons = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const PeriodButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  background-color: ${({ active }) => (active ? "#422680" : "transparent")};
  border: 1px solid #422680;
  border-radius: 6px;
  align-items: center;
`;

export const PeriodButtonText = styled.Text`
  color: ${({ active }) => (active ? "white" : "#422680")};
  font-weight: 500;
`;

// Textarea
export const TextArea = styled.TextInput`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: #333;
  min-height: 80px;
`;

// Botões
export const Actions = styled.View`
  flex-direction: row;
  padding: 20px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

export const SendButton = styled.TouchableOpacity`
  flex: 2;
  background-color: #422680;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #f54952;
  border: 1px solid #ddd;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({ secondary }) => (secondary ? "white" : "white")};
  font-size: 16px;
  font-weight: 500;
`;

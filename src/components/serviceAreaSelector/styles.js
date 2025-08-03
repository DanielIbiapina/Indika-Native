import styled from "styled-components/native";

export const AreaButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  margin-bottom: 16px;
`;

export const AreaButtonText = styled.Text`
  flex: 1;
  margin-left: 8px;
  font-size: 16px;
  color: #333;
`;

export const ModalContent = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: #eee;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const OptionContent = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const OptionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

export const OptionDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const ManualSection = styled.View`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  padding: 12px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #ddd;
  margin-bottom: 12px;
  font-size: 16px;
  color: #333;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #422680;
  padding: 12px;
  border-radius: 6px;
  align-items: center;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const CurrentLocation = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  padding: 12px;
  background-color: #e8f5e8;
  border-radius: 6px;
`;

export const CurrentLocationText = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  color: #4caf50;
  font-weight: 500;
`;

// ✅ NOVOS: Para os pickers
export const PickerContainer = styled.View`
  background-color: #f8f9fa;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e9ecef;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  margin-top: 8px;
  color: #666;
  font-size: 14px;
`;

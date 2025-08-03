import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  background-color: #fff;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const ModalContent = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  margin-top: 16px;
`;

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

export const CurrentLocationCard = styled.View`
  background-color: #e8f4fd;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left-width: 4px;
  border-left-color: #422680;
`;

export const CurrentLocationTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #422680;
  margin-bottom: 4px;
`;

export const CurrentLocationText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const ButtonsContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #eee;
  background-color: #fff;
`;

export const ApplyButton = styled.TouchableOpacity`
  background-color: #422680;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 12px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const ApplyButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  border-width: 1px;
  border-color: #e9ecef;
`;

export const CancelButtonText = styled.Text`
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

export const DetectButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #422680;
  margin-bottom: 20px;
  justify-content: center;
`;

export const DetectButtonText = styled.Text`
  color: #422680;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

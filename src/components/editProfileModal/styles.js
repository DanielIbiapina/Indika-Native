import styled from "styled-components/native";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalContent = styled.View`
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-height: 95%;
  min-height: 94%;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  margin-bottom: 0px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  max-height: 90%;
`;

export const Form = styled.View`
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 14px;
  border: 1px solid
    ${({ theme, editable }) =>
      editable === false ? "#eee" : theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  color: ${({ theme, editable }) =>
    editable === false ? "#999" : theme.colors.text.primary};
  background-color: ${({ editable }) =>
    editable === false ? "#f8f8f8" : "white"};
`;

export const InfoText = styled.Text`
  font-size: 13px;
  color: #666;
  font-style: italic;
  text-align: center;
  margin-top: -8px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
  background-color: #ffebee;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ffcdd2;
`;

import styled from "styled-components/native";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-height: 90%;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export const Form = styled.View`
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

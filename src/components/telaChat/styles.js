import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const MessageList = styled.FlatList`
  flex: 1;
  padding: 16px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
  background-color: #fff;
  elevation: 4;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 24px;
  margin-right: 12px;
  max-height: 100px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  elevation: 2;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 32px;
  background-color: #fff;
  border-radius: 12px;
  margin: 16px;
  elevation: 2;
  font-size: 16px;
`;

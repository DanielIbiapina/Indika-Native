import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const MessageList = styled.FlatList`
  flex: 1;
  padding: 16px;
`;

export const ChatHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  elevation: 4;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ChatHeaderInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const ChatHeaderName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ChatHeaderStatus = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

export const DateSeparator = styled.View`
  align-items: center;
  margin-vertical: 16px;
`;

export const DateSeparatorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px 12px;
  border-radius: 12px;
  //transform: scaleY(-1);
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  elevation: 8;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px -2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 12px 16px;
  border-radius: 24px;
  margin-right: 12px;
  max-height: 100px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  elevation: 4;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
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
  //transform: scaleY(-1);
`;

export const OrderButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  margin-left: 8px;
`;

export const OrderButtonText = styled.Text`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 14px;
`;

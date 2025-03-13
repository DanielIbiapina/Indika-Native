import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: ${({ isOwn }) => (isOwn ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
  //transform: scaleY(-1);
`;

export const MessageBubble = styled.View`
  background-color: ${({ theme, isOwn }) =>
    isOwn ? `${theme.colors.primary}` : "#fff"};
  padding: 12px 16px;
  border-radius: 20px;
  border-bottom-right-radius: ${({ isOwn }) => (isOwn ? "4px" : "20px")};
  border-bottom-left-radius: ${({ isOwn }) => (isOwn ? "20px" : "4px")};
  max-width: 80%;
  elevation: 2;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.1;
    shadow-radius: 2px;
  `}
`;

export const MessageText = styled.Text`
  color: ${({ theme, isOwn }) => (isOwn ? "#fff" : theme.colors.text.primary)};
  font-size: 15px;
  line-height: 20px;
`;

export const MessageTime = styled.Text`
  font-size: 11px;
  color: ${({ theme, isOwn }) =>
    isOwn ? "rgba(255, 255, 255, 0.8)" : theme.colors.text.secondary};
  margin-top: 4px;
  text-align: right;
`;

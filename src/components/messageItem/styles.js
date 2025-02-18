import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: ${({ isOwn }) => (isOwn ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
`;

export const MessageBubble = styled.View`
  background-color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.primary : theme.colors.surface};
  padding: 12px;
  border-radius: 16px;
  max-width: 80%;
`;

export const MessageText = styled.Text`
  color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.text.onPrimary : theme.colors.text.primary};
  font-size: 16px;
`;

export const MessageTime = styled.Text`
  font-size: 12px;
  color: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.text.onPrimary : theme.colors.text.secondary};
  margin-top: 4px;
  opacity: 0.8;
`;

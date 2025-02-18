import React from "react";
import { format } from "date-fns";
import { Container, MessageBubble, MessageText, MessageTime } from "./styles";

const MessageItem = ({ message, isOwn }) => (
  <Container isOwn={isOwn}>
    <MessageBubble isOwn={isOwn}>
      <MessageText isOwn={isOwn}>{message.content}</MessageText>
      <MessageTime isOwn={isOwn}>
        {format(new Date(message.createdAt), "HH:mm")}
        {message.status === "pending" && " ⌛"}
        {message.status === "delivered" && " ✓"}
        {message.status === "read" && " ✓✓"}
      </MessageTime>
    </MessageBubble>
  </Container>
);

export default MessageItem;

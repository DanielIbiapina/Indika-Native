import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return theme.colors.success + "20";
      case "pending":
        return theme.colors.warning + "20";
      case "processing":
        return theme.colors.info + "20";
      case "failed":
        return theme.colors.error + "20";
      case "refunded":
        return theme.colors.secondary + "20";
      default:
        return theme.colors.disabled + "20";
    }
  }};
`;

export const StatusIcon = styled.View`
  margin-right: 4px;
`;

export const StatusText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return theme.colors.success;
      case "pending":
        return theme.colors.warning;
      case "processing":
        return theme.colors.info;
      case "failed":
        return theme.colors.error;
      case "refunded":
        return theme.colors.secondary;
      default:
        return theme.colors.disabled;
    }
  }};
`;

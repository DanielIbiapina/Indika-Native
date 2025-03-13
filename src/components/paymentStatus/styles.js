import styled from "styled-components/native";

export const Container = styled.View`
  padding: 24px;
  align-items: center;
  background-color: ${({ status }) =>
    status === "COMPLETED"
      ? "#E8F5E9"
      : status === "PENDING"
      ? "#FFF3E0"
      : status === "FAILED"
      ? "#FFEBEE"
      : "#F5F5F5"};
  border-radius: 12px;
  margin: 16px;
`;

export const StatusIcon = styled.View`
  margin-bottom: 16px;
`;

export const StatusText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const StatusDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 8px;
`;

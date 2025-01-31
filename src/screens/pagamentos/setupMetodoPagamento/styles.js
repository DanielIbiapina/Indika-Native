import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Header = styled.View`
  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding: 20px;
`;

export const FormContainer = styled.View``;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

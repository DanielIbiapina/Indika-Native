import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const EmptyIcon = styled.View`
  margin-bottom: 16px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 24px;
  line-height: 24px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 24px;
  border-radius: 8px;
  elevation: 2;

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  margin-left: 8px;
`;

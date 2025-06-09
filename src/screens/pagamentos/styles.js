import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 16px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: ${(props) => (props.last ? "0" : "1px")};
  border-bottom-color: #f0f0f0;
`;

export const MenuItemText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 12px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ErrorText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.error || "#ff0000"};
  margin: 24px 16px;
  font-size: 16px;
`;

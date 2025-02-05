import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const LanguageItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  margin-horizontal: 16px;
  margin-top: ${(props) => (props.first ? "16px" : "8px")};
  border-radius: 12px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  elevation: 2;
`;

export const TextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const LanguageText = styled.Text`
  font-size: 16px;
  color: ${(props) =>
    props.disabled ? "#999" : (props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

export const LanguageDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

export const CheckIcon = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.View`
  padding: 24px 16px;
`;

export const InfoMessage = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  font-style: italic;
`;

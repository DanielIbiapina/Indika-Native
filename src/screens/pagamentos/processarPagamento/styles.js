import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const ServiceCard = styled.View`
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
`;

export const ServiceTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const PriceContainer = styled.View`
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => `${theme.colors.primary}08`};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const PriceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const Price = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const WebViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  margin-top: 16px;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ErrorContainer = styled.View`
  flex: 1;
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 16px;
  text-align: center;
  margin-top: 12px;
`;

export const RetryButton = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

export const RetryButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;
